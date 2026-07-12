import { range, sum } from 'lodash';

import { findFirstSolutionMutable } from '#utils/backtrack';
import rangeGenerator from '#utils/rangeGenerator';
import intToBase3Array from '#utils/intToBase3Array';

function generateSequenceCombos(numMatchdays: number) {
  // generate all
  const arr: string[] = [];
  for (let i = 0; i < 2 ** numMatchdays; ++i) {
    const binary = i.toString(2).padStart(numMatchdays, '0');
    const digits = binary.split('').map(Number);
    const s = sum(digits);
    if (s === numMatchdays / 2) {
      arr.push(binary);
    }
  }

  // filter
  return arr
    .filter(item => {
      const impossible =
        item.startsWith('00') ||
        item.startsWith('11') ||
        item.endsWith('00') ||
        item.endsWith('11') ||
        item.includes('000') ||
        item.includes('111');
      return !impossible;
    })
    .map(item => item.split('').map(s => +s + 1));
}

function getValidLocationSums(numMatchdays: number) {
  const sequences = generateSequenceCombos(numMatchdays);

  const isLocComboPossible = (s: number) => {
    const base3Arr = intToBase3Array(s, numMatchdays);
    return sequences.some(seq => {
      for (let i = 0; i < numMatchdays; ++i) {
        const item = base3Arr[i];
        if (!item || item === seq[i]) {
          continue;
        }
        return false;
      }
      return true;
    });
  };

  return new Set(rangeGenerator(3 ** numMatchdays).filter(isLocComboPossible));
}

export default ({
  matchdaySize,
  allGames,
  coldTeamIndices,
  cannotHostSameDayPairs,
}: {
  matchdaySize: number;
  allGames: readonly (readonly [number, number])[];
  coldTeamIndices: readonly number[];
  cannotHostSameDayPairs: readonly (readonly [number, number])[];
}) => {
  const numGames = allGames.length;
  const numMatchdays = numGames / matchdaySize;
  const numTeams = matchdaySize * 2;
  const lastMatchday = numMatchdays - 1;

  // A fractional matchday count makes every derived size nonsense.
  if (!Number.isInteger(numMatchdays)) {
    throw new TypeError(
      `allGames length ${numGames} is not a multiple of matchdaySize ${matchdaySize}`,
    );
  }
  // locationSumByTeam (Uint32) holds a base-3 pattern up to 3 ** numMatchdays - 1,
  // & isValidLocationSum is a lookup of that length. Beyond this it overflows
  // the encoding (& long before that becomes a memory bomb).
  if (3 ** numMatchdays > 2 ** 32) {
    throw new Error(
      `numMatchdays=${numMatchdays} too large: 3 ** numMatchdays overflows the Uint32 location-sum encoding`,
    );
  }
  // numMatchesByMatchday is a Uint16 counting up to matchdaySize.
  if (matchdaySize > 0xffff) {
    throw new Error(
      `matchdaySize=${matchdaySize} exceeds 65535 (numMatchesByMatchday is Uint16)`,
    );
  }

  // Matchdays are filled one at a time, boundary matchdays first:
  // their alternation constraints have zero slack,
  // so they are satisfied while the rest of the schedule is still free.
  const fillOrder = [
    lastMatchday,
    lastMatchday - 1,
    ...range(0, lastMatchday - 1),
  ];

  const validLocationSums = getValidLocationSums(numMatchdays);
  const isValidLocationSum = new Uint8Array(3 ** numMatchdays);
  for (const s of validLocationSums) {
    isValidLocationSum[s] = 1;
  }

  const pow3 = Array.from(
    {
      length: numMatchdays,
    },
    (_, i) => 3 ** i,
  );

  const cannotHostSameDayTeam = new Int32Array(numTeams).fill(-1);
  for (const [a, b] of cannotHostSameDayPairs) {
    cannotHostSameDayTeam[a] = b;
    cannotHostSameDayTeam[b] = a;
  }

  const isColdTeam = new Uint8Array(numTeams);
  for (const teamIndex of coldTeamIndices) {
    isColdTeam[teamIndex] = 1;
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

  // 0 = not playing, 1 = home, 2 = away
  // (matches the base-3 digits of the location sums)
  const locationByTeamMatchday = new Uint8Array(numTeams * numMatchdays);
  const numMatchesByMatchday = new Uint16Array(numMatchdays);
  const locationSumByTeam = new Uint32Array(numTeams);
  const matchdayByGame = new Int32Array(numGames).fill(-1);

  let numUnassignedGames = numGames;

  const place = (gameIndex: number, md: number) => {
    const [h, a] = allGames[gameIndex];
    matchdayByGame[gameIndex] = md;
    ++numMatchesByMatchday[md];
    locationByTeamMatchday[h * numMatchdays + md] = 1;
    locationByTeamMatchday[a * numMatchdays + md] = 2;
    locationSumByTeam[h] += pow3[md];
    locationSumByTeam[a] += 2 * pow3[md];
    --numUnassignedGames;
  };

  const unplace = (gameIndex: number, md: number) => {
    const [h, a] = allGames[gameIndex];
    matchdayByGame[gameIndex] = -1;
    --numMatchesByMatchday[md];
    locationByTeamMatchday[h * numMatchdays + md] = 0;
    locationByTeamMatchday[a * numMatchdays + md] = 0;
    locationSumByTeam[h] -= pow3[md];
    locationSumByTeam[a] -= 2 * pow3[md];
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

    if (md === lastMatchday && isColdTeam[h]) {
      return true;
    }

    const pow = pow3[md];
    const hS = locationSumByTeam[h] + 1 * pow;
    if (!isValidLocationSum[hS]) {
      return true;
    }
    const aS = locationSumByTeam[a] + 2 * pow;
    if (!isValidLocationSum[aS]) {
      return true;
    }

    return false;
  };

  let record = 0;

  const solved = findFirstSolutionMutable<readonly [number, number]>({
    isSolved: () => numUnassignedGames === 0,

    getCandidates: () => {
      // active matchday: first unfilled one in the fill order
      let md = -1;
      for (const m of fillOrder) {
        if (numMatchesByMatchday[m] < matchdaySize) {
          md = m;
          break;
        }
      }

      // MRV within the active matchday:
      // extend the team with the fewest feasible games
      // (random tie-breaking, so restarts explore different regions)
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
          if (Math.random() * numTies < 1) {
            pickedTeam = team;
            pickedGames = feasibleGames;
          }
        }
      }

      // most constrained opponent first, random tie-breaking
      const scoredGames = pickedGames.map(g => {
        const [h, a] = allGames[g];
        const opponent = h === pickedTeam ? a : h;
        let numOpponentOptions = 0;
        for (const og of gamesByTeam[opponent]) {
          if (matchdayByGame[og] === -1 && !reject(og, md)) {
            ++numOpponentOptions;
          }
        }
        return [g, numOpponentOptions + Math.random() * 0.5] as const;
      });
      scoredGames.sort((x, y) => x[1] - y[1]);

      return scoredGames.map(([g]) => [g, md] as const);
    },

    apply: ([g, md]) => {
      place(g, md);
      const numAssignedGames = numGames - numUnassignedGames;
      if (numAssignedGames > record) {
        // eslint-disable-next-line no-console
        console.log(numAssignedGames);
        record = numAssignedGames;
      }
    },

    undo: ([g, md]) => {
      unplace(g, md);
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
