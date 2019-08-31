import { Predicate } from '@draws/engine'

import Team from 'model/team/KnockoutTeam'
import extraConstraints from '../extraConstraints'

const areCompatible = (a: Team, b: Team) =>
  a.country !== b.country
    && a.group !== b.group
    && !extraConstraints(a)(b)

const canFit = (pair: Team[], picked: Team) =>
  pair.length === 0 || pair.length === 1 && areCompatible(picked, pair[0])

const predicate: Predicate<Team> = (
  picked: Team,
  groups: Team[][],
  groupIndex: number,
) => canFit(groups[groupIndex], picked)

export default predicate
