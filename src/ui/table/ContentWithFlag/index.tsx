import { memo, useMemo } from 'react';
import clsx from 'clsx';

import { type Country } from '#model/types';
import getCountryFlagUrl from '#utils/getCountryFlagUrl';

import Content from '../Content';

import * as styles from './styles.module.scss';

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  country: Country;
};

function ContentWithFlag({ className, style, country, ...otherProps }: Props) {
  const resolvedStyle = useMemo(
    () =>
      ({
        ...style,
        backgroundImage: `url('${getCountryFlagUrl(country)}')`,
      }) as const,
    [country, style],
  );

  return (
    <Content
      className={clsx(styles.root, className)}
      style={resolvedStyle}
      {...otherProps}
    />
  );
}

export default memo(ContentWithFlag);
