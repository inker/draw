import { Predicate } from '@draws/engine'
import {
  countBy,
  sumBy,
  mapValues,
} from 'lodash'

import { Confederation } from 'model/types'
import Team from 'model/team/NationalTeam'
import getSmallestArrayLength from 'utils/getSmallestArrayLength'

import getNumGroupsByYear from './getNumGroupsByYear'

type BerthsByConf = {
  [key in Confederation]: number
}

export default (year: number, teams: readonly Team[]): Predicate<Team> => {
  const numGroups = getNumGroupsByYear(year)
  const groupSize = teams.length / numGroups
  const berthsByConfederation = countBy(teams, team => team.confederation) as BerthsByConf
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
      const numConfTeams = sumBy(virtualGroup, team => team.confederation === conf ? 1 : 0)
      return numConfTeams <= max && numConfTeams + numRemainingTeams >= min
    })
  }
}
