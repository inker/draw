import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import useFastDraw from '#store/useFastDraw';
import type Team from '#model/team/GsTeam';
import generateSchedule from '#engine/dfs/epl/generateSchedule';
import usePageVisible from '#utils/hooks/usePageVisible';
import formatDuration from '#utils/formatDuration';
import useTimer from '#utils/hooks/useTimer';
import usePrngGenerator from '#utils/hooks/usePrngGenerator';
import Button from '#ui/Button';
import Portal from '#ui/Portal';
import Matrix from '#containers/LeagueStage/Matrix';
import Schedule from '#containers/LeagueStage/Schedule';

import ScheduleCreationDescription from './ScheduleCreationDescription';
import getClubIconUrl from './getClubIconUrl';
import * as styles from './styles.module.scss';

interface Props {
  pots: readonly (readonly Team[])[];
}

function PremierLeague({ pots }: Props) {
  const prngGenerator = usePrngGenerator();

  const [isFastDraw] = useFastDraw();

  const [isMatchdayMode, setIsMatchdayMode] = useState(false);
  const [isScheduleGenerating, setIsScheduleGenerating] = useState(false);
  const [schedule, setSchedule] = useState<(readonly [Team, Team])[][][]>([]);

  const allTeams = useMemo(() => pots.flat(), [pots]);

  const numMatchdays = 2 * (allTeams.length - 1);

  const pairings = useMemo(
    () =>
      allTeams.flatMap(h =>
        allTeams.filter(a => a !== h).map(a => [h, a] as const),
      ),
    [allTeams],
  );

  const startGeneratingSchedule = useCallback(() => {
    setIsScheduleGenerating(true);
  }, []);

  // There is nothing to draw,
  // so a fast draw goes straight to the schedule.
  useEffect(() => {
    if (isFastDraw) {
      startGeneratingSchedule();
    }
  }, [isFastDraw]);

  const isPageActive = usePageVisible();
  const isPageActiveRef = useRef(isPageActive);
  isPageActiveRef.current = isPageActive;

  useEffect(() => {
    const abortController = new AbortController();

    if (isScheduleGenerating) {
      const formSchedule = async () => {
        const matchdays = await generateSchedule({
          teams: allTeams,
          getNumWorkers: () =>
            Math.max(
              1,
              isPageActiveRef.current
                ? navigator.hardwareConcurrency - 1
                : navigator.hardwareConcurrency >> 2,
            ),
          signal: abortController.signal,
          prngGenerator,
        });
        // A Premier League matchday is not split into days,
        // so each one is shown as a single day.
        setSchedule(
          matchdays.map(md => [
            md.map(([h, a]) => [allTeams[h], allTeams[a]] as const),
          ]),
        );
        setIsMatchdayMode(true);
        setIsScheduleGenerating(false);
      };

      formSchedule();
    }

    return () => {
      abortController.abort();
    };
  }, [isScheduleGenerating]);

  const isScheduleDone = schedule.length > 0;

  const elapsedTimeMs = useTimer({
    key: isScheduleGenerating && !isScheduleDone ? true : undefined,
    intervalMs: 1000,
  });

  const elapsedTimeFormatted =
    elapsedTimeMs === undefined ? undefined : formatDuration(elapsedTimeMs);

  return (
    <div className={styles.root}>
      <Portal
        tagName="div"
        modalRoot={document.getElementById('navbar-left-container')!}
      >
        <Button
          type="button"
          isDisabled={!isScheduleDone}
          onClick={() => {
            setIsMatchdayMode(prev => !prev);
          }}
        >
          {isMatchdayMode ? 'Display matrix' : 'Display schedule'}
        </Button>
      </Portal>
      {isMatchdayMode ? (
        <Schedule
          tournament="epl"
          schedule={schedule}
          getIconUrl={getClubIconUrl}
        />
      ) : (
        <div className={styles['matrix-wrapper']}>
          <Matrix
            allTeams={allTeams}
            numMatchdays={numMatchdays}
            pairings={pairings}
            schedule={schedule}
            potSize={allTeams.length}
            noCellAnimation
            getIconUrl={getClubIconUrl}
          />
          <div className={styles['right-wrapper']}>
            {isScheduleDone ? (
              <p>Schedule generation took: {elapsedTimeFormatted}</p>
            ) : isScheduleGenerating ? (
              <>
                <p>
                  Schedule creation in progress. Please do not close the page.
                </p>
                <ScheduleCreationDescription teams={allTeams} />
                {elapsedTimeFormatted !== undefined && (
                  <p>Elapsed time: {elapsedTimeFormatted}</p>
                )}
              </>
            ) : (
              <>
                <p>
                  Each club plays every other club twice, once at home and once
                  away, for {pairings.length} matches over {numMatchdays}{' '}
                  matchdays.
                </p>
                <Button
                  className={styles['generate-schedule-button']}
                  onClick={startGeneratingSchedule}
                >
                  Generate schedule
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(PremierLeague);
