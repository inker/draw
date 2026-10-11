import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import getFirstSuitableMatch from '#engine/dfs/ls/generatePairings/getFirstSuitableMatch';
import {
  type Rule,
  type RuleSpec,
  combineRules,
} from '#engine/dfs/ls/generatePairings/rules/index';

interface RawTeam {
  name: string;
  country: string;
}

type Match = readonly [number, number];

const loadDraw = (tournament: 'cl' | 'ecl') => {
  const pots: RawTeam[][] = JSON.parse(
    readFileSync(
      join(
        __dirname,
        '..',
        'src',
        'data',
        tournament,
        'ls',
        '2025',
        'pots.json',
      ),
      'utf8',
    ),
  );
  const teams = pots.flat();
  const numPots = pots.length;
  // the Conference League draws one opponent per pot,
  // with one home & one away game against each pair of pots
  const isPairedPotMode = tournament === 'ecl';
  const countries = [...new Set(teams.map(team => team.country))];
  return {
    numPots,
    numTeamsPerPot: pots[0].length,
    numTeams: teams.length,
    numMatchdays: isPairedPotMode ? numPots : numPots * 2,
    isPairedPotMode,
    countries,
    countryByTeam: teams.map(team => countries.indexOf(team.country)),
    allGames: teams.flatMap((home, h) =>
      teams.flatMap((away, a) =>
        home.country === away.country ? [] : [[h, a] as const],
      ),
    ),
  };
};

type Draw = ReturnType<typeof loadDraw>;

const cl = loadDraw('cl');
const ecl = loadDraw('ecl');

const makeCountryCap = (
  draw: Draw,
  maxByGroup: readonly number[],
): RuleSpec => ({
  kind: 'opponentCap',
  groupByTeam: draw.countryByTeam,
  maxByGroup,
});

const isAgainstPot =
  (draw: Draw, team: number, pot: number) =>
  ([h, a]: Match, isHome: boolean) =>
    isHome
      ? h === team && Math.floor(a / draw.numTeamsPerPot) === pot
      : a === team && Math.floor(h / draw.numTeamsPerPot) === pot;

// draws every team's slots in team order, the way the real draw goes
const drawTeamByTeam = (draw: Draw, rules: readonly RuleSpec[]) => {
  const drawnMatches: Match[] = [];
  // a paired pot mode slot takes a game at either location
  const locations = draw.isPairedPotMode ? [true] : [true, false];
  for (let team = 0; team < draw.numTeams; ++team) {
    for (let opponentPot = 0; opponentPot < draw.numPots; ++opponentPot) {
      for (const isHome of locations) {
        const isFilled = drawnMatches.some(match =>
          draw.isPairedPotMode
            ? isAgainstPot(draw, team, opponentPot)(match, true) ||
              isAgainstPot(draw, team, opponentPot)(match, false)
            : isAgainstPot(draw, team, opponentPot)(match, isHome),
        );
        if (isFilled) {
          continue;
        }
        drawnMatches.push(
          getFirstSuitableMatch({
            rules,
            numPots: draw.numPots,
            numTeamsPerPot: draw.numTeamsPerPot,
            numMatchdays: draw.numMatchdays,
            numGamesPerMatchday: draw.numTeams / 2,
            isPairedPotMode: draw.isPairedPotMode,
            allGames: draw.allGames,
            allocatedMatches: drawnMatches,
            slot: {
              team,
              opponentPot,
              isHome,
            },
          }),
        );
      }
    }
  }
  return drawnMatches;
};

const expectFullDraw = (draw: Draw, drawnMatches: readonly Match[]) => {
  const pairs = new Set(
    drawnMatches.map(([h, a]) => `${Math.min(h, a)}-${Math.max(h, a)}`),
  );
  expect(pairs.size).toBe(drawnMatches.length);
  const countGames = (team: number, pot: number, isHome: boolean) =>
    drawnMatches.filter(match => isAgainstPot(draw, team, pot)(match, isHome))
      .length;
  for (let team = 0; team < draw.numTeams; ++team) {
    if (!draw.isPairedPotMode) {
      for (let pot = 0; pot < draw.numPots; ++pot) {
        expect([
          countGames(team, pot, true),
          countGames(team, pot, false),
        ]).toEqual([1, 1]);
      }
      continue;
    }
    for (let pot = 0; pot < draw.numPots; pot += 2) {
      const numHome = [
        countGames(team, pot, true),
        countGames(team, pot + 1, true),
      ];
      const numAway = [
        countGames(team, pot, false),
        countGames(team, pot + 1, false),
      ];
      expect([
        numHome[0] + numAway[0],
        numHome[1] + numAway[1],
        numHome[0] + numHome[1],
        numAway[0] + numAway[1],
      ]).toEqual([1, 1, 1, 1]);
    }
  }
};

