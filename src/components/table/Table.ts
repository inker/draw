import styled from 'styled-components'

// min-width, so it can have text overflow

const Table = styled.div`
  border: #aaa solid 1px;
  margin: 0px 5px 10px 5px;
  width: 150px;
  min-width: 0;

  @media (max-width: 999px) {
    margin: 0px 10px 20px 10px;
  }
`

export default Table
