import teamsThatCannotHostSameDay from '#engine/predicates/epl/utils/teamsThatCannotHostSameDay';
import assignGamesToMatchdays from '#engine/dfs/ls/generateSchedule/assignGamesToMatchdays.wrapper';
import { type PrngGenerator } from '#utils/prng/generator';
import prngFloat from '#utils/prng/float';
import prngShuffle from '#utils/prng/shuffle';
import prngShuffleAll from '#utils/prng/shuffleAll';

interface Team {
  readonly name: string;
}

/**
 * Rounds 17 & 19 of 2026/27,
 * with a round on 29 & 30 December between them
 */
const boxingDayMatchday = 16;
const newYearMatchday = 18;

/**
 * How many matchdays apart the two meetings of the same clubs have to be.
 * The league has no such rule & allows quick reversals,
 * so this only keeps them off consecutive matchdays.
 * 3 or more apart often runs past the 5s worker timeout
 * on top of the same-city pairs.
 */
const minMatchdaysBetweenMeetings = 2;

/**
 * A double round robin of `teams`,
 * returned as matchdays of [home, away] indices into `teams`
 */
export default async function generateSchedule({
  teams,
  getNumWorkers,
  prngGenerator,
  signal,
}: {
  teams: readonly Team[];
  getNumWorkers: () => number;
  prngGenerator: PrngGenerator;
  signal?: AbortSignal;
}) {
  const allGames = teams.flatMap((_, h) =>
    teams.flatMap((__, a) => (h === a ? [] : [[h, a] as const])),
  );

  const lastMatchday = 2 * (teams.length - 1) - 1;
  // Every club plays once at home & once away
  // across the first two matchdays, the last two
  // & Boxing Day & New Year.
  const alternatingPairs = [
    [0, 1],
    [boxingDayMatchday, newYearMatchday],
    [lastMatchday - 1, lastMatchday],
  ] as const satisfies readonly (readonly [number, number])[];

  const cannotHostSameDayPairs = teamsThatCannotHostSameDay.flatMap(
    ([aName, bName]) => {
      const a = teams.findIndex(team => team.name === aName);
      const b = teams.findIndex(team => team.name === bName);
      return a === -1 || b === -1 ? [] : [[a, b] as const];
    },
  );

  // The solver picks games dynamically,
  // so the input order only seeds tie-breaking.
  const allGamesShuffled = await prngShuffle({
    collection: allGames,
    prngGenerator,
  });

  const randomSeed = await prngFloat(prngGenerator);

  const result = await assignGamesToMatchdays({
    matchdaySize: teams.length / 2,
    allGames: allGamesShuffled,
    alternatingPairs,
    bans: [],
    cannotHostSameDayPairs,
    minMatchdaysBetweenMeetings,
    banFourInFive: true,
    randomSeed,
    getNumWorkers,
    signal,
  });

  return prngShuffleAll({
    collections: result,
    prngGenerator,
  });
}
