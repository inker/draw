import type { Predicate } from '@draws/engine'
import { sumBy } from 'lodash'

import Team from 'model/team/GsTeam'
import getSmallestArrayLength from 'utils/getSmallestArrayLength'
import getHalfArrayOfIndex from 'utils/getHalfArrayOfIndex'

import incompatibleCountries from '../utils/incompatibleCountries'
import coldCountries from '../utils/coldCountries'
import big5 from '../utils/big5'

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

function getIsMaxTwoColdTeams(season: number, groupSize: number) {
  const gamesPerMatchday = groupSize >> 1
  const nonHomeTeamsPerMatchday = groupSize - gamesPerMatchday

  const isCold = coldCountries(season)

  const isColdNumber = (team: Team) =>
    isCold(team) ? 1 : 0

  return (group: Team[]) =>
    sumBy(group, isColdNumber) <= nonHomeTeamsPerMatchday
}

function getCanFitBigTeamsEvenly(season: number, groupSize: number) {
  const isBig5 = big5(season)

  const isBig5Number = (team: Team) =>
    isBig5(team) ? 1 : 0

  return (group: Team[]) => {
    const bigs = sumBy(group, isBig5Number)
    const spareSlots = groupSize - group.length
    return bigs <= 3 && bigs + spareSlots >= 2
  }
}

export default (season: number, groupSize: number): Predicate<Team> => {
  const isCountryIncompatibleWith = incompatibleCountries(season)
  const isMaxTwoColdTeams = getIsMaxTwoColdTeams(season, groupSize)
  const canFitBigTeamsEvenly = getCanFitBigTeamsEvenly(season, groupSize)

  return (picked, groups, groupIndex) => {
    const group = groups[groupIndex]
    const currentPotIndex = getSmallestArrayLength(groups)

    const isImpossible = group.length > currentPotIndex
      || group.some(isFromCountryOf(picked))
      || group.some(isCountryIncompatibleWith(picked))
      || !isMaxTwoColdTeams([...group, picked])
      || !canFitBigTeamsEvenly([...group, picked])
      || picked.pairing && getHalfArrayOfIndex(groups, groupIndex).some(hasTeam(picked.pairing))

    return !isImpossible
  }
}
