(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[2143],{40945:(e,t,n)=>{"use strict";n(29232),n(76487);var r=n(67294),a=n(73935),i=n(29163),o=n(39711),l=n(47810),s=n(93197),c=n(19760);const m=()=>{const[e]=(0,s.Z)(),t=(0,c.Z)("(prefers-color-scheme: dark)");return"dark"===e||"auto"===e&&t},u={isDarkMode:!1,border:"#aaa solid 1px"},d={isDarkMode:!0,border:"#222 solid 1px"},f=i.vJ`
  body {
    font-family: Tahoma, Arial, sans-serif;
    color: ${e=>e.theme.isDarkMode?"white":""};
    background-color: ${e=>e.theme.isDarkMode?"#272a33":""};
  }
`,h=i.ZP.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${1e8};
`,v=i.F4`
  from {
    opacity: 0;
  }
  to {}
`,E=(0,i.ZP)(h)`
  background-color: ${e=>e.theme.isDarkMode?"#222":"white"};
  opacity: 0.75;

  ${e=>e.animate&&i.iv`
    animation: ${v} 0.25s ease-out;
  `}
`,g=(0,i.ZP)(h)`
  display: flex;
  justify-content: center;
  align-items: center;
`,w=(0,r.memo)((({noAnimation:e,children:t})=>r.createElement("div",null,r.createElement(E,{animate:!e}),r.createElement(g,null,t)))),p=i.ZP.div`
  font-size: 5vw;
  color: ${e=>e.theme.isDarkMode?"":"#808080"};
  user-select: none;

  @media (max-width: 999px) {
    font-size: 8vw;
  }
`,k=(0,r.memo)((({noAnimation:e,children:t})=>r.createElement(w,{noAnimation:e},r.createElement(p,null,t))));var b=n(89311);const Z=(0,r.memo)((()=>{const[e]=(0,l.Z)(),t=(0,r.useCallback)((t=>r.createElement(k,Object.assign({},t,{noAnimation:e.initial}))),[e.initial]),{error:n,waiting:a}=e;return n?r.createElement(t,null,n):a?r.createElement(t,null,"wait",r.createElement(b.Z,{initialNum:3,maxNum:3,interval:1e3})):null})),y=Promise.all([n.e(4593),n.e(7770)]).then(n.bind(n,7666)),x=Promise.all([n.e(4593),n.e(6451)]).then(n.bind(n,63478)),S=(0,r.lazy)((()=>y)),z=(0,r.lazy)((()=>x)),P=i.ZP.div`
  & * {
    box-sizing: border-box;
  }
`,C=()=>{const[e,t]=(0,l.Z)(),n=m();return(0,r.useEffect)((()=>{e.initial&&!e.waiting&&t({initial:!1})}),[e.waiting]),r.createElement(i.f6,{theme:n?d:u},r.createElement(f,null),r.createElement(P,null,r.createElement(Z,null),r.createElement(r.Suspense,{fallback:!1},r.createElement(o.UT,null,r.createElement(S,null))),r.createElement(r.Suspense,{fallback:!1},r.createElement(z,null))))};a.render(r.createElement(C,null),document.getElementById("app"))},47810:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});var r=n(67294),a=n(71174);const i=(0,a.Z)({initial:!0,waiting:!0,error:null}),o=()=>{const[e,t]=i();var n;return[e,(0,r.useCallback)((n=t,(0,r.useCallback)((e=>n((t=>({...t,...e instanceof Function?e(t):e})))),[n])),[t])]}},93197:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});var r=n(6557),a=n(84719);const i=["light","dark","auto"],o=(0,a.Z)("store:theme","light",{parse:r,serialize:r,validate:e=>i.includes(e)})},89311:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var r=n(67294);const a=n(29163).ZP.span`
  opacity: 0;
`,i=(0,r.memo)((({initialNum:e,maxNum:t,interval:n})=>{const[i,o]=(0,r.useState)(e);return(0,r.useEffect)((()=>{let e;const r=()=>{e=setTimeout((()=>{o((e=>(e+1)%(t+1))),r()}),n)};return r(),()=>{clearTimeout(e)}}),[]),r.createElement(r.Fragment,null,r.createElement("span",null,".".repeat(i)),r.createElement(a,null,".".repeat(t-i)))}))},72660:(e,t,n)=>{"use strict";n.d(t,{vU:()=>i,G6:()=>o});var r=n(51206);const a=n.n(r)().getParser(window.navigator.userAgent),i=(a.getPlatformType(),"Firefox"===a.getBrowserName()),o="Safari"===a.getBrowserName()},19760:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var r=n(67294),a=n(72660);const i=e=>{const t=(0,r.useMemo)((()=>window.matchMedia(e)),[e]);a.G6&&(t.addEventListener=(e,n)=>t.addListener(n),t.removeEventListener=(e,n)=>t.removeListener(n));const[n,i]=(0,r.useState)(t.matches);return(0,r.useEffect)((()=>{const e=e=>{i(e.matches)};return t.addEventListener("change",e),()=>{t.removeEventListener("change",e)}}),[t]),n}},71174:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var r=n(67294),a=n(97019);const i=e=>{let t=e instanceof Function?e():e;const n=[];return()=>{const e=(0,r.useState)(t)[1];(0,r.useEffect)((()=>(n.push(e),()=>{a(n,e)})),[]);const i=(0,r.useCallback)((e=>{t=e instanceof Function?e(t):e;for(const e of n)e(t)}),[t,n]);return[t,i]}}},84719:(e,t,n)=>{"use strict";n.d(t,{Z:()=>l});var r=n(67294),a=n(97527),i=n(71174);const o={parse:e=>JSON.parse(e),serialize:e=>JSON.stringify(e),validate:a},l=(e,t,n)=>{const a={...o,...n},l=(0,i.Z)((()=>{try{const t=window.localStorage.getItem(e);if(t){const e=a.parse(t);if(a.validate(e))return e}}catch(e){console.error(e)}try{window.localStorage.setItem(e,a.serialize(t))}catch(e){console.error(e)}return t}));return()=>{const[n,i]=l(),o=(0,r.useCallback)((t=>{try{const r=t instanceof Function?t(n):t;i(r),window.localStorage.setItem(e,a.serialize(r))}catch(e){console.error(e)}}),[i]),s=(0,r.useCallback)((()=>{i(t);try{window.localStorage.removeItem(e)}catch(e){console.error(e)}}),[i]);return[n,o,s]}}}},0,[[40945,523,3935,5528]]]);