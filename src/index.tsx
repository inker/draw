import * as React from 'react'
import * as ReactDom from 'react-dom'
import styled from 'styled-components'
import {
  applyRouterMiddleware,
  browserHistory,
  Router,
} from 'react-router-dom'

import { fetchPots, parseGS, parseLast16Teams } from './utils/fetch-parse-pots'
import Routes from './routes'

import 'normalize.css'

const Root = styled.div`
  font-family: Arial, sans-serif;
`

;
(async () => {
  const fetched = fetchPots('http://kassiesa.home.xs4all.nl/bert/uefa/seedcl2017.html')
  const parse = parseGS
  const text = await fetched
  const pots = await parse(text)
  ReactDom.render(
    <Root>
      <Routes pots={pots}/>
    </Root>,
    document.getElementById('app'),
  )
})()
