"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[2143],{90733:(e,t,r)=>{var a=r(85893);r(76487);var i=r(20745),n=r(67294),s=r(70394),l=r(79655),o=r(62002),c=r(40339),d=r(65600),u=r(12185);let m=()=>(0,u.Z)("(prefers-color-scheme: dark)"),h=()=>{let[e]=(0,d.Z)(),t=m();return"dark"===e||"auto"===e&&t},f={isDarkMode:!1,border:"#aaa solid 1px"},x={isDarkMode:!0,border:"#222 solid 1px"},v=(0,s.vJ)`
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
`,Z=(0,s.F4)`
  from {
    opacity: 0;
  }
`,w=(0,s.ZP)(p)`
  background-color: ${e=>e.theme.isDarkMode?"#222":"white"};
  opacity: 0.75;
  ${e=>e.$animate&&(0,s.iv)`
    animation: ${Z} 0.25s ease-out;
  `}
`,g=(0,s.ZP)(p)`
  display: flex;
  justify-content: center;
  align-items: center;
`,j=(0,n.memo)(function({noAnimation:e,children:t}){return(0,a.jsxs)("div",{children:[(0,a.jsx)(w,{$animate:!e}),(0,a.jsx)(g,{children:t})]})}),k=s.ZP.div`
  font-size: 5vw;
  color: ${e=>e.theme.isDarkMode?"":"#808080"};
  user-select: none;

  @media (max-width: 999px) {
    font-size: 8vw;
  }
`,b=(0,n.memo)(function({noAnimation:e,children:t}){return(0,a.jsx)(j,{noAnimation:e,children:(0,a.jsx)(k,{children:t})})});var y=r(4871);let S=(0,n.memo)(function(){let[e]=(0,c.Z)(),{initial:t,error:r,waiting:i}=e,s=(0,n.useCallback)(e=>(0,a.jsx)(b,{...e,noAnimation:t}),[t]);return r?(0,a.jsx)(s,{children:r}):i?(0,a.jsxs)(s,{children:["wait",(0,a.jsx)(y.Z,{initialNum:3,maxNum:3,interval:1e3})]}):null}),z=(0,n.lazy)((0,o.Z)(Promise.all([r.e(870),r.e(7770)]).then(r.bind(r,55323)))),$=s.ZP.div`
  * {
    box-sizing: border-box;
  }
`,C=(0,n.memo)(function(){let[e,t]=(0,c.Z)(),r=h();return(0,n.useEffect)(()=>{e.initial&&!e.waiting&&t({initial:!1})},[e.waiting]),(0,a.jsxs)(s.f6,{theme:r?x:f,children:[(0,a.jsx)(v,{}),(0,a.jsxs)($,{children:[(0,a.jsx)(S,{}),(0,a.jsx)(l.UT,{children:(0,a.jsx)(n.Suspense,{children:(0,a.jsx)(z,{})})})]})]})}),M=document.getElementById("app"),E=(0,i.s)(M);E.render((0,a.jsx)(C,{}))},40339:(e,t,r)=>{r.d(t,{Z:()=>l});var a=r(67294),i=r(37728);let n=e=>(0,a.useCallback)(t=>e(e=>({...e,...t instanceof Function?t(e):t})),[e]),s=(0,i.Z)({initial:!0,waiting:!0,error:null}),l=()=>{let[e,t]=s(),r=(0,a.useCallback)(n(t),[t]);return[e,r]}},65600:(e,t,r)=>{r.d(t,{Z:()=>s});var a=r(69203),i=r(10659);let n=["light","dark","auto"],s=(0,i.Z)("store:theme","light",{parse:a.Z,serialize:a.Z,validate:e=>n.includes(e)})},4871:(e,t,r)=>{r.d(t,{Z:()=>l});var a=r(85893),i=r(67294),n=r(70394);let s=n.ZP.span`
  opacity: 0;
`,l=(0,i.memo)(function({initialNum:e,maxNum:t,interval:r}){let[n,l]=(0,i.useState)(e);return(0,i.useEffect)(()=>{let e;let a=()=>{e=setTimeout(()=>{l(e=>(e+1)%(t+1)),a()},r)};return a(),()=>{clearTimeout(e)}},[]),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("span",{children:".".repeat(n)}),(0,a.jsx)(s,{children:".".repeat(t-n)})]})})},12185:(e,t,r)=>{r.d(t,{Z:()=>i});var a=r(67294);let i=e=>{let t=(0,a.useMemo)(()=>window.matchMedia(e),[e]),[r,i]=(0,a.useState)(t.matches);return(0,a.useEffect)(()=>{let e=e=>{i(e.matches)};return t.addEventListener("change",e),()=>{t.removeEventListener("change",e)}},[t]),r}},37728:(e,t,r)=>{r.d(t,{Z:()=>n});var a=r(67294),i=r(98872);let n=e=>{let t=e instanceof Function?e():e,r=[];return()=>{let e=(0,a.useState)(t)[1];(0,a.useEffect)(()=>(r.push(e),()=>{(0,i.Z)(r,e)}),[]);let n=(0,a.useCallback)(e=>{for(let a of(t=e instanceof Function?e(t):e,r))a(t)},[t,r]);return[t,n]}}},10659:(e,t,r)=>{r.d(t,{Z:()=>l});var a=r(67294),i=r(46338),n=r(37728);let s={parse:e=>JSON.parse(e),serialize:e=>JSON.stringify(e),validate:i.Z},l=(e,t,r)=>{let i={...s,...r},l=(0,n.Z)(()=>{try{let t=window.localStorage.getItem(e);if(t){let e=i.parse(t);if(i.validate(e))return e}}catch(e){console.error(e)}try{window.localStorage.setItem(e,i.serialize(t))}catch(e){console.error(e)}return t});return()=>{let[r,n]=l(),s=(0,a.useCallback)(t=>{try{let a=t instanceof Function?t(r):t;n(a),window.localStorage.setItem(e,i.serialize(a))}catch(e){console.error(e)}},[n]),o=(0,a.useCallback)(()=>{n(t);try{window.localStorage.removeItem(e)}catch(e){console.error(e)}},[n]);return[r,s,o]}}}},e=>{var t=t=>e(e.s=t);e.O(0,[9896,4334,4111,2020],()=>t(90733)),e.O()}]);