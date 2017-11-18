import { chunk } from 'lodash'

import Team from 'model/team/NationalTeam'

export default (teamData: any[]) => {
  const teams = teamData.map(o => new Team(o.name, o.code, 0, o.confederation))
  return chunk(teams, 8)
}
