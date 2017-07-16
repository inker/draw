import styled from 'styled-components'
import countryNames from 'data/country-names'
import Cell from './Cell'

declare const require: (path: string) => any

const getCountryCode2 = (code3: string) =>
  countryNames[code3.toLowerCase()]

const getCountryFlag = (country: string) =>
  require(`flag-icon-css/flags/4x3/${getCountryCode2(country)}.svg`)

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
    background-image: url('${getCountryFlag(country)}');
  `}
`

export default CellWithFlag
