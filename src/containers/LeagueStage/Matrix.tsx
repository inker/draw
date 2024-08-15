import { memo, useCallback, useMemo, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

import getCountryFlagUrl from '#utils/getCountryFlagUrl';
import { type Country } from '#model/types';

// eslint-disable-next-line no-sparse-arrays
const angleByIndex = [, 0, 5, 3, 2, 6, 4, 1];

const Table = styled.table<{
  $potSize: number;
}>`
  flex-shrink: 0;
  table-layout: fixed;
  border-collapse: collapse;
  border: 1px double rgb(128 128 128);
  font-size: 10px;

  > thead {
    > tr {
      > th:nth-child(${props => props.$potSize}n + 2) {
        border-left: 1px double rgb(128 128 128);
      }
    }
  }

  > tbody {
    > tr {
      &:nth-child(${props => props.$potSize}n + 1) {
        border-top: 1px double rgb(128 128 128);
      }

      > td:nth-child(${props => props.$potSize}n + 2) {
        border-left: 1px double rgb(128 128 128);
      }
    }
  }
`;

const HeaderCell = styled.th<{
  $hovered?: boolean;
}>`
  vertical-align: bottom;
  padding: 3px 1px;
  border: 1px solid rgb(192 192 192);
  border-bottom-color: rgb(128 128 128);

  ${props =>
    props.$hovered &&
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
`;

const TeamCell = styled.td`
  padding: 1px 3px;
  border: 1px solid rgb(192 192 192);

  & + & {
    text-align: center;
  }
`;

const AppearLight = keyframes`
  from {
    background-color: rgb(255 255 0 / 0.5);
  }
`;

const TableCell = styled.td<{
  $isMatch?: boolean;
  $noAnimation?: boolean;
  $hovered?: boolean;
}>`
  border: 1px solid rgb(192 192 192);
  text-align: center;

  ${props =>
    props.$isMatch &&
    css`
      animation: ${AppearLight} 1s ease-out normal forwards;
    `}
  ${props =>
    props.$noAnimation &&
    css`
      animation: initial;
    `}

  ${props =>
    props.$hovered &&
    css`
      background-color: rgba(0 0 0 / 0.1);
    `}
`;

const TeamDiv = styled.div<{
  country: Country;
}>`
  padding-left: 14.5px;
  background-position-y: center;
  background-size: 12px;
  background-repeat: no-repeat;

  ${props =>
    props.country &&
    css`
      background-image: url('${getCountryFlagUrl(props.country)}');
    `}
`;

const BodyCellMatchday = styled.div`
  transform: scaleX(1.25);
`;

interface Team {
  id: string;
  name: string;
  country: Country;
}

interface Props {
  allTeams: readonly Team[];
  numMatchdays: number;
  pairings: (readonly [Team, Team])[];
  schedule: readonly (readonly (readonly [Team, Team])[])[];
  potSize: number;
  noCellAnimation?: boolean;
}

function Matrix({
  allTeams,
  numMatchdays,
  pairings,
  schedule,
  potSize,
  noCellAnimation,
}: Props) {
  const [hoverColumn, setHoverColumn] = useState<string | undefined>(undefined);

  const pairingsMap = useMemo(() => {
    const o: Record<`${string}:${string}`, boolean> = {};
    for (const pairing of pairings) {
      o[`${pairing[0].id}:${pairing[1].id}`] = true;
    }
    return o;
  }, [pairings]);

  const scheduleMap = useMemo(() => {
    const o: Record<`${string}:${string}`, number> = {};
    for (const [mdIndex, md] of schedule.entries()) {
      for (const m of md) {
        o[`${m[0].id}:${m[1].id}`] = mdIndex;
      }
    }
    return o;
  }, [schedule]);

  const getMatchdayColor = (index: number) => {
    if (index === 0) {
      return undefined;
    }
    const turn = (angleByIndex[index] ?? index) / (numMatchdays - 1);
    const deg = turn * 360;
    return `lch(50% 100 ${deg})`;
  };

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
    <Table
      $potSize={potSize}
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
              $hovered={opponent.id === hoverColumn}
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
              const isMatch = pairingsMap[`${team.id}:${opponent.id}`];
              const matchdayIndex = scheduleMap[`${team.id}:${opponent.id}`];
              return (
                <TableCell
                  key={opponent.id}
                  data-opponent={opponent.id}
                  $isMatch={isMatch}
                  $noAnimation={noCellAnimation}
                  $hovered={opponent.id === hoverColumn}
                >
                  {matchdayIndex === undefined ? (
                    isMatch ? (
                      '✕'
                    ) : (
                      ''
                    )
                  ) : (
                    <BodyCellMatchday
                      style={{
                        color: getMatchdayColor(matchdayIndex),
                      }}
                    >
                      {matchdayIndex + 1}
                    </BodyCellMatchday>
                  )}
                </TableCell>
              );
            })}
          </BodyRow>
        ))}
      </tbody>
    </Table>
  );
}

export default memo(Matrix);
