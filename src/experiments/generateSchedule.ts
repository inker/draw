import { keyBy, orderBy } from 'lodash';

import { findFirstSolution } from '#utils/backtrack';

const getFirstSuitableMatch = ({
  matchdaySize,
  remainingMatches: remainingMatchesUnordered,
  schedule,
}: {
  matchdaySize: number;
  remainingMatches: readonly (readonly [number, number])[];
  schedule: readonly (readonly [number, number])[];
}) => {
  // team:md
  const locationByMatchday: Record<`${number}:${number}`, boolean> = {};
  const numHomeGamesByTeam: Record<number, number> = {};
  const numAwayGamesByTeam: Record<number, number> = {};

  const remainingMatches = orderBy(remainingMatchesUnordered, [
    m => m[0],
    m => -m[1],
  ]);

  debugger;

  for (const [i, [h, a]] of schedule.entries()) {
    const matchdayIndex = Math.floor(i / matchdaySize);
    locationByMatchday[`${h}:${matchdayIndex}`] = true;
    locationByMatchday[`${a}:${matchdayIndex}`] = true;
    numHomeGamesByTeam[h] = (numHomeGamesByTeam[h] ?? 0) + 1;
    numAwayGamesByTeam[a] = (numAwayGamesByTeam[a] ?? 0) + 1;
  }

  return remainingMatches.find(m => {
    const solution = findFirstSolution(
      {
        source: remainingMatches,
        target: schedule,
        picked: m,
        locationByMatchday,
        numHomeGamesByTeam,
        numAwayGamesByTeam,
      },
      {
        reject: c => {
          const [h, a] = c.picked;
          const currentMatchdayIndex = Math.floor(
            c.target.length / matchdaySize,
          );

          const hasHomeTeamPlayedThisMatchday =
            c.locationByMatchday[`${h}:${currentMatchdayIndex}`];
          if (hasHomeTeamPlayedThisMatchday) {
            return true;
          }

          const hasAwayTeamPlayedThisMatchday =
            c.locationByMatchday[`${a}:${currentMatchdayIndex}`];
          if (hasAwayTeamPlayedThisMatchday) {
            return true;
          }

          if (c.numHomeGamesByTeam[h] > c.numAwayGamesByTeam[h]) {
            return true;
          }

          if (c.numAwayGamesByTeam[a] > c.numHomeGamesByTeam[a]) {
            return true;
          }

          return false;
        },

        accept: c => c.source.length === 1,

        generate: c => {
          const oldMatchdayIndex = Math.floor(c.target.length / matchdaySize);

          const newTarget = [...c.target, c.picked];
          const newMatchdayIndex = Math.floor(newTarget.length / matchdaySize);
          const newLocationByMatchday: typeof c.locationByMatchday = {
            ...c.locationByMatchday,
            [`${c.picked[0]}:${oldMatchdayIndex}`]: true,
            [`${c.picked[1]}:${oldMatchdayIndex}`]: true,
          } satisfies typeof c.locationByMatchday;

          const newNumHomeGamesByTeam = {
            ...c.numHomeGamesByTeam,
            [c.picked[0]]: (c.numHomeGamesByTeam[c.picked[0]] ?? 0) + 1,
          } as typeof c.numHomeGamesByTeam;
          const newNumAwayGamesByTeam = {
            ...c.numAwayGamesByTeam,
            [c.picked[1]]: (c.numAwayGamesByTeam[c.picked[1]] ?? 0) + 1,
          } as typeof c.numAwayGamesByTeam;

          const newSource = c.source.filter(m => m !== c.picked);

          const thisMatchday = newTarget.slice(newMatchdayIndex * matchdaySize);

          const highestHomeThisMatchday = thisMatchday
            // eslint-disable-next-line unicorn/no-array-reduce
            .reduce((prev, cur) => Math.max(prev, cur[0]), -1);

          const foo = newSource.filter(([h, a]) => {
            if (h <= highestHomeThisMatchday) {
              return false;
            }

            if (newLocationByMatchday[`${h}:${newMatchdayIndex}`]) {
              return false;
            }

            if (newLocationByMatchday[`${a}:${newMatchdayIndex}`]) {
              return false;
            }

            return true;
          });

          const uniqueHomeTeams = new Set(foo.map(m => m[0]));

          // console.log(newTarget.length);

          const candidates = [];

          const newMatchdaySize = newTarget.length % matchdaySize;

          if (newMatchdaySize + uniqueHomeTeams.size >= matchdaySize) {
            for (const newPicked of foo) {
              candidates.push({
                source: newSource,
                target: newTarget,
                picked: newPicked,
                locationByMatchday: newLocationByMatchday,
                numHomeGamesByTeam: newNumHomeGamesByTeam,
                numAwayGamesByTeam: newNumAwayGamesByTeam,
              });
            }
          }

          return candidates;
        },
      },
    );

    if (!solution) {
      console.log('sol', solution);
    }
    // console.log('sol', solution);
    return solution !== undefined;
  })!;
};

export default function* generateSchedule<T extends { id: string }>({
  matchdaySize,
  matches,
}: {
  matchdaySize: number;
  matches: readonly (readonly [T, T])[];
}) {
  const foo = matches.flat();
  const aaa = keyBy(foo, team => team.id);
  const allTeamIds = [...new Set(foo.map(team => team.id))];
  const indexByTeamId = new Map(allTeamIds.map((id, i) => [id, i] as const));

  const schedule: (readonly [number, number])[] = [];
  const remainingMatches = matches.map(
    ([h, a]) => [indexByTeamId.get(h.id)!, indexByTeamId.get(a.id)!] as const,
  );

  while (remainingMatches.length > 0) {
    const pickedMatch = getFirstSuitableMatch({
      matchdaySize,
      remainingMatches,
      schedule,
    });
    console.log('picked match schedule', pickedMatch);
    schedule.push(pickedMatch);
    remainingMatches.splice(remainingMatches.indexOf(pickedMatch), 1);

    yield [aaa[allTeamIds[0]], aaa[allTeamIds[1]]] as const;
  }
  debugger;
}
