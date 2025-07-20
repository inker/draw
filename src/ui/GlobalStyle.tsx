import { memo, useEffect, useRef } from 'react';

export const css = (strings: TemplateStringsArray, ...values: readonly any[]) =>
  String.raw(
    {
      raw: strings,
    },
    ...values,
  );

export function useGlobalStyle(content: string) {
  const elRef = useRef<HTMLStyleElement>(null);

  useEffect(() => {
    const el = document.createElement('style');
    document.head.append(el);
    elRef.current = el;

    return () => {
      el.remove();
    };
  }, []);

  useEffect(() => {
    elRef.current!.textContent = content;
  }, [content]);
}

interface Props {
  styles: string;
}

const GlobalStyle = ({ styles }: Props) => {
  useGlobalStyle(styles);
  return undefined;
};

export default memo(GlobalStyle);
