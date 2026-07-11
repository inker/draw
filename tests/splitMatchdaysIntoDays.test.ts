import splitMatchdaysIntoDays from '../src/engine/dfs/ls/generateSchedule/splitMatchdaysIntoDays';
import { type UefaCountry } from '../src/model/types';

const team = (name: string, country: string) => ({
  name,
  country: country as UefaCountry,
});

// English clubs in popularity order (see src/data/popularity.ts).
const ENGLAND = [
  'Man United',
  'Liverpool',
  'Arsenal',
  'Man City',
  'Chelsea',
  'Tottenham',
];
// Opponents from six distinct countries, so only England forms a group.
const OPPONENT_COUNTRIES = [
  'Netherlands',
  'Belgium',
  'Scotland',
  'Denmark',
  'Switzerland',
  'Sweden',
];

const teams = [
  ...ENGLAND.map(name => team(name, 'England')),
  ...OPPONENT_COUNTRIES.map((country, i) => team(`Opponent ${i}`, country)),
];

// Each English team (indices 0-5) plays an opponent (indices 6-11).
const matchday = [
  [0, 6],
  [1, 7],
  [2, 8],
  [3, 9],
  [4, 10],
  [5, 11],
] as [number, number][];

const dayByTeam = (days: readonly (readonly (readonly [number, number])[])[]) => {
  const map = new Map<number, number>();
  days.forEach((matches, dayIndex) => {
    for (const [home, away] of matches) {
      map.set(home, dayIndex);
      map.set(away, dayIndex);
    }
  });
  return map;
};

describe('splitMatchdaysIntoDays', () => {
  it("spreads a country's top three across the three days of CL matchday 1", () => {
    const [firstMatchday] = splitMatchdaysIntoDays({
      matchdays: [matchday],
      tournament: 'cl',
      matchdaySize: 6,
      teams,
    });

    expect(firstMatchday).toHaveLength(3);
    const day = dayByTeam(firstMatchday);
    // {Man United, Liverpool, Arsenal} each on a different day
    expect(new Set([day.get(0), day.get(1), day.get(2)]).size).toBe(3);
    // {Man City, Chelsea, Tottenham} each on a different day
    expect(new Set([day.get(3), day.get(4), day.get(5)]).size).toBe(3);
  });

  it('keeps popularity pairs apart on a two-day matchday', () => {
    const split = splitMatchdaysIntoDays({
      matchdays: [matchday, matchday, matchday],
      tournament: 'cl',
      matchdaySize: 6,
      teams,
    });

    const twoDayMatchday = split[1];
    expect(twoDayMatchday).toHaveLength(2);
    const day = dayByTeam(twoDayMatchday);
    // pairs {0,1}, {2,3}, {4,5} split across the two days
    expect(day.get(0)).not.toBe(day.get(1));
    expect(day.get(2)).not.toBe(day.get(3));
    expect(day.get(4)).not.toBe(day.get(5));
  });
});
