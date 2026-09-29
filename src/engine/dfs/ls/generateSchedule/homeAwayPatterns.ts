// Feasibility oracle for the league-phase home/away alternation constraints.
// A legal complete pattern across the matchdays is balanced (half home,
// half away), never has more than two of the same location in a row,
// and alternates across each given pair of consecutive matchdays
// (for UEFA, the first two & the last two).
//
// Each check walks the matchdays in order,
// carrying the home counts reachable so far as bits of one word
// per (last location, run length),
// so it is exact, works in any fill order & stores only each club's open locations.
// Enumerating the legal patterns as a bitset instead was about 1.7x faster
// at 8 matchdays but grew by about 1.6x per matchday,
// needing gigabytes at 38 matchdays.
// See "Alternatives to the bitset" in docs/schedule-solver-scaling.md.

const HOME = 1;
const AWAY = 2;

// Home counts from 0 to half the matchdays are the bits of a 32-bit word.
const MAX_MATCHDAYS = 62;

/**
 * A location a club cannot take on a matchday,
 * such as a cold club hosting in midwinter
 */
export interface Ban {
  readonly teamIndex: number;
  readonly matchday: number;
  readonly location: 'home' | 'away';
}

export default function createHomeAwayPatterns({
  numTeams,
  numMatchdays,
  maxAssignments,
  alternatingPairs,
  bans = [],
}: {
  numTeams: number;
  numMatchdays: number;
  // upper bound on live assignments (the undo log is preallocated to this)
  maxAssignments: number;
  /**
   * Consecutive matchdays on which every club has to take opposite locations,
   * such as Boxing Day & New Year's Day
   */
  alternatingPairs: Iterable<readonly [number, number]>;
  bans?: Iterable<Ban>;
}) {
  if (numMatchdays > MAX_MATCHDAYS) {
    throw new Error(
      `numMatchdays=${numMatchdays} exceeds ${MAX_MATCHDAYS}: home counts are bits of a 32-bit word`,
    );
  }

  const half = numMatchdays / 2;
  // An odd season cannot be balanced,
  // so every check fails rather than rounding the target.
  const isBalanceable = Number.isInteger(half);

  // Whether a club may repeat the previous matchday's location here.
  const canRepeat = new Uint8Array(numMatchdays).fill(1);
  for (const [mdA, mdB] of alternatingPairs) {
    const earlier = Math.min(mdA, mdB);
    const later = Math.max(mdA, mdB);
    if (!Number.isInteger(earlier) || earlier < 0 || later >= numMatchdays) {
      throw new RangeError(
        `Alternating pair [${mdA}, ${mdB}] is not within ${numMatchdays} matchdays`,
      );
    }
    // The check only carries the previous matchday's location forward,
    // so a pair further apart would need it to remember more.
    if (later - earlier !== 1) {
      throw new RangeError(
        `Alternating pair [${mdA}, ${mdB}] is not two consecutive matchdays`,
      );
    }
    canRepeat[later] = 0;
  }

  // The home counts that leave both locations within half the season
  // after each matchday, as a bit mask.
  const validHomeCounts = new Int32Array(numMatchdays);
  for (let md = 0; md < numMatchdays; ++md) {
    const minHome = Math.max(0, md + 1 - Math.floor(half));
    const maxHome = Math.min(md + 1, Math.floor(half));
    for (let numHome = minHome; numHome <= maxHome; ++numHome) {
      validHomeCounts[md] |= 1 << numHome;
    }
  }

  // Can a complete legal pattern fit the open locations
  // at openLocations[base] onwards?
  const fits = (openLocations: Uint8Array, base: number) => {
    if (!isBalanceable) {
      return false;
    }
    // Bit h of each word: some legal start of the season has h home games
    // & ends on one or two homes (home1, home2) or one or two aways (away1, away2).
    let home1 = 0;
    let home2 = 0;
    let away1 = 0;
    let away2 = 0;
    let start = 1;
    for (let i = 0; i < numMatchdays; ++i) {
      const open = openLocations[base + i];
      const repeat = canRepeat[i];
      const valid = validHomeCounts[i];
      const fromAway = start | away1 | away2;
      const fromHome = start | home1 | home2;
      const nextHome1 = open & HOME ? fromAway << 1 : 0;
      const nextHome2 = open & HOME && repeat ? home1 << 1 : 0;
      const nextAway1 = open & AWAY ? fromHome : 0;
      const nextAway2 = open & AWAY && repeat ? away1 : 0;
      home1 = nextHome1 & valid;
      home2 = nextHome2 & valid;
      away1 = nextAway1 & valid;
      away2 = nextAway2 & valid;
      start = 0;
      if ((home1 | home2 | away1 | away2) === 0) {
        return false;
      }
    }
    return (((home1 | home2 | away1 | away2) >>> half) & 1) === 1;
  };

  // The locations each club can still take on each matchday,
  // as HOME | AWAY bits, with bans already applied.
  const unpinned = new Uint8Array(numTeams * numMatchdays).fill(HOME | AWAY);
  // A ban only narrows the starting locations rather than going through assign,
  // so it is never undone & needs no room in the undo log.
  for (const { teamIndex, matchday, location } of bans) {
    if (
      !Number.isInteger(teamIndex) ||
      teamIndex < 0 ||
      teamIndex >= numTeams
    ) {
      throw new RangeError(
        `Ban on team ${teamIndex}, which is not an index into ${numTeams} teams`,
      );
    }
    if (
      !Number.isInteger(matchday) ||
      matchday < 0 ||
      matchday >= numMatchdays
    ) {
      throw new RangeError(
        `Ban on matchday ${matchday}, which is not an index into ${numMatchdays} matchdays`,
      );
    }
    const index = teamIndex * numMatchdays + matchday;
    unpinned[index] &= location === 'home' ? AWAY : HOME;
    // Caught here, since the search would only report it as a failed schedule
    // after every worker had timed out.
    if (!fits(unpinned, teamIndex * numMatchdays)) {
      throw new Error(
        `Bans leave team ${teamIndex} with no valid home/away pattern`,
      );
    }
  }
  const locations = unpinned.slice();

  // Undo log: each assign saves which cell it pinned,
  // & unassign reopens it to what the bans left.
  // Paired LIFO with the DFS's apply / undo.
  const undoIndices = new Int32Array(maxAssignments);
  let undoTop = 0;

  const emptyClub = new Uint8Array(numMatchdays);

  return {
    /**
     * Would `team` keep at least one possible pattern if pinned home / away
     * on matchday `md`?
     */
    isViable(team: number, isHome: boolean, md: number) {
      const index = team * numMatchdays + md;
      const open = locations[index];
      locations[index] = open & (isHome ? HOME : AWAY);
      const isFit = fits(locations, team * numMatchdays);
      locations[index] = open;
      return isFit;
    },

    /**
     * Does every legal pattern put a club in opposite locations on `mdA` & `mdB`?
     * Asked of the check itself rather than of the rules,
     * so a new alternation rule shows up here without being listed again.
     */
    mustAlternate(mdA: number, mdB: number) {
      for (const location of [HOME, AWAY]) {
        emptyClub.fill(HOME | AWAY);
        emptyClub[mdA] = location;
        emptyClub[mdB] = location;
        if (fits(emptyClub, 0)) {
          return false;
        }
      }
      return true;
    },

    /**
     * Pin `team` home / away on `md`, narrowing its possible patterns.
     */
    assign(team: number, isHome: boolean, md: number) {
      const index = team * numMatchdays + md;
      locations[index] = isHome ? HOME : AWAY;
      undoIndices[undoTop] = index;
      ++undoTop;
    },

    /**
     * Undo the most recent assign.
     */
    unassign() {
      --undoTop;
      const index = undoIndices[undoTop];
      locations[index] = unpinned[index];
    },
  };
}
