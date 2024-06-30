import { remove, sample, shuffle, uniq } from 'lodash';

import raceWorkers from '#utils/raceWorkers';

import { type Func } from './getFirstSuitableMatchday.worker';

const NUM_WORKERS = navigator.hardwareConcurrency - 1;

export default ({
  matchdaySize,
  allGames,
  currentSchedule,
  matchIndex,
}: {
  matchdaySize: number;
  allGames: readonly (readonly [number, number])[];
  currentSchedule: Record<`${number}:${number}`, number>;
  matchIndex: number;
}) =>
  raceWorkers<Func>({
    numWorkers: NUM_WORKERS,
    getWorker: () =>
      new Worker(new URL('./getFirstSuitableMatchday.worker', import.meta.url)),
    getPayload: () => {
      const allGamesShuffled = shuffle(allGames);
      const allTeamsShuffled = uniq(allGames.flat());
      const matchesByTeam = Array.from(
        {
          length: allTeamsShuffled.length,
        },
        () => 0,
      );

      for (const [h, a] of allGamesShuffled) {
        ++matchesByTeam[h];
        ++matchesByTeam[a];
      }

      const res: typeof allGamesShuffled = [];
      while (allGamesShuffled.length > 0) {
        const min = Math.min(...matchesByTeam.filter(item => item > 0));
        const minIndices: number[] = [];
        for (const [team, element] of matchesByTeam.entries()) {
          if (element === min) {
            minIndices.push(team);
          }
        }
        const minTeam = sample(minIndices);
        const minTeamMatches = remove(
          allGamesShuffled,
          m => m[0] === minTeam || m[1] === minTeam,
        );
        for (const m of minTeamMatches) {
          --matchesByTeam[m[0]];
          --matchesByTeam[m[1]];
        }
        res.push(...minTeamMatches);
      }

      // const indexByTeam = new Map(
      //   allTeamsShuffled.map((item, index) => [item, index]),
      // );

      return {
        matchdaySize,
        allGames: res,
        currentSchedule,
        matchIndex,
      };
    },
    getTimeout: (workerIndex, attempt) => {
      const factor = 7 / (workerIndex + 1);
      return factor * Math.min(30000, 5000 * Math.exp(attempt / 10));
    },
  });
