import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import countries from '#data/countries';
import popularity from '#data/popularity';
import { type Confederation } from '#model/types';
import bigSix from '#engine/predicates/epl/utils/bigSix';
import promoted from '#engine/predicates/epl/utils/promoted';
import teamsThatCannotHostSameDay from '#engine/predicates/epl/utils/teamsThatCannotHostSameDay';
import { firstSeasonUnderRoofByClub } from '#engine/predicates/uefa/utils/coldCountries/index';

const DATA_DIR = join(__dirname, '..', 'src', 'data');

interface RawTeam {
  name: string;
  country: string;
}

const potsFiles = readdirSync(DATA_DIR, {
  recursive: true,
  encoding: 'utf8',
}).filter(path => path.endsWith('pots.json'));

const teamsByFile = new Map(
  potsFiles.map(path => [
    path,
    (
      JSON.parse(readFileSync(join(DATA_DIR, path), 'utf8')) as RawTeam[][]
    ).flat(),
  ]),
);

const countriesByClub = new Map<string, Set<string>>();
for (const teams of teamsByFile.values()) {
  for (const team of teams) {
    const clubCountries = countriesByClub.get(team.name) ?? new Set();
    clubCountries.add(team.country);
    countriesByClub.set(team.name, clubCountries);
  }
}

const clubNames = new Set(countriesByClub.keys());

const uefaCountries = new Set(
  Object.entries(countries)
    .filter(([, country]) => country.confederation === 'UEFA')
    .map(([name]) => name),
);

const confederations = new Set<string>([
  'UEFA',
  'CONMEBOL',
  'CONCACAF',
  'CAF',
  'AFC',
  'OFC',
] satisfies Confederation[]);

// Folds the accents, case & punctuation that a misspelling tends to get wrong,
// so "Atlético" & "Atletico" come out the same.
const normalize = (name: string) =>
  name
    .normalize('NFD')
    .replaceAll(/\p{M}/gu, '')
    .toLowerCase()
    .replaceAll(/[^\p{L}\p{N}]/gu, '');

describe('pots data', () => {
  it('gives every club a UEFA country', () => {
    for (const [path, teams] of teamsByFile) {
      for (const team of teams) {
        expect(uefaCountries, `${path}: ${team.name}`).toContain(team.country);
      }
    }
  });

  it('gives each club the same country in every file', () => {
    for (const [name, clubCountries] of countriesByClub) {
      expect([...clubCountries], `countries of ${name}`).toHaveLength(1);
    }
  });

  it('spells each club one way', () => {
    const spellingsByKey = Map.groupBy(clubNames, normalize);
    for (const spellings of spellingsByKey.values()) {
      expect(spellings).toHaveLength(1);
    }
  });
});

describe('club names in code', () => {
  it('names only clubs in the newest Premier League season', () => {
    const newestSeason = Math.max(
      ...readdirSync(join(DATA_DIR, 'epl', 'ls')).map(Number),
    );
    const names = new Set(
      teamsByFile
        .get(join('epl', 'ls', String(newestSeason), 'pots.json'))!
        .map(team => team.name),
    );
    for (const name of [
      ...bigSix,
      ...promoted,
      ...teamsThatCannotHostSameDay.flat(),
    ]) {
      expect(names, `${newestSeason}: ${name}`).toContain(name);
    }
  });

  it('lists each club in popularity under its own country', () => {
    for (const [country, names] of Object.entries(popularity)) {
      for (const name of names) {
        expect(
          [...(countriesByClub.get(name) ?? [])],
          `${country}: ${name}`,
        ).toContain(country);
      }
    }
  });

  it('names only known clubs among those with a roof', () => {
    for (const name of firstSeasonUnderRoofByClub.keys()) {
      expect(clubNames, `roofed club ${name}`).toContain(name);
    }
  });
});

describe('World Cup data', () => {
  const wcFiles = readdirSync(DATA_DIR).filter(path =>
    /^wc-\d{4}\.txt$/.test(path),
  );

  it('names only countries or confederation placeholders', () => {
    for (const path of wcFiles) {
      const lines = readFileSync(join(DATA_DIR, path), 'utf8')
        .split('\n')
        .map(line => line.trim().replace(/\s-\sGROUP\s\d+$/, ''))
        .filter(Boolean);
      for (const line of lines) {
        const isPlaceholder = line
          .split('/')
          .every(part => confederations.has(part));
        expect(line in countries || isPlaceholder, `${path}: ${line}`).toBe(
          true,
        );
      }
    }
  });
});
