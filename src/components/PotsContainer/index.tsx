import * as React from 'react'
import styled from 'styled-components'
import { difference } from 'lodash'

import { Team } from 'utils/team'
import Pot from './Pot'

const Root = styled.div`
  display: flex;
  flex-flow: row wrap;
  flex-wrap: nowrap;
  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`

interface Props {
  completed: boolean,
  initialPots: Team[][],
  pots: Team[][],
  groups: Team[][],
  selectedTeam: Team | null,
  currentPotNum: number,
}

const PotsContainer = ({
  completed,
  initialPots,
  pots,
  groups,
  selectedTeam,
  currentPotNum,
}: Props) => (
  <Root>
    {initialPots && initialPots.map((pot, i) => {
      const isCurrent = i === currentPotNum
      const pickedTeams = isCurrent ? difference(pot, pots[currentPotNum], [selectedTeam as Team]) : []
      return (
        <Pot
          key={pot[0].name}
          potNum={i}
          isCurrent={isCurrent}
          teams={pot}
          pickedTeams={pickedTeams}
          selectedTeam={selectedTeam}
        />
      )
    })}
  </Root>
)

export default PotsContainer
