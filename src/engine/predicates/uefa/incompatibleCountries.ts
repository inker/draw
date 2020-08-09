import { stubFalse } from 'lodash'

import Team from 'model/team/Club'
import { Country } from 'model/types'

const constraints = [
  {
    countries: ['Russia', 'Ukraine'],
    interval: [2014, Number.MAX_SAFE_INTEGER],
  },
  {
    countries: ['Azerbaijan', 'Armenia'],
    interval: [0, Number.MAX_SAFE_INTEGER],
  },
  {
    countries: ['Serbia', 'Kosovo'],
    interval: [0, Number.MAX_SAFE_INTEGER],
  },
  {
    countries: ['Bosnia & Herzegovina', 'Kosovo'],
    interval: [0, Number.MAX_SAFE_INTEGER],
  },
  {
    countries: ['Spain', 'Gibraltar'],
    interval: [0, Number.MAX_SAFE_INTEGER],
  },
] as const

function makeGetOppositeCountry(season: number) {
  const map = new Map<Country, Country>()
  for (const { countries, interval } of constraints) {
    if (season < interval[0] || season > interval[1]) {
      continue
    }
    map.set(countries[0], countries[1])
    map.set(countries[1], countries[0])
  }
  return map.get.bind(map)
}

export default (season: number) => {
  const getOpposingCountry = makeGetOppositeCountry(season)
  return (teamPicked: Team) => {
    const otherCountry = getOpposingCountry(teamPicked.country)
    return otherCountry === undefined
      ? stubFalse
      : (otherTeam: Team) =>
        otherTeam.country === otherCountry
  }
}
