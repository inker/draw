import type Team from 'model/team/KnockoutTeam'
import { type Predicate } from 'engine/backtracking/gs'
import getSmallestArrayLength from 'utils/getSmallestArrayLength'

import incompatibleCountries from '../utils/incompatibleCountries'

const isFrom = (country: string) => (team: Team) => team.country === country

const isFromCountryOf = (team: Team) => isFrom(team.country)

export default (season: number): Predicate<Team> => {
  const isCountryIncompatibleWith = incompatibleCountries(season)

  return (picked, groups, groupIndex) => {
    const { group: pickedGroup } = picked
    const group = groups[groupIndex]
    const currentPotIndex = getSmallestArrayLength(groups)

    const isImpossible =
      group.length > currentPotIndex ||
      group.some(team => team.group === pickedGroup) ||
      group.some(isFromCountryOf(picked)) ||
      group.some(isCountryIncompatibleWith(picked))

    return !isImpossible
  }
}
