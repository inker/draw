// Feasibility oracle for the league-phase home/away alternation constraints.
// A legal complete pattern across the matchdays is balanced (half home, half
// away), never has more than two of the same location in a row, & alternates
// across the first two & the last two matchdays.
//
// Each club's still-possible patterns are tracked as a bitset, so the check is
// O(numWords) & independent of the order matchdays are committed. assign &
// unassign are paired LIFO - matching the way the DFS applies & undoes moves -
// & each is O(numWords).

// A pattern is a 32-bit mask, bit md set = home, so the last matchday's home
// bit must stay below the sign bit.
const MAX_MATCHDAYS = 31;

// Every legal complete pattern, built directly by pruning as we go, so the cost
// is proportional to the number of valid patterns rather than 2 ** numMatchdays.
export function generateValidPatterns(numMatchdays: number): number[] {
  if (numMatchdays > MAX_MATCHDAYS) {
    throw new Error(
      `numMatchdays=${numMatchdays} exceeds ${MAX_MATCHDAYS}: patterns are 32-bit masks`,
    );
  }

  const half = numMatchdays / 2;
  if (!Number.isInteger(half)) {
    return [];
  }

  const patterns: number[] = [];

  // loc: 1 = home, 2 = away, 0 = no previous matchday yet
  const build = (state: {
    md: number;
    mask: number;
    numHome: number;
    prevLoc: number;
    runLen: number;
  }) => {
    const { md, mask, numHome, prevLoc, runLen } = state;
    if (md === numMatchdays) {
      patterns.push(mask);
      return;
    }

    for (const loc of [1, 2] as const) {
      const isHome = loc === 1;
      const newNumHome = numHome + (isHome ? 1 : 0);
      const newNumAway = md + 1 - newNumHome;
      // neither location may exceed half the matchdays
      if (newNumHome > half || newNumAway > half) {
        continue;
      }

      const newRunLen = loc === prevLoc ? runLen + 1 : 1;
      // no more than two of the same location in a row
      if (newRunLen > 2) {
        continue;
      }
      // the first two & the last two matchdays must alternate
      const isBoundaryPair = md === 1 || md === numMatchdays - 1;
      if (isBoundaryPair && loc === prevLoc) {
        continue;
      }

      build({
        md: md + 1,
        mask: isHome ? mask | (1 << md) : mask,
        numHome: newNumHome,
        prevLoc: loc,
        runLen: newRunLen,
      });
    }
  };

  build({
    md: 0,
    mask: 0,
    numHome: 0,
    prevLoc: 0,
    runLen: 0,
  });

  return patterns;
}

export default function createHomeAwayPatterns({
  numTeams,
  numMatchdays,
  maxAssignments,
}: {
  numTeams: number;
  numMatchdays: number;
  // upper bound on live assignments (the undo log is preallocated to this)
  maxAssignments: number;
}) {
  const patterns = generateValidPatterns(numMatchdays);
  const numPatterns = patterns.length;
  // A club's viable-pattern set is numPatterns bits, held as numWords Uint32
  // words. lastWordSeed is the all-viable value for the final (partial) word.
  const numWords = Math.max(1, Math.ceil(numPatterns / 32));
  const lastWordSeed =
    numPatterns === 0
      ? 0
      : numPatterns % 32 === 0
        ? 0xffffffff
        : (1 << (numPatterns % 32)) - 1;

  // patternsHomeAt[md] / patternsAwayAt[md]: the patterns placing the club
  // home / away on matchday md.
  const patternsHomeAt = new Uint32Array(numMatchdays * numWords);
  const patternsAwayAt = new Uint32Array(numMatchdays * numWords);
  for (let j = 0; j < numPatterns; ++j) {
    const word = j >>> 5;
    const bit = 1 << (j & 31);
    for (let md = 0; md < numMatchdays; ++md) {
      const target = (patterns[j] >> md) & 1 ? patternsHomeAt : patternsAwayAt;
      target[md * numWords + word] |= bit;
    }
  }

  const viableByTeam = new Uint32Array(numTeams * numWords);
  const seed = (team: number) => {
    const base = team * numWords;
    for (let w = 0; w < numWords; ++w) {
      viableByTeam[base + w] = w === numWords - 1 ? lastWordSeed : 0xffffffff;
    }
  };
  for (let team = 0; team < numTeams; ++team) {
    seed(team);
  }

  // Undo log: each assign saves the club's words so unassign can restore them
  // (AND isn't invertible). Paired LIFO with the DFS's apply / undo.
  const undoTeam = new Int32Array(maxAssignments);
  const undoWords = new Uint32Array(maxAssignments * numWords);
  let undoTop = 0;

  const allowedAt = (isHome: boolean) =>
    isHome ? patternsHomeAt : patternsAwayAt;

  return {
    // Would `team` keep at least one possible pattern if pinned home / away
    // on matchday `md`?
    isViable(team: number, isHome: boolean, md: number) {
      const allowed = allowedAt(isHome);
      const teamBase = team * numWords;
      const mdBase = md * numWords;
      for (let w = 0; w < numWords; ++w) {
        if ((viableByTeam[teamBase + w] & allowed[mdBase + w]) !== 0) {
          return true;
        }
      }
      return false;
    },

    // Pin `team` home / away on `md`, narrowing its possible patterns.
    assign(team: number, isHome: boolean, md: number) {
      const allowed = allowedAt(isHome);
      const teamBase = team * numWords;
      const mdBase = md * numWords;
      const undoBase = undoTop * numWords;
      undoTeam[undoTop] = team;
      for (let w = 0; w < numWords; ++w) {
        undoWords[undoBase + w] = viableByTeam[teamBase + w];
        viableByTeam[teamBase + w] &= allowed[mdBase + w];
      }
      ++undoTop;
    },

    // Undo the most recent assign.
    unassign() {
      --undoTop;
      const team = undoTeam[undoTop];
      const teamBase = team * numWords;
      const undoBase = undoTop * numWords;
      for (let w = 0; w < numWords; ++w) {
        viableByTeam[teamBase + w] = undoWords[undoBase + w];
      }
    },
  };
}
