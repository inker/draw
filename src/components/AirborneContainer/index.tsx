import * as React from 'react'
import * as Portal from 'react-portal'
import styled from 'styled-components'
import { memoize } from 'lodash'

import FakeCell from './FakeCell'

const Root = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: 0;
  z-index: 1000;
`

import { Team } from 'utils/team'

type Obj = {
  team: Team,
  groupNum: number,
  position: number,
}

interface Props {
  teams: Obj[],
  duration: number,
}

const foo = ({ team, groupNum, position }: Obj) => ({
  fromCell: document.querySelector(`[data-cellid='${team.id}']`),
  toCell: document.querySelector(`[data-cellid='${String.fromCharCode(65 + groupNum)}${position}']`),
})

const getCells = memoize(foo)

class AirborneContainer extends React.PureComponent<Props> {
  render() {
    const { teams, duration } = this.props
    return (
      <Portal isOpened>
        <Root>
          {teams.map(({ team, groupNum, position }) => {
            const cells = getCells({ team, groupNum, position })
            return (
              <FakeCell
                key={team.id}
                country={team.country}
                style={{
                  transition: `transform ${duration}ms ease-in-out`,
                }}
              >
                {team.name}
              </FakeCell>
            )
          })}
        </Root>
      </Portal>
    )
  }
}

export default AirborneContainer
