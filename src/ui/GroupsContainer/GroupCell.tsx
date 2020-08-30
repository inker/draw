import React, {
  useState,
  useRef,
  useCallback,
  memo,
} from 'react'

import Club from 'model/team/Club'
import NationalTeam from 'model/team/NationalTeam'

import usePrevious from 'utils/hooks/usePrevious'

import ContentWithFlag from 'ui/table/ContentWithFlag'
import DummyContent from 'ui/table/DummyContent'
import MovingDiv from 'ui/MovingDiv'

import GroupCellContainer from './GroupCellContainer'
import getTeamCountryName from './getTeamCountryName'

type Team = Club | NationalTeam

interface Props {
  team?: Team,
  possible: boolean,
}

const GroupCell = ({
  team,
  possible,
}: Props) => {
  const prevTeam = usePrevious(team)
  const [displayedTeam, setDisplayedTeam] = useState(team)
  const to = useRef<HTMLElement | null>(null)

  const fill = useCallback(() => {
    setDisplayedTeam(team)
  }, [team])

  return (
    <>
      <GroupCellContainer
        hasTeam={!!displayedTeam}
        possible={possible}
      >
        {displayedTeam ? (
          <ContentWithFlag country={getTeamCountryName(displayedTeam)}>
            {(displayedTeam as Club).shortName ?? displayedTeam.name}
          </ContentWithFlag>
        ) : (
          <DummyContent ref={to} />
        )}
      </GroupCellContainer>
      {team && team !== prevTeam && (
        <MovingDiv
          from={`[data-cellid='${team.id}']`}
          to={to}
          duration={350}
          data={team}
          onAnimationEnd={fill}
        />
      )}
    </>
  )
}

export default memo(GroupCell)
