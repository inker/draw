import * as React from 'react'
import styled from 'styled-components'

import countryNames from 'data/country-names'
import proxify from 'utils/proxify'

import BaseCell from './BaseCell'

declare const require: (path: string) => any

const getCountryCode2 = (code3: string) =>
  countryNames[code3.toLowerCase()]

const getCountryFlag = (country: string) =>
  require(`flag-icon-css/flags/4x3/${getCountryCode2(country)}.svg`)

const Cell = styled(BaseCell)`

  ${({ country }) => country && `
    background-position: 3px;
    background-size: 16px;
    background-repeat: no-repeat;
    background-image: url('${getCountryFlag(country)}')
  `};

  padding-left: 22px;
  padding-right: 3px;
  text-align: left;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 999px) {
    background-position: 4px;
    background-size: 32px;
    padding-left: 40px;
    font-family: 'Roboto Condensed', RobotoCondensed, RobotoCondensed-Regular, sans-serif;
  }
`

export default Cell
