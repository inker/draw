import * as React from 'react'
import * as ReactDom from 'react-dom'
import styled from 'styled-components'
import * as fastclick from 'fastclick'
import { safari } from 'bowser'
import 'normalize.css'

import Routes from './routes'

if (safari) {
  alert('Does not work in Safari, yet. Use Chrome or Firefox.')
}

const Root = styled.div`
  font-family: Arial, sans-serif;
`

ReactDom.render(
  <Root>
    <Routes />
  </Root>,
  document.getElementById('app'),
)

fastclick.attach(document.body)
