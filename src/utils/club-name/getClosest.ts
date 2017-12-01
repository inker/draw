import levenstein from 'fast-levenshtein'
import { maxBy } from 'lodash'

import Team from 'model/team'
import normalize from './normalize'

const similarity = (a: string, b: string) =>
  1 - levenstein.get(a, b) / Math.max(a.length, b.length)

export default (teams: Team[], norm: string, threshold: number) => {
  const distances = teams.map(team => ({
    team,
    dist: similarity(norm, normalize(team.name)),
  }))

  const closestObj = maxBy(distances, 'dist')
  return !closestObj || closestObj.dist < threshold ? null : closestObj.team.name
}
