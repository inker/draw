import { memo } from 'react';
import { Global, css } from '@emotion/react';

interface Props {
  className: string;
  blockSize: number;
}

function TableStyles({ className, blockSize }: Props) {
  return (
    <Global
      styles={css`
        .${className} {
          > thead {
            > tr {
              > th:nth-of-type(${blockSize}n + 2) {
                border-left: 1px double var(--block-border-color);
              }
            }
          }

          > tbody {
            > tr {
              &:nth-of-type(${blockSize}n + 1) {
                border-top: 1px double var(--block-border-color);
              }

              > td:nth-of-type(${blockSize}n + 2) {
                border-left: 1px double var(--block-border-color);
              }
            }
          }
        }
      `}
    />
  );
}

export default memo(TableStyles);
