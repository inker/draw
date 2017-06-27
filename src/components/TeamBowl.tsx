import * as React from 'react'
import styled from 'styled-components'
import { Team } from '../utils/team'

import Ball from './Ball'

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`

const TeamBall = styled(Ball)`
  background: ${({ picked, notPicked }) => picked ? '#004' : notPicked ? '#ddd' : 'radial-gradient(#fff, #004)'};
`

interface Props {
  completed: boolean,
  pickedTeam: Team | null,
  pot: Team[],
  dontTouch: boolean,
  onPick: any,
}

const TeamBowl = ({
  completed,
  pot,
  pickedTeam,
  dontTouch,
  onPick,
}: Props) => {
  return (
    <div>
      {!completed && pot &&
        pot.map((team, i) => (
          <TeamBall
            key={team.id}
            data-teamid={team.id}
            picked={team === pickedTeam}
            notPicked={pickedTeam && team !== pickedTeam}
            noHover={pickedTeam}
            onClick={!pickedTeam && onPick}
          >
            {team.name}
          </TeamBall>
        ))
      }
    </div>
  )
}

export default TeamBowl
