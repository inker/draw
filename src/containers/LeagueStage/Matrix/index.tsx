import { memo, useCallback, useMemo, useState } from 'react';
import clsx from 'clsx';

import getCountryFlagUrl from '#utils/getCountryFlagUrl';
import { type Country } from '#model/types';
import rangeGenerator from '#utils/rangeGenerator';

import TableStyles from './TableStyles';
import * as styles from './styles.module.scss';

// eslint-disable-next-line no-sparse-arrays
const angleByIndex = [, 0, 5, 3, 2, 6, 4, 1];

const isTableCell = (node: any): node is HTMLTableCellElement => {
  const tag = (node as Element).tagName?.toLowerCase();
  return tag === 'td' || tag === 'th';
};

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
  const [hoverColumn, setHoverColumn] = useState<number | undefined>(undefined);

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
      const cell = isTableCell(e.target)
        ? e.target
        : e.nativeEvent.composedPath().find(isTableCell);
      if (!cell) {
        setHoverColumn(undefined);
        return;
      }
      const siblings = cell.parentNode!.children;
      const index = rangeGenerator(siblings.length).find(
        i => siblings[i] === cell,
      );
      setHoverColumn(index);
    },
    [],
  );

  const handleTableMouseOut = useCallback(() => {
    setHoverColumn(undefined);
  }, []);

  return (
    <>
      <TableStyles
        className={styles.table}
        blockSize={potSize}
      />
      <table
        className={styles.table}
        // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
        onMouseOver={handleTableMouseOver}
        // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
        onMouseOut={handleTableMouseOut}
      >
        <thead>
          <tr>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th />
            {allTeams.map((opponent, opponentIndex) => (
              <th
                key={opponent.id}
                className={clsx(
                  opponentIndex + 1 === hoverColumn && styles.hovered,
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
            <tr key={team.id}>
              <td>
                <div
                  className={styles.team}
                  style={{
                    backgroundImage: `url('${getCountryFlagUrl(team.country)}')`,
                  }}
                >
                  {team.name}
                </div>
              </td>
              {allTeams.map((opponent, opponentIndex) => {
                const isMatch = pairingsMap[`${team.id}:${opponent.id}`];
                const matchdayIndex = scheduleMap[`${team.id}:${opponent.id}`];
                return (
                  <td
                    key={opponent.id}
                    className={clsx(
                      isMatch && styles.match,
                      noCellAnimation && styles['no-animation'],
                      opponentIndex + 1 === hoverColumn && styles.hovered,
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
      </table>
    </>
  );
}

export default memo(Matrix);
