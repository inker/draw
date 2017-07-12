import * as React from 'react'
import * as ReactDom from 'react-dom'
import styled from 'styled-components'

import * as fastclick from 'fastclick'

import { tryFetchPots, parseGS, parseLast16Teams } from 'utils/fetch-parse-pots'
import currentSeason from 'utils/currentSeason'
import Routes from './routes'

import 'normalize.css'

const Root = styled.div`
  font-family: Arial, sans-serif;
`

const parse = parseGS

;
(async () => {
  const text = await tryFetchPots(currentSeason, 3)
  const pots = parse(text)
  ReactDom.render(
    <Root>
      <Routes pots={pots}/>
    </Root>,
    document.getElementById('app'),
  )
  fastclick.attach(document.body)
})()
