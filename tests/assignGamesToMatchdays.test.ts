import assignGamesToMatchdays from '../src/engine/dfs/ls/generateSchedule/assignGamesToMatchdays';

// Four clubs, each home once & away once, so the whole set fits into two
// matchdays of two games. The only valid split puts each club home on one
// matchday & away on the other (balanced + alternating first/last two).
const allGames = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
] as [number, number][];

describe('assignGamesToMatchdays', () => {
  it('splits a 4-club, 2-matchday fixture legally', () => {
    const result = assignGamesToMatchdays({
      matchdaySize: 2,
      allGames,
      coldTeamIndices: [],
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

  it('keeps a cold club away on the final matchday', () => {
    // run a few times: the split is randomised, the constraint must always hold
    for (let i = 0; i < 20; ++i) {
      const result = assignGamesToMatchdays({
        matchdaySize: 2,
        allGames,
        coldTeamIndices: [2],
        cannotHostSameDayPairs: [],
      });
      const finalMatchday = result.at(-1)!;
      expect(finalMatchday.some(([h]) => h === 2)).toBe(false);
    }
  });
});
