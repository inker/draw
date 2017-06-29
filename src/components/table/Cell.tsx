import * as React from 'react'
import styled from 'styled-components'

import countryNames from 'data/country-names'
import proxify from 'utils/proxify'

const FLAG_SIZE = Math.min(Math.ceil(devicePixelRatio) * 16, 64)

const getUrl = (countryName: string) =>
  proxify(`http://icons.iconarchive.com/icons/gosquared/flag/${FLAG_SIZE}/${countryName}-flat-icon.png`)

const getCountryName = (countryCode: string) =>
  countryNames[countryCode.toLowerCase()].replace(' ', '-')

const Cell = styled.div`
  display: flex;
  align-items: center;

  height: 20px;
  font-size: 0.8em;

  ${({ country }) => country ? `background-image: url('${getUrl(getCountryName(country))}')` : ''};
  background-position: 2px;
  background-size: 16px;
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
    background-position: 4px;
    background-size: 32px;
    padding-left: 40px;
    font-family: Roboto, sans-serif;
    height: 40px;
    font-size: 1.5em;
  }
`

export default Cell
