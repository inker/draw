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
}

function Schedule({ tournament, schedule }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (schedule.some(md => md.length > 0)) {
      const elements = document.getElementsByClassName(
        styles['match-pair-team'],
      );
      const offsetWidths = Iterator.from(elements).map(
        el => (el as HTMLElement).offsetWidth ?? 0,
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
      <ul className={clsx('reset-list', styles['calendar-container'])}>
        {schedule.map((md, i) => (
          <li>
            <div className={clsx(styles['matchday-root'], 'matchday')}>
              <div className={styles['matchday-header']}>MATCHDAY {i + 1}</div>
              {md.map((day, dayIndex) => (
                <>
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
                  {day.map(m => (
                    <div className={styles['match-pair']}>
                      <span className={styles['match-pair-team']}>
                        <ContentWithFlag country={m[0].country}>
                          {m[0].name}
                        </ContentWithFlag>
                      </span>
                      <span className={styles['match-pair-center']}>-</span>
                      <span className={styles['match-pair-team']}>
                        <ContentWithFlag country={m[1].country}>
                          {m[1].name}
                        </ContentWithFlag>
                      </span>
                    </div>
                  ))}
                </>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(Schedule);
