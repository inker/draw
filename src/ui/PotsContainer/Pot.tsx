import React, { memo } from 'react'
import { FlattenInterpolation } from 'styled-components'

import Team from 'model/team'
import GsTeam from 'model/team/GsTeam'

import Row from 'ui/table/Row'
import Cell from 'ui/table/Cell'

import Root from './PotRoot'
import Header from './PotHeader'
import PotContent from './PotContent'

interface Props {
  isCurrent: boolean,
  potNum: number,
  teams: readonly Team[],
  pickedTeams: readonly Team[],
  selectedTeams: readonly Team[] | null,
  headerStyles?: FlattenInterpolation<any>,
}

const Pot = ({
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
        <Cell>
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
      {teams.map(team => {
        const {
          name,
          country,
          shortName,
          pairing,
        } = team as GsTeam

        return (
          <Row key={team.id}>
            <Cell>
              <PotContent
                data-cellid={team.id}
                title={pairing && `paired with ${pairing.shortName ?? pairing.name}`}
                selected={!!selectedTeams?.includes(team)}
                picked={pickedTeams.includes(team)}
                country={country ?? name}
              >
                {shortName ?? name}
              </PotContent>
            </Cell>
          </Row>
        )
      })}
    </tbody>
  </Root>
)

export default memo(Pot)
