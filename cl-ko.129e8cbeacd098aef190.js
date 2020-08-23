(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{104:function(e,t,n){"use strict";function a(e,[t,n],r,o){const c=r.findIndex(e=>1===e.length);if(!o(e,r,c))return!1;const i=[...r],l=i[c][0];i[c]=[l,e];return c+1===i.length||function([e,t],n,r){const o=n.findIndex(e=>!e.length),[c,...i]=t,l=[...n];return l[o]=[c],e.some(t=>a(t,[e,i],l,r))}([t.filter(t=>t!==e),n],i,o)}t.a=([e,t],n,r)=>e.map((e,t)=>t).filter(o=>a(e[o],[e,t],n,r))},105:function(e,t){e.exports=function(){return!0}},106:function(e,t,n){"use strict";const a=n(1).b.div`
  margin-top: 10px;
  margin-bottom: 5px;
  user-select: none;
`;t.a=a},107:function(e,t,n){"use strict";var a=n(103),r=n(105);const o=[{countries:["Russia","Ukraine"],predicate:(c=2014,i=Number.MAX_SAFE_INTEGER,e=>e>=c&&e<=i)},{countries:["Azerbaijan","Armenia"]},{countries:["Serbia","Kosovo"]},{countries:["Bosnia & Herzegovina","Kosovo"]},{countries:["Spain","Gibraltar"]}];var c,i;const l={predicate:r};var s=o.map(e=>({...l,...e})),u=e=>{const t=(e=>{const t=new Map;for(const{countries:n,predicate:a}of s)a(e)&&(t.set(n[0],n[1]),t.set(n[1],n[0]));return t.get.bind(t)})(e);return e=>{const n=t(e.country);return void 0===n?a:e=>e.country===n}};t.a=e=>{const t=u(e),n=(e,n)=>{return 0===e.length||1===e.length&&(a=n,r=e[0],a.country!==r.country&&a.group!==r.group&&!t(a)(r));var a,r};return(e,t,a)=>n(t[a],e)}},108:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(1),c=n(62),i=n(91),l=n(64);const s=o.c`
  from {
    background-color: white;
    box-shadow: 0 0 20px #08f;
  }
  to {}
`,u=o.c`
  from {
    background-color: #ff8;
  }
  to {}
`,m=o.a`
  background-color: rgba(255, 255, 255, 0.9);
  animation: ${s} 1s ease;
  box-shadow: 0 0 5px #6af;
`,d=o.a`
  animation: ${u} 5s normal forwards;
`;var p=Object(o.b)(l.a)`
  width: 150px;
  ${e=>e.possible&&m}
  ${e=>e.picked&&d}
`;const b=Object(o.b)(i.a)`
  display: flex;
`,f=o.b.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
  height: 19px;
  text-align: center;
  font-family: Tahoma, Arial, sans-serif;
  font-size: 12px;
  color: #444;

  &::before {
    content: "v";
  }
`,g=Object(o.b)(p)`
  border-right: 1px solid rgba(0, 0, 0, 0);
`,h=Object(o.b)(p)`
  border-left: 1px solid rgba(0, 0, 0, 0);
`;var x=Object(a.memo)(({index:e,teams:t,airborneTeams:n})=>{var a,o;const[c,i]=null!=t?t:[],l=c&&!n.includes(c),s=i&&!n.includes(i);return r.a.createElement(b,null,r.a.createElement(g,{country:l?c.country:void 0,picked:l,"data-cellid":e+"ru"},l&&(null!==(a=c.shortName)&&void 0!==a?a:c.name)),r.a.createElement(f,null),r.a.createElement(h,{country:s?i.country:void 0,picked:s,"data-cellid":e+"gw"},s&&(null!==(o=i.shortName)&&void 0!==o?o:i.name)))});const v=Object(o.b)(c.a)`
  width: auto;
  align-self: center;
  max-width: initial;
`;t.a=Object(a.memo)(({matchups:e,airborneTeams:t})=>r.a.createElement(v,null,null==e?void 0:e.map((e,n)=>r.a.createElement(x,{index:n,teams:e,airborneTeams:t}))))},93:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(60),c=n(69),i=n(104),l=n(107),s=n(61),u=n(63),m=n(79),d=n(76),p=n(74),b=n(108),f=n(71),g=n(72),h=n(81),x=n(106),v=n(77),E=n(73);function j(){return{currentMatchupNum:0,currentPotNum:1,possiblePairings:null}}t.default=Object(a.memo)(({season:e,pots:t})=>{const[n,O]=Object(s.a)(),w=Object(a.useMemo)(()=>t.map(e=>c(e)),[t,n]),y=Object(a.useMemo)(()=>o(8).map(()=>[]),[t,n]),k=Object(a.useMemo)(()=>Object(l.a)(e),[e]),[{currentMatchupNum:N,currentPotNum:T,possiblePairings:P},M]=Object(a.useState)(j),[$]=Object(u.a)(),[A,G]=Object(m.a)(),S=Object(a.useCallback)(e=>{const t=w[T],n=P?P[e]:e,a=t.splice(n,1)[0];y[N].push(a);const r=1===T?Object(i.a)(w,y,k):null;M({currentPotNum:1-T,currentMatchupNum:N-T+1,possiblePairings:r}),G.add(a)},[k,w,y,T,N,P,A]),I=()=>{(1===(null==P?void 0:P.length)||1===T&&1===w[1].length)&&S(0)};Object(a.useEffect)(()=>{setTimeout(I,250)},[T]);const z=Object(a.useMemo)(()=>P&&w[0].filter((e,t)=>P.includes(t)),[P]),R=N>=t[0].length,J=P?P.map(e=>w[0][e]):[];return r.a.createElement(E.a,null,r.a.createElement(f.a,null,r.a.createElement(p.a,{selectedTeams:J,initialPots:t,pots:w,currentPotNum:T}),r.a.createElement(b.a,{matchups:y,airborneTeams:A})),r.a.createElement(g.a,null,!R&&r.a.createElement(x.a,null,"Runners-up"),r.a.createElement(h.a,{forceNoSelect:0===T,display:!R,displayTeams:$,selectedTeam:null,pot:w[1],onPick:S}),!R&&r.a.createElement(x.a,null,"Group Winners"),R&&r.a.createElement(v.a,{long:!1,completed:R,selectedTeam:null,pickedGroup:null,possibleGroups:null,numGroups:0,reset:O}),z&&r.a.createElement(h.a,{forceNoSelect:1===T,display:!R,displayTeams:$,selectedTeam:null,pot:z,onPick:S})),A.map(e=>{const t=y.findIndex(t=>t.includes(e)),n=y[t].indexOf(e);return r.a.createElement(d.a,{key:e.id,from:`[data-cellid='${e.id}']`,to:`[data-cellid='${t}${1===n?"gw":"ru"}']`,duration:350,data:e,onAnimationEnd:G.remove})}))})}}]);