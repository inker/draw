import {
  memo,
  type ReactElement,
} from 'react'

import useTimeoutControlled from 'utils/hooks/useTimeoutControlled'

interface Props {
  delay: number,
  children: ReactElement,
}

function Deferred({
  children,
  delay,
}: Props) {
  const isTimedOut = useTimeoutControlled(delay)
  return isTimedOut ? children : null
}

export default memo(Deferred) as typeof Deferred
