import defaultPairings from 'data/pairings.json'

import type Tournament from 'model/Tournament'

export default async (season: number, tournament: Tournament): Promise<[string, string][]> => {
  try {
    const pairings = await import(/* webpackChunkName: "[request]", webpackMode: "lazy-once" */ `data/${tournament}/gs/${season}/pairings.txt`)
    return (pairings.default as string)
      .trim()
      .split('\n\n')
      .map(line => line.trim().split('\n') as [string, string])
  } catch {
    console.error('pairings for', tournament, season, 'do not exist, using the default ones')
  }

  return defaultPairings as [string, string][]
}
