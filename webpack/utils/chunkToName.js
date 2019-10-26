const path = require('path')

const SEP_RE = new RegExp(`\\${path.sep}`, 'g')
// const IS_REACT = /node_modules.+?(react|styled)/
const PAGES_RE = /pages[\/\\](.+?)(index)?\.[jt]sx?/

const moduleToFileNames = (module) => {
  if (!module.request || !module.optional) {
    return null
  }
  const relativePath = path.relative(module.context, module.request)
  const tokens = relativePath.match(PAGES_RE)
  return tokens && tokens[1].replace(SEP_RE, '.').slice(0, -1)
}

module.exports = (chunk) =>
  chunk.name
    || Array.from(chunk.modulesIterable, moduleToFileNames).find((name) => name)
    || null
