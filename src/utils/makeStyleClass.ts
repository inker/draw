import getRandomId from '#utils/getRandomId';

let styleElement: HTMLStyleElement;

const template = (strings: TemplateStringsArray, ...keys: readonly any[]) =>
  strings.map((s, i) => `${s}${keys[i] == null ? '' : keys[i]}`).join('');

export default (strings: TemplateStringsArray, ...keys: readonly any[]) => {
  if (!styleElement) {
    styleElement = document.createElement('style');
    document.head.append(styleElement);
  }
  const className = getRandomId('styled-element-');
  const content = template(strings, ...keys);
  styleElement.textContent += `.${className}{${content}}`;
  return className;
};
