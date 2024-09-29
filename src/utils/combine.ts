function* combine<T>(arr: readonly T[], k: number): Generator<T[]> {
  if (k === 0) {
    yield [];
    return;
  }

  for (let i = 0; i <= arr.length - k; ++i) {
    const rest = arr.slice(i + 1);
    for (const combination of combine(rest, k - 1)) {
      yield [arr[i], ...combination];
    }
  }
}

export default combine;
