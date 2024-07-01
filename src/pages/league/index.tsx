import { memo, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { shuffle } from 'lodash';

import usePopup from '#store/usePopup';
import rawPots from '#experiments/pots';
import generatePairings from '#experiments/generatePairings';
import generateSchedule from '#experiments/generateSchedule';
import Button from '#ui/Button';

import Schedule from './Schedule';
import MatchesTable from './MatchesTable';

const pots = rawPots.map(pot =>
  pot.map(team => ({
    ...team,
    id: `${team.country}:${team.name}`,
  })),
);

type Team = (typeof pots)[number][number];

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  font-size: 14px;
`;

const Interface = styled.div`
  margin-bottom: 16px;
`;

const MatrixWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

function LeagueStage() {
  const numMatchdays = 8;

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
  const [isFixturesDone, setIsFixturesDone] = useState(false);

  const allTeams = useMemo(() => pots.flat(), []);

  const matchdaySize = allTeams.length / 2;

  useEffect(() => {
    setPopup({
      waiting: false,
    });
  }, []);

  useEffect(() => {
    const formPairings = async () => {
      const generator = generatePairings({
        pots,
        numMatchdays: 8,
        isMatchPossible: (a, b) => a.country !== b.country,
      });
      for await (const pickedMatch of generator) {
        setPairings(prev => [...prev, pickedMatch]);
      }
      console.log('pairings', JSON.stringify(pairings));
      setIsFixturesDone(true);
    };

    formPairings();
  }, []);

  useEffect(() => {
    if (isFixturesDone) {
      const formSchedule = async () => {
        // setIsMatchdayMode(true);
        // setSchedule(chunk(pairings, 18));
        const generator = generateSchedule({
          matchdaySize,
          allGames: pairings,
          currentSchedule: schedule,
        });
        const iterator = await generator.next();
        if (iterator.done) {
          throw new Error('Cannot be fully done');
        }
        const it = iterator.value;
        setSchedule(it.solutionSchedule.map(md => shuffle(md)));
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
      <Interface>
        <Button
          type="button"
          disabled={!isScheduleDone}
          onClick={() => {
            setIsMatchdayMode(prev => !prev);
          }}
        >
          {isMatchdayMode ? 'Display matrix' : 'Display schedule'}
        </Button>
      </Interface>
      {isMatchdayMode ? (
        <Schedule schedule={schedule} />
      ) : (
        <MatrixWrapper>
          <MatchesTable
            allTeams={allTeams}
            pairings={pairings}
          />
          <div>
            <div>Drawn matches: {pairings.length}/144</div>
            {isFixturesDone && !isScheduleDone && (
              <div>
                The schedule is being generated. This will take a while. Do not
                close the page
              </div>
            )}
          </div>
        </MatrixWrapper>
      )}
    </Root>
  );
}

export default memo(LeagueStage);
