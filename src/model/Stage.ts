const validStages = ['gs', 'ko', 'ls'] as const;

type Stage = (typeof validStages)[number];

export const isValidStage = (value: string): value is Stage =>
  validStages.includes(value as Stage);

export default Stage;
