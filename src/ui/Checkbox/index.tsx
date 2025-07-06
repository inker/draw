import {
  type ChangeEvent,
  type DetailedHTMLProps,
  type InputHTMLAttributes,
  memo,
  useCallback,
} from 'react';
import clsx from 'clsx';

import useIsDarkMode from '#utils/hooks/useIsDarkMode';

import * as styles from './styles.module.scss';

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface Props extends Omit<InputProps, 'value' | 'onChange' | 'className'> {
  value: boolean;
  checkboxClassName?: string;
  onChange: (value: boolean) => void;
}

function SelectWithHiddenLabel({
  children,
  value,
  checkboxClassName,
  onChange,
  ...props
}: Props) {
  const isDarkMode = useIsDarkMode();

  const rawOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.checked);
    },
    [onChange],
  );

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={styles.root}>
      <input
        type="checkbox"
        checked={value}
        className={clsx(
          styles.box,
          isDarkMode && styles.dark,
          checkboxClassName,
        )}
        onChange={rawOnChange}
        {...(props as any)}
      />
      <div className={styles['children-wrapper']}>{children}</div>
    </label>
  );
}

export default memo(SelectWithHiddenLabel);
