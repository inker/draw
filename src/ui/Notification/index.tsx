import { type ReactNode, memo } from 'react';

import Modal from '../Modal';

import * as styles from './styles.module.scss';

interface Props {
  children: ReactNode;
  noAnimation: boolean;
}

function Notification({ noAnimation, children }: Props) {
  return (
    <Modal noAnimation={noAnimation}>
      <div className={styles.text}>{children}</div>
    </Modal>
  );
}

export default memo(Notification);
