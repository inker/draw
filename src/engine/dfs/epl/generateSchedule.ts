import bigSix from '#engine/predicates/epl/utils/bigSix';
import promoted from '#engine/predicates/epl/utils/promoted';
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
 * The league publishes no such rule,
 * but no season from 2010/11 to 2025/26 had them closer than 4,
 * & 5 of those seasons had them exactly 4 apart.
 */
const minMatchdaysBetweenMeetings = 4;

/**
 * Neither is a published rule.
 * Half the seasons from 2010/11 to 2025/26 never had two big-six games in a round,
 * which random schedules manage 0.24% of the time,
 * & only 2 of 14 had one on Boxing Day.
 */
const maxBigSixGamesPerMatchday = 1;
const matchdaysWithoutBigSixGames = [boxingDayMatchday];

/**
 * Not a published rule either.
 * No season from 2011/12 to 2025/26 opened with two promoted clubs playing each other,
 * which random schedules manage 7.6% of the time.
 */
const matchdaysWithoutPromotedGames = [0];

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

  const bigSixTeams = new Set(
    teams
      .values()
      .flatMap((team, i) =>
        (bigSix as readonly string[]).includes(team.name) ? [i] : [],
      ),
  );
  const bigSixGames = allGames.filter(
    ([h, a]) => bigSixTeams.has(h) && bigSixTeams.has(a),
  );

  const promotedTeams = teams.flatMap((team, i) =>
    (promoted as readonly string[]).includes(team.name) ? [i] : [],
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
    cappedGames: bigSixGames,
    maxCappedGamesPerMatchday: maxBigSixGamesPerMatchday,
    matchdaysWithoutCappedGames: matchdaysWithoutBigSixGames,
    bannedGames: matchdaysWithoutPromotedGames.flatMap(matchday =>
      allGames
        .filter(
          ([h, a]) => promotedTeams.includes(h) && promotedTeams.includes(a),
        )
        .map(game => ({
          matchday,
          game,
        })),
    ),
    randomSeed,
    getNumWorkers,
    signal,
  });

  return prngShuffleAll({
    collections: result,
    prngGenerator,
  });
}
