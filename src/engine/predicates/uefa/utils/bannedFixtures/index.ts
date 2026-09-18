import { stubFalse } from 'lodash';

import type Tournament from '#model/Tournament';

import constraints from './constraints';

interface WithName {
  readonly name: string;
}

// A newline cannot occur in a club name,
// so it is safe as the separator joining the two halves of a fixture into one key.
const toKey = <A extends string, B extends string>(homeTeam: A, awayTeam: B) =>
  `${homeTeam}\n${awayTeam}` as const;

type Key = ReturnType<typeof toKey>;

export default (tournament: Tournament, season: number) => {
  const fixtures = constraints.find(
    item => item.tournament === tournament && item.season === season,
  )?.fixtures;

  if (!fixtures) {
    return stubFalse;
  }

  const bannedFixtures = new Set<Key>(
    fixtures.map(([homeTeam, awayTeam]) => toKey(homeTeam, awayTeam)),
  );

  return (homeTeam: WithName, awayTeam: WithName) =>
    bannedFixtures.has(toKey(homeTeam.name, awayTeam.name));
};
