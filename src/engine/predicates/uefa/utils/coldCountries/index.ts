import type Team from 'model/team/Club'
import { type UefaCountry } from 'model/types'

const coldCountries: UefaCountry[] = [
  'Kazakhstan',
  'Russia',
  'Belarus',
  'Lithuania',
  'Latvia',
  'Estonia',
  'Norway',
  'Finland',
  'Sweden',
  'Iceland',
  'Faroe Islands',
]

const coldCountriesSet = new Set(coldCountries)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (season: number) =>
  // eslint-disable-next-line unicorn/consistent-function-scoping
  (team: Team) =>
    coldCountriesSet.has(team.country)
