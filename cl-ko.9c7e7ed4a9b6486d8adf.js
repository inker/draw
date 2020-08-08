(window.webpackJsonp=window.webpackJsonp||[]).push([["cl-ko"],{404:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(111),o=n(387),l=n(413),i=n(416),s=n(384),u=n(396),m=n(382),d=n(393),p=n(392),b=n(415),f=n(389),g=n(390),h=n(399),x=n(414),O=n(395),j=n(391);function E(){return{currentMatchupNum:0,currentPotNum:1,possiblePairings:null}}t.default=Object(a.memo)(({season:e,pots:t})=>{const[n,y]=Object(m.a)("draw-"),k=Object(a.useMemo)(()=>t.map(e=>o(e)),[t,n]),v=Object(a.useMemo)(()=>c(8).map(()=>[]),[t,n]),w=Object(a.useMemo)(()=>Object(i.a)(e),[e]),N=Object(a.useMemo)(E,[]),[{currentMatchupNum:P,currentPotNum:T,possiblePairings:M},$]=Object(a.useState)(N),[G]=Object(s.a)(),[I,R]=Object(u.a)(),S=Object(a.useCallback)(e=>{const t=k[T],n=M?M[e]:e,a=t.splice(n,1)[0];v[P].push(a);const r=1===T?Object(l.a)(k,v,w):null;$({currentPotNum:1-T,currentMatchupNum:P-T+1,possiblePairings:r}),R.add(a)},[w,k,v,T,P,M,I]),A=()=>{(1===(null==M?void 0:M.length)||1===T&&1===k[1].length)&&S(0)};Object(a.useEffect)(()=>{setTimeout(A,250)},[T]);const C=Object(a.useCallback)(()=>{y(),$({currentMatchupNum:0,currentPotNum:1,possiblePairings:null})},[t]),J=Object(a.useMemo)(()=>M&&k[0].filter((e,t)=>M.includes(t)),[M]),U=P>=t[0].length,z=M?M.map(e=>k[0][e]):[];return r.a.createElement(j.a,null,r.a.createElement(f.a,null,r.a.createElement(p.a,{selectedTeams:z,initialPots:t,pots:k,currentPotNum:T}),r.a.createElement(b.a,{matchups:v,airborneTeams:I})),r.a.createElement(g.a,null,!U&&r.a.createElement(x.a,null,"Runners-up"),r.a.createElement(h.a,{forceNoSelect:0===T,display:!U,displayTeams:G,selectedTeam:null,pot:k[1],onPick:S}),!U&&r.a.createElement(x.a,null,"Group Winners"),U&&r.a.createElement(O.a,{long:!1,completed:U,selectedTeam:null,pickedGroup:null,possibleGroups:null,numGroups:0,reset:C}),J&&r.a.createElement(h.a,{forceNoSelect:1===T,display:!U,displayTeams:G,selectedTeam:null,pot:J,onPick:S})),I.map(e=>{const t=v.findIndex(t=>t.includes(e)),n=v[t].indexOf(e);return r.a.createElement(d.a,{key:e.id,from:`[data-cellid='${e.id}']`,to:`[data-cellid='${t}${1===n?"gw":"ru"}']`,duration:350,data:e,onAnimationEnd:R.remove})}))})},413:function(e,t,n){"use strict";function a(e,[t,n],r,c){const o=r.findIndex(e=>1===e.length);if(!c(e,r,o))return!1;const l=[...r],i=l[o][0];l[o]=[i,e];return o+1===l.length||function([e,t],n,r){const c=n.findIndex(e=>!e.length),[o,...l]=t,i=[...n];return i[c]=[o],e.some(t=>a(t,[e,l],i,r))}([t.filter(t=>t!==e),n],l,c)}t.a=([e,t],n,r)=>e.map((e,t)=>t).filter(c=>a(e[c],[e,t],n,r))},414:function(e,t,n){"use strict";const a=n(4).b.div`
  margin-top: 10px;
  margin-bottom: 5px;
  user-select: none;
`;t.a=a},415:function(e,t,n){"use strict";var a=n(0),r=n.n(a),c=n(4),o=n(383),l=n(402),i=n(385);const s=c.c`
  from {
    background-color: white;
    box-shadow: 0 0 20px #08f;
  }
  to {}
`,u=c.c`
  from {
    background-color: #ff8;
  }
  to {}
`,m=c.a`
  background-color: rgba(255, 255, 255, 0.9);
  animation: ${s} 1s ease;
  box-shadow: 0 0 5px #6af;
`,d=c.a`
  animation: ${u} 5s normal forwards;
`;var p=Object(c.b)(i.a)`
  width: 150px;
  ${e=>e.possible&&m}
  ${e=>e.picked&&d}
`;const b=Object(c.b)(l.a)`
  display: flex;
`,f=c.b.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
  height: 19px;
  text-align: center;
  font-family: Tahoma, Arial, sans-serif;
  font-size: 12px;
  color: #444;

  &:before {
    content: "v";
  }
`,g=Object(c.b)(p)`
  border-right: 1px solid rgba(0, 0, 0, 0);
`,h=Object(c.b)(p)`
  border-left: 1px solid rgba(0, 0, 0, 0);
`;var x=Object(a.memo)(({index:e,teams:t,airborneTeams:n})=>{var a,c;const[o,l]=null!=t?t:[],i=o&&!n.includes(o),s=l&&!n.includes(l);return r.a.createElement(b,null,r.a.createElement(g,{country:i?o.country:void 0,picked:i,"data-cellid":e+"ru"},i&&(null!==(a=o.shortName)&&void 0!==a?a:o.name)),r.a.createElement(f,null),r.a.createElement(h,{country:s?l.country:void 0,picked:s,"data-cellid":e+"gw"},s&&(null!==(c=l.shortName)&&void 0!==c?c:l.name)))});const O=Object(c.b)(o.a)`
  width: auto;
  align-self: center;
  max-width: initial;
`;t.a=Object(a.memo)(({matchups:e,airborneTeams:t})=>r.a.createElement(O,null,null==e?void 0:e.map((e,n)=>r.a.createElement(x,{index:n,teams:e,airborneTeams:t}))))},416:function(e,t,n){"use strict";var a=n(412);const r=e=>"Ukraine"===e.country,c=e=>"Russia"===e.country,o=()=>a,l=e=>"Russia"===e.country?r:"Ukraine"===e.country?c:a;t.a=e=>{const t=(e=>(e=>e>=2014)(e)?l:o)(e),n=(e,n)=>{return 0===e.length||1===e.length&&(a=n,r=e[0],a.country!==r.country&&a.group!==r.group&&!t(a)(r));var a,r};return(e,t,a)=>n(t[a],e)}}}]);