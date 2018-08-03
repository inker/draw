import styled, { css, keyframes } from 'styled-components'

import CellWithFlag from '../table/CellWithFlag'

const BorderGlow = keyframes`
  from {
    background-color: white;
    box-shadow: 0 0 20px #08f;
  }
  to {}
`

const Appear = keyframes`
  from {
    background-color: #ff8;
  }
  to {}
`

const Possible = css`
  background-color: rgba(255, 255, 255, 0.9);
  animation: ${BorderGlow} 1s ease;
  box-shadow: 0 0 5px #6af;
`

const Picked = css`
  animation: ${Appear} 5s normal forwards;
`

const GroupCell = styled(CellWithFlag)`
  ${props => props.possible && Possible}
  ${props => props.picked && Picked}
`

export default GroupCell
