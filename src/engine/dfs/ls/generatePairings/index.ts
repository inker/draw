import { difference, orderBy, range, remove, shuffle } from 'lodash';
import delay from 'delay.js';

import rangeGenerator from '#utils/rangeGenerator';
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

  const previousPickedTeamIndices = previousPickedTeams.map(
    t => indexByTeam.get(t)!,
  );
  const previousPickedTeamIndicesSet = new Set(previousPickedTeamIndices);
  const remainingTeamIndicesSet = new Set(teamIndices)
    .difference(previousPickedTeamIndicesSet)
    .difference(new Set([pickedTeamIndex]));
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

  let worker = workerManager.register();

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
      } satisfies Omit<
        Parameters<typeof getFirstSuitableMatch>[0],
        'reverseSortingMode' | 'worker'
      >;
      // eslint-disable-next-line no-await-in-loop
      const pickedMatch = await new Promise<
        Awaited<ReturnType<typeof getFirstSuitableMatch>>
        // eslint-disable-next-line no-async-promise-executor, no-loop-func
      >(async (resolve, reject) => {
        const extraWorkers: Worker[] = [];

        const resolveWithCleanup = (
          successfulWorker: Worker,
          result: Parameters<typeof resolve>[0],
        ) => {
          resultObtained = true;
          for (const w of extraWorkers) {
            if (w === successfulWorker) {
              continue;
            }
            workerManager.kill(w);
          }
          if (successfulWorker !== worker) {
            workerManager.kill(worker);
            worker = successfulWorker;
          }
          resolve(result);
        };

        const rejectWithCleanup: typeof reject = (err: Error) => {
          for (const w of extraWorkers) {
            workerManager.kill(w);
          }
          reject(err);
        };

        let resultObtained = false;
        getFirstSuitableMatch({
          ...payload,
          worker,
          reverseSortingMode: 0,
        })
          .then(result => {
            resolveWithCleanup(worker, result);
          })
          .catch(rejectWithCleanup);

        await delay(250);

        for (let i = 1; i < 3; ++i) {
          // eslint-disable-next-line no-await-in-loop
          await delay(0);
          if (resultObtained) {
            return;
          }
          // eslint-disable-next-line no-console
          console.log('adding extra worker', i);
          const extraWorker = workerManager.register();
          extraWorkers.push(extraWorker);
          getFirstSuitableMatch({
            ...payload,
            worker: extraWorker,
            reverseSortingMode: i as 0 | 1 | 2,
          })
            .then(result => {
              resolveWithCleanup(extraWorker, result);
            })
            .catch(rejectWithCleanup);
        }
      });

      virtualGeneratedMatchesWithIndices.push(pickedMatch);

      yield pickedMatch;
    }
  }

  try {
    const teamsToPick = [
      ...previousPickedTeamIndices,
      pickedTeamIndex,
      ...orderBy(shuffle([...remainingTeamIndicesSet]), i =>
        Math.floor(i / numTeamsPerPot),
      ),
    ];

    const pairingsGenerator = generatePairingsFromSource();
    const locs = isPairedPotMode ? (['h'] as const) : (['h', 'a'] as const);
    const sortedKeys = teamsToPick.flatMap(team =>
      rangeGenerator(numPots)
        .flatMap(opponentPot =>
          locs.flatMap(
            loc =>
              `${team}:${opponentPot}:${loc}` satisfies `${number}:${number}:${'h' | 'a'}`,
          ),
        )
        .toArray(),
    );
    const indexByKey = new Map(sortedKeys.map((key, i) => [key, i]));

    const getMatchKeyPair = (m: readonly [number, number]) =>
      [
        `${m[0]}:${Math.floor(m[1] / numTeamsPerPot)}:h`,
        `${m[1]}:${Math.floor(m[0] / numTeamsPerPot)}:${isPairedPotMode ? 'h' : 'a'}`,
      ] as const;

    const getMatchKeyIndex = (m: readonly [number, number]) => {
      const pair = getMatchKeyPair(m);
      return Math.min(indexByKey.get(pair[0])!, indexByKey.get(pair[1])!);
    };

    const sentKeyIndices = new Set<`${number}:${number}:${'h' | 'a'}`>();
    for (const m of previousPickedMatches) {
      const keys = getMatchKeyPair(m);
      sentKeyIndices.add(keys[0]);
      sentKeyIndices.add(keys[1]);
    }

    const iterableKeys = sortedKeys.filter(key =>
      key.startsWith(`${pickedTeamIndex}:`),
    );

    for (const key of iterableKeys) {
      if (sentKeyIndices.has(key)) {
        continue;
      }
      const keyIndex = indexByKey.get(key)!;
      const [pickedTeamStr] = key.split(':') as [string, string, 'h' | 'a'];
      const pickedTeamLocal = +pickedTeamStr;
      for (;;) {
        // eslint-disable-next-line no-await-in-loop
        const iteratorResult = await pairingsGenerator.next();
        if (!iteratorResult.done) {
          buffer.push(iteratorResult.value);
        }
        const isFound = buffer.some(m => getMatchKeyIndex(m) === keyIndex);
        if (isFound) {
          const unorderedPickedTeamMatches = remove(
            buffer,
            m => m[0] === pickedTeamLocal || m[1] === pickedTeamLocal,
          );
          const pickedTeamMatches = orderBy(unorderedPickedTeamMatches, m =>
            getMatchKeyIndex(m),
          );
          for (const m of pickedTeamMatches) {
            const keys = getMatchKeyPair(m);
            sentKeyIndices.add(keys[0]);
            sentKeyIndices.add(keys[1]);
            yield {
              match: [teams[m[0]], teams[m[1]]] as const,
              virtualGeneratedMatches: virtualGeneratedMatchesWithIndices.map(
                vm => [teams[vm[0]], teams[vm[1]]] as const,
              ),
            };
          }
          break;
        }
      }
    }
  } finally {
    workerManager.killAll();
  }
}
