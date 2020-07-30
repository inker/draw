(window.webpackJsonp=window.webpackJsonp||[]).push([["app"],{19:function(e,t,n){"use strict";var a=n(0),l=n(65);t.a=(e=>{let t=e;const n=[];return()=>{const e=Object(a.useState)(t)[1];Object(a.useEffect)(()=>(n.push(e),()=>{l(n,e)}),[]);const i=Object(a.useCallback)(e=>{t={...t,...e};for(const e of n)e(t)},[t,n]);return[t,i]}})({initial:!0,waiting:!0,error:null})},191:function(e,t,n){"use strict";n.r(t);n(76);var a=n(0),l=n.n(a),i=n(64),r=n.n(i),c=n(4),o=n(19);var s=c.b.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${1e8};
`;const u=c.c`
  from {
    opacity: 0;
  }
  to {}
`;var m=Object(c.b)(s)`
  background-color: white;
  opacity: 0.75;

  ${e=>e.animate&&c.a`
    animation: ${u} 0.25s ease-out;
  `}
`;var b=Object(c.b)(s)`
  display: flex;
  justify-content: center;
  align-items: center;
`;var p=Object(a.memo)(({noAnimation:e,children:t})=>l.a.createElement("div",null,l.a.createElement(m,{animate:!e}),l.a.createElement(b,null,t)));const f=c.b.div`
  font-size: 5vw;
  color: #808080;
  user-select: none;

  @media (max-width: 999px) {
    font-size: 8vw;
  }
`;var v=Object(a.memo)(({noAnimation:e,children:t})=>l.a.createElement(p,{noAnimation:e},l.a.createElement(f,null,t)));const E=c.b.span`
  opacity: 0;
`;var d=Object(a.memo)(({num:e,interval:t})=>{const[n,i]=Object(a.useState)(e);return Object(a.useEffect)(()=>{let n;const a=()=>{n=setTimeout(()=>{i(t=>(t+1)%(e+1)),a()},t)};return a(),()=>{clearTimeout(n)}},[]),l.a.createElement(l.a.Fragment,null,l.a.createElement("span",null,".".repeat(n)),l.a.createElement(E,null,".".repeat(e-n)))});var j=Object(a.memo)(()=>{const[e]=Object(o.a)(),t=Object(a.useCallback)(t=>l.a.createElement(v,Object.assign({},t,{noAnimation:e.initial})),[e.initial]),{error:n,waiting:i}=e;return navigator.onLine?n?l.a.createElement(t,null,n):i?l.a.createElement(t,null,"wait",l.a.createElement(d,{num:3,interval:1e3})):null:l.a.createElement(t,null,"you're offline")});const O=Promise.all([n.e("routes~version"),n.e("vendor"),n.e("routes")]).then(n.bind(null,529)),w=Promise.all([n.e("routes~version"),n.e("version")]).then(n.bind(null,528)),g=Object(a.lazy)(()=>O),h=Object(a.lazy)(()=>w),y=c.b.div`
  font-family: Tahoma, Arial, sans-serif;

  & * {
    box-sizing: border-box;
  }
`;var k=()=>{const[e,t]=Object(o.a)();return Object(a.useEffect)(()=>{e.initial&&!e.waiting&&t({initial:!1})},[e.waiting]),l.a.createElement(y,null,l.a.createElement(j,null),l.a.createElement(a.Suspense,{fallback:!1},l.a.createElement(g,null)),l.a.createElement(a.Suspense,{fallback:!1},l.a.createElement(h,null)))};r.a.render(l.a.createElement(k,null),document.getElementById("app"))}},[[191,"runtime~app","react","vendor"]]]);