import KnockoutTeam from 'model/team/KnockoutTeam'

const objectToKoTeam = (o: any) =>
  new KnockoutTeam(
    o.name,
    o.country,
    o.group,
    o.name,
  )

const arrayToPot = (arr: readonly any[]) =>
  arr.map(objectToKoTeam)

export default (data: readonly (readonly any[])[]) =>
  data.map(arrayToPot)
