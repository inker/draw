import delay from 'delay.js';

import type Team from '#model/team';
import UnknownNationalTeam from '#model/team/UnknownNationalTeam';
import { type DrawRoute } from '#model/resolveDrawRoute';
import isFirefox from '#utils/browser';
import { resetFastDraw } from '#store/useFastDraw';

import getPage from './getPage';
import getPotsFromBert from './getPotsFromBert';
import getWcPots from './getWcPots';
import prefetchFlags from './prefetchFlags';

interface LoadedDraw {
  Page: React.ComponentType<any>;
  pots: readonly (readonly Team[])[];
}

export default async ({
  tournament,
  stage,
  season,
}: DrawRoute): Promise<LoadedDraw> => {
  const [Page, { pots }] = await Promise.all([
    getPage(tournament, stage),
    tournament === 'wc'
      ? getWcPots(season)
      : getPotsFromBert(tournament, stage, season),
  ]);

  if (!isFirefox) {
    const teamsWithFlags = [
      pots.flat().filter(team => !(team instanceof UnknownNationalTeam)),
    ];
    await Promise.race([
      // @ts-expect-error
      prefetchFlags(teamsWithFlags),
      delay(5000),
    ]);
  }

  // Last, so the draw being left keeps its fast mode for as long as it is on screen.
  // The new one mounts with it off, as every draw does.
  resetFastDraw();

  return {
    Page,
    pots,
  };
};
