import { stubFalse } from 'lodash'

import { type UefaCountry } from 'model/types'

import makeGetOppositeCountry from './makeGetOppositeCountry'

interface WithCountry {
  country: UefaCountry,
}

export default (season: number) => {
  const getOpposingCountry = makeGetOppositeCountry(season)
  return (teamPicked: WithCountry) => {
    const otherCountry = getOpposingCountry(teamPicked.country)
    return otherCountry === undefined
      ? stubFalse
      : (otherTeam: WithCountry) =>
        otherTeam.country === otherCountry
  }
}
