import styled from 'styled-components'

const Button = styled.button`
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`

export default Button
