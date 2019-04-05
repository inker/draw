import React, {
  memo,
  lazy,
  Suspense,
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
    <Suspense fallback={false}>
      <Version />
    </Suspense>
    <Routes
      initial={props.initial}
      setPopup={props.setPopup}
      onLoadError={props.onLoadError}
    />
  </>
)

// @ts-ignore
fastclick.attach(document.body)

export default memo(Main)
