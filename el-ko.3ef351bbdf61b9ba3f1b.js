(window.webpackJsonp=window.webpackJsonp||[]).push([["el-ko"],{407:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(111),c=n(387),l=n(413),i=n(416),s=n(382),u=n(384),m=n(396),d=n(393),b=n(392),p=n(415),f=n(389),g=n(390),E=n(399),h=n(414),v=n(394),j=n(391);function O(){return{currentMatchupNum:0,currentPotNum:1,possiblePairings:null}}t.default=Object(a.memo)(({season:e,pots:t})=>{const[n,x]=Object(s.a)(),N=Object(a.useMemo)(()=>t.map(e=>c(e)),[t,n]),T=Object(a.useMemo)(()=>o(16).map(()=>[]),[t,n]),k=Object(a.useMemo)(()=>Object(i.a)(e),[e]),w=Object(a.useMemo)(O,[]),[{currentMatchupNum:y,currentPotNum:M,possiblePairings:A},P]=Object(a.useState)(w);Object(a.useEffect)(()=>{P(w)},[N,n]);const[G]=Object(u.a)(),[S,_]=Object(m.a)(),I=Object(a.useCallback)(e=>{const t=N[M],n=A?A[e]:e,a=t.splice(n,1)[0];T[y].push(a);const r=1===M?Object(l.a)(N,T,k):null;P({currentPotNum:1-M,currentMatchupNum:y-M+1,possiblePairings:r}),_.add(a)},[k,N,T,M,y,A,S]),R=()=>{(1===(null==A?void 0:A.length)||1===M&&1===N[1].length)&&I(0)};Object(a.useEffect)(()=>{setTimeout(R,250)},[M]);const $=Object(a.useCallback)(()=>{x(),P({currentMatchupNum:0,currentPotNum:1,possiblePairings:null})},[t]),F=Object(a.useMemo)(()=>A&&N[0].filter((e,t)=>A.includes(t)),[A]),X=y>=t[0].length,z=A?A.map(e=>N[0][e]):[];return r.a.createElement(j.a,null,r.a.createElement(f.a,null,r.a.createElement(b.a,{selectedTeams:z,initialPots:t,pots:N,currentPotNum:M,split:!0}),r.a.createElement(p.a,{matchups:T,airborneTeams:S})),r.a.createElement(g.a,null,!X&&r.a.createElement(h.a,null,"Runners-up"),r.a.createElement(E.a,{forceNoSelect:0===M,display:!X,displayTeams:G,selectedTeam:null,pot:N[1],onPick:I}),!X&&r.a.createElement(h.a,null,"Group Winners"),X&&r.a.createElement(v.a,{long:!1,completed:X,selectedTeam:null,pickedGroup:null,possibleGroups:null,numGroups:0,reset:$}),F&&r.a.createElement(E.a,{forceNoSelect:1===M,display:!X,displayTeams:G,selectedTeam:null,pot:F,onPick:I})),S.map(e=>{const t=T.findIndex(t=>t.includes(e)),n=T[t].indexOf(e);return r.a.createElement(d.a,{key:e.id,from:`[data-cellid='${e.id}']`,to:`[data-cellid='${t}${1===n?"gw":"ru"}']`,duration:350,data:e,onAnimationEnd:_.remove})}))})},413:function(e,t,n){"use strict";function a(e,[t,n],r,o){const c=r.findIndex(e=>1===e.length);if(!o(e,r,c))return!1;const l=[...r],i=l[c][0];l[c]=[i,e];return c+1===l.length||function([e,t],n,r){const o=n.findIndex(e=>!e.length),[c,...l]=t,i=[...n];return i[o]=[c],e.some(t=>a(t,[e,l],i,r))}([t.filter(t=>t!==e),n],l,o)}t.a=([e,t],n,r)=>e.map((e,t)=>t).filter(o=>a(e[o],[e,t],n,r))},414:function(e,t,n){"use strict";const a=n(4).b.div`
  margin-top: 10px;
  margin-bottom: 5px;
  user-select: none;
`;t.a=a},415:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(4),c=n(383),l=n(402),i=n(385);const s=o.c`
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
`;var b=Object(o.b)(i.a)`
  width: 150px;
  ${e=>e.possible&&m}
  ${e=>e.picked&&d}
`;const p=Object(o.b)(l.a)`
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
`,g=Object(o.b)(b)`
  border-right: 1px solid rgba(0, 0, 0, 0);
`,E=Object(o.b)(b)`
  border-left: 1px solid rgba(0, 0, 0, 0);
`;var h=Object(a.memo)(({index:e,teams:t,airborneTeams:n})=>{var a,o;const[c,l]=null!=t?t:[],i=c&&!n.includes(c),s=l&&!n.includes(l);return r.a.createElement(p,null,r.a.createElement(g,{country:i?c.country:void 0,picked:i,"data-cellid":e+"ru"},i&&(null!==(a=c.shortName)&&void 0!==a?a:c.name)),r.a.createElement(f,null),r.a.createElement(E,{country:s?l.country:void 0,picked:s,"data-cellid":e+"gw"},s&&(null!==(o=l.shortName)&&void 0!==o?o:l.name)))});const v=Object(o.b)(c.a)`
  width: auto;
  align-self: center;
  max-width: initial;
`;t.a=Object(a.memo)(({matchups:e,airborneTeams:t})=>r.a.createElement(v,null,null==e?void 0:e.map((e,n)=>r.a.createElement(h,{index:n,teams:e,airborneTeams:t}))))},416:function(e,t,n){"use strict";var a=n(412);const r=[{countries:["Russia","Ukraine"],interval:[2014,Number.MAX_SAFE_INTEGER]},{countries:["Azerbaijan","Armenia"],interval:[0,Number.MAX_SAFE_INTEGER]},{countries:["Serbia","Kosovo"],interval:[0,Number.MAX_SAFE_INTEGER]},{countries:["Bosnia & Herzegovina","Kosovo"],interval:[0,Number.MAX_SAFE_INTEGER]},{countries:["Spain","Gibraltar"],interval:[0,Number.MAX_SAFE_INTEGER]}];var o=e=>{const t=function(e){const t=new Map;for(const{countries:n,interval:a}of r)e<a[0]||e>a[1]||(t.set(n[0],n[1]),t.set(n[1],n[0]));return t.get.bind(t)}(e);return e=>{const n=t(e.country);return void 0===n?a:e=>e.country===n}};t.a=e=>{const t=o(e),n=(e,n)=>{return 0===e.length||1===e.length&&(a=n,r=e[0],a.country!==r.country&&a.group!==r.group&&!t(a)(r));var a,r};return(e,t,a)=>n(t[a],e)}}}]);