import Club from 'model/team/Club'
import NationalTeam from 'model/team/NationalTeam'

import getCountryFlagUrl from 'utils/getCountryFlagUrl'
import prefetchImage from 'utils/prefetchImage'

export default (pots: (Club & NationalTeam)[][]) => {
  const promises: Promise<void>[] = []
  for (const pot of pots) {
    const urls = pot.map(team => getCountryFlagUrl(team.country || team.name))
    promises.push(...urls.map(prefetchImage))
  }
  return Promise.all(promises)
}
