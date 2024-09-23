import { memo, useCallback, useContext, useRef, useState } from 'react';
import { ThemeContext } from 'styled-components';

import type Club from '#model/team/Club';
import type NationalTeam from '#model/team/NationalTeam';
import usePrevious from '#utils/hooks/usePrevious';
import useDidUpdate from '#utils/hooks/useDidUpdate';
import getTeamCountryName from '#utils/getTeamCountryName';
import ContentWithFlag from '#ui/table/ContentWithFlag';
import DummyContent from '#ui/table/DummyContent';
import MovingContent from '#ui/MovingContent';

import GroupCellBase from './GroupCellBase';

type Team = Club | NationalTeam;

interface Props {
  team?: Team;
  possible: boolean;
}

function GroupCellDeferred({ team, possible }: Props) {
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
      <GroupCellBase
        $picked={isPickedAnimation && !!displayedTeam}
        $possible={possible}
        onAnimationEnd={setIsPickedAnimationFalse}
      >
        {displayedTeam ? (
          <ContentWithFlag $country={getTeamCountryName(displayedTeam)}>
            {(displayedTeam as Club).shortName ?? displayedTeam.name}
          </ContentWithFlag>
        ) : (
          <DummyContent ref={destinationRef} />
        )}
      </GroupCellBase>
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

export default memo(GroupCellDeferred);
