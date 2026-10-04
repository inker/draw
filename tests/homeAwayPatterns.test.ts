import createHomeAwayPatterns, {
  type Ban,
} from '#engine/dfs/ls/generateSchedule/homeAwayPatterns';

type Pair = readonly [number, number];

const uefaPairs = (numMatchdays: number): Pair[] => [
  [0, 1],
  [numMatchdays - 2, numMatchdays - 1],
];

// Independent oracle: every H/A string that is balanced,
// has no more than two of a location in a row
// & alternates across each pair.
const oracle = (
  numMatchdays: number,
  pairs: readonly Pair[] = uefaPairs(numMatchdays),
  banFourInFive = false,
) => {
  const result: string[][] = [];
  for (let i = 0; i < 2 ** numMatchdays; ++i) {
    const chars = Array.from(
      {
        length: numMatchdays,
      },
      (_, md) => ((i >> md) & 1 ? 'H' : 'A'),
    );
    const s = chars.join('');
    const numHome = chars.filter(c => c === 'H').length;
    const isValid =
      numHome === numMatchdays / 2 &&
      pairs.every(([a, b]) => chars[a] !== chars[b]) &&
      !s.includes('HHH') &&
      !s.includes('AAA') &&
      !(
        banFourInFive &&
        Array.from(
          {
            length: numMatchdays - 4,
          },
          (_, md) => chars.slice(md, md + 5).filter(c => c === 'H').length,
        ).some(numHomeInFive => numHomeInFive < 2 || numHomeInFive > 3)
      );
    if (isValid) {
      result.push(chars);
    }
  }
  return result;
};

const anyFits = (
  patterns: readonly (readonly string[])[],
  isAllowed: (c: string, md: number) => boolean,
) => patterns.some(p => p.every(isAllowed));

/**
 * https://oeis.org/A078678, indexed by half the matchday count.
 * An outside count rather than a second copy of the rules,
 * & it reaches the lengths the brute-force oracle is too slow for.
 */
const A078678 = [
  1, 2, 4, 8, 18, 42, 100, 242, 592, 1460, 3624, 9042, 22656,
] as const satisfies readonly number[];

