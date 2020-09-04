(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{17:function(e,t,n){"use strict";var a=n(0),l=n.n(a);const i=n(2).d.span`
  opacity: 0;
`;t.a=Object(a.memo)(({initialNum:e,maxNum:t,interval:n})=>{const[c,r]=Object(a.useState)(e);return Object(a.useEffect)(()=>{let e;const a=()=>{e=setTimeout(()=>{r(e=>(e+1)%(t+1)),a()},n)};return a(),()=>{clearTimeout(e)}},[]),l.a.createElement(l.a.Fragment,null,l.a.createElement("span",null,".".repeat(c)),l.a.createElement(i,null,".".repeat(t-c)))})},4:function(e,t,n){"use strict";var a=n(0),l=n(8);const i=Object(l.a)({initial:!0,waiting:!0,error:null});t.a=()=>{const[e,t]=i();var n;return[e,Object(a.useCallback)((n=t,Object(a.useCallback)(e=>n(t=>({...t,...e instanceof Function?e(t):e})),[n])),[t])]}},65:function(e,t,n){"use strict";n.r(t);n(34),n(37);var a=n(0),l=n.n(a),i=n(15),c=n.n(i),r=n(2),o=n(12),s=n(4);var u={border:"#aaa solid 1px"};var m=r.b`
  body {
    font-family: Tahoma, Arial, sans-serif;
  }
`;var b=r.d.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${1e8};
`;const d=r.e`
  from {
    opacity: 0;
  }
  to {}
`;var f=Object(r.d)(b)`
  background-color: white;
  opacity: 0.75;

  ${e=>e.animate&&r.c`
    animation: ${d} 0.25s ease-out;
  `}
`;var E=Object(r.d)(b)`
  display: flex;
  justify-content: center;
  align-items: center;
`;var v=Object(a.memo)(({noAnimation:e,children:t})=>l.a.createElement("div",null,l.a.createElement(f,{animate:!e}),l.a.createElement(E,null,t)));const j=r.d.div`
  font-size: 5vw;
  color: #808080;
  user-select: none;

  @media (max-width: 999px) {
    font-size: 8vw;
  }
`;var p=Object(a.memo)(({noAnimation:e,children:t})=>l.a.createElement(v,{noAnimation:e},l.a.createElement(j,null,t))),O=n(17);var w=Object(a.memo)(()=>{const[e]=Object(s.a)(),t=Object(a.useCallback)(t=>l.a.createElement(p,Object.assign({},t,{noAnimation:e.initial})),[e.initial]),{error:n,waiting:i}=e;return navigator.onLine?n?l.a.createElement(t,null,n):i?l.a.createElement(t,null,"wait",l.a.createElement(O.a,{initialNum:3,maxNum:3,interval:1e3})):null:l.a.createElement(t,null,"you're offline")});const h=Promise.all([n.e(8),n.e(78)]).then(n.bind(null,536)),g=Promise.all([n.e(8),n.e(82)]).then(n.bind(null,535)),y=Object(a.lazy)(()=>h),x=Object(a.lazy)(()=>g),k=r.d.div`
  & * {
    box-sizing: border-box;
  }
`;var z=()=>{const[e,t]=Object(s.a)();return Object(a.useEffect)(()=>{e.initial&&!e.waiting&&t({initial:!1})},[e.waiting]),l.a.createElement(r.a,{theme:u},l.a.createElement(m,null),l.a.createElement(k,null,l.a.createElement(w,null),l.a.createElement(a.Suspense,{fallback:!1},l.a.createElement(o.a,null,l.a.createElement(y,null))),l.a.createElement(a.Suspense,{fallback:!1},l.a.createElement(x,null))))};c.a.render(l.a.createElement(z,null),document.getElementById("app"))},8:function(e,t,n){"use strict";var a=n(0),l=n(19);t.a=e=>{let t=e instanceof Function?e():e;const n=[];return()=>{const e=Object(a.useState)(t)[1];Object(a.useEffect)(()=>(n.push(e),()=>{l(n,e)}),[]);const i=Object(a.useCallback)(e=>{t=e instanceof Function?e(t):e;for(const e of n)e(t)},[t,n]);return[t,i]}}}},[[65,79,77,81]]]);