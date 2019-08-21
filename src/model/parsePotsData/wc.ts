import { chunk } from 'lodash'

import countries from 'data/countries.json'

import Team from 'model/team/NationalTeam'

const countryNameToTeam = (host: boolean) =>
  (c: string) =>
    new Team(c, 0, countries[c].confederation, host)

const makeHost = countryNameToTeam(true)
const makeNonHost = countryNameToTeam(false)

export default (hosts: string[], rest: string[]) => {
  const teams = [
    ...hosts.map(makeHost),
    ...rest.map(makeNonHost),
  ]
  return chunk(teams, 8)
}
