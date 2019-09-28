const objectToFunction = <T extends {}>(o: T) =>
  <K extends keyof T>(key: K) => o[key]

const objectToFunctionSmart = <T extends {}>(o: T) =>
  <K extends keyof T>(key: K) => {
    const v = o[key]
    return typeof v === 'function'
      ? v.bind(o) as typeof v
      : v
  }

const obj = {
  a: 5,
  b: new Date(),
  99: 'ajj',
} as const

const bar = [1,2,3,4] as const

const foo = objectToFunctionSmart('haha')

const a = foo('split')

const objectToArray = <O extends Readonly<{ [k: number]: any }>>(o: O) => {
  // @ts-ignore
  const maxKey = Math.max(...Object.keys(o))
  const arr: O[keyof O][] = []
  for (let i = 0; i <= maxKey; ++i) {
    arr[i] = o[i]
  }
  return arr
}

const arro = {
  0: 'a',
  1: 'b',
  2: 'fdfsdf',
  3: new Date(),
  4: 'b',
} as const

const foooo = objectToArray(arro)

const b = foooo[2]
