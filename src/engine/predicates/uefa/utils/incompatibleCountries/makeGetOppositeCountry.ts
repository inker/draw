import { type Country } from 'model/types'

import constraints from './constraints'

export default (season: number) => {
  const map = new Map<Country, Country>()
  for (const { countries, predicate } of constraints) {
    if (!predicate(season)) {
      continue
    }
    map.set(countries[0], countries[1])
    map.set(countries[1], countries[0])
  }
  return map.get.bind(map)
}
