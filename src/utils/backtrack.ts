interface BacktrackOptions<C> {
  reject: (candidate: C) => boolean
  accept: (candidate: C) => boolean
  generate: (candidate: C) => C[]
}

// eslint-disable-next-line import/prefer-default-export
export const backtrackFirstSolution = <C>(
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
    const result = backtrackFirstSolution(newCandidate, options)
    if (result !== undefined) {
      return result
    }
  }
}
