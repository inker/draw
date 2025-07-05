import { memo, useCallback, useContext, useRef, useState } from 'react';
import { ThemeContext } from 'styled-components';
import clsx from 'clsx';

import type Team from '#model/team/Club';
import usePrevious from '#utils/hooks/usePrevious';
import useDidUpdate from '#utils/hooks/useDidUpdate';
import getTeamCountryName from '#utils/getTeamCountryName';
import ContentWithFlag from '#ui/table/ContentWithFlag';
import DummyContent from '#ui/table/DummyContent';
import MovingContent from '#ui/MovingContent';
import Cell from '#ui/table/Cell';

import * as styles from './styles.module.scss';

interface Props {
  team: Team | undefined;
}

function MatchupCellDeferred({ team }: Props) {
  const prevTeam = usePrevious(team);
  const [displayedTeam, setDisplayedTeam] = useState(team);
  const [isPickedAnimation, setIsPickedAnimation] = useState(false);
  const themeContext = useContext(ThemeContext);
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
  }, [themeContext]);

  return (
    <>
      <Cell
        className={clsx(
          styles['matchup-cell-base'],
          isPickedAnimation && !!displayedTeam && styles.picked,
        )}
        onAnimationEnd={setIsPickedAnimationFalse}
      >
        {displayedTeam ? (
          <ContentWithFlag $country={getTeamCountryName(displayedTeam)}>
            {displayedTeam.shortName ?? displayedTeam.name}
          </ContentWithFlag>
        ) : (
          <DummyContent ref={destinationRef} />
        )}
      </Cell>
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
