(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[2143],{40945:(e,t,i)=>{"use strict";var r=i(85893),s=(i(76487),i(73935)),n=i(67294),o=i(29163),a=i(39711),c=i(75703),d=i(47810),l=i(93197),u=i(19760);const m=()=>{const[e]=(0,l.Z)(),t=(0,u.Z)("(prefers-color-scheme: dark)");return"dark"===e||"auto"===e&&t},v={isDarkMode:!1,border:"#aaa solid 1px"},h={isDarkMode:!0,border:"#222 solid 1px"},f=o.vJ`
  body {
    font-family: Tahoma, Arial, sans-serif;
    color: ${e=>e.theme.isDarkMode?"white":""};
    background-color: ${e=>e.theme.isDarkMode?"#272a33":""};
  }
`,x=o.ZP.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${1e8};
`,g=o.F4`
  from {
    opacity: 0;
  }
  to {}
`,w=(0,o.ZP)(x)`
  background-color: ${e=>e.theme.isDarkMode?"#222":"white"};
  opacity: 0.75;

  ${e=>e.animate&&o.iv`
    animation: ${g} 0.25s ease-out;
  `}
`,j=(0,o.ZP)(x)`
  display: flex;
  justify-content: center;
  align-items: center;
`,p=(0,n.memo)((({noAnimation:e,children:t})=>(0,r.jsxs)("div",{children:[(0,r.jsx)(w,{animate:!e},void 0),(0,r.jsx)(j,{children:t},void 0)]},void 0))),b=o.ZP.div`
  font-size: 5vw;
  color: ${e=>e.theme.isDarkMode?"":"#808080"};
  user-select: none;

  @media (max-width: 999px) {
    font-size: 8vw;
  }
`,k=(0,n.memo)((({noAnimation:e,children:t})=>(0,r.jsx)(p,Object.assign({noAnimation:e},{children:(0,r.jsx)(b,{children:t},void 0)}),void 0)));var Z=i(89311);const y=(0,n.memo)((()=>{const[e]=(0,d.Z)(),{initial:t,error:i,waiting:s}=e,o=(0,n.useCallback)((e=>(0,r.jsx)(k,Object.assign({},e,{noAnimation:t}),void 0)),[t]);return i?(0,r.jsx)(o,{children:i},void 0):s?(0,r.jsxs)(o,{children:["wait",(0,r.jsx)(Z.Z,{initialNum:3,maxNum:3,interval:1e3},void 0)]},void 0):null})),S=(0,n.lazy)(c(Promise.all([i.e(4593),i.e(7770)]).then(i.bind(i,7666)))),z=(0,n.lazy)(c(Promise.all([i.e(4593),i.e(5872)]).then(i.bind(i,63478)))),P=o.ZP.div`
  & * {
    box-sizing: border-box;
  }
`,E=()=>{const[e,t]=(0,d.Z)(),i=m();return(0,n.useEffect)((()=>{e.initial&&!e.waiting&&t({initial:!1})}),[e.waiting]),(0,r.jsxs)(o.f6,Object.assign({theme:i?h:v},{children:[(0,r.jsx)(f,{},void 0),(0,r.jsxs)(P,{children:[(0,r.jsx)(y,{},void 0),(0,r.jsx)(n.Suspense,Object.assign({fallback:!1},{children:(0,r.jsx)(a.UT,{children:(0,r.jsx)(S,{},void 0)},void 0)}),void 0),(0,r.jsx)(n.Suspense,Object.assign({fallback:!1},{children:(0,r.jsx)(z,{},void 0)}),void 0)]},void 0)]}),void 0)};s.render((0,r.jsx)(E,{},void 0),document.getElementById("app"))},47810:(e,t,i)=>{"use strict";i.d(t,{Z:()=>o});var r=i(67294),s=i(71174);const n=(0,s.Z)({initial:!0,waiting:!0,error:null}),o=()=>{const[e,t]=n();var i;return[e,(0,r.useCallback)((i=t,(0,r.useCallback)((e=>i((t=>({...t,...e instanceof Function?e(t):e})))),[i])),[t])]}},93197:(e,t,i)=>{"use strict";i.d(t,{Z:()=>o});var r=i(6557),s=i(84719);const n=["light","dark","auto"],o=(0,s.Z)("store:theme","light",{parse:r,serialize:r,validate:e=>n.includes(e)})},89311:(e,t,i)=>{"use strict";i.d(t,{Z:()=>o});var r=i(85893),s=i(67294);const n=i(29163).ZP.span`
  opacity: 0;
`,o=(0,s.memo)((({initialNum:e,maxNum:t,interval:i})=>{const[o,a]=(0,s.useState)(e);return(0,s.useEffect)((()=>{let e;const r=()=>{e=setTimeout((()=>{a((e=>(e+1)%(t+1))),r()}),i)};return r(),()=>{clearTimeout(e)}}),[]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("span",{children:".".repeat(o)},void 0),(0,r.jsx)(n,{children:".".repeat(t-o)},void 0)]},void 0)}))},72660:(e,t,i)=>{"use strict";i.d(t,{vU:()=>n,G6:()=>o});var r=i(51206);const s=i.n(r)().getParser(window.navigator.userAgent),n=(s.getPlatformType(),"Firefox"===s.getBrowserName()),o="Safari"===s.getBrowserName()},19760:(e,t,i)=>{"use strict";i.d(t,{Z:()=>n});var r=i(67294),s=i(72660);const n=e=>{const t=(0,r.useMemo)((()=>window.matchMedia(e)),[e]);s.G6&&(t.addEventListener=(e,i)=>t.addListener(i),t.removeEventListener=(e,i)=>t.removeListener(i));const[i,n]=(0,r.useState)(t.matches);return(0,r.useEffect)((()=>{const e=e=>{n(e.matches)};return t.addEventListener("change",e),()=>{t.removeEventListener("change",e)}}),[t]),i}},71174:(e,t,i)=>{"use strict";i.d(t,{Z:()=>n});var r=i(67294),s=i(97019);const n=e=>{let t=e instanceof Function?e():e;const i=[];return()=>{const e=(0,r.useState)(t)[1];(0,r.useEffect)((()=>(i.push(e),()=>{s(i,e)})),[]);const n=(0,r.useCallback)((e=>{t=e instanceof Function?e(t):e;for(const e of i)e(t)}),[t,i]);return[t,n]}}},84719:(e,t,i)=>{"use strict";i.d(t,{Z:()=>a});var r=i(67294),s=i(97527),n=i(71174);const o={parse:e=>JSON.parse(e),serialize:e=>JSON.stringify(e),validate:s},a=(e,t,i)=>{const s={...o,...i},a=(0,n.Z)((()=>{try{const t=window.localStorage.getItem(e);if(t){const e=s.parse(t);if(s.validate(e))return e}}catch(e){console.error(e)}try{window.localStorage.setItem(e,s.serialize(t))}catch(e){console.error(e)}return t}));return()=>{const[i,n]=a(),o=(0,r.useCallback)((t=>{try{const r=t instanceof Function?t(i):t;n(r),window.localStorage.setItem(e,s.serialize(r))}catch(e){console.error(e)}}),[n]),c=(0,r.useCallback)((()=>{n(t);try{window.localStorage.removeItem(e)}catch(e){console.error(e)}}),[n]);return[i,o,c]}}}},e=>{"use strict";e.O(0,[5514,3421,6202,4736],(()=>{return t=40945,e(e.s=t);var t}));e.O()}]);