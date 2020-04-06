<h3 align="center">
  <br />
  <img src="https://ipfs.io/ipfs/QmSSDhQdauJkKKCLnpLaptbuqzBRUyWtoStkkEx6ssjKqy" alt="wyre-widget" width="500" />
  <br />
  <br />
  <br />
</h3>

# Wyre Widget

New Version using Hooks and no side effects.

> [React](https://facebook.github.io/react/) component for the [Wyre](https://www.sendwyre.com/) widget.

[![License](http://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/x5engine/wyre-widget/master/LICENSE)
[![Build Status](https://travis-ci.org/x5engine/wyre-widget.svg?branch=master)](https://travis-ci.org/x5engine/wyre-widget)
[![dependencies Status](https://david-dm.org/x5engine/wyre-widget/status.svg)](https://david-dm.org/x5engine/wyre-widget)
[![NPM version](https://badge.fury.io/js/wyre-widget.svg)](http://badge.fury.io/js/wyre-widget)

## Demo first?

Demo link here

## Install

```bash
npm i -S wyre-widget
```

## Getting started

```javascript
import React from 'react'
import Wyre from 'wyre-widget'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      open: false
    }
  }

  render () {
    return (
      <Wyre
        config={{
          env: 'test',
          accountId: 'AC-BAAA2222',
          auth: {
            type: 'secretKey',
            secretKey: '6a6f7f9187f766f66938638f1afd79b20fb5989e2837e6f989'
          },
          operation: {
            type: 'debitcard',
            destCurrency: 'ETH',
            destAmount: 0.01,
            dest: '0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1'
          },
          style: {
            primaryColor: '#0055ff'
          }
        }}
        onReady={() => console.log('ready')}
        onClose={event => console.log('close', event)}
        onComplete={event => console.log('complete', event)}
        open={this.state.open}>

        <button onClick={() => this.setState({ open: true })}>
          Buy ETH
        </button>

      </Wyre>
    )
  }
}


export default App
```

Please read the [Wyre documentation](https://docs.sendwyre.com/docs/widget-api) for the configuration options.

## Development

```bash
npm install
npm run build
npm run lint
```

## License

[MIT](License)
