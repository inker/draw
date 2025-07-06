import { Suspense, lazy, memo, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import { HashRouter } from 'react-router-dom';
import { constant } from 'lodash';

import usePopup from '#store/usePopup';
import useIsDarkMode from '#utils/hooks/useIsDarkMode';

import Popup from './Popup';

const Routes = lazy(
  constant(
    import(/* webpackPreload: true, webpackChunkName: "routes" */ './routes'),
  ),
);

const ColorScheme = createGlobalStyle<{ $value?: 'light' | 'dark' }>`
  :root {
    color-scheme: ${props => props.$value}
  }
`;

function App() {
  const [popup, setPopup] = usePopup();
  const isDarkMode = useIsDarkMode();

  useEffect(() => {
    if (popup.initial && !popup.waiting) {
      setPopup({
        initial: false,
      });
    }
  }, [popup.waiting]);

  return (
    <>
      <ColorScheme $value={isDarkMode ? 'dark' : 'light'} />
      <Popup />
      <HashRouter>
        <Suspense>
          <Routes />
        </Suspense>
      </HashRouter>
    </>
  );
}

export default memo(App);
