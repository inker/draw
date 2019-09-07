import defaultPairings from 'data/pairings.json'

export default async (season: number, tournament: string): Promise<[string, string][]> => {
  try {
    const pairings = await import(/* webpackChunkName: "pairings-[request]" */ `data/pairings/${season}/${tournament}.txt`)
    return (pairings.default as string)
      .trim()
      .split('\n\n')
      .map(line => line.trim().split('\n') as [string, string])
  } catch (err) {
    console.log('pairings for', tournament, season, 'do not exist, using the default ones')
  }

  return defaultPairings as [string, string][]
}
