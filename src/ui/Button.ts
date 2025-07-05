import styled, { css } from 'styled-components';

const Button = styled.button`
  border-radius: 3px;
  border: var(--border);
  background-color: light-dark(white, #246);
  color: light-dark(black, white);
  font-weight: normal;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }

  &:hover {
    ${props =>
      props.theme.isDarkMode
        ? css`
            background-color: #468;
          `
        : css`
            border-color: black;
          `}
  }
`;

export default Button;
