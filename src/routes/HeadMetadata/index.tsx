import { memo } from 'react';

import { drawRouteApi } from '../routeApi';

import data from './data';

function HeadMetaData() {
  const tournament = drawRouteApi.useParams({
    select: params => params.tournament,
  });
  const o = data(tournament);
  return (
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
  );
}

export default memo(HeadMetaData);
