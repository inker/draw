import { memoize } from 'lodash'

import countries from 'data/countries'

import { type Country } from 'model/types'

declare const require: any

const requireFlag = require.context('flag-icons/flags/4x3/', false, /\.svg$/)
const requireAltFlag = require.context('assets/altFlags/', false, /\.svg$/)

const flags = {
  Belarus: requireAltFlag('./bcb.svg'),
  Moldova: requireAltFlag('./mda.svg'),
} as const

function getCountryFlagUrl(country: Country) {
  const exceptionalFlag = flags[country as keyof typeof flags]
  if (exceptionalFlag) {
    return exceptionalFlag
  }

  const flag = countries[country]?.flag
  return flag
    ? requireFlag(`./${flag}.svg`) as string
    : undefined
}

export default memoize(getCountryFlagUrl)
