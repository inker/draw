import React, { memo } from 'react'

import Team from 'model/team'
import GsTeam from 'model/team/GsTeam'

import Body from 'ui/table/Body'

import Root from './PotRoot'
import Header from './PotHeader'
import PotCell from './PotCell'

interface Props {
  isCurrent: boolean,
  potNum: number,
  teams: readonly Team[],
  pickedTeams: readonly Team[],
  selectedTeams: readonly Team[] | null,
  background?: string,
  color?: string,
}

const Pot = ({
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
      {teams.map(team => {
        const {
          name,
          country,
          shortName,
          pairing,
        } = team as GsTeam

        return (
          <PotCell
            key={team.id}
            data-cellid={team.id}
            title={pairing && `paired with ${pairing.shortName ?? pairing.name}`}
            selected={!!selectedTeams?.includes(team)}
            picked={pickedTeams.includes(team)}
            country={country ?? name}
          >
            {shortName ?? name}
          </PotCell>
        )
      })}
    </Body>
  </Root>
)

export default memo(Pot)
