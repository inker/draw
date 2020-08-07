import KnockoutTeam from 'model/team/KnockoutTeam'

const objectToKoTeam = (o: any) =>
  new KnockoutTeam(
    o.name,
    o.country,
    o.group,
    o.name,
  )

const arrayToPot = (arr: any[]) =>
  arr.map(objectToKoTeam)

export default async (data: any[][]) =>
  data.map(arrayToPot)
