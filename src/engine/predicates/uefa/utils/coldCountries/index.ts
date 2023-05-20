import { type UefaCountry } from 'model/types'

const coldCountries: UefaCountry[] = [
  'Belarus',
  'Estonia',
  'Faroe Islands',
  'Finland',
  'Iceland',
  'Kazakhstan',
  'Latvia',
  'Lithuania',
  'Norway',
  'Russia',
  'Sweden',
]

const coldCountriesSet = new Set(coldCountries)

interface WithCountry {
  readonly country: UefaCountry,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (season: number) =>
  // eslint-disable-next-line unicorn/consistent-function-scoping
  (team: WithCountry) =>
    coldCountriesSet.has(team.country)
