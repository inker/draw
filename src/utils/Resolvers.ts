import { tryUntil } from 'tryfunc'

import getRandomId from 'utils/getRandomId'

type Resolver<T> = (value?: T | PromiseLike<T> | undefined) => void

const tryUntilOptions = {
  numAttempts: 1000,
  interval: 0,
}

class Resolvers<T> {
  private classId = getRandomId()
  private resolvers = new Map<string, Resolver<T>>()

  private getRandomIdWrapped = () =>
    getRandomId(`${this.classId}::`)

  private noKeyInResolvers = (val: string) => {
    return !this.resolvers.has(val)
  }

  private generateMessageId() {
    return tryUntil(this.getRandomIdWrapped, this.noKeyInResolvers, tryUntilOptions)
  }

  async add(resolver: Resolver<T>) {
    const id = await this.generateMessageId()
    this.resolvers.set(id, resolver)
    return id
  }

  getAndDelete(id: string) {
    const resolver = this.resolvers.get(id)
    if (!resolver) {
      throw new Error(`no resolver with id = ${id}`)
    }

    this.resolvers.delete(id)
    return resolver
  }
}

export default Resolvers
