import styled from 'styled-components'

import CellWithFlag from '../table/CellWithFlag'

interface Props {
  selected: boolean,
  picked: boolean,
}

const PotCell = styled<Props>(CellWithFlag)`
  ${props => props.selected && 'color: blue;'}
  ${props => props.picked && `
    filter: grayscale(0.5);
    opacity: 0.4;
  `}
`

export default PotCell
