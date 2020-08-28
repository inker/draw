(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{106:function(e,t,n){"use strict";function a(e,[t,n],r,c){const o=r.findIndex(e=>1===e.length);if(!c(e,r,o))return!1;const l=[...r],s=l[o][0];l[o]=[s,e];return o+1===l.length||function([e,t],n,r){const c=n.findIndex(e=>!e.length),[o,...l]=t,s=[...n];return s[c]=[o],e.some(t=>a(t,[e,l],s,r))}([t.filter(t=>t!==e),n],l,c)}t.a=([e,t],n,r)=>e.map((e,t)=>t).filter(c=>a(e[c],[e,t],n,r))},107:function(e,t,n){"use strict";const a=n(1).d.div`
  margin-top: 10px;
  margin-bottom: 5px;
  user-select: none;
`;t.a=a},108:function(e,t,n){"use strict";var a=n(105),r=n(101);const c=[{countries:["Russia","Ukraine"],predicate:(o=2014,l=Number.MAX_SAFE_INTEGER,e=>e>=o&&e<=l)},{countries:["Azerbaijan","Armenia"]},{countries:["Serbia","Kosovo"]},{countries:["Bosnia & Herzegovina","Kosovo"]},{countries:["Spain","Gibraltar"]}];var o,l;const s={predicate:r};var u=c.map(e=>({...s,...e})),i=e=>{const t=(e=>{const t=new Map;for(const{countries:n,predicate:a}of u)a(e)&&(t.set(n[0],n[1]),t.set(n[1],n[0]));return t.get.bind(t)})(e);return e=>{const n=t(e.country);return void 0===n?a:e=>e.country===n}};t.a=e=>{const t=i(e),n=(e,n)=>{return 0===e.length||1===e.length&&(a=n,r=e[0],a.country!==r.country&&a.group!==r.group&&!t(a)(r));var a,r};return(e,t,a)=>n(t[a],e)}},109:function(e,t,n){"use strict";var a=n(0),r=n.n(a),c=n(1),o=n(64),l=n(60),s=n(59),u=n(92),i=n(71),m=n(65),p=n(72),d=n(80);const b=c.e`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,f=c.c`
  animation: ${b} 5s normal forwards;
`;var E=Object(c.d)(s.a)`
  width: 150px;
  ${e=>e.hasTeam&&f};
  ${e=>e.styles};
`;var g=Object(a.memo)(({team:e,containerStyles:t})=>{var n;const c=Object(i.a)(e),[o,l]=Object(a.useState)(e),s=Object(a.useRef)(null),u=Object(a.useCallback)(()=>{l(e)},[e]);return r.a.createElement(E,{hasTeam:!!o,styles:t},o?r.a.createElement(m.a,{country:o?o.country:void 0},o&&(null!==(n=o.shortName)&&void 0!==n?n:o.name)):r.a.createElement(p.a,{ref:s}),e&&e!==c&&r.a.createElement(d.a,{from:`[data-cellid='${e.id}']`,to:s,duration:350,data:e,onAnimationEnd:u}))});const h=c.c`
  border-right: 1px solid rgba(0, 0, 0, 0);
`,j=c.c`
  border-left: 1px solid rgba(0, 0, 0, 0);
`,O=Object(c.d)(u.a)`
  justify-content: center;
  width: 26px;
  color: #444;

  &::before {
    content: 'v';
  }
`;var v=Object(a.memo)(({index:e,teams:t})=>{const[n,a]=null!=t?t:[];return r.a.createElement(l.a,null,r.a.createElement(g,{team:n,containerStyles:h}),r.a.createElement(s.a,null,r.a.createElement(O,null)),r.a.createElement(g,{team:a,containerStyles:j}))});const y=Object(c.d)(o.a)`
  width: auto;
  align-self: center;
  max-width: initial;
`,w=Object(a.forwardRef)(({matchups:e},t)=>r.a.createElement(y,{ref:t},r.a.createElement("tbody",null,null==e?void 0:e.map((e,t)=>r.a.createElement(v,{key:t,index:t,teams:e})))));t.a=Object(a.memo)(w)},97:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(61),o=n(70),l=n(106),s=n(108),u=n(62),i=n(67),m=n(77),p=n(109),d=n(73),b=n(74),f=n(82),E=n(107),g=n(76),h=n(75);function j(){return{currentMatchupNum:0,currentPotNum:1,possiblePairings:null,matchups:c(16).map(()=>[])}}t.default=Object(a.memo)(({season:e,pots:t})=>{const[n,c]=Object(u.a)(),O=Object(a.useMemo)(()=>t.map(e=>o(e)),[t,n]),v=Object(a.useMemo)(()=>Object(s.a)(e),[e]),[{currentMatchupNum:y,currentPotNum:w,possiblePairings:N,matchups:x},k]=Object(a.useState)(j),[P]=Object(i.a)(),S=Object(a.useRef)(null),T=Object(a.useCallback)(e=>{const t=O[w],n=N?N[e]:e,a=t.splice(n,1)[0],r=x.slice();r[y]=[...r[y],a];const c=1===w?Object(l.a)(O,r,v):null;k({currentPotNum:1-w,currentMatchupNum:y-w+1,possiblePairings:c,matchups:r})},[v,O,x,w,y,N]),M=()=>{(1===(null==N?void 0:N.length)||1===w&&1===O[1].length)&&T(0)};Object(a.useEffect)(()=>{setTimeout(M,250)},[w]);const G=Object(a.useMemo)(()=>N&&O[0].filter((e,t)=>N.includes(t)),[N]),R=y>=t[0].length,A=N?N.map(e=>O[0][e]):[];return r.a.createElement(h.a,null,r.a.createElement(d.a,null,r.a.createElement(m.a,{selectedTeams:A,initialPots:t,pots:O,currentPotNum:w,split:!0}),r.a.createElement(p.a,{ref:S,matchups:x})),r.a.createElement(b.a,null,!R&&r.a.createElement(E.a,null,"Runners-up"),r.a.createElement(f.a,{forceNoSelect:0===w,display:!R,displayTeams:P,selectedTeam:null,pot:O[1],onPick:T}),!R&&r.a.createElement(E.a,null,"Group Winners"),R&&r.a.createElement(g.a,{long:!1,completed:R,selectedTeam:null,pickedGroup:null,possibleGroups:null,numGroups:0,groupsElement:S.current,reset:c}),G&&r.a.createElement(f.a,{forceNoSelect:1===w,display:!R,displayTeams:P,selectedTeam:null,pot:G,onPick:T})))})}},0,[80]]);