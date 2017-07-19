import * as levenstein from 'fast-levenshtein'
import { maxBy, memoize } from 'lodash'

import * as clubs from 'data/clubs.json'
import { Team } from './team'

const DIACRITICS_RE = /[\u0300-\u036f]/g
const I_RE = /y|j|(ij)/g

const removeDiacritics = (s: string) =>
  s.normalize('NFD').replace(DIACRITICS_RE, '')

const normalize = memoize(
  (s: string) => removeDiacritics(s).toLowerCase().replace(I_RE, 'i'),
)

const similarity = (a: string, b: string) =>
  1 - levenstein.get(a, b) / Math.max(a.length, b.length)

const arr: Team[] = []

for (const [country, clubNames] of Object.entries(clubs)) {
  for (const clubName of clubNames) {
    arr.push(new Team(clubName, country))
  }
}

export default (teamName: string, country: string) => {
  if (!(country in clubs)) {
    console.error('no clubs from', country, 'including', teamName, 'exist yet')
    return null
  }
  const norm = normalize(teamName)
  const countryTeams = arr.filter(o => o.country === country)
  const found = countryTeams.find(o => norm.includes(normalize(o.name)))
  if (found) {
    return found.name
  }
  const distances = countryTeams.map(team => ({
    team,
    dist: similarity(norm, normalize(team.name)),
  }))

  const foo = maxBy(distances, 'dist')
  return !foo || foo.dist < 0.5 ? null : foo.team.name
}
