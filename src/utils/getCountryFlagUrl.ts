import { memoize } from 'lodash';

import countries from '#data/countries';
import { type Country } from '#model/types';

const requireFlag = import.meta.webpackContext('flag-icons/flags/4x3/', {
  recursive: false,
  regExp: /\.svg$/,
});
const requireAltFlag = import.meta.webpackContext('../assets/altFlags/', {
  recursive: false,
  regExp: /\.svg$/,
});

const flags = {
  Moldova: requireAltFlag('./mda.svg'),
} as const satisfies Partial<Record<Country, string>>;

function getCountryFlagUrl(country: Country) {
  const exceptionalFlag = flags[country as keyof typeof flags];
  if (exceptionalFlag) {
    return exceptionalFlag;
  }

  const flag = countries[country]?.flag;
  return flag ? requireFlag(`./${flag}.svg`) : undefined;
}

export default memoize(getCountryFlagUrl);
