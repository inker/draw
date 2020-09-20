(window.webpackJsonp=window.webpackJsonp||[]).push([[2,7],{113:function(e,t,a){"use strict";const n=a(2).d.div`
  margin-top: 10px;
  margin-bottom: 5px;
  user-select: none;
`;t.a=n},114:function(e,t,a){"use strict";var n=a(0),c=a.n(n),l=a(2),r=a(72),s=a(70),o=a(66),u=a(96),m=a(81),i=a(74),p=a(71),b=a(82),d=a(89);const f=l.e`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,E=l.c`
  animation: ${f} 3s ease-out normal forwards;
`;var j=Object(l.d)(o.a)`
  width: 150px;
  ${e=>e.picked&&E};
  ${e=>e.styles};
`;var O=Object(n.memo)(({team:e})=>{var t;const a=Object(m.a)(e),[l,r]=Object(n.useState)(e),s=Object(n.useRef)(null),o=Object(n.useCallback)(()=>{r(e)},[e]);return c.a.createElement(c.a.Fragment,null,c.a.createElement(j,{picked:!!l},l?c.a.createElement(p.a,{country:Object(i.a)(l)},null!==(t=l.shortName)&&void 0!==t?t:l.name):c.a.createElement(b.a,{ref:s})),e&&e!==a&&c.a.createElement(d.a,{from:`[data-cellid='${e.id}']`,to:s,duration:350,team:e,onAnimationEnd:o}))});const h=Object(l.d)(u.a)`
  justify-content: center;
  width: 23px;
  color: #444;

  &::before {
    content: 'v';
  }
`;var g=Object(n.memo)(({teams:e})=>{const[t,a]=null!=e?e:[];return c.a.createElement(s.a,null,c.a.createElement(O,{team:t}),c.a.createElement(o.a,null,c.a.createElement(h,null)),c.a.createElement(O,{team:a}))});const w=Object(l.d)(r.a)`
  width: auto;
  align-self: center;
  max-width: initial;
`,k=Object(n.forwardRef)(({matchups:e},t)=>c.a.createElement(w,{ref:t},c.a.createElement("tbody",null,null==e?void 0:e.map((e,t)=>c.a.createElement(g,{key:t,teams:e})))));t.a=Object(n.memo)(k)},98:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),l=a(67),r=a(78),s=a(79),o=a(4),u=a(68),m=a(69),i=a(75),p=a(87),b=a(80),d=a(86),f=a(114),E=a(83),j=a(84),O=a(90),h=a(113),g=a(85),w=a(99);function k(e){return{currentMatchupNum:0,currentPotNum:1,possiblePairings:null,pots:e.map(e=>s(e)),matchups:l(8).map(()=>[])}}t.default=Object(n.memo)(({season:e,pots:t})=>{const[a,l]=Object(u.a)(),[s,y]=Object(m.a)(),[{currentMatchupNum:v,currentPotNum:P,possiblePairings:N,pots:T,matchups:x},C]=Object(n.useState)(()=>k(t));Object(n.useEffect)(()=>{C(k(t))},[t,a]);const[,G]=Object(o.a)(),[M]=Object(i.a)(),R=Object(p.a)(w.default,12e4),S=Object(n.useRef)(null),$=Object(n.useCallback)(async(t,a)=>{try{return(await R({season:e,pots:t,matchups:a})).possiblePairings}catch(e){throw G({error:"Could not determine possible pairings"}),e}},[e,R]),F=Object(n.useCallback)(async e=>{const t=T[P],a=N?N[e]:e,n=t[a],c=T.slice();c[P]=c[P].filter((e,t)=>t!==a);const l=x.slice();l[v]=[...l[v],n];const r=1===P?await $(c,l):null;C({currentPotNum:1-P,currentMatchupNum:v-P+1,possiblePairings:r,pots:c,matchups:l})},[T,x,P,v,N]),J=()=>{if(s)return;(1===(null==N?void 0:N.length)||1===P&&1===T[1].length)&&F(0)};Object(n.useEffect)(()=>{setTimeout(J,250)},[P]);const W=Object(n.useMemo)(()=>N&&T[0].filter((e,t)=>N.includes(t)),[N]),A=v>=t[0].length;Object(n.useEffect)(()=>{if(s){const e=(null!=W?W:T[1]).length;if(e>0){const t=r(e-1);F(t)}}},[s,P]),Object(n.useEffect)(()=>{A&&s&&y(!1)},[A,s]);const q=N?N.map(e=>T[0][e]):[];return c.a.createElement(b.a,null,c.a.createElement(E.a,null,c.a.createElement(d.a,{selectedTeams:q,initialPots:t,pots:T,currentPotNum:P}),c.a.createElement(f.a,{ref:S,matchups:x})),c.a.createElement(j.a,null,!s&&c.a.createElement(c.a.Fragment,null,!A&&c.a.createElement(h.a,null,"Runners-up"),c.a.createElement(O.a,{forceNoSelect:0===P,display:!A,displayTeams:M,selectedTeam:null,pot:T[1],onPick:F}),!A&&c.a.createElement(h.a,null,"Group Winners"),W&&c.a.createElement(O.a,{forceNoSelect:1===P,display:!A,displayTeams:M,selectedTeam:null,pot:W,onPick:F})),A&&c.a.createElement(g.a,{long:!1,completed:A,selectedTeam:null,pickedGroup:null,possibleGroups:null,numGroups:0,groupsElement:S,reset:l})))})},99:function(e,t,a){"use strict";a.r(t),t.default=function(){return new Worker(a.p+"worker.2deeef2f5531bbc61909.worker.js")}}},0,[82]]);