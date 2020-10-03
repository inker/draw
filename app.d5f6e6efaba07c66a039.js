(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{15:function(e,t,a){"use strict";var n=a(0),r=a(20);t.a=e=>{const t=Object(n.useMemo)((()=>window.matchMedia(e)),[e]);r.b&&(t.addEventListener=(e,a)=>t.addListener(a),t.removeEventListener=(e,a)=>t.removeListener(a));const[a,c]=Object(n.useState)(t.matches);return Object(n.useEffect)((()=>{const e=e=>{c(e.matches)};return t.addEventListener("change",e),()=>{t.removeEventListener("change",e)}}),[t]),a}},18:function(e,t,a){"use strict";var n=a(4),r=a(19);const c=["light","dark","auto"];t.a=Object(r.a)("store:theme","light",{parse:n,serialize:n,validate:e=>c.includes(e)})},19:function(e,t,a){"use strict";var n=a(0),r=a(24),c=a(6);const o={parse:e=>JSON.parse(e),serialize:e=>JSON.stringify(e),validate:r};t.a=(e,t,a)=>{const r={...o,...a},i=Object(c.a)((()=>{try{const t=window.localStorage.getItem(e);if(t){const e=r.parse(t);if(r.validate(e))return e}}catch(e){console.error(e)}try{window.localStorage.setItem(e,r.serialize(t))}catch(e){console.error(e)}return t}));return()=>{const[a,c]=i(),o=Object(n.useCallback)((t=>{try{const n=t instanceof Function?t(a):t;c(n),window.localStorage.setItem(e,r.serialize(n))}catch(e){console.error(e)}}),[c]),l=Object(n.useCallback)((()=>{c(t);try{window.localStorage.removeItem(e)}catch(e){console.error(e)}}),[c]);return[a,o,l]}}},20:function(e,t,a){"use strict";a.d(t,"a",(function(){return c})),a.d(t,"b",(function(){return o}));var n=a(25);const r=a.n(n).a.getParser(window.navigator.userAgent),c=(r.getPlatformType(),"Firefox"===r.getBrowserName()),o="Safari"===r.getBrowserName()},21:function(e,t,a){"use strict";var n=a(0),r=a.n(n);const c=a(2).e.span`
  opacity: 0;
`;t.a=Object(n.memo)((({initialNum:e,maxNum:t,interval:a})=>{const[o,i]=Object(n.useState)(e);return Object(n.useEffect)((()=>{let e;const n=()=>{e=setTimeout((()=>{i((e=>(e+1)%(t+1))),n()}),a)};return n(),()=>{clearTimeout(e)}}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement("span",null,".".repeat(o)),r.a.createElement(c,null,".".repeat(t-o)))}))},5:function(e,t,a){"use strict";var n=a(0),r=a(6);const c=Object(r.a)({initial:!0,waiting:!0,error:null});t.a=()=>{const[e,t]=c();var a;return[e,Object(n.useCallback)((a=t,Object(n.useCallback)((e=>a((t=>({...t,...e instanceof Function?e(t):e})))),[a])),[t])]}},6:function(e,t,a){"use strict";var n=a(0),r=a(23);t.a=e=>{let t=e instanceof Function?e():e;const a=[];return()=>{const e=Object(n.useState)(t)[1];Object(n.useEffect)((()=>(a.push(e),()=>{r(a,e)})),[]);const c=Object(n.useCallback)((e=>{t=e instanceof Function?e(t):e;for(const e of a)e(t)}),[t,a]);return[t,c]}}},71:function(e,t,a){"use strict";a.r(t);a(40),a(43);var n=a(0),r=a.n(n),c=a(17),o=a.n(c),i=a(2),l=a(13),s=a(5),u=a(18),m=a(15);var d=()=>{const[e]=Object(u.a)(),t=Object(m.a)("(prefers-color-scheme: dark)");return"dark"===e||"auto"===e&&t};const b={isDarkMode:!1,border:"#aaa solid 1px"},f={isDarkMode:!0,border:"#222 solid 1px"};var v=i.c`
  body {
    font-family: Tahoma, Arial, sans-serif;
    color: ${e=>e.theme.isDarkMode?"white":""};
    background-color: ${e=>e.theme.isDarkMode?"#272a33":""};
  }
`;var h=i.e.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${1e8};
`;const O=i.f`
  from {
    opacity: 0;
  }
  to {}
`;var j=Object(i.e)(h)`
  background-color: ${e=>e.theme.isDarkMode?"#222":"white"};
  opacity: 0.75;

  ${e=>e.animate&&i.d`
    animation: ${O} 0.25s ease-out;
  `}
`;var w=Object(i.e)(h)`
  display: flex;
  justify-content: center;
  align-items: center;
`;var E=Object(n.memo)((({noAnimation:e,children:t})=>r.a.createElement("div",null,r.a.createElement(j,{animate:!e}),r.a.createElement(w,null,t))));const g=i.e.div`
  font-size: 5vw;
  color: ${e=>e.theme.isDarkMode?"":"#808080"};
  user-select: none;

  @media (max-width: 999px) {
    font-size: 8vw;
  }
`;var p=Object(n.memo)((({noAnimation:e,children:t})=>r.a.createElement(E,{noAnimation:e},r.a.createElement(g,null,t)))),k=a(21);var y=Object(n.memo)((()=>{const[e]=Object(s.a)(),t=Object(n.useCallback)((t=>r.a.createElement(p,Object.assign({},t,{noAnimation:e.initial}))),[e.initial]),{error:a,waiting:c}=e;return a?r.a.createElement(t,null,a):c?r.a.createElement(t,null,"wait",r.a.createElement(k.a,{initialNum:3,maxNum:3,interval:1e3})):null}));const x=Promise.all([a.e(10),a.e(81)]).then(a.bind(null,541)),S=Promise.all([a.e(10),a.e(85)]).then(a.bind(null,540)),z=Object(n.lazy)((()=>x)),M=Object(n.lazy)((()=>S)),N=i.e.div`
  & * {
    box-sizing: border-box;
  }
`;var $=()=>{const[e,t]=Object(s.a)(),a=d();return Object(n.useEffect)((()=>{e.initial&&!e.waiting&&t({initial:!1})}),[e.waiting]),r.a.createElement(i.b,{theme:a?f:b},r.a.createElement(v,null),r.a.createElement(N,null,r.a.createElement(y,null),r.a.createElement(n.Suspense,{fallback:!1},r.a.createElement(l.a,null,r.a.createElement(z,null))),r.a.createElement(n.Suspense,{fallback:!1},r.a.createElement(M,null))))};o.a.render(r.a.createElement($,null),document.getElementById("app"))}},[[71,82,80,84]]]);