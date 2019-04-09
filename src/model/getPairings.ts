import defaultPairings from 'data/pairings.json'

export default async (season: number, tournament: string): Promise<[string, string][]> => {
  try {
    const pairings = await import(`data/pairings/${season}/${tournament}.json`)
    return pairings.default
  } catch (err) {
    console.log('pairings for ', tournament, season, 'do not exist, using the default ones')
  }

  return defaultPairings as [string, string][]
}
