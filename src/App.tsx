import { Suspense, lazy, memo } from 'react';
import { constant } from 'lodash';

import useIsDarkMode from '#utils/hooks/useIsDarkMode';
import { css, useGlobalStyle } from '#ui/GlobalStyle';

import Popup from './Popup';

const Routes = lazy(
  constant(
    import(
      /* webpackPreload: true, webpackChunkName: "routes" */ './routes/AppRouter'
    ),
  ),
);

function App() {
  const isDarkMode = useIsDarkMode();

  useGlobalStyle(css`
    :root {
      color-scheme: ${isDarkMode ? 'dark' : 'light'};
    }
  `);

  return (
    <Suspense
      fallback={
        <Popup
          initial
          waiting
        />
      }
    >
      <Routes />
    </Suspense>
  );
}

export default memo(App);
