import React from 'react'
import styled from 'styled-components'
import { range } from 'lodash'

import Team from 'model/team'
import GSTeam from 'model/team/GSTeam'
import Table from 'components/table/Table'
import Body from 'components/table/Body'
import Header from './PotHeader'
import PotCell from './PotCell'

interface RootProps {
  highlighted: boolean
}

const Root = styled<RootProps>(Table)`
  transform: box-shadow 1s linear;
  ${props => props.highlighted && `
  `}
`

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
  depleted: boolean,
}

const Pot: React.SFC<Props> = ({
  isCurrent,
  potNum,
  teams,
  pickedTeams,
  selectedTeams,
  depleted,
}) => {
  return (
    <Root highlighted={isCurrent}>
      <Header
        highlighted={isCurrent}
        depleted={depleted}
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
                } = team as GSTeam
                return (
                  <Cell
                    key={team.id}
                    data-cellId={team.id}
                    title={pairing && `paired with ${pairing.name}`}
                    selected={selectedTeams && selectedTeams.includes(team)}
                    picked={pickedTeams.includes(team)}
                    country={country}
                  >
                    {shortName || name}
                  </Cell>
                )
              })}
            </Pair>
          )
        })}
      </Body>
    </Root>
  )
}

export default Pot
