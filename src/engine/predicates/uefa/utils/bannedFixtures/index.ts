import { getSeasonFacts } from '#data/seasonFacts';
import type Tournament from '#model/Tournament';

interface WithName {
  readonly name: string;
}

// A newline cannot occur in a club name,
// so it is safe as the separator joining the two halves of a fixture into one key.
const toKey = <A extends string, B extends string>(homeTeam: A, awayTeam: B) =>
  `${homeTeam}\n${awayTeam}` as const;

type Key = ReturnType<typeof toKey>;

export default (tournament: Tournament, season: number) => {
  const banList = getSeasonFacts(tournament, season)?.bannedFixtures ?? [];

  const banListKeys = new Set<Key>(
    banList.map(([homeTeam, awayTeam]) => toKey(homeTeam, awayTeam)),
  );

  return (homeTeam: WithName, awayTeam: WithName) =>
    banListKeys.has(toKey(homeTeam.name, awayTeam.name));
};
