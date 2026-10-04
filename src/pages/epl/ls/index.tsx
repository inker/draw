import type React from 'react';
import { memo } from 'react';

import PremierLeague from '#containers/PremierLeague/index';

type Props = React.ComponentProps<typeof PremierLeague>;

function EPLLS(props: Props) {
  return <PremierLeague {...props} />;
}

export default memo(EPLLS);
