import { memo, useLayoutEffect } from 'react';
import clsx from 'clsx';

import ContentWithFlag from '#ui/table/ContentWithFlag';
import { type Country } from '#model/types';
import type Tournament from '#model/Tournament';
import getRandomId from '#utils/getRandomId';

import * as styles from './styles.module.scss';

const scheduleTeamWrapperClass = getRandomId(`css-class-`);

interface Team {
  name: string;
  country: Country;
}

interface Props {
  tournament: Tournament;
  schedule: readonly (readonly (readonly (readonly [Team, Team])[])[])[];
}

function Schedule({ tournament, schedule }: Props) {
  useLayoutEffect(() => {
    if (schedule.some(md => md.length > 0)) {
      const elements = document.getElementsByClassName(
        scheduleTeamWrapperClass,
      );
      const offsetWidths = [...elements].map(
        el => (el as HTMLElement).offsetWidth ?? 0,
      );
      const maxOffsetWidth = Math.max(...offsetWidths);
      for (const element of elements) {
        (element as HTMLElement).style.minWidth = `${maxOffsetWidth}px`;
      }
    }
  }, [schedule]);

  return (
    <div className={styles.root}>
      <div className={styles['calendar-container']}>
        {schedule.map((md, i) => (
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
                    <span className={scheduleTeamWrapperClass}>
                      <ContentWithFlag country={m[0].country}>
                        {m[0].name}
                      </ContentWithFlag>
                    </span>
                    <span className={styles['match-pair-center']}>-</span>
                    <span className={scheduleTeamWrapperClass}>
                      <ContentWithFlag country={m[1].country}>
                        {m[1].name}
                      </ContentWithFlag>
                    </span>
                  </div>
                ))}
              </>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(Schedule);
