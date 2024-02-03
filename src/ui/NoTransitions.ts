import { createGlobalStyle } from 'styled-components';

const NoTransitions = createGlobalStyle`
  body * {
    transition-property: none !important;
    animation: none !important;
  }
`;

export default NoTransitions;
