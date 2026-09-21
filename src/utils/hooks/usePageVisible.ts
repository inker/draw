import { useCallback, useState } from 'react';

import useEvent from './useEvent';

export default () => {
  const [isActive, setIsActive] = useState(document.hasFocus());

  const handleDocumentVisibilityChange = useCallback(() => {
    setIsActive(!document.hidden);
  }, []);

  useEvent(document, 'visibilitychange', handleDocumentVisibilityChange);

  const setActive = useCallback(() => {
    setIsActive(true);
  }, []);

  const setInactive = useCallback(() => {
    setIsActive(false);
  }, []);

  useEvent(document, 'focus', setActive);
  useEvent(window, 'focus', setActive);
  useEvent(document, 'blur', setInactive);
  useEvent(window, 'blur', setInactive);

  return isActive;
};
