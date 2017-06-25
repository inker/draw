import * as React from 'react'
import styled from 'styled-components'

import { Team, GSTeam } from 'utils/team'
import Table from '../table/Table'
import Header from '../table/Header'
import Body from '../table/Body'
import Cell from '../table/Cell'

const PotCell = styled(Cell)`
  ${props => props.selected && 'color: blue;'}
  ${props => props.picked && `
    filter: grayscale(0.5);
    opacity: 0.4;
  `}
`

interface TeamObj {
  team: Team | GSTeam,
  picked: boolean,
  selected: boolean,
}

interface Props {
  potNum: number,
  teams: TeamObj[],
}

const Pot = ({
  potNum,
  teams,
}: Props) => (
  <Table>
    <Header>
      Pot {potNum + 1}
    </Header>
    <Body>
      {teams && teams.map(teamObj => {
        const { team, picked, selected } = teamObj
        const { name, country } = team
        const pairing = team instanceof GSTeam ? team.pairing : null
        return (
          <PotCell
            key={team.id}
            data-cellId={team.id}
            title={pairing && `paired with ${pairing.name}`}
            selected={selected}
            picked={picked}
            country={country}
          >
            {name}
          </PotCell>
        )
      })}
    </Body>
  </Table>
)

export default Pot
