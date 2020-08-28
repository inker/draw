import styled, {
  css,
  keyframes,
  FlattenInterpolation,
} from 'styled-components'

import CellContainer from 'ui/table/CellContainer'

const Appear = keyframes`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`

const Picked = css`
  animation: ${Appear} 5s normal forwards;
`

interface Props {
  hasTeam: boolean,
  styles?: FlattenInterpolation<any>,
}

const GroupCellContainer = styled(CellContainer)<Props>`
  width: 150px;
  ${props => props.hasTeam && Picked};
  ${props => props.styles};
`

export default GroupCellContainer
