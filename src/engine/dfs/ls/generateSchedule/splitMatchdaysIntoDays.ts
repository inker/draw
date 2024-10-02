import {
  countBy,
  difference,
  mapValues,
  orderBy,
  shuffle,
  sumBy,
} from 'lodash';

import { type UefaCountry } from '#model/types';
import type Tournament from '#model/Tournament';
import { findFirstSolution } from '#utils/backtrack';
import combine from '#utils/combine';

interface Team {
  readonly name: string;
  readonly country: UefaCountry;
}

export default ({
  matchdays,
  tournament,
  matchdaySize,
  teams,
  tvPairings,
}: {
  matchdays: readonly (readonly [number, number])[][];
  tournament: Tournament;
  matchdaySize: number;
  teams: readonly Team[];
  tvPairings: readonly (readonly [number, number])[];
}) => {
  const numMatchdays = matchdays.length;

  const numTeamsByCountry = countBy(teams, team => team.country);
  const allCountries = Object.keys(numTeamsByCountry) as UefaCountry[];

  const newMatchdays: (readonly [number, number])[][][] = [];
  for (const [matchdayIndex, md] of matchdays.entries()) {
    const shuffledMd = shuffle(md);
    const days = Array.from(
      {
        // TODO: remove this hardcode
        length:
          tournament === 'cl' && matchdayIndex === 0
            ? 3
            : matchdayIndex === numMatchdays - 1
              ? 1
              : 2,
      },
      () => [] as (readonly [number, number])[],
    );
    const numGamesPerDay = matchdaySize / days.length;

    const teamsFromCountryByDay = mapValues(numTeamsByCountry, n => {
      const quotient = Math.floor(n / days.length);
      const remainder = n % days.length;
      return remainder === 0
        ? {
            maxAllowed: quotient,
            numMaxes: days.length,
          }
        : {
            maxAllowed: quotient + 1,
            numMaxes: remainder,
          };
    }) as Record<
      UefaCountry,
      {
        maxAllowed: number;
        numMaxes: number;
      }
    >;

    let solution;
    for (
      let numEliminatedPairings = 0;
      numEliminatedPairings < tvPairings.length;
      ++numEliminatedPairings
    ) {
      for (const eliminatedTvPairings of combine(
        tvPairings.toReversed(),
        numEliminatedPairings,
      )) {
        // eslint-disable-next-line no-console
        console.log('Eliminating the following:', eliminatedTvPairings);
        const remainingTvPairings = difference(
          tvPairings,
          eliminatedTvPairings,
        );

        const getPairedTeam = new Map([
          ...remainingTvPairings,
          ...remainingTvPairings.map(
            pair => pair.toReversed() as [number, number],
          ),
        ]);

        const s = findFirstSolution(
          {
            matchIndex: 0,
            pickedDay: 0,
            schedule: [] as number[],
            numMatchesByDay: Array.from(
              {
                length: days.length,
              },
              () => 0,
            ),
            dayByTeam: {} as Record<number, number>,
            countryTeamsByDay: Object.fromEntries(
              allCountries.map(
                country => [country, days.map(() => 0)] as const,
              ),
            ) as Record<UefaCountry, number[]>,
          },
          {
            reject: c => {
              if (days.length === 1) {
                return false;
              }

              if (c.numMatchesByDay[c.pickedDay] === numGamesPerDay) {
                return true;
              }

              const match = shuffledMd[c.matchIndex];
              const [firstTeam, secondTeam] = match;
              const firstPairedTeam = getPairedTeam.get(firstTeam);
              if (
                firstPairedTeam !== undefined &&
                c.dayByTeam[firstPairedTeam] === c.pickedDay
              ) {
                return true;
              }
              const secondPairedTeam = getPairedTeam.get(secondTeam);
              if (
                secondPairedTeam !== undefined &&
                c.dayByTeam[secondPairedTeam] === c.pickedDay
              ) {
                return true;
              }

              const firstTeamCountry = teams[firstTeam].country;
              const teamsFromFirstTeamCountryData =
                teamsFromCountryByDay[firstTeamCountry];
              const firstTeamNumTeamsByDay = c.countryTeamsByDay[
                firstTeamCountry
              ].with(
                c.pickedDay,
                c.countryTeamsByDay[firstTeamCountry][c.pickedDay] + 1,
              );
              if (
                sumBy(firstTeamNumTeamsByDay, n =>
                  n >= teamsFromFirstTeamCountryData.maxAllowed ? 1 : 0,
                ) > teamsFromFirstTeamCountryData.numMaxes
              ) {
                return true;
              }

              const secondTeamCountry = teams[secondTeam].country;
              const teamsFromSecondTeamCountryData =
                teamsFromCountryByDay[secondTeamCountry];
              const secondTeamNumTeamsByDay = c.countryTeamsByDay[
                secondTeamCountry
              ].with(
                c.pickedDay,
                c.countryTeamsByDay[secondTeamCountry][c.pickedDay] + 1,
              );
              if (
                sumBy(secondTeamNumTeamsByDay, n =>
                  n >= teamsFromSecondTeamCountryData.maxAllowed ? 1 : 0,
                ) > teamsFromSecondTeamCountryData.numMaxes
              ) {
                return true;
              }

              return false;
            },

            accept: c => c.matchIndex === shuffledMd.length - 1,

            generate: c => {
              const match = shuffledMd[c.matchIndex];

              const newSchedule = [...c.schedule, c.pickedDay];

              const newNumMatchesByDay = c.numMatchesByDay.with(
                c.pickedDay,
                c.numMatchesByDay[c.pickedDay] + 1,
              );

              const newDayByTeam = {
                ...c.dayByTeam,
                [match[0]]: c.pickedDay,
                [match[1]]: c.pickedDay,
              };

              const newCountryTeamsByDay = {
                ...c.countryTeamsByDay,
                [teams[match[0]].country]: c.countryTeamsByDay[
                  teams[match[0]].country
                ].with(
                  c.pickedDay,
                  c.countryTeamsByDay[teams[match[0]].country][c.pickedDay] + 1,
                ),
                [teams[match[1]].country]: c.countryTeamsByDay[
                  teams[match[1]].country
                ].with(
                  c.pickedDay,
                  c.countryTeamsByDay[teams[match[1]].country][c.pickedDay] + 1,
                ),
              };

              const candidates: (typeof c)[] = [];
              for (let dayIndex = 0; dayIndex < days.length; ++dayIndex) {
                candidates.push({
                  matchIndex: c.matchIndex + 1,
                  pickedDay: dayIndex,
                  schedule: newSchedule,
                  numMatchesByDay: newNumMatchesByDay,
                  dayByTeam: newDayByTeam,
                  countryTeamsByDay: newCountryTeamsByDay,
                });
              }
              return orderBy(shuffle(candidates), newCandidate => {
                const [h, a] = shuffledMd[newCandidate.matchIndex];
                const numTeamsFromHomeCountry =
                  newCandidate.countryTeamsByDay[teams[h].country][
                    newCandidate.pickedDay
                  ];
                const numTeamsFromAwayCountry =
                  newCandidate.countryTeamsByDay[teams[a].country][
                    newCandidate.pickedDay
                  ];
                return (
                  (numTeamsFromHomeCountry === 0
                    ? -1000000
                    : numTeamsFromHomeCountry) +
                  (numTeamsFromAwayCountry === 0
                    ? -1000000
                    : numTeamsFromAwayCountry)
                );
              });
            },
          },
        );

        if (s) {
          if (numEliminatedPairings > 0) {
            // eslint-disable-next-line no-console
            console.log(
              `solution found after eliminating ${numEliminatedPairings} pairings in md ${matchdayIndex + 1}:`,
              eliminatedTvPairings.map(pair =>
                [teams[pair[0]].name, teams[pair[1]].name].join(' & '),
              ),
            );
          }
          solution = s;
          break;
        }

        // eslint-disable-next-line no-console
        console.warn('No solution found');
      }

      if (solution) {
        break;
      }
    }

    if (!solution) {
      throw new Error('No solution found after all');
    }

    for (const [i, dayIndex] of solution.schedule.entries()) {
      const match = shuffledMd[i];
      days[dayIndex].push(match);
    }
    days[solution.pickedDay].push(shuffledMd[solution.matchIndex]);

    newMatchdays.push(shuffle(days.map(day => shuffle(day))));
  }

  return newMatchdays;
};
