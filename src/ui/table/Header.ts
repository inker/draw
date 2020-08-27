import styled, { FlattenSimpleInterpolation } from 'styled-components'

import BaseCell from './BaseCell'

interface Props {
  styles?: FlattenSimpleInterpolation,
}

const Header = styled(BaseCell)<Props>`
  justify-content: center;
  height: 100%;
  width: 100%;
  font-weight: 600;
  ${props => props.styles};
`

export default Header
