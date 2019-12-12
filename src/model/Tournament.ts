const validTournaments = [
  'cl',
  'el',
  'wc',
] as const

type Tournament = typeof validTournaments[number]

export const isValidTournament = (value: string): value is Tournament =>
  validTournaments.includes(value as Tournament)

// eslint-disable-next-line no-undef
export default Tournament
