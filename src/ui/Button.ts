import styled, { css } from 'styled-components';

const Button = styled.button`
  border-radius: 3px;
  border: ${props => props.theme.border};
  background-color: ${props => (props.theme.isDarkMode ? '#246' : 'white')};
  color: ${props => (props.theme.isDarkMode ? 'white' : '')};
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
