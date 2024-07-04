import { range, shuffle } from 'lodash';

import { findFirstSolution } from '#utils/backtrack';

import teamsSharingStadium from './teamsSharingStadium';

interface Team {
  name: string;
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

  const schedule: Record<`${number}:${number}`, number> = {};

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

  const numMatchesPerMatchday = Array.from(
    {
      length: numMatchdays,
    },
    () => 0,
  );
  // team:md
  const locationByMatchday: Record<`${number}:${number}`, 'h' | 'a'> = {};
  const numHomeGamesByTeam: Record<number, number> = {};
  const numAwayGamesByTeam: Record<number, number> = {};

  for (const pickedMatchday of shuffle(range(numMatchdays))) {
    const solution = findFirstSolution(
      {
        matchIndex: 0,
        schedule,
        numMatchesPerMatchday,
        pickedMatchday,
        locationByMatchday,
        numHomeGamesByTeam,
        numAwayGamesByTeam,
      },
      {
        reject: c => {
          const [h, a] = allGames[c.matchIndex];

          // md is full
          if (c.numMatchesPerMatchday[c.pickedMatchday] === matchdaySize) {
            return true;
          }

          // already played this md
          const hasHomeTeamPlayedThisMatchday =
            c.locationByMatchday[`${h}:${c.pickedMatchday}`];
          if (hasHomeTeamPlayedThisMatchday) {
            return true;
          }

          const hasAwayTeamPlayedThisMatchday =
            c.locationByMatchday[`${a}:${c.pickedMatchday}`];
          if (hasAwayTeamPlayedThisMatchday) {
            return true;
          }

          const homeSameStadiumTeam = sameStadiumTeamMap.get(h);
          if (
            homeSameStadiumTeam !== undefined &&
            c.locationByMatchday[
              `${homeSameStadiumTeam}:${c.pickedMatchday}`
            ] === 'h'
          ) {
            return true;
          }

          const awaySameStadiumTeam = sameStadiumTeamMap.get(a);
          if (
            awaySameStadiumTeam !== undefined &&
            c.locationByMatchday[
              `${awaySameStadiumTeam}:${c.pickedMatchday}`
            ] === 'a'
          ) {
            return true;
          }

          for (let b = 0; b < 2; ++b) {
            const loc = b === 0 ? 'h' : 'a';
            const t = b === 0 ? h : a;

            if (c.pickedMatchday <= 1) {
              // is first two
              if (
                c.locationByMatchday[`${t}:${1 - c.pickedMatchday}`] === loc
              ) {
                return true;
              }
            } else if (c.pickedMatchday >= numMatchdays - 2) {
              // is last two
              if (
                c.locationByMatchday[
                  `${t}:${numMatchdays * 2 - 3 - c.pickedMatchday}`
                ] === loc
              ) {
                return true;
              }
            } else {
              const minus1 =
                c.locationByMatchday[`${t}:${c.pickedMatchday - 1}`];
              const plus1 =
                c.locationByMatchday[`${t}:${c.pickedMatchday + 1}`];
              if (minus1 === loc) {
                if (plus1 === loc) {
                  return true;
                }
                const minus2 =
                  c.locationByMatchday[`${t}:${c.pickedMatchday - 2}`];
                if (minus2 === loc) {
                  return true;
                }
              } else {
                const plus2 =
                  c.locationByMatchday[`${t}:${c.pickedMatchday + 2}`];
                if (plus1 === loc && plus2 === loc) {
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

          const newNumHomeGamesByTeam = {
            ...c.numHomeGamesByTeam,
            [pickedMatch[0]]: (c.numHomeGamesByTeam[pickedMatch[0]] ?? 0) + 1,
          } as typeof c.numHomeGamesByTeam;
          const newNumAwayGamesByTeam = {
            ...c.numAwayGamesByTeam,
            [pickedMatch[1]]: (c.numAwayGamesByTeam[pickedMatch[1]] ?? 0) + 1,
          } as typeof c.numAwayGamesByTeam;

          const newSchedule = {
            ...c.schedule,
            [`${pickedMatch[0]}:${pickedMatch[1]}`]: c.pickedMatchday,
          } satisfies typeof c.schedule as typeof c.schedule;

          const newNumMatchesByMatchday = c.numMatchesPerMatchday.with(
            c.pickedMatchday,
            c.numMatchesPerMatchday[c.pickedMatchday] + 1,
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
              numMatchesPerMatchday: newNumMatchesByMatchday,
              pickedMatchday: i,
              locationByMatchday: newLocationByMatchday,
              numHomeGamesByTeam: newNumHomeGamesByTeam,
              numAwayGamesByTeam: newNumAwayGamesByTeam,
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
      for (const [key, matchdayIndex] of Object.entries(solution.schedule)) {
        const m = key.split(':').map(Number) as [number, number];
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
