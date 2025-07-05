import styled from 'styled-components';

import Cell from '#ui/table/Cell';

const PotCell = styled(Cell)`
  & + & {
    border-left: var(--border);
  }
`;

export default PotCell;
