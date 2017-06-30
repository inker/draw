import * as React from 'react'
import styled from 'styled-components'

import Cell from '../table/Cell'

const GroupCell = styled(Cell)`
  ${props => props.possible && `
    background-color: rgba(255, 255, 255, 0.75);
    animation: border-glow 1s ease;
    border-style: double;
    border-color: #789;
    @keyframes border-glow {
      from {
          background-color: white;
          box-shadow: 0 0 20px #bcd;
      }
      to {}
    }
  `}
  ${props => props.picked && `
    animation: appear 5s normal forwards;
    @keyframes appear {
      from {
        background-color: #ff8;
      }
      to {}
    }
  `}
` as any

export default GroupCell
