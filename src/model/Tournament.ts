export const validTournaments = ['cl', 'el', 'ecl', 'wc', 'epl'] as const;

type Tournament = (typeof validTournaments)[number];

export const isValidTournament = (value: string): value is Tournament =>
  validTournaments.includes(value as Tournament);

export default Tournament;
