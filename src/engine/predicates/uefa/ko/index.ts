import type { Predicate } from '@draws/engine'

import Team from 'model/team/KnockoutTeam'

import incompatibleCountries from '../incompatibleCountries'

export default (season: number) => {
  const isCountryIncompatibleWith = incompatibleCountries(season)

  const areCompatible = (a: Team, b: Team) =>
    a.country !== b.country
      && a.group !== b.group
      && !isCountryIncompatibleWith(a)(b)

  const canFit = (pair: readonly Team[], picked: Team) =>
    pair.length === 0 || pair.length === 1 && areCompatible(picked, pair[0])

  const predicate: Predicate<Team> = (
    picked: Team,
    groups: readonly (readonly Team[])[],
    groupIndex: number,
  ) => canFit(groups[groupIndex], picked)

  return predicate
}
