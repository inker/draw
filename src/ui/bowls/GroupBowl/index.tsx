import React, {
  memo,
  useCallback,
} from 'react'
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
  display: boolean,
  possibleGroups: readonly number[] | null,
  onPick: (groupNum: number) => void,
}

const GroupBowl = ({
  display,
  possibleGroups,
  onPick,
}: Props) => {
  const onBallPick = useCallback((ev: React.MouseEvent<HTMLDivElement>) => {
    const ball = ev.target as HTMLDivElement
    // @ts-ignore
    const pickedGroup = +ball.dataset.group
    if (Number.isNaN(pickedGroup)) {
      console.error('incorrect group ball', ball.dataset.group)
      throw new Error('Incorrect group ball')
    }
    onPick(pickedGroup)
  }, [onPick])

  return (
    <Root>
      {display && possibleGroups && possibleGroups.map(groupNum => (
        <Ball
          key={groupNum}
          data-group={groupNum}
          onClick={onBallPick}
        >
          {getGroupLetter(groupNum)}
        </Ball>
      ))}
    </Root>
  )
}

export default memo(GroupBowl)
