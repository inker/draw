import * as React from 'react'
import styled from 'styled-components'
import { range } from 'lodash'

import Team from 'model/team'
import Matchup from './Matchup'

const Root = styled.div`

`

interface Props {
  currentPotNum: number,
  currentMatchupNum: number,
  matchups: [Team, Team][],
  selectedTeam: Team | null,
  airborneTeams: Team[],
}

const MatchupContainer: React.SFC<Props> = ({
  currentPotNum,
  matchups,
  selectedTeam,
  airborneTeams,
}) => (
  <Root>
    {matchups && matchups.map((matchup, i) => (
      <Matchup
        index={i}
        teams={matchup}
        potNum={currentPotNum}
        airborneTeams={airborneTeams}
      />
    ))}
    {range(matchups.length, 8).map(i => (
      <Matchup
        index={i}
        teams={null}
        potNum={currentPotNum}
        airborneTeams={airborneTeams}
      />
    ))}
  </Root>
)

export default MatchupContainer
