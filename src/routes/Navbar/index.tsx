import { memo, useCallback } from "react";

import {
  type DrawRoute,
  type RequestedDrawRoute,
} from "#model/resolveDrawRoute";
import useMedia from "#utils/hooks/useMedia";
import useDrawId from "#store/useDrawId";
import useFastDraw from "#store/useFastDraw";
import Button from "#ui/Button";

import DrawPicker from "./DrawPicker";
import Settings from "./Settings";
import GitHubButtons from "./GitHubButtons";
import * as styles from "./styles.module.css";

interface Props {
  route: DrawRoute;
  onChange: (change: Partial<RequestedDrawRoute>) => void;
}

function Navbar({ route, onChange }: Props) {
  const [, refreshDrawId] = useDrawId();
  const [isFastDraw, setIsFastDraw] = useFastDraw();

  const isWidth900 = useMedia("(min-width: 900px)");
  const isWidth700 = useMedia("(min-width: 700px)");

  const enableFastDraw = useCallback(() => {
    setIsFastDraw(true);
  }, [setIsFastDraw]);

  return (
    <div className={styles.root}>
      <div
        id="navbar-left-container"
        className={styles["nav-bar-left-container"]}
      />
      <div>
        <Button onClick={refreshDrawId}>Restart</Button>
        <Button
          isDisabled={isFastDraw}
          onClick={enableFastDraw}
        >
          Fast draw
        </Button>
        <DrawPicker
          route={route}
          onChange={onChange}
        />
        <Settings />
      </div>
      <div>
        {isWidth900 && <GitHubButtons />}
        <small>
          {isWidth700 ? "Crafted with ♡ by" : "©"}{" "}
          <a
            href="https://github.com/inker"
            target="_blank"
            rel="noopener noreferrer"
            className="styled-link"
          >
            inker
          </a>
        </small>
      </div>
    </div>
  );
}

export default memo(Navbar);
