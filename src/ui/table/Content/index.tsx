import { memo } from 'react';
import clsx from 'clsx';

import * as baseContentStyles from '../base-content.module.scss';

import * as styles from './styles.module.scss';

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  dummy?: boolean;
  innerRef?: React.RefObject<HTMLSpanElement>;
};

function Content({ className, innerRef, dummy, ...otherProps }: Props) {
  return (
    <span
      ref={innerRef}
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
