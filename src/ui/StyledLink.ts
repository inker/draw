import styled from 'styled-components'

const StyledLink = styled.a`
  color: ${props => props.theme.isDarkMode ? '#f70' : 'blue'};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

export default StyledLink
