import { memo, useCallback, useId } from "react";

import { type Theme } from "#store/useTheme";

import * as styles from "./styles.module.css";

const options = [
  {
    value: "light",
    label: "Light",
  },
  {
    value: "dark",
    label: "Dark",
  },
  {
    value: "auto",
    label: "System",
  },
] as const satisfies readonly {
  value: Theme;
  label: string;
}[];

interface Props {
  value: Theme;
  onChange: (value: Theme) => void;
}

function ThemeSwitch({ value, onChange }: Props) {
  const name = useId();

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value as Theme);
    },
    [onChange],
  );

  return (
    <fieldset className={styles.root}>
      <legend className={styles.legend}>Theme</legend>
      <div className={styles.segments}>
        {options.map(option => (
          <label
            key={option.value}
            htmlFor={`${name}-${option.value}`}
            className={styles.segment}
          >
            <input
              id={`${name}-${option.value}`}
              type="radio"
              name={name}
              value={option.value}
              checked={option.value === value}
              className={styles.input}
              onChange={onInputChange}
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default memo(ThemeSwitch);
