import styled from 'styled-components'

import Content from 'ui/table/Content'

const DummyContent = styled(Content)`
  visibility: hidden;
  pointer-events: none;

  &::before {
    content: '.';
  }
`

export default DummyContent
