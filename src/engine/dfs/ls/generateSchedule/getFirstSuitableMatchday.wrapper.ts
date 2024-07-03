import { remove, sample, shuffle } from 'lodash';

import raceWorkers from '#utils/raceWorkers';

import { type Func } from './getFirstSuitableMatchday.worker';
import teamsSharingStadium from './teamsSharingStadium';

const NUM_WORKERS = Math.max(1, navigator.hardwareConcurrency >> 1);

interface Team {
  name: string;
}

export default ({
  teams,
  matchdaySize,
  allGames,
  currentSchedule,
  matchIndex,
  signal,
}: {
  teams: readonly Team[];
  matchdaySize: number;
  allGames: readonly (readonly [number, number])[];
  currentSchedule: Record<`${number}:${number}`, number>;
  matchIndex: number;
  signal?: AbortSignal;
}) =>
  raceWorkers<Func>({
    numWorkers: NUM_WORKERS,
    getWorker: () =>
      new Worker(new URL('./getFirstSuitableMatchday.worker', import.meta.url)),
    getPayload: () => {
      const allGamesShuffled = shuffle(allGames);

      const prioritizedTeams = teamsSharingStadium.flatMap(namePair => {
        const [a, b] = namePair;
        return [teams.find(t => t.name === a)!, teams.find(t => t.name === b)!];
      });

      const orderedGames: typeof allGamesShuffled = [];
      for (const team of prioritizedTeams) {
        const prioritizedGames = remove(allGamesShuffled, m => {
          const h = teams[m[0]];
          const a = teams[m[1]];
          return team === h || team === a;
        });
        orderedGames.push(...prioritizedGames);
      }

      const numMatchesByTeam = Array.from(
        {
          length: teams.length,
        },
        () => 0,
      );

      for (const [h, a] of allGamesShuffled) {
        ++numMatchesByTeam[h];
        ++numMatchesByTeam[a];
      }

      while (allGamesShuffled.length > 0) {
        const min = Math.min(...numMatchesByTeam.filter(item => item > 0));
        const minIndices: number[] = [];
        for (const [team, element] of numMatchesByTeam.entries()) {
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
          --numMatchesByTeam[m[0]];
          --numMatchesByTeam[m[1]];
        }
        orderedGames.push(...minTeamMatches);
      }

      return {
        teams,
        matchdaySize,
        allGames: orderedGames,
        currentSchedule,
        matchIndex,
      };
    },
    getTimeout: (workerIndex, attempt) => {
      const factor = workerIndex === 0 ? 100 : 7 / (workerIndex + 1);
      return factor * Math.min(10000, 5000 * Math.exp(attempt / 10));
    },
    signal,
  });
