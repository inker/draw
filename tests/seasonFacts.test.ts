import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import seasonFacts from '../src/data/seasonFacts';
import bannedFixtures from '../src/engine/predicates/uefa/utils/bannedFixtures';

const DATA_DIR = join(__dirname, '..', 'src', 'data');

interface RawTeam {
  name: string;
}

const potsNames = (tournament: string, season: number) => {
  const path = join(DATA_DIR, tournament, 'ls', String(season), 'pots.json');
  const pots = JSON.parse(readFileSync(path, 'utf8')) as RawTeam[][];
  return new Set(pots.flat().map(team => team.name));
};

describe('seasonFacts', () => {
  it("names only clubs that appear in that season's pots (guards against typos & renames)", () => {
    for (const {
      tournament,
      season,
      titleHolder,
      bannedFixtures: fixtures,
    } of seasonFacts) {
      const names = potsNames(tournament, season);
      for (const name of [
        ...(fixtures ?? []).flat(),
        titleHolder ?? [],
      ].flat()) {
        expect(names, `${tournament}/${season}: "${name}"`).toContain(name);
      }
    }
  });

  it('names no club containing the fixture key separator', () => {
    for (const {
      tournament,
      season,
      bannedFixtures: fixtures,
    } of seasonFacts) {
      for (const name of (fixtures ?? []).flat()) {
        expect(name, `${tournament}/${season}: "${name}"`).not.toContain('\n');
      }
    }
  });

  it('never bans the same fixture twice', () => {
    for (const {
      tournament,
      season,
      bannedFixtures: fixtures,
    } of seasonFacts) {
      const keys = (fixtures ?? []).map(fixture => fixture.join(' v '));
      expect(new Set(keys).size, `${tournament}/${season}`).toBe(keys.length);
    }
  });

  it('describes each tournament & season at most once', () => {
    const keys = seasonFacts.map(item => `${item.tournament}/${item.season}`);
    expect(new Set(keys).size).toBe(keys.length);
  });
});

describe('bannedFixtures', () => {
  it('bans the listed fixture but not its reverse', () => {
    for (const {
      tournament,
      season,
      bannedFixtures: fixtures,
    } of seasonFacts) {
      const isFixtureBanned = bannedFixtures(tournament, season);
      for (const [homeTeam, awayTeam] of fixtures ?? []) {
        const home = {
          name: homeTeam,
        };
        const away = {
          name: awayTeam,
        };
        expect(isFixtureBanned(home, away), `${homeTeam} v ${awayTeam}`).toBe(
          true,
        );
        expect(isFixtureBanned(away, home), `${awayTeam} v ${homeTeam}`).toBe(
          false,
        );
      }
    }
  });

  it('bans nothing for a season with no facts on record', () => {
    const isFixtureBanned = bannedFixtures('cl', 2025);
    const home = {
      name: 'Liverpool',
    };
    const away = {
      name: 'Real Madrid',
    };
    expect(isFixtureBanned(home, away)).toBe(false);
  });
});
