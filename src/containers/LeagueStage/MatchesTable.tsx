import { memo, useCallback, useMemo, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

import getCountryFlagUrl from '#utils/getCountryFlagUrl';
import { type Country } from '#model/types';

const Table = styled.table`
  border-collapse: collapse;
  border: 1px double rgb(128 128 128);
  font-size: 10px;
`;

const HeaderCell = styled.th<{
  $hovered?: boolean;
}>`
  vertical-align: bottom;
  padding: 3px 1px;
  border: 1px solid rgb(192 192 192);
  border-bottom-color: rgb(128 128 128);

  &:nth-child(9n + 2) {
    border-left: 1px double rgb(128 128 128);
  }

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
  $isMatch?: boolean;
  $hovered?: boolean;
}>`
  border: 1px solid rgb(192 192 192);
  text-align: center;

  &:nth-child(9n + 1) {
    border-right: 1px double rgb(128 128 128);
  }

  ${props =>
    props.$isMatch &&
    css`
      animation: ${AppearLight} 1s ease-out normal forwards;

      &::before {
        content: '✕';
      }
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
  background-position-y: 1.5px;
  background-size: 12px;
  background-repeat: no-repeat;

  ${props =>
    props.country &&
    css`
      background-image: url('${getCountryFlagUrl(props.country)}');
    `}
`;

interface Team {
  id: string;
  name: string;
  country: Country;
}

interface Props {
  allTeams: readonly Team[];
  pairings: (readonly [Team, Team])[];
}

function MatchesTable({ allTeams, pairings }: Props) {
  const [hoverColumn, setHoverColumn] = useState<string | undefined>(undefined);

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
              const isMatch = pairingsMap[`${team.name}:${opponent.name}`];
              return (
                <TableCell
                  key={opponent.id}
                  data-opponent={opponent.id}
                  $isMatch={isMatch}
                  $hovered={opponent.id === hoverColumn}
                />
              );
            })}
          </BodyRow>
        ))}
      </tbody>
    </Table>
  );
}

export default memo(MatchesTable);
