import countries from 'data/countries.json'
import clubs from 'data/clubs.json'

export type Country = keyof typeof countries

export type UefaCountry = keyof typeof clubs

export type Confederation = 'UEFA' | 'AFC' | 'CAF' | 'CONMEBOL' | 'CONCACAF' | 'OFC'

export interface WorkerData<T> {
  messageId: any,
  data: {
    season: number,
    pots: T[][],
    groups: T[][],
    selectedTeam: T,
  },
}

// eslint-disable-next-line max-len
type Grow<T, A extends T[]> = ((x: T, ...xs: A) => void) extends ((...a: infer X) => void) ? X : never

type GrowToSize<T, A extends T[], N extends number> = {
  0: A,
  1: GrowToSize<T, Grow<T, A>, N>,
}[A['length'] extends N ? 0 : 1]

export type FixedArray<T, N extends number> = GrowToSize<T, [], N>
