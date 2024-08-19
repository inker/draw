import { range, shuffle } from 'lodash';

import { findFirstSolution } from '#utils/backtrack';

import teamsSharingStadium from './teamsSharingStadium';

interface Team {
  readonly name: string;
}

export default ({
  teams,
  matchdaySize,
  allGames,
}: {
  teams: readonly Team[];
  matchdaySize: number;
  allGames: readonly (readonly [number, number])[];
}) => {
  const numGames = allGames.length;
  const numMatchdays = numGames / matchdaySize;

  const indexByTeamName = new Map(teams.map((team, i) => [team.name, i]));

  const schedule: number[] = [];

  const sameStadiumTeamMap = new Map<number, number>();
  for (const pair of teamsSharingStadium) {
    const a = indexByTeamName.get(pair[0]);
    const b = indexByTeamName.get(pair[1]);
    if (a !== undefined && b !== undefined) {
      sameStadiumTeamMap.set(a, b);
      sameStadiumTeamMap.set(b, a);
    }
  }

  let record = 0;

  const numMatchesByMatchday = Array.from(
    {
      length: numMatchdays,
    },
    () => 0,
  );
  // team:md
  const locationByMatchday: Record<`${number}:${number}`, 'h' | 'a'> = {};

  for (const pickedMatchday of shuffle(range(numMatchdays))) {
    const solution = findFirstSolution(
      {
        matchIndex: 0,
        schedule,
        numMatchesByMatchday,
        pickedMatchday,
        locationByMatchday,
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

          for (let b = 0; b < 2; ++b) {
            const loc = b === 0 ? 'h' : 'a';
            const t = b === 0 ? h : a;

            if (md <= 1) {
              // is first two
              if (c.locationByMatchday[`${t}:${1 - md}`] === loc) {
                return true;
              }
            } else if (
              md >= numMatchdays - 2 && // is last two
              c.locationByMatchday[`${t}:${numMatchdays * 2 - 3 - md}`] === loc
            ) {
              return true;
            }

            if (md > 0 && md < numMatchdays - 1) {
              const minus1 = c.locationByMatchday[`${t}:${md - 1}`];
              const plus1 = c.locationByMatchday[`${t}:${md + 1}`];
              if (minus1 === loc) {
                if (plus1 === loc) {
                  return true;
                }
                const minus2 = c.locationByMatchday[`${t}:${md - 2}`];
                if (minus2 === loc) {
                  return true;
                }
              } else if (plus1 === loc) {
                const plus2 = c.locationByMatchday[`${t}:${md + 2}`];
                if (plus2 === loc) {
                  return true;
                }
              }
            }
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

          // shuffling candidates makes it worse
          const candidates: (typeof c)[] = [];

          for (let i = 0; i < numMatchdays; ++i) {
            candidates.push({
              matchIndex: newMatchIndex,
              schedule: newSchedule,
              numMatchesByMatchday: newNumMatchesByMatchday,
              pickedMatchday: i,
              locationByMatchday: newLocationByMatchday,
            });
          }

          return shuffle(candidates);
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
      return {
        pickedMatchday,
        matchdays: arr,
      };
    }
  }

  throw new Error('No solution!');
};
