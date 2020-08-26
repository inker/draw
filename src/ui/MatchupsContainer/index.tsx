import React, {
  memo,
  forwardRef,
} from 'react'
import styled from 'styled-components'

import Team from 'model/team/Club'

import Table from 'ui/table/Table'

import Matchup from './Matchup'

const RootTable = styled(Table)`
  width: auto;
  align-self: center;
  max-width: initial;
`

interface Props {
  matchups: readonly [Team, Team][],
  airborneTeams: readonly Team[],
}

const MatchupContainer = forwardRef((
  {
    matchups,
    airborneTeams,
  }: Props,
  ref: any,
) => (
  <RootTable ref={ref}>
    <tbody>
      {matchups?.map((matchup, i) => (
        <Matchup
          key={i}
          index={i}
          teams={matchup}
          airborneTeams={airborneTeams}
        />
      ))}
    </tbody>
  </RootTable>
))

export default memo(MatchupContainer)
