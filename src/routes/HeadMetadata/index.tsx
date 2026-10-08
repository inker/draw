import { memo } from 'react';
import { useMatch } from 'react-router-dom';

import type Tournament from '#model/Tournament';

import data from './data';

const routeProps = {
  path: '/:tournament/*',
  sensitive: true,
};

function HeadMetaData() {
  const match = useMatch(routeProps);
  const tournament = match?.params?.tournament;
  const o = (tournament && data(tournament as Tournament)) || null;
  return (
    o && (
      <>
        <title>{o.title}</title>
        <link
          rel="icon"
          type="image/x-icon"
          href={o.favicon}
        />
        <meta
          name="theme-color"
          content={o.themeColor}
        />
        <meta
          name="description"
          content={o.description}
        />
      </>
    )
  );
}

export default memo(HeadMetaData);
