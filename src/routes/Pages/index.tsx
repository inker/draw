import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import delay from 'delay.js';

import type Team from '#model/team';
import UnknownNationalTeam from '#model/team/UnknownNationalTeam';
import type Tournament from '#model/Tournament';
import type Stage from '#model/Stage';
import { isFirefox } from '#utils/browser';
import usePopup from '#store/usePopup';

import currentSeasonByTournament from '../currentSeasonByTournament';

import getPage from './getPage';
import getPotsFromBert from './getPotsFromBert';
import getWcPots from './getWcPots';
import prefetchFlags from './prefetchFlags';

const initialState = {
  Page: null,
  pots: null,
  season: currentSeasonByTournament('cl', 'gs'),
};

interface Match {
  tournament: Tournament;
  stage: Stage;
  season: string;
}

interface Props {
  tournament: Tournament;
  stage: Stage;
  season: number;
  drawId: string;
  onSeasonChange: (
    tournament: Tournament,
    stage: Stage,
    season?: number,
  ) => void;
}

interface State {
  Page: React.ComponentType<any> | null;
  pots: readonly (readonly Team[])[] | null;
  pairings?: readonly (readonly [Team, Team])[];
  // tournament: Tournament,
  // stage: Stage,
  season: number; // for error handling (so that we know the previous season)
}

function Pages({ drawId, tournament, stage, season, onSeasonChange }: Props) {
  const params = useParams();
  const [, setPopup] = usePopup();

  const [{ Page, pots, pairings }, setState] = useState<State>(initialState);

  const fetchData = async () => {
    setPopup({
      waiting: true,
    });

    try {
      const potsPromise =
        tournament === 'wc'
          ? getWcPots(season)
          : getPotsFromBert(tournament, stage, season);

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
        pairings: 'pairings' in data ? data.pairings : undefined,
        // tournament,
        // stage,
        season,
      });

      setPopup({
        waiting: false,
        error: null,
      });
    } catch (err) {
      console.error(err);
      setPopup({
        waiting: false,
        error: 'Could not fetch data',
      });

      await delay(1000);
      const { tournament: newTournament, stage: newStage } =
        params as unknown as Match;

      const newSeason =
        pots && season !== currentSeasonByTournament(newTournament, newStage)
          ? season
          : undefined;
      onSeasonChange(newTournament, newStage, newSeason);
      setPopup({
        error: null,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [season, stage, tournament]);

  const isUefaClubTournament =
    tournament === 'cl' || tournament === 'el' || tournament === 'ecl';

  return (
    pots &&
    Page && (
      <Page
        key={drawId}
        tournament={tournament}
        stage={params.stage}
        season={season}
        pots={pots}
        tvPairings={pairings}
        isFirstPotShortDraw={isUefaClubTournament && season >= 2021}
      />
    )
  );
}

export default memo(Pages);
