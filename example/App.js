import React, { useState } from "react";
import Wyre from '../index'

export default function App() {
  const [open, setOpen] = useState(false);


  const genSecretKey = () => {
    return Array.prototype.map.call(
      window.crypto.getRandomValues(new Uint8Array(25)),
      x => ('00' + x.toString(16)).slice(-2)).join('')
  }

  return (
    <div className="App">
      <h1>Hello Crypto :)</h1>
      <h2>Let's Buy some Crypto to HODL ;)</h2>.
        <Wyre
          config={{
            env: 'test',
            accountId: 'AC_BAAA2222',// put your account number here
            auth: {
              type: 'secretKey',
              secretKey:  genSecretKey()// make an API key, put the secret here :)
            },
            operation: {
              type: 'debitcard',
              destCurrency: 'ETH',//change type: can be ETH, DAI, BTC
              destAmount: 0.01,
              dest: "0xd277a99c0d08ded3bdb253024bff81e41496465c"// if payment goes through this account will receive the crypto balance
            },
            style: {
              primaryColor: '#0055ff'
            }
          }}
          onReady={() => console.log("ready")}
          onClose={event => console.log("close", event)}
          onComplete={event => console.log("complete", event)}
          open={open}
        >
          <button onClick={() => setOpen(true)}>Buy ETH</button>
        </Wyre>
    </div>
  );
}
