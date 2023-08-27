import {
  forwardRef,
  memo,
} from 'react'
import styled from 'styled-components'

import type Team from 'model/team/Club'

import Table from 'ui/table/Table'

import Matchup from './Matchup'

const RootTable = styled(Table)`
  align-self: center;
  width: auto;
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
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          teams={matchup}
        />
      ))}
    </tbody>
  </RootTable>
))

export default memo(MatchupContainer)
