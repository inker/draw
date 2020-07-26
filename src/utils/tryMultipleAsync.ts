type Func<T> = () => Promise<T>

export default async <T>(funcs: readonly Func<T>[]) => {
  for (const func of funcs) {
    try {
      return await func()
    } catch (err) {
      console.error(err)
    }
  }

  throw new Error('None of the functions succeeded')
}
