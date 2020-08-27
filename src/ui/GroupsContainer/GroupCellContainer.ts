import styled, { css, keyframes } from 'styled-components'

import CellContainer from 'ui/table/CellContainer'

const BorderGlow = keyframes`
  from {
    background-color: white;
    box-shadow: 0 0 20px #08f;
  }
  to {}
`

const Appear = keyframes`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`

const Possible = css`
  position: relative; /* enables glow */
  background-color: rgba(255, 255, 255, 0.9);
  animation: ${BorderGlow} 1s ease;
  box-shadow: 0 0 5px #6af;
`

const Picked = css`
  animation: ${Appear} 5s normal forwards;
`

interface Props {
  possible?: boolean,
  picked?: boolean,
}

const GroupCellContainer = styled(CellContainer)<Props>`
  ${props => props.possible && Possible}
  ${props => props.picked && Picked}
`

export default GroupCellContainer
