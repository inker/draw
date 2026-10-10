import { memo } from 'react';

import Notification from '#ui/Notification';
import Dots from '#ui/Dots';
import usePopup from '#store/usePopup';

interface Props {
  initial: boolean;
  waiting: boolean;
}

function Popup({ initial, waiting }: Props) {
  const [popup] = usePopup();

  const { error } = popup;

  if (error) {
    return <Notification noAnimation={initial}>{error}</Notification>;
  }

  if (waiting) {
    return (
      <Notification noAnimation={initial}>
        wait
        <Dots
          initialNum={3}
          maxNum={3}
          interval={1000}
        />
      </Notification>
    );
  }
  return null;
}

export default memo(Popup);
