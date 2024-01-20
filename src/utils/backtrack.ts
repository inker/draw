interface BacktrackOptions<C> {
  reject: (candidate: C) => boolean
  accept: (candidate: C) => boolean
  generate: (candidate: C) => C[]
}

const backtrack = <C>(candidate: C, options: BacktrackOptions<C>): boolean => {
  if (options.reject(candidate)) {
    return false
  }
  if (options.accept(candidate)) {
    return true
  }
  const candidates = options.generate(candidate)
  return candidates.some(c => backtrack(c, options))
}

export default backtrack
