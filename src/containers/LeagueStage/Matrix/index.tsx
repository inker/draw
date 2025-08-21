import { memo, useMemo } from 'react';
import clsx from 'clsx';

import getCountryFlagUrl from '#utils/getCountryFlagUrl';
import useIsDarkMode from '#utils/hooks/useIsDarkMode';
import { type Country } from '#model/types';
import { css } from '#ui/GlobalStyle';

import Table from './Table';
import * as styles from './styles.module.scss';

// eslint-disable-next-line no-sparse-arrays
const angleByIndex = [, 0, 5, 3, 2, 6, 4, 1];

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
  const isDarkMode = useIsDarkMode();

  const pairingsSet = useMemo(
    () =>
      new Set(
        pairings
          .values()
          .map(
            pairing =>
              `${pairing[0].id}:${pairing[1].id}` satisfies `${string}:${string}`,
          ),
      ),
    [pairings],
  );

  const scheduleMap = useMemo(() => {
    const map = new Map<`${string}:${string}`, number>();
    for (const [mdIndex, md] of schedule.entries()) {
      for (const day of md) {
        for (const m of day) {
          map.set(`${m[0].id}:${m[1].id}`, mdIndex);
        }
      }
    }
    return map;
  }, [schedule]);

  const getMatchdayColor = (index: number) => {
    if (index === 0) {
      return undefined;
    }
    const turn = (angleByIndex[index] ?? index) / (numMatchdays - 1);
    const deg = turn * 360;
    return `lch(50% 100 ${deg})`;
  };

  return (
    <Table
      className={clsx(styles.table, isDarkMode && styles.dark)}
      blockSize={potSize}
      hoverStyle={css`
        background-color: var(--hover-color);
      `}
    >
      <thead>
        <tr>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <th />
          {allTeams.map(opponent => (
            <th key={opponent.id}>
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
            {allTeams.map(opponent => {
              const isMatch = pairingsSet.has(`${team.id}:${opponent.id}`);
              const matchdayIndex = scheduleMap.get(
                `${team.id}:${opponent.id}`,
              );
              return (
                <td
                  key={opponent.id}
                  className={clsx(
                    isMatch && styles.match,
                    noCellAnimation && styles['no-animation'],
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
