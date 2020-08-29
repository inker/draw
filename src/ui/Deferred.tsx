import React, {
  memo,
  FC,
} from 'react'

import useTimeout from 'utils/hooks/useTimeout'

interface Props {
  delay: number,
}

const Deferred: FC<Props> = ({
  children,
  delay,
}) => {
  const isTimedOut = useTimeout(delay)
  return isTimedOut ? <>{children}</> : null
}

export default memo(Deferred) as typeof Deferred
