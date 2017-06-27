import * as React from 'react'
import styled from 'styled-components'

export default styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  min-width: 400px;

  @media (max-width: 999px) {
    width: 100%;
    align-items: center;
  }
`
