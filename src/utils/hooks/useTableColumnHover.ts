import { useCallback, useState } from 'react';

import rangeGenerator from '#utils/rangeGenerator';

const isTableCell = (node: any): node is HTMLTableCellElement => {
  const tag = (node as Element).tagName?.toLowerCase();
  return tag === 'td' || tag === 'th';
};

export default () => {
  const [index, setIndex] = useState<number | undefined>(undefined);

  const onMouseOver = useCallback((e: React.MouseEvent<HTMLTableElement>) => {
    const cell = isTableCell(e.target)
      ? e.target
      : e.nativeEvent.composedPath().find(isTableCell);
    if (!cell) {
      setIndex(undefined);
      return;
    }
    const siblings = cell.parentNode!.children;
    const newIndex = rangeGenerator(siblings.length).find(
      i => siblings[i] === cell,
    );
    setIndex(newIndex);
  }, []);

  const onMouseOut = useCallback(() => {
    setIndex(undefined);
  }, []);

  return {
    index,
    onMouseOver,
    onMouseOut,
  };
};
