import { countBy, identity, mapValues, sumBy } from 'lodash';

import { type Confederation } from '#model/types';
import type NationalTeam from '#model/team/NationalTeam';
import type UnknownNationalTeam from '#model/team/UnknownNationalTeam';
import { type Predicate } from '#engine/dfs/gs';
import getSmallestArrayLength from '#utils/getSmallestArrayLength';

import getNumGroupsByYear from './getNumGroupsByYear';

type BerthsByConf = Record<Confederation, number>;

type Team = NationalTeam | UnknownNationalTeam;

export default (year: number, teams: readonly Team[]): Predicate<Team> => {
  const numGroups = getNumGroupsByYear(year);
  const groupSize = teams.length / numGroups;
  const confederations = teams.flatMap(
    team =>
      (team as NationalTeam).confederation ?? [
        ...(team as UnknownNationalTeam).confederations,
      ],
  );
  const berthsByConfederation = countBy(
    confederations,
    identity,
  ) as BerthsByConf;
  const confMinMax = mapValues(berthsByConfederation, v => {
    const teamsPerGroup = v / numGroups;
    return [Math.floor(teamsPerGroup), Math.ceil(teamsPerGroup)] as const;
  });

  const confMinMaxEntries = Object.entries(confMinMax);

  const numMaxGroupsByConf = mapValues(berthsByConfederation, v => {
    const r = v % numGroups;
    return r === 0 ? numGroups : r;
  });

  return (picked, groups, groupIndex) => {
    const group = groups[groupIndex];
    const currentPotIndex = getSmallestArrayLength(groups);

    if (group.length > currentPotIndex) {
      return false;
    }

    const virtualGroup = [...group, picked] as const;
    const numRemainingTeams = groupSize - virtualGroup.length;
    const isGroupPossible = confMinMaxEntries.every(([conf, [min, max]]) => {
      const numConfTeams = sumBy(virtualGroup, team => {
        // @ts-expect-error
        const m = team.confederation
          ? (team as NationalTeam).confederation === conf
          : (team as UnknownNationalTeam).confederations.has(
              conf as Confederation,
            );
        return m ? 1 : 0;
      });
      return numConfTeams <= max && numConfTeams + numRemainingTeams >= min;
    });
    if (!isGroupPossible) {
      return false;
    }

    const virtualGroups = groups.with(groupIndex, virtualGroup);
    const areGroupsPossible = confMinMaxEntries.every(([conf, [, max]]) => {
      const numMaxedOutGroups = sumBy(virtualGroups, g => {
        const numConfTeams = sumBy(g, team => {
          // @ts-expect-error
          const m = team.confederation
            ? (team as NationalTeam).confederation === conf
            : (team as UnknownNationalTeam).confederations.has(
                conf as Confederation,
              );
          return m ? 1 : 0;
        });
        return numConfTeams === max ? 1 : 0;
      });
      return numMaxedOutGroups <= numMaxGroupsByConf[conf as Confederation];
    });

    if (!areGroupsPossible) {
      return false;
    }

    return true;
  };
};
