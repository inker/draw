import { findFirstSolutionMutable } from '#utils/backtrack';
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
}: {
  teams: readonly Team[];
  numPots: number;
  numTeamsPerPot: number;
  numMatchdays: number;
  numGamesPerMatchday: number;
  isPairedPotMode: boolean;
  allGames: readonly (readonly [number, number])[];
  allocatedMatches: readonly (readonly [number, number])[];
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
  const numOpponentCountriesByTeam = new Uint8Array(numTeams * numCountries);
  const playedWithPotMask = new Uint16Array(numTeams);
  const hasPlayedPair = new Uint8Array(numTeams * numTeams);

  let numAllocated = 0;

  const apply = ([h, a]: readonly [number, number]) => {
    const hp = potByTeam(h);
    const ap = potByTeam(a);
    ++numGamesByPotPair[hp * numPots + ap];
    ++numHomeGamesByTeam[h];
    ++numAwayGamesByTeam[a];
    ++numOpponentCountriesByTeam[h * numCountries + countryByTeam[a]];
    ++numOpponentCountriesByTeam[a * numCountries + countryByTeam[h]];
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
    --numOpponentCountriesByTeam[h * numCountries + countryByTeam[a]];
    --numOpponentCountriesByTeam[a * numCountries + countryByTeam[h]];
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

    if (numOpponentCountriesByTeam[h * numCountries + countryByTeam[a]] === 2) {
      return false;
    }

    if (numOpponentCountriesByTeam[a * numCountries + countryByTeam[h]] === 2) {
      return false;
    }

    return true;
  };

  const findMinPotPair = () => {
    for (let potPair = 0; potPair < numPots * numPots; ++potPair) {
      if (numGamesByPotPair[potPair] < maxSameLocMatchesPerPot) {
        return potPair;
      }
    }
    return -1;
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

  const getCandidates = (): readonly (readonly [number, number])[] => {
    if (hasUndersuppliedBlock() || hasUncoverableSlot()) {
      return [];
    }

    // active pot pair: first unfilled one
    const potPair = findMinPotPair();
    const homePot = Math.floor(potPair / numPots);
    const awayPot = potPair % numPots;

    // home team: hardest country to place first
    // (random tie-breaking, so restarts explore different regions)
    let homeTeam = -1;
    let homeTeamScore = -1;
    let numTies = 1;
    for (let i = 0; i < numTeamsPerPot; ++i) {
      const team = homePot * numTeamsPerPot + i;
      if (!isHomeTeamEligible(team, awayPot)) {
        continue;
      }
      const score = numTeamsByCountry[countryByTeam[team]];
      if (score > homeTeamScore) {
        homeTeam = team;
        homeTeamScore = score;
        numTies = 1;
      } else if (score === homeTeamScore) {
        ++numTies;
        if (Math.random() * numTies < 1) {
          homeTeam = team;
        }
      }
    }
    // no eligible home team makes this pot pair a dead end
    if (homeTeam === -1) {
      return [];
    }

    // The chosen team's next home game is a forced slot,
    // so branching over all its feasible opponents keeps the search complete.
    // In paired pot mode the slot spans both pots of the pair.
    const awayPots = isPairedPotMode ? [awayPot, awayPot ^ 1] : [awayPot];

    // opponents: hardest country first,
    // then the most constrained opponent, random tie-breaking
    const scoredGames: (readonly [number, number])[] = [];
    for (const pot of awayPots) {
      for (const a of awayTeamsByHomeTeamAndPot[homeTeam * numPots + pot]) {
        if (hasPlayedPair[homeTeam * numTeams + a]) {
          continue;
        }
        if (!canPlay(homeTeam, a)) {
          continue;
        }
        const numGamesPlayed = numHomeGamesByTeam[a] + numAwayGamesByTeam[a];
        const score =
          -numTeamsByCountry[countryByTeam[a]] * 100 -
          numGamesPlayed +
          Math.random() * 0.5;
        scoredGames.push([a, score]);
      }
    }
    scoredGames.sort((x, y) => x[1] - y[1]);

    return scoredGames.map(([a]) => [homeTeam, a] as const);
  };

  const options = {
    isSolved: () => numAllocated === numTotalGames,
    getCandidates,
    apply,
    undo,
  };

  // the pick preserves the caller-shuffled order of allGames:
  // a random home team of the active pot pair,
  // then its first candidate opponent whose draw can still complete
  const minPotPair = findMinPotPair();
  const firstRemainingGameFromPotPair = allGames.find(([h, a]) => {
    const potPair = potByTeam(h) * numPots + potByTeam(a);
    return (
      potPair === minPotPair &&
      !hasPlayedPair[h * numTeams + a] &&
      canPlay(h, a)
    );
  })!;

  const pickedHomeTeam = firstRemainingGameFromPotPair[0];

  // in paired pot mode the team's home game may go to either pot of the pair
  const pickedAwayPots = isPairedPotMode
    ? [minPotPair % numPots, (minPotPair % numPots) ^ 1]
    : [minPotPair % numPots];
  const candidateMatchesForPickedTeam = allGames.filter(
    ([h, a]) =>
      h === pickedHomeTeam &&
      pickedAwayPots.includes(potByTeam(a)) &&
      !hasPlayedPair[h * numTeams + a] &&
      canPlay(h, a),
  );

  return candidateMatchesForPickedTeam.find(match => {
    apply(match);
    const solved = findFirstSolutionMutable(options);
    if (!solved) {
      undo(match);
    }
    return solved;
  })!;
};
