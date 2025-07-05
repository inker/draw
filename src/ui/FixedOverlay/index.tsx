import { type ReactNode, memo } from 'react';

import Portal from '#ui/Portal';

import * as styles from './styles.module.scss';

const airborneDiv = document.createElement('div');
airborneDiv.classList.add(styles.airborne);
document.body.insertBefore(airborneDiv, document.getElementById('app'));

interface Props {
  children: ReactNode;
}

function FixedOverlay({ children }: Props) {
  return (
    <Portal
      tagName="div"
      modalRoot={airborneDiv}
    >
      {children}
    </Portal>
  );
}

export default memo(FixedOverlay);
