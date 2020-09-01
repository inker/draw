import { chunk } from 'lodash'

import countries from 'data/countries'

import Team from 'model/team/NationalTeam'

const countryNameToTeam = (host: boolean) =>
  (c: string) =>
    new Team(c, 0, countries[c].confederation, host)

const makeHost = countryNameToTeam(true)
const makeNonHost = countryNameToTeam(false)

export default (hosts: readonly string[], rest: readonly string[]) => {
  const teams = [
    ...hosts.map(makeHost),
    ...rest.map(makeNonHost),
  ]
  return chunk(teams, 8)
}
