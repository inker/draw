import * as React from 'react'
import * as ReactDom from 'react-dom'
import styled from 'styled-components'
import * as fastclick from 'fastclick'

import Routes from './routes'

import 'normalize.css'

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
