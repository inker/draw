interface BacktrackOptions<C> {
  /**
   * Should current path traversal be stopped
   */
  reject: (candidate: C) => boolean

  /**
   * Should solution be accepted
   */
  accept: (candidate: C) => boolean

  /**
   * Generate new candidates
   */
  generate: (candidate: C) => Iterable<C>
}

// eslint-disable-next-line import/prefer-default-export
export const findFirstSolution = <C>(
  candidate: C,
  options: BacktrackOptions<C>,
): C | undefined => {
  if (options.reject(candidate)) {
    return
  }
  if (options.accept(candidate)) {
    return candidate
  }
  for (const newCandidate of options.generate(candidate)) {
    const result = findFirstSolution(newCandidate, options)
    if (result !== undefined) {
      return result
    }
  }
}
