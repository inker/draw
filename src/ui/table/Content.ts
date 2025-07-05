import styled from 'styled-components';

import BaseContent from './BaseContent';

const Content = styled(BaseContent)`
  overflow: hidden;
  margin: 0 3px;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 999px) {
    font-family:
      'Roboto Condensed', RobotoCondensed, RobotoCondensed-Regular, sans-serif;
  }
`;

export default Content;
