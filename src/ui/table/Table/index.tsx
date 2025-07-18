import type React from 'react';
import { memo } from 'react';
import clsx from 'clsx';

import * as styles from './styles.module.scss';

type Props = React.HTMLAttributes<HTMLTableElement> & {
  innerRef?: React.RefObject<HTMLTableElement>;
};

function Table({ className, innerRef, ...otherProps }: Props) {
  return (
    <table
      ref={innerRef}
      className={clsx(styles.root, className)}
      {...otherProps}
    />
  );
}

export default memo(Table);
