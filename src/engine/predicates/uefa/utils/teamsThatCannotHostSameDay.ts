export default [
  ["Internazionale", "Milan"],
  ["Roma", "Lazio"],
  ["APOEL", "Omonia"],
  ["Benfica", "Sporting CP"],
  ["Real Madrid", "Atlético"],
  ["Man City", "Man United"],
  ["Fenerbahçe", "Galatasaray"],
  ["København", "Nordsjælland"],
  ["Arsenal", "Tottenham"],
  ["Sevilla", "Betis"],
] as const satisfies readonly (readonly [string, string])[];
