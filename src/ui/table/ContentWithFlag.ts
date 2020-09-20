import styled, { css } from 'styled-components'

import { Country } from 'model/types'
import getCountryFlagUrl from 'utils/getCountryFlagUrl'

import Content from './Content'

const ContentWithoutFlag = styled(Content)`
  background-position-y: 1px;
  background-size: 16px;
  background-repeat: no-repeat;

  padding-left: 19px;

  @media (max-width: 999px) {
    background-size: 12px;
    padding-left: 13px;
  }
`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props {
  country?: Country,
}

const ContentWithFlag = styled(ContentWithoutFlag)<Props>`
  ${({ country }) => country && css`
    background-image: url('${getCountryFlagUrl(country)}');
  `}
`

export default ContentWithFlag
