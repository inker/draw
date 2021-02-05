import {
  useState,
  useRef,
  useContext,
  useCallback,
  memo,
} from 'react'
import { ThemeContext } from 'styled-components'

import Team from 'model/team/Club'

import usePrevious from 'utils/hooks/usePrevious'
import useDidUpdate from 'utils/hooks/useDidUpdate'
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
  const [isPickedAnimation, setIsPickedAnimation] = useState(false)
  const themeContext = useContext(ThemeContext)
  const to = useRef<HTMLElement | null>(null)

  const setIsPickedAnimationFalse = useCallback(() => setIsPickedAnimation(false), [])

  const fill = useCallback(() => {
    setDisplayedTeam(team)
    setIsPickedAnimation(true)
  }, [team])

  useDidUpdate(() => {
    setIsPickedAnimationFalse()
  }, [themeContext])

  return (
    <>
      <MatchupCellBase
        picked={isPickedAnimation && !!displayedTeam}
        onAnimationEnd={setIsPickedAnimationFalse}
      >
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
