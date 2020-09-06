import styled from 'styled-components'

// min-width, so it can have text overflow

const Table = styled.table`
  table-layout: fixed;
  border-left: ${props => props.theme.border};
  border-right: ${props => props.theme.border};
  border-spacing: 0;
  border-collapse: collapse;
  margin: 0 5px 10px 5px;
  width: 150px;
  min-width: 0;

  @media (max-width: 999px) {
    width: auto;
    margin: 0 3px 6px 3px;
  }
`

export default Table
