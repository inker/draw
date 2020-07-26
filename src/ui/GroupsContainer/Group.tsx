import React, { memo } from 'react'
import {
  difference,
  range,
} from 'lodash'

import Club from 'model/team/Club'
import NationalTeam from 'model/team/NationalTeam'

import Table from 'ui/table/Table'
import Header from 'ui/table/Header'
import Body from 'ui/table/Body'

import Cell from './GroupCell'
import getTeamCountryName from './getTeamCountryName'

type Team = Club | NationalTeam

interface Props {
  maxTeams: number,
  groupLetter: string,
  teams: readonly Team[],
  potNum: number,
  possible: boolean,
  airborneTeams: readonly Team[],
  background?: string,
  color?: string,
}

const Group = ({
  maxTeams,
  groupLetter,
  teams,
  potNum,
  possible,
  airborneTeams,
  background,
  color,
}: Props) => {
  const nonAirborneTeams = difference(teams, airborneTeams)

  return (
    <Table>
      <Header
        background={background}
        color={color}
      >
        Group
        {' '}
        {groupLetter}
      </Header>
      <Body>
        {nonAirborneTeams.map(team => (
          <Cell
            country={getTeamCountryName(team)}
            picked
          >
            {(team as Club).shortName ?? team.name}
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

export default memo(Group)
