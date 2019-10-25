import Club from 'model/team/Club'
import NationalTeam from 'model/team/NationalTeam'

import getCountryFlagUrl from 'utils/getCountryFlagUrl'
import prefetchImage from 'utils/prefetchImage'

type TeamWithCountryAndName = Club | NationalTeam

const getTeamFlag = (team: TeamWithCountryAndName) =>
  getCountryFlagUrl((team as Club).country || team.name)

export default (pots: TeamWithCountryAndName[][]) => {
  const promises: Promise<void>[] = []
  for (const pot of pots) {
    const urls = pot.map(getTeamFlag)
    promises.push(...urls.map(prefetchImage))
  }
  return Promise.all(promises)
}
