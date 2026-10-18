import { range } from 'lodash';

import WorkerManager from '#utils/worker/WorkerManager';
import workerRpc from '#utils/worker/rpc';
import { type PrngGenerator } from '#utils/prng/generator';
import prngFloat from '#utils/prng/float';
import prngShuffle from '#utils/prng/shuffle';
import assertIndicesInRange from '#utils/assertIndicesInRange';
import type Tournament from '#model/Tournament';
import { type UefaCountry } from '#model/types';
import incompatibleCountries from '#engine/predicates/uefa/utils/incompatibleCountries';
import bannedFixtures from '#engine/predicates/uefa/utils/bannedFixtures';

import generateFull from './generateFull';
import { type Func } from './getFirstSuitableMatch.worker';
import { type RuleSpec } from './rules';

interface Team {
  readonly name: string;
  readonly country: UefaCountry;
}

/**
 * Teams are passed & returned as indices into `pots.flat()`
 */
export default async function* generatePairings({
  prngGenerator,
  season,
  tournament,
  pots,
  numMatchdays,
  pickedTeamIndex,
  drawnMatches,
  signal,
}: {
  prngGenerator: PrngGenerator;
  season: number;
  tournament: Tournament;
  pots: readonly (readonly Team[])[];
  numMatchdays: number;
  pickedTeamIndex: number;
  drawnMatches: readonly (readonly [number, number])[];
  signal?: AbortSignal;
}) {
  const numPots = pots.length;
  const isPairedPotMode = tournament === 'ecl';
  const teams = pots.flat();
  const numTeamsPerPot = pots[0].length;
  const numGamesPerMatchday = teams.length / 2;

  assertIndicesInRange([pickedTeamIndex], teams.length, 'pickedTeamIndex');
  assertIndicesInRange(drawnMatches.flat(), teams.length, 'drawnMatches');

  const teamIndices = range(teams.length);

  const allocatedMatches = [...drawnMatches];

  let allGames = generateFull(teamIndices);

  allGames = [...allGames, ...allGames.map(([a, b]) => [b, a] as const)];

  const isCountryIncompatibleWith = incompatibleCountries(season);
  const isFixtureBanned = bannedFixtures(tournament, season);

  allGames = allGames.filter(([h, a]) => {
    const hTeam = teams[h];
    const aTeam = teams[a];
    const isImpossible =
      hTeam.country === aTeam.country ||
      isCountryIncompatibleWith(hTeam)(aTeam) ||
      isFixtureBanned(hTeam, aTeam);
    return !isImpossible;
  });

  const countries = [...new Set(teams.map(team => team.country))];
  const rules = [
    {
      kind: 'opponentCap',
      groupByTeam: teams.map(team => countries.indexOf(team.country)),
      // UEFA lets a team face at most 2 opponents from one country
      maxByGroup: countries.map(() => 2),
    },
  ] satisfies RuleSpec[];

  const workerManager = new WorkerManager({
    maker: () =>
      new Worker(new URL('./getFirstSuitableMatch.worker', import.meta.url)),
  });

  const getFirstSuitableMatch: (
    options: Parameters<Func>[0],
  ) => Promise<ReturnType<Func>> = workerRpc(workerManager.register());

  const numLocations = isPairedPotMode ? 1 : 2;
  const numSlots = numPots * numLocations;

  // Each of the picked team's games belongs to a slot,
  // identified by the opponent's pot &
  // (outside paired mode) whether the picked team plays at home.
  // Slots are revealed pot by pot, home before away.
  const slotOfPickedGame = ([h, a]: readonly [number, number]) => {
    const isPickedHome = h === pickedTeamIndex;
    const opponent = isPickedHome ? a : h;
    const opponentPot = Math.floor(opponent / numTeamsPerPot);
    const location = isPairedPotMode || isPickedHome ? 0 : 1;
    return opponentPot * numLocations + location;
  };

  const involvesPickedTeam = ([h, a]: readonly [number, number]) =>
    h === pickedTeamIndex || a === pickedTeamIndex;

  // slots filled while an earlier team was drawn
  const revealedSlots = new Set(
    allocatedMatches.values().filter(involvesPickedTeam).map(slotOfPickedGame),
  );

  try {
    allGames = await prngShuffle({
      collection: allGames,
      prngGenerator,
    });

    for (let slot = 0; slot < numSlots && !signal?.aborted; ++slot) {
      if (revealedSlots.has(slot)) {
        continue;
      }
      // eslint-disable-next-line no-await-in-loop
      const randomSeed = await prngFloat(prngGenerator);

      // eslint-disable-next-line no-await-in-loop
      const pickedMatch = await getFirstSuitableMatch({
        rules,
        numPots,
        numTeamsPerPot,
        numMatchdays,
        numGamesPerMatchday,
        isPairedPotMode,
        allGames,
        allocatedMatches,
        // A fresh offset per pick, so the solver is not making the same
        // tie-break choices over & over as the allocated set grows.
        randomSeed,
        slot: {
          team: pickedTeamIndex,
          opponentPot: Math.floor(slot / numLocations),
          isHome: slot % numLocations === 0,
        },
      });

      allocatedMatches.push(pickedMatch);

      yield {
        match: pickedMatch,
        // A snapshot, since the solver keeps appending to the original
        // after the caller has taken this one.
        drawnMatches: [...allocatedMatches],
      };
    }
  } finally {
    workerManager.killAll();
  }
}
