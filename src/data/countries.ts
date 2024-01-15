import { type Alpha2Code } from 'i18n-iso-countries'

import { type Confederation } from 'model/types'

type Flag = Lowercase<Alpha2Code> | `gb-${string}`

interface UefaObj {
  confederation: 'UEFA'
  bert: Lowercase<string>
  flag: Flag
}

interface OtherConfObj {
  confederation: Exclude<Confederation, 'UEFA'>
  flag: Flag
}

export default {
  Albania: {
    confederation: 'UEFA',
    bert: 'alb',
    flag: 'al',
  },
  Andorra: {
    confederation: 'UEFA',
    bert: 'and',
    flag: 'ad',
  },
  Armenia: {
    confederation: 'UEFA',
    bert: 'arm',
    flag: 'am',
  },
  Austria: {
    confederation: 'UEFA',
    bert: 'aut',
    flag: 'at',
  },
  Azerbaijan: {
    confederation: 'UEFA',
    bert: 'azb',
    flag: 'az',
  },
  Belgium: {
    confederation: 'UEFA',
    bert: 'bel',
    flag: 'be',
  },
  Belarus: {
    confederation: 'UEFA',
    bert: 'bls',
    flag: 'by',
  },
  'Bosnia & Herzegovina': {
    confederation: 'UEFA',
    bert: 'bos',
    flag: 'ba',
  },
  Bulgaria: {
    confederation: 'UEFA',
    bert: 'bul',
    flag: 'bg',
  },
  Croatia: {
    confederation: 'UEFA',
    bert: 'cro',
    flag: 'hr',
  },
  Cyprus: {
    confederation: 'UEFA',
    bert: 'cyp',
    flag: 'cy',
  },
  Czechia: {
    confederation: 'UEFA',
    bert: 'cze',
    flag: 'cz',
  },
  Denmark: {
    confederation: 'UEFA',
    bert: 'den',
    flag: 'dk',
  },
  England: {
    confederation: 'UEFA',
    bert: 'eng',
    flag: 'gb-eng',
  },
  Spain: {
    confederation: 'UEFA',
    bert: 'esp',
    flag: 'es',
  },
  Estonia: {
    confederation: 'UEFA',
    bert: 'est',
    flag: 'ee',
  },
  'Faroe Islands': {
    confederation: 'UEFA',
    bert: 'far',
    flag: 'fo',
  },
  Finland: {
    confederation: 'UEFA',
    bert: 'fin',
    flag: 'fi',
  },
  France: {
    confederation: 'UEFA',
    bert: 'fra',
    flag: 'fr',
  },
  Georgia: {
    confederation: 'UEFA',
    bert: 'geo',
    flag: 'ge',
  },
  Germany: {
    confederation: 'UEFA',
    bert: 'ger',
    flag: 'de',
  },
  Gibraltar: {
    confederation: 'UEFA',
    bert: 'gib',
    flag: 'gi',
  },
  Greece: {
    confederation: 'UEFA',
    bert: 'gre',
    flag: 'gr',
  },
  Hungary: {
    confederation: 'UEFA',
    bert: 'hun',
    flag: 'hu',
  },
  Ireland: {
    confederation: 'UEFA',
    bert: 'irl',
    flag: 'ie',
  },
  Iceland: {
    confederation: 'UEFA',
    bert: 'isl',
    flag: 'is',
  },
  Israel: {
    confederation: 'UEFA',
    bert: 'isr',
    flag: 'il',
  },
  Italy: {
    confederation: 'UEFA',
    bert: 'ita',
    flag: 'it',
  },
  Kazakhstan: {
    confederation: 'UEFA',
    bert: 'kaz',
    flag: 'kz',
  },
  Kosovo: {
    confederation: 'UEFA',
    bert: 'kos',
    flag: 'xk',
  },
  Latvia: {
    confederation: 'UEFA',
    bert: 'lat',
    flag: 'lv',
  },
  Liechtenstein: {
    confederation: 'UEFA',
    bert: 'lie',
    flag: 'li',
  },
  Lithuania: {
    confederation: 'UEFA',
    bert: 'lit',
    flag: 'lt',
  },
  Luxembourg: {
    confederation: 'UEFA',
    bert: 'lux',
    flag: 'lu',
  },
  'North Macedonia': {
    confederation: 'UEFA',
    bert: 'mac',
    flag: 'mk',
  },
  Malta: {
    confederation: 'UEFA',
    bert: 'mlt',
    flag: 'mt',
  },
  Moldova: {
    confederation: 'UEFA',
    bert: 'mol',
    flag: 'md',
  },
  Montenegro: {
    confederation: 'UEFA',
    bert: 'mon',
    flag: 'me',
  },
  Netherlands: {
    confederation: 'UEFA',
    bert: 'ned',
    flag: 'nl',
  },
  'Northern Ireland': {
    confederation: 'UEFA',
    bert: 'nir',
    flag: 'gb-nir',
  },
  Norway: {
    confederation: 'UEFA',
    bert: 'nor',
    flag: 'no',
  },
  Poland: {
    confederation: 'UEFA',
    bert: 'pol',
    flag: 'pl',
  },
  Portugal: {
    confederation: 'UEFA',
    bert: 'por',
    flag: 'pt',
  },
  Romania: {
    confederation: 'UEFA',
    bert: 'rom',
    flag: 'ro',
  },
  Russia: {
    confederation: 'UEFA',
    bert: 'rus',
    flag: 'ru',
  },
  Scotland: {
    confederation: 'UEFA',
    bert: 'sco',
    flag: 'gb-sct',
  },
  Slovenia: {
    confederation: 'UEFA',
    bert: 'slo',
    flag: 'si',
  },
  'San Marino': {
    confederation: 'UEFA',
    bert: 'sma',
    flag: 'sm',
  },
  Serbia: {
    confederation: 'UEFA',
    bert: 'srb',
    flag: 'rs',
  },
  Switzerland: {
    confederation: 'UEFA',
    bert: 'sui',
    flag: 'ch',
  },
  Slovakia: {
    confederation: 'UEFA',
    bert: 'svk',
    flag: 'sk',
  },
  Sweden: {
    confederation: 'UEFA',
    bert: 'swe',
    flag: 'se',
  },
  Turkey: {
    confederation: 'UEFA',
    bert: 'tur',
    flag: 'tr',
  },
  Ukraine: {
    confederation: 'UEFA',
    bert: 'ukr',
    flag: 'ua',
  },
  Wales: {
    confederation: 'UEFA',
    bert: 'wal',
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
} as const satisfies Record<string, UefaObj | OtherConfObj>
