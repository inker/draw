import { isNil } from 'lodash'

import getRandomId from 'utils/getRandomId'

let styleElement: HTMLStyleElement

const template = (strings: TemplateStringsArray, ...keys: readonly any[]) =>
  strings.reduce((prev, cur, i) => `${prev}${cur}${isNil(keys[i]) ? '' : keys[i]}`, '')

export default (strings: TemplateStringsArray, ...keys: readonly any[]) => {
  if (!styleElement) {
    styleElement = document.createElement('style')
    document.head.appendChild(styleElement)
  }
  const className = getRandomId('styled-element-')
  const content = template(strings, ...keys)
  styleElement.textContent += `.${className}{${content}}`
  return className
}
