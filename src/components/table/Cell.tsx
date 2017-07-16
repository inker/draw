import styled from 'styled-components'
import BaseCell from './BaseCell'

const Cell = styled(BaseCell)`
  padding-left: 3px;
  padding-right: 3px;
  text-align: left;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 999px) {
    font-family: 'Roboto Condensed', RobotoCondensed, RobotoCondensed-Regular, sans-serif;
  }
`

export default Cell
