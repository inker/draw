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
