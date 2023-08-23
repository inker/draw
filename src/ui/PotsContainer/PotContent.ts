import styled, { css } from 'styled-components'

import ContentWithFlag from '../table/ContentWithFlag'

const Selected = css`
  color: ${props => props.theme.isDarkMode ? 'yellow' : 'blue'};
`

const Picked = css`
  filter: grayscale(0.5);
  opacity: 0.4;
`

interface Props {
  $selected: boolean,
  $picked: boolean,
}

const PotContent = styled(ContentWithFlag)<Props>`
  ${props => props.$selected && Selected}
  ${props => props.$picked && Picked}
`

export default PotContent
