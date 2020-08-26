import React, { memo } from 'react'
import {
  difference,
  range,
} from 'lodash'

import Club from 'model/team/Club'
import NationalTeam from 'model/team/NationalTeam'

import Table from 'ui/table/Table'
import Header from 'ui/table/Header'
import Row from 'ui/table/Row'
import CellContainer from 'ui/table/CellContainer'
import CellWithFlag from 'ui/table/CellWithFlag'
import DummyCell from 'ui/table/DummyCell'

import GroupCellContainer from './GroupCellContainer'
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
      <thead>
        <Row>
          <CellContainer>
            <Header
              background={background}
              color={color}
            >
              Group
              {' '}
              {groupLetter}
            </Header>
          </CellContainer>
        </Row>
      </thead>
      <tbody>
        {nonAirborneTeams.map(team => (
          <Row>
            <GroupCellContainer picked>
              <CellWithFlag country={getTeamCountryName(team)}>
                {(team as Club).shortName ?? team.name}
              </CellWithFlag>
            </GroupCellContainer>
          </Row>
        ))}
        {range(nonAirborneTeams.length, maxTeams).map(i => (
          <Row>
            <GroupCellContainer possible={i === potNum && possible}>
              <DummyCell data-cellid={`${groupLetter}${i}`} />
            </GroupCellContainer>
          </Row>
        ))}
      </tbody>
    </Table>
  )
}

export default memo(Group)
