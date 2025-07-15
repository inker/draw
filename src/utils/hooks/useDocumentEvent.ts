import { useEffect } from 'react';

export default <K extends keyof DocumentEventMap>(
  type: K,
  listener: (e: DocumentEventMap[K]) => void,
) => {
  useEffect(() => {
    document.addEventListener(type, listener);
    return () => {
      document.removeEventListener(type, listener);
    };
  }, [type, listener]);
};
