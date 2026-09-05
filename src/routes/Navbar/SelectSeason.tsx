import { memo, useCallback, useMemo } from 'react';

import { validTournaments } from '#model/Tournament';
import type Stage from '#model/Stage';
import type DrawSlot from '#model/DrawSlot';
import { drawSlots, stageToSlot } from '#model/DrawSlot';
import {
  type DrawRoute,
  type RequestedDrawRoute,
} from '#model/resolveDrawRoute';
import seasonsForSlot from '#model/seasonsForSlot';
import availability from '#data/availability';
import Select from '#ui/SelectWithHiddenLabel';

import seasonAsString from './seasonAsString';
import tournamentAsString from './tournamentAsString';

const stageNames = {
  ls: 'League Phase',
  gs: 'Group Stage',
  ko: 'Knockout Stage',
} as const satisfies Record<Stage, string>;

interface Props {
  route: DrawRoute;
  onChange: (change: RequestedDrawRoute) => void;
}

function SelectSeason({ route, onChange }: Props) {
  const { tournament, stage, season } = route;

  const slot = stageToSlot(stage);

  const seasons = useMemo(
    () => [...seasonsForSlot(availability, tournament, slot).keys()],
    [tournament, slot],
  );

  // The name of a slot is whatever format that particular season used,
  // so the same option reads "Group Stage" in 2015/16 & "League Phase" in 2025/26
  const slotOptions = useMemo(
    () =>
      drawSlots
        .map(s => {
          const stageThatSeason = seasonsForSlot(
            availability,
            tournament,
            s,
          ).get(season);

          return stageThatSeason === undefined
            ? null
            : {
                slot: s,
                name: stageNames[stageThatSeason],
              };
        })
        .filter(option => option !== null),
    [tournament, season],
  );

  const onTournamentChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange({
        tournament: e.target.value,
      });
    },
    [onChange],
  );

  const onSlotChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange({
        slot: e.target.value as DrawSlot,
      });
    },
    [onChange],
  );

  const onSeasonChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange({
        season: +e.target.value,
      });
    },
    [onChange],
  );

  return (
    <div>
      <Select
        label="tournament"
        onChange={onTournamentChange}
        value={tournament}
      >
        {validTournaments.map(t => (
          <option
            key={t}
            value={t}
          >
            {tournamentAsString(t, season)}
          </option>
        ))}
      </Select>
      {slotOptions.length > 1 && (
        <Select
          label="draw"
          onChange={onSlotChange}
          value={slot}
        >
          {slotOptions.map(option => (
            <option
              key={option.slot}
              value={option.slot}
            >
              {option.name}
            </option>
          ))}
        </Select>
      )}
      <Select
        label="season"
        onChange={onSeasonChange}
        value={season}
      >
        {seasons.map(i => (
          <option
            key={i}
            value={i}
          >
            {seasonAsString(tournament, i)}
          </option>
        ))}
      </Select>
    </div>
  );
}

export default memo(SelectSeason);
