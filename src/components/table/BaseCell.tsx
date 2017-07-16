import styled from 'styled-components'

const BaseCell = styled.div`
  display: flex;
  align-items: center;

  height: 20px;
  font-size: 13px;
  border: #aaa solid 1px;
  text-align: center;
  margin: -1px -1px -1px -1px;

  text-decoration: none;

  @media (max-width: 999px) {
    font-family: Roboto, sans-serif;
    height: 40px;
    font-size: 24px;
  }
`

export default BaseCell
