import * as React from 'react'
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

const PossibleGroups = ({
  numGroups,
  possibleGroups,
}: Props) => (
  <Root>
    {range(numGroups).map(i => (
      <Roundel
        color={i < 4 ? 'red' : 'blue'}
        possible={possibleGroups.includes(i)}
      >
        {getGroupLetter(i)}
      </Roundel>
    ))}
  </Root>
)

export default PossibleGroups
