(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{107:function(e,t,n){"use strict";function a(e,[t,n],r,c){const o=r.findIndex(e=>1===e.length);if(!c(e,r,o))return!1;const l=[...r],i=l[o][0];l[o]=[i,e];return o+1===l.length||function([e,t],n,r){const c=n.findIndex(e=>!e.length),[o,...l]=t,i=[...n];return i[c]=[o],e.some(t=>a(t,[e,l],i,r))}([t.filter(t=>t!==e),n],l,c)}t.a=([e,t],n,r)=>e.map((e,t)=>t).filter(c=>a(e[c],[e,t],n,r))},108:function(e,t,n){"use strict";const a=n(1).d.div`
  margin-top: 10px;
  margin-bottom: 5px;
  user-select: none;
`;t.a=a},109:function(e,t,n){"use strict";var a=n(106),r=n(102);const c=[{countries:["Russia","Ukraine"],predicate:(o=2014,l=Number.MAX_SAFE_INTEGER,e=>e>=o&&e<=l)},{countries:["Azerbaijan","Armenia"]},{countries:["Serbia","Kosovo"]},{countries:["Bosnia & Herzegovina","Kosovo"]},{countries:["Spain","Gibraltar"]}];var o,l;const i={predicate:r};var u=c.map(e=>({...i,...e})),s=e=>{const t=(e=>{const t=new Map;for(const{countries:n,predicate:a}of u)a(e)&&(t.set(n[0],n[1]),t.set(n[1],n[0]));return t.get.bind(t)})(e);return e=>{const n=t(e.country);return void 0===n?a:e=>e.country===n}};t.a=e=>{const t=s(e),n=(e,n)=>{return 0===e.length||1===e.length&&(a=n,r=e[0],a.country!==r.country&&a.group!==r.group&&!t(a)(r));var a,r};return(e,t,a)=>n(t[a],e)}},110:function(e,t,n){"use strict";var a=n(0),r=n.n(a),c=n(1),o=n(64),l=n(60),i=n(59),u=n(93),s=n(65),m=n(71);const d=c.e`
  from {
    background-color: #ff8;
  }
  to {}
`,p=c.c`
  animation: ${d} 5s normal forwards;
`;var b=Object(c.d)(i.a)`
  width: 150px;
  ${e=>e.picked&&p}
`;const f=Object(c.d)(b)`
  border-right: 1px solid rgba(0, 0, 0, 0);
`,E=Object(c.d)(b)`
  border-left: 1px solid rgba(0, 0, 0, 0);
`,g=Object(c.d)(u.a)`
  justify-content: center;
  width: 26px;
  color: #444;

  &::before {
    content: 'v';
  }
`;var j=Object(a.memo)(({index:e,teams:t,airborneTeams:n})=>{var a,c;const[o,u]=null!=t?t:[],d=o&&!n.includes(o),p=u&&!n.includes(u);return r.a.createElement(l.a,null,r.a.createElement(f,{picked:d},d?r.a.createElement(s.a,{country:d?o.country:void 0},d&&(null!==(a=o.shortName)&&void 0!==a?a:o.name)):r.a.createElement(m.a,{"data-cellid":e+"ru"})),r.a.createElement(i.a,null,r.a.createElement(g,null)),r.a.createElement(E,{picked:p},p?r.a.createElement(s.a,{country:p?u.country:void 0},d&&(null!==(c=u.shortName)&&void 0!==c?c:u.name)):r.a.createElement(m.a,{"data-cellid":e+"gw"})))});const h=Object(c.d)(o.a)`
  width: auto;
  align-self: center;
  max-width: initial;
`,O=Object(a.forwardRef)(({matchups:e,airborneTeams:t},n)=>r.a.createElement(h,{ref:n},r.a.createElement("tbody",null,null==e?void 0:e.map((e,n)=>r.a.createElement(j,{key:n,index:n,teams:e,airborneTeams:t})))));t.a=Object(a.memo)(O)},98:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(62),o=n(70),l=n(107),i=n(109),u=n(63),s=n(66),m=n(80),d=n(78),p=n(76),b=n(110),f=n(72),E=n(73),g=n(82),j=n(108),h=n(75),O=n(74);function v(){return{currentMatchupNum:0,currentPotNum:1,possiblePairings:null}}t.default=Object(a.memo)(({season:e,pots:t})=>{const[n,y]=Object(u.a)(),w=Object(a.useMemo)(()=>t.map(e=>o(e)),[t,n]),k=Object(a.useMemo)(()=>c(16).map(()=>[]),[t,n]),x=Object(a.useMemo)(()=>Object(i.a)(e),[e]),[{currentMatchupNum:N,currentPotNum:T,possiblePairings:P},M]=Object(a.useState)(v),[A]=Object(s.a)(),[G,S]=Object(m.a)(),R=Object(a.useRef)(null),$=Object(a.useCallback)(e=>{const t=w[T],n=P?P[e]:e,a=t.splice(n,1)[0];k[N].push(a);const r=1===T?Object(l.a)(w,k,x):null;M({currentPotNum:1-T,currentMatchupNum:N-T+1,possiblePairings:r}),S.add(a)},[x,w,k,T,N,P,G]),I=()=>{(1===(null==P?void 0:P.length)||1===T&&1===w[1].length)&&$(0)};Object(a.useEffect)(()=>{setTimeout(I,250)},[T]);const z=Object(a.useMemo)(()=>P&&w[0].filter((e,t)=>P.includes(t)),[P]),J=N>=t[0].length,K=P?P.map(e=>w[0][e]):[];return r.a.createElement(O.a,null,r.a.createElement(f.a,null,r.a.createElement(p.a,{selectedTeams:K,initialPots:t,pots:w,currentPotNum:T,split:!0}),r.a.createElement(b.a,{ref:R,matchups:k,airborneTeams:G})),r.a.createElement(E.a,null,!J&&r.a.createElement(j.a,null,"Runners-up"),r.a.createElement(g.a,{forceNoSelect:0===T,display:!J,displayTeams:A,selectedTeam:null,pot:w[1],onPick:$}),!J&&r.a.createElement(j.a,null,"Group Winners"),J&&r.a.createElement(h.a,{long:!1,completed:J,isAirborneAnimation:G.length>0,selectedTeam:null,pickedGroup:null,possibleGroups:null,numGroups:0,groupsElement:R.current,reset:y}),z&&r.a.createElement(g.a,{forceNoSelect:1===T,display:!J,displayTeams:A,selectedTeam:null,pot:z,onPick:$})),G.map(e=>{const t=k.findIndex(t=>t.includes(e)),n=k[t].indexOf(e);return r.a.createElement(d.a,{key:e.id,from:`[data-cellid='${e.id}']`,to:`[data-cellid='${t}${1===n?"gw":"ru"}']`,duration:350,data:e,onAnimationEnd:S.remove})}))})}},0,[80]]);