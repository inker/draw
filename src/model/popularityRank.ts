import popularity from '#data/popularity';
import { type UefaCountry } from '#model/types';

// Teams missing from the popularity list sort after every listed team,
// keeping their relative seeding order.
const UNLISTED_BASE = 1e6;

interface Team {
  readonly country: UefaCountry;
  readonly name: string;
}

// Commercial-popularity rank of a club within its country; lower = more
// popular.
// Clubs absent from the curated list fall back to their seeding position
// (earlier in the pots = more popular).
export default (team: Team, seedingPosition: number) => {
  const order = popularity[team.country];
  const index = order?.indexOf(team.name) ?? -1;
  return index >= 0 ? index : UNLISTED_BASE + seedingPosition;
};
