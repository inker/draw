import styled from 'styled-components'
import Cell from './Cell'

declare const require: any

const requireFlag = require.context('flag-icon-css/flags/4x3/', false, /\.svg$/)

const CellWithoutFlag = styled(Cell)`
  background-position: 3px;
  background-size: 16px;
  background-repeat: no-repeat;

  padding-left: 22px;

  @media (max-width: 999px) {
    background-position: 4px;
    background-size: 32px;
    padding-left: 40px;
  }
`

const CellWithFlag = styled(CellWithoutFlag)`
  ${({ country }) => country && `
    background-image: url('${requireFlag(`./${country}.svg`)}');
  `}
`

export default CellWithFlag
