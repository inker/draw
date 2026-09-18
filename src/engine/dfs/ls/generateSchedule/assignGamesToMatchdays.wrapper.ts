import raceWorkers from '#utils/raceWorkers';
import { type UefaCountry } from '#model/types';
import coldCountries from '#engine/predicates/uefa/utils/coldCountries';
import teamsThatCannotHostSameDay from '#engine/predicates/uefa/utils/teamsThatCannotHostSameDay';

import { type Func } from './assignGamesToMatchdays.worker';

interface Team {
  readonly name: string;
  readonly country: UefaCountry;
}

export default ({
  season,
  teams,
  matchdaySize,
  allGames,
  openingHostTeamIndex,
  randomSeed,
  getNumWorkers,
  signal,
}: {
  season: number;
  teams: readonly Team[];
  matchdaySize: number;
  allGames: readonly (readonly [number, number])[];
  openingHostTeamIndex?: number;
  randomSeed: number;
  getNumWorkers: () => number;
  signal?: AbortSignal;
}) =>
  raceWorkers<Func>({
    numWorkers: getNumWorkers,
    getWorker: () =>
      new Worker(new URL('./assignGamesToMatchdays.worker', import.meta.url)),
    getPayload: ({ workerIndex, attempt }) => {
      const cannotHostSameDayPairs = teamsThatCannotHostSameDay
        .map(namePair => {
          const [a, b] = namePair;
          const aTeam = teams.findIndex(t => t.name === a);
          const bTeam = teams.findIndex(t => t.name === b);
          return aTeam > -1 && bTeam > -1
            ? ([aTeam, bTeam] as const)
            : undefined;
        })
        .filter(Boolean) as (readonly [number, number])[];

      const isFromColdCountry = coldCountries(season);
      const coldTeams = teams.filter(team => isFromColdCountry(team));
      const coldTeamIndices = coldTeams.map(t => teams.indexOf(t));

      // the solver picks games dynamically,
      // so the input order only seeds tie-breaking
      return {
        matchdaySize,
        allGames,
        coldTeamIndices,
        cannotHostSameDayPairs,
        openingHostTeamIndex,
        // The solver is deterministic in its seed
        // & every worker is handed the same games,
        // so without an offset of its own
        // each worker would repeat the identical search
        // & the race would buy nothing.
        // Two irrationals keep worker & attempt off each other's offsets.
        randomSeed:
          (randomSeed + workerIndex * Math.SQRT2 + attempt * Math.PI) % 1,
      };
    },
    getTimeout: () => 5000,
    signal,
  });
