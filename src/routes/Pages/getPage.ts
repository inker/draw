import Tournament, { isValidTournament } from 'model/Tournament'
import Stage, { isValidStage } from 'model/Stage'

export default async (tournament: Tournament, stage: Stage, season: number) => {
  if (!isValidTournament(tournament)) {
    throw new Error(`Invalid tournament: ${tournament}`)
  }

  if (!isValidStage(stage)) {
    throw new Error(`Invalid stage: ${stage}`)
  }

  // TODO
  const tournamentDir = (tournament === 'el' || tournament === 'ecl') && season >= 2021
    ? 'cl'
    : tournament

  return import(/* webpackChunkName: "[request]" */ `pages/${tournamentDir}/${stage}`)
    .then(mod => mod?.default)
    .catch(console.error)
}
