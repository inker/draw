const validStages = [
  'gs',
  'ko',
] as const

type Stage = typeof validStages[number]

export const isValidStage = (value: string): value is Stage =>
  validStages.includes(value as Stage)

// eslint-disable-next-line no-undef
export default Stage
