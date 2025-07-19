import { memo, useCallback, useRef, useState } from 'react';
import clsx from 'clsx';

import type Team from '#model/team/Club';
import usePrevious from '#utils/hooks/usePrevious';
import useDidUpdate from '#utils/hooks/useDidUpdate';
import getTeamCountryName from '#utils/getTeamCountryName';
import ContentWithFlag from '#ui/table/ContentWithFlag';
import Content from '#ui/table/Content';
import MovingContent from '#ui/MovingContent';
import * as cellStyles from '#ui/table/cell.module.scss';

import * as styles from './styles.module.scss';

interface Props {
  team: Team | undefined;
}

function MatchupCellDeferred({ team }: Props) {
  const prevTeam = usePrevious(team);
  const [displayedTeam, setDisplayedTeam] = useState(team);
  const [isPickedAnimation, setIsPickedAnimation] = useState(false);
  const destinationRef = useRef<HTMLElement | null>(null);

  const setIsPickedAnimationFalse = useCallback(() => {
    setIsPickedAnimation(false);
  }, []);

  const fill = useCallback(() => {
    setDisplayedTeam(team);
    setIsPickedAnimation(true);
  }, [team]);

  useDidUpdate(() => {
    setIsPickedAnimationFalse();
  }, []);

  return (
    <>
      <td
        className={clsx(
          cellStyles.root,
          styles['matchup-cell-base'],
          isPickedAnimation && !!displayedTeam && styles.picked,
        )}
        onAnimationEnd={setIsPickedAnimationFalse}
      >
        {displayedTeam ? (
          <ContentWithFlag country={getTeamCountryName(displayedTeam)}>
            {displayedTeam.shortName ?? displayedTeam.name}
          </ContentWithFlag>
        ) : (
          <Content ref={destinationRef} />
        )}
      </td>
      {team && team !== prevTeam && (
        <MovingContent
          from={`[data-cellid='${team.id}']`}
          to={destinationRef}
          duration={350}
          team={team}
          onAnimationEnd={fill}
        />
      )}
    </>
  );
}

export default memo(MatchupCellDeferred);
