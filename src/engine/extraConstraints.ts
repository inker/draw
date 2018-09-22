import Team from 'model/team'

const CODE_RU = 'ru'
const CODE_UA = 'ua'

const pickedRu = (otherTeam: Team) => otherTeam.country === CODE_UA
const pickedUa = (otherTeam: Team) => otherTeam.country === CODE_RU
const pickedDefault = (otherTeam: Team) => false

export default (teamPicked: Team) =>
  teamPicked.country === CODE_RU ? pickedRu : teamPicked.country === CODE_UA ? pickedUa : pickedDefault
