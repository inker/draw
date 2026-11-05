/**
 * Never given up, since one stadium can't hold two games on a day
 * & the split into days doesn't keep these apart
 */
export const teamsSharingStadium = [
  ["Internazionale", "Milan"],
  ["Roma", "Lazio"],
  ["APOEL", "Omonia"],
] as const satisfies readonly (readonly [string, string])[];

/**
 * Closest first, by the distance between the two stadiums,
 * since the schedule gives up the pairs at the end first
 * when a draw leaves no way to keep them all apart.
 */
export const teamsNearby = [
  ["Benfica", "Sporting CP"],
  ["Sevilla", "Betis"],
  ["Arsenal", "Tottenham"],
  ["Man City", "Man United"],
  ["Real Madrid", "Atlético"],
  ["Fenerbahçe", "Galatasaray"],
  ["København", "Nordsjælland"],
] as const satisfies readonly (readonly [string, string])[];

export default [
  ...teamsSharingStadium,
  ...teamsNearby,
] as const satisfies readonly (readonly [string, string])[];
