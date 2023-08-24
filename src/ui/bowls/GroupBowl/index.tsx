import {
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
  displayGroups: boolean,
  possibleGroups: readonly number[] | null,
  onPick: (groupNum: number) => void,
}

function GroupBowl({
  display,
  displayGroups,
  possibleGroups,
  onPick,
}: Props) {
  const onBallPick = useCallback((ev: React.MouseEvent<HTMLDivElement>) => {
    const ball = ev.target as HTMLDivElement
    const pickedGroup = +ball.dataset.group!
    if (Number.isNaN(pickedGroup)) {
      throw new TypeError(`Incorrect group ball: ${ball.dataset.group}`)
    }
    onPick(pickedGroup)
  }, [onPick])

  return (
    <Root>
      {display && possibleGroups?.map(groupNum => (
        <Ball
          key={groupNum}
          data-group={groupNum}
          forceVisible={displayGroups}
          onClick={onBallPick}
        >
          {getGroupLetter(groupNum)}
        </Ball>
      ))}
    </Root>
  )
}

export default memo(GroupBowl)
