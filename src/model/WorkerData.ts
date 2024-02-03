interface GsWorkerData<T> {
  season: number;
  pots: readonly (readonly T[])[];
  groups: readonly (readonly T[])[];
  selectedTeam: T;
}

export interface GsWorkerDataSerialized<T> {
  season: number;
  teams: readonly T[];
  pots: readonly (readonly number[])[];
  groups: readonly (readonly number[])[];
  selectedTeam: number;
}

export const serializeGsWorkerData = <T>(
  data: GsWorkerData<T>,
): GsWorkerDataSerialized<T> => {
  const teams = [data.selectedTeam, ...data.pots.flat(), ...data.groups.flat()];

  const indexByTeam = new Map(teams.map((item, i) => [item, i] as const));

  const getIndexByTeam = (item: T) => indexByTeam.get(item)!;

  return {
    ...data,
    teams,
    pots: data.pots.map(pot => pot.map(getIndexByTeam)),
    groups: data.groups.map(pot => pot.map(getIndexByTeam)),
    selectedTeam: getIndexByTeam(data.selectedTeam),
  };
};

export const deserializeGsWorkerData = <T>(
  data: GsWorkerDataSerialized<T>,
): GsWorkerData<T> => {
  const {
    teams,
    pots: potsSerialized,
    groups: groupsSerialized,
    selectedTeam: selectedTeamIndex,
  } = data;

  return {
    ...data,
    pots: potsSerialized.map(pot => pot.map(i => teams[i])),
    groups: groupsSerialized.map(group => group.map(i => teams[i])),
    selectedTeam: teams[selectedTeamIndex],
  };
};
