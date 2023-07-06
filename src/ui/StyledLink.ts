import styled, { css } from 'styled-components'

export const linkCss = css`
  color: ${props => props.theme.isDarkMode ? '#f70' : 'blue'};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const StyledLink = styled.a`
  ${linkCss}
`

export default StyledLink
