import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import popularity from '../src/data/popularity';
import GsTeam from '../src/model/team/GsTeam';
import pairUpTeams from '../src/model/pairUpTeams';

const DATA_DIR = join(__dirname, '..', 'src', 'data');

interface RawTeam {
  name: string;
  country: string;
  coeffient?: number;
}

// Every pots.json that goes through the group-stage parser (i.e. gets paired).
const potsFiles = () => {
  const files: {
    id: string;
    path: string;
  }[] = [];
  for (const tournament of ['cl', 'el', 'ecl']) {
    for (const stage of ['gs', 'ls']) {
      const stageDir = join(DATA_DIR, tournament, stage);
      let seasons: string[];
      try {
        seasons = readdirSync(stageDir);
      } catch {
        continue;
      }
      for (const season of seasons) {
        files.push({
          id: `${tournament}/${stage}/${season}`,
          path: join(stageDir, season, 'pots.json'),
        });
      }
    }
  }
  return files;
};

const derivePairings = (path: string) => {
  const pots = JSON.parse(readFileSync(path, 'utf8')) as RawTeam[][];
  const teams = pots
    .flat()
    .map(o => new GsTeam(o.name, o.country as never, o.coeffient ?? 0, o.name));
  pairUpTeams(teams);

  const seen = new Set<GsTeam>();
  const pairs: string[] = [];
  for (const team of teams) {
    const partner = team.pairing;
    if (partner && !seen.has(team) && !seen.has(partner)) {
      pairs.push([team.name, partner.name].sort().join(' & '));
      seen.add(team);
      seen.add(partner);
    }
  }
  return {
    teams,
    pairs: pairs.sort(),
  };
};

describe('pairUpTeams', () => {
  const files = potsFiles();

  it('only ever pairs teams from the same country', () => {
    for (const { id, path } of files) {
      const { teams } = derivePairings(path);
      for (const team of teams) {
        if (team.pairing) {
          expect(
            team.country,
            `${id}: ${team.name} paired with ${team.pairing.name}`,
          ).toBe(team.pairing.country);
        }
      }
    }
  });

  it('lists only clubs that appear in the pots (guards against typos & renames)', () => {
    const knownNames = new Set<string>();
    for (const { path } of files) {
      const pots = JSON.parse(readFileSync(path, 'utf8')) as RawTeam[][];
      for (const team of pots.flat()) {
        knownNames.add(team.name);
      }
    }
    for (const [country, names] of Object.entries(popularity)) {
      for (const name of names ?? []) {
        expect(knownNames, `${country}: "${name}"`).toContain(name);
      }
    }
  });

  it('derives stable pairings for every season', () => {
    const bySeason = Object.fromEntries(
      files.map(({ id, path }) => [id, derivePairings(path).pairs] as const),
    );
    expect(bySeason).toMatchSnapshot();
  });
});
