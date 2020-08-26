import styled, { css } from 'styled-components'

import { Country } from 'model/types'
import getCountryFlagUrl from 'utils/getCountryFlagUrl'

import Cell from './Cell'

const CellWithoutFlag = styled(Cell)`
  background-position-y: 1px;
  background-size: 16px;
  background-repeat: no-repeat;

  padding-left: 19px;

  @media (max-width: 999px) {
    background-size: 12px;
    padding-left: 13px;
  }
`

interface Props {
  country?: Country,
}

const CellWithFlag = styled(CellWithoutFlag)<Props>`
  ${({ country }) => country && css`
    background-image: url('${getCountryFlagUrl(country)}');
  `}
`

export default CellWithFlag
