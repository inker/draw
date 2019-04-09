import 'normalize.css'
import React from 'react'
import ReactDom from 'react-dom'
import fastclick from 'fastclick'

import App from './App'

ReactDom.render(
  <App />,
  document.getElementById('app'),
)

// @ts-ignore
fastclick.attach(document.body)
