(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react);
        global.useScript = mod.exports;
    }
})(this, function (exports, _react) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.useScript = useScript;

    var _slicedToArray = function () {
        function sliceIterator(arr, i) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;

            try {
                for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                    _arr.push(_s.value);

                    if (i && _arr.length === i) break;
                }
            } catch (err) {
                _d = true;
                _e = err;
            } finally {
                try {
                    if (!_n && _i["return"]) _i["return"]();
                } finally {
                    if (_d) throw _e;
                }
            }

            return _arr;
        }

        return function (arr, i) {
            if (Array.isArray(arr)) {
                return arr;
            } else if (Symbol.iterator in Object(arr)) {
                return sliceIterator(arr, i);
            } else {
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
        };
    }();

    // Hook
    var cachedScripts = [];
    function useScript(src) {
        var _useState = (0, _react.useState)({
            loaded: false,
            error: false
        }),
            _useState2 = _slicedToArray(_useState, 2),
            state = _useState2[0],
            setState = _useState2[1];

        (0, _react.useEffect)(function () {
            // If cachedScripts array already includes src that means another instance ...
            // ... of this hook already loaded this script, so no need to load again.
            if (cachedScripts.includes(src)) {
                setState({
                    loaded: true,
                    error: false
                });
            } else {
                cachedScripts.push(src);
                // Create script
                var script = document.createElement("script");
                script.src = src;
                script.async = true;
                // Script event listener callbacks for load and error
                var onScriptLoad = function onScriptLoad() {
                    setState({
                        loaded: true,
                        error: false
                    });
                };
                var onScriptError = function onScriptError() {
                    // Remove from cachedScripts we can try loading again
                    var index = cachedScripts.indexOf(src);
                    if (index >= 0) cachedScripts.splice(index, 1);
                    script.remove();
                    setState({
                        loaded: true,
                        error: true
                    });
                };
                script.addEventListener("load", onScriptLoad);
                script.addEventListener("error", onScriptError);
                // Add script to document body
                document.body.appendChild(script);
                // Remove event listeners on cleanup
                return function () {
                    script.removeEventListener("load", onScriptLoad);
                    script.removeEventListener("error", onScriptError);
                };
            }
        }, [src]); // Only re-run effect if script src changes
        return [state.loaded, state.error];
    }
});