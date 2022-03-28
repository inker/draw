"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[2143],{17239:(e,t,i)=>{var n=i(85893),o=(i(76487),i(73935)),r=i(67294),a=i(58804),s=i(39711),c=i(75703),d=i(61790),l=i(45977),u=i(12211);const m=()=>{const[e]=(0,l.Z)(),t=(0,u.Z)("(prefers-color-scheme: dark)");return"dark"===e||"auto"===e&&t},v={isDarkMode:!1,border:"#aaa solid 1px"},h={isDarkMode:!0,border:"#222 solid 1px"},f=a.vJ`
  body {
    font-family: Tahoma, Arial, sans-serif;
    color: ${e=>e.theme.isDarkMode?"white":""};
    background-color: ${e=>e.theme.isDarkMode?"#272a33":""};
  }
`,x=a.ZP.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${1e8};
`,g=a.F4`
  from {
    opacity: 0;
  }
  to {}
`,w=(0,a.ZP)(x)`
  background-color: ${e=>e.theme.isDarkMode?"#222":"white"};
  opacity: 0.75;

  ${e=>e.animate&&a.iv`
    animation: ${g} 0.25s ease-out;
  `}
`,j=(0,a.ZP)(x)`
  display: flex;
  justify-content: center;
  align-items: center;
`,p=(0,r.memo)((({noAnimation:e,children:t})=>(0,n.jsxs)("div",{children:[(0,n.jsx)(w,{animate:!e},void 0),(0,n.jsx)(j,{children:t},void 0)]},void 0))),b=a.ZP.div`
  font-size: 5vw;
  color: ${e=>e.theme.isDarkMode?"":"#808080"};
  user-select: none;

  @media (max-width: 999px) {
    font-size: 8vw;
  }
`,k=(0,r.memo)((({noAnimation:e,children:t})=>(0,n.jsx)(p,Object.assign({noAnimation:e},{children:(0,n.jsx)(b,{children:t},void 0)}),void 0)));var Z=i(32531);const y=(0,r.memo)((()=>{const[e]=(0,d.Z)(),{initial:t,error:i,waiting:o}=e,a=(0,r.useCallback)((e=>(0,n.jsx)(k,Object.assign({},e,{noAnimation:t}),void 0)),[t]);return i?(0,n.jsx)(a,{children:i},void 0):o?(0,n.jsxs)(a,{children:["wait",(0,n.jsx)(Z.Z,{initialNum:3,maxNum:3,interval:1e3},void 0)]},void 0):null})),S=(0,r.lazy)(c(Promise.all([i.e(7823),i.e(4593),i.e(7770)]).then(i.bind(i,73297)))),z=(0,r.lazy)(c(Promise.all([i.e(4593),i.e(5872)]).then(i.bind(i,18590)))),P=a.ZP.div`
  & * {
    box-sizing: border-box;
  }
`,E=()=>{const[e,t]=(0,d.Z)(),i=m();return(0,r.useEffect)((()=>{e.initial&&!e.waiting&&t({initial:!1})}),[e.waiting]),(0,n.jsxs)(a.f6,Object.assign({theme:i?h:v},{children:[(0,n.jsx)(f,{},void 0),(0,n.jsxs)(P,{children:[(0,n.jsx)(y,{},void 0),(0,n.jsx)(r.Suspense,Object.assign({fallback:!1},{children:(0,n.jsx)(s.UT,{children:(0,n.jsx)(S,{},void 0)},void 0)}),void 0),(0,n.jsx)(r.Suspense,Object.assign({fallback:!1},{children:(0,n.jsx)(z,{},void 0)}),void 0)]},void 0)]}),void 0)};o.render((0,n.jsx)(E,{},void 0),document.getElementById("app"))},61790:(e,t,i)=>{i.d(t,{Z:()=>a});var n=i(67294),o=i(60166);const r=(0,o.Z)({initial:!0,waiting:!0,error:null}),a=()=>{const[e,t]=r();var i;return[e,(0,n.useCallback)((i=t,(0,n.useCallback)((e=>i((t=>({...t,...e instanceof Function?e(t):e})))),[i])),[t])]}},45977:(e,t,i)=>{i.d(t,{Z:()=>a});var n=i(6557),o=i(98548);const r=["light","dark","auto"],a=(0,o.Z)("store:theme","light",{parse:n,serialize:n,validate:e=>r.includes(e)})},32531:(e,t,i)=>{i.d(t,{Z:()=>a});var n=i(85893),o=i(67294);const r=i(58804).ZP.span`
  opacity: 0;
`,a=(0,o.memo)((({initialNum:e,maxNum:t,interval:i})=>{const[a,s]=(0,o.useState)(e);return(0,o.useEffect)((()=>{let e;const n=()=>{e=setTimeout((()=>{s((e=>(e+1)%(t+1))),n()}),i)};return n(),()=>{clearTimeout(e)}}),[]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("span",{children:".".repeat(a)},void 0),(0,n.jsx)(r,{children:".".repeat(t-a)},void 0)]},void 0)}))},32607:(e,t,i)=>{i.d(t,{G6:()=>a,vU:()=>r});var n=i(51206);const o=i.n(n)().getParser(window.navigator.userAgent),r=(o.getPlatformType(),"Firefox"===o.getBrowserName()),a="Safari"===o.getBrowserName()},12211:(e,t,i)=>{i.d(t,{Z:()=>r});var n=i(67294),o=i(32607);const r=e=>{const t=(0,n.useMemo)((()=>window.matchMedia(e)),[e]);o.G6&&(t.addEventListener=(e,i)=>t.addListener(i),t.removeEventListener=(e,i)=>t.removeListener(i));const[i,r]=(0,n.useState)(t.matches);return(0,n.useEffect)((()=>{const e=e=>{r(e.matches)};return t.addEventListener("change",e),()=>{t.removeEventListener("change",e)}}),[t]),i}},60166:(e,t,i)=>{i.d(t,{Z:()=>r});var n=i(67294),o=i(97019);const r=e=>{let t=e instanceof Function?e():e;const i=[];return()=>{const e=(0,n.useState)(t)[1];(0,n.useEffect)((()=>(i.push(e),()=>{o(i,e)})),[]);const r=(0,n.useCallback)((e=>{t=e instanceof Function?e(t):e;for(const e of i)e(t)}),[t,i]);return[t,r]}}},98548:(e,t,i)=>{i.d(t,{Z:()=>s});var n=i(67294),o=i(97527),r=i(60166);const a={parse:e=>JSON.parse(e),serialize:e=>JSON.stringify(e),validate:o},s=(e,t,i)=>{const o={...a,...i},s=(0,r.Z)((()=>{try{const t=window.localStorage.getItem(e);if(t){const e=o.parse(t);if(o.validate(e))return e}}catch(e){console.error(e)}try{window.localStorage.setItem(e,o.serialize(t))}catch(e){console.error(e)}return t}));return()=>{const[i,r]=s(),a=(0,n.useCallback)((t=>{try{const n=t instanceof Function?t(i):t;r(n),window.localStorage.setItem(e,o.serialize(n))}catch(e){console.error(e)}}),[r]),c=(0,n.useCallback)((()=>{r(t);try{window.localStorage.removeItem(e)}catch(e){console.error(e)}}),[r]);return[i,a,c]}}}},e=>{e.O(0,[5514,3421,6202,4736],(()=>{return t=17239,e(e.s=t);var t}));e.O()}]);