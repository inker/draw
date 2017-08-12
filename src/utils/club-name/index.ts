import teams from './teams'
import normalize from './normalize'
import getClosest from './getClosest'

const nameIncludes = (longerNorm: string, shorterNorm: string) =>
  new RegExp(`\\b${shorterNorm}\\b`).test(longerNorm)

export default (teamName: string, country: string) => {
  if (!(country in teams)) {
    console.error('no clubs from', country, 'including', teamName, 'exist yet')
    return null
  }
  const norm = normalize(teamName)
  const countryTeams = teams[country]
  const including = countryTeams.filter(o => nameIncludes(norm, normalize(o.name)))
  return including.length === 1
    ? including[0].name
    : getClosest(including.length ? including : countryTeams, norm, 0.45)
}
