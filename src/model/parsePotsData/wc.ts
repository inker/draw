import { chunk } from 'lodash'

import countryNames from 'data/country-names.json'

import Team from 'model/team/NationalTeam'

export default (hosts: string[], rest: string[]) => {
  const teams = [
    ...hosts.map(c => new Team(c, 0, countryNames[c].confederation, true)),
    ...rest.map(c => new Team(c, 0, countryNames[c].confederation, false)),
  ]
  return chunk(teams, 8)
}
