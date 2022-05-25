import {
  memo,
  type ReactElement,
} from 'react'

import useTimeout from 'utils/hooks/useTimeout'

interface Props {
  delay: number,
  children: ReactElement,
}

function Deferred({
  children,
  delay,
}: Props) {
  const isTimedOut = useTimeout(delay)
  return isTimedOut ? children : null
}

export default memo(Deferred) as typeof Deferred
