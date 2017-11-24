import * as React from 'react'
import styled from 'styled-components'
import { range } from 'lodash'

import Team from 'model/team'
import Matchup from './Matchup'

import Table from 'components/table/Table'

const RootTable = styled(Table)`
  width: 340px;
  align-self: center;
  max-width: initial;
`

interface Props {
  currentPotNum: number,
  currentMatchupNum: number,
  matchups: [Team, Team][],
  airborneTeams: Team[],
}

const MatchupContainer: React.SFC<Props> = ({
  currentPotNum,
  matchups,
  airborneTeams,
}) => (
  <RootTable>
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
  </RootTable>
)

export default MatchupContainer
