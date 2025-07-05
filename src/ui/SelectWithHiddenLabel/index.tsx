import {
  type DetailedHTMLProps,
  type SelectHTMLAttributes,
  memo,
  useId,
} from 'react';

import * as styles from './styles.module.scss';

type SelectProps = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

interface Props extends Omit<SelectProps, "disabled"> {
  label: string;
}

function SelectWithHiddenLabel({ label, children, ...props }: Props) {
  const id = useId();

  return (
    <div className={styles.root}>
      <label
        className={styles['hidden-label']}
        htmlFor={id}
      >
        {label}
      </label>
      <select
        id={id}
        className={styles.select}
        title={label}
        {...(props as any)}
      >
        {children}
      </select>
    </div>
  );
}

export default memo(SelectWithHiddenLabel);
