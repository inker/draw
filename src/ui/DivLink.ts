import styled from 'styled-components'

import StyledLink from './StyledLink'

const WithDiv = StyledLink.withComponent('div')

const DivLink = styled(WithDiv)`
  cursor: pointer;
`

export default DivLink
