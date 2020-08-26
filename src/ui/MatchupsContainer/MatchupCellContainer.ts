import styled, { css, keyframes } from 'styled-components'

import CellContainer from 'ui/table/CellContainer'

const Appear = keyframes`
  from {
    background-color: #ff8;
  }
  to {}
`

const Picked = css`
  animation: ${Appear} 5s normal forwards;
`

interface Props {
  picked?: boolean,
}

const GroupCellContainer = styled(CellContainer)<Props>`
  width: 150px;
  ${props => props.picked && Picked}
`

export default GroupCellContainer
