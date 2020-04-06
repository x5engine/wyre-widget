import React, {useState} from "react"
import { useScript } from "./useScript"

export default function Wyre({open, onReady, onClose, onComplete, config, children}) {
    const [loaded, error] = useScript("https://verify.sendwyre.com/js/widget-loader.js")
    const [widget, setWidget] = useState(null)

    React.useEffect(() => {
        if (loaded) verifyWyre()
        if(open && widget) widget.open();
    }, [loaded, error, open])

    const verifyWyre = () => {
      if(widget) return false
      const cwidget = new window.Wyre.Widget(config)

      cwidget.on('ready', () => {
        if (onReady) {
          onReady()
        }
      })

      cwidget.on('close', event => {
        if (onClose) {
          onClose(event)
        }
      })

      cwidget.on('complete', event => {
        if (onComplete) {
          onComplete(event)
        }
      })
      setWidget(cwidget)
    }

    return (
        <div class={"wyre-widget-react"}>
            {loaded && !error ? <div>{children}</div> : <b>Something went wrong!</b>}
        </div>
    )
}
