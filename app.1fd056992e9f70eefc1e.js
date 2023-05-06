"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[2143],{17239:(e,t,n)=>{var r=n(85893),i=(n(76487),n(20745)),o=n(67294),s=n(12788),a=n(79655),c=n(75703),l=n.n(c),d=n(61790),u=n(45977),m=n(12211);const h=()=>{const[e]=(0,u.Z)(),t=(0,m.Z)("(prefers-color-scheme: dark)");return"dark"===e||"auto"===e&&t},f={isDarkMode:!1,border:"#aaa solid 1px"},x={isDarkMode:!0,border:"#222 solid 1px"},v=s.vJ`
  body {
    font-family: Tahoma, Arial, sans-serif;
    color: ${e=>e.theme.isDarkMode?"white":""};
    background-color: ${e=>e.theme.isDarkMode?"#272a33":""};
  }
`,p=s.ZP.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${1e8};
  width: 100%;
  height: 100%;
`,w=s.F4`
  from {
    opacity: 0;
  }
`,j=(0,s.ZP)(p)`
  background-color: ${e=>e.theme.isDarkMode?"#222":"white"};
  opacity: 0.75;
  ${e=>e.animate&&s.iv`
    animation: ${w} 0.25s ease-out;
  `}
`,g=(0,s.ZP)(p)`
  display: flex;
  justify-content: center;
  align-items: center;
`;const k=(0,o.memo)((function({noAnimation:e,children:t}){return(0,r.jsxs)("div",{children:[(0,r.jsx)(j,{animate:!e}),(0,r.jsx)(g,{children:t})]})})),Z=s.ZP.div`
  font-size: 5vw;
  color: ${e=>e.theme.isDarkMode?"":"#808080"};
  user-select: none;

  @media (max-width: 999px) {
    font-size: 8vw;
  }
`;const b=(0,o.memo)((function({noAnimation:e,children:t}){return(0,r.jsx)(k,{noAnimation:e,children:(0,r.jsx)(Z,{children:t})})}));var y=n(32531);const S=(0,o.memo)((function(){const[e]=(0,d.Z)(),{initial:t,error:n,waiting:i}=e,s=(0,o.useCallback)((e=>(0,r.jsx)(b,{...e,noAnimation:t})),[t]);return n?(0,r.jsx)(s,{children:n}):i?(0,r.jsxs)(s,{children:["wait",(0,r.jsx)(y.Z,{initialNum:3,maxNum:3,interval:1e3})]}):null})),z=(0,o.lazy)(l()(Promise.all([n.e(7823),n.e(4593),n.e(7770)]).then(n.bind(n,41826)))),C=(0,o.lazy)(l()(Promise.all([n.e(4593),n.e(5872)]).then(n.bind(n,18590)))),M=s.ZP.div`
  * {
    box-sizing: border-box;
  }
`;const P=function(){const[e,t]=(0,d.Z)(),n=h();return(0,o.useEffect)((()=>{e.initial&&!e.waiting&&t({initial:!1})}),[e.waiting]),(0,r.jsxs)(s.f6,{theme:n?x:f,children:[(0,r.jsx)(v,{}),(0,r.jsxs)(M,{children:[(0,r.jsx)(S,{}),(0,r.jsx)(a.UT,{children:(0,r.jsx)(o.Suspense,{children:(0,r.jsx)(z,{})})}),(0,r.jsx)(o.Suspense,{children:(0,r.jsx)(C,{})})]})]})},E=document.getElementById("app");(0,i.s)(E).render((0,r.jsx)(P,{}))},61790:(e,t,n)=>{n.d(t,{Z:()=>s});var r=n(67294),i=n(60166);const o=(0,i.Z)({initial:!0,waiting:!0,error:null}),s=()=>{const[e,t]=o();var n;return[e,(0,r.useCallback)((n=t,(0,r.useCallback)((e=>n((t=>({...t,...e instanceof Function?e(t):e})))),[n])),[t])]}},45977:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(6557),i=n.n(r),o=n(98548);const s=["light","dark","auto"],a=(0,o.Z)("store:theme","light",{parse:i(),serialize:i(),validate:e=>s.includes(e)})},32531:(e,t,n)=>{n.d(t,{Z:()=>s});var r=n(85893),i=n(67294);const o=n(12788).ZP.span`
  opacity: 0;
`;const s=(0,i.memo)((function({initialNum:e,maxNum:t,interval:n}){const[s,a]=(0,i.useState)(e);return(0,i.useEffect)((()=>{let e;const r=()=>{e=setTimeout((()=>{a((e=>(e+1)%(t+1))),r()}),n)};return r(),()=>{clearTimeout(e)}}),[]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("span",{children:".".repeat(s)}),(0,r.jsx)(o,{children:".".repeat(t-s)})]})}))},12211:(e,t,n)=>{n.d(t,{Z:()=>i});var r=n(67294);const i=e=>{const t=(0,r.useMemo)((()=>window.matchMedia(e)),[e]),[n,i]=(0,r.useState)(t.matches);return(0,r.useEffect)((()=>{const e=e=>{i(e.matches)};return t.addEventListener("change",e),()=>{t.removeEventListener("change",e)}}),[t]),n}},60166:(e,t,n)=>{n.d(t,{Z:()=>s});var r=n(67294),i=n(97019),o=n.n(i);const s=e=>{let t=e instanceof Function?e():e;const n=[];return()=>{const e=(0,r.useState)(t)[1];(0,r.useEffect)((()=>(n.push(e),()=>{o()(n,e)})),[]);const i=(0,r.useCallback)((e=>{t=e instanceof Function?e(t):e;for(const e of n)e(t)}),[t,n]);return[t,i]}}},98548:(e,t,n)=>{n.d(t,{Z:()=>c});var r=n(67294),i=n(97527),o=n.n(i),s=n(60166);const a={parse:e=>JSON.parse(e),serialize:e=>JSON.stringify(e),validate:o()},c=(e,t,n)=>{const i={...a,...n},o=(0,s.Z)((()=>{try{const t=window.localStorage.getItem(e);if(t){const e=i.parse(t);if(i.validate(e))return e}}catch(e){console.error(e)}try{window.localStorage.setItem(e,i.serialize(t))}catch(e){console.error(e)}return t}));return()=>{const[n,s]=o(),a=(0,r.useCallback)((t=>{try{const r=t instanceof Function?t(n):t;s(r),window.localStorage.setItem(e,i.serialize(r))}catch(e){console.error(e)}}),[s]),c=(0,r.useCallback)((()=>{s(t);try{window.localStorage.removeItem(e)}catch(e){console.error(e)}}),[s]);return[n,a,c]}}}},e=>{e.O(0,[5514,3421,6202,4736],(()=>{return t=17239,e(e.s=t);var t}));e.O()}]);