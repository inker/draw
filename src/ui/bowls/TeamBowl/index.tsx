import { memo, useCallback } from 'react';

import type Club from '#model/team/Club';
import type NationalTeam from '#model/team/NationalTeam';

import Ball from './Ball';
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
          <Ball
            key={team.id}
            data-teamid={team.id}
            selected={team === selectedTeam}
            $notSelected={
              forceNoSelect || (!!selectedTeam && team !== selectedTeam)
            }
            forceVisible={displayTeams}
            noHover={!!noSelect}
            onClick={noSelect ? undefined : handleBallPick}
          >
            {(team as Club).shortName ?? team.name}
          </Ball>
        ))}
    </div>
  );
}

export default memo(TeamBowl);
