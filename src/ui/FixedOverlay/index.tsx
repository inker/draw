import type React from 'react';
import { memo } from 'react';

import Portal from '#ui/Portal';

import * as styles from './styles.module.css';

const airborneDiv = document.createElement('div');
airborneDiv.classList.add(styles.airborne);
document.body.insertBefore(airborneDiv, document.getElementById('app'));

interface Props {
  children: React.ReactNode;
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
