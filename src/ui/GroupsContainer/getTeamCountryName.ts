import countries from 'data/countries.json'

import Team from 'model/team'
import Club from 'model/team/Club'

export default (team: Team) =>
  (team as Club).country || (team.name in countries ? team.name : undefined)
