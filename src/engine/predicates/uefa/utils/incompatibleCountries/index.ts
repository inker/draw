import { stubFalse } from 'lodash'

import Team from 'model/team/Club'

import makeGetOppositeCountry from './makeGetOppositeCountry'

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
