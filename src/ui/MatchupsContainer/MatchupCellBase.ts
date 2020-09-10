import styled, {
  css,
  keyframes,
  FlattenInterpolation,
} from 'styled-components'

import Cell from 'ui/table/Cell'

const Appear = keyframes`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`

const Picked = css`
  animation: ${Appear} 3s ease-out normal forwards;
`

interface Props {
  picked: boolean,
  styles?: FlattenInterpolation<any>,
}

const MatchupCellBase = styled(Cell)<Props>`
  width: 150px;
  ${props => props.picked && Picked};
  ${props => props.styles};
`

export default MatchupCellBase
