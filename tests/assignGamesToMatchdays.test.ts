import assignGamesToMatchdays from '#engine/dfs/ls/generateSchedule/assignGamesToMatchdays';

// Four clubs, each home once & away once, so the whole set fits into two
// matchdays of two games. The only valid split puts each club home on one
// matchday & away on the other (balanced + alternating first/last two).
const allGames = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
] as [number, number][];

// Every ordered pair, so each two clubs meet once at each end.
const doubleRoundRobin = (numTeams: number) =>
  Array.from(
    {
      length: numTeams,
    },
    (_, h) =>
      Array.from(
        {
          length: numTeams,
        },
        (__, a) => [h, a] as const,
      ).filter(([home, away]) => home !== away),
  ).flat();

describe('assignGamesToMatchdays', () => {
  it('splits a 4-club, 2-matchday fixture legally', () => {
    const result = assignGamesToMatchdays({
      matchdaySize: 2,
      allGames,
      alternatingPairs: [[0, 1]],
      bans: [],
      cannotHostSameDayPairs: [],
    });

    expect(result).toHaveLength(2);
    for (const md of result) {
      expect(md).toHaveLength(2);
    }

    // every club plays exactly once per matchday
    for (const md of result) {
      const teams = md.flatMap(([h, a]) => [h, a]).sort();
      expect(teams).toEqual([0, 1, 2, 3]);
    }

    // every club is home once & away once across the two matchdays
    for (let team = 0; team < 4; ++team) {
      const locations = result.map(md =>
        md.some(([h]) => h === team) ? 'H' : 'A',
      );
      expect(locations.sort()).toEqual(['A', 'H']);
    }
  });

  it('keeps a club banned from the away end on the first matchday at home', () => {
    // run a few times: the split is randomised, the constraint must always hold
    for (let i = 0; i < 20; ++i) {
      const result = assignGamesToMatchdays({
        matchdaySize: 2,
        allGames,
        alternatingPairs: [[0, 1]],
        bans: [
          {
            teamIndex: 2,
            matchday: 0,
            location: 'away',
          },
        ],
        cannotHostSameDayPairs: [],
      });

      expect(result[0].some(([h]) => h === 2)).toBe(true);
    }
  });

  it('keeps a club banned from hosting the final matchday away', () => {
    // run a few times: the split is randomised, the constraint must always hold
    for (let i = 0; i < 20; ++i) {
      const result = assignGamesToMatchdays({
        matchdaySize: 2,
        allGames,
        alternatingPairs: [[0, 1]],
        bans: [
          {
            teamIndex: 2,
            matchday: 1,
            location: 'home',
          },
        ],
        cannotHostSameDayPairs: [],
      });
      const finalMatchday = result.at(-1)!;
      expect(finalMatchday.some(([h]) => h === 2)).toBe(false);
    }
  });

  it('rejects bans that leave a club no valid pattern', () => {
    expect(() =>
      assignGamesToMatchdays({
        matchdaySize: 2,
        allGames,
        alternatingPairs: [[0, 1]],
        bans: [
          {
            teamIndex: 2,
            matchday: 0,
            location: 'home',
          },
          {
            teamIndex: 2,
            matchday: 1,
            location: 'home',
          },
        ],
        cannotHostSameDayPairs: [],
      }),
    ).toThrow('Bans leave team 2 with no valid home/away pattern');
  });

  it.each([
    [4, 0, 'Ban on team 4, which is not an index into 4 teams'],
    [-1, 0, 'Ban on team -1, which is not an index into 4 teams'],
    [0, 2, 'Ban on matchday 2, which is not an index into 2 matchdays'],
    [0, 0.5, 'Ban on matchday 0.5, which is not an index into 2 matchdays'],
  ])(
    'rejects a ban on team %s, matchday %s',
    (teamIndex, matchday, message) => {
      expect(() =>
        assignGamesToMatchdays({
          matchdaySize: 2,
          allGames,
          alternatingPairs: [[0, 1]],
          bans: [
            {
              teamIndex,
              matchday,
              location: 'home',
            },
          ],
          cannotHostSameDayPairs: [],
        }),
      ).toThrow(message);
    },
  );
  it('keeps the two meetings of each pair of clubs apart', () => {
    const numTeams = 6;
    const games = doubleRoundRobin(numTeams);
    for (let i = 0; i < 20; ++i) {
      const result = assignGamesToMatchdays({
        matchdaySize: numTeams / 2,
        allGames: games,
        alternatingPairs: [
          [0, 1],
          [8, 9],
        ],
        bans: [],
        cannotHostSameDayPairs: [],
        minMatchdaysBetweenMeetings: 5,
        randomSeed: i / 20,
      });

      const matchdayByPair = new Map<string, number[]>();
      for (const [md, mdGames] of result.entries()) {
        const teams = mdGames.flat().sort();
        expect(teams).toEqual([0, 1, 2, 3, 4, 5]);
        for (const [h, a] of mdGames) {
          const key = `${Math.min(h, a)}-${Math.max(h, a)}`;
          matchdayByPair.set(key, [...(matchdayByPair.get(key) ?? []), md]);
        }
      }
      for (const [first, second] of matchdayByPair.values()) {
        expect(Math.abs(first - second)).toBeGreaterThanOrEqual(5);
      }
    }
  });

  it('finds no schedule when the meetings cannot be far enough apart', () => {
    expect(() =>
      assignGamesToMatchdays({
        matchdaySize: 2,
        allGames: doubleRoundRobin(4),
        alternatingPairs: [
          [0, 1],
          [4, 5],
        ],
        bans: [],
        cannotHostSameDayPairs: [],
        minMatchdaysBetweenMeetings: 6,
      }),
    ).toThrow('No solution');
  });

  it.each([0, 1.5])(
    'rejects %s matchdays between meetings',
    minMatchdaysBetweenMeetings => {
      expect(() =>
        assignGamesToMatchdays({
          matchdaySize: 2,
          allGames,
          alternatingPairs: [[0, 1]],
          bans: [],
          cannotHostSameDayPairs: [],
          minMatchdaysBetweenMeetings,
        }),
      ).toThrow(
        `minMatchdaysBetweenMeetings=${minMatchdaysBetweenMeetings} is not a whole number of matchdays from 1`,
      );
    },
  );

  it('caps the capped games on each matchday', () => {
    const numTeams = 8;
    const topTeams = [0, 1, 2];
    const cappedGames = doubleRoundRobin(numTeams).filter(
      ([h, a]) => topTeams.includes(h) && topTeams.includes(a),
    );
    for (let i = 0; i < 20; ++i) {
      const result = assignGamesToMatchdays({
        matchdaySize: numTeams / 2,
        allGames: doubleRoundRobin(numTeams),
        alternatingPairs: [
          [0, 1],
          [12, 13],
        ],
        bans: [],
        cannotHostSameDayPairs: [],
        cappedGames,
        maxCappedGamesPerMatchday: 1,
        matchdaysWithoutCappedGames: [3],
        randomSeed: i / 20,
      });

      const numCappedGamesByMatchday = result.map(
        md =>
          md.filter(([h, a]) => topTeams.includes(h) && topTeams.includes(a))
            .length,
      );
      expect(Math.max(...numCappedGamesByMatchday)).toBe(1);
      expect(numCappedGamesByMatchday[3]).toBe(0);
    }
  });

  it('finds no schedule when the capped games cannot be spread enough', () => {
    // With every game capped, each matchday holds two of them.
    expect(() =>
      assignGamesToMatchdays({
        matchdaySize: 2,
        allGames: doubleRoundRobin(4),
        alternatingPairs: [
          [0, 1],
          [4, 5],
        ],
        bans: [],
        cannotHostSameDayPairs: [],
        cappedGames: doubleRoundRobin(4),
        maxCappedGamesPerMatchday: 1,
      }),
    ).toThrow('No solution');
  });

  it('keeps banned games off their matchday', () => {
    const numTeams = 6;
    const separated = [0, 1, 2];
    const bannedGames = doubleRoundRobin(numTeams)
      .filter(([h, a]) => separated.includes(h) && separated.includes(a))
      .map(game => ({
        matchday: 0,
        game,
      }));
    for (let i = 0; i < 20; ++i) {
      const result = assignGamesToMatchdays({
        matchdaySize: numTeams / 2,
        allGames: doubleRoundRobin(numTeams),
        alternatingPairs: [
          [0, 1],
          [8, 9],
        ],
        bans: [],
        cannotHostSameDayPairs: [],
        bannedGames,
        randomSeed: i / 20,
      });

      expect(
        result[0].some(
          ([h, a]) => separated.includes(h) && separated.includes(a),
        ),
      ).toBe(false);
    }
  });

  it('finds no schedule when the banned games leave a matchday unfillable', () => {
    // Two games of four clubs cannot keep three of them apart.
    const separated = [0, 1, 2];
    const bannedGames = doubleRoundRobin(4)
      .filter(([h, a]) => separated.includes(h) && separated.includes(a))
      .map(game => ({
        matchday: 0,
        game,
      }));
    expect(() =>
      assignGamesToMatchdays({
        matchdaySize: 2,
        allGames: doubleRoundRobin(4),
        alternatingPairs: [
          [0, 1],
          [4, 5],
        ],
        bans: [],
        cannotHostSameDayPairs: [],
        bannedGames,
      }),
    ).toThrow('No solution');
  });

  it.each([
    [0, [0, 0], 'Banned game 0-0 is not in allGames'],
    [
      2,
      [0, 1],
      'Banned game on matchday 2, which is not an index into 2 matchdays',
    ],
  ] as const)(
    'rejects a banned game on matchday %s',
    (matchday, game, message) => {
      expect(() =>
        assignGamesToMatchdays({
          matchdaySize: 2,
          allGames,
          alternatingPairs: [[0, 1]],
          bans: [],
          cannotHostSameDayPairs: [],
          bannedGames: [
            {
              matchday,
              game,
            },
          ],
        }),
      ).toThrow(message);
    },
  );

  it('rejects a capped game that is not in allGames', () => {
    expect(() =>
      assignGamesToMatchdays({
        matchdaySize: 2,
        allGames,
        alternatingPairs: [[0, 1]],
        bans: [],
        cannotHostSameDayPairs: [],
        cappedGames: [[0, 0]],
        maxCappedGamesPerMatchday: 1,
      }),
    ).toThrow('Capped game 0-0 is not in allGames');
  });
});
