import type { Predicate } from '@draws/engine'
import { sumBy } from 'lodash'

import Team from 'model/team/GsTeam'
import getSmallestArrayLength from 'utils/getSmallestArrayLength'
import getHalfArrayOfIndex from 'utils/getHalfArrayOfIndex'

import incompatibleCountries from '../utils/incompatibleCountries'
import coldCountries from '../utils/coldCountries'

const isFrom = (country: string) =>
  (team: Team) =>
    team.country === country

const isFromCountryOf = (team: Team) =>
  isFrom(team.country)

function isTeamEqualTo(team: Team) {
  const { id } = team
  return (otherTeam: Team) =>
    otherTeam.id === id
}

function hasTeam(team: Team) {
  const isEqualToTeam = isTeamEqualTo(team)
  return (group: readonly Team[]) =>
    group.some(isEqualToTeam)
}

export default (season: number, groupSize: number): Predicate<Team> => {
  const gamesPerMatchday = groupSize >> 1
  const nonHomeTeamsPerMatchday = groupSize - gamesPerMatchday

  const isCountryIncompatibleWith = incompatibleCountries(season)

  const isCold = coldCountries(season)

  const isColdNumber = (team: Team) =>
    isCold(team) ? 1 : 0

  const isMaxTwoColdTeams = (group: Team[]) =>
    sumBy(group, isColdNumber) <= nonHomeTeamsPerMatchday

  return (picked, groups, groupIndex) => {
    const group = groups[groupIndex]
    const currentPotIndex = getSmallestArrayLength(groups)

    const isImpossible = group.length > currentPotIndex
      || group.some(isFromCountryOf(picked))
      || group.some(isCountryIncompatibleWith(picked))
      || !isMaxTwoColdTeams([...group, picked])
      || picked.pairing && getHalfArrayOfIndex(groups, groupIndex).some(hasTeam(picked.pairing))

    return !isImpossible
  }
}
