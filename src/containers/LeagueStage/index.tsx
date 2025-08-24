import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import pLimit from 'p-limit';
import delay from 'delay.js';
import { orderBy, random, shuffle } from 'lodash';

import usePopup from '#store/usePopup';
import useFastDraw from '#store/useFastDraw';
import useXRay from '#store/useXRay';
import type Tournament from '#model/Tournament';
import type Team from '#model/team/GsTeam';
import generatePairings from '#engine/dfs/ls/generatePairings/index';
import generateSchedule from '#engine/dfs/ls/generateSchedule/index';
import usePageVisible from '#utils/hooks/usePageVisible';
import formatDuration from '#utils/formatDuration';
import useTimer from '#utils/hooks/useTimer';
import Button from '#ui/Button';
import Portal from '#ui/Portal';
import TeamBowl from '#ui/bowls/TeamBowl';
import ContentWithFlag from '#ui/table/ContentWithFlag';
import Dots from '#ui/Dots/index';

import Matrix from './Matrix';
import Schedule from './Schedule';
import ScheduleCreationDescription from './ScheduleCreationDescription';
import OpponentList from './OpponentList';
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
  const [isFastDraw] = useFastDraw();
  const [isXRay] = useXRay();

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

  const limitOne = useMemo(() => pLimit(1), []);

  const animationDurationMsRef = useRef(0);
  const virtualGeneratedMatchesRef = useRef<(readonly [Team, Team])[]>([]);
  const previousPickedTeamsRef = useRef<Team[]>([]);
  const [currentPotIndex, setCurrentPotIndex] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [isGeneratingPairings, setIsGeneratingPairings] = useState(false);
  const [isFixturesDone, setIsFixturesDone] = useState(false);
  const [isScheduleGenerating, setIsScheduleGenerating] = useState(false);

  const startGeneratingSchedule = useCallback(() => {
    setIsScheduleGenerating(true);
  }, []);

  const pots = useMemo(() => [...initialPots], [initialPots]);

  const [displayedPots, setDisplayedPots] = useState(
    pots.map(pot => shuffle(pot)),
  );

  const allTeams = useMemo(() => pots.flat(), [pots]);

  const matchdaySize = allTeams.length / 2;

  const indexByTeam = useMemo(
    () => new Map(allTeams.map((t, i) => [t, i])),
    [allTeams],
  );

  useEffect(() => {
    setPopup({
      waiting: false,
    });
  }, []);

  useEffect(() => {
    setDisplayedPots(pots.map(pot => shuffle(pot)));
  }, [pots]);

  useEffect(() => {
    if (!selectedTeam) {
      return;
    }

    const abortController = new AbortController();

    const generatePairingsForSelectedTeam = async () => {
      setIsGeneratingPairings(true);

      const arePairingsAlreadyExistForSelectedTeam = pairings.some(
        m => m[0] === selectedTeam || m[1] === selectedTeam,
      );

      animationDurationMsRef.current = 1000 / (pairings.length / 100 + 1);

      const generator = generatePairings({
        season,
        tournament,
        pots,
        numMatchdays,
        pickedTeam: selectedTeam,
        previousPickedTeams: previousPickedTeamsRef.current,
        virtualGeneratedMatches: virtualGeneratedMatchesRef.current,
        signal: abortController.signal,
      });

      let hasStarted = false;
      const promises: Promise<void>[] = [];
      for await (const it of generator) {
        virtualGeneratedMatchesRef.current = it.virtualGeneratedMatches;
        const set = () => {
          setPairings(prev => [...prev, it.match]);
        };
        if (isFastDraw) {
          set();
        } else {
          const hasStartedLocal = hasStarted;
          const promise = limitOne(async () => {
            if (arePairingsAlreadyExistForSelectedTeam && !hasStartedLocal) {
              await delay(animationDurationMsRef.current);
            }
            set();
            await delay(animationDurationMsRef.current);
          });
          promises.push(promise);
        }
        hasStarted = true;
      }
      await Promise.all(promises);
      previousPickedTeamsRef.current.push(selectedTeam);
      const newCurrentPot = displayedPots[currentPotIndex].toSpliced(
        displayedPots[currentPotIndex].indexOf(selectedTeam),
        1,
      );
      const newPots = displayedPots.with(currentPotIndex, newCurrentPot);
      setDisplayedPots(newPots);
      if (newCurrentPot.length === 0) {
        if (currentPotIndex === displayedPots.length - 1) {
          setIsFixturesDone(true);
        } else {
          setCurrentPotIndex(value => value + 1);
        }
      }
      setIsGeneratingPairings(false);
    };

    generatePairingsForSelectedTeam();

    return () => {
      abortController.abort();
    };
  }, [selectedTeam]);

  const isPageActive = usePageVisible();
  const isPageActiveRef = useRef(isPageActive);
  isPageActiveRef.current = isPageActive;

  useEffect(() => {
    const abortController = new AbortController();

    if (isScheduleGenerating) {
      const formSchedule = async () => {
        const it = await generateSchedule({
          season,
          tournament,
          matchdaySize,
          tvPairings,
          allGames: pairings,
          currentSchedule: schedule,
          getNumWorkers: () =>
            Math.max(
              1,
              isPageActiveRef.current
                ? navigator.hardwareConcurrency - 1
                : navigator.hardwareConcurrency >> 2,
            ),
          signal: abortController.signal,
        });
        setSchedule(it.solutionSchedule);
        setIsMatchdayMode(true);
        setIsScheduleGenerating(false);
      };

      formSchedule();
    }

    return () => {
      abortController.abort();
    };
  }, [isScheduleGenerating]);

  const isScheduleDone = useMemo(
    () => schedule.some(md => md.length > 0),
    [schedule],
  );

  const elapsedTimeMs = useTimer({
    key: isScheduleGenerating && !isScheduleDone ? true : undefined,
    intervalMs: 1000,
  });

  const elapsedTimeFormatted =
    elapsedTimeMs === undefined ? undefined : formatDuration(elapsedTimeMs);

  const handleTeamBallPick = useCallback(
    (i: number) => {
      const currentPot = displayedPots[currentPotIndex];
      const newSelectedTeam = currentPot[i];
      if (!newSelectedTeam) {
        return;
      }
      setSelectedTeam(newSelectedTeam);
    },
    [currentPotIndex, displayedPots],
  );

  useEffect(() => {
    if (isFastDraw) {
      const currentPot = displayedPots[currentPotIndex];
      const index = random(currentPot.length - 1);
      handleTeamBallPick(index);
    }
  }, [isFastDraw, displayedPots]);

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
          <div className={styles['right-wrapper']}>
            {isScheduleDone ? (
              <p>Schedule generation took: {elapsedTimeFormatted}</p>
            ) : isFixturesDone ? (
              <p>All {numMatches} matches have been drawn.</p>
            ) : (
              <p>
                Drawn matches: {pairings.length}/{numMatches}
              </p>
            )}
            {isScheduleGenerating && !isScheduleDone && (
              <>
                <p>
                  Schedule creation in progress. This will take between two
                  minutes to an hour. Please do not close the page.
                </p>
                <ScheduleCreationDescription
                  season={season}
                  teams={allTeams}
                />
                {elapsedTimeFormatted !== undefined && (
                  <p>Elapsed time: {elapsedTimeFormatted}</p>
                )}
              </>
            )}
            {!isFastDraw && !isScheduleGenerating && !isScheduleDone && (
              <div>
                <TeamBowl
                  responsiveNumItems={pots[0].length}
                  forceNoSelect={isGeneratingPairings}
                  display
                  displayTeams={isXRay}
                  selectedTeam={isGeneratingPairings ? selectedTeam : null}
                  pot={displayedPots[currentPotIndex]}
                  onPick={handleTeamBallPick}
                />
                {selectedTeam ? (
                  <>
                    <div className={styles['picked-team-announcement']}>
                      <ContentWithFlag
                        country={selectedTeam.country}
                        className={styles['selected-team']}
                      >
                        {selectedTeam.name}
                      </ContentWithFlag>{' '}
                      will play against
                      {isGeneratingPairings ? (
                        <Dots
                          initialNum={0}
                          maxNum={3}
                          interval={1000}
                        />
                      ) : (
                        ':'
                      )}
                    </div>
                    <OpponentList
                      className={styles['opponent-list']}
                      animationDurationMs={Math.min(
                        animationDurationMsRef.current,
                        500,
                      )}
                      data={orderBy(
                        pairings.filter(
                          m => m[0] === selectedTeam || m[1] === selectedTeam,
                        ),
                        [
                          m => {
                            const opponent =
                              m[0] === selectedTeam ? m[1] : m[0];
                            return Math.floor(
                              indexByTeam.get(opponent)! / pots[0].length,
                            );
                          },
                          m => m[0] !== selectedTeam,
                        ],
                      ).map(m => {
                        const opponent = m[0] === selectedTeam ? m[1] : m[0];
                        return {
                          team: opponent,
                          location: m[0] === selectedTeam ? 'h' : 'a',
                        };
                      })}
                    />
                  </>
                ) : (
                  <div className={styles['picked-team-announcement']}>
                    Pick a ball
                  </div>
                )}
              </div>
            )}
            {isFixturesDone && !isScheduleGenerating && !isScheduleDone && (
              <Button
                className={styles['generate-schedule-button']}
                onClick={startGeneratingSchedule}
              >
                Generate schedule
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(LeagueStage);
