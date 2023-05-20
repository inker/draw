import { stubFalse } from 'lodash'

import { type UefaCountry } from 'model/types'

import makeGetConflictingCountries from './makeGetConflictingCountries'

interface WithCountry {
  readonly country: UefaCountry,
}

export default (season: number) => {
  const getConflictingCountries = makeGetConflictingCountries(season)
  return (teamPicked: WithCountry) => {
    const conflictingCountries = getConflictingCountries(teamPicked.country)
    return conflictingCountries === undefined
      ? stubFalse
      : (otherTeam: WithCountry) =>
        conflictingCountries.has(otherTeam.country)
  }
}
