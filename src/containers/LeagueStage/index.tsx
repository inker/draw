import { memo, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { shuffle } from 'lodash';

import usePopup from '#store/usePopup';
import type Team from '#model/team/GsTeam';
import generatePairings from '#engine/dfs/ls/generatePairings/index';
import generateSchedule from '#engine/dfs/ls/generateSchedule/index';
import useAbortSignal from '#utils/hooks/useAbortSignal';
import Button from '#ui/Button';
import Portal from '#ui/Portal';
import Dots from '#ui/Dots';

import Matrix from './Matrix';
import Schedule from './Schedule';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  font-size: 14px;
`;

const MatrixWrapper = styled.div`
  display: flex;
  gap: 16px;

  @media (orientation: portrait) {
    flex-direction: column;
  }
`;

interface Props {
  season: number;
  pots: readonly (readonly Team[])[];
}

function LeagueStage({ season, pots: initialPots }: Props) {
  const numMatchdays = initialPots.length * 2;

  const numMatches = useMemo(() => {
    const numTeams = initialPots.flat().length;
    return (numTeams * numMatchdays) / 2;
  }, [initialPots, numMatchdays]);

  const [, setPopup] = usePopup();

  const [isMatchdayMode, setIsMatchdayMode] = useState(false);

  const [pairings, setPairings] = useState<(readonly [Team, Team])[]>([]);
  const [schedule, setSchedule] = useState<(readonly [Team, Team])[][]>(
    Array.from(
      {
        length: numMatchdays,
      },
      () => [],
    ),
  );

  const abortSignal = useAbortSignal();

  const pots = useMemo(
    () =>
      initialPots.map(pot =>
        pot.map(team => ({
          ...team,
          id: `${team.country}|${team.name}`,
        })),
      ),
    [initialPots],
  );

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
          matchdaySize,
          allGames: pairings,
          currentSchedule: schedule,
          signal: abortSignal,
        });
        const newSchedule = it.solutionSchedule.map(md => shuffle(md));
        setSchedule(newSchedule);
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
    <Root>
      <Portal
        tagName="div"
        modalRoot={document.getElementById('navbar-left-container')!}
      >
        <Button
          type="button"
          disabled={!isScheduleDone}
          onClick={() => {
            setIsMatchdayMode(prev => !prev);
          }}
        >
          {isMatchdayMode ? 'Display matrix' : 'Display schedule'}
        </Button>
      </Portal>
      {isMatchdayMode ? (
        <Schedule schedule={schedule} />
      ) : (
        <MatrixWrapper>
          <Matrix
            allTeams={allTeams}
            pairings={pairings}
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
        </MatrixWrapper>
      )}
    </Root>
  );
}

export default memo(LeagueStage);
