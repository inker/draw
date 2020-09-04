import React, {
  useState,
  useRef,
  useCallback,
  memo,
} from 'react'

import Club from 'model/team/Club'
import NationalTeam from 'model/team/NationalTeam'

import usePrevious from 'utils/hooks/usePrevious'
import getTeamCountryName from 'utils/getTeamCountryName'

import ContentWithFlag from 'ui/table/ContentWithFlag'
import DummyContent from 'ui/table/DummyContent'
import MovingDiv from 'ui/MovingDiv'

import GroupCellBase from './GroupCellBase'

type Team = Club | NationalTeam

interface Props {
  team?: Team,
  possible: boolean,
}

const GroupCellDeferred = ({
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
      <GroupCellBase
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
      </GroupCellBase>
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

export default memo(GroupCellDeferred)
