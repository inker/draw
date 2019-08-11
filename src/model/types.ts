import countryNames from 'data/country-names.json'

export type Country = keyof typeof countryNames

export type Confederation = 'UEFA' | 'AFC' | 'CAF' | 'CONMEBOL' | 'CONCACAF' | 'OFC'
