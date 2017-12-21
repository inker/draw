import React from 'react'
import ReactDom from 'react-dom'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import fastclick from 'fastclick'
import 'normalize.css'

import Routes from './routes'

// @ts-ignore
const version = __VERSION__

const Root = styled.div`
  font-family: Tahoma, Arial, sans-serif;
`

ReactDom.render(
  <Root>
    <Helmet>
      <meta name="version" content={version} />
    </Helmet>
    <Routes />
  </Root>,
  document.getElementById('app'),
)

fastclick.attach(document.body)
