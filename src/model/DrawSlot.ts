import type Stage from '#model/Stage';

/**
 * A draw named by its place in the season rather than by the format it was run in.
 * `main` is a group stage up to 2023/24 & a league phase from 2024/25,
 * which is a difference in the data rather than a choice anybody makes.
 */
type DrawSlot = 'main' | 'ko';

export const drawSlots = ['main', 'ko'] as const satisfies readonly DrawSlot[];

/**
 * Stages that can back each slot, newest format first
 */
const stagesBySlot = {
  main: ['ls', 'gs'],
  ko: ['ko'],
} as const satisfies Record<DrawSlot, readonly Stage[]>;

export const stageToSlot = (stage: Stage): DrawSlot =>
  stage === 'ko' ? 'ko' : 'main';

export const slotToStages = (slot: DrawSlot): readonly Stage[] =>
  stagesBySlot[slot];

export default DrawSlot;
