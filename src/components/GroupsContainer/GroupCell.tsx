import * as React from 'react'
import styled, { keyframes } from 'styled-components'

import Cell from '../table/Cell'

interface Props {
  possible: boolean,
  picked: boolean,
}

const BorderGlow = keyframes`
  from {
    background-color: white;
    box-shadow: 0 0 20px #bcd;
  }
  to {}
`

const Appear = keyframes`
  from {
    background-color: #ff8;
  }
  to {}
`

const GroupCell = styled<Props>(Cell)`
  ${props => props.possible && `
    background-color: rgba(255, 255, 255, 0.75);
    animation: ${BorderGlow} 1s ease;
    border-style: double;
    border-color: #789;
  `}
  ${props => props.picked && `
    animation: ${Appear} 5s normal forwards;
  `}
`

export default GroupCell
