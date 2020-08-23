import styled from 'styled-components'

import StyledLink from './StyledLink'

const WithButton = StyledLink.withComponent('button')

const ButtonLink = styled(WithButton)`
  padding: initial;
  border: initial;
  background-color: initial;
`

export default ButtonLink
