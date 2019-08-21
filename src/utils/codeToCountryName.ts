import countries from 'data/countries.json'

import {
  Country,
  UefaCountry,
} from 'model/types'

import objectToFunction from 'utils/objectToFunction'

interface CodeToCountryNameDictionary {
  [code: string]: Country | UefaCountry,
}

const o: CodeToCountryNameDictionary = {}

for (const [name, { bert, flag }] of Object.entries(countries)) {
  if (bert) {
    o[bert] = name as UefaCountry
  }
  o[flag] = name as Country
}

export default objectToFunction(o)
