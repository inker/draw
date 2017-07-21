const HOST = 'https://proxy-antonv.rhcloud.com'

export default (url: string, encoding: string) =>
  `${HOST}/?url=${encodeURIComponent(url)}${encoding ? `&encoding=${encoding}` : ''}`
