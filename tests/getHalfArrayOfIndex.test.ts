import getHalfArrayOfIndex from '../src/utils/getHalfArrayOfIndex';

describe('getHalfArrayOfIndex', () => {
  describe.each([
    { arr: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
    { arr: [0, 1, 2] },
    { arr: [0, 1] },
    { arr: [0] },
    { arr: [] },
  ])('%s', ({ arr }) => {
    it.each([-1, ...arr.map((_, i) => i), arr.length])('%s', i => {
      const result = getHalfArrayOfIndex(arr, i);
      expect(result).toMatchSnapshot();
    });
  });
});
