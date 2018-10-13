import fetchPots from './fetchPotsData'
import getPairings from './getPairings'
import parseGS from './parseGs'

export default async (season: number, tournament: string) => {
  const fetchPotsPromise = fetchPots(tournament, season)
  const pairings = await getPairings(season, tournament)!
  const data = await fetchPotsPromise
  return parseGS(data, pairings)
}
