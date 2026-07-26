/// <reference types="webpack-env" />

declare module '*.txt' {
  const value: string;
  export default value;
}

// Global stylesheets are imported for their side effects only.
// TypeScript needs a declaration for those imports,
// while the more specific *.module.* patterns below still win for CSS modules.
declare module '*.css';
declare module '*.scss';
declare module '*.sass';

declare module '*.module.css' {
  const classes: Readonly<Record<string, string>>;
  export = classes;
}

declare module '*.module.scss' {
  const classes: Readonly<Record<string, string>>;
  export = classes;
}

declare module '*.module.sass' {
  const classes: Readonly<Record<string, string>>;
  export = classes;
}
