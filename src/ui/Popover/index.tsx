import type React from "react";
import { memo, useId } from "react";

import Button from "#ui/Button";

import * as styles from "./styles.module.css";

interface Props {
  /**
   * What the button shows, which can be an icon
   */
  trigger: React.ReactNode;
  /**
   * The button's accessible name
   */
  label: string;
  /**
   * Shown on hover, for a button that only has an icon
   */
  title?: string;
  panelRef?: React.Ref<HTMLDivElement>;
  children: React.ReactNode;
}

function Popover({ trigger, label, title, panelRef, children }: Props) {
  const id = useId();

  // An anchor name is a dashed ident,
  // which can't hold the punctuation useId puts around its counter
  const anchorName = `--popover-${id.replaceAll(/\W/g, "")}`;

  return (
    <div
      className={styles.root}
      style={
        {
          "--anchor-name": anchorName,
        } as React.CSSProperties
      }
    >
      <Button
        popoverTarget={id}
        aria-label={label}
        title={title}
      >
        {trigger}
      </Button>
      <div
        ref={panelRef}
        id={id}
        popover="auto"
        className={styles.panel}
      >
        {children}
      </div>
    </div>
  );
}

export default memo(Popover);
