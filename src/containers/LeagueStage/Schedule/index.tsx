import { memo, useLayoutEffect, useRef } from 'react';
import clsx from 'clsx';

import ContentWithFlag from '#ui/table/ContentWithFlag';
import { type Country } from '#model/types';
import type Tournament from '#model/Tournament';

import * as styles from './styles.module.scss';

interface Team {
  name: string;
  country: Country;
}

interface Props {
  tournament: Tournament;
  schedule: readonly (readonly (readonly (readonly [Team, Team])[])[])[];
  /**
   * An icon to show in place of the team's country flag
   */
  getIconUrl?: (team: Team) => string | undefined;
}

function Schedule({ tournament, schedule, getIconUrl }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (schedule.some(md => md.length > 0)) {
      const elements = document.getElementsByClassName(
        styles['match-pair-team'],
      ) as HTMLCollectionOf<HTMLElement>;
      const offsetWidths = Iterator.from(elements).map(
        el => el.offsetWidth ?? 0,
      );
      const maxOffsetWidth = Math.max(...offsetWidths);
      if (rootRef.current) {
        rootRef.current.style.setProperty(
          '--team-width',
          `${maxOffsetWidth}px`,
        );
      }
    }
  }, [schedule]);

  return (
    <div
      ref={rootRef}
      className={styles.root}
    >
      <ul
        className={clsx(
          'reset-list',
          styles['calendar-container'],
          schedule.length > 8 && styles['take-all-space'],
        )}
      >
        {schedule.map((md, i) => (
          <li className={clsx(styles['matchday-root'], 'matchday')}>
            <div className={styles['matchday-header']}>MATCHDAY {i + 1}</div>
            <ul className="reset-list">
              {md.map((day, dayIndex) => (
                <li className={styles['matchday-day']}>
                  {tournament !== 'epl' && (
                    <div className={styles['day-header']}>
                      {tournament === 'cl'
                        ? dayIndex === 2
                          ? 'Thursday'
                          : dayIndex === 1 || md.length === 1
                            ? 'Wednesday'
                            : 'Tuesday'
                        : dayIndex === 1 || md.length === 1
                          ? 'Night'
                          : 'Evening'}
                    </div>
                  )}
                  <ul className="reset-list">
                    {day.map(m => (
                      <li className={styles['match-item']}>
                        <span>
                          <span className={styles['match-pair-team']}>
                            <ContentWithFlag
                              className={styles['content-with-flag']}
                              country={m[0].country}
                              iconUrl={getIconUrl?.(m[0])}
                            >
                              {m[0].name}
                            </ContentWithFlag>
                          </span>
                          <span className={styles['match-pair-center']}>
                            {' - '}
                          </span>
                          <span className={styles['match-pair-team']}>
                            <ContentWithFlag
                              className={styles['content-with-flag']}
                              country={m[1].country}
                              iconUrl={getIconUrl?.(m[1])}
                            >
                              {m[1].name}
                            </ContentWithFlag>
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(Schedule);
