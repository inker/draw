import { memo } from 'react';
import clsx from 'clsx';

import * as baseContentStyles from '../base-content.module.scss';

import * as styles from './styles.module.scss';

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  dummy?: boolean;
  ref?: React.RefObject<HTMLSpanElement | null>;
};

function Content({ className, dummy, ...otherProps }: Props) {
  return (
    <span
      className={clsx(
        baseContentStyles.root,
        styles.root,
        dummy && styles.dummy,
        className,
      )}
      {...otherProps}
    />
  );
}

export default memo(Content);
