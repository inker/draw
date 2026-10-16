import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import { allPossibleGroups, firstPossibleGroup } from '#engine/dfs/gs';
import getPredicate from '#engine/predicates/uefa/gs/index';
import isPairingDeadEnd from '#engine/predicates/uefa/gs/isPairingDeadEnd';
import parseGs from '#model/parsePotsData/gs';
import type GsTeam from '#model/team/GsTeam';
import createPrngGenerator from '#utils/prng/generator';
import prngShuffleAll from '#utils/prng/shuffleAll';

const DATA_DIR = join(__dirname, '..', 'src', 'data');

// what the app runs on
const COUNTER_BYTE_LENGTH = 4;

const GROUP_LETTERS = 'ABCDEFGHIJKL';

// the possible groups for every team in turn,
// with each team going into the first of them
const runDraw = async (
  tournament: 'cl' | 'el',
  season: number,
  seed: string,
) => {
  const potsData = JSON.parse(
    readFileSync(
      join(DATA_DIR, tournament, 'gs', String(season), 'pots.json'),
      'utf8',
    ),
  );
  let pots: readonly (readonly GsTeam[])[] = await prngShuffleAll({
    collections: parseGs(potsData),
    prngGenerator: createPrngGenerator({
      byteLength: COUNTER_BYTE_LENGTH,
      seed: new TextEncoder().encode(seed),
    }),
  });
  const predicate = getPredicate(season, pots.length);
  let groups: readonly (readonly GsTeam[])[] = pots[0].map(() => []);
  const steps: string[] = [];
  for (const potIndex of pots.keys()) {
    while (pots[potIndex].length > 0) {
      const [picked, ...rest] = pots[potIndex];
      pots = pots.with(potIndex, rest);
      const input = {
        pots,
        groups,
        picked,
        predicate,
        isDeadEnd: isPairingDeadEnd,
      };
      const possibleGroups = allPossibleGroups(input);
      expect(firstPossibleGroup(input)).toBe(possibleGroups[0]);
      steps.push(
        `${picked.name}: ${possibleGroups.map(i => GROUP_LETTERS[i]).join('')}`,
      );
      groups = groups.with(possibleGroups[0], [
        ...groups[possibleGroups[0]],
        picked,
      ]);
    }
  }
  return steps;
};

const getSeasons = (tournament: 'cl' | 'el') =>
  readdirSync(join(DATA_DIR, tournament, 'gs')).map(Number);

describe('gs possible groups', () => {
  const cases = [
    ...(['cl', 'el'] as const).flatMap(tournament =>
      getSeasons(tournament).flatMap(season =>
        ['0', '1'].map(seed => [tournament, season, seed] as const),
      ),
    ),
    // a pick here used to take about 3 seconds
    ['el', 2019, '9'] as const,
  ];

  it.each(cases)(
    'matches the recorded possible groups for %s %i, seed %s',
    async (tournament, season, seed) => {
      expect(await runDraw(tournament, season, seed)).toMatchSnapshot();
    },
  );
});
