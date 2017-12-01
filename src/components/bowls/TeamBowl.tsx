import React, { PureComponent } from 'react'
import styled from 'styled-components'

import Team from 'model/team'

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
  noHover: any,
  onClick: any,
}

const TeamBall = styled<TeamBallProps>(Ball)`
  background: ${
    ({ selected, notSelected }) => selected ? '#004' : notSelected ? '#ddd' : 'radial-gradient(#fff, #004)'
  };
`

interface Props {
  forceNoSelect?: boolean,
  calculating?: boolean,
  completed: boolean,
  selectedTeam: Team | null,
  pot: Team[],
  onPick: (i: number, teams: Team[]) => void,
}

class TeamBowl extends PureComponent<Props> {

  private onBallPick = (ev: React.MouseEvent<HTMLDivElement>) => {
    const {
      pot,
      onPick,
    } = this.props
    const ball = ev.target as HTMLDivElement
    const i = pot.findIndex(team => team.id === ball.dataset.teamid)
    onPick(i, pot)
  }

  render() {
    const {
      forceNoSelect,
      calculating,
      completed,
      pot,
      selectedTeam,
    } = this.props

    const noSelect = forceNoSelect || calculating || selectedTeam

    return (
      <Root>
        {!completed && pot &&
          pot.map((team, i) => (
            <TeamBall
              key={team.id}
              data-teamid={team.id}
              selected={team === selectedTeam}
              notSelected={forceNoSelect || selectedTeam && team !== selectedTeam}
              noHover={noSelect}
              onClick={!noSelect && this.onBallPick}
            >
              {team.shortName || team.name}
            </TeamBall>
          ))
        }
      </Root>
    )
  }
}

export default TeamBowl
