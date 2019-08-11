import countryNames from 'data/country-names.json'

import Team from 'model/team'
import Club from 'model/team/Club'

export default (team: Team) =>
  (team as Club).country || (team.name in countryNames ? team.name : undefined)
