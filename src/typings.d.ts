declare module '*.txt' {
  const value: string;
  export default value;
}

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
