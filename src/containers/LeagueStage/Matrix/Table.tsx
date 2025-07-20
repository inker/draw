import { memo, useRef } from 'react';
import clsx from 'clsx';

import GlobalStyle, { css } from '#ui/GlobalStyle';
import useTableColumnHover from '#utils/hooks/useTableColumnHover';
import getRandomId from '#utils/getRandomId';

import TableStyles from './TableStyles';

type Props = React.HTMLAttributes<HTMLTableElement> & {
  hoverStyle: string;
  blockSize: number;
};

function Table({ className, blockSize, hoverStyle, ...otherProps }: Props) {
  const randomIdRef = useRef(getRandomId());

  const tableClass = `table-${randomIdRef.current}`;

  const columnHover = useTableColumnHover();

  return (
    <>
      <TableStyles
        className={tableClass}
        blockSize={blockSize}
      />
      <GlobalStyle
        styles={
          columnHover.index === undefined
            ? ''
            : css`
                .${tableClass} {
                  > thead {
                    > tr {
                      > th:nth-of-type(${columnHover.index + 1}):not(
                          :first-of-type
                        ) {
                        ${hoverStyle}
                      }
                    }
                  }

                  > tbody {
                    > tr {
                      &:hover {
                        ${hoverStyle}
                      }

                      > td:nth-of-type(${columnHover.index + 1}):not(
                          :first-of-type
                        ) {
                        ${hoverStyle}
                      }
                    }
                  }
                }
              `
        }
      />
      <table
        className={clsx(tableClass, className)}
        // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
        onMouseOver={columnHover.onMouseOver}
        // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
        onMouseOut={columnHover.onMouseOut}
        {...otherProps}
      />
    </>
  );
}

export default memo(Table);
