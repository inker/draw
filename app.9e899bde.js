"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[2143],{90733:(e,t,r)=>{var a=r(85893),i=r(76487),n=r(20745),l=r(67294),s=r(70394),o=r(79655),c=r(62002),d=r(40339),u=r(65600),m=r(12185);let h=()=>(0,m.Z)("(prefers-color-scheme: dark)"),f=()=>{let[e]=(0,u.Z)(),t=h();return"dark"===e||"auto"===e&&t},x={isDarkMode:!1,border:"#aaa solid 1px"},v={isDarkMode:!0,border:"#222 solid 1px"},p=(0,s.vJ)`
  body {
    font-family: Tahoma, Arial, sans-serif;
    color: ${e=>e.theme.isDarkMode?"white":""};
    background-color: ${e=>e.theme.isDarkMode?"#272a33":""};
  }
`,Z=s.ZP.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${1e8};
  width: 100%;
  height: 100%;
`,w=(0,s.F4)`
  from {
    opacity: 0;
  }
`,g=(0,s.ZP)(Z)`
  background-color: ${e=>e.theme.isDarkMode?"#222":"white"};
  opacity: 0.75;
  ${e=>e.animate&&(0,s.iv)`
    animation: ${w} 0.25s ease-out;
  `}
`,j=(0,s.ZP)(Z)`
  display: flex;
  justify-content: center;
  align-items: center;
`;function k({noAnimation:e,children:t}){return(0,a.jsxs)("div",{children:[(0,a.jsx)(g,{animate:!e}),(0,a.jsx)(j,{children:t})]})}let b=(0,l.memo)(k),y=s.ZP.div`
  font-size: 5vw;
  color: ${e=>e.theme.isDarkMode?"":"#808080"};
  user-select: none;

  @media (max-width: 999px) {
    font-size: 8vw;
  }
`;function S({noAnimation:e,children:t}){return(0,a.jsx)(b,{noAnimation:e,children:(0,a.jsx)(y,{children:t})})}let z=(0,l.memo)(S);var C=r(4871);function M(){let[e]=(0,d.Z)(),{initial:t,error:r,waiting:i}=e,n=(0,l.useCallback)(e=>(0,a.jsx)(z,{...e,noAnimation:t}),[t]);return r?(0,a.jsx)(n,{children:r}):i?(0,a.jsxs)(n,{children:["wait",(0,a.jsx)(C.Z,{initialNum:3,maxNum:3,interval:1e3})]}):null}let E=(0,l.memo)(M),P=(0,l.lazy)((0,c.Z)(Promise.all([r.e(870),r.e(7770)]).then(r.bind(r,55323)))),$=s.ZP.div`
  * {
    box-sizing: border-box;
  }
`;function D(){let[e,t]=(0,d.Z)(),r=f();return(0,l.useEffect)(()=>{e.initial&&!e.waiting&&t({initial:!1})},[e.waiting]),(0,a.jsxs)(s.f6,{theme:r?v:x,children:[(0,a.jsx)(p,{}),(0,a.jsxs)($,{children:[(0,a.jsx)(E,{}),(0,a.jsx)(o.UT,{children:(0,a.jsx)(l.Suspense,{children:(0,a.jsx)(P,{})})})]})]})}let F=(0,l.memo)(D),I=document.getElementById("app"),N=(0,n.s)(I);N.render((0,a.jsx)(F,{}))},40339:(e,t,r)=>{r.d(t,{Z:()=>o});var a=r(67294),i=r(37728);let n=e=>(0,a.useCallback)(t=>e(e=>({...e,...t instanceof Function?t(e):t})),[e]),l={initial:!0,waiting:!0,error:null},s=(0,i.Z)(l),o=()=>{let[e,t]=s(),r=(0,a.useCallback)(n(t),[t]);return[e,r]}},65600:(e,t,r)=>{r.d(t,{Z:()=>l});var a=r(69203),i=r(10659);let n=["light","dark","auto"],l=(0,i.Z)("store:theme","light",{parse:a.Z,serialize:a.Z,validate:e=>n.includes(e)})},4871:(e,t,r)=>{r.d(t,{Z:()=>o});var a=r(85893),i=r(67294),n=r(70394);let l=n.ZP.span`
  opacity: 0;
`;function s({initialNum:e,maxNum:t,interval:r}){let[n,s]=(0,i.useState)(e);return(0,i.useEffect)(()=>{let e;let a=()=>{e=setTimeout(()=>{s(e=>(e+1)%(t+1)),a()},r)};return a(),()=>{clearTimeout(e)}},[]),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("span",{children:".".repeat(n)}),(0,a.jsx)(l,{children:".".repeat(t-n)})]})}let o=(0,i.memo)(s)},12185:(e,t,r)=>{r.d(t,{Z:()=>i});var a=r(67294);let i=e=>{let t=(0,a.useMemo)(()=>window.matchMedia(e),[e]),[r,i]=(0,a.useState)(t.matches);return(0,a.useEffect)(()=>{let e=e=>{i(e.matches)};return t.addEventListener("change",e),()=>{t.removeEventListener("change",e)}},[t]),r}},37728:(e,t,r)=>{r.d(t,{Z:()=>n});var a=r(67294),i=r(98872);let n=e=>{let t=e instanceof Function?e():e,r=[];return()=>{let e=(0,a.useState)(t)[1];(0,a.useEffect)(()=>(r.push(e),()=>{(0,i.Z)(r,e)}),[]);let n=(0,a.useCallback)(e=>{for(let a of(t=e instanceof Function?e(t):e,r))a(t)},[t,r]);return[t,n]}}},10659:(e,t,r)=>{r.d(t,{Z:()=>s});var a=r(67294),i=r(46338),n=r(37728);let l={parse:e=>JSON.parse(e),serialize:e=>JSON.stringify(e),validate:i.Z},s=(e,t,r)=>{let i={...l,...r},s=(0,n.Z)(()=>{try{let t=window.localStorage.getItem(e);if(t){let e=i.parse(t);if(i.validate(e))return e}}catch(e){console.error(e)}try{window.localStorage.setItem(e,i.serialize(t))}catch(e){console.error(e)}return t});return()=>{let[r,n]=s(),l=(0,a.useCallback)(t=>{try{let a=t instanceof Function?t(r):t;n(a),window.localStorage.setItem(e,i.serialize(a))}catch(e){console.error(e)}},[n]),o=(0,a.useCallback)(()=>{n(t);try{window.localStorage.removeItem(e)}catch(e){console.error(e)}},[n]);return[r,l,o]}}}},e=>{var t=t=>e(e.s=t);e.O(0,[9896,4334,4111,2020],()=>t(90733));var r=e.O()}]);