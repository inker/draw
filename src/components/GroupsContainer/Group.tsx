import React from 'react'
import { difference, range } from 'lodash'

import Team from 'model/team'
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

const Group: React.SFC<Props> = ({
  maxTeams,
  groupLetter,
  teams,
  potNum,
  possible,
  airborneTeams,
}) => {
  const nonAirborneTeams = difference(teams, airborneTeams)
  return (
    <Table>
      <Header>
        Group {groupLetter}
      </Header>
      <Body>
        {nonAirborneTeams.map((team, i) => (
          <Cell
            country={team.country}
            picked
          >
            {team.shortName || team.name}
          </Cell>
        ))}
        {range(nonAirborneTeams.length, maxTeams).map(i => (
          <Cell
            possible={i === potNum && possible}
            data-cellid={`${groupLetter}${i}`}
          />
        ))}
      </Body>
    </Table>
  )
}

export default Group
