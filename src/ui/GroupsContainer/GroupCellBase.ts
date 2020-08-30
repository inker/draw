import styled, { css, keyframes } from 'styled-components'

import Cell from 'ui/table/Cell'

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
  animation: ${BorderGlow} 1s ease;
  box-shadow: 0 0 5px #6af;
`

const Picked = css`
  animation: ${Appear} 5s normal forwards;
`

interface Props {
  possible: boolean,
  hasTeam: boolean,
}

const GroupCellBase = styled(Cell)<Props>`
  ${props => props.possible && Possible}
  ${props => props.hasTeam && Picked}
`

export default GroupCellBase
