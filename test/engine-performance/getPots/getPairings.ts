import clPairings from './pairings/cl'
import elPairings from './pairings/el'

export default async (season: number, tournament: string): Promise<[string, string][]> => {
  return tournament === 'cl' ? clPairings : tournament === 'el' ? elPairings : null as any
}
