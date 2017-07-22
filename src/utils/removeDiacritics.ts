const DIACRITICS_RE = /[\u0300-\u036f]/g

export default (s: string) =>
  s.normalize('NFD').replace(DIACRITICS_RE, '')
