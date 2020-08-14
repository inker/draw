import { memoize } from 'lodash'

import countries from 'data/countries.json'

import { Country } from 'model/types'

declare const require: any

const requireFlag = require.context('flag-icon-css/flags/4x3/', false, /\.svg$/)
const requireAltFlag = require.context('assets/altFlags/', false, /\.svg$/)

const getCountryFlagUrl = (country: Country) => {
  const req = country === 'Belarus'
    ? requireAltFlag
    : requireFlag
  return req(`./${countries[country].flag}.svg`).default as string
}

export default memoize(getCountryFlagUrl)
