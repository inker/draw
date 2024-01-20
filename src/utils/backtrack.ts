interface BacktrackOptions<C> {
  reject: (candidate: C) => boolean
  accept: (candidate: C) => boolean
  generate: (candidate: C) => C[]
}

const backtrack = <C>(
  candidate: C,
  options: BacktrackOptions<C>,
): C | undefined => {
  if (options.reject(candidate)) {
    return
  }
  if (options.accept(candidate)) {
    return candidate
  }
  for (const c of options.generate(candidate)) {
    const result = backtrack(c, options)
    if (result !== undefined) {
      return result
    }
  }
}

export default backtrack
