import { memo } from "react";

import useTheme from "#store/useTheme";
import useXRay from "#store/useXRay";
import Checkbox from "#ui/Checkbox";
import Popover from "#ui/Popover";

import SelectTheme from "../SelectTheme";

import * as styles from "./styles.module.css";

/**
 * Each line draws the teeth on opposite sides of the gear,
 * so four of them make eight
 */
const toothAngles = [0, 45, 90, 135] as const;

const gearIcon = (
  <svg
    viewBox="0 0 24 24"
    aria-hidden
    className={styles.icon}
  >
    <g
      fill="none"
      stroke="currentColor"
    >
      {toothAngles.map(angle => (
        <path
          key={angle}
          d="M12 1.5V6M12 18v4.5"
          strokeWidth={3.5}
          transform={`rotate(${angle} 12 12)`}
        />
      ))}
      <circle
        cx={12}
        cy={12}
        r={7}
        strokeWidth={4}
      />
    </g>
  </svg>
);

function Settings() {
  const [theme, setTheme] = useTheme();
  const [isXRay, setIsXRay] = useXRay();

  return (
    <Popover
      trigger={gearIcon}
      label="Settings"
      title="Settings"
    >
      <div className={styles.content}>
        <Checkbox
          value={isXRay}
          onChange={setIsXRay}
        >
          X-ray
        </Checkbox>
        <SelectTheme
          value={theme}
          onChange={setTheme}
        />
      </div>
    </Popover>
  );
}

export default memo(Settings);
