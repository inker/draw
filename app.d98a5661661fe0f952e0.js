(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[2143],{40945:(e,t,i)=>{"use strict";var n=i(85893),s=(i(29232),i(76487),i(73935)),r=i(67294),o=i(29163),a=i(39711),c=i(47810),d=i(93197),l=i(19760);const u=()=>{const[e]=(0,d.Z)(),t=(0,l.Z)("(prefers-color-scheme: dark)");return"dark"===e||"auto"===e&&t},m={isDarkMode:!1,border:"#aaa solid 1px"},v={isDarkMode:!0,border:"#222 solid 1px"},h=o.vJ`
  body {
    font-family: Tahoma, Arial, sans-serif;
    color: ${e=>e.theme.isDarkMode?"white":""};
    background-color: ${e=>e.theme.isDarkMode?"#272a33":""};
  }
`,f=o.ZP.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${1e8};
`,x=o.F4`
  from {
    opacity: 0;
  }
  to {}
`,g=(0,o.ZP)(f)`
  background-color: ${e=>e.theme.isDarkMode?"#222":"white"};
  opacity: 0.75;

  ${e=>e.animate&&o.iv`
    animation: ${x} 0.25s ease-out;
  `}
`,w=(0,o.ZP)(f)`
  display: flex;
  justify-content: center;
  align-items: center;
`,j=(0,r.memo)((({noAnimation:e,children:t})=>(0,n.jsxs)("div",{children:[(0,n.jsx)(g,{animate:!e},void 0),(0,n.jsx)(w,{children:t},void 0)]},void 0))),p=o.ZP.div`
  font-size: 5vw;
  color: ${e=>e.theme.isDarkMode?"":"#808080"};
  user-select: none;

  @media (max-width: 999px) {
    font-size: 8vw;
  }
`,b=(0,r.memo)((({noAnimation:e,children:t})=>(0,n.jsx)(j,Object.assign({noAnimation:e},{children:(0,n.jsx)(p,{children:t},void 0)}),void 0)));var k=i(89311);const Z=(0,r.memo)((()=>{const[e]=(0,c.Z)(),t=(0,r.useCallback)((t=>(0,n.jsx)(b,Object.assign({},t,{noAnimation:e.initial}),void 0)),[e.initial]),{error:i,waiting:s}=e;return i?(0,n.jsx)(t,{children:i},void 0):s?(0,n.jsxs)(t,{children:["wait",(0,n.jsx)(k.Z,{initialNum:3,maxNum:3,interval:1e3},void 0)]},void 0):null})),y=Promise.all([i.e(4593),i.e(7770)]).then(i.bind(i,7666)),S=Promise.all([i.e(4593),i.e(6451)]).then(i.bind(i,63478)),z=(0,r.lazy)((()=>y)),P=(0,r.lazy)((()=>S)),E=o.ZP.div`
  & * {
    box-sizing: border-box;
  }
`,C=()=>{const[e,t]=(0,c.Z)(),i=u();return(0,r.useEffect)((()=>{e.initial&&!e.waiting&&t({initial:!1})}),[e.waiting]),(0,n.jsxs)(o.f6,Object.assign({theme:i?v:m},{children:[(0,n.jsx)(h,{},void 0),(0,n.jsxs)(E,{children:[(0,n.jsx)(Z,{},void 0),(0,n.jsx)(r.Suspense,Object.assign({fallback:!1},{children:(0,n.jsx)(a.UT,{children:(0,n.jsx)(z,{},void 0)},void 0)}),void 0),(0,n.jsx)(r.Suspense,Object.assign({fallback:!1},{children:(0,n.jsx)(P,{},void 0)}),void 0)]},void 0)]}),void 0)};s.render((0,n.jsx)(C,{},void 0),document.getElementById("app"))},47810:(e,t,i)=>{"use strict";i.d(t,{Z:()=>o});var n=i(67294),s=i(71174);const r=(0,s.Z)({initial:!0,waiting:!0,error:null}),o=()=>{const[e,t]=r();var i;return[e,(0,n.useCallback)((i=t,(0,n.useCallback)((e=>i((t=>({...t,...e instanceof Function?e(t):e})))),[i])),[t])]}},93197:(e,t,i)=>{"use strict";i.d(t,{Z:()=>o});var n=i(6557),s=i(84719);const r=["light","dark","auto"],o=(0,s.Z)("store:theme","light",{parse:n,serialize:n,validate:e=>r.includes(e)})},89311:(e,t,i)=>{"use strict";i.d(t,{Z:()=>o});var n=i(85893),s=i(67294);const r=i(29163).ZP.span`
  opacity: 0;
`,o=(0,s.memo)((({initialNum:e,maxNum:t,interval:i})=>{const[o,a]=(0,s.useState)(e);return(0,s.useEffect)((()=>{let e;const n=()=>{e=setTimeout((()=>{a((e=>(e+1)%(t+1))),n()}),i)};return n(),()=>{clearTimeout(e)}}),[]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("span",{children:".".repeat(o)},void 0),(0,n.jsx)(r,{children:".".repeat(t-o)},void 0)]},void 0)}))},72660:(e,t,i)=>{"use strict";i.d(t,{vU:()=>r,G6:()=>o});var n=i(51206);const s=i.n(n)().getParser(window.navigator.userAgent),r=(s.getPlatformType(),"Firefox"===s.getBrowserName()),o="Safari"===s.getBrowserName()},19760:(e,t,i)=>{"use strict";i.d(t,{Z:()=>r});var n=i(67294),s=i(72660);const r=e=>{const t=(0,n.useMemo)((()=>window.matchMedia(e)),[e]);s.G6&&(t.addEventListener=(e,i)=>t.addListener(i),t.removeEventListener=(e,i)=>t.removeListener(i));const[i,r]=(0,n.useState)(t.matches);return(0,n.useEffect)((()=>{const e=e=>{r(e.matches)};return t.addEventListener("change",e),()=>{t.removeEventListener("change",e)}}),[t]),i}},71174:(e,t,i)=>{"use strict";i.d(t,{Z:()=>r});var n=i(67294),s=i(97019);const r=e=>{let t=e instanceof Function?e():e;const i=[];return()=>{const e=(0,n.useState)(t)[1];(0,n.useEffect)((()=>(i.push(e),()=>{s(i,e)})),[]);const r=(0,n.useCallback)((e=>{t=e instanceof Function?e(t):e;for(const e of i)e(t)}),[t,i]);return[t,r]}}},84719:(e,t,i)=>{"use strict";i.d(t,{Z:()=>a});var n=i(67294),s=i(97527),r=i(71174);const o={parse:e=>JSON.parse(e),serialize:e=>JSON.stringify(e),validate:s},a=(e,t,i)=>{const s={...o,...i},a=(0,r.Z)((()=>{try{const t=window.localStorage.getItem(e);if(t){const e=s.parse(t);if(s.validate(e))return e}}catch(e){console.error(e)}try{window.localStorage.setItem(e,s.serialize(t))}catch(e){console.error(e)}return t}));return()=>{const[i,r]=a(),o=(0,n.useCallback)((t=>{try{const n=t instanceof Function?t(i):t;r(n),window.localStorage.setItem(e,s.serialize(n))}catch(e){console.error(e)}}),[r]),c=(0,n.useCallback)((()=>{r(t);try{window.localStorage.removeItem(e)}catch(e){console.error(e)}}),[r]);return[i,o,c]}}}},0,[[40945,3666,5514,4736]]]);