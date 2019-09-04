import React, {
  useState,
  useEffect,
  memo,
} from 'react'

import Team from 'model/team'

interface Props {
  season: number,
  tournament: string,
  stage: string,
  pots: Team[][] | null,
  onLoadError: (err: Error) => void,
}

const PageLoader = ({
  season,
  tournament,
  stage,
  pots,
  onLoadError,
  ...props
}: Props) => {
  const [mod, setMod] = useState<{ default: any } | null>(null)

  useEffect(() => {
    import(`pages/${tournament}/${stage}`)
      .then(setMod)
      .catch(onLoadError)
  }, [tournament, stage])

  const Page = mod && mod.default

  return pots && Page && (
    <Page
      {...props}
      season={season}
      pots={pots}
    />
  )
}

export default memo(PageLoader)
