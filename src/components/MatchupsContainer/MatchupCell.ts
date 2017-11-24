import styled, { keyframes } from 'styled-components'

import CellWithFlag from '../table/CellWithFlag'

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

const MatchupCell = styled<Props>(CellWithFlag)`
  width: 150px;
  ${props => props.possible && `
    background-color: rgba(255, 255, 255, 0.9);
    animation: ${BorderGlow} 1s ease;
    box-shadow: 0 0 5px #bcd;
  `}
  ${props => props.picked && `
    animation: ${Appear} 5s normal forwards;
  `}
`

export default MatchupCell
