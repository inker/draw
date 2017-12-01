import React from 'react'
import styled from 'styled-components'

import Team from 'model/team'
import GSTeam from 'model/team/GSTeam'
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
  selectedTeams: Team[] | null,
  depleted: boolean,
}

const Pot: React.SFC<Props> = ({
  isCurrent,
  potNum,
  teams,
  pickedTeams,
  selectedTeams,
  depleted,
}) => {
  return (
    <Root highlighted={isCurrent}>
      <Header
        highlighted={isCurrent}
        depleted={depleted}
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
              selected={selectedTeams && selectedTeams.includes(team)}
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
