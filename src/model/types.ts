import type countries from 'data/countries'

type Entry<T> = {
  [P in keyof T]: [P, T[P]];
}[keyof T];

type Countries = typeof countries

export type Country = keyof Countries

export type UefaCountry = Extract<Entry<Countries>, [Country, { confederation: 'UEFA' }]>[0]

export type Confederation = Countries[Country]['confederation']

// eslint-disable-next-line max-len
type Grow<T, A extends T[]> = ((x: T, ...xs: A) => void) extends ((...a: infer X) => void) ? X : never

type GrowToSize<T, A extends T[], N extends number> = {
  0: A,
  1: GrowToSize<T, Grow<T, A>, N>,
}[A['length'] extends N ? 0 : 1]

export type FixedArray<T, N extends number> = GrowToSize<T, [], N>

export type OptionalPropertyOf<T> = {
  [K in keyof T]-?: undefined extends T[K] ? K : never
}[keyof T]

export type Reverse<Tuple> = Tuple extends readonly [infer Head, ...infer Rest]
  ? readonly [...Reverse<Rest>, Head] : readonly [];
