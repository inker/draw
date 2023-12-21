import styled, { css } from 'styled-components'

import BaseContent from './BaseContent'

const Content = styled(BaseContent)`
  overflow: hidden;
  margin: 0 3px;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${props =>
    props.theme.isDarkMode &&
    css`
      text-shadow: 0.5px 0.5px 1px #222;
    `}

  @media (max-width: 999px) {
    font-family: 'Roboto Condensed', RobotoCondensed, RobotoCondensed-Regular,
      sans-serif;
  }
`

export default Content
