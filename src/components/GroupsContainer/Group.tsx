import * as React from 'react'

import { Team } from 'utils/team'
import Table from 'components/table/Table'
import Header from 'components/table/Header'
import Body from 'components/table/Body'

import Cell from './GroupCell'

interface Props {
  maxTeams: number,
  groupLetter: string,
  teams: Team[],
  potNum: number,
  possible: boolean,
  airborneTeams: Team[],
}

const Group = ({
  maxTeams,
  groupLetter,
  teams,
  potNum,
  possible,
  airborneTeams,
}: Props) => (
  <Table>
    <Header>
      Group {groupLetter}
    </Header>
    <Body>
      {teams.concat(new Array(maxTeams - teams.length).fill(null)).map((team, i) => {
        if (team === null || airborneTeams.includes(team)) {
          return (
            <Cell
              possible={i === potNum && possible}
              data-cellid={`${groupLetter}${i}`}
            />
          )
        }
        const { name, country, id } = team
        return (
          <Cell
            country={country}
            picked
            data-teamid={id}
          >
            {name}
          </Cell>
        )
      })}
    </Body>
  </Table>
)

export default Group
