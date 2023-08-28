import { type UefaCountry } from 'model/types'

import constraints from './constraints'

function mergePairs<T, U>(pairs: readonly (readonly [T, U])[]) {
  const map = new Map<T, Set<U>>()
  for (const [k, v] of pairs) {
    if (!map.has(k)) {
      map.set(k, new Set<U>())
    }
    map.get(k)!.add(v)
  }
  return map
}

export default (season: number) => {
  const matchingConstraints = constraints.filter(item => item.predicate(season))
  const originalPairs = matchingConstraints.map(item => item.countries)

  const invertedPairs = originalPairs.map(pair => pair.toReversed() as [UefaCountry, UefaCountry])
  const map = mergePairs([
    ...originalPairs,
    ...invertedPairs,
  ])
  return map.get.bind(map)
}
