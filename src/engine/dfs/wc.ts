import type NationalTeam from '#model/team/NationalTeam';
import type UnknownNationalTeam from '#model/team/UnknownNationalTeam';
import { type Confederation, type Country } from '#model/types';
import getNumGroupsByYear from '#engine/predicates/wc/getNumGroupsByYear';

type Team = NationalTeam | UnknownNationalTeam;

const getConfederations = (team: Team): Iterable<Confederation> =>
  (team as UnknownNationalTeam).confederations ?? [
    (team as NationalTeam).confederation,
  ];

const countBits = (mask: number) => {
  let n = 0;
  for (let rest = mask; rest; rest &= rest - 1) {
    ++n;
  }
  return n;
};

const lowestBit = (mask: number) => 31 - Math.clz32(mask & -mask);

/**
 * The first group the picked team can go to
 * with the rest of the draw still possible to complete, or -1 if there is none
 */
export default ({
  season,
  pots,
  groups,
  picked,
}: {
  season: number;
  pots: readonly (readonly Team[])[];
  groups: readonly (readonly Team[])[];
  picked: Team;
}) => {
  const numGroups = getNumGroupsByYear(season);
  const teams = [picked, ...pots.flat(), ...groups.flat()];
  const numTeams = teams.length;
  const groupSize = numTeams / numGroups;
  const teamIndices = new Map(teams.map((team, i) => [team, i]));

  const confIndices = new Map<Confederation, number>();
  const confMaskByTeam = new Uint8Array(numTeams);
  for (const [i, team] of teams.entries()) {
    for (const conf of getConfederations(team)) {
      if (!confIndices.has(conf)) {
        confIndices.set(conf, confIndices.size);
      }
      confMaskByTeam[i] |= 1 << confIndices.get(conf)!;
    }
  }
  const numConfs = confIndices.size;

  const numBerthsByConf = new Uint8Array(numConfs);
  for (const confMask of confMaskByTeam) {
    for (let c = 0; c < numConfs; ++c) {
      numBerthsByConf[c] += (confMask >> c) & 1;
    }
  }
  const minTeamsByConf = numBerthsByConf.map(v => Math.floor(v / numGroups));
  const maxTeamsByConf = numBerthsByConf.map(v => Math.ceil(v / numGroups));
  const maxMaxedOutGroupsByConf = numBerthsByConf.map(
    v => v % numGroups || numGroups,
  );

  const rankByTeam = new Int8Array(numTeams).fill(-1);
  let quarterByGroup: Int8Array | null = null;
  if (season === 2026) {
    const quarters = [
      [4, 8, 5],
      [7, 3, 6],
      [2, 0, 11],
      [9, 1, 10],
    ];
    quarterByGroup = new Int8Array(numGroups);
    for (const [qi, quarter] of quarters.entries()) {
      for (const gi of quarter) {
        quarterByGroup[gi] = qi;
      }
    }
    const firstFourTeams = [
      'Spain',
      'Argentina',
      'France',
      'England',
    ] satisfies Country[];
    for (const [rank, name] of firstFourTeams.entries()) {
      rankByTeam[teams.findIndex(t => t.name === name)] = rank;
    }
  }
  const groupByRank = new Int8Array(4).fill(-1);

  const numTeamsByGroupAndConf = new Uint8Array(numGroups * numConfs);
  const numTeamsByGroup = new Uint8Array(numGroups);
  const potMaskByGroup = new Uint8Array(numGroups);
  const numMaxedOutGroupsByConf = new Uint8Array(numConfs);

  const canPlace = (team: number, pot: number, group: number) => {
    if (potMaskByGroup[group] & (1 << pot)) {
      return false;
    }

    const rank = rankByTeam[team];
    if (rank !== -1) {
      const quarter = quarterByGroup![group];
      for (let otherRank = 0; otherRank < 4; ++otherRank) {
        const otherGroup = groupByRank[otherRank];
        if (otherGroup !== -1) {
          const otherQuarter = quarterByGroup![otherGroup];
          if (otherQuarter === quarter) {
            return false;
          }
          if (otherRank === (rank ^ 1) && otherQuarter >> 1 === quarter >> 1) {
            return false;
          }
        }
      }
    }

    const confMask = confMaskByTeam[team];
    const numRemainingTeams = groupSize - numTeamsByGroup[group] - 1;
    for (let c = 0; c < numConfs; ++c) {
      const isOfConf = (confMask >> c) & 1;
      const numConfTeams =
        numTeamsByGroupAndConf[group * numConfs + c] + isOfConf;
      if (
        numConfTeams > maxTeamsByConf[c] ||
        numConfTeams + numRemainingTeams < minTeamsByConf[c]
      ) {
        return false;
      }
      if (
        isOfConf &&
        numConfTeams === maxTeamsByConf[c] &&
        numMaxedOutGroupsByConf[c] === maxMaxedOutGroupsByConf[c]
      ) {
        return false;
      }
    }

    return true;
  };

  const place = (team: number, pot: number, group: number) => {
    const confMask = confMaskByTeam[team];
    for (let c = 0; c < numConfs; ++c) {
      if ((confMask >> c) & 1) {
        const numConfTeams = ++numTeamsByGroupAndConf[group * numConfs + c];
        if (numConfTeams === maxTeamsByConf[c]) {
          ++numMaxedOutGroupsByConf[c];
        }
      }
    }
    ++numTeamsByGroup[group];
    potMaskByGroup[group] |= 1 << pot;
    if (rankByTeam[team] !== -1) {
      groupByRank[rankByTeam[team]] = group;
    }
  };

  const unplace = (team: number, pot: number, group: number) => {
    const confMask = confMaskByTeam[team];
    for (let c = 0; c < numConfs; ++c) {
      if ((confMask >> c) & 1) {
        const numConfTeams = numTeamsByGroupAndConf[group * numConfs + c]--;
        if (numConfTeams === maxTeamsByConf[c]) {
          --numMaxedOutGroupsByConf[c];
        }
      }
    }
    --numTeamsByGroup[group];
    potMaskByGroup[group] &= ~(1 << pot);
    if (rankByTeam[team] !== -1) {
      groupByRank[rankByTeam[team]] = -1;
    }
  };

  // Groups fill up one pot at a time,
  // so a team's position in its group is the pot it came from
  for (const [gi, group] of groups.entries()) {
    for (const [pot, team] of group.entries()) {
      place(teamIndices.get(team)!, pot, gi);
    }
  }

  const freeTeams = pots.flatMap((pot, potIndex) =>
    pot.map(team => ({
      team: teamIndices.get(team)!,
      pot: potIndex,
    })),
  );
  const isPlaced = new Uint8Array(freeTeams.length);
  let numPlaced = 0;
  const groupMaskByFreeTeam = new Uint16Array(freeTeams.length);
  const freeTeamsByPot = pots.map(() => [] as number[]);
  for (const [i, { pot }] of freeTeams.entries()) {
    freeTeamsByPot[pot].push(i);
  }

  // Teams that the constraints cannot tell apart share a type
  const typeIndices = new Map<string, number>();
  const typeByFreeTeam = freeTeams.map(({ team, pot }) => {
    const key = `${pot}:${confMaskByTeam[team]}:${rankByTeam[team]}`;
    if (!typeIndices.has(key)) {
      typeIndices.set(key, typeIndices.size);
    }
    return typeIndices.get(key)!;
  });
  const numFreeTeamsByType = new Uint8Array(typeIndices.size);
  for (const type of typeByFreeTeam) {
    ++numFreeTeamsByType[type];
  }

  const getGroupSignature = (group: number, isRankingPending: boolean) => {
    let signature = potMaskByGroup[group];
    for (let c = 0; c < numConfs; ++c) {
      signature =
        signature * (groupSize + 1) +
        numTeamsByGroupAndConf[group * numConfs + c];
    }
    return isRankingPending
      ? signature * 4 + quarterByGroup![group]
      : signature;
  };

  // Which teams are left only matters by type,
  // & which group is which only matters by its contents (plus its quarter for the ranking),
  // so one dead end stands in for every arrangement that differs only in those
  const groupSignatures = new Float64Array(numGroups);
  const getStateKey = () => {
    const isRankingPending = !!quarterByGroup && groupByRank.includes(-1);
    for (let gi = 0; gi < numGroups; ++gi) {
      groupSignatures[gi] = getGroupSignature(gi, isRankingPending);
    }
    groupSignatures.sort();
    const rankQuarters = isRankingPending
      ? groupByRank.map(gi => (gi === -1 ? -1 : quarterByGroup![gi]))
      : [];
    return `${numFreeTeamsByType}|${groupSignatures}|${rankQuarters}`;
  };

  const freeTeamByGroup = new Int8Array(numGroups);
  let visitedGroupMask = 0;

  const findMatch = (freeTeam: number): boolean => {
    for (let rest = groupMaskByFreeTeam[freeTeam]; rest; rest &= rest - 1) {
      const gi = lowestBit(rest);
      if (!(visitedGroupMask & (1 << gi))) {
        visitedGroupMask |= 1 << gi;
        const otherFreeTeam = freeTeamByGroup[gi];
        if (otherFreeTeam === -1 || findMatch(otherFreeTeam)) {
          freeTeamByGroup[gi] = freeTeam;
          return true;
        }
      }
    }
    return false;
  };

  // Two teams from one pot that can only go to the same group
  // each pass the check on their own,
  // so each pot as a whole has to be matched to the groups it can still go to
  const canMatchPots = () =>
    freeTeamsByPot.every(potFreeTeams => {
      freeTeamByGroup.fill(-1);
      return potFreeTeams.every(freeTeam => {
        visitedGroupMask = 0;
        return isPlaced[freeTeam] || findMatch(freeTeam);
      });
    });

  const deadEnds = new Set<string>();

  const isCompletable = (): boolean => {
    if (numPlaced === freeTeams.length) {
      return true;
    }

    const key = getStateKey();
    if (deadEnds.has(key)) {
      return false;
    }

    // Placing the most constrained team first
    // surfaces a dead end near the top of the tree rather than at the bottom
    let best = -1;
    let bestGroupMask = 0;
    let bestNumGroups = Infinity;
    for (const [i, { team, pot }] of freeTeams.entries()) {
      if (!isPlaced[i]) {
        let groupMask = 0;
        for (let gi = 0; gi < numGroups; ++gi) {
          if (canPlace(team, pot, gi)) {
            groupMask |= 1 << gi;
          }
        }
        groupMaskByFreeTeam[i] = groupMask;
        const numPossibleGroups = countBits(groupMask);
        if (numPossibleGroups < bestNumGroups) {
          best = i;
          bestGroupMask = groupMask;
          bestNumGroups = numPossibleGroups;
          if (numPossibleGroups === 0) {
            break;
          }
        }
      }
    }

    let isFound = false;
    if (bestNumGroups > 0 && canMatchPots()) {
      const { team, pot } = freeTeams[best];
      isPlaced[best] = 1;
      ++numPlaced;
      --numFreeTeamsByType[typeByFreeTeam[best]];
      for (let rest = bestGroupMask; rest && !isFound; rest &= rest - 1) {
        const gi = lowestBit(rest);
        place(team, pot, gi);
        isFound = isCompletable();
        unplace(team, pot, gi);
      }
      isPlaced[best] = 0;
      --numPlaced;
      ++numFreeTeamsByType[typeByFreeTeam[best]];
    }

    if (!isFound) {
      deadEnds.add(key);
    }
    return isFound;
  };

  const pickedTeam = teamIndices.get(picked)!;
  const pickedPot = Math.min(...groups.map(group => group.length));
  return groups.findIndex((_, gi) => {
    if (!canPlace(pickedTeam, pickedPot, gi)) {
      return false;
    }
    place(pickedTeam, pickedPot, gi);
    const isFound = isCompletable();
    unplace(pickedTeam, pickedPot, gi);
    return isFound;
  });
};
