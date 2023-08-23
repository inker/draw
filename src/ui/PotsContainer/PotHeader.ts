import styled, { css } from 'styled-components'

import Header from '../table/Header'

const Depleted = css`
  filter: grayscale(0.5);
  opacity: 0.4;
`

const Highlighted = css`
  color: #f70;
`

interface Props {
  $depleted: boolean,
  $highlighted: boolean,
}

const PotHeader = styled(Header)<Props>`
  ${props => props.$depleted && Depleted}
  ${props => props.$highlighted && Highlighted}
`

export default PotHeader
