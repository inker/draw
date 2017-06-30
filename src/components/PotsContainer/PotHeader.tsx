import * as React from 'react'
import styled from 'styled-components'

import Header from '../table/Header'

const PotHeader = styled(Header)`
  ${props => props.depleted && `
    filter: grayscale(0.5);
    opacity: 0.4;
  `}
` as any

export default PotHeader
