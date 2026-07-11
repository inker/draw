import popularity from '#data/popularity';
import type GsTeam from '#model/team/GsTeam';

// Teams missing from the popularity list sort after every listed team,
// keeping their relative seeding order.
const UNLISTED_BASE = 1e6;

// Groups same-country teams into TV pairings: the two most popular clubs from a
// country are paired, then the next two, & so on, leaving an odd one out
// unpaired.
// Popularity comes from the curated list, falling back to seeding position for
// clubs that aren't listed.
export default (teams: readonly GsTeam[]) => {
  const seedingByTeam = new Map(teams.map((team, i) => [team, i] as const));

  const popularityRank = (team: GsTeam) => {
    const order = popularity[team.country];
    const index = order?.indexOf(team.name) ?? -1;
    return index >= 0 ? index : UNLISTED_BASE + seedingByTeam.get(team)!;
  };

  const orderedTeams = teams
    .slice()
    .sort((a, b) => popularityRank(a) - popularityRank(b));

  const len = orderedTeams.length;
  for (let i = 0; i < len - 1; ++i) {
    const team = orderedTeams[i];
    if (team.pairing) {
      continue;
    }
    for (let j = i + 1; j < len; ++j) {
      const other = orderedTeams[j];
      if (other.pairing || team.country !== other.country) {
        continue;
      }
      team.pairing = other;
      other.pairing = team;
      break;
    }
  }
};
