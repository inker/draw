export default <T>(teams: readonly T[], numTimes = 1) => {
  const matches: [T, T][] = [];
  for (let k = 0; k < numTimes; ++k) {
    for (let i = 0; i < teams.length - 1; ++i) {
      for (let j = i + 1; j < teams.length; ++j) {
        const match: [T, T] =
          k & 1
            ? ([teams[j], teams[i]] as const)
            : ([teams[i], teams[j]] as const);
        matches.push(match);
      }
    }
  }
  return matches;
};
