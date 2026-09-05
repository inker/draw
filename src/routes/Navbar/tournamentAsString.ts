import type Tournament from '#model/Tournament';

const names = {
  cl: 'Champions League',
  el: 'Europa League',
  ecl: 'Europa Conference League',
  wc: 'World Cup',
} as const satisfies Record<Tournament, string>;

// UEFA dropped "Europa" from the name in the same reshuffle that brought in the league phase
const conferenceRenameSeason = 2024;

export default (tournament: Tournament, season: number) =>
  tournament === 'ecl' && season >= conferenceRenameSeason
    ? 'Conference League'
    : names[tournament];
