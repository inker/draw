import * as React from 'react'
import styled from 'styled-components'

import countryNames from 'data/country-names'

const PROXY_URL = 'https://proxy-antonv.rhcloud.com/?url='

export const proxify =
  (url: string) => `${PROXY_URL}${url}`

const getCountryName = (countryCode: string) =>
  countryNames[countryCode.toLowerCase()].replace(' ', '-')

const getUrl = (countryName: string) =>
  proxify(`http://icons.iconarchive.com/icons/gosquared/flag/16/${countryName}-flat-icon.png`)

const Cell = styled.div`
  display: flex;
  align-items: center;

  height: 20px;
  font-size: 0.8em;

  ${({ country }) => country ? `background-image: url('${getUrl(getCountryName(country))}')` : ''};
  background-position: 2px;
  background-repeat: no-repeat;
  padding-left: 20px;
  text-align: left;

  text-decoration: none;

  padding-right: 3px;
  border: #aaa solid 1px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  margin: -1px -1px -1px -1px;

  @media (max-width: 999px) {
    height: 30px;
    font-size: 1em;
  }
`

export default Cell
