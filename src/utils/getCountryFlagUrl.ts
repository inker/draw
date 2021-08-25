import { memoize } from 'lodash'

import countries from 'data/countries'

import { Country } from 'model/types'

declare const require: any

const requireFlag = require.context('flag-icon-css/flags/4x3/', false, /\.svg$/)
const requireAltFlag = require.context('assets/altFlags/', false, /\.svg$/)

const flags = {
  Belarus: requireAltFlag('./bcb.svg'),
} as const

const getCountryFlagUrl = (country: Country) =>
  flags[country] as string
    ?? requireFlag(`./${countries[country].flag}.svg`) as string

export default memoize(getCountryFlagUrl)
