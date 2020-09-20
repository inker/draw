(window.webpackJsonp=window.webpackJsonp||[]).push([[4,9],{102:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),l=a(67),r=a(78),s=a(79),o=a(4),u=a(68),m=a(69),i=a(75),p=a(118),b=a(87),d=a(80),f=a(86),j=a(114),E=a(83),O=a(84),h=a(90),g=a(113),w=a(85),k=a(103);function y(e){return{currentMatchupNum:0,currentPotNum:1,possiblePairings:null,pots:e.map(e=>s(e)),matchups:l(16).map(()=>[])}}t.default=Object(n.memo)(({season:e,pots:t})=>{const[a,l]=Object(u.a)(),[s,v]=Object(m.a)(),[{currentMatchupNum:P,currentPotNum:N,possiblePairings:T,pots:x,matchups:C},G]=Object(n.useState)(()=>y(t));Object(n.useEffect)(()=>{G(y(t))},[t,a]);const M=Object(p.a)("(min-height: 750px)"),[,R]=Object(o.a)(),[S]=Object(i.a)(),$=Object(b.a)(k.default,12e4),F=Object(n.useRef)(null),J=Object(n.useCallback)(async(t,a)=>{try{return(await $({season:e,pots:t,matchups:a})).possiblePairings}catch(e){throw R({error:"Could not determine possible pairings"}),e}},[e,$]),W=Object(n.useCallback)(async e=>{const t=x[N],a=T?T[e]:e,n=t[a],c=x.slice();c[N]=c[N].filter((e,t)=>t!==a);const l=C.slice();l[P]=[...l[P],n];const r=1===N?await J(c,l):null;G({currentPotNum:1-N,currentMatchupNum:P-N+1,possiblePairings:r,pots:c,matchups:l})},[x,C,N,P,T]),A=()=>{if(s)return;(1===(null==T?void 0:T.length)||1===N&&1===x[1].length)&&W(0)};Object(n.useEffect)(()=>{setTimeout(A,250)},[N]);const q=Object(n.useMemo)(()=>T&&x[0].filter((e,t)=>T.includes(t)),[T]),z=P>=t[0].length;Object(n.useEffect)(()=>{if(s){const e=(null!=q?q:x[1]).length;if(e>0){const t=r(e-1);W(t)}}},[s,N]),Object(n.useEffect)(()=>{z&&s&&v(!1)},[z,s]);const B=T?T.map(e=>x[0][e]):[];return c.a.createElement(d.a,null,c.a.createElement(E.a,null,c.a.createElement(f.a,{selectedTeams:B,initialPots:t,pots:x,currentPotNum:N,split:!M}),c.a.createElement(j.a,{ref:F,matchups:C})),c.a.createElement(O.a,null,!s&&c.a.createElement(c.a.Fragment,null,!z&&c.a.createElement(g.a,null,"Runners-up"),c.a.createElement(h.a,{forceNoSelect:0===N,display:!z,displayTeams:S,selectedTeam:null,pot:x[1],onPick:W}),!z&&c.a.createElement(g.a,null,"Group Winners"),q&&c.a.createElement(h.a,{forceNoSelect:1===N,display:!z,displayTeams:S,selectedTeam:null,pot:q,onPick:W})),z&&c.a.createElement(w.a,{long:!1,completed:z,selectedTeam:null,pickedGroup:null,possibleGroups:null,numGroups:0,groupsElement:F,reset:l})))})},103:function(e,t,a){"use strict";a.r(t),t.default=function(){return new Worker(a.p+"worker.2deeef2f5531bbc61909.worker.js")}},113:function(e,t,a){"use strict";const n=a(2).d.div`
  margin-top: 10px;
  margin-bottom: 5px;
  user-select: none;
`;t.a=n},114:function(e,t,a){"use strict";var n=a(0),c=a.n(n),l=a(2),r=a(72),s=a(70),o=a(66),u=a(96),m=a(81),i=a(74),p=a(71),b=a(82),d=a(89);const f=l.e`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,j=l.c`
  animation: ${f} 3s ease-out normal forwards;
`;var E=Object(l.d)(o.a)`
  width: 150px;
  ${e=>e.picked&&j};
  ${e=>e.styles};
`;var O=Object(n.memo)(({team:e})=>{var t;const a=Object(m.a)(e),[l,r]=Object(n.useState)(e),s=Object(n.useRef)(null),o=Object(n.useCallback)(()=>{r(e)},[e]);return c.a.createElement(c.a.Fragment,null,c.a.createElement(E,{picked:!!l},l?c.a.createElement(p.a,{country:Object(i.a)(l)},null!==(t=l.shortName)&&void 0!==t?t:l.name):c.a.createElement(b.a,{ref:s})),e&&e!==a&&c.a.createElement(d.a,{from:`[data-cellid='${e.id}']`,to:s,duration:350,team:e,onAnimationEnd:o}))});const h=Object(l.d)(u.a)`
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
`,k=Object(n.forwardRef)(({matchups:e},t)=>c.a.createElement(w,{ref:t},c.a.createElement("tbody",null,null==e?void 0:e.map((e,t)=>c.a.createElement(g,{key:t,teams:e})))));t.a=Object(n.memo)(k)}},0,[82]]);