import {
  type ChangeEvent,
  type DetailedHTMLProps,
  type InputHTMLAttributes,
  memo,
  useCallback,
} from 'react';
import styled, { css } from 'styled-components';

import * as styles from './styles.module.scss';

const Box = styled.input.attrs({
  type: 'checkbox',
})`
  cursor: pointer;
  ${props =>
    props.theme.isDarkMode &&
    css`
      border: var(--border);
      accent-color: #246;

      &:hover {
        accent-color: #468;
      }
    `}
`;

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface Props extends Omit<InputProps, 'value' | 'onChange'> {
  value: boolean;
  onChange: (value: boolean) => void;
}

function SelectWithHiddenLabel({ children, value, onChange, ...props }: Props) {
  const rawOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.checked);
    },
    [onChange],
  );

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={styles.root}>
      <Box
        checked={value}
        onChange={rawOnChange}
        {...(props as any)}
      />
      <div className={styles['children-wrapper']}>{children}</div>
    </label>
  );
}

export default memo(SelectWithHiddenLabel);
