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

import GroupRow from './GroupRow'

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
        {range(maxTeams).map(i => (
          <GroupRow
            key={i}
            index={i}
            teams={nonAirborneTeams}
            possible={i === potNum && possible}
            groupLetter={groupLetter}
          />
        ))}
      </tbody>
    </Table>
  )
}

export default memo(Group)
