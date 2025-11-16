import memoizeOne from 'memoize-one';
import { countBy, identity, orderBy, sum, sumBy } from 'lodash';

import { firstPossibleGroup } from '#engine/dfs/gs';
import getPredicate from '#engine/predicates/wc';
import type NationalTeam from '#model/team/NationalTeam';
import type UnknownNationalTeam from '#model/team/UnknownNationalTeam';
import { type Confederation } from '#model/types';
import {
  type GsWorkerDataSerialized,
  deserializeGsWorkerData,
} from '#model/WorkerData';
import exposeWorker, { type ExposedFuncType } from '#utils/worker/expose';

type GetPredicateParams = Parameters<typeof getPredicate>;

function serializeArgs([year, teams]: GetPredicateParams) {
  const orderedTeams = orderBy(teams, team => team.id);
  return JSON.stringify({
    year,
    teams: orderedTeams,
  });
}

const eqFunc = (newArgs: GetPredicateParams, oldArgs: GetPredicateParams) =>
  serializeArgs(newArgs) === serializeArgs(oldArgs);

const getPredicateMemoized = memoizeOne(getPredicate, eqFunc);

const func = (
  data: GsWorkerDataSerialized<NationalTeam | UnknownNationalTeam>,
) => {
  const { season, pots, groups, selectedTeam } = deserializeGsWorkerData(data);

  const teams = [selectedTeam, ...pots.flat(), ...groups.flat()];
  const confederations = teams.flatMap(
    team =>
      (team as NationalTeam).confederation ??
      (team as UnknownNationalTeam).confederations,
  );
  const berthsByConfederation = countBy(confederations, identity) as Record<
    Confederation,
    number
  >;

  const isFirstHalf = sumBy(pots, pot => (pot.length > 0 ? 1 : 0)) > 2;

  // Start with teams from the most represented confederation
  const orderedPots = orderBy(
    pots.map(pot =>
      orderBy(pot, t => {
        if ((t as UnknownNationalTeam).confederations) {
          return -sum(
            (t as UnknownNationalTeam).confederations
              .values()
              .map(conf => berthsByConfederation[conf])
              .toArray(),
          );
        }
        return -berthsByConfederation[(t as NationalTeam).confederation];
      }),
    ),
    [
      pot => pot.length,
      pot =>
        isFirstHalf
          ? sumBy(pot, t => {
              if ((t as UnknownNationalTeam).confederations) {
                return -sum(
                  (t as UnknownNationalTeam).confederations
                    .values()
                    .map(conf => berthsByConfederation[conf])
                    .toArray(),
                );
              }
              return -berthsByConfederation[(t as NationalTeam).confederation];
            })
          : 1,
    ],
  );
  const predicate = getPredicateMemoized(season, teams);
  return firstPossibleGroup({
    pots: orderedPots,
    groups,
    picked: selectedTeam,
    predicate,
  });
};

export type Func = ExposedFuncType<typeof func>;

exposeWorker(func);
