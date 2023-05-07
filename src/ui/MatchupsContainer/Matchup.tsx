import { memo } from 'react'
import styled from 'styled-components'

import type Team from 'model/team/Club'

import Row from 'ui/table/Row'
import Cell from 'ui/table/Cell'
import Content from 'ui/table/Content'

import MatchupCellDeferred from './MatchupCellDeferred'

const VersusCell = styled(Content)`
  justify-content: center;
  width: 23px;
  color: ${props => props.theme.isDarkMode ? '#ccc' : '#333'};

  &::before {
    content: 'v';
  }
`

interface Props {
  teams: [Team, Team] | null,
}

function Matchup({
  teams,
}: Props) {
  const [ru, gw] = teams ?? []

  return (
    <Row>
      <MatchupCellDeferred team={ru!} />
      <Cell>
        <VersusCell />
      </Cell>
      <MatchupCellDeferred team={gw!} />
    </Row>
  )
}

export default memo(Matchup)
