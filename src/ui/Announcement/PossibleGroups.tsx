import { memo } from 'react'
import styled from 'styled-components'

import getGroupLetter from 'utils/getGroupLetter'

import Roundel from './Roundel'

const Root = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2px;
`

interface Props {
  numGroups: number,
  possibleGroups: readonly number[],
}

function PossibleGroups({
  numGroups,
  possibleGroups,
}: Props) {
  const halfNum = numGroups >> 1

  return (
    <Root>
      {Array.from({ length: numGroups }, (_, i) => {
        const letter = getGroupLetter(i)
        return (
          <Roundel
            key={letter}
            color={i < halfNum ? 'red' : 'blue'}
            $possible={possibleGroups.includes(i)}
          >
            {letter}
          </Roundel>
        )
      })}
    </Root>
  )
}

export default memo(PossibleGroups)
