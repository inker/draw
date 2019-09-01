import React, {
  useState,
  useEffect,
  memo,
} from 'react'

import Team from 'model/team'

interface Props {
  tournament: string,
  stage: string,
  pots: Team[][] | null,
  onLoadError: (err: Error) => void,
}

const PageLoader = ({
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
      pots={pots}
    />
  )
}

export default memo(PageLoader)
