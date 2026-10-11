/**
 * Caps how many opponents a team faces from each group of teams,
 * e.g. from each country
 */
export interface OpponentCapSpec {
  kind: 'opponentCap';
  /**
   * Each team's group as an index counting from 0
   */
  groupByTeam: readonly number[];
  /**
   * How many opponents a team can face from each group
   */
  maxByGroup: readonly number[];
}

/**
 * A draw rule as plain data,
 * since the solver runs in a worker & functions can't be posted to one
 */
export type RuleSpec = OpponentCapSpec;

/**
 * The solver's state a rule can read
 */
export interface RuleContext {
  numTeams: number;
  numPots: number;
  numTeamsPerPot: number;
  isPairedPotMode: boolean;
  /**
   * The solver's own bit mask rather than a function to read it,
   * to keep calls out of a rule's dead-end check,
   * which runs at every search step
   */
  playedWithPotMask: Uint16Array;
  hasPlayedPair: Uint8Array;
  awayTeamsByHomeTeamAndPot: readonly (readonly number[])[];
  homeTeamsByAwayTeamAndPot: readonly (readonly number[])[];
  /**
   * Whether a game can be added now under every rule,
   * not only this one
   */
  canPlay: (h: number, a: number) => boolean;
}

export interface Rule {
  allows: (h: number, a: number) => boolean;
  apply: (h: number, a: number) => void;
  undo: (h: number, a: number) => void;
  /**
   * True once the draw can no longer complete,
   * checked before branching
   */
  isDeadEnd: () => boolean;
  /**
   * How hard a team is to place as an opponent,
   * so the search tries the hardest first
   */
  getOpponentPriority: (team: number) => number;
}
