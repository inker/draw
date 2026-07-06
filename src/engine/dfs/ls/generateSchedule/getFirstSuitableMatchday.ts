import { range, sum } from 'lodash';

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
  sameStadiumTeamPairs,
}: {
  matchdaySize: number;
  allGames: readonly (readonly [number, number])[];
  coldTeamIndices: readonly number[];
  sameStadiumTeamPairs: readonly (readonly [number, number])[];
}) => {
  const numGames = allGames.length;
  const numMatchdays = numGames / matchdaySize;
  const numTeams = matchdaySize * 2;
  const lastMatchday = numMatchdays - 1;

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

  const sameStadiumTeam = new Int32Array(numTeams).fill(-1);
  for (const [a, b] of sameStadiumTeamPairs) {
    sameStadiumTeam[a] = b;
    sameStadiumTeam[b] = a;
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

  const initState = () => {
    locationByTeamMatchday.fill(0);
    numMatchesByMatchday.fill(0);
    locationSumByTeam.fill(0);
    matchdayByGame.fill(-1);
    numUnassignedGames = numGames;
  };

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

    const homeSameStadiumTeam = sameStadiumTeam[h];
    if (
      homeSameStadiumTeam !== -1 &&
      locationByTeamMatchday[homeSameStadiumTeam * numMatchdays + md] === 1
    ) {
      return true;
    }

    const awaySameStadiumTeam = sameStadiumTeam[a];
    if (
      awaySameStadiumTeam !== -1 &&
      locationByTeamMatchday[awaySameStadiumTeam * numMatchdays + md] === 2
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

  // Backtracking on this problem has heavy-tailed runtimes,
  // so the search is randomised & restarted with a doubling node budget.
  // A search that exhausts without hitting the budget is a definitive failure.
  class BudgetExhaustedError extends Error {
    constructor() {
      super('node budget exhausted');
      this.name = 'BudgetExhaustedError';
    }
  }

  let nodesLeft = 0;

  const search = (): boolean => {
    if (numUnassignedGames === 0) {
      return true;
    }

    if (--nodesLeft < 0) {
      throw new BudgetExhaustedError();
    }

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
    // (random tie-breaking, so retries explore different regions)
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
        return false;
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

    for (const [g] of scoredGames) {
      place(g, md);
      const numAssignedGames = numGames - numUnassignedGames;
      if (numAssignedGames > record) {
        // eslint-disable-next-line no-console
        console.log(numAssignedGames);
        record = numAssignedGames;
      }
      if (search()) {
        return true;
      }
      unplace(g, md);
    }

    return false;
  };

  for (let budget = 10_000; ; budget *= 2) {
    initState();
    nodesLeft = budget;
    try {
      if (!search()) {
        // the search space was exhausted within the budget
        throw new Error('No solution');
      }
      break;
    } catch (err) {
      if (!(err instanceof BudgetExhaustedError)) {
        throw err;
      }
    }
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
