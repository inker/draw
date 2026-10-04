import type Tournament from '#model/Tournament';

export default {
  defaultTournament: 'cl',
  /**
   * Still reachable by URL, only left out of the tournament dropdown
   */
  hiddenTournaments: ['epl'] as readonly Tournament[],
} as const;
