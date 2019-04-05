import React, {
  useState,
  useCallback,
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

  const nextComp = useCallback(
    () => import(`pages/${tournament}/${stage}/index`),
    [tournament, stage],
  )

  useEffect(() => {
    nextComp()
      .then(setMod)
      .catch(onLoadError)
  }, [tournament, stage])

  const Comp = mod && mod.default

  console.log('comp', pots && Comp)

  return pots && Comp && (
    <Comp
      {...props}
      pots={pots}
    />
  )
}

export default memo(PageLoader)
