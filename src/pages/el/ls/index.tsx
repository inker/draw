import type React from 'react';
import { memo } from 'react';

import LeagueStage from '#containers/LeagueStage/index';

type Props = React.ComponentProps<typeof LeagueStage>;

function ELLS(props: Props) {
  return <LeagueStage {...props} />;
}

export default memo(ELLS);
