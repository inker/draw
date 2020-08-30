import styled from 'styled-components'

const Cell = styled.td`
  height: 20px;
  padding: 0;
  background-color: white;

  @media (max-width: 999px) {
    height: 14px;
  }
`

export default Cell
