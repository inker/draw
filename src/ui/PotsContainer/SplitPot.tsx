import React, { memo } from 'react'
import styled, { FlattenInterpolation } from 'styled-components'
import { range } from 'lodash'

import Team from 'model/team'
import GsTeam from 'model/team/GsTeam'

import Row from 'ui/table/Row'
import Cell from 'ui/table/Cell'

import Root from './PotRoot'
import Header from './PotHeader'
import PotContent from './PotContent'

const SplitCellContainer = styled(Cell)`
  width: 50%;

  & + & {
    border-left: ${props => props.theme.border};
  }
`

const Content = styled(PotContent)`
  margin-right: 0;
`

interface Props {
  isCurrent: boolean,
  potNum: number,
  teams: readonly Team[],
  pickedTeams: readonly Team[],
  selectedTeams: readonly Team[] | null,
  headerStyles?: FlattenInterpolation<any>,
}

const SplitPot = ({
  isCurrent,
  potNum,
  teams,
  pickedTeams,
  selectedTeams,
  headerStyles,
}: Props) => (
  <Root highlighted={isCurrent}>
    <thead>
      <Row>
        <Cell colSpan={2}>
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
      {range(teams.length / 2).map(i => {
        const pair = [teams[i * 2], teams[i * 2 + 1]]
        return (
          <Row key={i}>
            {pair.map(team => {
              const {
                name,
                country,
                shortName,
                pairing,
              } = team as GsTeam

              return (
                <SplitCellContainer key={team.id}>
                  <Content
                    data-cellid={team.id}
                    title={pairing && `paired with ${pairing.shortName ?? pairing.name}`}
                    selected={!!selectedTeams && selectedTeams.includes(team)}
                    picked={pickedTeams.includes(team)}
                    country={country ?? name}
                  >
                    {shortName ?? name}
                  </Content>
                </SplitCellContainer>
              )
            })}
          </Row>
        )
      })}
    </tbody>
  </Root>
)

export default memo(SplitPot)
