import { chunk, countBy, identity, mapValues, stubTrue, sumBy } from 'lodash';

import { type Confederation, type Country } from '#model/types';
import type NationalTeam from '#model/team/NationalTeam';
import type UnknownNationalTeam from '#model/team/UnknownNationalTeam';
import { type Predicate } from '#engine/dfs/gs';
import getSmallestArrayLength from '#utils/getSmallestArrayLength';

import getNumGroupsByYear from './getNumGroupsByYear';

type BerthsByConf = Record<Confederation, number>;

type Team = NationalTeam | UnknownNationalTeam;

const getNumConfTeams = (group: readonly Team[], conf: Confederation) =>
  sumBy(group, team => {
    // @ts-expect-error
    const m = team.confederation
      ? (team as NationalTeam).confederation === conf
      : (team as UnknownNationalTeam).confederations.has(conf);
    return m ? 1 : 0;
  });

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

  const isPossibleByRankingConstraint = ((): Predicate<Team> => {
    if (year === 2026) {
      const quarters = [
        [4, 8, 5],
        [7, 3, 6],
        [2, 0, 11],
        [9, 1, 10],
      ] satisfies number[][];

      const halves = chunk(quarters, 2).map(c => c.flat());

      const quarterByGroup = new Map(
        quarters.values().flatMap((arr, qi) => arr.values().map(i => [i, qi])),
      );

      const firstFourTeams = (
        ['Spain', 'Argentina', 'France', 'England'] satisfies Country[]
      ).map(name => teams.find(t => t.name === name)!);

      const rankByTeam = new Map(
        firstFourTeams.values().map((t, i) => [t.id, i]),
      );

      return (picked, groups, groupIndex) => {
        const rank = rankByTeam.get(picked.id);
        if (rank !== undefined) {
          const quarter = quarterByGroup.get(groupIndex)!;
          const isAnotherTeamInSameQuarter = quarters[quarter].some(gi =>
            groups[gi].some(t => rankByTeam.has(t.id)),
          );
          if (isAnotherTeamInSameQuarter) {
            return false;
          }
          const half = quarter >> 1;
          const otherRank = rank ^ 1;
          const otherRankTeam = firstFourTeams[otherRank];
          const isOtherTeamInSameHalf = halves[half].some(gi =>
            groups[gi].some(t => t.id === otherRankTeam.id),
          );
          if (isOtherTeamInSameHalf) {
            return false;
          }
        }
        return true;
      };
    }

    return stubTrue;
  })();

  return (picked, groups, groupIndex) => {
    const group = groups[groupIndex];
    const currentPotIndex = getSmallestArrayLength(groups);

    if (group.length > currentPotIndex) {
      return false;
    }

    if (!isPossibleByRankingConstraint(picked, groups, groupIndex)) {
      return false;
    }

    const virtualGroup = [...group, picked] as const;
    const numRemainingTeams = groupSize - virtualGroup.length;
    const isGroupPossible = confMinMaxEntries.every(([conf, [min, max]]) => {
      const numConfTeams = getNumConfTeams(virtualGroup, conf as Confederation);
      return numConfTeams <= max && numConfTeams + numRemainingTeams >= min;
    });
    if (!isGroupPossible) {
      return false;
    }

    const virtualGroups = groups.with(groupIndex, virtualGroup);
    const areGroupsPossible = confMinMaxEntries.every(([conf, [, max]]) => {
      const numMaxedOutGroups = sumBy(virtualGroups, g => {
        const numConfTeams = getNumConfTeams(g, conf as Confederation);
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
