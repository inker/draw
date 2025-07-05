import { createGlobalStyle } from 'styled-components';

import { type ThemeInterface } from './themes';

interface Props {
  theme: ThemeInterface;
}

const Body = createGlobalStyle<Props>`
  body {
    font-family: Tahoma, Arial, sans-serif;
    color: light-dark(black, white);
    background-color: light-dark(transparent, #272a33);
  }
`;

export default Body;
