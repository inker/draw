import {
  type RefObject,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react'

import delay from 'delay.js'

import ButtonLink from 'ui/ButtonLink'
import NoTransitions from 'ui/NoTransitions'

const takeScreenshotPromise = (
  import(/* webpackChunkName: "screenshot", webpackPrefetch: true */ 'utils/takeScreenshot')
)

interface Props {
  completed: boolean,
  groupsElement: RefObject<HTMLElement | null>,
}

interface State {
  downloadClicked: null | 'png' | 'svg',
  transitionsEnabled: boolean,
}

const getInitialState = (): State => ({
  downloadClicked: null,
  transitionsEnabled: true,
})

function Download({
  completed,
  groupsElement,
}: Props) {
  const [{
    downloadClicked,
    transitionsEnabled,
  }, setState] = useState(getInitialState)

  const setDownloadClicked = useCallback((format: State['downloadClicked']) => {
    setState({
      downloadClicked: format,
      transitionsEnabled: false,
    })
  }, [setState])

  useEffect(() => {
    (async () => {
      if (!downloadClicked) {
        return
      }
      try {
        const el = groupsElement.current
        if (!el) {
          throw new Error('groups element is null')
        }
        await delay(0) // TODO: remove this hack
        const mod = await takeScreenshotPromise
        await mod.default(el, downloadClicked)
      } catch (err) {
        console.error(err)
      }
      setDownloadClicked(null)
    })()
  }, [downloadClicked])

  useEffect(() => {
    if (!completed) {
      setState({
        downloadClicked: null,
        transitionsEnabled: true,
      })
    }
  }, [completed])

  const onDownloadPngClick = useCallback(() => setDownloadClicked('png'), [setDownloadClicked])
  const onDownloadSvgClick = useCallback(() => setDownloadClicked('svg'), [setDownloadClicked])

  return completed && !!groupsElement
    ? (
      <div>
        {!transitionsEnabled && (
        <NoTransitions />
        )}
        {'Download as '}
        <ButtonLink onClick={onDownloadPngClick}>PNG</ButtonLink>
        {', '}
        <ButtonLink onClick={onDownloadSvgClick}>SVG</ButtonLink>
      </div>
    )
    : null
}

export default memo(Download)
