import type React from 'react';
import { memo } from 'react';
import clsx from 'clsx';

import * as overlayStyles from '../overlay.module.css';

import * as styles from './styles.module.css';

interface Props {
  children: React.ReactNode;
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
