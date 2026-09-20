import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import { chunk, orderBy } from 'lodash';

import splitMatchdaysIntoDays, {
  firstSeasonWithOpeningMatch,
} from '../src/engine/dfs/ls/generateSchedule/splitMatchdaysIntoDays';
import popularityRank from '../src/model/popularityRank';
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

// Man City holds the title, so its match opens the season from the first season with an opener on.
// It is the home team in [3, 9], which is what makes that match eligible.
const HOLDER = 3;
const TITLE_HOLDER = ENGLAND[HOLDER];

// Each English team (indices 0-5) plays an opponent (indices 6-11).
const matchday = [
  [0, 6],
  [1, 7],
  [2, 8],
  [3, 9],
  [4, 10],
  [5, 11],
] as [number, number][];

const stageDir = join(__dirname, '..', 'src', 'data', 'cl', 'ls');

const clPots = (season: number) =>
  JSON.parse(
    readFileSync(join(stageDir, String(season), 'pots.json'), 'utf8'),
  ) as {
    name: string;
    country: string;
  }[][];

const latestClPots = () =>
  clPots(
    Math.max(
      ...readdirSync(stageDir)
        .filter(name => /^\d{4}$/.test(name))
        .map(Number),
    ),
  );

// One matchday: every team plays once, never against a compatriot.
// Seeded rather than random, so a failure can be reproduced.
const buildMatchday = (
  fieldTeams: readonly ReturnType<typeof team>[],
  seed: number,
) => {
  let state = seed;
  const next = () => {
    state = (state * 1103515245 + 12345) % 2147483648;
    return state;
  };

  const unpaired = fieldTeams.map((_, i) => i);
  const matches: [number, number][] = [];
  while (unpaired.length > 0) {
    const home = unpaired.shift()!;
    const candidates = unpaired.filter(
      i => fieldTeams[i].country !== fieldTeams[home].country,
    );
    const away = candidates[next() % candidates.length];
    unpaired.splice(unpaired.indexOf(away), 1);
    matches.push([home, away]);
  }
  return matches;
};

// What the split is meant to keep apart: each country's clubs in popularity
// order, cut into tuples the size of the day count.
const popularityTuples = (
  field: readonly ReturnType<typeof team>[],
  indices: Iterable<number>,
  numDays: number,
) =>
  Map.groupBy(indices, index => field[index].country)
    .values()
    .flatMap(countryIndices =>
      chunk(
        orderBy(countryIndices, index => popularityRank(field[index], index)),
        numDays,
      ),
    )
    .filter(tuple => tuple.length > 1)
    .toArray();

const dayByTeam = (
  days: readonly (readonly (readonly [number, number])[])[],
) => {
  const map = new Map<number, number>();
  for (const [dayIndex, matches] of days.entries()) {
    for (const [home, away] of matches) {
      map.set(home, dayIndex);
      map.set(away, dayIndex);
    }
  }
  return map;
};

