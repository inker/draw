import getFillOrder from '#engine/dfs/ls/generateSchedule/getFillOrder';
import createHomeAwayPatterns, {
  type Ban,
} from '#engine/dfs/ls/generateSchedule/homeAwayPatterns';

const numTeams = 36;

const fillOrderFor = (numMatchdays: number, bans: Iterable<Ban>) =>
  getFillOrder({
    numTeams,
    numMatchdays,
    bans,
    homeAwayPatterns: createHomeAwayPatterns({
      numTeams,
      numMatchdays,
      maxAssignments: 0,
      bans,
    }),
  });

const coldBans = (matchday: number, count: number): Ban[] =>
  Array.from(
    {
      length: count,
    },
    (_, teamIndex) => ({
      teamIndex,
      matchday,
      location: 'home',
    }),
  );

const holderBan: Ban = {
  teamIndex: 35,
  matchday: 0,
  location: 'away',
};

describe('getFillOrder', () => {
  it('fills the cold clubs pair, then the opening pair, then the rest', () => {
    expect(fillOrderFor(8, [...coldBans(7, 3), holderBan])).toEqual([
      7, 6, 0, 1, 2, 3, 4, 5,
    ]);
  });

  it('treats every pair as tight when the patterns force it', () => {
    expect(fillOrderFor(6, coldBans(5, 3))).toEqual([5, 4, 0, 1, 2, 3]);
  });

  it('moves the opening pair to the front when the cold matchdays come first', () => {
    expect(fillOrderFor(8, coldBans(0, 3))).toEqual([0, 1, 6, 7, 5, 4, 3, 2]);
  });

  it('puts a banned matchday ahead of the other free ones', () => {
    expect(
      fillOrderFor(8, [
        {
          teamIndex: 0,
          matchday: 4,
          location: 'home',
        },
      ]),
    ).toEqual([0, 1, 6, 7, 4, 5, 3, 2]);
  });

  it('spreads the free matchdays outward from the last pair filled', () => {
    expect(fillOrderFor(8, [])).toEqual([0, 1, 6, 7, 5, 4, 3, 2]);
  });
});
