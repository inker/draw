import { memo, useEffect, useMemo, useState } from 'react';

import usePopup from '#store/usePopup';
import type Tournament from '#model/Tournament';
import type Team from '#model/team/GsTeam';
import generatePairings from '#engine/dfs/ls/generatePairings/index';
import generateSchedule from '#engine/dfs/ls/generateSchedule/index';
import useAbortSignal from '#utils/hooks/useAbortSignal';
import Button from '#ui/Button';
import Portal from '#ui/Portal';
import Dots from '#ui/Dots';

import Matrix from './Matrix';
import Schedule from './Schedule';
import * as styles from './styles.module.scss';

interface Props {
  tournament: Tournament;
  season: number;
  pots: readonly (readonly Team[])[];
  tvPairings: readonly (readonly [Team, Team])[];
}

function LeagueStage({
  tournament,
  season,
  pots: initialPots,
  tvPairings,
}: Props) {
  const numMatchdays =
    tournament === 'ecl' ? initialPots.length : initialPots.length * 2;

  const numMatches = useMemo(() => {
    const numTeams = initialPots.flat().length;
    return (numTeams * numMatchdays) / 2;
  }, [initialPots, numMatchdays]);

  const [, setPopup] = usePopup();

  const [isMatchdayMode, setIsMatchdayMode] = useState(false);

  const [pairings, setPairings] = useState<(readonly [Team, Team])[]>([]);
  const [schedule, setSchedule] = useState<(readonly [Team, Team])[][][]>(
    Array.from(
      {
        length: numMatchdays,
      },
      () => [],
    ),
  );

  const abortSignal = useAbortSignal();

  const pots = useMemo(() => [...initialPots], [initialPots]);

  const allTeams = useMemo(() => pots.flat(), [pots]);

  const matchdaySize = allTeams.length / 2;

  useEffect(() => {
    setPopup({
      waiting: false,
    });
  }, []);

  useEffect(() => {
    const formPairings = async () => {
      const generator = generatePairings({
        season,
        tournament,
        pots,
        numMatchdays,
      });
      for await (const pickedMatch of generator) {
        setPairings(prev => [...prev, pickedMatch]);
      }
    };

    formPairings();
  }, []);

  const isFixturesDone = pairings.length === numMatches;

  useEffect(() => {
    if (isFixturesDone) {
      const formSchedule = async () => {
        const it = await generateSchedule({
          season,
          tournament,
          matchdaySize,
          tvPairings,
          allGames: pairings,
          currentSchedule: schedule,
          signal: abortSignal,
        });
        setSchedule(it.solutionSchedule);
        setIsMatchdayMode(true);
      };

      formSchedule();
    }
  }, [isFixturesDone]);

  const isScheduleDone = useMemo(
    () => schedule.some(md => md.length > 0),
    [schedule],
  );

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
          tournament={tournament}
          schedule={schedule}
        />
      ) : (
        <div className={styles['matrix-wrapper']}>
          <Matrix
            allTeams={allTeams}
            numMatchdays={numMatchdays}
            pairings={pairings}
            schedule={schedule}
            potSize={pots[0].length}
            noCellAnimation={isScheduleDone}
          />
          <div>
            {isFixturesDone ? (
              <p>All {numMatches} matches have been drawn.</p>
            ) : (
              <p>
                Drawn matches: {pairings.length}/{numMatches}
              </p>
            )}
            {isFixturesDone && !isScheduleDone && (
              <p>
                Schedule creation in progress. This will take between two
                minutes to an hour. Please do not close the page.
                <Dots
                  initialNum={0}
                  maxNum={2}
                  interval={1000}
                />
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(LeagueStage);
