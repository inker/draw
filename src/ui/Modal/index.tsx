import { type ReactNode, memo } from 'react';
import clsx from 'clsx';

import Overlay from '../Overlay';

import * as styles from './styles.module.scss';

interface Props {
  children: ReactNode;
  noAnimation: boolean;
}

function Modal({ noAnimation, children }: Props) {
  return (
    <div>
      <Overlay
        className={clsx(styles.background, !noAnimation && styles.animate)}
      />
      <Overlay className={styles.body}>{children}</Overlay>
    </div>
  );
}

export default memo(Modal);
