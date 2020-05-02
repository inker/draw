import defaultPairings from 'data/pairings.json'

import type Tournament from 'model/Tournament'

export default async (season: number, tournament: Tournament): Promise<[string, string][]> => {
  try {
    // eslint-disable-next-line max-len
    const pairings = await import(/* webpackChunkName: "pairings-[request]" */ `data/pairings/${season}/${tournament}.txt`)
    return (pairings.default as string)
      .trim()
      .split('\n\n')
      .map(line => line.trim().split('\n') as [string, string])
  } catch (err) {
    console.error('pairings for', tournament, season, 'do not exist, using the default ones')
  }

  return defaultPairings as [string, string][]
}
