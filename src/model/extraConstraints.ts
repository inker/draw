import Team from './team'

const pickedRu = (otherTeam: Team) => otherTeam.country === 'ua'
const pickedUa = (otherTeam: Team) => otherTeam.country === 'ru'
const pickedDefault = (otherTeam: Team) => false

export default (teamPicked: Team) =>
  teamPicked.country === 'ru' ? pickedRu : teamPicked.country === 'ua' ? pickedUa : pickedDefault
