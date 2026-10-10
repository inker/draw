import firstPossibleGroup from '#engine/dfs/wc';
import type NationalTeam from '#model/team/NationalTeam';
import type UnknownNationalTeam from '#model/team/UnknownNationalTeam';
import {
  type GsWorkerDataSerialized,
  deserializeGsWorkerData,
} from '#model/WorkerData';
import exposeWorker, { type ExposedFuncType } from '#utils/worker/expose';

const func = (
  data: GsWorkerDataSerialized<NationalTeam | UnknownNationalTeam>,
) => {
  const { season, pots, groups, selectedTeam } = deserializeGsWorkerData(data);
  return firstPossibleGroup({
    season,
    pots,
    groups,
    picked: selectedTeam,
  });
};

export type Func = ExposedFuncType<typeof func>;

exposeWorker(func);
