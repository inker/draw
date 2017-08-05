import * as React from 'react'
import styled from 'styled-components'
import { Team } from 'utils/team'

import Ball from './Ball'

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 999px) {
    justify-content: center;
  }
`

interface TeamBallProps {
  selected: boolean,
  notSelected: boolean | null,
}

const TeamBall = styled<TeamBallProps>(Ball)`
  background: ${
    ({ selected, notSelected }) => selected ? '#004' : notSelected ? '#ddd' : 'radial-gradient(#fff, #004)'
  };
`

interface Props {
  calculating?: boolean,
  completed: boolean,
  selectedTeam: Team | null,
  pot: Team[],
  onPick: any,
}

const TeamBowl: React.SFC<Props> = ({
  calculating,
  completed,
  pot,
  selectedTeam,
  onPick,
}) => {
  const noSelect = calculating || selectedTeam
  return (
    <Root>
      {!completed && pot &&
        pot.map((team, i) => (
          <TeamBall
            key={team.id}
            data-teamid={team.id}
            selected={team === selectedTeam}
            notSelected={selectedTeam && team !== selectedTeam}
            noHover={noSelect}
            onClick={!noSelect && onPick}
          >
            {team.shortName || team.name}
          </TeamBall>
        ))
      }
    </Root>
  )
}

export default TeamBowl
