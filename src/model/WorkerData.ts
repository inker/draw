import { type FixedArray } from './types'

interface GsWorkerData<T> {
  season: number
  pots: readonly (readonly T[])[]
  groups: readonly (readonly T[])[]
  selectedTeam: T
}

export interface GsWorkerDataSerialized<T> {
  season: number
  teams: readonly T[]
  pots: readonly (readonly number[])[]
  groups: readonly (readonly number[])[]
  selectedTeam: number
}

export const serializeGsWorkerData = <T>(
  data: GsWorkerData<T>,
): GsWorkerDataSerialized<T> => {
  const teams = [data.selectedTeam, ...data.pots.flat(), ...data.groups.flat()]

  const indexByTeam = new Map(teams.map((item, i) => [item, i] as const))

  const getIndexByTeam = (item: T) => indexByTeam.get(item)!

  return {
    ...data,
    teams,
    pots: data.pots.map(pot => pot.map(getIndexByTeam)),
    groups: data.groups.map(pot => pot.map(getIndexByTeam)),
    selectedTeam: getIndexByTeam(data.selectedTeam),
  }
}

export const deserializeGsWorkerData = <T>(
  data: GsWorkerDataSerialized<T>,
): GsWorkerData<T> => {
  const {
    teams,
    pots: potsSerialized,
    groups: groupsSerialized,
    selectedTeam: selectedTeamIndex,
  } = data

  return {
    ...data,
    pots: potsSerialized.map(pot => pot.map(i => teams[i])),
    groups: groupsSerialized.map(group => group.map(i => teams[i])),
    selectedTeam: teams[selectedTeamIndex],
  }
}

export interface KoWorkerData<T> {
  season: number
  pots: FixedArray<readonly T[], 2>
  matchups: readonly (readonly [T, T])[]
}

export interface KoWorkerDataSerialized<T> {
  season: number
  teams: readonly T[]
  pots: FixedArray<readonly number[], 2>
  matchups: readonly (readonly [number, number])[]
}

export const serializeKoWorkerData = <T>(
  data: KoWorkerData<T>,
): KoWorkerDataSerialized<T> => {
  const teams = [...data.pots.flat(), ...data.matchups.flat()]

  const indexByTeam = new Map(teams.map((item, i) => [item, i] as const))

  const getIndexByTeam = (item: T) => indexByTeam.get(item)!

  return {
    ...data,
    teams,
    pots: [data.pots[0].map(getIndexByTeam), data.pots[1].map(getIndexByTeam)],
    matchups: data.matchups.map(
      matchup =>
        [getIndexByTeam(matchup[0]), getIndexByTeam(matchup[1])] as const,
    ),
  }
}

export const deserializeKoWorkerData = <T>(
  data: KoWorkerDataSerialized<T>,
): KoWorkerData<T> => {
  const { teams, pots: potsSerialized, matchups: matchupsSerialized } = data

  return {
    ...data,
    pots: [
      potsSerialized[0].map(i => teams[i]),
      potsSerialized[1].map(i => teams[i]),
    ],
    matchups: matchupsSerialized.map(matchup => [
      teams[matchup[0]],
      teams[matchup[1]],
    ]),
  }
}
