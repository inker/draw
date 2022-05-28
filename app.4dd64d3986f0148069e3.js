"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[2143],{17239:(e,t,n)=>{var r=n(85893),i=(n(76487),n(20745)),a=n(67294),o=n(58804),s=n(39711),c=n(75703),l=n(61790),d=n(45977),u=n(12211);const m=()=>{const[e]=(0,d.Z)(),t=(0,u.Z)("(prefers-color-scheme: dark)");return"dark"===e||"auto"===e&&t},h={isDarkMode:!1,border:"#aaa solid 1px"},f={isDarkMode:!0,border:"#222 solid 1px"},v=o.vJ`
  body {
    font-family: Tahoma, Arial, sans-serif;
    color: ${e=>e.theme.isDarkMode?"white":""};
    background-color: ${e=>e.theme.isDarkMode?"#272a33":""};
  }
`,x=o.ZP.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${1e8};
  width: 100%;
  height: 100%;
`,w=o.F4`
  from {
    opacity: 0;
  }
`,g=(0,o.ZP)(x)`
  background-color: ${e=>e.theme.isDarkMode?"#222":"white"};
  opacity: 0.75;
  ${e=>e.animate&&o.iv`
    animation: ${w} 0.25s ease-out;
  `}
`,p=(0,o.ZP)(x)`
  display: flex;
  justify-content: center;
  align-items: center;
`;const j=(0,a.memo)((function({noAnimation:e,children:t}){return(0,r.jsxs)("div",{children:[(0,r.jsx)(g,{animate:!e}),(0,r.jsx)(p,{children:t})]})})),k=o.ZP.div`
  font-size: 5vw;
  color: ${e=>e.theme.isDarkMode?"":"#808080"};
  user-select: none;

  @media (max-width: 999px) {
    font-size: 8vw;
  }
`;const b=(0,a.memo)((function({noAnimation:e,children:t}){return(0,r.jsx)(j,{noAnimation:e,children:(0,r.jsx)(k,{children:t})})}));var Z=n(32531);const y=(0,a.memo)((function(){const[e]=(0,l.Z)(),{initial:t,error:n,waiting:i}=e,o=(0,a.useCallback)((e=>(0,r.jsx)(b,{...e,noAnimation:t})),[t]);return n?(0,r.jsx)(o,{children:n}):i?(0,r.jsxs)(o,{children:["wait",(0,r.jsx)(Z.Z,{initialNum:3,maxNum:3,interval:1e3})]}):null})),S=(0,a.lazy)(c(Promise.all([n.e(7823),n.e(4593),n.e(7770)]).then(n.bind(n,87039)))),z=(0,a.lazy)(c(Promise.all([n.e(4593),n.e(5872)]).then(n.bind(n,18590)))),P=o.ZP.div`
  * {
    box-sizing: border-box;
  }
`;const E=function(){const[e,t]=(0,l.Z)(),n=m();return(0,a.useEffect)((()=>{e.initial&&!e.waiting&&t({initial:!1})}),[e.waiting]),(0,r.jsxs)(o.f6,{theme:n?f:h,children:[(0,r.jsx)(v,{}),(0,r.jsxs)(P,{children:[(0,r.jsx)(y,{}),(0,r.jsx)(a.Suspense,{fallback:!1,children:(0,r.jsx)(s.UT,{children:(0,r.jsx)(S,{})})}),(0,r.jsx)(a.Suspense,{fallback:!1,children:(0,r.jsx)(z,{})})]})]})},C=document.getElementById("app");(0,i.s)(C).render((0,r.jsx)(E,{}))},61790:(e,t,n)=>{n.d(t,{Z:()=>o});var r=n(67294),i=n(60166);const a=(0,i.Z)({initial:!0,waiting:!0,error:null}),o=()=>{const[e,t]=a();var n;return[e,(0,r.useCallback)((n=t,(0,r.useCallback)((e=>n((t=>({...t,...e instanceof Function?e(t):e})))),[n])),[t])]}},45977:(e,t,n)=>{n.d(t,{Z:()=>o});var r=n(6557),i=n(98548);const a=["light","dark","auto"],o=(0,i.Z)("store:theme","light",{parse:r,serialize:r,validate:e=>a.includes(e)})},32531:(e,t,n)=>{n.d(t,{Z:()=>o});var r=n(85893),i=n(67294);const a=n(58804).ZP.span`
  opacity: 0;
`;const o=(0,i.memo)((function({initialNum:e,maxNum:t,interval:n}){const[o,s]=(0,i.useState)(e);return(0,i.useEffect)((()=>{let e;const r=()=>{e=setTimeout((()=>{s((e=>(e+1)%(t+1))),r()}),n)};return r(),()=>{clearTimeout(e)}}),[]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("span",{children:".".repeat(o)}),(0,r.jsx)(a,{children:".".repeat(t-o)})]})}))},32607:(e,t,n)=>{n.d(t,{G6:()=>o,vU:()=>a});var r=n(51206);const i=n.n(r)().getParser(window.navigator.userAgent),a=(i.getPlatformType(),"Firefox"===i.getBrowserName()),o="Safari"===i.getBrowserName()},12211:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(67294),i=n(32607);const a=e=>{const t=(0,r.useMemo)((()=>window.matchMedia(e)),[e]);i.G6&&(t.addEventListener=(e,n)=>t.addListener(n),t.removeEventListener=(e,n)=>t.removeListener(n));const[n,a]=(0,r.useState)(t.matches);return(0,r.useEffect)((()=>{const e=e=>{a(e.matches)};return t.addEventListener("change",e),()=>{t.removeEventListener("change",e)}}),[t]),n}},60166:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(67294),i=n(97019);const a=e=>{let t=e instanceof Function?e():e;const n=[];return()=>{const e=(0,r.useState)(t)[1];(0,r.useEffect)((()=>(n.push(e),()=>{i(n,e)})),[]);const a=(0,r.useCallback)((e=>{t=e instanceof Function?e(t):e;for(const e of n)e(t)}),[t,n]);return[t,a]}}},98548:(e,t,n)=>{n.d(t,{Z:()=>s});var r=n(67294),i=n(97527),a=n(60166);const o={parse:e=>JSON.parse(e),serialize:e=>JSON.stringify(e),validate:i},s=(e,t,n)=>{const i={...o,...n},s=(0,a.Z)((()=>{try{const t=window.localStorage.getItem(e);if(t){const e=i.parse(t);if(i.validate(e))return e}}catch(e){console.error(e)}try{window.localStorage.setItem(e,i.serialize(t))}catch(e){console.error(e)}return t}));return()=>{const[n,a]=s(),o=(0,r.useCallback)((t=>{try{const r=t instanceof Function?t(n):t;a(r),window.localStorage.setItem(e,i.serialize(r))}catch(e){console.error(e)}}),[a]),c=(0,r.useCallback)((()=>{a(t);try{window.localStorage.removeItem(e)}catch(e){console.error(e)}}),[a]);return[n,o,c]}}}},e=>{e.O(0,[5514,3421,6202,4736],(()=>{return t=17239,e(e.s=t);var t}));e.O()}]);