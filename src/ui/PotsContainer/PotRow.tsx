import { memo } from 'react'

import Team from 'model/team'
import GsTeam from 'model/team/GsTeam'

import Row from 'ui/table/Row'

import PotCell from './PotCell'
import PotContent from './PotContent'

interface Props {
  teams: Team[],
  pickedTeams: readonly Team[],
  selectedTeams: readonly Team[] | null,
}

const PotRow = ({
  teams,
  pickedTeams,
  selectedTeams,
}: Props) => (
  <Row>
    {teams.map(team => {
      const {
        name,
        country,
        shortName,
        pairing,
      } = team as GsTeam

      return (
        <PotCell key={team.id}>
          <PotContent
            data-cellid={team.id}
            title={pairing && `paired with ${pairing.shortName ?? pairing.name}`}
            selected={!!selectedTeams?.includes(team)}
            picked={pickedTeams.includes(team)}
            country={country ?? name}
          >
            {shortName ?? name}
          </PotContent>
        </PotCell>
      )
    })}
  </Row>
)

export default memo(PotRow)
