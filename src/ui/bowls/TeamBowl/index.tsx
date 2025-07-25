import { memo, useCallback } from 'react';
import clsx from 'clsx';

import type Club from '#model/team/Club';
import type NationalTeam from '#model/team/NationalTeam';

import BowlBall from '../BowlBall';

import * as styles from './styles.module.scss';

type Team = Club | NationalTeam;

interface Props {
  forceNoSelect?: boolean;
  display: boolean;
  displayTeams: boolean;
  selectedTeam: Team | null;
  pot: readonly Team[];
  onPick: (i: number, teams: readonly Team[]) => void;
}

function TeamBowl({
  forceNoSelect,
  display,
  displayTeams,
  pot,
  selectedTeam,
  onPick,
}: Props) {
  const handleBallPick = useCallback(
    (ev: React.MouseEvent<HTMLDivElement>) => {
      const ball = ev.target as HTMLDivElement;
      const i = pot.findIndex(team => team.id === ball.dataset.teamid);
      onPick(i, pot);
    },
    [pot, onPick],
  );

  const noSelect = forceNoSelect || selectedTeam;

  return (
    <div className={styles.root}>
      {display &&
        pot.map(team => (
          <BowlBall
            key={team.id}
            data-teamid={team.id}
            className={clsx(
              styles['team-ball'],
              team === selectedTeam && styles.selected,
              (forceNoSelect || (!!selectedTeam && team !== selectedTeam)) &&
                styles['not-selected'],
              !!noSelect && styles['no-hover'],
            )}
            selected={team === selectedTeam}
            forceVisible={displayTeams}
            noHover={!!noSelect}
            onClick={noSelect ? undefined : handleBallPick}
          >
            {(team as Club).shortName ?? team.name}
          </BowlBall>
        ))}
    </div>
  );
}

export default memo(TeamBowl);
