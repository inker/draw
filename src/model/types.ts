import countries from 'data/countries'

type Entry<T> = {
  [P in keyof T]: [P, T[P]];
}[keyof T];

type Countries = typeof countries

export type Country = keyof Countries

export type UefaCountry = Extract<Entry<Countries>, [Country, { confederation: 'UEFA' }]>[0]

export type Confederation = Countries[Country]['confederation']

export interface WorkerData<T> {
  messageId: any,
  data: {
    season: number,
    pots: readonly (readonly T[])[],
    groups: readonly (readonly T[])[],
    selectedTeam: T,
  },
}

export interface KoWorkerData<T> {
  messageId: any,
  data: {
    season: number,
    pots: readonly (readonly T[])[],
    matchups: readonly [T, T][],
  },
}

// eslint-disable-next-line max-len, @typescript-eslint/no-unused-vars
type Grow<T, A extends T[]> = ((x: T, ...xs: A) => void) extends ((...a: infer X) => void) ? X : never

type GrowToSize<T, A extends T[], N extends number> = {
  0: A,
  1: GrowToSize<T, Grow<T, A>, N>,
}[A['length'] extends N ? 0 : 1]

export type FixedArray<T, N extends number> = GrowToSize<T, [], N>
