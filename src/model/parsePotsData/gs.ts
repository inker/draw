import GsTeam from 'model/team/GsTeam'
import pairUpTeams from 'model/pairUpTeams'

const objectToGsTeam = (o: any) =>
  new GsTeam(
    o.name,
    o.country,
    o.coeffient,
    o.name,
  )

const arrayToPot = (arr: any[]) =>
  arr.map(objectToGsTeam)

export default async (data: any[][], pairings: readonly [string, string][]) => {
  const pots = data.map(arrayToPot)
  const teams = pots.flat(1)
  pairUpTeams(teams, pairings)
  return pots
}
