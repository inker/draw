import { memo, useMemo } from 'react';
import clsx from 'clsx';

import { type Country } from '#model/types';
import getCountryFlagUrl from '#utils/getCountryFlagUrl';

import Content from '../Content';

import * as styles from './styles.module.css';

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  country: Country;
  /**
   * Shown in place of the country's flag
   */
  iconUrl?: string;
};

function ContentWithFlag({
  className,
  style,
  country,
  iconUrl,
  ...otherProps
}: Props) {
  const resolvedStyle = useMemo(
    () =>
      ({
        ...style,
        backgroundImage: `url('${iconUrl ?? getCountryFlagUrl(country)}')`,
      }) as const,
    [country, iconUrl, style],
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
