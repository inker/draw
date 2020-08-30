import styled, { FlattenInterpolation } from 'styled-components'

import BaseContent from './BaseContent'

interface Props {
  styles?: FlattenInterpolation<any>,
}

const Header = styled(BaseContent)<Props>`
  justify-content: center;
  height: 100%;
  width: 100%;
  font-weight: 600;
  ${props => props.styles};
`

export default Header