// Seeded, so a failure reproduces.
const mulberry32 = (seed: number) => {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const createClub = (
  numMatchdays: number,
  bans: Iterable<Ban> = [],
  alternatingPairs: readonly Pair[] = uefaPairs(numMatchdays),
  banFourInFive = false,
) =>
  createHomeAwayPatterns({
    numTeams: 1,
    numMatchdays,
    maxAssignments: numMatchdays,
    alternatingPairs,
    bans,
    banFourInFive,
  });

// The legal patterns the tracker lets a matchday-by-matchday walk reach.
const countPatterns = (
  numMatchdays: number,
  alternatingPairs: readonly Pair[] = uefaPairs(numMatchdays),
  banFourInFive = false,
) => {
  const club = createClub(numMatchdays, [], alternatingPairs, banFourInFive);
  let count = 0;
  const visit = (md: number) => {
    if (md === numMatchdays) {
      ++count;
      return;
    }
    for (const isHome of [true, false]) {
      if (club.isViable(0, isHome, md)) {
        club.assign(0, isHome, md);
        visit(md + 1);
        club.unassign();
      }
    }
  };
  visit(0);
  return count;
};

describe('homeAwayPatterns', () => {
  for (let numMatchdays = 2; numMatchdays <= 24; numMatchdays += 2) {
    it(`reaches A078678 patterns for ${numMatchdays} matchdays`, () => {
      expect(countPatterns(numMatchdays)).toBe(A078678[numMatchdays / 2]);
    });
  }

  it('reaches every pattern the brute-force definition allows', () => {
    for (const numMatchdays of [2, 4, 6, 8, 10]) {
      expect(countPatterns(numMatchdays)).toBe(oracle(numMatchdays).length);
    }
  });

  it.each([
    ['the first two & last two', uefaPairs, false],
    ['the first two & last two, no four in five', uefaPairs, true],
    [
      'a Boxing Day pair too',
      (numMatchdays: number): Pair[] => [
        ...uefaPairs(numMatchdays),
        [numMatchdays / 2 - 1, numMatchdays / 2],
      ],
      false,
    ],
    [
      'a Boxing Day & New Year pair two apart',
      (numMatchdays: number): Pair[] => [
        ...uefaPairs(numMatchdays),
        ...(numMatchdays >= 4
          ? [[numMatchdays / 2 - 1, numMatchdays / 2 + 1] as const]
          : []),
      ],
      false,
    ],
    [
      'a Boxing Day & New Year pair two apart, no four in five',
      (numMatchdays: number): Pair[] => [
        ...uefaPairs(numMatchdays),
        ...(numMatchdays >= 4
          ? [[numMatchdays / 2 - 1, numMatchdays / 2 + 1] as const]
          : []),
      ],
      true,
    ],
    ['no pairs', (): Pair[] => [], false],
    ['no pairs, no four in five', (): Pair[] => [], true],
  ])(
    'matches the brute-force definition under random bans & pins, alternating %s',
    (_, pairsFor, banFourInFive) => {
      const rand = mulberry32(1);
      for (const numMatchdays of [2, 4, 6, 8, 10, 12, 14]) {
        const pairs = pairsFor(numMatchdays);
        const patterns = oracle(numMatchdays, pairs, banFourInFive);
        for (let trial = 0; trial < 200; ++trial) {
          // 'H', 'A' or '.' for open, per matchday
          const banned = Array.from(
            {
              length: numMatchdays,
            },
            () => (rand() < 0.15 ? (rand() < 0.5 ? 'H' : 'A') : '.'),
          );
          const bans: Ban[] = banned.flatMap((c, matchday) =>
            c === '.'
              ? []
              : [
                  {
                    teamIndex: 0,
                    matchday,
                    location: c === 'H' ? 'home' : 'away',
                  },
                ],
          );
          const pinned = banned.map(c =>
            c === '.' && rand() < 0.3 ? (rand() < 0.5 ? 'H' : 'A') : '.',
          );
          if (!anyFits(patterns, (c, md) => c !== banned[md])) {
            expect(() =>
              createClub(numMatchdays, bans, pairs, banFourInFive),
            ).toThrow('Bans leave team 0 with no valid home/away pattern');
            continue;
          }
          const club = createClub(numMatchdays, bans, pairs, banFourInFive);
          for (const [md, c] of pinned.entries()) {
            if (c !== '.') {
              club.assign(0, c === 'H', md);
            }
          }
          for (let md = 0; md < numMatchdays; ++md) {
            if (pinned[md] !== '.') {
              continue;
            }
            for (const candidate of ['H', 'A']) {
              expect(club.isViable(0, candidate === 'H', md)).toBe(
                anyFits(
                  patterns,
                  (c, other) =>
                    c !== banned[other] &&
                    (pinned[other] === '.' || c === pinned[other]) &&
                    (other !== md || c === candidate),
                ),
              );
            }
          }
        }
      }
    },
  );

  it('counts the patterns with a Boxing Day pair', () => {
    for (const numMatchdays of [4, 6, 8, 10, 12]) {
      const pairs: Pair[] = [
        ...uefaPairs(numMatchdays),
        [numMatchdays / 2 - 1, numMatchdays / 2],
      ];
      expect(countPatterns(numMatchdays, pairs)).toBe(
        oracle(numMatchdays, pairs).length,
      );
    }
  });

  it.each([
    ['the first two & last two', uefaPairs],
    ['no pairs', (): Pair[] => []],
  ])(
    'counts the patterns with no four in five, alternating %s',
    (_, pairsFor) => {
      for (let numMatchdays = 2; numMatchdays <= 16; numMatchdays += 2) {
        const pairs = pairsFor(numMatchdays);
        expect(countPatterns(numMatchdays, pairs, true)).toBe(
          oracle(numMatchdays, pairs, true).length,
        );
      }
    },
  );

  it('counts the patterns with a Boxing Day & New Year pair two apart', () => {
    for (const numMatchdays of [4, 6, 8, 10, 12]) {
      const pairs: Pair[] = [
        ...uefaPairs(numMatchdays),
        [numMatchdays / 2 - 1, numMatchdays / 2 + 1],
      ];
      expect(countPatterns(numMatchdays, pairs)).toBe(
        oracle(numMatchdays, pairs).length,
      );
    }
  });

  it.each([
    [
      [0, 3] as const,
      'Alternating pair [0, 3] is not one or two matchdays apart',
    ],
    [
      [2, 2] as const,
      'Alternating pair [2, 2] is not one or two matchdays apart',
    ],
    [[7, 8] as const, 'Alternating pair [7, 8] is not within 8 matchdays'],
    [[-1, 0] as const, 'Alternating pair [-1, 0] is not within 8 matchdays'],
  ])('rejects the alternating pair %j', (pair, message) => {
    expect(() => createClub(8, [], [pair])).toThrow(message);
  });

  it('reopens a matchday on unassign', () => {
    const club = createClub(8);
    club.assign(0, true, 2);
    club.assign(0, true, 3);
    expect(club.isViable(0, true, 4)).toBe(false);
    club.unassign();
    expect(club.isViable(0, true, 4)).toBe(true);
  });

  it.each([
    ['consecutive', 0],
    ['two apart', 1],
  ])(
    'finds the pairs every pattern alternates, Boxing Day pair %s',
    (_, gap) => {
      for (const numMatchdays of [4, 6, 8, 10]) {
        const pairs: Pair[] = [
          ...uefaPairs(numMatchdays),
          [numMatchdays / 2 - 1, numMatchdays / 2 + gap],
        ];
        const patterns = oracle(numMatchdays, pairs);
        const club = createClub(numMatchdays, [], pairs);
        for (let i = 0; i < numMatchdays; ++i) {
          for (let j = i + 1; j < numMatchdays; ++j) {
            expect(club.mustAlternate(i, j)).toBe(
              patterns.every(p => p[i] !== p[j]),
            );
          }
        }
      }
    },
  );

  it('allows nothing when the matchday count is odd (cannot be balanced)', () => {
    const club = createClub(3);
    for (let md = 0; md < 3; ++md) {
      expect(club.isViable(0, true, md)).toBe(false);
      expect(club.isViable(0, false, md)).toBe(false);
    }
  });

  it('handles 62 matchdays & refuses 64', () => {
    const club = createClub(62);
    for (let md = 0; md < 62; ++md) {
      const isHome = md % 2 === 0;
      expect(club.isViable(0, isHome, md)).toBe(true);
      club.assign(0, isHome, md);
    }
    expect(() => createClub(64)).toThrow('numMatchdays=64 exceeds 62');
  });
});
