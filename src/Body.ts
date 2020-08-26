import { createGlobalStyle } from 'styled-components'

import type { ThemeInterface } from './themes'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props {
  theme: ThemeInterface,
}

const Body = createGlobalStyle<Props>`
  body {
    font-family: Tahoma, Arial, sans-serif;
    color: ${props => props.theme.isDarkMode ? 'white' : ''};
    background-color: ${props => props.theme.isDarkMode ? '#272a33' : ''};
  }
`

export default Body
