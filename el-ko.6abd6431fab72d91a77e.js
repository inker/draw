(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{105:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(67),o=n(78),s=n(79),l=n(114),u=n(116),i=n(70),m=n(71),p=n(75),b=n(86),d=n(117),f=n(82),E=n(83),h=n(90),j=n(115),O=n(85),g=n(84);function v(e){return{currentMatchupNum:0,currentPotNum:1,possiblePairings:null,pots:e.map(e=>s(e)),matchups:r(16).map(()=>[])}}t.default=Object(a.memo)(({season:e,pots:t})=>{const[n,r]=Object(i.a)(),[s,w]=Object(m.a)(),y=Object(a.useMemo)(()=>Object(u.a)(e),[e]),[{currentMatchupNum:N,currentPotNum:k,possiblePairings:P,pots:T,matchups:M},x]=Object(a.useState)(()=>v(t));Object(a.useEffect)(()=>{x(v(t))},[t,n]);const S=(e=>{const t=Object(a.useMemo)(()=>window.matchMedia(e),[e]),[n,c]=Object(a.useState)(t.matches);return Object(a.useEffect)(()=>{const e=e=>{c(e.matches)};return t.addEventListener("change",e),()=>{t.removeEventListener("change",e)}},[t]),n})("(min-height: 750px)"),[G]=Object(p.a)(),R=Object(a.useRef)(null),A=Object(a.useCallback)(e=>{const t=T[k],n=P?P[e]:e,a=t[n],c=T.slice();c[k]=c[k].filter((e,t)=>t!==n);const r=M.slice();r[N]=[...r[N],a];const o=1===k?Object(l.a)(c,r,y):null;x({currentPotNum:1-k,currentMatchupNum:N-k+1,possiblePairings:o,pots:c,matchups:r})},[y,T,M,k,N,P]),$=()=>{if(s)return;(1===(null==P?void 0:P.length)||1===k&&1===T[1].length)&&A(0)};Object(a.useEffect)(()=>{setTimeout($,250)},[k]);const F=Object(a.useMemo)(()=>P&&T[0].filter((e,t)=>P.includes(t)),[P]),I=N>=t[0].length;Object(a.useEffect)(()=>{if(s){const e=(null!=F?F:T[1]).length;if(e>0){const t=o(e-1);A(t)}}},[s,k]),Object(a.useEffect)(()=>{I&&s&&w(!1)},[I,s]);const z=P?P.map(e=>T[0][e]):[];return c.a.createElement(g.a,null,c.a.createElement(f.a,null,c.a.createElement(b.a,{selectedTeams:z,initialPots:t,pots:T,currentPotNum:k,split:!S}),c.a.createElement(d.a,{ref:R,matchups:M})),c.a.createElement(E.a,null,!s&&c.a.createElement(c.a.Fragment,null,!I&&c.a.createElement(j.a,null,"Runners-up"),c.a.createElement(h.a,{forceNoSelect:0===k,display:!I,displayTeams:G,selectedTeam:null,pot:T[1],onPick:A}),!I&&c.a.createElement(j.a,null,"Group Winners"),F&&c.a.createElement(h.a,{forceNoSelect:1===k,display:!I,displayTeams:G,selectedTeam:null,pot:F,onPick:A})),I&&c.a.createElement(O.a,{long:!1,completed:I,selectedTeam:null,pickedGroup:null,possibleGroups:null,numGroups:0,groupsElement:R,reset:r})))})},114:function(e,t,n){"use strict";function a(e,[t,n],c,r){const o=c.findIndex(e=>1===e.length);if(!r(e,c,o))return!1;const s=[...c],l=s[o][0];s[o]=[l,e];return o+1===s.length||function([e,t],n,c){const r=n.findIndex(e=>!e.length),[o,...s]=t,l=[...n];return l[r]=[o],e.some(t=>a(t,[e,s],l,c))}([t.filter(t=>t!==e),n],s,r)}t.a=([e,t],n,c)=>e.map((e,t)=>t).filter(r=>a(e[r],[e,t],n,c))},115:function(e,t,n){"use strict";const a=n(2).d.div`
  margin-top: 10px;
  margin-bottom: 5px;
  user-select: none;
`;t.a=a},116:function(e,t,n){"use strict";var a=n(113),c=n(106);const r=[{countries:["Russia","Ukraine"],predicate:(o=2014,s=Number.MAX_SAFE_INTEGER,e=>e>=o&&e<=s)},{countries:["Azerbaijan","Armenia"]},{countries:["Serbia","Kosovo"]},{countries:["Bosnia & Herzegovina","Kosovo"]},{countries:["Spain","Gibraltar"]}];var o,s;const l={predicate:c};var u=r.map(e=>({...l,...e})),i=e=>{const t=(e=>{const t=new Map;for(const{countries:n,predicate:a}of u)a(e)&&(t.set(n[0],n[1]),t.set(n[1],n[0]));return t.get.bind(t)})(e);return e=>{const n=t(e.country);return void 0===n?a:e=>e.country===n}};t.a=e=>{const t=i(e),n=(e,n)=>{return 0===e.length||1===e.length&&(a=n,c=e[0],a.country!==c.country&&a.group!==c.group&&!t(a)(c));var a,c};return(e,t,a)=>n(t[a],e)}},117:function(e,t,n){"use strict";var a=n(0),c=n.n(a),r=n(2),o=n(72),s=n(68),l=n(66),u=n(97),i=n(80),m=n(74),p=n(69),b=n(81),d=n(89);const f=r.e`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,E=r.c`
  animation: ${f} 3s ease-out normal forwards;
`;var h=Object(r.d)(l.a)`
  width: 150px;
  ${e=>e.hasTeam&&E};
  ${e=>e.styles};
`;var j=Object(a.memo)(({team:e})=>{var t;const n=Object(i.a)(e),[r,o]=Object(a.useState)(e),s=Object(a.useRef)(null),l=Object(a.useCallback)(()=>{o(e)},[e]);return c.a.createElement(c.a.Fragment,null,c.a.createElement(h,{hasTeam:!!r},r?c.a.createElement(p.a,{country:Object(m.a)(r)},null!==(t=r.shortName)&&void 0!==t?t:r.name):c.a.createElement(b.a,{ref:s})),e&&e!==n&&c.a.createElement(d.a,{from:`[data-cellid='${e.id}']`,to:s,duration:350,team:e,onAnimationEnd:l}))});const O=Object(r.d)(u.a)`
  justify-content: center;
  width: 23px;
  color: #444;

  &::before {
    content: 'v';
  }
`;var g=Object(a.memo)(({teams:e})=>{const[t,n]=null!=e?e:[];return c.a.createElement(s.a,null,c.a.createElement(j,{team:t}),c.a.createElement(l.a,null,c.a.createElement(O,null)),c.a.createElement(j,{team:n}))});const v=Object(r.d)(o.a)`
  width: auto;
  align-self: center;
  max-width: initial;
`,w=Object(a.forwardRef)(({matchups:e},t)=>c.a.createElement(v,{ref:t},c.a.createElement("tbody",null,null==e?void 0:e.map((e,t)=>c.a.createElement(g,{key:t,teams:e})))));t.a=Object(a.memo)(w)}},0,[80]]);