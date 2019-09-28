import styled from 'styled-components'

import BaseCell from './BaseCell'

interface Props {
  background?: string,
}

const Header = styled(BaseCell)<Props>`
  justify-content: center;
  font-weight: 600;
  background-color: ${props => props.background};
  color: ${props => props.color};
`

export default Header
