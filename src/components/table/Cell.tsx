import * as React from 'react'
import styled from 'styled-components'

import countryNames from 'data/country-names'

const getCountryName = (countryCode: string) =>
  countryNames[countryCode.toLowerCase()].replace(' ', '-')

const getUrl = (countryName: string) =>
  `http://icons.iconarchive.com/icons/gosquared/flag/16/${countryName}-flat-icon.png`

const Cell = styled.div`
  display: flex;
  align-items: center;

  height: 20px;

  ${({ country }) => country ? `background-image: url('${getUrl(getCountryName(country))}')` : ''};
  background-position: 2px;
  background-repeat: no-repeat;
  padding-left: 20px;
  text-align: left;

  text-decoration: none;
  font-size: 0.8em;

  padding-right: 3px;
  border: #aaa solid 1px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  margin: -1px -1px -1px -1px;
`

export default Cell
