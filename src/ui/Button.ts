import styled from 'styled-components'

const Button = styled.button`
  border: ${props => props.theme.border};
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`

export default Button
