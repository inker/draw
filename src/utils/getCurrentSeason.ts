import currentSeason from 'model/currentSeason'

export default (location) => {
  if (!location) {
    return currentSeason
  }
  const seasonString = location.pathname.split('/')[3]
  return +(seasonString || currentSeason)
}
