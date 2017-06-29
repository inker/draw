import * as React from 'react'
import styled from 'styled-components'

import Cell from '../table/Cell'

const PotCell = styled(Cell)`
  ${props => props.selected && 'color: blue;'}
  ${props => props.picked && `
    filter: grayscale(0.5);
    opacity: 0.4;
  `}
`

export default PotCell
