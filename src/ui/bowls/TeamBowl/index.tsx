import {
  memo,
  useCallback,
} from 'react'
import styled from 'styled-components'

import type Club from 'model/team/Club'
import type NationalTeam from 'model/team/NationalTeam'

import Ball from './Ball'

type Team = Club | NationalTeam

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 999px) {
    justify-content: center;
  }
`

interface Props {
  forceNoSelect?: boolean,
  display: boolean,
  displayTeams: boolean,
  selectedTeam: Team | null,
  pot: readonly Team[],
  onPick: (i: number, teams: readonly Team[]) => void,
}

function TeamBowl({
  forceNoSelect,
  display,
  displayTeams,
  pot,
  selectedTeam,
  onPick,
}: Props) {
  const onBallPick = useCallback((ev: React.MouseEvent<HTMLDivElement>) => {
    const ball = ev.target as HTMLDivElement
    const i = pot.findIndex(team => team.id === ball.dataset.teamid)
    onPick(i, pot)
  }, [pot, onPick])

  const noSelect = forceNoSelect || selectedTeam

  return (
    <Root>
      {display && pot.map(team => (
        <Ball
          key={team.id}
          data-teamid={team.id}
          selected={team === selectedTeam}
          $notSelected={forceNoSelect || !!selectedTeam && team !== selectedTeam}
          forceVisible={displayTeams}
          noHover={!!noSelect}
          onClick={noSelect ? undefined : onBallPick}
        >
          {(team as Club).shortName ?? team.name}
        </Ball>
      ))}
    </Root>
  )
}

export default memo(TeamBowl)
