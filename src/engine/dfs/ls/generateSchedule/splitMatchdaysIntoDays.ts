import { countBy, minBy, orderBy, pull, shuffle, sumBy } from 'lodash';

import { type UefaCountry } from '#model/types';
import type Tournament from '#model/Tournament';

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

  const allPairedTeams = new Set(tvPairings.flat());

  const numTeamsByCountry = countBy(teams, team => team.country);
  const countriesWithMultipleTeams = Object.keys(numTeamsByCountry).filter(
    c => numTeamsByCountry[c] > 1,
  ) as UefaCountry[];
  const countriesWithMultipleTeamsSet = new Set(countriesWithMultipleTeams);

  const newMatchdays: (readonly [number, number])[][][] = [];
  for (const [matchdayIndex, md] of matchdays.entries()) {
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

    // TODO: build a graph of paired teams

    for (const pair of tvPairings) {
      for (const t of shuffle(pair)) {
        const pairedT = t === pair[0] ? pair[1] : pair[0];
        const team = teams[t];
        const teamCountry = team.country;
        const match = md.find(m => m[0] === t || m[1] === t);
        if (!match) {
          // Already allocated
          continue;
        }
        const nonFullDays = days.filter(day => day.length < numGamesPerDay);
        const minDay = minBy(shuffle(nonFullDays), day =>
          sumBy(day, m =>
            m[0] === pairedT || m[1] === pairedT
              ? 1000000
              : (teams[m[0]].country === teamCountry ? 1 : 0) +
                (teams[m[1]].country === teamCountry ? 1 : 0),
          ),
        )!;
        minDay.push(match);
        pull(md, match);
      }
    }

    const remainingTeams = md.flat();
    const orderedRemainingTeams = orderBy(
      shuffle(remainingTeams),
      t => countriesWithMultipleTeamsSet.has(teams[t].country),
      'desc',
    );
    for (const t of orderedRemainingTeams) {
      const team = teams[t];
      const teamCountry = team.country;
      const match = md.find(p => p[0] === t || p[1] === t);
      if (!match) {
        // Already allocated
        continue;
      }
      const nonFullDays = days.filter(day => day.length < numGamesPerDay);
      const minDay = minBy(shuffle(nonFullDays), day =>
        sumBy(
          day,
          m =>
            (teams[m[0]].country === teamCountry ? 1 : 0) +
            (teams[m[1]].country === teamCountry ? 1 : 0),
        ),
      )!;
      minDay.push(match);
      pull(md, match);
    }

    newMatchdays.push(shuffle(days.map(day => shuffle(day))));
  }

  return newMatchdays;
};
