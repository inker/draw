import React from 'react'
import { difference, range } from 'lodash'

import Team from 'model/team'
import Table from 'ui/table/Table'
import Header from 'ui/table/Header'
import Body from 'ui/table/Body'
import Cell from './GroupCell'

interface Props {
  maxTeams: number,
  groupLetter: string,
  teams: Team[],
  potNum: number,
  possible: boolean,
  airborneTeams: Team[],
  background?: string,
  color?: string,
}

const Group: React.SFC<Props> = ({
  maxTeams,
  groupLetter,
  teams,
  potNum,
  possible,
  airborneTeams,
  background,
  color,
}) => {
  const nonAirborneTeams = difference(teams, airborneTeams)

  return (
    <Table>
      <Header
        background={background}
        color={color}
      >
        Group {groupLetter}
      </Header>
      <Body>
        {nonAirborneTeams.map((team, i) => (
          <Cell
            key={i}
            country={team.country}
            picked
          >
            {team.shortName || team.name}
          </Cell>
        ))}
        {range(nonAirborneTeams.length, maxTeams).map(i => (
          <Cell
            key={i}
            possible={i === potNum && possible}
            data-cellid={`${groupLetter}${i}`}
          />
        ))}
      </Body>
    </Table>
  )
}

export default Group
