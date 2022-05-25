import { memo } from 'react'
import { FlattenInterpolation } from 'styled-components'
import { range } from 'lodash'

import Club from 'model/team/Club'
import NationalTeam from 'model/team/NationalTeam'

import Table from 'ui/table/Table'
import Header from 'ui/table/Header'
import Row from 'ui/table/Row'
import Cell from 'ui/table/Cell'

import GroupCellDeferred from './GroupCellDeferred'

type Team = Club | NationalTeam

interface Props {
  maxTeams: number,
  groupLetter: string,
  teams: readonly Team[],
  potNum: number,
  possible: boolean,
  headerStyles?: FlattenInterpolation<any>,
}

function Group({
  maxTeams,
  groupLetter,
  teams,
  potNum,
  possible,
  headerStyles,
}: Props) {
  return (
    <Table>
      <thead>
        <Row>
          <Cell>
            <Header styles={headerStyles}>
              Group
              {' '}
              {groupLetter}
            </Header>
          </Cell>
        </Row>
      </thead>
      <tbody>
        {range(maxTeams).map(i => (
          <Row key={i}>
            <GroupCellDeferred
              team={teams[i]}
              possible={i === potNum && possible}
            />
          </Row>
        ))}
      </tbody>
    </Table>
  )
}

export default memo(Group)
