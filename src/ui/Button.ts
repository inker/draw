import styled from 'styled-components'

const Button = styled.button`
  border-radius: 3px;
  border: ${props => props.theme.border};
  background-color: white;
  font-weight: normal;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }

  &:hover {
    border-color: black;
  }
`

export default Button
