import React, {
  memo,
  lazy,
} from 'react'

import fastclick from 'fastclick'

import Routes from './routes'

const Version = lazy(() => import(/* webpackChunkName: "version" */ './Version'))

interface Props {
  initial: boolean,
  setPopup: (o: { waiting?: boolean, error?: string | null }) => void,
  onLoadError: (err: Error) => void,
}

const Main = (props: Props) => (
  <>
    <Version />
    <Routes
      {...props}
    />
  </>
)

// @ts-ignore
fastclick.attach(document.body)

export default memo(Main)
