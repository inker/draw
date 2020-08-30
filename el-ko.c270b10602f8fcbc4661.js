(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{101:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(61),o=n(72),s=n(73),l=n(111),u=n(113),i=n(64),m=n(65),p=n(69),d=n(80),b=n(114),f=n(76),E=n(77),h=n(84),g=n(112),j=n(79),O=n(78);function v(e){return{currentMatchupNum:0,currentPotNum:1,possiblePairings:null,pots:e.map(e=>s(e)),matchups:r(16).map(()=>[])}}t.default=Object(a.memo)(({season:e,pots:t})=>{const[n,r]=Object(i.a)(),[s,y]=Object(m.a)(),w=Object(a.useMemo)(()=>Object(u.a)(e),[e]),[{currentMatchupNum:N,currentPotNum:S,possiblePairings:k,pots:x,matchups:P},T]=Object(a.useState)(()=>v(t));Object(a.useEffect)(()=>{T(v(t))},[t,n]);const M=(e=>{const t=Object(a.useMemo)(()=>window.matchMedia(e),[e]),[n,c]=Object(a.useState)(t.matches);return Object(a.useEffect)(()=>{const e=e=>{c(e.matches)};return t.addEventListener("change",e),()=>{t.removeEventListener("change",e)}},[t]),n})("(min-height: 750px)"),[G]=Object(p.a)(),R=Object(a.useRef)(null),A=Object(a.useCallback)(e=>{const t=x[S],n=k?k[e]:e,a=t[n],c=x.slice();c[S]=c[S].filter((e,t)=>t!==n);const r=P.slice();r[N]=[...r[N],a];const o=1===S?Object(l.a)(c,r,w):null;T({currentPotNum:1-S,currentMatchupNum:N-S+1,possiblePairings:o,pots:c,matchups:r})},[w,x,P,S,N,k]),$=()=>{if(s)return;(1===(null==k?void 0:k.length)||1===S&&1===x[1].length)&&A(0)};Object(a.useEffect)(()=>{setTimeout($,250)},[S]);const F=Object(a.useMemo)(()=>k&&x[0].filter((e,t)=>k.includes(t)),[k]),I=N>=t[0].length;Object(a.useEffect)(()=>{if(s){const e=(null!=F?F:x[1]).length;if(e>0){const t=o(e-1);A(t)}}},[s,S]),Object(a.useEffect)(()=>{I&&s&&y(!1)},[I,s]);const z=k?k.map(e=>x[0][e]):[];return c.a.createElement(O.a,null,c.a.createElement(f.a,null,c.a.createElement(d.a,{selectedTeams:z,initialPots:t,pots:x,currentPotNum:S,split:!M}),c.a.createElement(b.a,{ref:R,matchups:P})),c.a.createElement(E.a,null,!s&&c.a.createElement(c.a.Fragment,null,!I&&c.a.createElement(g.a,null,"Runners-up"),c.a.createElement(h.a,{forceNoSelect:0===S,display:!I,displayTeams:G,selectedTeam:null,pot:x[1],onPick:A}),!I&&c.a.createElement(g.a,null,"Group Winners"),F&&c.a.createElement(h.a,{forceNoSelect:1===S,display:!I,displayTeams:G,selectedTeam:null,pot:F,onPick:A})),I&&c.a.createElement(j.a,{long:!1,completed:I,selectedTeam:null,pickedGroup:null,possibleGroups:null,numGroups:0,groupsElement:R,reset:r})))})},111:function(e,t,n){"use strict";function a(e,[t,n],c,r){const o=c.findIndex(e=>1===e.length);if(!r(e,c,o))return!1;const s=[...c],l=s[o][0];s[o]=[l,e];return o+1===s.length||function([e,t],n,c){const r=n.findIndex(e=>!e.length),[o,...s]=t,l=[...n];return l[r]=[o],e.some(t=>a(t,[e,s],l,c))}([t.filter(t=>t!==e),n],s,r)}t.a=([e,t],n,c)=>e.map((e,t)=>t).filter(r=>a(e[r],[e,t],n,c))},112:function(e,t,n){"use strict";const a=n(1).d.div`
  margin-top: 10px;
  margin-bottom: 5px;
  user-select: none;
`;t.a=a},113:function(e,t,n){"use strict";var a=n(110),c=n(102);const r=[{countries:["Russia","Ukraine"],predicate:(o=2014,s=Number.MAX_SAFE_INTEGER,e=>e>=o&&e<=s)},{countries:["Azerbaijan","Armenia"]},{countries:["Serbia","Kosovo"]},{countries:["Bosnia & Herzegovina","Kosovo"]},{countries:["Spain","Gibraltar"]}];var o,s;const l={predicate:c};var u=r.map(e=>({...l,...e})),i=e=>{const t=(e=>{const t=new Map;for(const{countries:n,predicate:a}of u)a(e)&&(t.set(n[0],n[1]),t.set(n[1],n[0]));return t.get.bind(t)})(e);return e=>{const n=t(e.country);return void 0===n?a:e=>e.country===n}};t.a=e=>{const t=i(e),n=(e,n)=>{return 0===e.length||1===e.length&&(a=n,c=e[0],a.country!==c.country&&a.group!==c.group&&!t(a)(c));var a,c};return(e,t,a)=>n(t[a],e)}},114:function(e,t,n){"use strict";var a=n(0),c=n.n(a),r=n(1),o=n(66),s=n(63),l=n(60),u=n(93),i=n(74),m=n(67),p=n(75),d=n(83);const b=r.e`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,f=r.c`
  animation: ${b} 5s ease-out normal forwards;
`;var E=Object(r.d)(l.a)`
  width: 150px;
  ${e=>e.hasTeam&&f};
  ${e=>e.styles};
`,h=n(62),g=e=>{var t;return null!==(t=e.country)&&void 0!==t?t:e.name in h?e.name:void 0};var j=Object(a.memo)(({team:e,containerStyles:t})=>{var n;const r=Object(i.a)(e),[o,s]=Object(a.useState)(e),l=Object(a.useRef)(null),u=Object(a.useCallback)(()=>{s(e)},[e]);return c.a.createElement(c.a.Fragment,null,c.a.createElement(E,{hasTeam:!!o,styles:t},o?c.a.createElement(m.a,{country:g(o)},null!==(n=o.shortName)&&void 0!==n?n:o.name):c.a.createElement(p.a,{ref:l})),e&&e!==r&&c.a.createElement(d.a,{from:`[data-cellid='${e.id}']`,to:l,duration:350,data:e,onAnimationEnd:u}))});const O=r.c`
  border-right: 1px solid rgba(0, 0, 0, 0);
`,v=r.c`
  border-left: 1px solid rgba(0, 0, 0, 0);
`,y=Object(r.d)(u.a)`
  justify-content: center;
  width: 26px;
  color: #444;

  &::before {
    content: 'v';
  }
`;var w=Object(a.memo)(({teams:e})=>{const[t,n]=null!=e?e:[];return c.a.createElement(s.a,null,c.a.createElement(j,{team:t,containerStyles:O}),c.a.createElement(l.a,null,c.a.createElement(y,null)),c.a.createElement(j,{team:n,containerStyles:v}))});const N=Object(r.d)(o.a)`
  width: auto;
  align-self: center;
  max-width: initial;
`,S=Object(a.forwardRef)(({matchups:e},t)=>c.a.createElement(N,{ref:t},c.a.createElement("tbody",null,null==e?void 0:e.map((e,t)=>c.a.createElement(w,{key:t,teams:e})))));t.a=Object(a.memo)(S)}},0,[80]]);