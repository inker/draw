import { memo, useMemo } from 'react';
import { orderBy, uniq } from 'lodash';

import type Team from '#model/team/GsTeam';
import coldCountries from '#engine/predicates/uefa/utils/coldCountries';
import teamsSharingStadium from '#engine/predicates/uefa/utils/teamsSharingStadium';

import * as styles from './styles.module.scss';

interface Props {
  season: number;
  teams: readonly Team[];
}

function ScheduleCreationDescription({ season, teams }: Props) {
  const coldTeamNames = useMemo(() => {
    const isFromColdCountry = coldCountries(season);
    return orderBy(
      uniq(
        teams.filter(team => isFromColdCountry(team)).map(team => team.name),
      ),
    );
  }, [season, teams]);

  const stadiumSharingTeams = useMemo(() => {
    const stadiumSharingTeamIndices = teamsSharingStadium
      .map(namePair => {
        const [a, b] = namePair;
        const aTeam = teams.findIndex(t => t.name === a);
        const bTeam = teams.findIndex(t => t.name === b);
        return aTeam > -1 && bTeam > -1 ? ([aTeam, bTeam] as const) : undefined;
      })
      .filter(Boolean) as (readonly [number, number])[];

    return orderBy(
      stadiumSharingTeamIndices.map(indexPair => {
        const [a, b] = indexPair;
        const aTeam = teams[a];
        const bTeam = teams[b];
        return orderBy([aTeam.name, bTeam.name]) as [string, string];
      }),
      [pair => pair[0], pair => pair[1]],
    );
  }, [teams]);

  return (
    <div className={styles.root}>
      The following scheduling principles apply:
      <ul className={styles['main-list']}>
        <li>Each club must play exactly one match per matchday.</li>
        <li>
          No club may play more than two consecutive home or away fixtures.
        </li>
        <li>
          Across the first two and last two matchdays, each club must play one
          home and one away fixture.
        </li>
        <li>
          Clubs sharing a stadium, or whose stadiums are in close proximity,
          must not be scheduled to play at home on the same matchday.{' '}
          {stadiumSharingTeams.length === 0 ? (
            <>Not applicable: no such clubs are present in this draw.</>
          ) : (
            <>
              These pairs are:
              <ul>
                {stadiumSharingTeams.map(([a, b]) => (
                  <li key={`${a}:${b}`}>
                    {a} &amp; {b}
                  </li>
                ))}
              </ul>
            </>
          )}
        </li>
        <li>
          For climatic reasons, the following clubs must be scheduled away from
          home on the final matchday:{' '}
          {coldTeamNames.length === 0 ? (
            <>Not applicable: no affected clubs in this draw.</>
          ) : (
            <ul>
              {coldTeamNames.map(name => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}

export default memo(ScheduleCreationDescription);
