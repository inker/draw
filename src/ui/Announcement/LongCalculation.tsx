import { memo } from 'react'
import styled from 'styled-components'

import StyledLink from 'ui/StyledLink'

const Bug = styled.div`
  border-width: 2px;
  border-style: dashed;
  border-color: rgba(255, 0, 0, 0.5);
  padding: 10px;
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
