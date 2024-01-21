import isInsideInterval from '../src/utils/isInsideInterval'

describe('isInsideInterval', () => {
  describe.each([
    [0, 1],
    [1, 1],
    [0, Number.POSITIVE_INFINITY],
    [1, 0],
  ])('range: [%s, %s]', (min, max) => {
    const func = isInsideInterval(min, max)
    it.each([0, -0, 0.5, 1, -1, Number.POSITIVE_INFINITY])('value: %s', n => {
      const result = func(n)
      expect(result).toMatchSnapshot()
    })
  })
})
