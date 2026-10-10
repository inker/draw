import { memo, useEffect } from 'react';

import usePopup from '#store/usePopup';

// Long enough to read, short enough that the page is not hidden for good
const errorDuration = 5000;

// The route is resolved against the data that exists before it gets here,
// so a failure now is the network or a bad chunk & navigating cannot fix it
function LoadError() {
  const [, setPopup] = usePopup();

  useEffect(() => {
    setPopup({
      error: 'Could not fetch data',
    });
    const timeout = setTimeout(() => {
      setPopup({
        error: null,
      });
    }, errorDuration);
    return () => {
      clearTimeout(timeout);
      setPopup({
        error: null,
      });
    };
  }, [setPopup]);

  return null;
}

export default memo(LoadError);
