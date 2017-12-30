import 'normalize.css'
import React from 'react'
import ReactDom from 'react-dom'
import Import from 'react-import'
import styled from 'styled-components'

import Popup from 'components/Popup'

const Root = styled.div`
  font-family: Tahoma, Arial, sans-serif;
`

ReactDom.render(
  <Root>
    <Import
      component={import(/* webpackChunkName: "main" */ './Main')}
      loading={<Popup noAnimation={true}>wait...</Popup>}
    />
  </Root>,
  document.getElementById('app'),
)
