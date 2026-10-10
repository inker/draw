import { Suspense, lazy, memo, useEffect } from 'react';
import { constant } from 'lodash';

import usePopup from '#store/usePopup';
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
  const [popup, setPopup] = usePopup();
  const isDarkMode = useIsDarkMode();

  useEffect(() => {
    if (popup.initial && !popup.waiting) {
      setPopup({
        initial: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popup.waiting]);

  useGlobalStyle(css`
    :root {
      color-scheme: ${isDarkMode ? 'dark' : 'light'};
    }
  `);

  return (
    <>
      <Popup />
      <Suspense>
        <Routes />
      </Suspense>
    </>
  );
}

export default memo(App);
