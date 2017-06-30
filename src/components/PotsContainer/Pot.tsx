import * as React from 'react'
import styled from 'styled-components'

import { Team, GSTeam } from 'utils/team'
import Table from 'components/table/Table'
import Body from 'components/table/Body'

import Header from './PotHeader'
import Cell from './PotCell'

const Root = styled(Table)`
  transform: box-shadow 1s linear;
  ${props => props.highlighted && `
  `}
`

interface TeamObj {
  team: Team,
  picked: boolean,
  selected: boolean,
}

interface Props {
  isCurrent: boolean,
  potNum: number,
  teams: TeamObj[],
}

const Pot = ({
  isCurrent,
  potNum,
  teams,
}: Props) => (
  <Root highlighted={isCurrent}>
    <Header
      highlighted={isCurrent}
      depleted={!teams || teams.every(team => team.picked)}
    >
      Pot {potNum + 1}
    </Header>
    <Body>
      {teams && teams.map(teamObj => {
        const { team, picked, selected } = teamObj
        const { name, country } = team
        const pairing = team instanceof GSTeam ? team.pairing : null
        return (
          <Cell
            key={team.id}
            data-cellId={team.id}
            title={pairing && `paired with ${pairing.name}`}
            selected={selected}
            picked={picked}
            country={country}
          >
            {name}
          </Cell>
        )
      })}
    </Body>
  </Root>
)

export default Pot
