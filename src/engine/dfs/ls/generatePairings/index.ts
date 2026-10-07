import { difference, range, remove } from 'lodash';

import WorkerManager from '#utils/worker/WorkerManager';
import { type PrngGenerator } from '#utils/prng/generator';
import prngFloat from '#utils/prng/float';
import prngShuffle from '#utils/prng/shuffle';
import assertIndicesInRange from '#utils/assertIndicesInRange';
import type Tournament from '#model/Tournament';
import { type UefaCountry } from '#model/types';
import incompatibleCountries from '#engine/predicates/uefa/utils/incompatibleCountries';
import bannedFixtures from '#engine/predicates/uefa/utils/bannedFixtures';

import generateFull from './generateFull';
import getFirstSuitableMatch from './getFirstSuitableMatch.wrapper';

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
  previousPickedTeamIndices,
  virtualGeneratedMatches,
  signal,
}: {
  prngGenerator: PrngGenerator;
  season: number;
  tournament: Tournament;
  pots: readonly (readonly Team[])[];
  numMatchdays: number;
  pickedTeamIndex: number;
  previousPickedTeamIndices: Iterable<number>;
  virtualGeneratedMatches: readonly (readonly [number, number])[];
  signal?: AbortSignal;
}) {
  const numPots = pots.length;
  const isPairedPotMode = tournament === 'ecl';
  const teams = pots.flat();
  const numTeamsPerPot = pots[0].length;
  const numGamesPerMatchday = teams.length / 2;

  assertIndicesInRange([pickedTeamIndex], teams.length, 'pickedTeamIndex');
  assertIndicesInRange(
    previousPickedTeamIndices,
    teams.length,
    'previousPickedTeamIndices',
  );
  assertIndicesInRange(
    virtualGeneratedMatches.flat(),
    teams.length,
    'virtualGeneratedMatches',
  );

  const teamIndices = range(teams.length);

  const allocatedMatches = [...virtualGeneratedMatches];

  const previousPickedTeamIndicesSet = new Set(previousPickedTeamIndices);
  const previousPickedMatches = allocatedMatches.filter(
    m =>
      previousPickedTeamIndicesSet.has(m[0]) ||
      previousPickedTeamIndicesSet.has(m[1]),
  );
  const buffer = difference(allocatedMatches, previousPickedMatches);

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

  const workerManager = new WorkerManager({
    maker: () =>
      new Worker(new URL('./getFirstSuitableMatch.worker', import.meta.url)),
  });

  const worker = workerManager.register();

  async function* generatePairingsFromSource() {
    let shouldStop = false;
    if (signal) {
      signal.addEventListener(
        'abort',
        () => {
          shouldStop = true;
        },
        {
          once: true,
        },
      );
    }

    allGames = await prngShuffle({
      collection: allGames,
      prngGenerator,
    });

    while (
      !shouldStop &&
      virtualGeneratedMatches.length < numMatchdays * numGamesPerMatchday
    ) {
      // eslint-disable-next-line no-await-in-loop
      const randomSeed = await prngFloat(prngGenerator);

      const payload = {
        teams,
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
      } satisfies Omit<Parameters<typeof getFirstSuitableMatch>[0], 'worker'>;
      // eslint-disable-next-line no-await-in-loop
      const pickedMatch = await getFirstSuitableMatch({
        ...payload,
        worker,
      });

      allocatedMatches.push(pickedMatch);

      yield pickedMatch;
    }
  }

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

  // slots already shown while an earlier team was drawn
  const revealedSlots = new Set(
    previousPickedMatches
      .values()
      .filter(involvesPickedTeam)
      .map(slotOfPickedGame),
  );

  try {
    const pairingsGenerator = generatePairingsFromSource();

    for (let slot = 0; slot < numSlots; ++slot) {
      if (revealedSlots.has(slot)) {
        continue;
      }
      // pull games from the solver until this slot's game turns up,
      // buffering the rest until their own slot comes round
      for (;;) {
        const match = buffer.find(
          m => involvesPickedTeam(m) && slotOfPickedGame(m) === slot,
        );
        if (match) {
          remove(buffer, m => m === match);
          yield {
            match,
            // A snapshot, since the solver keeps appending to the original
            // after the caller has taken this one.
            virtualGeneratedMatches: [...allocatedMatches],
          };
          break;
        }
        // eslint-disable-next-line no-await-in-loop
        const iteratorResult = await pairingsGenerator.next();
        if (iteratorResult.done) {
          break;
        }
        buffer.push(iteratorResult.value);
      }
    }
  } finally {
    workerManager.killAll();
  }
}
