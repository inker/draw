import type Tournament from '#model/Tournament';
import type Stage from '#model/Stage';

/**
 * Which seasons there is data for, per tournament & stage, newest first
 */
type Availability = Readonly<
  Partial<
    Record<Tournament, Readonly<Partial<Record<Stage, readonly number[]>>>>
  >
>;

export default Availability;
