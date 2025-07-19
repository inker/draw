import type React from 'react';
import { memo } from 'react';
import clsx from 'clsx';

import * as styles from './styles.module.scss';

type Props = React.HTMLAttributes<HTMLTableElement> & {
  ref?: React.RefObject<HTMLTableElement | null>;
};

function Table({ className, ...otherProps }: Props) {
  return (
    <table
      className={clsx(styles.root, className)}
      {...otherProps}
    />
  );
}

export default memo(Table);
