import { memo } from 'react';
import clsx from 'clsx';

import type Team from '#model/team';
import type GsTeam from '#model/team/GsTeam';
import * as cellStyles from '#ui/table/cell.module.scss';
import ContentWithFlag from '#ui/table/ContentWithFlag';

import * as styles from './styles.module.scss';

interface Props {
  teams: readonly Team[];
  pickedTeams: readonly Team[];
  selectedTeams: readonly Team[] | null;
}

function PotRow({ teams, pickedTeams, selectedTeams }: Props) {
  return (
    <tr>
      {teams.map(team => {
        const { name, country, shortName, pairing } = team as GsTeam;

        return (
          <td
            key={team.id}
            className={clsx(cellStyles.root, styles['pot-cell'])}
          >
            <ContentWithFlag
              data-cellid={team.id}
              title={
                pairing && `paired with ${pairing.shortName ?? pairing.name}`
              }
              className={clsx(
                styles['cell-content'],
                selectedTeams?.includes(team) && styles.selected,
                pickedTeams.includes(team) && styles.picked,
              )}
              country={country ?? name}
            >
              {shortName ?? name}
            </ContentWithFlag>
          </td>
        );
      })}
    </tr>
  );
}

export default memo(PotRow);
