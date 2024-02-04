interface PropertyAccessorFunc<T extends Record<string, unknown>> {
  <K extends keyof T>(key: K): T[K];
  (key: string | number): T[keyof T] | undefined;
}

/**
 * Makes an object callable,
 * i.e. converts it to a function, so one can use
 * round braces instead of square brackets
 */
export default <T extends Record<string, unknown>>(
    o: T,
  ): PropertyAccessorFunc<T> =>
  <K extends keyof T>(key: K) =>
    o[key];
