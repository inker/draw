export interface BacktrackOptions<C> {
  /**
   * Should current path traversal be stopped
   */
  reject: (candidate: C) => boolean;

  /**
   * Should solution be accepted
   */
  accept: (candidate: C) => boolean;

  /**
   * Generate new candidates
   */
  generate: (candidate: C) => Iterable<C>;
}

export const findFirstSolution = <C>(
  candidate: C,
  options: BacktrackOptions<C>,
): C | undefined => {
  const isRejected = options.reject(candidate);
  if (isRejected) {
    return;
  }
  const isAccepted = options.accept(candidate);
  if (isAccepted) {
    return candidate;
  }
  for (const newCandidate of options.generate(candidate)) {
    const result = findFirstSolution(newCandidate, options);
    if (result !== undefined) {
      return result;
    }
  }
};

export interface MutableBacktrackOptions<Choice> {
  /**
   * Is the current state a complete solution
   */
  isSolved: () => boolean;

  /**
   * Candidate choices for the current state, in the order to try them.
   * An empty array marks a dead end.
   */
  getCandidates: () => readonly Choice[];

  /**
   * Mutate the state by taking the choice
   */
  apply: (choice: Choice) => void;

  /**
   * Revert the state, inverting apply
   */
  undo: (choice: Choice) => void;
}

const searchWithBudget = <Choice>(
  options: MutableBacktrackOptions<Choice>,
  budget: {
    nodesLeft: number;
  },
): boolean | 'exhausted' => {
  if (options.isSolved()) {
    return true;
  }
  if (--budget.nodesLeft < 0) {
    return 'exhausted';
  }
  for (const choice of options.getCandidates()) {
    options.apply(choice);
    const result = searchWithBudget(options, budget);
    if (result === true) {
      return true;
    }
    options.undo(choice);
    if (result === 'exhausted') {
      return 'exhausted';
    }
  }
  return false;
};

/**
 * Depth-first search over mutable state with undo.
 * Backtracking often has heavy-tailed runtimes,
 * so the search is restarted with a doubling node budget,
 * assuming getCandidates is randomised & restarts explore different regions.
 * Budget exhaustion unwinds through undo,
 * so the state is guaranteed to be back at the root before each restart.
 * A search that exhausts the space without hitting the budget is a definitive failure & returns false.
 */
export const findFirstSolutionMutable = <Choice>(
  options: MutableBacktrackOptions<Choice>,
  initialNodeBudget = 10_000,
): boolean => {
  for (let nodeBudget = initialNodeBudget; ; nodeBudget *= 2) {
    const result = searchWithBudget(options, {
      nodesLeft: nodeBudget,
    });
    if (result !== 'exhausted') {
      return result;
    }
  }
};
