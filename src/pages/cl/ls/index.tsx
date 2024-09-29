import type React from 'react';
import { memo } from 'react';

import LeagueStage from '#containers/LeagueStage/index';

type Props = React.ComponentProps<typeof LeagueStage>;

function CLLS(props: Props) {
  return (
    <LeagueStage
      {...props}
      tournament="cl"
    />
  );
}

export default memo(CLLS);
