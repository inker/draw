import { type Alpha2Code } from 'i18n-iso-countries';

import { type Confederation } from '#model/types';

type Flag = Lowercase<Alpha2Code> | `gb-${string}`;

interface ValueObj {
  confederation: Confederation;
  flag: Flag;
}

export default {
  Albania: {
    confederation: 'UEFA',
    flag: 'al',
  },
  Andorra: {
    confederation: 'UEFA',
    flag: 'ad',
  },
  Armenia: {
    confederation: 'UEFA',
    flag: 'am',
  },
  Austria: {
    confederation: 'UEFA',
    flag: 'at',
  },
  Azerbaijan: {
    confederation: 'UEFA',
    flag: 'az',
  },
  Belgium: {
    confederation: 'UEFA',
    flag: 'be',
  },
  Belarus: {
    confederation: 'UEFA',
    flag: 'by',
  },
  'Bosnia & Herzegovina': {
    confederation: 'UEFA',
    flag: 'ba',
  },
  Bulgaria: {
    confederation: 'UEFA',
    flag: 'bg',
  },
  Croatia: {
    confederation: 'UEFA',
    flag: 'hr',
  },
  Cyprus: {
    confederation: 'UEFA',
    flag: 'cy',
  },
  Czechia: {
    confederation: 'UEFA',
    flag: 'cz',
  },
  Denmark: {
    confederation: 'UEFA',
    flag: 'dk',
  },
  England: {
    confederation: 'UEFA',
    flag: 'gb-eng',
  },
  Spain: {
    confederation: 'UEFA',
    flag: 'es',
  },
  Estonia: {
    confederation: 'UEFA',
    flag: 'ee',
  },
  'Faroe Islands': {
    confederation: 'UEFA',
    flag: 'fo',
  },
  Finland: {
    confederation: 'UEFA',
    flag: 'fi',
  },
  France: {
    confederation: 'UEFA',
    flag: 'fr',
  },
  Georgia: {
    confederation: 'UEFA',
    flag: 'ge',
  },
  Germany: {
    confederation: 'UEFA',
    flag: 'de',
  },
  Gibraltar: {
    confederation: 'UEFA',
    flag: 'gi',
  },
  Greece: {
    confederation: 'UEFA',
    flag: 'gr',
  },
  Hungary: {
    confederation: 'UEFA',
    flag: 'hu',
  },
  Ireland: {
    confederation: 'UEFA',
    flag: 'ie',
  },
  Iceland: {
    confederation: 'UEFA',
    flag: 'is',
  },
  Israel: {
    confederation: 'UEFA',
    flag: 'il',
  },
  Italy: {
    confederation: 'UEFA',
    flag: 'it',
  },
  Kazakhstan: {
    confederation: 'UEFA',
    flag: 'kz',
  },
  Kosovo: {
    confederation: 'UEFA',
    flag: 'xk',
  },
  Latvia: {
    confederation: 'UEFA',
    flag: 'lv',
  },
  Liechtenstein: {
    confederation: 'UEFA',
    flag: 'li',
  },
  Lithuania: {
    confederation: 'UEFA',
    flag: 'lt',
  },
  Luxembourg: {
    confederation: 'UEFA',
    flag: 'lu',
  },
  'North Macedonia': {
    confederation: 'UEFA',
    flag: 'mk',
  },
  Malta: {
    confederation: 'UEFA',
    flag: 'mt',
  },
  Moldova: {
    confederation: 'UEFA',
    flag: 'md',
  },
  Montenegro: {
    confederation: 'UEFA',
    flag: 'me',
  },
  Netherlands: {
    confederation: 'UEFA',
    flag: 'nl',
  },
  'Northern Ireland': {
    confederation: 'UEFA',
    flag: 'gb-nir',
  },
  Norway: {
    confederation: 'UEFA',
    flag: 'no',
  },
  Poland: {
    confederation: 'UEFA',
    flag: 'pl',
  },
  Portugal: {
    confederation: 'UEFA',
    flag: 'pt',
  },
  Romania: {
    confederation: 'UEFA',
    flag: 'ro',
  },
  Russia: {
    confederation: 'UEFA',
    flag: 'ru',
  },
  Scotland: {
    confederation: 'UEFA',
    flag: 'gb-sct',
  },
  Slovenia: {
    confederation: 'UEFA',
    flag: 'si',
  },
  'San Marino': {
    confederation: 'UEFA',
    flag: 'sm',
  },
  Serbia: {
    confederation: 'UEFA',
    flag: 'rs',
  },
  Switzerland: {
    confederation: 'UEFA',
    flag: 'ch',
  },
  Slovakia: {
    confederation: 'UEFA',
    flag: 'sk',
  },
  Sweden: {
    confederation: 'UEFA',
    flag: 'se',
  },
  Türkiye: {
    confederation: 'UEFA',
    flag: 'tr',
  },
  Ukraine: {
    confederation: 'UEFA',
    flag: 'ua',
  },
  Wales: {
    confederation: 'UEFA',
    flag: 'gb-wls',
  },

  Brazil: {
    flag: 'br',
    confederation: 'CONMEBOL',
  },
  Uruguay: {
    flag: 'uy',
    confederation: 'CONMEBOL',
  },
  Argentina: {
    flag: 'ar',
    confederation: 'CONMEBOL',
  },
  Peru: {
    flag: 'pe',
    confederation: 'CONMEBOL',
  },
  Colombia: {
    flag: 'co',
    confederation: 'CONMEBOL',
  },
  Chile: {
    flag: 'cl',
    confederation: 'CONMEBOL',
  },
  Ecuador: {
    flag: 'ec',
    confederation: 'CONMEBOL',
  },

  Mexico: {
    flag: 'mx',
    confederation: 'CONCACAF',
  },
  'Costa Rica': {
    flag: 'cr',
    confederation: 'CONCACAF',
  },
  Panama: {
    flag: 'pa',
    confederation: 'CONCACAF',
  },
  Canada: {
    flag: 'ca',
    confederation: 'CONCACAF',
  },
  'United States': {
    flag: 'us',
    confederation: 'CONCACAF',
  },

  Tunisia: {
    flag: 'tn',
    confederation: 'CAF',
  },
  Egypt: {
    flag: 'eg',
    confederation: 'CAF',
  },
  Senegal: {
    flag: 'sn',
    confederation: 'CAF',
  },
  Nigeria: {
    flag: 'ng',
    confederation: 'CAF',
  },
  Morocco: {
    flag: 'ma',
    confederation: 'CAF',
  },
  Algeria: {
    flag: 'dz',
    confederation: 'CAF',
  },
  Ghana: {
    flag: 'gh',
    confederation: 'CAF',
  },
  Cameroon: {
    flag: 'cm',
    confederation: 'CAF',
  },

  Iran: {
    flag: 'ir',
    confederation: 'AFC',
  },
  Australia: {
    flag: 'au',
    confederation: 'AFC',
  },
  Japan: {
    flag: 'jp',
    confederation: 'AFC',
  },
  'South Korea': {
    flag: 'kr',
    confederation: 'AFC',
  },
  'Saudi Arabia': {
    flag: 'sa',
    confederation: 'AFC',
  },
  Qatar: {
    flag: 'qa',
    confederation: 'AFC',
  },

  'New Zealand': {
    flag: 'nz',
    confederation: 'OFC',
  },
} as const satisfies Record<string, ValueObj>;
