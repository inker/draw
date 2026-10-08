import { useEffect, useRef, useState } from 'react';
import delay from 'delay.js';

export default ({
  key,
  intervalMs,
}: {
  key: string | number | boolean | undefined;
  intervalMs: number;
}) => {
  const isTimerOnRef = useRef(false);
  const [startTimestamp, setStartTimestamp] = useState<Date | undefined>(
    undefined,
  );
  const [currentTimestamp, setCurrentTimestamp] = useState(new Date());

  useEffect(() => {
    if (key !== undefined) {
      isTimerOnRef.current = true;
      const startTimer = async () => {
        setStartTimestamp(new Date());
        while (isTimerOnRef.current) {
          setCurrentTimestamp(new Date());
          // eslint-disable-next-line no-await-in-loop
          await delay(intervalMs);
        }
      };

      startTimer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (key === undefined) {
      isTimerOnRef.current = false;
    }
  }, [key]);

  return startTimestamp
    ? currentTimestamp.getTime() - startTimestamp.getTime()
    : undefined;
};
