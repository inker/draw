import { createGlobalStyle } from 'styled-components';

const Body = createGlobalStyle`
  body {
    font-family: Tahoma, Arial, sans-serif;
    color: light-dark(black, white);
    background-color: light-dark(transparent, #272a33);
  }
`;

export default Body;
