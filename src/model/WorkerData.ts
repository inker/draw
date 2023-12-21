import { type FixedArray } from './types'

export interface WorkerMessage<T> {
  correlationId: any
  data: T
}

export interface GsWorkerData<T> {
  season: number
  pots: readonly (readonly T[])[]
  groups: readonly (readonly T[])[]
  selectedTeam: T
}

export interface KoWorkerData<T> {
  season: number
  pots: FixedArray<readonly T[], 2>
  matchups: readonly (readonly [T, T])[]
}
