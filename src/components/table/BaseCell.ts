import styled from 'styled-components'

const BaseCell = styled.div`
  display: flex;
  align-items: center;

  height: 19px;
  margin: -1px -1px -1px -1px;
  border: #aaa solid 1px;

  text-align: center;
  text-decoration: none;
  font-family: Tahoma, Arial, sans-serif;
  font-size: 12px;

  @media (max-width: 999px) {
    height: 14px;
    font-family: Roboto, sans-serif;
    font-size: 10px;
  }
`

export default BaseCell
