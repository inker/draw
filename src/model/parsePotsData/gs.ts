import GsTeam from '#model/team/GsTeam';
import pairUpTeams from '#model/pairUpTeams';

const objectToGsTeam = (o: any) =>
  new GsTeam(o.name, o.country, o.coeffient, o.name);

const arrayToPot = (arr: readonly any[]) => arr.map(objectToGsTeam);

export default (data: readonly (readonly any[])[]) => {
  const pots = data.map(arrayToPot);
  const teams = pots.flat(1);
  pairUpTeams(teams);
  return pots;
};
