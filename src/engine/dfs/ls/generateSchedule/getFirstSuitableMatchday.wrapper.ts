import { intersection, maxBy, remove, shuffle, sumBy, uniq } from 'lodash';

import raceWorkers from '#utils/raceWorkers';
import { type UefaCountry } from '#model/types';
import coldCountries from '#engine/predicates/uefa/utils/coldCountries';

import { type Func } from './getFirstSuitableMatchday.worker';
import teamsSharingStadium from './teamsSharingStadium';

const NUM_WORKERS = Math.max(1, navigator.hardwareConcurrency >> 1);

interface Team {
  readonly name: string;
  readonly country: UefaCountry;
}

export default ({
  season,
  teams,
  matchdaySize,
  allGames,
  signal,
}: {
  season: number;
  teams: readonly Team[];
  matchdaySize: number;
  allGames: readonly (readonly [number, number])[];
  signal?: AbortSignal;
}) =>
  raceWorkers<Func>({
    numWorkers: NUM_WORKERS,
    getWorker: () =>
      new Worker(new URL('./getFirstSuitableMatchday.worker', import.meta.url)),
    getPayload: () => {
      const allGamesShuffled = shuffle(allGames);

      const stadiumSharingTeams = teamsSharingStadium.flatMap(namePair => {
        const [a, b] = namePair;
        return [teams.find(t => t.name === a)!, teams.find(t => t.name === b)!];
      });

      const isFromColdCountry = coldCountries(season);
      const coldTeams = teams.filter(team => isFromColdCountry(team));
      const coldTeamIndices = coldTeams.map(t => teams.indexOf(t));

      const prioritizedTeams = uniq([
        ...intersection(stadiumSharingTeams, coldTeams),
        ...stadiumSharingTeams,
        ...coldTeams,
      ]);

      const orderedGames: typeof allGamesShuffled = [];
      for (const team of prioritizedTeams) {
        const prioritizedGames = remove(allGamesShuffled, m => {
          const h = teams[m[0]];
          const a = teams[m[1]];
          return team === h || team === a;
        });
        orderedGames.push(...prioritizedGames);
      }

      const numMatchesByTeam = teams.map(() => 0);

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
        const minTeam = maxBy(minIndices, i => {
          const numHomeGames = sumBy(allGamesShuffled, m =>
            m[0] === i ? 1 : 0,
          );
          const numAwayGames = sumBy(allGamesShuffled, m =>
            m[1] === i ? 1 : 0,
          );
          return Math.abs(numHomeGames - numAwayGames);
        });
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
        coldTeamIndices,
      };
    },
    getTimeout: workerIndex => {
      const power = (workerIndex / (NUM_WORKERS - 1)) ** 2;
      return 5000 * 5 ** power;
    },
    signal,
  });
