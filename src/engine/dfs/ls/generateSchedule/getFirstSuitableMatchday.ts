import { orderBy, range, sum } from 'lodash';

import rangeGenerator from '#utils/rangeGenerator';
import intToBase3Array from '#utils/intToBase3Array';

function generateSequenceCombos(
  numMatchdays: number,
  step?: 'end' | 'start' | 'middle',
) {
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
        ((!step || step === 'end' || step === 'start' || step === 'middle') &&
          (item.startsWith('00') || item.startsWith('11'))) ||
        ((!step || step === 'start' || step === 'middle') &&
          (item.endsWith('00') || item.endsWith('11'))) ||
        ((!step || step === 'middle') &&
          (item.includes('000') || item.includes('111')));
      return !impossible;
    })
    .map(item => item.split('').map(s => +s + 1));
}

function getValidLocationSums(
  numMatchdays: number,
  step?: 'end' | 'start' | 'middle',
) {
  const sequences = generateSequenceCombos(numMatchdays, step);

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
  schedule,
  step,
  coldTeamIndices,
  sameStadiumTeamPairs,
}: {
  matchdaySize: number;
  allGames: readonly (readonly [number, number])[];
  schedule: readonly number[];
  step?: 'end' | 'start' | 'middle';
  coldTeamIndices: readonly number[];
  sameStadiumTeamPairs: readonly (readonly [number, number])[];
}) => {
  const numGames = allGames.length;
  const numMatchdays = numGames / matchdaySize;
  const numTeams = matchdaySize * 2;
  const lastMatchday = numMatchdays - 1;
  const matchdayIndices =
    !step || step === 'end'
      ? range(numMatchdays)
      : step === 'start'
        ? range(numMatchdays - 2)
        : range(2, numMatchdays - 2);

  const validLocationSums = getValidLocationSums(numMatchdays, step);
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

  for (const [i, md] of schedule.entries()) {
    place(i, md);
  }

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

  // reused per search node
  const numAvailableGamesByMatchday = new Uint16Array(numMatchdays);
  const coverageMaskByTeam = new Uint32Array(numTeams);

  const search = (): boolean => {
    if (numUnassignedGames === 0) {
      return true;
    }

    // MRV: branch on the unassigned game with the fewest feasible matchdays
    // (random tie-breaking, so retries explore different regions)
    numAvailableGamesByMatchday.fill(0);
    coverageMaskByTeam.fill(0);
    let pickedGameIndex = -1;
    let pickedMask = 0;
    let pickedCount = Infinity;
    let numTies = 1;
    for (let gameIndex = 0; gameIndex < numGames; ++gameIndex) {
      if (matchdayByGame[gameIndex] !== -1) {
        continue;
      }
      let mask = 0;
      let count = 0;
      for (const md of matchdayIndices) {
        if (!reject(gameIndex, md)) {
          mask |= 1 << md;
          ++count;
          ++numAvailableGamesByMatchday[md];
        }
      }
      // a game with an empty domain makes this branch a dead end
      if (count === 0) {
        return false;
      }
      const [h, a] = allGames[gameIndex];
      coverageMaskByTeam[h] |= mask;
      coverageMaskByTeam[a] |= mask;
      if (count < pickedCount) {
        pickedCount = count;
        pickedGameIndex = gameIndex;
        pickedMask = mask;
        numTies = 1;
      } else if (count === pickedCount) {
        ++numTies;
        if (Math.random() * numTies < 1) {
          pickedGameIndex = gameIndex;
          pickedMask = mask;
        }
      }
    }

    // a matchday with fewer assignable games than empty slots is a dead end
    for (const md of matchdayIndices) {
      if (
        numAvailableGamesByMatchday[md] <
        matchdaySize - numMatchesByMatchday[md]
      ) {
        return false;
      }
    }

    // a team with a free matchday none of its games can fill is a dead end
    for (let team = 0; team < numTeams; ++team) {
      let freeMask = 0;
      for (const md of matchdayIndices) {
        if (locationByTeamMatchday[team * numMatchdays + md] === 0) {
          freeMask |= 1 << md;
        }
      }
      if ((coverageMaskByTeam[team] & freeMask) !== freeMask) {
        return false;
      }
    }

    const [h, a] = allGames[pickedGameIndex];
    const feasibleMatchdays = matchdayIndices.filter(
      md => (pickedMask & (1 << md)) !== 0,
    );

    const orderedMatchdays = orderBy(feasibleMatchdays, md => {
      let score = 0;

      // 1. Prefer alternating with the previous match
      if (md > 0) {
        if (locationByTeamMatchday[h * numMatchdays + md - 1] === 1) {
          score += 10;
        }
        if (locationByTeamMatchday[a * numMatchdays + md - 1] === 2) {
          score += 10;
        }
      }

      // 2. Penalize risk of 3H/3A if md+1 is already set
      if (md < lastMatchday) {
        if (locationByTeamMatchday[h * numMatchdays + md + 1] === 1) {
          score += 20;
        }
        if (locationByTeamMatchday[a * numMatchdays + md + 1] === 2) {
          score += 20;
        }
      }

      // 4. Penalize full matchdays
      score += numMatchesByMatchday[md] * 2;

      score += md * 1.5;

      // break exact ties randomly (score granularity is 0.5)
      score += Math.random() * 0.4;

      return score;
    });

    for (const md of orderedMatchdays) {
      place(pickedGameIndex, md);
      const numAssignedGames = numGames - numUnassignedGames;
      if (numAssignedGames > record) {
        // eslint-disable-next-line no-console
        console.log(numAssignedGames);
        record = numAssignedGames;
      }
      if (search()) {
        return true;
      }
      unplace(pickedGameIndex, md);
    }

    return false;
  };

  if (search()) {
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
  }

  throw new Error('No solution');
};
