import type Tournament from '#model/Tournament';

interface Item {
  tournament: Tournament;
  season: number;
  /**
   * Home team first, as club names spelled the way the season's pots spell them
   */
  fixtures: readonly (readonly [string, string])[];
}

/**
 * From 2026/27 a league phase fixture cannot come up with the same home team
 * for a third season running,
 * so every pairing already drawn that way in both of the two previous seasons is listed here.
 * The reverse fixture stays legal,
 * & so does a pairing whose two previous meetings were at different grounds.
 *
 * The list has to be rebuilt by hand once the pots for a new season are known,
 * since the app stores no results & cannot work out who has hosted whom.
 */
export default [
  {
    tournament: 'cl',
    season: 2026,
    fixtures: [
      ['Liverpool', 'Real Madrid'],
      ['Internazionale', 'Arsenal'],
    ],
  },
] as const satisfies readonly Item[];
