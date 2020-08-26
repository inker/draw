(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{106:function(e,t,n){"use strict";function a(e,[t,n],r,c){const o=r.findIndex(e=>1===e.length);if(!c(e,r,o))return!1;const l=[...r],u=l[o][0];l[o]=[u,e];return o+1===l.length||function([e,t],n,r){const c=n.findIndex(e=>!e.length),[o,...l]=t,u=[...n];return u[c]=[o],e.some(t=>a(t,[e,l],u,r))}([t.filter(t=>t!==e),n],l,c)}t.a=([e,t],n,r)=>e.map((e,t)=>t).filter(c=>a(e[c],[e,t],n,r))},107:function(e,t){e.exports=function(){return!0}},108:function(e,t,n){"use strict";const a=n(1).c.div`
  margin-top: 10px;
  margin-bottom: 5px;
  user-select: none;
`;t.a=a},109:function(e,t,n){"use strict";var a=n(105),r=n(107);const c=[{countries:["Russia","Ukraine"],predicate:(o=2014,l=Number.MAX_SAFE_INTEGER,e=>e>=o&&e<=l)},{countries:["Azerbaijan","Armenia"]},{countries:["Serbia","Kosovo"]},{countries:["Bosnia & Herzegovina","Kosovo"]},{countries:["Spain","Gibraltar"]}];var o,l;const u={predicate:r};var i=c.map(e=>({...u,...e})),s=e=>{const t=(e=>{const t=new Map;for(const{countries:n,predicate:a}of i)a(e)&&(t.set(n[0],n[1]),t.set(n[1],n[0]));return t.get.bind(t)})(e);return e=>{const n=t(e.country);return void 0===n?a:e=>e.country===n}};t.a=e=>{const t=s(e),n=(e,n)=>{return 0===e.length||1===e.length&&(a=n,r=e[0],a.country!==r.country&&a.group!==r.group&&!t(a)(r));var a,r};return(e,t,a)=>n(t[a],e)}},110:function(e,t,n){"use strict";var a=n(0),r=n.n(a),c=n(1),o=n(64),l=n(62),u=n(59),i=n(93),s=n(65),m=n(71);const d=c.d`
  from {
    background-color: #ff8;
  }
  to {}
`,p=c.b`
  animation: ${d} 5s normal forwards;
`;var b=Object(c.c)(u.a)`
  width: 150px;
  ${e=>e.picked&&p}
`;const f=Object(c.c)(b)`
  border-right: 1px solid rgba(0, 0, 0, 0);
`,E=Object(c.c)(b)`
  border-left: 1px solid rgba(0, 0, 0, 0);
`,g=Object(c.c)(i.a)`
  justify-content: center;
  width: 26px;
  color: #444;

  &::before {
    content: 'v';
  }
`;var j=Object(a.memo)(({index:e,teams:t,airborneTeams:n})=>{var a,c;const[o,i]=null!=t?t:[],d=o&&!n.includes(o),p=i&&!n.includes(i);return r.a.createElement(l.a,null,r.a.createElement(f,{picked:d},d?r.a.createElement(s.a,{country:d?o.country:void 0},d&&(null!==(a=o.shortName)&&void 0!==a?a:o.name)):r.a.createElement(m.a,{"data-cellid":e+"ru"})),r.a.createElement(u.a,null,r.a.createElement(g,null)),r.a.createElement(E,{picked:p},p?r.a.createElement(s.a,{country:p?i.country:void 0},d&&(null!==(c=i.shortName)&&void 0!==c?c:i.name)):r.a.createElement(m.a,{"data-cellid":e+"gw"})))});const h=Object(c.c)(o.a)`
  width: auto;
  align-self: center;
  max-width: initial;
`,O=Object(a.forwardRef)(({matchups:e,airborneTeams:t},n)=>r.a.createElement(h,{ref:n},r.a.createElement("tbody",null,null==e?void 0:e.map((e,n)=>r.a.createElement(j,{index:n,teams:e,airborneTeams:t})))));t.a=Object(a.memo)(O)},95:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(61),o=n(70),l=n(106),u=n(109),i=n(63),s=n(66),m=n(80),d=n(78),p=n(76),b=n(110),f=n(72),E=n(73),g=n(82),j=n(108),h=n(75),O=n(74);function v(){return{currentMatchupNum:0,currentPotNum:1,possiblePairings:null}}t.default=Object(a.memo)(({season:e,pots:t})=>{const[n,w]=Object(i.a)(),y=Object(a.useMemo)(()=>t.map(e=>o(e)),[t,n]),x=Object(a.useMemo)(()=>c(8).map(()=>[]),[t,n]),N=Object(a.useMemo)(()=>Object(u.a)(e),[e]),[{currentMatchupNum:k,currentPotNum:T,possiblePairings:P},M]=Object(a.useState)(v),[A]=Object(s.a)(),[G,S]=Object(m.a)(),R=Object(a.useRef)(null),$=Object(a.useCallback)(e=>{const t=y[T],n=P?P[e]:e,a=t.splice(n,1)[0];x[k].push(a);const r=1===T?Object(l.a)(y,x,N):null;M({currentPotNum:1-T,currentMatchupNum:k-T+1,possiblePairings:r}),S.add(a)},[N,y,x,T,k,P,G]),I=()=>{(1===(null==P?void 0:P.length)||1===T&&1===y[1].length)&&$(0)};Object(a.useEffect)(()=>{setTimeout(I,250)},[T]);const z=Object(a.useMemo)(()=>P&&y[0].filter((e,t)=>P.includes(t)),[P]),J=k>=t[0].length,K=P?P.map(e=>y[0][e]):[];return r.a.createElement(O.a,null,r.a.createElement(f.a,null,r.a.createElement(p.a,{selectedTeams:K,initialPots:t,pots:y,currentPotNum:T}),r.a.createElement(b.a,{ref:R,matchups:x,airborneTeams:G})),r.a.createElement(E.a,null,!J&&r.a.createElement(j.a,null,"Runners-up"),r.a.createElement(g.a,{forceNoSelect:0===T,display:!J,displayTeams:A,selectedTeam:null,pot:y[1],onPick:$}),!J&&r.a.createElement(j.a,null,"Group Winners"),J&&r.a.createElement(h.a,{long:!1,completed:J,isAirborneAnimation:G.length>0,selectedTeam:null,pickedGroup:null,possibleGroups:null,numGroups:0,groupsElement:R.current,reset:w}),z&&r.a.createElement(g.a,{forceNoSelect:1===T,display:!J,displayTeams:A,selectedTeam:null,pot:z,onPick:$})),G.map(e=>{const t=x.findIndex(t=>t.includes(e)),n=x[t].indexOf(e);return r.a.createElement(d.a,{key:e.id,from:`[data-cellid='${e.id}']`,to:`[data-cellid='${t}${1===n?"gw":"ru"}']`,duration:350,data:e,onAnimationEnd:S.remove})}))})}},0,[79]]);