import type React from 'react';
import { memo } from 'react';

import LeagueStage from '#containers/LeagueStage/index';

type Props = React.ComponentProps<typeof LeagueStage>;

function CLLS(props: Props) {
  return <LeagueStage {...props} />;
}

export default memo(CLLS);
