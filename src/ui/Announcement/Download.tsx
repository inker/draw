import { type RefObject, memo, useCallback, useEffect, useState } from 'react';
import delay from 'delay.js';
import clsx from 'clsx';
import { Global, css } from '@emotion/react';

const saveScreenshotPromise = import(
  /* webpackChunkName: "screenshot", webpackPrefetch: true */ '#utils/saveScreenshot'
);

interface Props {
  completed: boolean;
  groupsElement: RefObject<HTMLElement | null>;
}

interface State {
  downloadClicked: null | 'png' | 'svg';
  transitionsEnabled: boolean;
}

const getInitialState = (): State => ({
  downloadClicked: null,
  transitionsEnabled: true,
});

function Download({ completed, groupsElement }: Props) {
  const [{ downloadClicked, transitionsEnabled }, setState] =
    useState(getInitialState);

  const setDownloadClicked = useCallback(
    (format: State['downloadClicked']) => {
      setState({
        downloadClicked: format,
        transitionsEnabled: false,
      });
    },
    [setState],
  );

  useEffect(() => {
    (async () => {
      if (!downloadClicked) {
        return;
      }
      try {
        const el = groupsElement.current;
        if (!el) {
          throw new Error('groups element is null');
        }
        await delay(0); // TODO: remove this hack
        const mod = await saveScreenshotPromise;
        await mod.default(el, downloadClicked);
      } catch (err) {
        console.error(err);
      }
      setDownloadClicked(null);
    })();
  }, [downloadClicked]);

  useEffect(() => {
    if (!completed) {
      setState({
        downloadClicked: null,
        transitionsEnabled: true,
      });
    }
  }, [completed]);

  const onDownloadPngClick = useCallback(() => {
    setDownloadClicked('png');
  }, [setDownloadClicked]);
  const onDownloadSvgClick = useCallback(() => {
    setDownloadClicked('svg');
  }, [setDownloadClicked]);

  return completed && !!groupsElement ? (
    <div>
      {!transitionsEnabled && (
        <Global
          styles={css`
            body * {
              transition-property: none !important;
              animation: none !important;
            }
          `}
        />
      )}
      {'Download as '}
      <button
        type="button"
        className={clsx('button-link', 'styled-link')}
        onClick={onDownloadPngClick}
      >
        PNG
      </button>
      {', '}
      <button
        type="button"
        className={clsx('button-link', 'styled-link')}
        onClick={onDownloadSvgClick}
      >
        SVG
      </button>
    </div>
  ) : null;
}

export default memo(Download);
