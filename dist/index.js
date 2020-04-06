(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "./useScript"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("./useScript"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.useScript);
        global.index = mod.exports;
    }
})(this, function (exports, _react, _useScript3) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Wyre;

    var _react2 = _interopRequireDefault(_react);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

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

    function Wyre(_ref) {
        var open = _ref.open,
            onReady = _ref.onReady,
            onClose = _ref.onClose,
            onComplete = _ref.onComplete,
            config = _ref.config,
            children = _ref.children;

        var _useScript = (0, _useScript3.useScript)("https://verify.sendwyre.com/js/widget-loader.js"),
            _useScript2 = _slicedToArray(_useScript, 2),
            loaded = _useScript2[0],
            error = _useScript2[1];

        var _useState = (0, _react.useState)(null),
            _useState2 = _slicedToArray(_useState, 2),
            widget = _useState2[0],
            setWidget = _useState2[1];

        _react2.default.useEffect(function () {
            if (loaded) verifyWyre();
            if (open && widget) widget.open();
        }, [loaded, error, open]);

        var verifyWyre = function verifyWyre() {
            if (widget) return false;
            var cwidget = new window.Wyre.Widget(config);

            cwidget.on('ready', function () {
                if (onReady) {
                    onReady();
                }
            });

            cwidget.on('close', function (event) {
                if (onClose) {
                    onClose(event);
                }
            });

            cwidget.on('complete', function (event) {
                if (onComplete) {
                    onComplete(event);
                }
            });
            setWidget(cwidget);
        };

        return _react2.default.createElement(
            "div",
            { "class": "wyre-widget-react" },
            loaded && !error ? _react2.default.createElement(
                "div",
                null,
                children
            ) : _react2.default.createElement(
                "b",
                null,
                "Something went wrong!"
            )
        );
    }
});