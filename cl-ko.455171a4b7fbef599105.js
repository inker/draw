(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{111:function(e,t,n){"use strict";function a(e,[t,n],r,c){const o=r.findIndex(e=>1===e.length);if(!c(e,r,o))return!1;const l=[...r],s=l[o][0];l[o]=[s,e];return o+1===l.length||function([e,t],n,r){const c=n.findIndex(e=>!e.length),[o,...l]=t,s=[...n];return s[c]=[o],e.some(t=>a(t,[e,l],s,r))}([t.filter(t=>t!==e),n],l,c)}t.a=([e,t],n,r)=>e.map((e,t)=>t).filter(c=>a(e[c],[e,t],n,r))},112:function(e,t,n){"use strict";const a=n(1).d.div`
  margin-top: 10px;
  margin-bottom: 5px;
  user-select: none;
`;t.a=a},113:function(e,t,n){"use strict";var a=n(110),r=n(102);const c=[{countries:["Russia","Ukraine"],predicate:(o=2014,l=Number.MAX_SAFE_INTEGER,e=>e>=o&&e<=l)},{countries:["Azerbaijan","Armenia"]},{countries:["Serbia","Kosovo"]},{countries:["Bosnia & Herzegovina","Kosovo"]},{countries:["Spain","Gibraltar"]}];var o,l;const s={predicate:r};var u=c.map(e=>({...s,...e})),i=e=>{const t=(e=>{const t=new Map;for(const{countries:n,predicate:a}of u)a(e)&&(t.set(n[0],n[1]),t.set(n[1],n[0]));return t.get.bind(t)})(e);return e=>{const n=t(e.country);return void 0===n?a:e=>e.country===n}};t.a=e=>{const t=i(e),n=(e,n)=>{return 0===e.length||1===e.length&&(a=n,r=e[0],a.country!==r.country&&a.group!==r.group&&!t(a)(r));var a,r};return(e,t,a)=>n(t[a],e)}},114:function(e,t,n){"use strict";var a=n(0),r=n.n(a),c=n(1),o=n(66),l=n(63),s=n(60),u=n(93),i=n(74),m=n(67),p=n(75),d=n(83);const b=c.e`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,f=c.c`
  animation: ${b} 5s ease-out normal forwards;
`;var E=Object(c.d)(s.a)`
  width: 150px;
  ${e=>e.hasTeam&&f};
  ${e=>e.styles};
`,j=n(62),g=e=>{var t;return null!==(t=e.country)&&void 0!==t?t:e.name in j?e.name:void 0};var h=Object(a.memo)(({team:e,containerStyles:t})=>{var n;const c=Object(i.a)(e),[o,l]=Object(a.useState)(e),s=Object(a.useRef)(null),u=Object(a.useCallback)(()=>{l(e)},[e]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(E,{hasTeam:!!o,styles:t},o?r.a.createElement(m.a,{country:g(o)},null!==(n=o.shortName)&&void 0!==n?n:o.name):r.a.createElement(p.a,{ref:s})),e&&e!==c&&r.a.createElement(d.a,{from:`[data-cellid='${e.id}']`,to:s,duration:350,data:e,onAnimationEnd:u}))});const O=c.c`
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
`;var w=Object(a.memo)(({teams:e})=>{const[t,n]=null!=e?e:[];return r.a.createElement(l.a,null,r.a.createElement(h,{team:t,containerStyles:O}),r.a.createElement(s.a,null,r.a.createElement(y,null)),r.a.createElement(h,{team:n,containerStyles:v}))});const N=Object(c.d)(o.a)`
  width: auto;
  align-self: center;
  max-width: initial;
`,k=Object(a.forwardRef)(({matchups:e},t)=>r.a.createElement(N,{ref:t},r.a.createElement("tbody",null,null==e?void 0:e.map((e,t)=>r.a.createElement(w,{key:t,teams:e})))));t.a=Object(a.memo)(k)},95:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(61),o=n(72),l=n(73),s=n(111),u=n(113),i=n(64),m=n(65),p=n(69),d=n(80),b=n(114),f=n(76),E=n(77),j=n(84),g=n(112),h=n(79),O=n(78);function v(e){return{currentMatchupNum:0,currentPotNum:1,possiblePairings:null,pots:e.map(e=>l(e)),matchups:c(8).map(()=>[])}}t.default=Object(a.memo)(({season:e,pots:t})=>{const[n,c]=Object(i.a)(),[l,y]=Object(m.a)(),w=Object(a.useMemo)(()=>Object(u.a)(e),[e]),[{currentMatchupNum:N,currentPotNum:k,possiblePairings:P,pots:S,matchups:T},x]=Object(a.useState)(()=>v(t));Object(a.useEffect)(()=>{x(v(t))},[t,n]);const[M]=Object(p.a)(),G=Object(a.useRef)(null),R=Object(a.useCallback)(e=>{const t=S[k],n=P?P[e]:e,a=t[n],r=S.slice();r[k]=r[k].filter((e,t)=>t!==n);const c=T.slice();c[N]=[...c[N],a];const o=1===k?Object(s.a)(r,c,w):null;x({currentPotNum:1-k,currentMatchupNum:N-k+1,possiblePairings:o,pots:r,matchups:c})},[w,S,T,k,N,P]),A=()=>{if(l)return;(1===(null==P?void 0:P.length)||1===k&&1===S[1].length)&&R(0)};Object(a.useEffect)(()=>{setTimeout(A,250)},[k]);const $=Object(a.useMemo)(()=>P&&S[0].filter((e,t)=>P.includes(t)),[P]),I=N>=t[0].length;Object(a.useEffect)(()=>{if(l){const e=(null!=$?$:S[1]).length;if(e>0){const t=o(e-1);R(t)}}},[l,k]),Object(a.useEffect)(()=>{I&&l&&y(!1)},[I,l]);const z=P?P.map(e=>S[0][e]):[];return r.a.createElement(O.a,null,r.a.createElement(f.a,null,r.a.createElement(d.a,{selectedTeams:z,initialPots:t,pots:S,currentPotNum:k}),r.a.createElement(b.a,{ref:G,matchups:T})),r.a.createElement(E.a,null,!I&&r.a.createElement(g.a,null,"Runners-up"),r.a.createElement(j.a,{forceNoSelect:0===k,display:!I,displayTeams:M,selectedTeam:null,pot:S[1],onPick:R}),!I&&r.a.createElement(g.a,null,"Group Winners"),I&&r.a.createElement(h.a,{long:!1,completed:I,selectedTeam:null,pickedGroup:null,possibleGroups:null,numGroups:0,groupsElement:G,reset:c}),$&&r.a.createElement(j.a,{forceNoSelect:1===k,display:!I,displayTeams:M,selectedTeam:null,pot:$,onPick:R})))})}},0,[80]]);