import { sum } from 'lodash';

import type Team from '#model/team/GsTeam';

type ReadonlyDoubleArray<T> = readonly (readonly T[])[];

/**
 * Whether the TV pairs leave no way to put half of every pot
 * into each half of the groups.
 * The pairwise check only notices once the pot that can't be split comes up,
 * after the search has tried every way to draw the pots before it,
 * which took minutes on some EL draws
 */
export default (
  groups: ReadonlyDoubleArray<Team>,
  pots: ReadonlyDoubleArray<Team>,
): boolean => {
  const numGroupsPerHalf = groups.length >> 1;
  const isInFirstHalfByTeam = new Map<Team, boolean>();
  // teams in the first half of the groups, by pot
  const firstHalfCounts = pots.map(() => 0);
  for (const [groupIndex, group] of groups.entries()) {
    const isFirstHalf = groupIndex < numGroupsPerHalf;
    // groups are filled pot by pot, so a team's position is its pot
    for (const [potIndex, team] of group.entries()) {
      isInFirstHalfByTeam.set(team, isFirstHalf);
      if (isFirstHalf) {
        ++firstHalfCounts[potIndex];
      }
    }
  }

  const potIndexByTeam = new Map(
    pots.flatMap((pot, potIndex) => pot.map(team => [team, potIndex] as const)),
  );
  // teams that can go into either half, by pot
  const numFreeTeams = pots.map(() => 0);
  // pots of pairs with neither team drawn yet,
  // one of which gets a first-half team
  const openPairs: (readonly [number, number])[] = [];
  const pairedTeams = new Set<Team>();
  for (const [potIndex, pot] of pots.entries()) {
    for (const team of pot) {
      const { pairing } = team;
      if (!pairing) {
        ++numFreeTeams[potIndex];
        continue;
      }
      const isPairingInFirstHalf = isInFirstHalfByTeam.get(pairing);
      const pairingPotIndex = potIndexByTeam.get(pairing);
      if (isPairingInFirstHalf !== undefined) {
        if (!isPairingInFirstHalf) {
          ++firstHalfCounts[potIndex];
        }
      } else if (pairingPotIndex === undefined) {
        ++numFreeTeams[potIndex];
      } else if (!pairedTeams.has(team)) {
        openPairs.push([potIndex, pairingPotIndex]);
        pairedTeams.add(pairing);
      }
    }
  }

  // every reachable set of first-half counts, one digit per pot
  const base = numGroupsPerHalf + 1;
  const weights = pots.map((_, potIndex) => base ** potIndex);
  const getCount = (state: number, potIndex: number) =>
    Math.floor(state / weights[potIndex]) % base;
  if (firstHalfCounts.some(count => count > numGroupsPerHalf)) {
    return true;
  }
  let states = new Set([
    sum(firstHalfCounts.map((count, potIndex) => count * weights[potIndex])),
  ]);
  for (const pair of openPairs) {
    const nextStates = new Set<number>();
    for (const state of states) {
      for (const potIndex of pair) {
        if (getCount(state, potIndex) < numGroupsPerHalf) {
          nextStates.add(state + weights[potIndex]);
        }
      }
    }
    if (nextStates.size === 0) {
      return true;
    }
    states = nextStates;
  }
  return !states
    .values()
    .some(state =>
      numFreeTeams.every(
        (numFree, potIndex) =>
          getCount(state, potIndex) + numFree >= numGroupsPerHalf,
      ),
    );
};
