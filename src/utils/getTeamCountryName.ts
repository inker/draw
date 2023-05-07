import countries from 'data/countries'

import type Team from 'model/team'
import type Club from 'model/team/Club'

export default (team: Team) =>
  (team as Club).country ?? (team.name in countries ? team.name : undefined)
