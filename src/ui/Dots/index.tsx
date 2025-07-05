import { memo, useEffect, useState } from 'react';

import * as styles from './styles.module.scss';

interface Props {
  initialNum: number;
  maxNum: number;
  interval: number;
}

function Dots({ initialNum, maxNum, interval }: Props) {
  const [numVisible, setNumVisible] = useState(initialNum);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const cb = () => {
      timer = setTimeout(() => {
        setNumVisible(state => (state + 1) % (maxNum + 1));
        cb();
      }, interval);
    };
    cb();
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <span>{'.'.repeat(numVisible)}</span>
      <span className={styles['invisible-span']}>
        {'.'.repeat(maxNum - numVisible)}
      </span>
    </>
  );
}

export default memo(Dots);
