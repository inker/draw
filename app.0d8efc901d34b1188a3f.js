(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{10:function(e,t,n){"use strict";var a=n(0),c=n(14);t.a=e=>{let t=e instanceof Function?e():e;const n=[];return()=>{const e=Object(a.useState)(t)[1];Object(a.useEffect)(()=>(n.push(e),()=>{c(n,e)}),[]);const l=Object(a.useCallback)(e=>{t=e instanceof Function?e(t):e;for(const e of n)e(t)},[t,n]);return[t,l]}}},2:function(e,t,n){"use strict";var a=n(0),c=n(10);const l=Object(c.a)({initial:!0,waiting:!0,error:null});t.a=()=>{const[e,t]=l();var n;return[e,Object(a.useCallback)((n=t,Object(a.useCallback)(e=>n(t=>({...t,...e instanceof Function?e(t):e})),[n])),[t])]}},58:function(e,t,n){"use strict";n.r(t);n(28),n(31);var a=n(0),c=n.n(a),l=n(13),i=n.n(l),r=n(1),o=n(2);var s=r.c.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${1e8};
`;const u=r.d`
  from {
    opacity: 0;
  }
  to {}
`;var m=Object(r.c)(s)`
  background-color: white;
  opacity: 0.75;

  ${e=>e.animate&&r.b`
    animation: ${u} 0.25s ease-out;
  `}
`;var b=Object(r.c)(s)`
  display: flex;
  justify-content: center;
  align-items: center;
`;var f=Object(a.memo)(({noAnimation:e,children:t})=>c.a.createElement("div",null,c.a.createElement(m,{animate:!e}),c.a.createElement(b,null,t)));const E=r.c.div`
  font-size: 5vw;
  color: #808080;
  user-select: none;

  @media (max-width: 999px) {
    font-size: 8vw;
  }
`;var d=Object(a.memo)(({noAnimation:e,children:t})=>c.a.createElement(f,{noAnimation:e},c.a.createElement(E,null,t)));const j=r.c.span`
  opacity: 0;
`;var p=Object(a.memo)(({num:e,interval:t})=>{const[n,l]=Object(a.useState)(e);return Object(a.useEffect)(()=>{let n;const a=()=>{n=setTimeout(()=>{l(t=>(t+1)%(e+1)),a()},t)};return a(),()=>{clearTimeout(n)}},[]),c.a.createElement(c.a.Fragment,null,c.a.createElement("span",null,".".repeat(n)),c.a.createElement(j,null,".".repeat(e-n)))});var v=Object(a.memo)(()=>{const[e]=Object(o.a)(),t=Object(a.useCallback)(t=>c.a.createElement(d,Object.assign({},t,{noAnimation:e.initial})),[e.initial]),{error:n,waiting:l}=e;return navigator.onLine?n?c.a.createElement(t,null,n):l?c.a.createElement(t,null,"wait",c.a.createElement(p,{num:3,interval:1e3})):null:c.a.createElement(t,null,"you're offline")});const O=Promise.all([n.e(8),n.e(77)]).then(n.bind(null,526)),w=Promise.all([n.e(8),n.e(81)]).then(n.bind(null,525)),g=Object(a.lazy)(()=>O),h=Object(a.lazy)(()=>w),y=r.c.div`
  font-family: Tahoma, Arial, sans-serif;

  & * {
    box-sizing: border-box;
  }
`;var k=()=>{const[e,t]=Object(o.a)();return Object(a.useEffect)(()=>{e.initial&&!e.waiting&&t({initial:!1})},[e.waiting]),c.a.createElement(y,null,c.a.createElement(v,null),c.a.createElement(a.Suspense,{fallback:!1},c.a.createElement(g,null)),c.a.createElement(a.Suspense,{fallback:!1},c.a.createElement(h,null)))};i.a.render(c.a.createElement(k,null),document.getElementById("app"))}},[[58,78,76,80]]]);