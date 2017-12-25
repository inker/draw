import React from 'react'
import ReactDom from 'react-dom'
import Import from 'react-import'

ReactDom.render(
  <Import component={import(/* webpackChunkName: "main" */ './Main')} />,
  document.getElementById('app'),
)
