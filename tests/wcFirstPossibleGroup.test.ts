import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import firstPossibleGroup from '#engine/dfs/wc';
import parseWc from '#model/parsePotsData/wc';
import type NationalTeam from '#model/team/NationalTeam';
import type UnknownNationalTeam from '#model/team/UnknownNationalTeam';
import { type Confederation } from '#model/types';
import createPrngGenerator from '#utils/prng/generator';
import prngShuffleAll from '#utils/prng/shuffleAll';

type Team = NationalTeam | UnknownNationalTeam;

const DATA_DIR = join(__dirname, '..', 'src', 'data');

const SEASON = 2026;

// what the app runs on
const COUNTER_BYTE_LENGTH = 4;

const getConfederations = (team: Team): Iterable<Confederation> =>
  (team as UnknownNationalTeam).confederations ?? [
    (team as NationalTeam).confederation,
  ];

const loadPots = () => {
  const forcedGroupMap: Record<string, number> = {};
  const [hosts, rest] = readFileSync(join(DATA_DIR, `wc-${SEASON}.txt`), 'utf8')
    .trim()
    .split('\n\n')
    .map(block =>
      block
        .trim()
        .split('\n')
        .map(line => {
          const match = /^(.+?)\s-\sGROUP\s(\d+)$/.exec(line);
          if (!match) {
            return line;
          }
          forcedGroupMap[match[1]] = +match[2];
          return match[1];
        }),
    );
  return parseWc(hosts, rest, SEASON, forcedGroupMap);
};

const runDraw = async (seed: string) => {
  let pots: readonly (readonly Team[])[] = await prngShuffleAll({
    collections: loadPots(),
    prngGenerator: createPrngGenerator({
      byteLength: COUNTER_BYTE_LENGTH,
      seed: new TextEncoder().encode(seed),
    }),
  });
  let groups: readonly (readonly Team[])[] = pots[0].map(() => []);
  for (const team of pots[0] as readonly NationalTeam[]) {
    if (team.forcedGroupIndex !== undefined) {
      groups = groups.with(team.forcedGroupIndex, [team]);
    }
  }
  pots = pots.with(
    0,
    pots[0].filter(
      team => (team as NationalTeam).forcedGroupIndex === undefined,
    ),
  );

  for (const potIndex of pots.keys()) {
    while (pots[potIndex].length > 0) {
      const [picked, ...rest] = pots[potIndex];
      pots = pots.with(potIndex, rest);
      const groupIndex = firstPossibleGroup({
        season: SEASON,
        pots,
        groups,
        picked,
      });
      expect(groupIndex).not.toBe(-1);
      groups = groups.with(groupIndex, [...groups[groupIndex], picked]);
    }
  }
  return groups;
};

describe('wc firstPossibleGroup', () => {
  // Most of these seeds have a pick that used to take seconds or more
  const seeds = Array.from(
    {
      length: 10,
    },
    (_, i) => String(i),
  );

  it.each(seeds)('completes the 2026 draw for seed %s', async seed => {
    const groups = await runDraw(seed);

    for (const group of groups) {
      expect(group).toHaveLength(4);
      const confederations = group.flatMap(team => [
        ...getConfederations(team),
      ]);
      const numUefaTeams = confederations.filter(
        conf => conf === 'UEFA',
      ).length;
      expect(numUefaTeams).toBeGreaterThanOrEqual(1);
      expect(numUefaTeams).toBeLessThanOrEqual(2);
      const otherConfederations = confederations.filter(
        conf => conf !== 'UEFA',
      );
      expect(new Set(otherConfederations).size).toBe(
        otherConfederations.length,
      );
    }

    const quarters = [
      [4, 8, 5],
      [7, 3, 6],
      [2, 0, 11],
      [9, 1, 10],
    ];
    const quarterOf = (name: string) => {
      const groupIndex = groups.findIndex(group =>
        group.some(team => team.name === name),
      );
      return quarters.findIndex(quarter => quarter.includes(groupIndex));
    };
    const [spain, argentina, france, england] = [
      'Spain',
      'Argentina',
      'France',
      'England',
    ].map(quarterOf);
    expect(new Set([spain, argentina, france, england]).size).toBe(4);
    expect(spain >> 1).not.toBe(argentina >> 1);
    expect(france >> 1).not.toBe(england >> 1);
  });
});
