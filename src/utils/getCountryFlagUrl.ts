import { memoize } from 'lodash'

import countryNames from 'data/country-names.json'

import { Country } from 'model/types'

declare const require: any

const requireFlag = require.context('flag-icon-css/flags/4x3/', false, /\.svg$/)

const getCountryFlagUrl = (country: Country) =>
  requireFlag(`./${countryNames[country].flag}.svg`) as string

export default memoize(getCountryFlagUrl)