const getMaxOpponentsByCountry = (
  draw: Draw,
  drawnMatches: readonly Match[],
) => {
  const maxByCountry = draw.countries.map(() => 0);
  for (let team = 0; team < draw.numTeams; ++team) {
    const counts = draw.countries.map(() => 0);
    for (const [h, a] of drawnMatches) {
      if (h === team || a === team) {
        ++counts[draw.countryByTeam[h === team ? a : h]];
      }
    }
    for (const [country, count] of counts.entries()) {
      maxByCountry[country] = Math.max(maxByCountry[country], count);
    }
  }
  return maxByCountry;
};

describe('getFirstSuitableMatch rules', () => {
  it('should cap opponents from one country at 2', () => {
    const drawnMatches = drawTeamByTeam(cl, [
      makeCountryCap(
        cl,
        cl.countries.map(() => 2),
      ),
    ]);
    expect(drawnMatches).toHaveLength((cl.numTeams * cl.numMatchdays) / 2);
    expectFullDraw(cl, drawnMatches);
    for (const max of getMaxOpponentsByCountry(cl, drawnMatches)) {
      expect(max).toBeLessThanOrEqual(2);
    }
  });

  it('should apply a different cap for each country', () => {
    // 1 for countries with 1 or 2 teams,
    // a cap that a draw under the usual cap of 2 breaks
    const maxByGroup = cl.countries.map((_, country) =>
      cl.countryByTeam.filter(c => c === country).length > 2 ? 2 : 1,
    );
    const drawnMatches = drawTeamByTeam(cl, [makeCountryCap(cl, maxByGroup)]);
    expect(drawnMatches).toHaveLength((cl.numTeams * cl.numMatchdays) / 2);
    expectFullDraw(cl, drawnMatches);
    for (const [country, max] of getMaxOpponentsByCountry(
      cl,
      drawnMatches,
    ).entries()) {
      expect(max).toBeLessThanOrEqual(maxByGroup[country]);
    }
  });

  it('should cap opponents from one country in paired pot mode', () => {
    const drawnMatches = drawTeamByTeam(ecl, [
      makeCountryCap(
        ecl,
        ecl.countries.map(() => 2),
      ),
    ]);
    expect(drawnMatches).toHaveLength((ecl.numTeams * ecl.numMatchdays) / 2);
    expectFullDraw(ecl, drawnMatches);
    for (const max of getMaxOpponentsByCountry(ecl, drawnMatches)) {
      expect(max).toBeLessThanOrEqual(2);
    }
  });

  it('should complete a draw with no rules', () => {
    const drawnMatches = drawTeamByTeam(cl, []);
    expect(drawnMatches).toHaveLength((cl.numTeams * cl.numMatchdays) / 2);
    expectFullDraw(cl, drawnMatches);
  });

  it('should reject a spec that does not fit the teams', () => {
    expect(() =>
      drawTeamByTeam(cl, [
        {
          kind: 'opponentCap',
          groupByTeam: cl.countryByTeam.slice(1),
          maxByGroup: cl.countries.map(() => 2),
        },
      ]),
    ).toThrow('groupByTeam has 35 teams rather than 36');
  });
});
const makeStubRule = (isAllowed: boolean, priority: number) => {
  const calls: string[] = [];
  const rule: Rule = {
    allows: () => isAllowed,
    apply: (h, a) => {
      calls.push(`apply ${h}-${a}`);
    },
    undo: (h, a) => {
      calls.push(`undo ${h}-${a}`);
    },
    isDeadEnd: () => !isAllowed,
    getOpponentPriority: () => priority,
  };
  return {
    rule,
    calls,
  };
};

describe('combineRules', () => {
  it('should allow everything with no rules', () => {
    const rule = combineRules([]);
    expect(rule.allows(0, 1)).toBe(true);
    expect(rule.isDeadEnd()).toBe(false);
    expect(rule.getOpponentPriority(0)).toBe(0);
  });

  it('should return a single rule as it is', () => {
    const { rule } = makeStubRule(true, 1);
    expect(combineRules([rule])).toBe(rule);
  });

  it('should allow a game only when every rule does', () => {
    const lenient = makeStubRule(true, 1);
    const strict = makeStubRule(false, 2);
    const rule = combineRules([lenient.rule, strict.rule]);
    expect(rule.allows(0, 1)).toBe(false);
    expect(rule.isDeadEnd()).toBe(true);
    expect(rule.getOpponentPriority(0)).toBe(3);
    expect(combineRules([lenient.rule, lenient.rule]).allows(0, 1)).toBe(true);
  });

  it('should pass every game on to every rule', () => {
    const first = makeStubRule(true, 0);
    const second = makeStubRule(true, 0);
    const rule = combineRules([first.rule, second.rule]);
    rule.apply(0, 1);
    rule.undo(0, 1);
    expect(first.calls).toEqual(['apply 0-1', 'undo 0-1']);
    expect(second.calls).toEqual(['apply 0-1', 'undo 0-1']);
  });
});
