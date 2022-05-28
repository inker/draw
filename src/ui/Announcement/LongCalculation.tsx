import { memo } from 'react'
import styled from 'styled-components'

import StyledLink from 'ui/StyledLink'

const Bug = styled.div`
  padding: 10px;
  border-width: 2px;
  border-style: dashed;
  border-color: rgb(255 0 0 / 0.5);
`

function LongCalculation() {
  return (
    <Bug>
      <div>
        Calculation is taking too long.
      </div>
      <div>
        And
        {' '}
        <StyledLink
          href="https://github.com/inker/draw/issues/14"
          target="_blank"
          rel="noopener"
        >
          here&apos;s why
        </StyledLink>
        .
      </div>
    </Bug>
  )
}

export default memo(LongCalculation)
