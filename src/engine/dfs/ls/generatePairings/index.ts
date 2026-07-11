import { difference, range, remove, shuffle } from 'lodash';

import WorkerManager from '#utils/WorkerManager';
import type Tournament from '#model/Tournament';
import { type UefaCountry } from '#model/types';
import incompatibleCountries from '#engine/predicates/uefa/utils/incompatibleCountries';

import generateFull from './generateFull';
import getFirstSuitableMatch from './getFirstSuitableMatch.wrapper';

interface Team {
  readonly country: UefaCountry;
}

export default async function* generatePairings<T extends Team>({
  season,
  tournament,
  pots,
  numMatchdays,
  pickedTeam,
  previousPickedTeams,
  virtualGeneratedMatches,
  signal,
}: {
  season: number;
  tournament: Tournament;
  pots: readonly (readonly T[])[];
  numMatchdays: number;
  pickedTeam: T;
  previousPickedTeams: readonly T[];
  virtualGeneratedMatches: readonly (readonly [T, T])[];
  signal?: AbortSignal;
}) {
  const numPots = pots.length;
  const isPairedPotMode = tournament === 'ecl';
  const teams = pots.flat();
  const numTeamsPerPot = pots[0].length;
  const numGamesPerMatchday = teams.length / 2;

  const teamIndices = range(teams.length);
  const indexByTeam = new Map(teams.map((t, i) => [t, i]));

  const pickedTeamIndex = indexByTeam.get(pickedTeam)!;

  const virtualGeneratedMatchesWithIndices = virtualGeneratedMatches.map(
    m => [indexByTeam.get(m[0])!, indexByTeam.get(m[1])!] as const,
  );

  const previousPickedTeamIndicesSet = new Set(
    previousPickedTeams.map(t => indexByTeam.get(t)!),
  );
  const previousPickedMatches = virtualGeneratedMatchesWithIndices.filter(
    m =>
      previousPickedTeamIndicesSet.has(m[0]) ||
      previousPickedTeamIndicesSet.has(m[1]),
  );
  const buffer = difference(
    virtualGeneratedMatchesWithIndices,
    previousPickedMatches,
  );

  let allGames = generateFull(teamIndices);

  allGames = [...allGames, ...allGames.map(([a, b]) => [b, a] as const)];

  const isCountryIncompatibleWith = incompatibleCountries(season);

  allGames = allGames.filter(([h, a]) => {
    const hTeam = teams[h];
    const aTeam = teams[a];
    const isImpossible =
      hTeam.country === aTeam.country ||
      isCountryIncompatibleWith(hTeam)(aTeam);
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

    while (
      !shouldStop &&
      virtualGeneratedMatches.length < numMatchdays * numGamesPerMatchday
    ) {
      allGames = shuffle(allGames);
      const payload = {
        teams,
        numPots,
        numTeamsPerPot,
        numMatchdays,
        numGamesPerMatchday,
        isPairedPotMode,
        allGames,
        allocatedMatches: virtualGeneratedMatchesWithIndices,
      } satisfies Omit<Parameters<typeof getFirstSuitableMatch>[0], 'worker'>;
      // eslint-disable-next-line no-await-in-loop
      const pickedMatch = await getFirstSuitableMatch({
        ...payload,
        worker,
      });

      virtualGeneratedMatchesWithIndices.push(pickedMatch);

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
            match: [teams[match[0]], teams[match[1]]] as const,
            virtualGeneratedMatches: virtualGeneratedMatchesWithIndices.map(
              vm => [teams[vm[0]], teams[vm[1]]] as const,
            ),
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
