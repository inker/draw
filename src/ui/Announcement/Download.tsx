import React, {
  useState,
  useEffect,
  useCallback,
  memo,
} from 'react'

import ButtonLink from 'ui/ButtonLink'
import NoTransitions from 'ui/NoTransitions'

const takeScreenshotPromise = (
  import(/* webpackChunkName: "screenshot", webpackPrefetch: true */ 'utils/takeScreenshot')
)

interface Props {
  completed: boolean,
  groupsElement: HTMLElement | null,
}

const Download = ({
  completed,
  groupsElement,
}: Props) => {
  const [downloadClicked, setDownloadClicked] = useState<null | 'png' | 'svg'>(null)

  useEffect(() => {
    (async () => {
      if (!downloadClicked) {
        return
      }
      try {
        if (!groupsElement) {
          throw new Error('groups element is null')
        }
        const mod = await takeScreenshotPromise
        await mod.default(groupsElement, downloadClicked)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [downloadClicked])

  useEffect(() => {
    if (!completed) {
      setDownloadClicked(null)
    }
  }, [completed])

  const onDownloadPngClick = useCallback(() => setDownloadClicked('png'), [setDownloadClicked])
  const onDownloadSvgClick = useCallback(() => setDownloadClicked('svg'), [setDownloadClicked])

  return completed && !!groupsElement ? (
    <div>
      {downloadClicked && (
        <NoTransitions />
      )}
      {'Download as '}
      <ButtonLink onClick={onDownloadPngClick}>PNG</ButtonLink>
      {', '}
      <ButtonLink onClick={onDownloadSvgClick}>SVG</ButtonLink>
    </div>
  ) : null
}

export default memo(Download)
