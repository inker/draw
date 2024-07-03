import { useEffect, useMemo } from 'react';

export default () => {
  const abortController = useMemo(() => new AbortController(), []);

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      abortController.abort();
    };
  }, []);

  return abortController.signal;
};
