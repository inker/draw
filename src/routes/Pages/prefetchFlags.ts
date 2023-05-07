import type Club from 'model/team/Club'
import type NationalTeam from 'model/team/NationalTeam'

import getCountryFlagUrl from 'utils/getCountryFlagUrl'
import prefetchImage from 'utils/prefetchImage'

type TeamWithCountryAndName = Club | NationalTeam

const getTeamFlag = (team: TeamWithCountryAndName) =>
  getCountryFlagUrl((team as Club).country ?? team.name)

export default (pots: readonly (readonly TeamWithCountryAndName[])[]) => {
  const promises = pots.flatMap(pot => pot.map(getTeamFlag).map(prefetchImage))
  return Promise.all(promises)
}
