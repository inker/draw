import React, {
  useState,
  useRef,
  useCallback,
  memo,
} from 'react'

import Team from 'model/team/Club'

import usePrevious from 'utils/hooks/usePrevious'
import getTeamCountryName from 'utils/getTeamCountryName'

import ContentWithFlag from 'ui/table/ContentWithFlag'
import DummyContent from 'ui/table/DummyContent'
import MovingContent from 'ui/MovingContent'

import MatchupCellBase from './MatchupCellBase'

interface Props {
  team: Team,
}

const MatchupCellDeferred = ({
  team,
}: Props) => {
  const prevTeam = usePrevious(team)
  const [displayedTeam, setDisplayedTeam] = useState(team)
  const to = useRef<HTMLElement | null>(null)

  const fill = useCallback(() => {
    setDisplayedTeam(team)
  }, [team])

  return (
    <>
      <MatchupCellBase hasTeam={!!displayedTeam}>
        {displayedTeam ? (
          <ContentWithFlag country={getTeamCountryName(displayedTeam)}>
            {displayedTeam.shortName ?? displayedTeam.name}
          </ContentWithFlag>
        ) : (
          <DummyContent ref={to} />
        )}
      </MatchupCellBase>
      {team && team !== prevTeam && (
        <MovingContent
          from={`[data-cellid='${team.id}']`}
          to={to}
          duration={350}
          team={team}
          onAnimationEnd={fill}
        />
      )}
    </>
  )
}

export default memo(MatchupCellDeferred)
