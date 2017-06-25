import * as React from 'react'
import styled from 'styled-components'

import { Team } from 'utils/team'
import Pot from './Pot'

const Root = styled.div`
  display: flex;
`

interface Props {
  completed: boolean,
  pots: Team[][],
  groups: Team[][],
  pickedTeam: Team | null,
}

const PotsContainer = ({
  completed,
  pots,
  groups,
  pickedTeam,
}: Props) => (
  <Root>
    {pots && pots.map((pot, i) => (
      <Pot
        key={pot[0].name}
        potNum={i}
        teams={pot.map(team => ({
          team,
          selected: team === pickedTeam,
          picked: groups.some(group => group.includes(team)),
        }))}
      />
    ))}
  </Root>
)

export default PotsContainer
