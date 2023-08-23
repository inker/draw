import { memo } from 'react'
import { type RuleSet } from 'styled-components'

import type Team from 'model/team'

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
  numCols: number,
  headerStyles?: RuleSet<any>,
}

function Pot({
  isCurrent,
  potNum,
  teams,
  pickedTeams,
  selectedTeams,
  numCols,
  headerStyles,
}: Props) {
  const numRows = teams.length / numCols

  return (
    <Root $highlighted={isCurrent}>
      <thead>
        <Row>
          <Cell colSpan={numCols}>
            <Header
              $highlighted={isCurrent}
              $depleted={!teams || pickedTeams.length === teams.length}
              $styles={headerStyles}
            >
              Pot {potNum + 1}
            </Header>
          </Cell>
        </Row>
      </thead>
      <tbody>
        {Array.from({ length: numRows }, (_, i) => {
          const offset = i * numCols
          // eslint-disable-next-line @typescript-eslint/no-shadow, no-shadow
          const rowTeams = Array.from({ length: numCols }, (_, c) => teams[offset + c])

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
