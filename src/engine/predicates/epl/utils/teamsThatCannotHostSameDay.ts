// The solver gives each club one such partner,
// so Brentford stay out of the Chelsea & Fulham pair.
export default [
  ['Man City', 'Man United'],
  ['Liverpool', 'Everton'],
  ['Arsenal', 'Tottenham'],
  ['Chelsea', 'Fulham'],
] as const satisfies readonly (readonly [string, string])[];
