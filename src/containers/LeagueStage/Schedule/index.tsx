import { memo, useLayoutEffect, useRef } from 'react';
import clsx from 'clsx';

import ContentWithFlag from '#ui/table/ContentWithFlag';
import { type Country } from '#model/types';
import type Tournament from '#model/Tournament';

import * as styles from './styles.module.css';

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
    const root = rootRef.current;
    if (!root || !schedule.some(md => md.length > 0)) {
      return;
    }
    const measure = () => {
      // the old width is the teams' min-width,
      // so it has to go for the names to shrink back to their own width
      root.style.removeProperty('--team-width');
      const elements = root.getElementsByClassName(
        styles['match-pair-team'],
      ) as HTMLCollectionOf<HTMLElement>;
      // offsetWidth rounds a fractional width down,
      // which leaves the row a fraction of a pixel too narrow & wraps it
      const widths = Iterator.from(elements).map(
        el => el.getBoundingClientRect().width,
      );
      const maxWidth = Math.ceil(Math.max(...widths));
      root.style.setProperty('--team-width', `${maxWidth}px`);
    };
    measure();
    // the columns are sized from this width,
    // and the flags & fonts change size at the phone breakpoint
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    return () => {
      observer.disconnect();
    };
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
          <li
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            className={clsx(styles['matchday-root'], 'matchday')}
          >
            <div className={styles['matchday-header']}>MATCHDAY {i + 1}</div>
            <ul className="reset-list">
              {md.map((day, dayIndex) => (
                <li
                  // eslint-disable-next-line react/no-array-index-key
                  key={dayIndex}
                  className={styles['matchday-day']}
                >
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
                      <li
                        key={`${m[0].name}:${m[1].name}`}
                        className={styles['match-item']}
                      >
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
