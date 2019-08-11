export default <T>(obj: { [k: string]: T }) =>
  (key: keyof typeof obj) => obj[key]
