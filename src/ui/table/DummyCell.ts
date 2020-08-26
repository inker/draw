import styled from 'styled-components'

import Cell from 'ui/table/Cell'

const DummyCell = styled(Cell)`
  visibility: hidden;
  pointer-events: none;

  &::before {
    content: '.';
  }
`

export default DummyCell
