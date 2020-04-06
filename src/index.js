import * as React from "react"
import { Frame } from "framer"
import { useScript } from "./useScript"

export function Wyre({open, onReady, onClose}, onComplete, config, children}) {
    const [loaded, error] = useScript("https://verify.sendwyre.com/js/widget-loader.js")
    const [widget, setWidget] = useState(null)

    React.useEffect(() => {
        if (loaded) verifyWyre()
    }, [loaded, error])

    const verifyWyre = () => {
      const cwidget = new window.Wyre.Widget(config)

      this.widget.on('ready', () => {
        if (onReady) {
          onReady()
        }
      })

      this.widget.on('close', event => {
        if (onClose) {
          onClose(event)
        }
      })

      this.widget.on('complete', event => {
        if (onComplete) {
          onComplete(event)
        }
      })
      setWidget(cwidget)
    }

    return (
        <div class={"wyre-widget-react"}>
            {loaded && !error ? <div /> : <b>Something went wrong!</b>}
        </div>
    )
}
