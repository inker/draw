import * as React from 'react'
import styled from 'styled-components'

import countryNames from 'data/country-names'
import proxify from 'utils/proxify'

declare const require: (path: string) => any

const getCountryCode2 = (code3: string) =>
  countryNames[code3.toLowerCase()]

const getCountryFlag = (country: string) =>
  require(`flag-icon-css/flags/4x3/${getCountryCode2(country)}.svg`)

const Cell = styled.div`
  display: flex;
  align-items: center;

  height: 20px;
  font-size: 0.8em;

  ${({ country }) => country ? `background-image: url('${getCountryFlag(country)}')` : ''};
  background-position: 3px;
  background-size: 16px;
  background-repeat: no-repeat;
  padding-left: 22px;
  text-align: left;

  text-decoration: none;

  padding-right: 3px;
  border: #aaa solid 1px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  margin: -1px -1px -1px -1px;

  @media (max-width: 999px) {
    background-position: 4px;
    background-size: 32px;
    padding-left: 40px;
    font-family: 'Roboto Condensed', RobotoCondensed, RobotoCondensed-Regular, sans-serif;
    height: 40px;
    font-size: 1.5em;
  }
`

export default Cell