describe('splitMatchdaysIntoDays', () => {
  it("spreads a country's top three across the three days of CL matchday 1", () => {
    const [firstMatchday] = splitMatchdaysIntoDays({
      matchdays: [matchday],
      tournament: 'cl',
      season: firstSeasonWithOpeningMatch - 1,
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
      season: firstSeasonWithOpeningMatch - 1,
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

  it('opens CL matchday 1 with the holder alone from the first season with an opener', () => {
    const [firstMatchday] = splitMatchdaysIntoDays({
      matchdays: [matchday],
      tournament: 'cl',
      season: firstSeasonWithOpeningMatch,
      matchdaySize: 6,
      teams,
      titleHolder: TITLE_HOLDER,
    });

    // 6 matches split 1-3-2, the opener always first
    expect(firstMatchday.map(day => day.length)).toStrictEqual([1, 3, 2]);
    expect(firstMatchday[0][0][0]).toBe(HOLDER);
  });

  it('leaves the other matchdays alone from the first season with an opener', () => {
    const split = splitMatchdaysIntoDays({
      matchdays: [matchday, matchday, matchday],
      tournament: 'cl',
      season: firstSeasonWithOpeningMatch,
      matchdaySize: 6,
      teams,
      titleHolder: TITLE_HOLDER,
    });

    expect(split[1].map(day => day.length)).toStrictEqual([3, 3]);
    expect(split[2].map(day => day.length)).toStrictEqual([6]);
  });

  it('still splits matchday 1 three ways the season before', () => {
    const [firstMatchday] = splitMatchdaysIntoDays({
      matchdays: [matchday],
      tournament: 'cl',
      season: firstSeasonWithOpeningMatch - 1,
      matchdaySize: 6,
      teams,
      titleHolder: TITLE_HOLDER,
    });

    expect(firstMatchday.map(day => day.length)).toStrictEqual([2, 2, 2]);
  });

  it('refuses to schedule an opening match with no title holder', () => {
    expect(() =>
      splitMatchdaysIntoDays({
        matchdays: [matchday],
        tournament: 'cl',
        season: firstSeasonWithOpeningMatch,
        matchdaySize: 6,
        teams,
      }),
    ).toThrow('title holder');
  });

  it('refuses to schedule an opening match the holder is not hosting', () => {
    // [9, 3] rather than [3, 9]: the holder is away, which assignGamesToMatchdays
    // is meant to have ruled out before the matchday gets this far.
    const holderAway = matchday.map(match =>
      match[0] === HOLDER ? ([match[1], match[0]] as [number, number]) : match,
    );

    expect(() =>
      splitMatchdaysIntoDays({
        matchdays: [holderAway],
        tournament: 'cl',
        season: firstSeasonWithOpeningMatch,
        matchdaySize: 6,
        teams,
        titleHolder: TITLE_HOLDER,
      }),
    ).toThrow('not at home');
  });

  it("counts none of the opener's clubs towards the remaining days' spread", () => {
    // Three French clubs, the holders among them. Once they open on their own
    // day, the other two are two clubs over two days, so they cannot share one.
    // Counting all three against the two remaining days would permit 2-0.
    const frenchTeams = [
      ...['Paris SG', 'Lille', 'Lens'].map(name => team(name, 'France')),
      ...[
        'Netherlands',
        'Belgium',
        'Scotland',
        'Denmark',
        'Switzerland',
        'Sweden',
        'Portugal',
        'Greece',
        'Austria',
      ].map((country, i) => team(`Opponent ${i}`, country)),
    ];
    // The three French clubs are the home teams of the first three matches.
    const frenchMatchday = [
      [0, 3],
      [1, 4],
      [2, 5],
      [6, 9],
      [7, 10],
      [8, 11],
    ] as [number, number][];

    // run a few times: the split is randomised, the constraint must always hold
    for (let i = 0; i < 20; ++i) {
      const [firstMatchday] = splitMatchdaysIntoDays({
        matchdays: [frenchMatchday],
        tournament: 'cl',
        season: firstSeasonWithOpeningMatch,
        matchdaySize: 6,
        teams: frenchTeams,
        titleHolder: 'Paris SG',
      });

      const day = dayByTeam(firstMatchday);
      expect(day.get(0)).toBe(0);
      expect(day.get(1)).not.toBe(day.get(2));
    }
  });

  it('gives no other tournament an opening match', () => {
    const split = splitMatchdaysIntoDays({
      matchdays: [matchday, matchday, matchday],
      tournament: 'el',
      season: firstSeasonWithOpeningMatch,
      matchdaySize: 6,
      teams,
      titleHolder: TITLE_HOLDER,
    });

    expect(split[0].map(day => day.length)).toStrictEqual([3, 3]);
  });

  // The six-team fixtures above have one club per country on most days,
  // so they never stretch the popularity separation or the per-country spread.
  // A real Champions League field does, & 9 & 8 are not interchangeable sizes.
  it('splits a full-size matchday 1-9-8', () => {
    const fullSizeTeams = latestClPots()
      .flat()
      .map(club => team(club.name, club.country));

    for (const seed of [1, 2, 3, 4, 5]) {
      const [firstMatchday] = splitMatchdaysIntoDays({
        matchdays: [buildMatchday(fullSizeTeams, seed)],
        tournament: 'cl',
        season: firstSeasonWithOpeningMatch,
        matchdaySize: fullSizeTeams.length / 2,
        teams: fullSizeTeams,
        titleHolder: fullSizeTeams[0].name,
      });

      expect(
        firstMatchday.map(day => day.length),
        `seed ${seed}`,
      ).toStrictEqual([1, 9, 8]);
      expect(firstMatchday[0][0][0], `seed ${seed}`).toBe(0);
    }
  });
  // A country's clubs cover every day they can fill before any popularity
  // tuple is kept: the separation used to be given up in country order,
  // which left a two-club country sharing a day
  // so that a six-club one could keep its third tuple.
  it('spreads every country over as many days as it has clubs for', () => {
    const fullSizeTeams = latestClPots()
      .flat()
      .map(club => team(club.name, club.country));

    for (const seed of [91, 92, 93]) {
      const split = splitMatchdaysIntoDays({
        matchdays: [seed, seed + 1, seed + 2].map(matchdaySeed =>
          buildMatchday(fullSizeTeams, matchdaySeed),
        ),
        tournament: 'cl',
        season: firstSeasonWithOpeningMatch - 1,
        matchdaySize: fullSizeTeams.length / 2,
        teams: fullSizeTeams,
      });

      for (const [matchdayIndex, days] of split.entries()) {
        const day = dayByTeam(days);
        for (const [country, indices] of Map.groupBy(
          day.keys(),
          index => fullSizeTeams[index].country,
        )) {
          expect(
            new Set(indices.map(index => day.get(index))).size,
            `seed ${seed}, matchday ${matchdayIndex}, ${country}`,
          ).toBe(Math.min(indices.length, days.length));
        }
      }
    }
  });
  // The second of these matchdays cannot be split with every tuple intact,
  // so one has to go: Milan & Atalanta, & no country's spread over the days,
  // which is what used to go first.
  // Pinned to one season's field rather than the latest,
  // because how many tuples have to give is a property of this exact matchday
  // & a new season's clubs would pose a different problem.
  it('gives up a single tuple when the matchday cannot take them all', () => {
    const pinnedTeams = clPots(2024)
      .flat()
      .map(club => team(club.name, club.country));

    const [, secondMatchday] = splitMatchdaysIntoDays({
      matchdays: [7, 8, 9].map(seed => buildMatchday(pinnedTeams, seed)),
      tournament: 'cl',
      season: firstSeasonWithOpeningMatch - 1,
      matchdaySize: pinnedTeams.length / 2,
      teams: pinnedTeams,
    });

    const day = dayByTeam(secondMatchday);
    const broken = popularityTuples(
      pinnedTeams,
      day.keys(),
      secondMatchday.length,
    ).filter(
      tuple => new Set(tuple.map(index => day.get(index))).size < tuple.length,
    );

    expect(broken).toHaveLength(1);
  });
});
