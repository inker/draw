export default (num: number, length: number) => {
  const result = Array.from(
    {
      length,
    },
    () => 0,
  );
  for (let i = length - 1, n = num; i >= 0 && n > 0; --i) {
    result[i] = n % 3;
    n = Math.floor(n / 3);
  }
  return result;
};
