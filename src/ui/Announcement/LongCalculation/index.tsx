import { memo } from 'react';

import StyledLink from '#ui/StyledLink';

import * as styles from './styles.module.scss';

function LongCalculation() {
  return (
    <div className={styles.bug}>
      <div>Calculation is taking too long.</div>
      <div>
        And{' '}
        <StyledLink
          href="https://github.com/inker/draw/issues/14"
          target="_blank"
          rel="noopener"
        >
          here&apos;s why
        </StyledLink>
        .
      </div>
    </div>
  );
}

export default memo(LongCalculation);
