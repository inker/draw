import styled, { css } from 'styled-components';

export const linkCss = css`
  color: light-dark(blue, #f70);
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledLink = styled.a`
  ${linkCss}
`;

export default StyledLink;
