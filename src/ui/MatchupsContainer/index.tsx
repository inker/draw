import React from 'react'
import styled from 'styled-components'

import Team from 'model/team'
import Matchup from './Matchup'

import Table from 'ui/table/Table'

const RootTable = styled(Table)`
  width: auto;
  align-self: center;
  max-width: initial;
`

interface Props {
  currentMatchupNum: number,
  matchups: [Team, Team][],
  airborneTeams: Team[],
}

const MatchupContainer: React.SFC<Props> = ({
  matchups,
  airborneTeams,
}) => (
  <RootTable>
    {matchups && matchups.map((matchup, i) => (
      <Matchup
        index={i}
        teams={matchup}
        airborneTeams={airborneTeams}
      />
    ))}
  </RootTable>
)

export default MatchupContainer
