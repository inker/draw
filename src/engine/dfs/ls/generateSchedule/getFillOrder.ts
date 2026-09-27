import { range, sumBy } from 'lodash';

import { type Ban } from './homeAwayPatterns';

/**
 * The order the solver fills matchdays in, tightest first
 */
export default function getFillOrder<NumMatchdays extends number>({
  numTeams,
  numMatchdays,
  bans,
  homeAwayPatterns,
}: {
  numTeams: number;
  numMatchdays: NumMatchdays;
  bans: Iterable<Ban>;
  homeAwayPatterns: {
    isViable: (team: number, isHome: boolean, md: number) => boolean;
    mustAlternate: (mdA: number, mdB: number) => boolean;
  };
}) {
  const numBansByMatchday = new Uint16Array(numMatchdays);
  for (const { matchday } of bans) {
    ++numBansByMatchday[matchday];
  }

  const teamIndices = range(numTeams);

  // Clubs whose bans leave them one location on the matchday.
  // A ban forces its club on the alternating partner matchday as well.
  const numForcedByMatchday = Array.from(
    {
      length: numMatchdays,
    },
    (_, md) =>
      teamIndices.filter(
        team =>
          !homeAwayPatterns.isViable(team, true, md) ||
          !homeAwayPatterns.isViable(team, false, md),
      ).length,
  );

  // A pair that has to alternate splits the clubs exactly in two:
  // those home on one matchday are the ones away on the other.
  // That links clubs to each other, which the per-club patterns cannot see,
  // so the search should meet it early rather than backtrack a long way to it.
  // Such matchdays are grouped to be filled back to back.
  const groups: number[][] = [];
  const isGrouped = new Uint8Array(numMatchdays);
  for (let md = 0; md < numMatchdays; ++md) {
    if (isGrouped[md]) {
      continue;
    }
    isGrouped[md] = 1;
    const group = [md];
    // The array iterator reads the length on every step,
    // so matchdays pushed during the loop are visited too.
    for (const member of group) {
      for (let other = 0; other < numMatchdays; ++other) {
        if (
          !isGrouped[other] &&
          homeAwayPatterns.mustAlternate(member, other)
        ) {
          isGrouped[other] = 1;
          group.push(other);
        }
      }
    }
    group.sort((a, b) => numBansByMatchday[b] - numBansByMatchday[a] || a - b);
    groups.push(group);
  }

  // Array.prototype.sort is stable,
  // so tied pairs stay in chronological order.
  const numForcedInGroup = (group: readonly number[]) =>
    sumBy(group, md => numForcedByMatchday[md]);
  const tightGroups = groups
    .filter(group => group.length > 1)
    .sort((a, b) => numForcedInGroup(b) - numForcedInGroup(a));

  // The free matchdays spread outward from the last pair filled.
  // Starting from the far end instead measured about 10% slower.
  const lastTightGroup = tightGroups.at(-1) ?? [];
  const distanceFromLastTightGroup = (md: number) =>
    Math.min(...lastTightGroup.map(other => Math.abs(other - md)));
  const freeMatchdays = groups
    .filter(group => group.length === 1)
    .map(([md]) => md)
    .sort(
      (a, b) =>
        numForcedByMatchday[b] - numForcedByMatchday[a] ||
        distanceFromLastTightGroup(a) - distanceFromLastTightGroup(b) ||
        a - b,
    );

  return [...tightGroups.flat(), ...freeMatchdays] as number[] & {
    length: NumMatchdays;
  };
}
