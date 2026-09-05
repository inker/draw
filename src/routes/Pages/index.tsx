import { memo, useEffect, useState } from 'react';
import delay from 'delay.js';

import type Team from '#model/team';
import UnknownNationalTeam from '#model/team/UnknownNationalTeam';
import { type DrawRoute } from '#model/resolveDrawRoute';
import { isFirefox } from '#utils/browser';
import useDrawId from '#store/useDrawId';
import usePopup from '#store/usePopup';

import getPage from './getPage';
import getPotsFromBert from './getPotsFromBert';
import getWcPots from './getWcPots';
import prefetchFlags from './prefetchFlags';

const initialState = {
  Page: null,
  pots: null,
  season: 0,
};

// Long enough to read, short enough that the previous draw is not hidden for good
const errorDuration = 5000;

interface Props {
  route: DrawRoute;
}

interface State {
  Page: React.ComponentType<any> | null;
  pots: readonly (readonly Team[])[] | null;
  season: number;
}

function Pages({ route }: Props) {
  const { tournament, stage, season: requestedSeason } = route;

  const [, setPopup] = usePopup();

  const [{ Page, season, pots }, setState] = useState<State>(initialState);

  const [drawId, refreshDrawId] = useDrawId();

  const fetchData = async () => {
    setPopup({
      waiting: true,
    });

    try {
      const potsPromise =
        tournament === 'wc'
          ? getWcPots(requestedSeason)
          : getPotsFromBert(tournament, stage, requestedSeason);

      const newPage = await getPage(tournament, stage);

      const data = await potsPromise;
      const { pots: newPots } = data;

      if (!isFirefox) {
        const teamsWithFlags = [
          newPots.flat().filter(team => !(team instanceof UnknownNationalTeam)),
        ];
        await Promise.race([
          // @ts-expect-error
          prefetchFlags(teamsWithFlags),
          delay(5000),
        ]);
      }

      setState({
        Page: newPage,
        pots: newPots,
        season: requestedSeason,
      });
      refreshDrawId();

      setPopup({
        waiting: false,
        error: null,
      });
    } catch (err) {
      console.error(err);

      // The route is resolved against the data that exists before it gets here,
      // so a failure now is the network or a bad chunk & navigating cannot fix it
      setPopup({
        waiting: false,
        error: 'Could not fetch data',
      });

      await delay(errorDuration);
      setPopup({
        error: null,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [requestedSeason, stage, tournament]);

  const isUefaClubTournament =
    tournament === 'cl' || tournament === 'el' || tournament === 'ecl';

  return (
    pots &&
    Page && (
      <Page
        key={drawId}
        tournament={tournament}
        stage={stage}
        season={season}
        pots={pots}
        isFirstPotShortDraw={isUefaClubTournament && season >= 2021}
      />
    )
  );
}

export default memo(Pages);
