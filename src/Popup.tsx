import React, {
  useCallback,
  memo,
} from 'react'

import usePopup from 'store/usePopup'
import Notification from 'ui/Notification'
import Dots from 'ui/Dots'

const Popup = () => {
  const [popup] = usePopup()

  const WrappedPopup = useCallback((props) => (
    <Notification
      {...props}
      noAnimation={popup.initial}
    />
  ), [popup.initial])

  const { error, waiting } = popup
  if (!navigator.onLine) {
    return <WrappedPopup>you&apos;re offline</WrappedPopup>
  }
  if (error) {
    return <WrappedPopup>{error}</WrappedPopup>
  }
  if (waiting) {
    return (
      <WrappedPopup>
        wait
        <Dots
          initialNum={3}
          maxNum={3}
          interval={1000}
        />
      </WrappedPopup>
    )
  }
  return null
}

export default memo(Popup)
