import { findFirstSolutionMutable } from '#utils/backtrack';
import lowDiscrepancySequence from '#utils/lowDiscrepancySequence';

import getFillOrder from './getFillOrder';
import createHomeAwayPatterns, { type Ban } from './homeAwayPatterns';

export default ({
  matchdaySize,
  allGames,
  alternatingPairs,
  bans,
  cannotHostSameDayPairs,
  minMatchdaysBetweenMeetings = 1,
  banFourInFive = false,
  cappedGames = [],
  maxCappedGamesPerMatchday = Infinity,
  matchdaysWithoutCappedGames = [],
  bannedGames = [],
  randomSeed = 0,
}: {
  matchdaySize: number;
  allGames: readonly (readonly [number, number])[];
  alternatingPairs: Iterable<readonly [number, number]>;
  bans: readonly Ban[];
  cannotHostSameDayPairs: Iterable<readonly [number, number]>;
  /**
   * How many matchdays apart two games between the same clubs have to be,
   * such as a double round robin's two meetings.
   * 1 allows them on consecutive matchdays.
   */
  minMatchdaysBetweenMeetings?: number;
  /**
   * Whether every five consecutive matchdays have to split three & two
   * between each club's home & away games
   */
  banFourInFive?: boolean;
  /**
   * [home, away] games that a matchday may only hold so many of,
   * such as those between two of the Premier League's big six
   */
  cappedGames?: Iterable<readonly [number, number]>;
  /**
   * How many of cappedGames a matchday may hold
   */
  maxCappedGamesPerMatchday?: number;
  /**
   * Matchdays that may hold none of cappedGames,
   * such as Boxing Day
   */
  matchdaysWithoutCappedGames?: Iterable<number>;
  /**
   * [home, away] games that may not be played on a matchday,
   * such as one between two of the Premier League's promoted clubs on the opening day
   */
  bannedGames?: Iterable<{
    matchday: number;
    game: readonly [number, number];
  }>;
  /**
   * Where in [0, 1) this solver's tie-breaking sequence starts.
   * Two solvers given the same seed search identically,
   * so racing instances have to be handed different ones.
   */
  randomSeed?: number;
}) => {
  const numGames = allGames.length;
  const numMatchdays = numGames / matchdaySize;
  const numTeams = matchdaySize * 2;

  // A fractional matchday count makes every derived size nonsense.
  if (!Number.isInteger(numMatchdays)) {
    throw new TypeError(
      `allGames length ${numGames} is not a multiple of matchdaySize ${matchdaySize}`,
    );
  }
  if (
    !Number.isInteger(minMatchdaysBetweenMeetings) ||
    minMatchdaysBetweenMeetings < 1
  ) {
    throw new RangeError(
      `minMatchdaysBetweenMeetings=${minMatchdaysBetweenMeetings} is not a whole number of matchdays from 1`,
    );
  }
  // numMatchesByMatchday is a Uint16 counting up to matchdaySize.
  if (matchdaySize > 0xffff) {
    throw new Error(
      `matchdaySize=${matchdaySize} exceeds 65535 (numMatchesByMatchday is Uint16)`,
    );
  }

  // Tracks, per club, which complete home/away patterns are still possible
  // as games are pinned to matchdays.
  // Each placed game pins two clubs,
  // so the undo log needs room for two assignments per game.
  const homeAwayPatterns = createHomeAwayPatterns({
    numTeams,
    numMatchdays,
    maxAssignments: 2 * numGames,
    alternatingPairs,
    bans,
    banFourInFive,
  });

  const fillOrder = getFillOrder({
    numTeams,
    numMatchdays,
    bans,
    homeAwayPatterns,
  });

  const cannotHostSameDayTeam = new Int32Array(numTeams).fill(-1);
  for (const [a, b] of cannotHostSameDayPairs) {
    cannotHostSameDayTeam[a] = b;
    cannotHostSameDayTeam[b] = a;
  }

  const gamesByTeam = Array.from(
    {
      length: numTeams,
    },
    () => [] as number[],
  );
  for (const [gameIndex, [h, a]] of allGames.entries()) {
    gamesByTeam[h].push(gameIndex);
    gamesByTeam[a].push(gameIndex);
  }

  // The other games between the same two clubs, in either direction.
  const otherMeetingsByGame = allGames.map(([h, a], gameIndex) =>
    gamesByTeam[h].filter(g => {
      const [otherH, otherA] = allGames[g];
      return g !== gameIndex && (otherH === a || otherA === a);
    }),
  );

  const isCappedGame = new Uint8Array(numGames);
  for (const [h, a] of cappedGames) {
    const gameIndex = allGames.findIndex(
      ([otherH, otherA]) => otherH === h && otherA === a,
    );
    if (gameIndex === -1) {
      throw new Error(`Capped game ${h}-${a} is not in allGames`);
    }
    isCappedGame[gameIndex] = 1;
  }
  // Float64 so the default cap of Infinity survives,
  // where an integer array would store 0 & ban capped games everywhere.
  const maxCappedGamesByMatchday = new Float64Array(numMatchdays).fill(
    maxCappedGamesPerMatchday,
  );
  for (const md of matchdaysWithoutCappedGames) {
    maxCappedGamesByMatchday[md] = 0;
  }
  const numCappedGamesByMatchday = new Uint16Array(numMatchdays);
  // Set once the search decides a matchday takes no more capped games
  const isClosedToCappedGames = new Uint8Array(numMatchdays);
  let numUnassignedCappedGames = isCappedGame.filter(x => x === 1).length;

  const isBannedOnMatchday = new Uint8Array(numGames * numMatchdays);
  for (const {
    matchday,
    game: [h, a],
  } of bannedGames) {
    // Out of range, the flag would land on another game's matchday.
    if (
      !Number.isInteger(matchday) ||
      matchday < 0 ||
      matchday >= numMatchdays
    ) {
      throw new RangeError(
        `Banned game on matchday ${matchday}, which is not an index into ${numMatchdays} matchdays`,
      );
    }
    const gameIndex = allGames.findIndex(
      ([otherH, otherA]) => otherH === h && otherA === a,
    );
    if (gameIndex === -1) {
      throw new Error(`Banned game ${h}-${a} is not in allGames`);
    }
    isBannedOnMatchday[gameIndex * numMatchdays + matchday] = 1;
  }

  // A matchday that is full or closed is room lost for good.
  const getRoomForCappedGames = () => {
    let room = 0;
    let numOpenMatchdays = 0;
    for (let md = 0; md < numMatchdays; ++md) {
      const roomOnMatchday =
        maxCappedGamesByMatchday[md] - numCappedGamesByMatchday[md];
      if (
        numMatchesByMatchday[md] < matchdaySize &&
        !isClosedToCappedGames[md] &&
        roomOnMatchday > 0
      ) {
        room += roomOnMatchday;
        ++numOpenMatchdays;
      }
    }
    return {
      room,
      numOpenMatchdays,
    };
  };

  // A placement that closes a matchday to capped games rather than placing a game
  const closeToCappedGames = -1;

  // 0 = not playing, 1 = home, 2 = away
  const locationByTeamMatchday = new Uint8Array(numTeams * numMatchdays);
  const numMatchesByMatchday = new Uint16Array(numMatchdays);
  const matchdayByGame = new Int32Array(numGames).fill(-1);

  let numUnassignedGames = numGames;

  const place = (gameIndex: number, md: number) => {
    const [h, a] = allGames[gameIndex];
    matchdayByGame[gameIndex] = md;
    ++numMatchesByMatchday[md];
    numCappedGamesByMatchday[md] += isCappedGame[gameIndex];
    numUnassignedCappedGames -= isCappedGame[gameIndex];
    locationByTeamMatchday[h * numMatchdays + md] = 1;
    locationByTeamMatchday[a * numMatchdays + md] = 2;
    homeAwayPatterns.assign(h, true, md);
    homeAwayPatterns.assign(a, false, md);
    --numUnassignedGames;
  };

  const unplace = (gameIndex: number, md: number) => {
    const [h, a] = allGames[gameIndex];
    matchdayByGame[gameIndex] = -1;
    --numMatchesByMatchday[md];
    numCappedGamesByMatchday[md] -= isCappedGame[gameIndex];
    numUnassignedCappedGames += isCappedGame[gameIndex];
    locationByTeamMatchday[h * numMatchdays + md] = 0;
    locationByTeamMatchday[a * numMatchdays + md] = 0;
    homeAwayPatterns.unassign();
    homeAwayPatterns.unassign();
    ++numUnassignedGames;
  };

  const reject = (gameIndex: number, md: number) => {
    const [h, a] = allGames[gameIndex];

    // md is full
    if (numMatchesByMatchday[md] === matchdaySize) {
      return true;
    }

    // already played this md
    const hasHomeTeamPlayedThisMatchday =
      locationByTeamMatchday[h * numMatchdays + md] !== 0;
    if (hasHomeTeamPlayedThisMatchday) {
      return true;
    }

    const hasAwayTeamPlayedThisMatchday =
      locationByTeamMatchday[a * numMatchdays + md] !== 0;
    if (hasAwayTeamPlayedThisMatchday) {
      return true;
    }

    if (isBannedOnMatchday[gameIndex * numMatchdays + md]) {
      return true;
    }

    if (
      isCappedGame[gameIndex] &&
      (isClosedToCappedGames[md] ||
        numCappedGamesByMatchday[md] >= maxCappedGamesByMatchday[md])
    ) {
      return true;
    }

    const homeConflictTeam = cannotHostSameDayTeam[h];
    if (
      homeConflictTeam !== -1 &&
      locationByTeamMatchday[homeConflictTeam * numMatchdays + md] === 1
    ) {
      return true;
    }

    const awayConflictTeam = cannotHostSameDayTeam[a];
    if (
      awayConflictTeam !== -1 &&
      locationByTeamMatchday[awayConflictTeam * numMatchdays + md] === 2
    ) {
      return true;
    }

    // At 1 this can never fire,
    // since a club playing twice on one matchday is already rejected above.
    if (minMatchdaysBetweenMeetings > 1) {
      for (const otherGame of otherMeetingsByGame[gameIndex]) {
        const otherMatchday = matchdayByGame[otherGame];
        if (
          otherMatchday !== -1 &&
          Math.abs(otherMatchday - md) < minMatchdaysBetweenMeetings
        ) {
          return true;
        }
      }
    }

    // Committing h home / a away here must leave each club at least one
    // complete home/away pattern still possible.
    // Bans are already out of each club's patterns, so this enforces them too.
    if (!homeAwayPatterns.isViable(h, true, md)) {
      return true;
    }
    if (!homeAwayPatterns.isViable(a, false, md)) {
      return true;
    }

    return false;
  };

  const nextRandom = lowDiscrepancySequence(randomSeed);

  const solved = findFirstSolutionMutable<readonly [number, number]>({
    isSolved: () => numUnassignedGames === 0,

    getCandidates: () => {
      // active matchday: first unfilled one in the fill order
      const md =
        fillOrder.find(m => numMatchesByMatchday[m] < matchdaySize) ?? -1;

      if (numUnassignedCappedGames > 0) {
        const { room, numOpenMatchdays } = getRoomForCappedGames();
        // Without this the search only noticed
        // once the last matchdays came up short.
        if (room < numUnassignedCappedGames) {
          return [];
        }

        // The capped games barely fit,
        // so each matchday decides its capped games before anything else
        // rather than taking whichever are left over.
        // Left to the club-by-club order below,
        // a 20-team season with the big six one a matchday
        // went past 45s on 7 seeds out of 10.
        if (
          Number.isFinite(maxCappedGamesPerMatchday) &&
          !isClosedToCappedGames[md] &&
          numCappedGamesByMatchday[md] < maxCappedGamesByMatchday[md]
        ) {
          const feasibleCappedGames: (readonly [number, number])[] = [];
          for (let g = 0; g < numGames; ++g) {
            if (isCappedGame[g] && matchdayByGame[g] === -1 && !reject(g, md)) {
              feasibleCappedGames.push([g, nextRandom()]);
            }
          }
          feasibleCappedGames.sort((x, y) => x[1] - y[1]);
          const candidates = feasibleCappedGames.map(([g]) => [g, md] as const);
          // Room on this matchday only counts while it stays open.
          const roomElsewhere =
            room -
            (maxCappedGamesByMatchday[md] - numCappedGamesByMatchday[md]);
          if (roomElsewhere >= numUnassignedCappedGames) {
            // Tried last, the closing all happened where the search
            // first backtracked, leaving five matchdays in a row
            // without a capped game.
            // Tried first at the rate the spare room allows,
            // the matchdays without one spread over the season.
            const spareRoom = room - numUnassignedCappedGames;
            if (nextRandom() * numOpenMatchdays < spareRoom) {
              candidates.unshift([closeToCappedGames, md]);
            } else {
              candidates.push([closeToCappedGames, md]);
            }
          }
          return candidates;
        }
      }

      // MRV within the active matchday:
      // extend the team with the fewest feasible games,
      // ties broken off the seeded sequence,
      // so differently seeded instances explore different regions
      let pickedTeam = -1;
      let pickedGames: number[] = [];
      let numTies = 1;
      for (let team = 0; team < numTeams; ++team) {
        if (locationByTeamMatchday[team * numMatchdays + md] !== 0) {
          continue;
        }
        const feasibleGames = gamesByTeam[team].filter(
          g => matchdayByGame[g] === -1 && !reject(g, md),
        );
        // a team with no feasible game makes this matchday a dead end
        if (feasibleGames.length === 0) {
          return [];
        }
        if (pickedTeam === -1 || feasibleGames.length < pickedGames.length) {
          pickedTeam = team;
          pickedGames = feasibleGames;
          numTies = 1;
        } else if (feasibleGames.length === pickedGames.length) {
          ++numTies;
          if (nextRandom() * numTies < 1) {
            pickedTeam = team;
            pickedGames = feasibleGames;
          }
        }
      }

      // most constrained opponent first, ties broken the same way
      const scoredGames = pickedGames.map(g => {
        const [h, a] = allGames[g];
        const opponent = h === pickedTeam ? a : h;
        let numOpponentOptions = 0;
        for (const og of gamesByTeam[opponent]) {
          if (matchdayByGame[og] === -1 && !reject(og, md)) {
            ++numOpponentOptions;
          }
        }
        // First meetings go before rematches when they have to be kept apart,
        // pushing the rematches later, where the season still has room for them.
        // Without it a 20-team season with meetings 5 matchdays apart
        // went unsolved within 5s on every seed tried.
        const isHeldBackRematch =
          minMatchdaysBetweenMeetings > 1 &&
          otherMeetingsByGame[g].some(og => matchdayByGame[og] !== -1);
        return [
          g,
          (isHeldBackRematch ? numTeams : 0) +
            numOpponentOptions +
            nextRandom() * 0.5,
        ] as const;
      });
      scoredGames.sort((x, y) => x[1] - y[1]);

      return scoredGames.map(([g]) => [g, md] as const);
    },

    apply: ([g, md]) => {
      if (g === closeToCappedGames) {
        isClosedToCappedGames[md] = 1;
      } else {
        place(g, md);
      }
    },

    undo: ([g, md]) => {
      if (g === closeToCappedGames) {
        isClosedToCappedGames[md] = 0;
      } else {
        unplace(g, md);
      }
    },
  });

  if (!solved) {
    throw new Error('No solution');
  }

  const arr = Array.from(
    {
      length: numMatchdays,
    },
    () => [] as (readonly [number, number])[],
  );
  for (const [gameIndex, md] of matchdayByGame.entries()) {
    arr[md].push(allGames[gameIndex]);
  }
  return arr;
};
