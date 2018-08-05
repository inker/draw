import Resolvers from './Resolvers'

class SimplifiedResolvers<T> {
  resolvers = new Resolvers<T>()

  getPromise(onInit?: (id: string) => void) {
    const promise = new Promise<T>(async (resolve) => {
      const id = await this.resolvers.add(resolve)
      if (onInit) {
        onInit(id)
      }
    })

    return promise
  }

  resolve(id: string, data: T) {
    const resolver = this.resolvers.getAndDelete(id)
    resolver(data)
  }
}

export default SimplifiedResolvers
