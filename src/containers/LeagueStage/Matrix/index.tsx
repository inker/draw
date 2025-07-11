import { memo, useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import clsx from 'clsx';

import getCountryFlagUrl from '#utils/getCountryFlagUrl';
import { type Country } from '#model/types';

import * as styles from './styles.module.scss';

// eslint-disable-next-line no-sparse-arrays
const angleByIndex = [, 0, 5, 3, 2, 6, 4, 1];

const Table = styled.table<{
  $potSize: number;
}>`
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

interface Team {
  id: string;
  name: string;
  country: Country;
}

interface Props {
  allTeams: readonly Team[];
  numMatchdays: number;
  pairings: (readonly [Team, Team])[];
  schedule: readonly (readonly (readonly (readonly [Team, Team])[])[])[];
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
      for (const day of md) {
        for (const m of day) {
          o[`${m[0].id}:${m[1].id}`] = mdIndex;
        }
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
      className={styles.table}
      $potSize={potSize}
      onMouseOver={handleTableMouseOver}
      onMouseOut={handleTableMouseOut}
    >
      <thead>
        <tr>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <th className={styles['header-cell']} />
          {allTeams.map(opponent => (
            <th
              key={opponent.id}
              data-opponent={opponent.id}
              className={clsx(
                styles['header-cell'],
                opponent.id === hoverColumn && styles.hovered,
              )}
            >
              <div className={styles['header-cell-div']}>
                <img
                  alt={`[${opponent.country}]`}
                  src={getCountryFlagUrl(opponent.country)}
                />
                <span>{opponent.name}</span>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {allTeams.map(team => (
          <tr
            key={team.id}
            className={styles['body-row']}
          >
            <td className={styles['team-cell']}>
              <div
                className={styles.team}
                style={{
                  backgroundImage: `url('${getCountryFlagUrl(team.country)}')`,
                }}
              >
                {team.name}
              </div>
            </td>
            {allTeams.map(opponent => {
              const isMatch = pairingsMap[`${team.id}:${opponent.id}`];
              const matchdayIndex = scheduleMap[`${team.id}:${opponent.id}`];
              return (
                <td
                  key={opponent.id}
                  data-opponent={opponent.id}
                  className={clsx(
                    styles['table-cell'],
                    isMatch && styles.match,
                    noCellAnimation && styles['no-animation'],
                    opponent.id === hoverColumn && styles.hovered,
                  )}
                >
                  {matchdayIndex === undefined ? (
                    isMatch ? (
                      '✕'
                    ) : (
                      ''
                    )
                  ) : (
                    <div
                      className={styles['body-cell-matchday']}
                      style={{
                        color: getMatchdayColor(matchdayIndex),
                      }}
                    >
                      {matchdayIndex + 1}
                    </div>
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default memo(Matrix);
