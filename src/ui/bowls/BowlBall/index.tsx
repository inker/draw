import {
  type DetailedHTMLProps,
  type HTMLAttributes,
  memo,
  useCallback,
  useRef,
} from 'react';
import clsx from 'clsx';

import useGlobalEvent from '#utils/hooks/useGlobalEvent';
import * as ballStyles from '#ui/ball.module.scss';

import * as styles from './styles.module.scss';

// TODO: Fix transient props

interface RootProps {
  noHover?: boolean;
  selected?: boolean;
  forceVisible?: boolean;
}

type InputProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

type Props = RootProps & InputProps;

function BowlBall({
  className,
  selected,
  noHover,
  forceVisible,
  ...props
}: Props) {
  const ballRef = useRef<HTMLDivElement | null>(null);

  const cb = useCallback(
    (e: KeyboardEvent) => {
      const el = ballRef.current;
      if (
        !noHover &&
        el &&
        document.activeElement === el &&
        e.key === 'Enter'
      ) {
        el.click();
      }
    },
    [ballRef, noHover],
  );

  useGlobalEvent('keydown', cb);

  return (
    <div
      {...props}
      className={clsx(
        ballStyles.root,
        styles.root,
        className,
        selected && styles.selected,
        forceVisible && styles['force-visible'],
      )}
      ref={ballRef}
      tabIndex={noHover ? undefined : 0}
    />
  );
}

export default memo(BowlBall);
