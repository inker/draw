import type Team from 'model/team/KnockoutTeam'
import { type Predicate } from 'engine/backtracking/gs'

import incompatibleCountries from '../utils/incompatibleCountries'

export default (season: number): Predicate<Team> => {
  const isCountryIncompatibleWith = incompatibleCountries(season)

  const areCompatible = (a: Team, b: Team) =>
    a.country !== b.country
      && a.group !== b.group
      && !isCountryIncompatibleWith(a)(b)

  const canFit = (pair: readonly Team[], picked: Team) =>
    pair.length === 0 || pair.length === 1 && areCompatible(picked, pair[0])

  return (picked, groups, groupIndex) =>
    canFit(groups[groupIndex], picked)
}
