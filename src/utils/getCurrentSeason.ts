import currentSeason from './currentSeason'

export default (location) => {
  const seasonString = location.pathname.split('/')[3]
  return +(seasonString || currentSeason)
}
