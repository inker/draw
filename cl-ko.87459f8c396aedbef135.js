(window.webpackJsonp=window.webpackJsonp||[]).push([["cl-ko"],{405:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(111),c=n(388),i=n(414),l=n(416),s=n(383),u=n(385),m=n(397),d=n(394),p=n(393),b=n(417),f=n(390),g=n(391),h=n(400),j=n(415),O=n(395),v=n(392);function x(){return{currentMatchupNum:0,currentPotNum:1,possiblePairings:null}}t.default=Object(a.memo)(({season:e,pots:t})=>{const[n,E]=Object(s.a)(),k=Object(a.useMemo)(()=>t.map(e=>c(e)),[t,n]),w=Object(a.useMemo)(()=>o(8).map(()=>[]),[t,n]),y=Object(a.useMemo)(()=>Object(l.a)(e),[e]),N=Object(a.useMemo)(x,[]),[{currentMatchupNum:T,currentPotNum:P,possiblePairings:M},$]=Object(a.useState)(N);Object(a.useEffect)(()=>{$(N)},[N]);const[A]=Object(u.a)(),[G,S]=Object(m.a)(),I=Object(a.useCallback)(e=>{const t=k[P],n=M?M[e]:e,a=t.splice(n,1)[0];w[T].push(a);const r=1===P?Object(i.a)(k,w,y):null;$({currentPotNum:1-P,currentMatchupNum:T-P+1,possiblePairings:r}),S.add(a)},[y,k,w,P,T,M,G]),z=()=>{(1===(null==M?void 0:M.length)||1===P&&1===k[1].length)&&I(0)};Object(a.useEffect)(()=>{setTimeout(z,250)},[P]);const R=Object(a.useCallback)(()=>{E(),$({currentMatchupNum:0,currentPotNum:1,possiblePairings:null})},[t]),C=Object(a.useMemo)(()=>M&&k[0].filter((e,t)=>M.includes(t)),[M]),J=T>=t[0].length,K=M?M.map(e=>k[0][e]):[];return r.a.createElement(v.a,null,r.a.createElement(f.a,null,r.a.createElement(p.a,{selectedTeams:K,initialPots:t,pots:k,currentPotNum:P}),r.a.createElement(b.a,{matchups:w,airborneTeams:G})),r.a.createElement(g.a,null,!J&&r.a.createElement(j.a,null,"Runners-up"),r.a.createElement(h.a,{forceNoSelect:0===P,display:!J,displayTeams:A,selectedTeam:null,pot:k[1],onPick:I}),!J&&r.a.createElement(j.a,null,"Group Winners"),J&&r.a.createElement(O.a,{long:!1,completed:J,selectedTeam:null,pickedGroup:null,possibleGroups:null,numGroups:0,reset:R}),C&&r.a.createElement(h.a,{forceNoSelect:1===P,display:!J,displayTeams:A,selectedTeam:null,pot:C,onPick:I})),G.map(e=>{const t=w.findIndex(t=>t.includes(e)),n=w[t].indexOf(e);return r.a.createElement(d.a,{key:e.id,from:`[data-cellid='${e.id}']`,to:`[data-cellid='${t}${1===n?"gw":"ru"}']`,duration:350,data:e,onAnimationEnd:S.remove})}))})},414:function(e,t,n){"use strict";function a(e,[t,n],r,o){const c=r.findIndex(e=>1===e.length);if(!o(e,r,c))return!1;const i=[...r],l=i[c][0];i[c]=[l,e];return c+1===i.length||function([e,t],n,r){const o=n.findIndex(e=>!e.length),[c,...i]=t,l=[...n];return l[o]=[c],e.some(t=>a(t,[e,i],l,r))}([t.filter(t=>t!==e),n],i,o)}t.a=([e,t],n,r)=>e.map((e,t)=>t).filter(o=>a(e[o],[e,t],n,r))},415:function(e,t,n){"use strict";const a=n(4).b.div`
  margin-top: 10px;
  margin-bottom: 5px;
  user-select: none;
`;t.a=a},416:function(e,t,n){"use strict";var a=n(413),r=n(118);const o=[{countries:["Russia","Ukraine"],predicate:(c=2014,i=Number.MAX_SAFE_INTEGER,e=>e>=c&&e<=i)},{countries:["Azerbaijan","Armenia"]},{countries:["Serbia","Kosovo"]},{countries:["Bosnia & Herzegovina","Kosovo"]},{countries:["Spain","Gibraltar"]}];var c,i;const l={predicate:r};var s=o.map(e=>({...l,...e})),u=e=>{const t=(e=>{const t=new Map;for(const{countries:n,predicate:a}of s)a(e)&&(t.set(n[0],n[1]),t.set(n[1],n[0]));return t.get.bind(t)})(e);return e=>{const n=t(e.country);return void 0===n?a:e=>e.country===n}};t.a=e=>{const t=u(e),n=(e,n)=>{return 0===e.length||1===e.length&&(a=n,r=e[0],a.country!==r.country&&a.group!==r.group&&!t(a)(r));var a,r};return(e,t,a)=>n(t[a],e)}},417:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(4),c=n(384),i=n(403),l=n(386);const s=o.c`
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
`;var j=Object(a.memo)(({index:e,teams:t,airborneTeams:n})=>{var a,o;const[c,i]=null!=t?t:[],l=c&&!n.includes(c),s=i&&!n.includes(i);return r.a.createElement(b,null,r.a.createElement(g,{country:l?c.country:void 0,picked:l,"data-cellid":e+"ru"},l&&(null!==(a=c.shortName)&&void 0!==a?a:c.name)),r.a.createElement(f,null),r.a.createElement(h,{country:s?i.country:void 0,picked:s,"data-cellid":e+"gw"},s&&(null!==(o=i.shortName)&&void 0!==o?o:i.name)))});const O=Object(o.b)(c.a)`
  width: auto;
  align-self: center;
  max-width: initial;
`;t.a=Object(a.memo)(({matchups:e,airborneTeams:t})=>r.a.createElement(O,null,null==e?void 0:e.map((e,n)=>r.a.createElement(j,{index:n,teams:e,airborneTeams:t}))))}}]);