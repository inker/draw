(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{102:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(67),o=n(78),l=n(79),s=n(114),u=n(116),i=n(70),m=n(71),p=n(75),b=n(121),d=n(86),f=n(117),E=n(82),j=n(83),O=n(90),g=n(115),h=n(85),v=n(84);function w(e){return{currentMatchupNum:0,currentPotNum:1,possiblePairings:null,pots:e.map(e=>l(e)),matchups:r(16).map(()=>[])}}t.default=Object(a.memo)(({season:e,pots:t})=>{const[n,r]=Object(i.a)(),[l,y]=Object(m.a)(),k=Object(a.useMemo)(()=>Object(u.a)(e),[e]),[{currentMatchupNum:N,currentPotNum:P,possiblePairings:x,pots:T,matchups:M},S]=Object(a.useState)(()=>w(t));Object(a.useEffect)(()=>{S(w(t))},[t,n]);const G=Object(b.a)("(min-height: 750px)"),[R]=Object(p.a)(),A=Object(a.useRef)(null),$=Object(a.useCallback)(e=>{const t=T[P],n=x?x[e]:e,a=t[n],c=T.slice();c[P]=c[P].filter((e,t)=>t!==n);const r=M.slice();r[N]=[...r[N],a];const o=1===P?Object(s.a)(c,r,k):null;S({currentPotNum:1-P,currentMatchupNum:N-P+1,possiblePairings:o,pots:c,matchups:r})},[k,T,M,P,N,x]),F=()=>{if(l)return;(1===(null==x?void 0:x.length)||1===P&&1===T[1].length)&&$(0)};Object(a.useEffect)(()=>{setTimeout(F,250)},[P]);const I=Object(a.useMemo)(()=>x&&T[0].filter((e,t)=>x.includes(t)),[x]),z=N>=t[0].length;Object(a.useEffect)(()=>{if(l){const e=(null!=I?I:T[1]).length;if(e>0){const t=o(e-1);$(t)}}},[l,P]),Object(a.useEffect)(()=>{z&&l&&y(!1)},[z,l]);const C=x?x.map(e=>T[0][e]):[];return c.a.createElement(v.a,null,c.a.createElement(E.a,null,c.a.createElement(d.a,{selectedTeams:C,initialPots:t,pots:T,currentPotNum:P,split:!G}),c.a.createElement(f.a,{ref:A,matchups:M})),c.a.createElement(j.a,null,!l&&c.a.createElement(c.a.Fragment,null,!z&&c.a.createElement(g.a,null,"Runners-up"),c.a.createElement(O.a,{forceNoSelect:0===P,display:!z,displayTeams:R,selectedTeam:null,pot:T[1],onPick:$}),!z&&c.a.createElement(g.a,null,"Group Winners"),I&&c.a.createElement(O.a,{forceNoSelect:1===P,display:!z,displayTeams:R,selectedTeam:null,pot:I,onPick:$})),z&&c.a.createElement(h.a,{long:!1,completed:z,selectedTeam:null,pickedGroup:null,possibleGroups:null,numGroups:0,groupsElement:A,reset:r})))})},114:function(e,t,n){"use strict";function a(e,[t,n],c,r){const o=c.findIndex(e=>1===e.length);if(!r(e,c,o))return!1;const l=[...c],s=l[o][0];l[o]=[s,e];return o+1===l.length||function([e,t],n,c){const r=n.findIndex(e=>!e.length),[o,...l]=t,s=[...n];return s[r]=[o],e.some(t=>a(t,[e,l],s,c))}([t.filter(t=>t!==e),n],l,r)}t.a=([e,t],n,c)=>e.map((e,t)=>t).filter(r=>a(e[r],[e,t],n,c))},115:function(e,t,n){"use strict";const a=n(2).d.div`
  margin-top: 10px;
  margin-bottom: 5px;
  user-select: none;
`;t.a=a},116:function(e,t,n){"use strict";var a=n(113),c=n(106);const r=[{countries:["Russia","Ukraine"],predicate:(o=2014,l=Number.MAX_SAFE_INTEGER,e=>e>=o&&e<=l)},{countries:["Azerbaijan","Armenia"]},{countries:["Serbia","Kosovo"]},{countries:["Bosnia & Herzegovina","Kosovo"]},{countries:["Spain","Gibraltar"]}];var o,l;const s={predicate:c};var u=r.map(e=>({...s,...e})),i=e=>{const t=(e=>{const t=new Map;for(const{countries:n,predicate:a}of u)a(e)&&(t.set(n[0],n[1]),t.set(n[1],n[0]));return t.get.bind(t)})(e);return e=>{const n=t(e.country);return void 0===n?a:e=>e.country===n}};t.a=e=>{const t=i(e),n=(e,n)=>{return 0===e.length||1===e.length&&(a=n,c=e[0],a.country!==c.country&&a.group!==c.group&&!t(a)(c));var a,c};return(e,t,a)=>n(t[a],e)}},117:function(e,t,n){"use strict";var a=n(0),c=n.n(a),r=n(2),o=n(72),l=n(68),s=n(66),u=n(97),i=n(80),m=n(74),p=n(69),b=n(81),d=n(89);const f=r.e`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,E=r.c`
  animation: ${f} 3s ease-out normal forwards;
`;var j=Object(r.d)(s.a)`
  width: 150px;
  ${e=>e.picked&&E};
  ${e=>e.styles};
`;var O=Object(a.memo)(({team:e})=>{var t;const n=Object(i.a)(e),[r,o]=Object(a.useState)(e),l=Object(a.useRef)(null),s=Object(a.useCallback)(()=>{o(e)},[e]);return c.a.createElement(c.a.Fragment,null,c.a.createElement(j,{picked:!!r},r?c.a.createElement(p.a,{country:Object(m.a)(r)},null!==(t=r.shortName)&&void 0!==t?t:r.name):c.a.createElement(b.a,{ref:l})),e&&e!==n&&c.a.createElement(d.a,{from:`[data-cellid='${e.id}']`,to:l,duration:350,team:e,onAnimationEnd:s}))});const g=Object(r.d)(u.a)`
  justify-content: center;
  width: 23px;
  color: #444;

  &::before {
    content: 'v';
  }
`;var h=Object(a.memo)(({teams:e})=>{const[t,n]=null!=e?e:[];return c.a.createElement(l.a,null,c.a.createElement(O,{team:t}),c.a.createElement(s.a,null,c.a.createElement(g,null)),c.a.createElement(O,{team:n}))});const v=Object(r.d)(o.a)`
  width: auto;
  align-self: center;
  max-width: initial;
`,w=Object(a.forwardRef)(({matchups:e},t)=>c.a.createElement(v,{ref:t},c.a.createElement("tbody",null,null==e?void 0:e.map((e,t)=>c.a.createElement(h,{key:t,teams:e})))));t.a=Object(a.memo)(w)}},0,[80]]);