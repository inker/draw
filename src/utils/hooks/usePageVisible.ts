import { useCallback, useState } from 'react';

import useDocumentEvent from './useDocumentEvent';
import useGlobalEvent from './useGlobalEvent';

export default () => {
  const [isActive, setIsActive] = useState(document.hasFocus());

  const handleDocumentVisibilityChange = useCallback(() => {
    setIsActive(!document.hidden);
  }, []);

  useDocumentEvent('visibilitychange', handleDocumentVisibilityChange);

  const setActive = useCallback(() => {
    setIsActive(true);
  }, []);

  const setInactive = useCallback(() => {
    setIsActive(false);
  }, []);

  useDocumentEvent('focus', setActive);
  useGlobalEvent('focus', setActive);
  useDocumentEvent('blur', setInactive);
  useGlobalEvent('blur', setInactive);

  return isActive;
};
