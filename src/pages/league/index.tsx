import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

import usePopup from '#store/usePopup';
import rawPots from '#experiments/pots';
import generatePairings from '#experiments/generatePairings';
import generateSchedule from '#experiments/generateSchedule';
import getCountryFlagUrl from '#utils/getCountryFlagUrl';

import games from './games';

const pots = rawPots.map(pot =>
  pot.map(team => ({
    ...team,
    id: `${team.country}:${team.name}`,
  })),
);

type Team = (typeof pots)[number][number];

const Root = styled.div`
  display: flex;
  gap: 16px;
  margin: 10px;
`;

const Table = styled.table`
  border-collapse: collapse;
  border: 1px double rgb(128 128 128);
  font-size: 10px;
`;

const HeaderCell = styled.th<{
  hovered?: boolean;
}>`
  vertical-align: bottom;
  border: 1px solid rgb(192 192 192);
  border-bottom-color: rgb(128 128 128);
  padding: 3px 1px;

  &:nth-child(9n + 2) {
    border-left: 1px double rgb(128 128 128);
  }

  ${props =>
    props.hovered &&
    css`
      background-color: rgba(0 0 0 / 0.1);
    `}
`;

const HeaderCellDiv = styled.div`
  display: flex;
  gap: 4px;
  writing-mode: vertical-lr;
  text-orientation: mixed;
  font-weight: normal;
  transform: rotate(180deg);

  > img {
    width: 12px;
    transform: rotate(90deg);
    user-select: none;
    pointer-events: none;
  }
`;

const BodyRow = styled.tr`
  border: 1px solid rgb(192 192 192);

  &:hover {
    background-color: rgba(0 0 0 / 0.1);
  }

  &:nth-child(9n + 1) {
    > td {
      border-top: 1px double rgb(128 128 128);
    }
  }
`;

const TeamCell = styled.td`
  padding: 1px 3px;
  border: 1px solid rgb(192 192 192);

  & + & {
    text-align: center;
  }

  &:nth-child(9n + 1) {
    border-right: 1px double rgb(128 128 128);
  }
`;

const AppearLight = keyframes`
  from {
    background-color: rgb(255 255 0 / 0.5);
  }
`;

const TableCell = styled.td<{
  isMatch?: boolean;
  hovered?: boolean;
}>`
  border: 1px solid rgb(192 192 192);

  text-align: center;

  &:nth-child(9n + 1) {
    border-right: 1px double rgb(128 128 128);
  }

  ${props =>
    props.isMatch &&
    css`
      animation: ${AppearLight} 3s ease-out normal forwards;

      &::before {
        content: '✕';
      }
    `}

  ${props =>
    props.hovered &&
    css`
      background-color: rgba(0 0 0 / 0.1);
    `}
`;

const TeamDiv = styled.div<{
  country: string;
}>`
  padding-left: 14.5px;
  background-position-y: 1.5px;
  background-size: 12px;
  background-repeat: no-repeat;

  ${props =>
    props.country &&
    css`
      background-image: url('${getCountryFlagUrl(props.country)}');
    `}
`;

function LeagueStage() {
  const [, setPopup] = usePopup();

  const [hoverColumn, setHoverColumn] = useState<string | undefined>(undefined);

  // @ts-expect-error Foo
  const [pairings, setPairings] = useState<(readonly [Team, Team])[]>(games);
  const [schedule, setSchedule] = useState<(readonly [Team, Team])[]>([]);
  const [isFixturesDone, setIsFixturesDone] = useState(true);

  console.log('pairings', JSON.stringify(pairings));

  const allTeams = useMemo(() => pots.flat(), []);

  useEffect(() => {
    setPopup({
      waiting: false,
    });
  }, []);

  // useEffect(() => {
  //   const foo = async () => {
  //     const generator = generatePairings({
  //       pots,
  //       numMatchdays: 8,
  //       isMatchPossible: (a, b) => a.country !== b.country,
  //     });
  //     for await (const pickedMatch of generator) {
  //       setPairings(prev => [...prev, pickedMatch]);
  //     }
  //     console.log('pairings', JSON.stringify(pairings));
  //     setIsFixturesDone(true);
  //   };

  //   foo();
  // }, []);

  useEffect(() => {
    if (isFixturesDone) {
      const foo = async () => {
        const generator = generateSchedule({
          matchdaySize: allTeams.length / 2,
          matches: pairings,
        });
        for await (const pickedMatch of generator) {
          setSchedule(prev => [...prev, pickedMatch]);
        }
      };

      setTimeout(() => {
        // foo();
      }, 2000);
    }
  }, [isFixturesDone]);

  const pairingsMap = useMemo(() => {
    const o: Record<`${string}:${string}`, boolean> = {};
    for (const pairing of pairings) {
      o[`${pairing[0].name}:${pairing[1].name}`] = true;
    }
    return o;
  }, [pairings]);

  const handleTableMouseOver = useCallback(
    (e: React.MouseEvent<HTMLTableElement>) => {
      const opponentId =
        (e.target as HTMLTableCellElement).dataset.opponent ||
        (
          e.nativeEvent
            .composedPath()
            .find(el => (el as HTMLElement).dataset?.opponent) as
            | HTMLElement
            | undefined
        )?.dataset?.opponent;
      setHoverColumn(opponentId);
    },
    [],
  );

  const handleTableMouseOut = useCallback(
    (e: React.MouseEvent<HTMLTableElement>) => {
      const opponentId = (e.target as HTMLTableCellElement).dataset.opponent;
      if (opponentId) {
        setHoverColumn(undefined);
      }
    },
    [],
  );

  return (
    <Root>
      <Table
        onMouseOver={handleTableMouseOver}
        onMouseOut={handleTableMouseOut}
      >
        <thead>
          <tr>
            <HeaderCell />
            {allTeams.map(opponent => (
              <HeaderCell
                key={opponent.id}
                data-opponent={opponent.id}
                hovered={opponent.id === hoverColumn}
              >
                <HeaderCellDiv>
                  <img
                    alt={`[${opponent.country}]`}
                    src={getCountryFlagUrl(opponent.country)}
                  />
                  <span>{opponent.name}</span>
                </HeaderCellDiv>
              </HeaderCell>
            ))}
          </tr>
        </thead>
        <tbody>
          {allTeams.map(team => (
            <BodyRow key={team.id}>
              <TeamCell>
                <TeamDiv country={team.country}>{team.name}</TeamDiv>
              </TeamCell>
              {allTeams.map(opponent => {
                const isMatch = pairingsMap[`${team.name}:${opponent.name}`];
                return (
                  <TableCell
                    key={opponent.id}
                    data-opponent={opponent.id}
                    isMatch={isMatch}
                    hovered={opponent.id === hoverColumn}
                  />
                );
              })}
            </BodyRow>
          ))}
        </tbody>
      </Table>
      <div>Drawn matches: {pairings.length}/144</div>
    </Root>
  );
}

export default memo(LeagueStage);
