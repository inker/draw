import React from 'react'
import styled from 'styled-components'
import { range } from 'lodash'

import getGroupLetter from 'utils/getGroupLetter'
import Roundel from './Roundel'

const Root = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2px;
`

interface Props {
  numGroups: number,
  possibleGroups: number[],
}

const PossibleGroups: React.SFC<Props> = ({
  numGroups,
  possibleGroups,
}) => {
  const halfNum = numGroups >> 1
  return (
    <Root>
      {range(numGroups).map(i => {
        const letter = getGroupLetter(i)
        return (
          <Roundel
            key={letter}
            color={i < halfNum ? 'red' : 'blue'}
            possible={possibleGroups.includes(i)}
          >
            {letter}
          </Roundel>
        )
      })}
    </Root>
  )
}

export default PossibleGroups
