(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{107:function(e,t,n){"use strict";function a(e,[t,n],r,c){const o=r.findIndex(e=>1===e.length);if(!c(e,r,o))return!1;const s=[...r],l=s[o][0];s[o]=[l,e];return o+1===s.length||function([e,t],n,r){const c=n.findIndex(e=>!e.length),[o,...s]=t,l=[...n];return l[c]=[o],e.some(t=>a(t,[e,s],l,r))}([t.filter(t=>t!==e),n],s,c)}t.a=([e,t],n,r)=>e.map((e,t)=>t).filter(c=>a(e[c],[e,t],n,r))},108:function(e,t,n){"use strict";const a=n(1).d.div`
  margin-top: 10px;
  margin-bottom: 5px;
  user-select: none;
`;t.a=a},109:function(e,t,n){"use strict";var a=n(105),r=n(100);const c=[{countries:["Russia","Ukraine"],predicate:(o=2014,s=Number.MAX_SAFE_INTEGER,e=>e>=o&&e<=s)},{countries:["Azerbaijan","Armenia"]},{countries:["Serbia","Kosovo"]},{countries:["Bosnia & Herzegovina","Kosovo"]},{countries:["Spain","Gibraltar"]}];var o,s;const l={predicate:r};var u=c.map(e=>({...l,...e})),i=e=>{const t=(e=>{const t=new Map;for(const{countries:n,predicate:a}of u)a(e)&&(t.set(n[0],n[1]),t.set(n[1],n[0]));return t.get.bind(t)})(e);return e=>{const n=t(e.country);return void 0===n?a:e=>e.country===n}};t.a=e=>{const t=i(e),n=(e,n)=>{return 0===e.length||1===e.length&&(a=n,r=e[0],a.country!==r.country&&a.group!==r.group&&!t(a)(r));var a,r};return(e,t,a)=>n(t[a],e)}},110:function(e,t,n){"use strict";var a=n(0),r=n.n(a),c=n(1),o=n(65),s=n(63),l=n(60),u=n(91),i=n(71),m=n(66),p=n(72),d=n(80);const b=c.e`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,f=c.c`
  animation: ${b} 5s normal forwards;
`;var h=Object(c.d)(l.a)`
  width: 150px;
  ${e=>e.hasTeam&&f};
  ${e=>e.styles};
`,E=n(62),g=e=>{var t;return null!==(t=e.country)&&void 0!==t?t:e.name in E?e.name:void 0};var j=Object(a.memo)(({team:e,containerStyles:t})=>{var n;const c=Object(i.a)(e),[o,s]=Object(a.useState)(e),l=Object(a.useRef)(null),u=Object(a.useCallback)(()=>{s(e)},[e]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(h,{hasTeam:!!o,styles:t},o?r.a.createElement(m.a,{country:g(o)},null!==(n=o.shortName)&&void 0!==n?n:o.name):r.a.createElement(p.a,{ref:l})),e&&e!==c&&r.a.createElement(d.a,{from:`[data-cellid='${e.id}']`,to:l,duration:350,data:e,onAnimationEnd:u}))});const O=c.c`
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
`,S=Object(a.forwardRef)(({matchups:e},t)=>r.a.createElement(N,{ref:t},r.a.createElement("tbody",null,null==e?void 0:e.map((e,t)=>r.a.createElement(w,{key:t,teams:e})))));t.a=Object(a.memo)(S)},99:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(61),o=n(70),s=n(107),l=n(109),u=n(64),i=n(68),m=n(106),p=n(77),d=n(110),b=n(73),f=n(74),h=n(81),E=n(108),g=n(76),j=n(75);function O(e){return{currentMatchupNum:0,currentPotNum:1,possiblePairings:null,pots:e.map(e=>o(e)),matchups:c(16).map(()=>[])}}t.default=Object(a.memo)(({season:e,pots:t})=>{const[n,c]=Object(u.a)(),o=Object(a.useMemo)(()=>Object(l.a)(e),[e]),[{currentMatchupNum:v,currentPotNum:y,possiblePairings:w,pots:N,matchups:S},k]=Object(a.useState)(()=>O(t));Object(a.useEffect)(()=>{k(O(t))},[t,n]);const x=(e=>{const t=Object(a.useMemo)(()=>window.matchMedia(e),[e]),[n,r]=Object(a.useState)(t.matches);return Object(m.a)(()=>{t.addEventListener("change",e=>{r(e.matches)})}),n})("(min-height: 750px)"),[P]=Object(i.a)(),T=Object(a.useRef)(null),M=Object(a.useCallback)(e=>{const t=N[y],n=w?w[e]:e,a=t[n],r=N.slice();r[y]=r[y].filter((e,t)=>t!==n);const c=S.slice();c[v]=[...c[v],a];const l=1===y?Object(s.a)(r,c,o):null;k({currentPotNum:1-y,currentMatchupNum:v-y+1,possiblePairings:l,pots:r,matchups:c})},[o,N,S,y,v,w]),G=()=>{(1===(null==w?void 0:w.length)||1===y&&1===N[1].length)&&M(0)};Object(a.useEffect)(()=>{setTimeout(G,250)},[y]);const R=Object(a.useMemo)(()=>w&&N[0].filter((e,t)=>w.includes(t)),[w]),A=v>=t[0].length,$=w?w.map(e=>N[0][e]):[];return r.a.createElement(j.a,null,r.a.createElement(b.a,null,r.a.createElement(p.a,{selectedTeams:$,initialPots:t,pots:N,currentPotNum:y,split:!x}),r.a.createElement(d.a,{ref:T,matchups:S})),r.a.createElement(f.a,null,!A&&r.a.createElement(E.a,null,"Runners-up"),r.a.createElement(h.a,{forceNoSelect:0===y,display:!A,displayTeams:P,selectedTeam:null,pot:N[1],onPick:M}),!A&&r.a.createElement(E.a,null,"Group Winners"),A&&r.a.createElement(g.a,{long:!1,completed:A,selectedTeam:null,pickedGroup:null,possibleGroups:null,numGroups:0,groupsElement:T,reset:c}),R&&r.a.createElement(h.a,{forceNoSelect:1===y,display:!A,displayTeams:P,selectedTeam:null,pot:R,onPick:M})))})}},0,[80]]);