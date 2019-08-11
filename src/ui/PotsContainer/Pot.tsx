import React, { memo } from 'react'
import styled from 'styled-components'

import Team from 'model/team'
import GSTeam from 'model/team/GSTeam'
import Table from 'ui/table/Table'
import Body from 'ui/table/Body'
import Header from './PotHeader'
import Cell from './PotCell'

const Root = styled(Table)`
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
  background?: string,
  color?: string,
}

const Pot = ({
  isCurrent,
  potNum,
  teams,
  pickedTeams,
  selectedTeams,
  depleted,
  background,
  color,
}: Props) => {
  return (
    <Root highlighted={isCurrent}>
      <Header
        highlighted={isCurrent}
        depleted={depleted}
        background={background}
        color={color}
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
              data-cellid={team.id}
              title={pairing && `paired with ${pairing.shortName || pairing.name}`}
              selected={selectedTeams && selectedTeams.includes(team)}
              picked={pickedTeams.includes(team)}
              country={country || name}
            >
              {shortName || name}
            </Cell>
          )
        })}
      </Body>
    </Root>
  )
}

export default memo(Pot)
