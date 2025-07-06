import { memo } from 'react';

import * as styles from './styles.module.scss';

function LongCalculation() {
  return (
    <div className={styles.bug}>
      <div>Calculation is taking too long.</div>
      <div>
        And{' '}
        <a
          href="https://github.com/inker/draw/issues/14"
          target="_blank"
          rel="noopener noreferrer"
          className="styled-link"
        >
          here&apos;s why
        </a>
        .
      </div>
    </div>
  );
}

export default memo(LongCalculation);
