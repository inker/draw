import { useCallback, useMemo, useState } from 'react';

import useEvent from './useEvent';

export default (media: string) => {
  const matchResult = useMemo(() => window.matchMedia(media), [media]);

  const [isMatch, setIsMatch] = useState(matchResult.matches);

  const handleChange = useCallback((e: MediaQueryListEvent) => {
    setIsMatch(e.matches);
  }, []);

  useEvent(matchResult, 'change', handleChange);

  return isMatch;
};
