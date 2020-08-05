/**
 * Makes an object callable,
 * i.e. converts it to a function, so one can use
 * round braces instead of square brackets
 */
export default <T extends {}>(o: T) =>
  <K extends keyof T>(key: K) => o[key]
