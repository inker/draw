import type React from 'react';
import { memo } from 'react';

import * as styles from './styles.module.scss';

type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> & {
  isDisabled?: boolean;
};

function Button({
  isDisabled,
  onClick,
  onMouseDown,
  onMouseUp,
  ...rest
}: Props) {
  return (
    <button
      type="button"
      className={styles.root}
      aria-disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
      onMouseDown={isDisabled ? undefined : onMouseDown}
      onMouseUp={isDisabled ? undefined : onMouseUp}
      {...rest}
    />
  );
}

export default memo(Button);
