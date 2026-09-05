import type Tournament from '#model/Tournament';
import { isValidTournament } from '#model/Tournament';
import type Stage from '#model/Stage';
import { isValidStage } from '#model/Stage';

export default async (tournament: Tournament, stage: Stage) => {
  if (!isValidTournament(tournament)) {
    throw new Error(`Invalid tournament: ${tournament}`);
  }

  if (!isValidStage(stage)) {
    throw new Error(`Invalid stage: ${stage}`);
  }

  // TODO
  const tournamentDir = tournament === 'ecl' ? 'el' : tournament;

  // Swallowing this used to leave the page blank with nothing said,
  // which is what selecting the World Cup did until the route resolver ruled it out
  const mod = await import(
    /* webpackChunkName: "[request]" */
    `../../pages/${tournamentDir}/${stage}`
  );

  return mod.default;
};
