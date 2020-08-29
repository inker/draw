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
}

const MatchupContainer = forwardRef((
  {
    matchups,
  }: Props,
  ref: any,
) => (
  <RootTable ref={ref}>
    <tbody>
      {matchups?.map((matchup, i) => (
        <Matchup
          key={i}
          teams={matchup}
        />
      ))}
    </tbody>
  </RootTable>
))

export default memo(MatchupContainer)
