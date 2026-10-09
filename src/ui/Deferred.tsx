import type React from 'react';
import { memo } from 'react';

import useTimeoutControlled from '#utils/hooks/useTimeoutControlled';

interface Props {
  delay: number;
  children: React.ReactNode;
}

function Deferred({ children, delay }: Props) {
  const isTimedOut = useTimeoutControlled(delay);
  return isTimedOut ? children : null;
}

export default memo(Deferred);
