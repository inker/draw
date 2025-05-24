import styled from 'styled-components';

import Table from '#ui/table/Table';

interface Props {
  $highlighted?: boolean;
}

const Root = styled(Table)<Props>`
  ${props =>
    props.$highlighted &&
    `

  `}
`;

export default Root;
