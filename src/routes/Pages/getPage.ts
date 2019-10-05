import validTournaments from './validTournaments'
import validStages from './validStages'

export default async (tournament: string, stage: string) => {
  if (!validTournaments.includes(tournament)) {
    throw new Error(`Invalid tournament: ${tournament}`)
  }

  if (!validStages.includes(stage)) {
    throw new Error(`Invalid stage: ${stage}`)
  }

  return import(`pages/${tournament}/${stage}`)
    .then(mod => mod && mod.default)
    .catch(console.error)
}
