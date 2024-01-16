import styled from 'styled-components'

import Cell from '#ui/table/Cell'

const PotCell = styled(Cell)`
  & + & {
    border-left: ${props => props.theme.border};
  }
`

export default PotCell
