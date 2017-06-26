import * as React from 'react'
import styled from 'styled-components'

import { Team } from 'utils/team'
import Table from '../table/Table'
import Header from '../table/Header'
import Body from '../table/Body'
import Cell from '../table/Cell'

const GroupCell = styled(Cell)`
  ${props => props.possible && `
    background-color: rgba(255, 255, 255, 0.75);
    animation: border-glow 1s ease;
    border-style: double;
    border-color: #789;
    @keyframes border-glow {
      from {
          background-color: white;
          box-shadow: 0 0 20px #bcd;
      }
      to {}
    }
  `}
  ${props => props.picked && `
    animation: appear 5s normal forwards;
    @keyframes appear {
      from { background-color: #ff8 }
      to {}
    }
  `}
`

interface TeamObj {
  team: Team,
  picked: boolean,
  selected: boolean,
}

interface Props {
  maxTeams: number,
  groupLetter: string,
  teams: Team[],
  potNum: number,
  possible: boolean,
  airborneTeams: Team[],
}

const Group = ({
  maxTeams,
  groupLetter,
  teams,
  potNum,
  possible,
  airborneTeams,
}: Props) => (
  <Table>
    <Header>
      Group {groupLetter}
    </Header>
    <Body>
      {teams.concat(new Array(maxTeams - teams.length).fill(null)).map((team, i) => {
        if (team === null || airborneTeams.includes(team)) {
          return (
            <GroupCell
              possible={i === potNum && possible}
              data-cellid={`${groupLetter}${i}`}
            />
          )
        }
        const { name, country, id } = team
        return (
          <GroupCell
            country={country}
            picked
            data-teamid={id}
          >
            {name}
          </GroupCell>
        )
      })}
    </Body>
  </Table>
)

export default Group
