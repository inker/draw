import type React from 'react';
import { memo, useCallback } from 'react';

import Notification from '#ui/Notification';
import Dots from '#ui/Dots';
import usePopup from '#store/usePopup';

interface WrappedPopupProps {
  children: React.ReactNode;
}

interface Props {
  initial: boolean;
  waiting: boolean;
}

function Popup({ initial, waiting }: Props) {
  const [popup] = usePopup();

  const { error } = popup;

  const WrappedPopup = useCallback(
    (props: WrappedPopupProps) => (
      <Notification
        {...props}
        noAnimation={initial}
      />
    ),
    [initial],
  );

  if (error) {
    // eslint-disable-next-line react-hooks/static-components
    return <WrappedPopup>{error}</WrappedPopup>;
  }

  if (waiting) {
    return (
      // eslint-disable-next-line react-hooks/static-components
      <WrappedPopup>
        wait
        <Dots
          initialNum={3}
          maxNum={3}
          interval={1000}
        />
      </WrappedPopup>
    );
  }
  return null;
}

export default memo(Popup);
