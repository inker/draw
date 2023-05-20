import { stubFalse } from 'lodash'

import { type UefaCountry } from 'model/types'

import makeGetOppositeCountry from './makeGetOppositeCountry'

interface WithCountry {
  country: UefaCountry,
}

export default (season: number) => {
  const getOpposingCountry = makeGetOppositeCountry(season)
  return (teamPicked: WithCountry) => {
    const otherCountries = getOpposingCountry(teamPicked.country)
    return otherCountries === undefined
      ? stubFalse
      : (otherTeam: WithCountry) =>
        otherCountries.has(otherTeam.country)
  }
}
