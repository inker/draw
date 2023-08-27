import {
  countBy,
  identity,
  mapValues,
  sumBy,
} from 'lodash'

import { type Confederation } from 'model/types'
import type NationalTeam from 'model/team/NationalTeam'
import type UnknownNationalTeam from 'model/team/UnknownNationalTeam'
import { type Predicate } from 'engine/backtracking/gs'
import getSmallestArrayLength from 'utils/getSmallestArrayLength'

import getNumGroupsByYear from './getNumGroupsByYear'

type BerthsByConf = Record<Confederation, number>

type Team = NationalTeam | UnknownNationalTeam

export default (year: number, teams: readonly Team[]): Predicate<Team> => {
  const numGroups = getNumGroupsByYear(year)
  const groupSize = teams.length / numGroups
  // eslint-disable-next-line max-len
  const confederations = teams.flatMap(team => (team as NationalTeam).confederation ?? (team as UnknownNationalTeam).confederations)
  const berthsByConfederation = countBy(confederations, identity) as BerthsByConf
  const confMinMax = mapValues(berthsByConfederation, v => {
    const teamsPerGroup = v / numGroups
    return [Math.floor(teamsPerGroup), Math.ceil(teamsPerGroup)] as const
  })
  type Pair = [Confederation, readonly [number, number]]
  const confMinMaxEntries = Object.entries(confMinMax) as readonly Pair[]

  return (picked, groups, groupIndex) => {
    const group = groups[groupIndex]
    const currentPotIndex = getSmallestArrayLength(groups)

    if (group.length > currentPotIndex) {
      return false
    }

    const virtualGroup = [...group, picked] as const
    const numRemainingTeams = groupSize - virtualGroup.length
    return confMinMaxEntries.every(([conf, [min, max]]) => {
      const numConfTeams = sumBy(virtualGroup, team => {
        // @ts-expect-error
        const m = team.confederation
          ? (team as NationalTeam).confederation === conf
          : (team as UnknownNationalTeam).confederations.has(conf)
        return m ? 1 : 0
      })
      return numConfTeams <= max && numConfTeams + numRemainingTeams >= min
    })
  }
}
