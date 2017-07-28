import * as levenstein from 'fast-levenshtein'
import { maxBy, memoize } from 'lodash'

import * as clubs from 'data/clubs.json'
import removeDiacritics from './removeDiacritics'
import { Team } from './team'

const I_RE = /y|j|(ij)/g
const KH_RE = /kh/g

const normalize = memoize(
  (s: string) => removeDiacritics(s)
    .toLowerCase()
    .replace(I_RE, 'i')
    .replace(KH_RE, 'k'),
)

const nameIncludes = (longerNorm: string, shorterNorm: string) =>
  new RegExp(`\\b${shorterNorm}\\b`).test(longerNorm)

const similarity = (a: string, b: string) =>
  1 - levenstein.get(a, b) / Math.max(a.length, b.length)

const arr: Team[] = []

for (const [country, clubNames] of Object.entries(clubs)) {
  for (const clubName of clubNames) {
    arr.push(new Team(clubName, country))
  }
}

function getClosest(teams: Team[], norm: string, threshold: number) {
  const distances = teams.map(team => ({
    team,
    dist: similarity(norm, normalize(team.name)),
  }))

  const closestObj = maxBy(distances, 'dist')
  return !closestObj || closestObj.dist < threshold ? null : closestObj.team.name
}

export default (teamName: string, country: string) => {
  if (!(country in clubs)) {
    console.error('no clubs from', country, 'including', teamName, 'exist yet')
    return null
  }
  const norm = normalize(teamName)
  const countryTeams = arr.filter(o => o.country === country)
  const including = countryTeams.filter(o => nameIncludes(norm, normalize(o.name)))
  return including.length === 1
    ? including[0].name
    : getClosest(including.length ? including : countryTeams, norm, 0.45)
}
