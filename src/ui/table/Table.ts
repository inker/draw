import styled from 'styled-components'

// min-width, so it can have text overflow

const Table = styled.table`
  border-left: #aaa solid 1px;
  border-right: #aaa solid 1px;
  border-spacing: 0;
  border-collapse: collapse;
  margin: 0 5px 10px 5px;
  width: 150px;
  min-width: 0;

  @media (max-width: 999px) {
    margin: 0 3px 6px 3px;
  }
`

export default Table
