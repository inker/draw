export default (prefix = '') =>
  `${prefix}${Math.random().toString(36).slice(2)}`;
