import * as React from 'react'
import styled from 'styled-components'

import { Team, GSTeam } from 'utils/team'
import Table from 'components/table/Table'
import Body from 'components/table/Body'

import Header from './PotHeader'
import Cell from './PotCell'

interface RootProps {
  highlighted: boolean
}

const Root = styled<RootProps>(Table)`
  transform: box-shadow 1s linear;
  ${props => props.highlighted && `
  `}
`

interface Props {
  isCurrent: boolean,
  potNum: number,
  teams: Team[],
  pickedTeams: Team[],
  selectedTeam: Team | null,
}

const Pot: React.SFC<Props> = ({
  isCurrent,
  potNum,
  teams,
  pickedTeams,
  selectedTeam,
}) => {
  return (
    <Root highlighted={isCurrent}>
      <Header
        highlighted={isCurrent}
        depleted={!teams || pickedTeams.length === teams.length}
      >
        Pot {potNum + 1}
      </Header>
      <Body>
        {teams && teams.map(team => {
          const {
            name,
            country,
            shortName,
            pairing,
          } = team as GSTeam
          return (
            <Cell
              key={team.id}
              data-cellId={team.id}
              title={pairing && `paired with ${pairing.name}`}
              selected={team === selectedTeam}
              picked={pickedTeams.includes(team)}
              country={country}
            >
              {shortName || name}
            </Cell>
          )
        })}
      </Body>
    </Root>
  )
}

export default Pot
