import * as React from 'react'
import styled from 'styled-components'
import { range } from 'lodash'

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
        {String.fromCharCode(65 + i)}
      </Roundel>
    ))}
  </Root>
)

export default PossibleGroups
