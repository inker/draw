import styled, {
  type RuleSet,
  css,
  keyframes,
} from 'styled-components'

import Cell from 'ui/table/Cell'

const AppearLight = keyframes`
  from {
    background-color: rgb(255 255 0 / 0.5);
  }
`

const AppearDark = keyframes`
  from {
    background-color: rgb(192 224 255 / 0.5);
  }
`

const Picked = css`
  animation: ${props => props.theme.isDarkMode ? AppearDark : AppearLight} 3s ease-out normal forwards;
`

interface Props {
  $picked: boolean,
  $styles?: RuleSet<any>,
}

const MatchupCellBase = styled(Cell)<Props>`
  width: 150px;
  ${props => props.$picked && Picked}
  ${props => props.$styles}
`

export default MatchupCellBase
