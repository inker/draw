import styled, { css } from 'styled-components'

import { type Country } from 'model/types'
import getCountryFlagUrl from 'utils/getCountryFlagUrl'

import Content from './Content'

const ContentWithoutFlag = styled(Content)`
  padding-left: 19px;
  background-position-y: 1px;
  background-size: 16px;
  background-repeat: no-repeat;

  @media (max-width: 999px) {
    padding-left: 13px;
    background-size: 12px;
  }
`

interface Props {
  $country?: Country,
}

const ContentWithFlag = styled(ContentWithoutFlag)<Props>`
  ${({ $country: country }) => country && css`
    background-image: url('${getCountryFlagUrl(country)}');
  `}
`

export default ContentWithFlag
