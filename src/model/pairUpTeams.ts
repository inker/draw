import popularityRank from '#model/popularityRank';
import type GsTeam from '#model/team/GsTeam';

// Groups same-country teams into TV pairings: the two most popular clubs from a
// country are paired, then the next two, & so on, leaving an odd one out
// unpaired.
// Popularity comes from the curated list, falling back to seeding position for
// clubs that aren't listed.
export default (teams: readonly GsTeam[]) => {
  const orderedTeams = teams
    .map((team, i) => [team, popularityRank(team, i)] as const)
    .sort((a, b) => a[1] - b[1])
    .map(([team]) => team);

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
