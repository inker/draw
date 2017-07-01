import * as React from 'react'
import styled from 'styled-components'

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
  pots: Team[][],
  groups: Team[][],
  selectedTeam: Team | null,
  currentPotNum: number,
}

const PotsContainer = ({
  completed,
  pots,
  groups,
  selectedTeam,
  currentPotNum,
}: Props) => (
  <Root>
    {pots && pots.map((pot, i) => (
      <Pot
        key={pot[0].name}
        potNum={i}
        isCurrent={i === currentPotNum}
        teams={pot}
        pickedTeams={pot.filter(team => groups.some(group => group.includes(team)))}
        selectedTeam={selectedTeam}
      />
    ))}
  </Root>
)

export default PotsContainer
