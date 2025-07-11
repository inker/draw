import { type ReactNode, memo } from 'react';
import clsx from 'clsx';

import * as overlayStyles from '../overlay.module.scss';

import * as styles from './styles.module.scss';

interface Props {
  children: ReactNode;
  noAnimation: boolean;
}

function Modal({ noAnimation, children }: Props) {
  return (
    <div>
      <div
        className={clsx(
          overlayStyles.root,
          styles.background,
          !noAnimation && styles.animate,
        )}
      />
      <div className={clsx(overlayStyles.root, styles.body)}>{children}</div>
    </div>
  );
}

export default memo(Modal);
