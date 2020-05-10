import React, { memo } from 'react'
import styled from 'styled-components'
import { range } from 'lodash'

import Team from 'model/team'
import GsTeam from 'model/team/GsTeam'

import Body from 'ui/table/Body'

import Root from './PotRoot'
import Header from './PotHeader'
import PotCell from './PotCell'

const Pair = styled.div`
  display: flex;
  border: none;
  margin-top: 1px;
  margin-bottom: 1px;
  margin-right: -1px;

  &:last-child {
    margin-bottom: 0px;
  }
`

const Cell = styled(PotCell)`
  width: 50%;
  margin-right: 0px;
`

interface Props {
  isCurrent: boolean,
  potNum: number,
  teams: Team[],
  pickedTeams: Team[],
  selectedTeams: Team[] | null,
  background?: string,
  color?: string,
}

const SplitPot = ({
  isCurrent,
  potNum,
  teams,
  pickedTeams,
  selectedTeams,
  background,
  color,
}: Props) => (
  <Root highlighted={isCurrent}>
    <Header
      highlighted={isCurrent}
      depleted={!teams || pickedTeams.length === teams.length}
      background={background}
      color={color}
    >
      Pot {potNum + 1}
    </Header>
    <Body>
      {range(teams.length / 2).map(i => {
        const pair = [teams[i * 2], teams[i * 2 + 1]]
        return (
          <Pair key={i}>
            {pair.map(team => {
              const {
                name,
                country,
                shortName,
                pairing,
              } = team as GsTeam

              return (
                <Cell
                  key={team.id}
                  data-cellid={team.id}
                  title={pairing && `paired with ${pairing.shortName ?? pairing.name}`}
                  selected={!!selectedTeams && selectedTeams.includes(team)}
                  picked={pickedTeams.includes(team)}
                  country={country ?? name}
                >
                  {shortName ?? name}
                </Cell>
              )
            })}
          </Pair>
        )
      })}
    </Body>
  </Root>
)

export default memo(SplitPot)
