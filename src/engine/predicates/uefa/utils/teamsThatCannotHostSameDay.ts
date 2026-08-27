export default [
  ['Internazionale', 'Milan'],
  ['Roma', 'Lazio'],
  ['APOEL', 'Omonia'],
  ['Benfica', 'Sporting CP'],
  ['Real Madrid', 'Atlético'],
  ['Man City', 'Man United'],
  ['Fenerbahçe', 'Galatasaray'],
  ['København', 'Nordsjælland'],
] as const satisfies readonly (readonly [string, string])[];
