import { stubFalse } from 'lodash'

import Team from 'model/team/Club'

const RUSSIA = 'Russia'
const UKRAINE = 'Ukraine'

const pickedRu = (otherTeam: Team) => otherTeam.country === UKRAINE
const pickedUa = (otherTeam: Team) => otherTeam.country === RUSSIA

export default (teamPicked: Team) =>
  teamPicked.country === RUSSIA ? pickedRu : teamPicked.country === UKRAINE ? pickedUa : stubFalse
