import styled from 'styled-components';

// min-width, so it can have text overflow

const Table = styled.table`
  margin: 0 5px 10px;
  width: 150px;
  min-width: 0;
  table-layout: fixed;
  border-left: ${props => props.theme.border};
  border-right: ${props => props.theme.border};
  border-spacing: 0;
  border-collapse: collapse;

  @media (max-width: 999px) {
    margin: 0 3px 6px;
    width: max-content;
  }
`;

export default Table;
