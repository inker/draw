import { memo } from 'react';
import clsx from 'clsx';

import * as baseContentStyles from '../base-content.module.scss';

import * as styles from './styles.module.scss';

type Props = React.HTMLAttributes<HTMLSpanElement>;

function Header({ className, ...otherProps }: Props) {
  return (
    <span
      className={clsx(baseContentStyles.root, styles.root, className)}
      {...otherProps}
    />
  );
}

export default memo(Header);
