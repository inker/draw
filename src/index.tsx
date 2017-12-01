import React from 'react'
import ReactDom from 'react-dom'
import styled from 'styled-components'
import fastclick from 'fastclick'
import 'normalize.css'

import Routes from './routes'

const Root = styled.div`
  font-family: Tahoma, Arial, sans-serif;
`

ReactDom.render(
  <Root>
    <Routes />
  </Root>,
  document.getElementById('app'),
)

fastclick.attach(document.body)
