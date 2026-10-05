import { memo, useMemo } from 'react';
import { orderBy } from 'lodash';

import teamsThatCannotHostSameDay from '#engine/predicates/epl/utils/teamsThatCannotHostSameDay';

import * as styles from './styles.module.scss';

interface Team {
  name: string;
}

interface Props {
  teams: readonly Team[];
}

function ScheduleCreationDescription({ teams }: Props) {
  const cannotHostSameDayTeams = useMemo(
    () =>
      orderBy(
        teamsThatCannotHostSameDay
          .filter(([a, b]) =>
            [a, b].every(name => teams.some(team => team.name === name)),
          )
          .map(pair => orderBy(pair) as [string, string]),
        [pair => pair[0], pair => pair[1]],
      ),
    [teams],
  );

  return (
    <div className={styles.root}>
      The following scheduling principles apply:
      <ul className={styles['main-list']}>
        <li>Each club must play exactly one match per matchday.</li>
        <li>
          No club may play more than two consecutive home or away fixtures.
        </li>
        <li>
          Across any five consecutive matchdays, each club must play three home
          and two away fixtures or vice versa.
        </li>
        <li>
          Across the first two and last two matchdays, each club must play one
          home and one away fixture.
        </li>
        <li>
          Across Boxing Day and New Year&apos;s Day, each club must play one
          home and one away fixture.
        </li>
        <li>
          No matchday may hold more than one match between two of the big six
          (Arsenal, Chelsea, Liverpool, Man City, Man United and Tottenham), and
          Boxing Day may hold none.
        </li>
        <li>
          Clubs from the same city must not be scheduled to play at home on the
          same matchday.{' '}
          {cannotHostSameDayTeams.length === 0 ? (
            <>Not applicable: no such clubs are in the league this season.</>
          ) : (
            <>
              These pairs are:
              <ul>
                {cannotHostSameDayTeams.map(([a, b]) => (
                  <li key={`${a}:${b}`}>
                    {a} &amp; {b}
                  </li>
                ))}
              </ul>
            </>
          )}
        </li>
      </ul>
    </div>
  );
}

export default memo(ScheduleCreationDescription);
