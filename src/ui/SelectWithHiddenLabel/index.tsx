import {
  type DetailedHTMLProps,
  type SelectHTMLAttributes,
  memo,
  useId,
} from 'react';
import styled, { css } from 'styled-components';

import * as styles from './styles.module.scss';

const Select = styled.select`
  border-radius: 3px;
  border: var(--border);
  background-color: light-dark(white, #246);
  color: ${props => (props.theme.isDarkMode ? 'white' : '')};
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }

  &:hover {
    ${props =>
      props.theme.isDarkMode
        ? css`
            background-color: #468;
          `
        : css`
            border-color: black;
          `}
  }
`;

type SelectProps = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

interface Props extends SelectProps {
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
      <Select
        id={id}
        title={label}
        {...(props as any)}
      >
        {children}
      </Select>
    </div>
  );
}

export default memo(SelectWithHiddenLabel);
