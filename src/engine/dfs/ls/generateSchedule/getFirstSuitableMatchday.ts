import { orderBy, range, sum } from 'lodash';

import { findFirstSolution } from '#utils/backtrack';

function toBase3Array(num: number, length: number) {
  const result = Array.from(
    {
      length,
    },
    () => 0,
  );
  for (let i = length - 1, n = num; i >= 0 && n > 0; --i) {
    result[i] = n % 3;
    n = Math.floor(n / 3);
  }
  return result;
}

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

  const sequences = generateSequenceCombos(numMatchdays);

  const isLocComboPossible = (s: number) => {
    const base3Arr = toBase3Array(s, numMatchdays);
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

  const locComboPossibleBySum = Array.from(
    {
      length: 3 ** numMatchdays,
    },
    (_, i) => isLocComboPossible(i),
  );

  const schedule: number[] = [];

  const sameStadiumTeamMap = new Map(
    sameStadiumTeamPairs.values().flatMap(pair => [pair, [pair[1], pair[0]]]),
  );

  const coldTeams = new Set(coldTeamIndices);

  let record = 0;

  const numMatchesByMatchday = Array.from(
    {
      length: numMatchdays,
    },
    () => 0,
  );
  // team:md
  const locationByMatchday: Record<`${number}:${number}`, 'h' | 'a'> = {};
  const locationSequenceSumByTeam: Record<number, number> = {};

  for (const pickedMatchday of range(numMatchdays)) {
    const solution = findFirstSolution(
      {
        matchIndex: 0,
        schedule,
        numMatchesByMatchday,
        pickedMatchday,
        locationByMatchday,
        locationSequenceSumByTeam,
      },
      {
        reject: c => {
          const [h, a] = allGames[c.matchIndex];
          const md = c.pickedMatchday;

          // md is full
          if (c.numMatchesByMatchday[md] === matchdaySize) {
            return true;
          }

          // already played this md
          const hasHomeTeamPlayedThisMatchday =
            c.locationByMatchday[`${h}:${md}`];
          if (hasHomeTeamPlayedThisMatchday) {
            return true;
          }

          const hasAwayTeamPlayedThisMatchday =
            c.locationByMatchday[`${a}:${md}`];
          if (hasAwayTeamPlayedThisMatchday) {
            return true;
          }

          const homeSameStadiumTeam = sameStadiumTeamMap.get(h);
          if (
            homeSameStadiumTeam !== undefined &&
            c.locationByMatchday[`${homeSameStadiumTeam}:${md}`] === 'h'
          ) {
            return true;
          }

          const awaySameStadiumTeam = sameStadiumTeamMap.get(a);
          if (
            awaySameStadiumTeam !== undefined &&
            c.locationByMatchday[`${awaySameStadiumTeam}:${md}`] === 'a'
          ) {
            return true;
          }

          if (md === numMatchdays - 1 && coldTeams.has(h)) {
            return true;
          }

          const pow = 3 ** c.pickedMatchday;
          const hS = (c.locationSequenceSumByTeam[h] ?? 0) + 1 * pow;
          if (!locComboPossibleBySum[hS]) {
            return true;
          }
          const aS = (c.locationSequenceSumByTeam[a] ?? 0) + 2 * pow;
          if (!locComboPossibleBySum[aS]) {
            return true;
          }

          return false;
        },

        accept: c => c.matchIndex === numGames - 1,

        // eslint-disable-next-line no-loop-func
        generate: c => {
          const pickedMatch = allGames[c.matchIndex];

          const newMatchIndex = c.matchIndex + 1;

          const newLocationByMatchday: typeof c.locationByMatchday = {
            ...c.locationByMatchday,
            [`${pickedMatch[0]}:${c.pickedMatchday}`]: 'h',
            [`${pickedMatch[1]}:${c.pickedMatchday}`]: 'a',
          } satisfies typeof c.locationByMatchday;

          const pow = 3 ** c.pickedMatchday;
          const newLocationSequenceSumByTeam = {
            ...c.locationSequenceSumByTeam,
            [pickedMatch[0]]:
              (c.locationSequenceSumByTeam[pickedMatch[0]] ?? 0) + 1 * pow,
            [pickedMatch[1]]:
              (c.locationSequenceSumByTeam[pickedMatch[1]] ?? 0) + 2 * pow,
          };

          const newSchedule = [
            ...c.schedule,
            c.pickedMatchday,
          ] satisfies typeof c.schedule as typeof c.schedule;

          const newNumMatchesByMatchday = c.numMatchesByMatchday.with(
            c.pickedMatchday,
            c.numMatchesByMatchday[c.pickedMatchday] + 1,
          );

          if (newMatchIndex > record) {
            // eslint-disable-next-line no-console
            console.log(newMatchIndex);
            record = newMatchIndex;
          }

          const mds = orderBy(range(numMatchdays), i => {
            const [h, a] = allGames[newMatchIndex];
            let score = 0;
            const homeLoc = newLocationByMatchday[`${h}:${i - 1}`];
            const awayLoc = newLocationByMatchday[`${a}:${i - 1}`];

            // 1. Prefer alternating with the previous match
            if (homeLoc === 'h') {
              score += 10;
            }
            if (awayLoc === 'a') {
              score += 10;
            }

            // 2. Penalize risk of 3H/3A if md+1 is already set
            if (newLocationByMatchday[`${h}:${i + 1}`] === 'h') {
              score += 20;
            }
            if (newLocationByMatchday[`${a}:${i + 1}`] === 'a') {
              score += 20;
            }

            // 4. Penalize full matchdays
            score += numMatchesByMatchday[i] * 2;

            score += i * 1.5;

            return score;
          });

          // shuffling candidates makes it worse
          const candidates: (typeof c)[] = [];

          for (const i of mds) {
            candidates.push({
              matchIndex: newMatchIndex,
              schedule: newSchedule,
              numMatchesByMatchday: newNumMatchesByMatchday,
              pickedMatchday: i,
              locationByMatchday: newLocationByMatchday,
              locationSequenceSumByTeam: newLocationSequenceSumByTeam,
            });
          }

          return candidates;
        },
      },
    );

    if (solution) {
      const arr = Array.from(
        {
          length: numMatchdays,
        },
        () => [] as (readonly [number, number])[],
      );
      for (const [i, matchdayIndex] of solution.schedule.entries()) {
        const m = allGames[i];
        arr[matchdayIndex].push(m);
      }
      arr[solution.pickedMatchday].push(allGames[solution.matchIndex]);
      return arr;
    }
  }

  throw new Error('No solution!');
};
