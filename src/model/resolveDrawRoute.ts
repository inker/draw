import type Tournament from '#model/Tournament';
import type Stage from '#model/Stage';
import type Availability from '#model/Availability';
import type DrawSlot from '#model/DrawSlot';
import seasonsForSlot from '#model/seasonsForSlot';

export interface DrawRoute {
  tournament: Tournament;
  stage: Stage;
  season: number;
}

/**
 * A draw as asked for by a URL or by one of the selects,
 * where the season may be missing or may not have had this draw
 */
export interface RequestedDrawRoute {
  tournament: Tournament;
  slot: DrawSlot;
  season?: number;
}

/**
 * `seasons` is newest first, so a season equidistant from two of them resolves to the newer
 */
const nearestSeason = (
  seasons: readonly number[],
  wanted: number | undefined,
) => {
  if (wanted === undefined) {
    return seasons[0];
  }

  let best = seasons[0];

  for (const season of seasons) {
    if (Math.abs(season - wanted) < Math.abs(best - wanted)) {
      best = season;
    }
  }

  return best;
};

/**
 * Snaps whatever was asked for onto a draw that exists,
 * keeping the tournament & the slot & moving the season as little as it can.
 * Returns null only when there is no data for the tournament at all.
 */
export default (
  availability: Availability,
  requested: RequestedDrawRoute,
): DrawRoute | null => {
  const { tournament, slot, season: requestedSeason } = requested;

  const bySeason = seasonsForSlot(availability, tournament, slot);

  // A tournament that never had a knockout draw of its own falls back to its main draw
  // rather than dead-ending on an empty season list
  const resolved =
    bySeason.size > 0
      ? bySeason
      : seasonsForSlot(availability, tournament, 'main');

  const seasons = [...resolved.keys()];
  if (seasons.length === 0) {
    return null;
  }

  const season = nearestSeason(seasons, requestedSeason);
  const stage = resolved.get(season);

  return stage === undefined
    ? null
    : {
        tournament,
        stage,
        season,
      };
};
