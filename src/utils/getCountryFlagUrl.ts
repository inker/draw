import countryNames from 'data/country-names.json'

declare const require: any

const requireFlag = require.context('flag-icon-css/flags/4x3/', false, /\.svg$/)

export default (code: string) => requireFlag(`./${countryNames[code]}.svg`) as string
