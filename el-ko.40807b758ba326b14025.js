(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{106:function(e,t,n){"use strict";function a(e,[t,n],r,c){const o=r.findIndex(e=>1===e.length);if(!c(e,r,o))return!1;const s=[...r],l=s[o][0];s[o]=[l,e];return o+1===s.length||function([e,t],n,r){const c=n.findIndex(e=>!e.length),[o,...s]=t,l=[...n];return l[c]=[o],e.some(t=>a(t,[e,s],l,r))}([t.filter(t=>t!==e),n],s,c)}t.a=([e,t],n,r)=>e.map((e,t)=>t).filter(c=>a(e[c],[e,t],n,r))},107:function(e,t,n){"use strict";const a=n(1).d.div`
  margin-top: 10px;
  margin-bottom: 5px;
  user-select: none;
`;t.a=a},108:function(e,t,n){"use strict";var a=n(105),r=n(100);const c=[{countries:["Russia","Ukraine"],predicate:(o=2014,s=Number.MAX_SAFE_INTEGER,e=>e>=o&&e<=s)},{countries:["Azerbaijan","Armenia"]},{countries:["Serbia","Kosovo"]},{countries:["Bosnia & Herzegovina","Kosovo"]},{countries:["Spain","Gibraltar"]}];var o,s;const l={predicate:r};var u=c.map(e=>({...l,...e})),i=e=>{const t=(e=>{const t=new Map;for(const{countries:n,predicate:a}of u)a(e)&&(t.set(n[0],n[1]),t.set(n[1],n[0]));return t.get.bind(t)})(e);return e=>{const n=t(e.country);return void 0===n?a:e=>e.country===n}};t.a=e=>{const t=i(e),n=(e,n)=>{return 0===e.length||1===e.length&&(a=n,r=e[0],a.country!==r.country&&a.group!==r.group&&!t(a)(r));var a,r};return(e,t,a)=>n(t[a],e)}},109:function(e,t,n){"use strict";var a=n(0),r=n.n(a),c=n(1),o=n(65),s=n(63),l=n(60),u=n(91),i=n(71),m=n(66),p=n(72),d=n(80);const b=c.e`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,f=c.c`
  animation: ${b} 5s normal forwards;
`;var E=Object(c.d)(l.a)`
  width: 150px;
  ${e=>e.hasTeam&&f};
  ${e=>e.styles};
`,h=n(62),g=e=>{var t;return null!==(t=e.country)&&void 0!==t?t:e.name in h?e.name:void 0};var j=Object(a.memo)(({team:e,containerStyles:t})=>{var n;const c=Object(i.a)(e),[o,s]=Object(a.useState)(e),l=Object(a.useRef)(null),u=Object(a.useCallback)(()=>{s(e)},[e]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(E,{hasTeam:!!o,styles:t},o?r.a.createElement(m.a,{country:g(o)},null!==(n=o.shortName)&&void 0!==n?n:o.name):r.a.createElement(p.a,{ref:l})),e&&e!==c&&r.a.createElement(d.a,{from:`[data-cellid='${e.id}']`,to:l,duration:350,data:e,onAnimationEnd:u}))});const O=c.c`
  border-right: 1px solid rgba(0, 0, 0, 0);
`,v=c.c`
  border-left: 1px solid rgba(0, 0, 0, 0);
`,y=Object(c.d)(u.a)`
  justify-content: center;
  width: 26px;
  color: #444;

  &::before {
    content: 'v';
  }
`;var w=Object(a.memo)(({teams:e})=>{const[t,n]=null!=e?e:[];return r.a.createElement(s.a,null,r.a.createElement(j,{team:t,containerStyles:O}),r.a.createElement(l.a,null,r.a.createElement(y,null)),r.a.createElement(j,{team:n,containerStyles:v}))});const N=Object(c.d)(o.a)`
  width: auto;
  align-self: center;
  max-width: initial;
`,S=Object(a.forwardRef)(({matchups:e},t)=>r.a.createElement(N,{ref:t},r.a.createElement("tbody",null,null==e?void 0:e.map((e,t)=>r.a.createElement(w,{key:t,teams:e})))));t.a=Object(a.memo)(S)},99:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(61),o=n(70),s=n(106),l=n(108),u=n(64),i=n(68),m=n(77),p=n(109),d=n(73),b=n(74),f=n(81),E=n(107),h=n(76),g=n(75);function j(e){return{currentMatchupNum:0,currentPotNum:1,possiblePairings:null,pots:e.map(e=>o(e)),matchups:c(16).map(()=>[])}}t.default=Object(a.memo)(({season:e,pots:t})=>{const[n,c]=Object(u.a)(),o=Object(a.useMemo)(()=>Object(l.a)(e),[e]),[{currentMatchupNum:O,currentPotNum:v,possiblePairings:y,pots:w,matchups:N},S]=Object(a.useState)(()=>j(t));Object(a.useEffect)(()=>{S(j(t))},[t,n]);const k=(e=>{const t=Object(a.useMemo)(()=>window.matchMedia(e),[e]),[n,r]=Object(a.useState)(t.matches);return Object(a.useEffect)(()=>{const e=e=>{r(e.matches)};return t.addEventListener("change",e),()=>{t.removeEventListener("change",e)}},[t]),n})("(min-height: 750px)"),[x]=Object(i.a)(),P=Object(a.useRef)(null),T=Object(a.useCallback)(e=>{const t=w[v],n=y?y[e]:e,a=t[n],r=w.slice();r[v]=r[v].filter((e,t)=>t!==n);const c=N.slice();c[O]=[...c[O],a];const l=1===v?Object(s.a)(r,c,o):null;S({currentPotNum:1-v,currentMatchupNum:O-v+1,possiblePairings:l,pots:r,matchups:c})},[o,w,N,v,O,y]),M=()=>{(1===(null==y?void 0:y.length)||1===v&&1===w[1].length)&&T(0)};Object(a.useEffect)(()=>{setTimeout(M,250)},[v]);const G=Object(a.useMemo)(()=>y&&w[0].filter((e,t)=>y.includes(t)),[y]),R=O>=t[0].length,A=y?y.map(e=>w[0][e]):[];return r.a.createElement(g.a,null,r.a.createElement(d.a,null,r.a.createElement(m.a,{selectedTeams:A,initialPots:t,pots:w,currentPotNum:v,split:!k}),r.a.createElement(p.a,{ref:P,matchups:N})),r.a.createElement(b.a,null,!R&&r.a.createElement(E.a,null,"Runners-up"),r.a.createElement(f.a,{forceNoSelect:0===v,display:!R,displayTeams:x,selectedTeam:null,pot:w[1],onPick:T}),!R&&r.a.createElement(E.a,null,"Group Winners"),R&&r.a.createElement(h.a,{long:!1,completed:R,selectedTeam:null,pickedGroup:null,possibleGroups:null,numGroups:0,groupsElement:P,reset:c}),G&&r.a.createElement(f.a,{forceNoSelect:1===v,display:!R,displayTeams:x,selectedTeam:null,pot:G,onPick:T})))})}},0,[80]]);