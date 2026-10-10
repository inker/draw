import { memo } from 'react';

import useDrawId from '#store/useDrawId';

import { pageRouteApi } from '../routeApi';

function Pages() {
  const { tournament, stage, season } = pageRouteApi.useParams();
  const { Page, pots } = pageRouteApi.useLoaderData();

  const [drawId] = useDrawId();

  const isUefaClubTournament =
    tournament === 'cl' || tournament === 'el' || tournament === 'ecl';

  return (
    <Page
      key={drawId}
      tournament={tournament}
      stage={stage}
      season={season}
      pots={pots}
      isFirstPotShortDraw={isUefaClubTournament && season >= 2021}
    />
  );
}

export default memo(Pages);
