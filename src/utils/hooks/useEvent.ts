import { useEffect } from 'react';

/**
 * Event names to event types, read off the target's `on...` properties.
 * Derived rather than listed per target,
 * so any event target works without a branch,
 * at the cost of the six events with no `on...` property to read:
 * `DOMContentLoaded`, the three composition events, `focusin` & `focusout`
 */
type HandlerEventMap<T> = {
  [K in keyof T as K extends `on${infer E}` ? E : never]-?: NonNullable<
    T[K]
  > extends (this: any, ev: infer Ev) => any
    ? Ev
    : never;
};

export default <
  T extends EventTarget,
  K extends keyof HandlerEventMap<T> & string,
>(
  target: T,
  type: K,
  listener: (e: HandlerEventMap<T>[K]) => void,
) => {
  useEffect(() => {
    // Narrowed by the signature above,
    // which EventTarget.addEventListener is too loose to express
    target.addEventListener(type, listener as EventListener);
    return () => {
      target.removeEventListener(type, listener as EventListener);
    };
  }, [target, type, listener]);
};
