import React, { PureComponent } from 'react'
import Import from 'react-import'
import fastclick from 'fastclick'

import Routes from './routes'

class Main extends PureComponent {
  render() {
    return (
      <>
        <Import component={import(/* webpackChunkName: "version" */ './Version')} />
        <Routes />
      </>
    )
  }
}

fastclick.attach(document.body)

export default Main
