import { findFirstSolutionMutable } from '#utils/backtrack';
import lowDiscrepancySequence from '#utils/lowDiscrepancySequence';
import { type Country } from '#model/types';

interface Team {
  readonly country: Country;
}

// bit pot * 2 = has played the pot at home, bit pot * 2 + 1 = away
const homeBit = (pot: number) => 1 << (pot * 2);
const awayBit = (pot: number) => 1 << (pot * 2 + 1);

export default ({
  teams,
  numPots,
  numTeamsPerPot,
  numMatchdays,
  numGamesPerMatchday,
  isPairedPotMode,
  allGames,
  allocatedMatches,
  randomSeed = 0,
  slot,
}: {
  teams: readonly Team[];
  numPots: number;
  numTeamsPerPot: number;
  numMatchdays: number;
  numGamesPerMatchday: number;
  isPairedPotMode: boolean;
  allGames: readonly (readonly [number, number])[];
  allocatedMatches: Iterable<readonly [number, number]>;
  /**
   * Where in [0, 1) this solver's tie-breaking sequence starts
   */
  randomSeed?: number;
  /**
   * The picked team's game to draw: at home or away against a pot,
   * where the location only counts outside paired pot mode
   */
  slot: {
    team: number;
    opponentPot: number;
    isHome: boolean;
  };
}) => {
  const numTeams = teams.length;
  const numTotalGames = numMatchdays * numGamesPerMatchday;
  const maxGamesAtHome = Math.ceil(numMatchdays / 2);
  const maxSameLocMatchesPerPot = isPairedPotMode
    ? numTeamsPerPot / 2
    : numTeamsPerPot;

  const potByTeam = (team: number) => Math.floor(team / numTeamsPerPot);

  const countryIndices = new Map<Country, number>();
  for (const team of teams) {
    if (!countryIndices.has(team.country)) {
      countryIndices.set(team.country, countryIndices.size);
    }
  }
  const numCountries = countryIndices.size;

  // The fixed-width typed arrays below cap the input dimensions.
  // playedWithPotMask packs two bits per pot (home & away) into a Uint16,
  // so a 9th pot would shift into bit 16 & silently truncate to 0.
  if (numPots * 2 > 16) {
    throw new Error(
      `numPots=${numPots} exceeds 8: playedWithPotMask is a 16-bit mask with 2 bits per pot`,
    );
  }
  // countryByTeam stores a country index in a Uint8.
  if (numCountries > 256) {
    throw new Error(
      `numCountries=${numCountries} exceeds 256: countryByTeam is a Uint8Array of country indices`,
    );
  }
  // numGamesByPotPair counts up to maxSameLocMatchesPerPot & the per-team
  // home/away counters up to maxGamesAtHome, all Uint8.
  if (maxSameLocMatchesPerPot > 255 || maxGamesAtHome > 255) {
    throw new Error(
      `Uint8 counters overflow: maxSameLocMatchesPerPot=${maxSameLocMatchesPerPot}, maxGamesAtHome=${maxGamesAtHome}`,
    );
  }

  const countryByTeam = new Uint8Array(numTeams);
  for (const [i, team] of teams.entries()) {
    countryByTeam[i] = countryIndices.get(team.country)!;
  }
  const numTeamsByCountry = new Uint8Array(numCountries);
  for (const country of countryByTeam) {
    ++numTeamsByCountry[country];
  }

  /**
   * away teams by home team & away pot,
   * in the caller-shuffled order of allGames
   */
  const awayTeamsByHomeTeamAndPot = Array.from(
    {
      length: numTeams * numPots,
    },
    () => [] as number[],
  );
  const homeTeamsByAwayTeamAndPot = Array.from(
    {
      length: numTeams * numPots,
    },
    () => [] as number[],
  );
  for (const [h, a] of allGames) {
    awayTeamsByHomeTeamAndPot[h * numPots + potByTeam(a)].push(a);
    homeTeamsByAwayTeamAndPot[a * numPots + potByTeam(h)].push(h);
  }

  const numGamesByPotPair = new Uint8Array(numPots * numPots);
  const numHomeGamesByTeam = new Uint8Array(numTeams);
  const numAwayGamesByTeam = new Uint8Array(numTeams);
  const numHomeOpponentsFromCountry = new Uint8Array(numTeams * numCountries);
  const numAwayOpponentsFromCountry = new Uint8Array(numTeams * numCountries);
  const playedWithPotMask = new Uint16Array(numTeams);
  const hasPlayedPair = new Uint8Array(numTeams * numTeams);

  let numAllocated = 0;

  const apply = ([h, a]: readonly [number, number]) => {
    const hp = potByTeam(h);
    const ap = potByTeam(a);
    ++numGamesByPotPair[hp * numPots + ap];
    ++numHomeGamesByTeam[h];
    ++numAwayGamesByTeam[a];
    ++numHomeOpponentsFromCountry[h * numCountries + countryByTeam[a]];
    ++numAwayOpponentsFromCountry[a * numCountries + countryByTeam[h]];
    playedWithPotMask[h] |= homeBit(ap);
    playedWithPotMask[a] |= awayBit(hp);
    hasPlayedPair[h * numTeams + a] = 1;
    hasPlayedPair[a * numTeams + h] = 1;
    ++numAllocated;
  };

  const undo = ([h, a]: readonly [number, number]) => {
    const hp = potByTeam(h);
    const ap = potByTeam(a);
    --numGamesByPotPair[hp * numPots + ap];
    --numHomeGamesByTeam[h];
    --numAwayGamesByTeam[a];
    --numHomeOpponentsFromCountry[h * numCountries + countryByTeam[a]];
    --numAwayOpponentsFromCountry[a * numCountries + countryByTeam[h]];
    playedWithPotMask[h] &= ~homeBit(ap);
    playedWithPotMask[a] &= ~awayBit(hp);
    hasPlayedPair[h * numTeams + a] = 0;
    hasPlayedPair[a * numTeams + h] = 0;
    --numAllocated;
  };

  for (const m of allocatedMatches) {
    apply(m);
  }

  const canPlay = (h: number, a: number) => {
    // Ensure the teams play same number of games at home & away
    if (numHomeGamesByTeam[h] === maxGamesAtHome) {
      return false;
    }
    if (numAwayGamesByTeam[a] === maxGamesAtHome) {
      return false;
    }

    const hp = potByTeam(h);
    const ap = potByTeam(a);

    if (numGamesByPotPair[hp * numPots + ap] === maxSameLocMatchesPerPot) {
      return false;
    }

    if (playedWithPotMask[h] & homeBit(ap)) {
      return false;
    }

    if (isPairedPotMode) {
      if (playedWithPotMask[h] & awayBit(ap)) {
        return false;
      }

      if (playedWithPotMask[h] & homeBit(ap ^ 1)) {
        return false;
      }
    }

    if (playedWithPotMask[a] & awayBit(hp)) {
      return false;
    }

    if (isPairedPotMode) {
      if (playedWithPotMask[a] & homeBit(hp)) {
        return false;
      }

      if (playedWithPotMask[a] & awayBit(hp ^ 1)) {
        return false;
      }
    }

    if (
      numHomeOpponentsFromCountry[h * numCountries + countryByTeam[a]] +
        numAwayOpponentsFromCountry[h * numCountries + countryByTeam[a]] ===
      2
    ) {
      return false;
    }

    if (
      numHomeOpponentsFromCountry[a * numCountries + countryByTeam[h]] +
        numAwayOpponentsFromCountry[a * numCountries + countryByTeam[h]] ===
      2
    ) {
      return false;
    }

    return true;
  };

  const isHomeTeamEligible = (team: number, awayPot: number) => {
    const mask = playedWithPotMask[team];
    if (mask & homeBit(awayPot)) {
      return false;
    }
    if (isPairedPotMode) {
      if (mask & awayBit(awayPot)) {
        return false;
      }
      if (mask & homeBit(awayPot ^ 1)) {
        return false;
      }
    }
    return true;
  };

  const isAwayTeamEligible = (team: number, homePot: number) => {
    const mask = playedWithPotMask[team];
    if (mask & awayBit(homePot)) {
      return false;
    }
    if (isPairedPotMode) {
      if (mask & homeBit(homePot)) {
        return false;
      }
      if (mask & awayBit(homePot ^ 1)) {
        return false;
      }
    }
    return true;
  };

  const countEligibleTeams = (
    pot: number,
    isEligible: (team: number) => boolean,
  ) => {
    let count = 0;
    for (let i = 0; i < numTeamsPerPot; ++i) {
      if (isEligible(pot * numTeamsPerPot + i)) {
        ++count;
      }
    }
    return count;
  };

  // a block needing more games than it has eligible teams is a dead end
  const hasUndersuppliedBlock = () => {
    for (let hp = 0; hp < numPots; ++hp) {
      for (let ap = 0; ap < numPots; ++ap) {
        const needed =
          maxSameLocMatchesPerPot - numGamesByPotPair[hp * numPots + ap];
        if (needed === 0) {
          continue;
        }
        if (countEligibleTeams(hp, t => isHomeTeamEligible(t, ap)) < needed) {
          return true;
        }
        if (countEligibleTeams(ap, t => isAwayTeamEligible(t, hp)) < needed) {
          return true;
        }
      }
    }

    if (isPairedPotMode) {
      // a team supplies one home game per away-pot pair,
      // so the demand of the two sibling blocks is joint
      for (let hp = 0; hp < numPots; ++hp) {
        for (let ap = 0; ap < numPots; ap += 2) {
          const needed =
            2 * maxSameLocMatchesPerPot -
            numGamesByPotPair[hp * numPots + ap] -
            numGamesByPotPair[hp * numPots + ap + 1];
          if (needed === 0) {
            continue;
          }
          const numSuppliers = countEligibleTeams(
            hp,
            t => isHomeTeamEligible(t, ap) || isHomeTeamEligible(t, ap + 1),
          );
          if (numSuppliers < needed) {
            return true;
          }
        }
      }

      // & one away game per home-pot pair
      for (let ap = 0; ap < numPots; ++ap) {
        for (let hp = 0; hp < numPots; hp += 2) {
          const needed =
            2 * maxSameLocMatchesPerPot -
            numGamesByPotPair[hp * numPots + ap] -
            numGamesByPotPair[(hp + 1) * numPots + ap];
          if (needed === 0) {
            continue;
          }
          const numSuppliers = countEligibleTeams(
            ap,
            t => isAwayTeamEligible(t, hp) || isAwayTeamEligible(t, hp + 1),
          );
          if (numSuppliers < needed) {
            return true;
          }
        }
      }
    }

    return false;
  };

  const hasFeasibleHomeGame = (team: number, pot: number) => {
    for (const a of awayTeamsByHomeTeamAndPot[team * numPots + pot]) {
      if (!hasPlayedPair[team * numTeams + a] && canPlay(team, a)) {
        return true;
      }
    }
    return false;
  };

  const hasFeasibleAwayGame = (team: number, pot: number) => {
    for (const h of homeTeamsByAwayTeamAndPot[team * numPots + pot]) {
      if (!hasPlayedPair[team * numTeams + h] && canPlay(h, team)) {
        return true;
      }
    }
    return false;
  };

  // a team with an unfilled slot no remaining game can fill is a dead end
  const hasUncoverableSlot = () => {
    for (let team = 0; team < numTeams; ++team) {
      const mask = playedWithPotMask[team];
      if (isPairedPotMode) {
        for (let pot = 0; pot < numPots; pot += 2) {
          const hasPlayedHome = mask & (homeBit(pot) | homeBit(pot + 1));
          const hasPlayedAway = mask & (awayBit(pot) | awayBit(pot + 1));
          if (!hasPlayedHome && !hasPlayedAway) {
            // an untouched pot pair needs a jointly feasible orientation
            const isCoverable =
              (hasFeasibleHomeGame(team, pot) &&
                hasFeasibleAwayGame(team, pot + 1)) ||
              (hasFeasibleHomeGame(team, pot + 1) &&
                hasFeasibleAwayGame(team, pot));
            if (!isCoverable) {
              return true;
            }
          } else {
            // reject narrows a half-played pair to the right pot
            if (
              !hasPlayedHome &&
              !hasFeasibleHomeGame(team, pot) &&
              !hasFeasibleHomeGame(team, pot + 1)
            ) {
              return true;
            }
            if (
              !hasPlayedAway &&
              !hasFeasibleAwayGame(team, pot) &&
              !hasFeasibleAwayGame(team, pot + 1)
            ) {
              return true;
            }
          }
        }
      } else {
        for (let pot = 0; pot < numPots; ++pot) {
          if (!(mask & homeBit(pot)) && !hasFeasibleHomeGame(team, pot)) {
            return true;
          }
          if (!(mask & awayBit(pot)) && !hasFeasibleAwayGame(team, pot)) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const teamsByCountry = Array.from(
    {
      length: numCountries,
    },
    () => [] as number[],
  );
  for (const [team, country] of countryByTeam.entries()) {
    teamsByCountry[country].push(team);
  }
  // a single team's slots are already covered by hasUncoverableSlot
  const countriesWithManyTeams = [...teamsByCountry.keys()].filter(
    country => teamsByCountry[country].length > 1,
  );

  // Open games of one country's teams against one pot,
  // each with its location outside paired pot mode.
  // A team has at most 2 open games against a pot (home & away),
  // so twice the number of teams always fits.
  // Team indices fit in Uint8, since a league phase has 36 teams.
  const openGameTeams = new Uint8Array(numTeams * 2);
  const isOpenGameHome = new Uint8Array(numTeams * 2);
  // How many more games against the country an opponent can take: 0 to 2
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

  // A pot's teams can only take so many games from one country between them,
  // which no check of a single team or slot sees.
  // E.g. 6 English teams needing 12 games against the 6 other pot 1 teams
  // leave each of those facing exactly 2 English teams,
  // so one that has filled its slots with none is a dead end.
  const hasOverbookedCountry = () => {
    for (const country of countriesWithManyTeams) {
      for (let pot = 0; pot < numPots; ++pot) {
        openGamePot = pot;
        let numOpenGames = 0;
        for (const team of teamsByCountry[country]) {
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
            2 -
            numHomeOpponentsFromCountry[team * numCountries + country] -
            numAwayOpponentsFromCountry[team * numCountries + country];
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

  // in paired pot mode a slot spans both pots of a pair
  const numPotsPerSlot = isPairedPotMode ? 2 : 1;

  const getSlotBits = (firstPot: number, isHome: boolean) => {
    let bits = 0;
    for (let pot = firstPot; pot < firstPot + numPotsPerSlot; ++pot) {
      bits |= isHome ? homeBit(pot) : awayBit(pot);
    }
    return bits;
  };

  const countSlotOpponents = (
    team: number,
    firstPot: number,
    isHome: boolean,
  ) => {
    let count = 0;
    for (let pot = firstPot; pot < firstPot + numPotsPerSlot; ++pot) {
      if (isHome) {
        for (const a of awayTeamsByHomeTeamAndPot[team * numPots + pot]) {
          if (!hasPlayedPair[team * numTeams + a] && canPlay(team, a)) {
            ++count;
          }
        }
      } else {
        for (const h of homeTeamsByAwayTeamAndPot[team * numPots + pot]) {
          if (!hasPlayedPair[team * numTeams + h] && canPlay(h, team)) {
            ++count;
          }
        }
      }
    }
    return count;
  };

  const nextRandom = lowDiscrepancySequence(randomSeed);

  const getCandidates = (): readonly (readonly [number, number])[] => {
    if (
      hasUndersuppliedBlock() ||
      hasUncoverableSlot() ||
      hasOverbookedCountry()
    ) {
      return [];
    }

    // slot: a team's home or away game against a pot,
    // the one with the fewest feasible opponents first,
    // so a dead end turns up near the top of the tree
    // ties broken off the seeded sequence,
    // which carries on across restarts so each one explores a new region
    let slotTeam = -1;
    let slotPot = -1;
    let isSlotHome = true;
    let numSlotOpponents = Infinity;
    let numTies = 1;
    for (let team = 0; team < numTeams; ++team) {
      for (let pot = 0; pot < numPots; pot += numPotsPerSlot) {
        for (const isHome of [true, false]) {
          if (playedWithPotMask[team] & getSlotBits(pot, isHome)) {
            continue;
          }
          const numOpponents = countSlotOpponents(team, pot, isHome);
          if (numOpponents < numSlotOpponents) {
            slotTeam = team;
            slotPot = pot;
            isSlotHome = isHome;
            numSlotOpponents = numOpponents;
            numTies = 1;
          } else if (numOpponents === numSlotOpponents) {
            ++numTies;
            if (nextRandom() * numTies < 1) {
              slotTeam = team;
              slotPot = pot;
              isSlotHome = isHome;
            }
          }
        }
      }
    }

    // The chosen slot has to be filled,
    // so branching over all its feasible opponents keeps the search complete.

    // opponents: hardest country first,
    // then the most constrained opponent, ties broken the same way
    const scoredGames: (readonly [number, number])[] = [];
    for (let pot = slotPot; pot < slotPot + numPotsPerSlot; ++pot) {
      const opponents = isSlotHome
        ? awayTeamsByHomeTeamAndPot[slotTeam * numPots + pot]
        : homeTeamsByAwayTeamAndPot[slotTeam * numPots + pot];
      for (const o of opponents) {
        if (hasPlayedPair[slotTeam * numTeams + o]) {
          continue;
        }
        if (!(isSlotHome ? canPlay(slotTeam, o) : canPlay(o, slotTeam))) {
          continue;
        }
        const numGamesPlayed = numHomeGamesByTeam[o] + numAwayGamesByTeam[o];
        const score =
          -numTeamsByCountry[countryByTeam[o]] * 100 -
          numGamesPlayed +
          nextRandom() * 0.5;
        scoredGames.push([o, score]);
      }
    }
    scoredGames.sort((x, y) => x[1] - y[1]);

    return scoredGames.map(([o]) =>
      isSlotHome ? ([slotTeam, o] as const) : ([o, slotTeam] as const),
    );
  };

  const options = {
    isSolved: () => numAllocated === numTotalGames,
    getCandidates,
    apply,
    undo,
  };

  // the pick preserves the caller-shuffled order of allGames:
  // the first game that fills the slot & leaves a draw that can still complete
  const candidateMatchesForSlot = allGames.filter(([h, a]) => {
    if (hasPlayedPair[h * numTeams + a] || !canPlay(h, a)) {
      return false;
    }
    // in paired pot mode the team may play either at home or away
    const isHome = isPairedPotMode ? h === slot.team : slot.isHome;
    return isHome
      ? h === slot.team && potByTeam(a) === slot.opponentPot
      : a === slot.team && potByTeam(h) === slot.opponentPot;
  });

  return candidateMatchesForSlot.find(match => {
    apply(match);
    const solved = findFirstSolutionMutable(options);
    if (!solved) {
      undo(match);
    }
    return solved;
  })!;
};
