import React, { PureComponent } from 'react'
import Import from 'react-import'
import styled from 'styled-components'
import fastclick from 'fastclick'
import 'normalize.css'

import Routes from './routes'

const Root = styled.div`
  font-family: Tahoma, Arial, sans-serif;
`

class Main extends PureComponent {
  render() {
    return (
      <Root>
        <Import component={import(/* webpackChunkName: "version" */ './Version')} />
        <Routes />
      </Root>
    )
  }
}

fastclick.attach(document.body)

export default Main
