(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{10:function(e,t,n){"use strict";var a=n(0),l=n(15);t.a=e=>{let t=e instanceof Function?e():e;const n=[];return()=>{const e=Object(a.useState)(t)[1];Object(a.useEffect)(()=>(n.push(e),()=>{l(n,e)}),[]);const i=Object(a.useCallback)(e=>{t=e instanceof Function?e(t):e;for(const e of n)e(t)},[t,n]);return[t,i]}}},12:function(e,t,n){"use strict";var a=n(0),l=n.n(a);const i=n(1).d.span`
  opacity: 0;
`;t.a=Object(a.memo)(({initialNum:e,maxNum:t,interval:n})=>{const[c,r]=Object(a.useState)(e);return Object(a.useEffect)(()=>{let e;const a=()=>{e=setTimeout(()=>{r(e=>(e+1)%(t+1)),a()},n)};return a(),()=>{clearTimeout(e)}},[]),l.a.createElement(l.a.Fragment,null,l.a.createElement("span",null,".".repeat(c)),l.a.createElement(i,null,".".repeat(t-c)))})},2:function(e,t,n){"use strict";var a=n(0),l=n(10);const i=Object(l.a)({initial:!0,waiting:!0,error:null});t.a=()=>{const[e,t]=i();var n;return[e,Object(a.useCallback)((n=t,Object(a.useCallback)(e=>n(t=>({...t,...e instanceof Function?e(t):e})),[n])),[t])]}},59:function(e,t,n){"use strict";n.r(t);n(30),n(33);var a=n(0),l=n.n(a),i=n(14),c=n.n(i),r=n(1),o=n(2);var s={border:"#aaa solid 1px"};var u=r.b`
  body {
    font-family: Tahoma, Arial, sans-serif;
  }
`;var m=r.d.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${1e8};
`;const b=r.e`
  from {
    opacity: 0;
  }
  to {}
`;var d=Object(r.d)(m)`
  background-color: white;
  opacity: 0.75;

  ${e=>e.animate&&r.c`
    animation: ${b} 0.25s ease-out;
  `}
`;var f=Object(r.d)(m)`
  display: flex;
  justify-content: center;
  align-items: center;
`;var E=Object(a.memo)(({noAnimation:e,children:t})=>l.a.createElement("div",null,l.a.createElement(d,{animate:!e}),l.a.createElement(f,null,t)));const v=r.d.div`
  font-size: 5vw;
  color: #808080;
  user-select: none;

  @media (max-width: 999px) {
    font-size: 8vw;
  }
`;var j=Object(a.memo)(({noAnimation:e,children:t})=>l.a.createElement(E,{noAnimation:e},l.a.createElement(v,null,t))),p=n(12);var O=Object(a.memo)(()=>{const[e]=Object(o.a)(),t=Object(a.useCallback)(t=>l.a.createElement(j,Object.assign({},t,{noAnimation:e.initial})),[e.initial]),{error:n,waiting:i}=e;return navigator.onLine?n?l.a.createElement(t,null,n):i?l.a.createElement(t,null,"wait",l.a.createElement(p.a,{initialNum:3,maxNum:3,interval:1e3})):null:l.a.createElement(t,null,"you're offline")});const w=Promise.all([n.e(8),n.e(78)]).then(n.bind(null,530)),h=Promise.all([n.e(8),n.e(82)]).then(n.bind(null,529)),g=Object(a.lazy)(()=>w),y=Object(a.lazy)(()=>h),x=r.d.div`
  & * {
    box-sizing: border-box;
  }
`;var k=()=>{const[e,t]=Object(o.a)();return Object(a.useEffect)(()=>{e.initial&&!e.waiting&&t({initial:!1})},[e.waiting]),l.a.createElement(r.a,{theme:s},l.a.createElement(u,null),l.a.createElement(x,null,l.a.createElement(O,null),l.a.createElement(a.Suspense,{fallback:!1},l.a.createElement(g,null)),l.a.createElement(a.Suspense,{fallback:!1},l.a.createElement(y,null))))};c.a.render(l.a.createElement(k,null),document.getElementById("app"))}},[[59,79,77,81]]]);