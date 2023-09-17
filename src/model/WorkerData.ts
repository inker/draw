export interface WorkerMessage<T> {
  messageId: any,
  data: T,
}

export interface GsWorkerData<T> {
  season: number,
  pots: readonly (readonly T[])[],
  groups: readonly (readonly T[])[],
  selectedTeam: T,
}

export interface KoWorkerData<T> {
  season: number,
  pots: readonly (readonly T[])[],
  matchups: readonly (readonly [T, T])[],
}
