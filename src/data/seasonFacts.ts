import type Tournament from '#model/Tournament';

interface SeasonFacts {
  tournament: Tournament;
  season: number;
  /**
   * The club that won the tournament the season before,
   * spelled the way this season's pots spell it
   */
  titleHolder?: string;
  /**
   * Home team first,
   * each club spelled the way this season's pots spell it
   */
  bannedFixtures?: readonly (readonly [string, string])[];
}

/**
 * What a season's draw needs to know about the seasons before it.
 * The app stores no results, so none of this can be worked out & it is kept by hand,
 * a season at a time, once the pots are known.
 *
 * `titleHolder` opens the Champions League season on a day of its own from 2027/28.
 *
 * `bannedFixtures` are the pairings that cannot come up again:
 * from 2026/27 a league phase fixture cannot be repeated with the same home team
 * for a third season running.
 * The reverse fixture stays legal,
 * & so does a pairing whose two previous meetings were at different grounds.
 */
const seasonFacts = [
  {
    tournament: 'cl',
    season: 2026,
    titleHolder: 'Paris SG',
    bannedFixtures: [
      ['Liverpool', 'Real Madrid'],
      ['Internazionale', 'Arsenal'],
    ],
  },
] as const satisfies readonly SeasonFacts[];

// Annotated rather than inferred: `as const` narrows each entry to the keys it
// happens to carry, so an optional one that no entry uses yet would not typecheck.
const allSeasonFacts: readonly SeasonFacts[] = seasonFacts;

export const getSeasonFacts = (tournament: Tournament, season: number) =>
  allSeasonFacts.find(
    item => item.tournament === tournament && item.season === season,
  );

export default allSeasonFacts;
