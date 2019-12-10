import { memoize } from 'lodash'

import countries from 'data/countries.json'

import { Country } from 'model/types'

declare const require: any

const requireFlag = require.context('flag-icon-css/flags/4x3/', false, /\.svg$/)

const getCountryFlagUrl = (country: Country) =>
  requireFlag(`./${countries[country].flag}.svg`).default as string

export default memoize(getCountryFlagUrl)
