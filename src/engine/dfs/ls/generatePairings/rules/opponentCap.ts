import { type OpponentCapSpec, type Rule, type RuleContext } from './types';

// Copies of the solver's helpers for playedWithPotMask.
// Sharing them through a module made the solver about 50% slower in tests,
// since calls through an import weren't inlined in its hot loops.
const homeBit = (pot: number) => 1 << (pot * 2);
const awayBit = (pot: number) => 1 << (pot * 2 + 1);

export default (
  {
    groupByTeam: groupByTeamInput,
    maxByGroup: maxByGroupInput,
  }: OpponentCapSpec,
  {
    numTeams,
    numPots,
    numTeamsPerPot,
    isPairedPotMode,
    playedWithPotMask,
    hasPlayedPair,
    awayTeamsByHomeTeamAndPot,
    homeTeamsByAwayTeamAndPot,
    canPlay,
  }: RuleContext,
): Rule => {
  const numGroups = maxByGroupInput.length;

  if (groupByTeamInput.length !== numTeams) {
    throw new Error(
      `groupByTeam has ${groupByTeamInput.length} teams rather than ${numTeams}`,
    );
  }
  // groupByTeam stores a group index in a Uint8.
  if (numGroups > 256) {
    throw new Error(
      `numGroups=${numGroups} exceeds 256: groupByTeam is a Uint8Array of group indices`,
    );
  }
  for (const group of groupByTeamInput) {
    if (!Number.isInteger(group) || group < 0 || group >= numGroups) {
      throw new Error(
        `groupByTeam contains ${group}, which is not an index into ${numGroups} groups`,
      );
    }
  }
  // roomByOpponent starts from a cap in a Uint8.
  for (const max of maxByGroupInput) {
    if (!Number.isInteger(max) || max < 0 || max > 255) {
      throw new Error(`maxByGroup contains ${max}, which is not in 0 to 255`);
    }
  }
  // openGameTeams stores a team index & numTeamsByGroup a team count,
  // both in a Uint8.
  if (numTeams > 255) {
    throw new Error(
      `numTeams=${numTeams} exceeds 255: openGameTeams & numTeamsByGroup are Uint8Arrays`,
    );
  }

  const groupByTeam = Uint8Array.from(groupByTeamInput);
  const maxByGroup = Uint8Array.from(maxByGroupInput);
  const numTeamsByGroup = new Uint8Array(numGroups);
  for (const group of groupByTeam) {
    ++numTeamsByGroup[group];
  }

  // Counts never exceed a team's games at home or away,
  // which the solver caps at 255.
  const numHomeOpponentsFromGroup = new Uint8Array(numTeams * numGroups);
  const numAwayOpponentsFromGroup = new Uint8Array(numTeams * numGroups);

  const numOpponentsFromGroup = (team: number, group: number) =>
    numHomeOpponentsFromGroup[team * numGroups + group] +
    numAwayOpponentsFromGroup[team * numGroups + group];

  const allows = (h: number, a: number) =>
    numOpponentsFromGroup(h, groupByTeam[a]) < maxByGroup[groupByTeam[a]] &&
    numOpponentsFromGroup(a, groupByTeam[h]) < maxByGroup[groupByTeam[h]];

  const apply = (h: number, a: number) => {
    ++numHomeOpponentsFromGroup[h * numGroups + groupByTeam[a]];
    ++numAwayOpponentsFromGroup[a * numGroups + groupByTeam[h]];
  };

  const undo = (h: number, a: number) => {
    --numHomeOpponentsFromGroup[h * numGroups + groupByTeam[a]];
    --numAwayOpponentsFromGroup[a * numGroups + groupByTeam[h]];
  };

  const teamsByGroup = Array.from(
    {
      length: numGroups,
    },
    () => [] as number[],
  );
  for (const [team, group] of groupByTeam.entries()) {
    teamsByGroup[group].push(team);
  }
  // a single team's slots are already covered by the solver's slot check
  const groupsWithManyTeams = [...teamsByGroup.keys()].filter(
    group => teamsByGroup[group].length > 1,
  );

  // Open games of one group's teams against one pot,
  // each with its location outside paired pot mode.
  // A team has at most 2 open games against a pot (home & away),
  // so twice the number of teams always fits.
  const openGameTeams = new Uint8Array(numTeams * 2);
  const isOpenGameHome = new Uint8Array(numTeams * 2);
  // How many more games against the group an opponent can take
  const roomByOpponent = new Uint8Array(numTeams);
  const openGamesByOpponent = Array.from(
    {
      length: numTeams,
    },
    () => [] as number[],
  );
  const isOpponentVisited = new Uint8Array(numTeams);
  let openGamePot = 0;

  const tryOpponent = (game: number, opponent: number): boolean => {
    if (isOpponentVisited[opponent]) {
      return false;
    }
    isOpponentVisited[opponent] = 1;
    const games = openGamesByOpponent[opponent];
    if (games.length < roomByOpponent[opponent]) {
      games.push(game);
      return true;
    }
    for (let k = 0; k < games.length; ++k) {
      const other = games[k];
      games[k] = game;
      if (assignOpenGame(other)) {
        return true;
      }
      games[k] = other;
    }
    return false;
  };

  const assignOpenGame = (game: number) => {
    const team = openGameTeams[game];
    if (isPairedPotMode || isOpenGameHome[game]) {
      for (const a of awayTeamsByHomeTeamAndPot[team * numPots + openGamePot]) {
        if (
          !hasPlayedPair[team * numTeams + a] &&
          canPlay(team, a) &&
          tryOpponent(game, a)
        ) {
          return true;
        }
      }
    }
    if (isPairedPotMode || !isOpenGameHome[game]) {
      for (const h of homeTeamsByAwayTeamAndPot[team * numPots + openGamePot]) {
        if (
          !hasPlayedPair[team * numTeams + h] &&
          canPlay(h, team) &&
          tryOpponent(game, h)
        ) {
          return true;
        }
      }
    }
    return false;
  };

  // A pot's teams can only take so many games from one group between them,
  // which no check of a single team or slot sees.
  // E.g. 6 English teams needing 12 games against the 6 other pot 1 teams
  // leave each of those facing exactly 2 English teams,
  // so one that has filled its slots with none is a dead end.
  const isDeadEnd = () => {
    for (const group of groupsWithManyTeams) {
      for (let pot = 0; pot < numPots; ++pot) {
        openGamePot = pot;
        let numOpenGames = 0;
        for (const team of teamsByGroup[group]) {
          const mask = playedWithPotMask[team];
          if (isPairedPotMode) {
            if (!(mask & (homeBit(pot) | awayBit(pot)))) {
              openGameTeams[numOpenGames] = team;
              ++numOpenGames;
            }
            continue;
          }
          if (!(mask & homeBit(pot))) {
            openGameTeams[numOpenGames] = team;
            isOpenGameHome[numOpenGames] = 1;
            ++numOpenGames;
          }
          if (!(mask & awayBit(pot))) {
            openGameTeams[numOpenGames] = team;
            isOpenGameHome[numOpenGames] = 0;
            ++numOpenGames;
          }
        }
        for (let i = 0; i < numTeamsPerPot; ++i) {
          const team = pot * numTeamsPerPot + i;
          roomByOpponent[team] =
            maxByGroup[group] - numOpponentsFromGroup(team, group);
          openGamesByOpponent[team].length = 0;
        }
        for (let game = 0; game < numOpenGames; ++game) {
          isOpponentVisited.fill(0);
          if (!assignOpenGame(game)) {
            return true;
          }
        }
      }
    }
    return false;
  };

  return {
    allows,
    apply,
    undo,
    isDeadEnd,
    // the bigger the group, the fewer teams can still take one of its teams
    getOpponentPriority: team => numTeamsByGroup[groupByTeam[team]],
  };
};
