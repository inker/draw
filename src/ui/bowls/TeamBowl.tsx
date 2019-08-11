import React, {
  memo,
  useCallback,
} from 'react'
import styled from 'styled-components'

import Club from 'model/team/Club'
import NationalTeam from 'model/team/NationalTeam'

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

const TeamBall = styled(Ball)`
  background: ${
    ({ selected, notSelected }) => selected ? '#004' : notSelected ? '#ddd' : 'radial-gradient(#fff, #004)'
  };
`

interface Props {
  forceNoSelect?: boolean,
  display: boolean,
  selectedTeam: Team | null,
  pot: Team[],
  onPick: (i: number, teams: Team[]) => void,
}

const TeamBowl = ({
  forceNoSelect,
  display,
  pot,
  selectedTeam,
  onPick,
}: Props) => {
  const onBallPick = useCallback((ev: React.MouseEvent<HTMLDivElement>) => {
    const ball = ev.target as HTMLDivElement
    const i = pot.findIndex(team => team.id === ball.dataset.teamid)
    onPick(i, pot)
  }, [pot, onPick])

  const noSelect = forceNoSelect || selectedTeam

  return (
    <Root>
      {display && pot && pot.map(team => (
        <TeamBall
          key={team.id}
          data-teamid={team.id}
          selected={team === selectedTeam}
          notSelected={forceNoSelect || selectedTeam && team !== selectedTeam}
          noHover={noSelect}
          onClick={noSelect ? undefined : onBallPick}
        >
          {(team as Club).shortName || team.name}
        </TeamBall>
      ))}
    </Root>
  )
}

export default memo(TeamBowl)
