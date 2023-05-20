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

interface WithCountry {
  country: UefaCountry,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (season: number) =>
  // eslint-disable-next-line unicorn/consistent-function-scoping
  (team: WithCountry) =>
    coldCountriesSet.has(team.country)
