import { memo, useCallback, useMemo, useRef } from "react";

import type Tournament from "#model/Tournament";
import { validTournaments } from "#model/Tournament";
import type Stage from "#model/Stage";
import type DrawSlot from "#model/DrawSlot";
import { drawSlots, stageToSlot } from "#model/DrawSlot";
import resolveDrawRoute, {
  type DrawRoute,
  type RequestedDrawRoute,
} from "#model/resolveDrawRoute";
import seasonsForSlot from "#model/seasonsForSlot";
import availability from "#data/availability";
import Popover from "#ui/Popover";

import config from "../../../config";
import seasonAsString from "../utils/seasonAsString";
import tournamentAsString from "../utils/tournamentAsString";

import * as styles from "./styles.module.css";

const stageNames = {
  ls: "League Phase",
  gs: "Group Stage",
  ko: "Knockout Stage",
} as const satisfies Record<Stage, string>;

/**
 * UEFA's own abbreviations, which fans already know.
 * The World Cup & the Premier League are short enough to keep their names.
 */
const shortTournamentNames = {
  cl: "UCL",
  el: "UEL",
  ecl: "UECL",
  wc: "World Cup",
  epl: "Premier League",
} as const satisfies Record<Tournament, string>;

const shortStageNames = {
  ls: "League Phase",
  gs: "Groups",
  ko: "Knockout",
} as const satisfies Record<Stage, string>;

interface Props {
  route: DrawRoute;
  onChange: (change: Partial<RequestedDrawRoute>) => void;
}

function DrawPicker({ route, onChange }: Props) {
  const { tournament, stage, season } = route;

  const slot = stageToSlot(stage);

  const popoverRef = useRef<HTMLDivElement>(null);

  const tournaments = useMemo(
    () =>
      validTournaments.filter(
        // The current one stays,
        // or the list would have nothing marked as the page's tournament
        t => !config.hiddenTournaments.includes(t) || t === tournament,
      ),
    [tournament],
  );

  const seasons = useMemo(
    () => [...seasonsForSlot(availability, tournament, slot).keys()],
    [tournament, slot],
  );

  // A slot is offered even when this season didn't have it,
  // so the knockout stage is one tap away from 2026/27 & lands on the nearest season that had one.
  // Its name is the format of the season it would land on,
  // so the same option reads "Group Stage" in 2015/16 & "League Phase" in 2025/26
  const slotOptions = useMemo(
    () =>
      drawSlots
        .map(s => {
          if (seasonsForSlot(availability, tournament, s).size === 0) {
            return null;
          }

          const target = resolveDrawRoute(availability, {
            tournament,
            slot: s,
            season,
          });

          return target === null
            ? null
            : {
                slot: s,
                name: stageNames[target.stage],
              };
        })
        .filter(option => option !== null),
    [tournament, season],
  );

  const hasSlotChoice = slotOptions.length > 1;

  const label = [
    tournamentAsString(tournament, season),
    hasSlotChoice ? stageNames[stage] : null,
    seasonAsString(tournament, season),
  ]
    .filter(part => part !== null)
    .join(" · ");

  const shortLabel = [
    shortTournamentNames[tournament],
    hasSlotChoice ? shortStageNames[stage] : null,
    seasonAsString(tournament, season),
  ]
    .filter(part => part !== null)
    .join(" · ");

  const onTournamentClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onChange({
        tournament: e.currentTarget.value as Tournament,
      });
    },
    [onChange],
  );

  const onSlotClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onChange({
        slot: e.currentTarget.value as DrawSlot,
      });
    },
    [onChange],
  );

  // The season is the last thing anybody picks,
  // so it closes the picker while the other two leave it open
  const onSeasonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onChange({
        season: +e.currentTarget.value,
      });
      popoverRef.current?.hidePopover();
    },
    [onChange],
  );

  return (
    <Popover
      trigger={
        <>
          <span className={styles["long-label"]}>{label}</span>
          <span className={styles["short-label"]}>{shortLabel}</span>
          <span
            aria-hidden
            className={styles.caret}
          >
            ▾
          </span>
        </>
      }
      label={`Draw: ${label}`}
      panelRef={popoverRef}
    >
      <div className={styles.content}>
        <fieldset className={styles.group}>
          <legend className={styles.legend}>Tournament</legend>
          <div className={styles.list}>
            {tournaments.map(t => (
              <button
                key={t}
                type="button"
                value={t}
                aria-pressed={t === tournament}
                className={styles.option}
                onClick={onTournamentClick}
              >
                {tournamentAsString(t, season)}
              </button>
            ))}
          </div>
        </fieldset>
        {slotOptions.length > 1 && (
          <fieldset className={styles.group}>
            <legend className={styles.legend}>Draw</legend>
            <div className={styles.list}>
              {slotOptions.map(option => (
                <button
                  key={option.slot}
                  type="button"
                  value={option.slot}
                  aria-pressed={option.slot === slot}
                  className={styles.option}
                  onClick={onSlotClick}
                >
                  {option.name}
                </button>
              ))}
            </div>
          </fieldset>
        )}
        <fieldset className={styles.group}>
          <legend className={styles.legend}>Season</legend>
          <div className={styles.seasons}>
            {seasons.map(s => (
              <button
                key={s}
                type="button"
                value={s}
                aria-pressed={s === season}
                className={styles.option}
                onClick={onSeasonClick}
              >
                {seasonAsString(tournament, s)}
              </button>
            ))}
          </div>
        </fieldset>
      </div>
    </Popover>
  );
}

export default memo(DrawPicker);
