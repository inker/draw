import * as React from 'react'

import { Team, GSTeam } from 'utils/team'
import Table from 'components/table/Table'
import Header from 'components/table/Header'
import Body from 'components/table/Body'

import Cell from './PotCell'

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
  </Table>
)

export default Pot
