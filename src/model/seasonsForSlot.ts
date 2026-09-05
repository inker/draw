import type Tournament from '#model/Tournament';
import type Stage from '#model/Stage';
import type Availability from '#model/Availability';
import type DrawSlot from '#model/DrawSlot';
import { slotToStages } from '#model/DrawSlot';

/**
 * Every season the tournament ran this draw in, newest first,
 * each mapped to the stage its data is filed under
 */
export default (
  availability: Availability,
  tournament: Tournament,
  slot: DrawSlot,
): ReadonlyMap<number, Stage> => {
  const byStage = availability[tournament];

  const entries = slotToStages(slot).flatMap(stage =>
    (byStage?.[stage] ?? []).map(season => [season, stage] as const),
  );

  entries.sort(([a], [b]) => b - a);

  return new Map(entries);
};
