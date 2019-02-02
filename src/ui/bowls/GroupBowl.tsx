import React, { PureComponent } from 'react'
import styled from 'styled-components'

import getGroupLetter from 'utils/getGroupLetter'
import Ball from './Ball'

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 999px) {
    justify-content: center;
  }
`

interface Props {
  completed: boolean,
  possibleGroups: number[] | null,
  onPick: (groupNum: number) => void,
}

class GroupBowl extends PureComponent<Props> {
  private onBallPick = (ev: React.MouseEvent<HTMLDivElement>) => {
    const ball = ev.target as HTMLDivElement
    // @ts-ignore
    const pickedGroup = +ball.dataset.group
    if (Number.isNaN(pickedGroup)) {
      console.error('incorrect group ball', ball.dataset.group)
      throw new Error(`Incorrect group ball`)
    }
    this.props.onPick(pickedGroup)
  }

  render() {
    const {
      completed,
      possibleGroups,
    } = this.props

    return (
      <Root>
        {!completed && possibleGroups &&
          possibleGroups.map(groupNum => (
            <Ball
              data-group={groupNum}
              onClick={this.onBallPick}
            >
              {getGroupLetter(groupNum)}
            </Ball>
          ))
        }
      </Root>
    )
  }
}

export default GroupBowl
