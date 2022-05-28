import styled, { FlattenInterpolation } from 'styled-components'

import BaseContent from './BaseContent'

interface Props {
  styles?: FlattenInterpolation<any>,
}

const Header = styled(BaseContent)<Props>`
  justify-content: center;
  width: 100%;
  height: 100%;
  font-weight: 600;
  ${props => props.styles}
`

export default Header
