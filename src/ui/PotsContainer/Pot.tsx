import React, { memo } from 'react'
import { FlattenInterpolation } from 'styled-components'
import { range } from 'lodash'

import Team from 'model/team'

import Row from 'ui/table/Row'
import Cell from 'ui/table/Cell'

import Root from './PotRoot'
import Header from './PotHeader'
import PotRow from './PotRow'

interface Props {
  isCurrent: boolean,
  potNum: number,
  teams: readonly Team[],
  pickedTeams: readonly Team[],
  selectedTeams: readonly Team[] | null,
  isSplit?: boolean,
  headerStyles?: FlattenInterpolation<any>,
}

const Pot = ({
  isCurrent,
  potNum,
  teams,
  pickedTeams,
  selectedTeams,
  isSplit,
  headerStyles,
}: Props) => {
  const colsPerRow = isSplit ? 2 : 1
  const numRows = teams.length / colsPerRow

  return (
    <Root highlighted={isCurrent}>
      <thead>
        <Row>
          <Cell colSpan={colsPerRow}>
            <Header
              highlighted={isCurrent}
              depleted={!teams || pickedTeams.length === teams.length}
              styles={headerStyles}
            >
              Pot {potNum + 1}
            </Header>
          </Cell>
        </Row>
      </thead>
      <tbody>
        {range(numRows).map(i => {
          const rowTeams = isSplit
            ? [teams[i * 2], teams[i * 2 + 1]]
            : [teams[i]]

          return (
            <PotRow
              key={rowTeams.map(team => team.id).join(':')}
              teams={rowTeams}
              selectedTeams={selectedTeams}
              pickedTeams={pickedTeams}
            />
          )
        })}
      </tbody>
    </Root>
  )
}

export default memo(Pot)
