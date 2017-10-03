const HOST = 'https://heather-guardian.glitch.me'

export default (url: string, encoding: string) =>
  `${HOST}/?url=${encodeURIComponent(url)}${encoding ? `&encoding=${encoding}` : ''}`
