import styled from 'styled-components';

import BowlBall from '../BowlBall';

const GroupBall = styled(BowlBall)`
  &:hover {
    ${props => !props.noHover && 'background: radial-gradient(#ccf, #ccf)'}
  }
`;

export default GroupBall;
