import { kebabCase, isNil } from 'lodash'

interface StyleObj {
  [key: string]: string | number,
}

type Style = StyleObj | string

const randomId = () => Math.random().toString(36).slice(2)

const getClassContent = (style: Style) => Object
  .keys(style)
  .map(key => `${key}: ${kebabCase(style[key].toString())}`)
  .join(',')

let styleElement: HTMLStyleElement

const template = (strings: TemplateStringsArray, ...keys: any[]) =>
  strings.reduce((prev, cur, i) => `${prev}${cur}${isNil(keys[i]) ? '' : keys[i]}`, '')

export default (strings: TemplateStringsArray, ...keys: any[]) => {
  if (!styleElement) {
    styleElement = document.createElement('style')
    document.head.appendChild(styleElement)
  }
  const className = randomId()
  const content = template(strings, ...keys)
  styleElement.textContent += `.${className}{${content}}`
  return className
}
