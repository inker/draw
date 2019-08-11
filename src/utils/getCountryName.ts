import countryNames from 'data/country-names.json'

import { Country } from 'model/types'

import objectToFunction from 'utils/objectToFunction'

const o: { [code: string]: Country } = {}

for (const [name, { bert, flag }] of Object.entries(countryNames)) {
  if (bert) {
    o[bert] = name as Country
  }
  o[flag] = name as Country
}

export default objectToFunction(o)
