(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{115:function(e,t,n){"use strict";function a(e,[t,n],c,r){const o=c.findIndex(e=>1===e.length);if(!r(e,c,o))return!1;const l=[...c],s=l[o][0];l[o]=[s,e];return o+1===l.length||function([e,t],n,c){const r=n.findIndex(e=>!e.length),[o,...l]=t,s=[...n];return s[r]=[o],e.some(t=>a(t,[e,l],s,c))}([t.filter(t=>t!==e),n],l,r)}t.a=([e,t],n,c)=>e.map((e,t)=>t).filter(r=>a(e[r],[e,t],n,c))},116:function(e,t,n){"use strict";const a=n(2).d.div`
  margin-top: 10px;
  margin-bottom: 5px;
  user-select: none;
`;t.a=a},117:function(e,t,n){"use strict";var a=n(114),c=n(106);const r=[{countries:["Russia","Ukraine"],predicate:(o=2014,l=Number.MAX_SAFE_INTEGER,e=>e>=o&&e<=l)},{countries:["Azerbaijan","Armenia"]},{countries:["Serbia","Kosovo"]},{countries:["Bosnia & Herzegovina","Kosovo"]},{countries:["Spain","Gibraltar"]}];var o,l;const s={predicate:c};var u=r.map(e=>({...s,...e})),i=e=>{const t=(e=>{const t=new Map;for(const{countries:n,predicate:a}of u)a(e)&&(t.set(n[0],n[1]),t.set(n[1],n[0]));return t.get.bind(t)})(e);return e=>{const n=t(e.country);return void 0===n?a:e=>e.country===n}};t.a=e=>{const t=i(e),n=(e,n)=>{return 0===e.length||1===e.length&&(a=n,c=e[0],a.country!==c.country&&a.group!==c.group&&!t(a)(c));var a,c};return(e,t,a)=>n(t[a],e)}},118:function(e,t,n){"use strict";var a=n(0),c=n.n(a),r=n(2),o=n(72),l=n(69),s=n(66),u=n(97),i=n(80),m=n(73),p=n(81),d=n(89);const b=r.e`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,f=r.c`
  animation: ${b} 3s ease-out normal forwards;
`;var E=Object(r.d)(s.a)`
  width: 150px;
  ${e=>e.hasTeam&&f};
  ${e=>e.styles};
`,j=n(68),O=e=>{var t;return null!==(t=e.country)&&void 0!==t?t:e.name in j?e.name:void 0};var g=Object(a.memo)(({team:e})=>{var t;const n=Object(i.a)(e),[r,o]=Object(a.useState)(e),l=Object(a.useRef)(null),s=Object(a.useCallback)(()=>{o(e)},[e]);return c.a.createElement(c.a.Fragment,null,c.a.createElement(E,{hasTeam:!!r},r?c.a.createElement(m.a,{country:O(r)},null!==(t=r.shortName)&&void 0!==t?t:r.name):c.a.createElement(p.a,{ref:l})),e&&e!==n&&c.a.createElement(d.a,{from:`[data-cellid='${e.id}']`,to:l,duration:350,data:e,onAnimationEnd:s}))});const h=Object(r.d)(u.a)`
  justify-content: center;
  width: 23px;
  color: #444;

  &::before {
    content: 'v';
  }
`;var v=Object(a.memo)(({teams:e})=>{const[t,n]=null!=e?e:[];return c.a.createElement(l.a,null,c.a.createElement(g,{team:t}),c.a.createElement(s.a,null,c.a.createElement(h,null)),c.a.createElement(g,{team:n}))});const y=Object(r.d)(o.a)`
  width: auto;
  align-self: center;
  max-width: initial;
`,w=Object(a.forwardRef)(({matchups:e},t)=>c.a.createElement(y,{ref:t},c.a.createElement("tbody",null,null==e?void 0:e.map((e,t)=>c.a.createElement(v,{key:t,teams:e})))));t.a=Object(a.memo)(w)},99:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(67),o=n(78),l=n(79),s=n(115),u=n(117),i=n(70),m=n(71),p=n(75),d=n(86),b=n(118),f=n(82),E=n(83),j=n(90),O=n(116),g=n(85),h=n(84);function v(e){return{currentMatchupNum:0,currentPotNum:1,possiblePairings:null,pots:e.map(e=>l(e)),matchups:r(8).map(()=>[])}}t.default=Object(a.memo)(({season:e,pots:t})=>{const[n,r]=Object(i.a)(),[l,y]=Object(m.a)(),w=Object(a.useMemo)(()=>Object(u.a)(e),[e]),[{currentMatchupNum:N,currentPotNum:k,possiblePairings:P,pots:T,matchups:x},M]=Object(a.useState)(()=>v(t));Object(a.useEffect)(()=>{M(v(t))},[t,n]);const[S]=Object(p.a)(),G=Object(a.useRef)(null),R=Object(a.useCallback)(e=>{const t=T[k],n=P?P[e]:e,a=t[n],c=T.slice();c[k]=c[k].filter((e,t)=>t!==n);const r=x.slice();r[N]=[...r[N],a];const o=1===k?Object(s.a)(c,r,w):null;M({currentPotNum:1-k,currentMatchupNum:N-k+1,possiblePairings:o,pots:c,matchups:r})},[w,T,x,k,N,P]),A=()=>{if(l)return;(1===(null==P?void 0:P.length)||1===k&&1===T[1].length)&&R(0)};Object(a.useEffect)(()=>{setTimeout(A,250)},[k]);const $=Object(a.useMemo)(()=>P&&T[0].filter((e,t)=>P.includes(t)),[P]),F=N>=t[0].length;Object(a.useEffect)(()=>{if(l){const e=(null!=$?$:T[1]).length;if(e>0){const t=o(e-1);R(t)}}},[l,k]),Object(a.useEffect)(()=>{F&&l&&y(!1)},[F,l]);const I=P?P.map(e=>T[0][e]):[];return c.a.createElement(h.a,null,c.a.createElement(f.a,null,c.a.createElement(d.a,{selectedTeams:I,initialPots:t,pots:T,currentPotNum:k}),c.a.createElement(b.a,{ref:G,matchups:x})),c.a.createElement(E.a,null,!l&&c.a.createElement(c.a.Fragment,null,!F&&c.a.createElement(O.a,null,"Runners-up"),c.a.createElement(j.a,{forceNoSelect:0===k,display:!F,displayTeams:S,selectedTeam:null,pot:T[1],onPick:R}),!F&&c.a.createElement(O.a,null,"Group Winners"),$&&c.a.createElement(j.a,{forceNoSelect:1===k,display:!F,displayTeams:S,selectedTeam:null,pot:$,onPick:R})),F&&c.a.createElement(g.a,{long:!1,completed:F,selectedTeam:null,pickedGroup:null,possibleGroups:null,numGroups:0,groupsElement:G,reset:r})))})}},0,[80]]);