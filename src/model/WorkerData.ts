export default interface WorkerData {
  messageId: any,
}

export interface GsWorkerData<T> extends WorkerData {
  data: {
    season: number,
    pots: readonly (readonly T[])[],
    groups: readonly (readonly T[])[],
    selectedTeam: T,
  },
}

export interface KoWorkerData<T> extends WorkerData {
  data: {
    season: number,
    pots: readonly (readonly T[])[],
    matchups: readonly [T, T][],
  },
}
