export const once = <K extends keyof HTMLElementEventMap>(
  el: EventTarget,
  eventType: K,
) => new Promise<HTMLElementEventMap[K]>(resolve => {
  el.addEventListener(eventType, function handler(e) {
    el.removeEventListener(eventType, handler)
    resolve(e)
  })
})

export const transitionEnd = (el: Element) =>
  once(el, 'transitionend')
