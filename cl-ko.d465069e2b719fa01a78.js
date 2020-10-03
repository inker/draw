(window.webpackJsonp=window.webpackJsonp||[]).push([[2,7],{105:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),l=a(73),r=a(84),o=a(85),s=a(5),u=a(74),m=a(75),i=a(78),p=a(94),b=a(86),d=a(93),f=a(121),j=a(90),E=a(91),O=a(97),h=a(120),g=a(92),k=a(106);function w(e){return{currentMatchupNum:0,currentPotNum:1,possiblePairings:null,pots:e.map((e=>o(e))),matchups:l(8).map((()=>[]))}}t.default=Object(n.memo)((({season:e,pots:t})=>{const[a,l]=Object(u.a)(),[o,y]=Object(m.a)(),[{currentMatchupNum:v,currentPotNum:P,possiblePairings:N,pots:T,matchups:x},C]=Object(n.useState)((()=>w(t)));Object(n.useEffect)((()=>{C(w(t))}),[t,a]);const[,M]=Object(s.a)(),[S]=Object(i.a)(),$=Object(p.a)(k.default),G=Object(n.useRef)(null),R=Object(n.useCallback)((async(t,a)=>{try{return(await $({season:e,pots:t,matchups:a})).possiblePairings}catch(e){throw M({error:"Could not determine possible pairings"}),e}}),[e,$]),A=Object(n.useCallback)((async e=>{const t=T[P],a=N?N[e]:e,n=t[a],c=T.slice();c[P]=c[P].filter(((e,t)=>t!==a));const l=x.slice();l[v]=[...l[v],n];const r=1===P?await R(c,l):null;C({currentPotNum:1-P,currentMatchupNum:v-P+1,possiblePairings:r,pots:c,matchups:l})}),[T,x,P,v,N]),D=()=>{if(o)return;(1===(null==N?void 0:N.length)||1===P&&1===T[1].length)&&A(0)};Object(n.useEffect)((()=>{setTimeout(D,250)}),[P]);const F=Object(n.useMemo)((()=>N&&T[0].filter(((e,t)=>N.includes(t)))),[N]),J=v>=t[0].length;Object(n.useEffect)((()=>{if(o){const e=(null!=F?F:T[1]).length;if(e>0){const t=r(e-1);A(t)}}}),[o,P]),Object(n.useEffect)((()=>{J&&o&&y(!1)}),[J,o]);const W=N?N.map((e=>T[0][e])):[];return c.a.createElement(b.a,null,c.a.createElement(j.a,null,c.a.createElement(d.a,{selectedTeams:W,initialPots:t,pots:T,currentPotNum:P}),c.a.createElement(f.a,{ref:G,matchups:x})),c.a.createElement(E.a,null,!o&&c.a.createElement(c.a.Fragment,null,!J&&c.a.createElement(h.a,null,"Runners-up"),c.a.createElement(O.a,{forceNoSelect:0===P,display:!J,displayTeams:S,selectedTeam:null,pot:T[1],onPick:A}),!J&&c.a.createElement(h.a,null,"Group Winners"),F&&c.a.createElement(O.a,{forceNoSelect:1===P,display:!J,displayTeams:S,selectedTeam:null,pot:F,onPick:A})),J&&c.a.createElement(g.a,{long:!1,completed:J,selectedTeam:null,pickedGroup:null,possibleGroups:null,numGroups:0,groupsElement:G,reset:l})))}))},106:function(e,t,a){"use strict";a.r(t),t.default=function(){return new Worker(a.p+"worker.a3eb7f16c77cdf8293f0.worker.js")}},120:function(e,t,a){"use strict";const n=a(2).e.div`
  margin-top: 10px;
  margin-bottom: 5px;
  user-select: none;
`;t.a=n},121:function(e,t,a){"use strict";var n=a(0),c=a.n(n),l=a(2),r=a(79),o=a(76),s=a(72),u=a(103),m=a(87),i=a(88),p=a(81),b=a(77),d=a(89),f=a(96);const j=l.f`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,E=l.f`
  from {
    background-color: rgba(192, 224, 255, 0.5);
  }
  to {}
`,O=l.d`
  animation: ${e=>e.theme.isDarkMode?E:j} 3s ease-out normal forwards;
`;var h=Object(l.e)(s.a)`
  width: 150px;
  ${e=>e.picked&&O};
  ${e=>e.styles};
`;var g=Object(n.memo)((({team:e})=>{var t;const a=Object(m.a)(e),[r,o]=Object(n.useState)(e),[s,u]=Object(n.useState)(!1),j=Object(n.useContext)(l.a),E=Object(n.useRef)(null),O=Object(n.useCallback)((()=>u(!1)),[]),g=Object(n.useCallback)((()=>{o(e),u(!0)}),[e]);return Object(i.a)((()=>{O()}),[j]),c.a.createElement(c.a.Fragment,null,c.a.createElement(h,{picked:s&&!!r,onAnimationEnd:O},r?c.a.createElement(b.a,{country:Object(p.a)(r)},null!==(t=r.shortName)&&void 0!==t?t:r.name):c.a.createElement(d.a,{ref:E})),e&&e!==a&&c.a.createElement(f.a,{from:`[data-cellid='${e.id}']`,to:E,duration:350,team:e,onAnimationEnd:g}))}));const k=Object(l.e)(u.a)`
  justify-content: center;
  width: 23px;
  color: ${e=>e.theme.isDarkMode?"#ccc":"#333"};

  &::before {
    content: 'v';
  }
`;var w=Object(n.memo)((({teams:e})=>{const[t,a]=null!=e?e:[];return c.a.createElement(o.a,null,c.a.createElement(g,{team:t}),c.a.createElement(s.a,null,c.a.createElement(k,null)),c.a.createElement(g,{team:a}))}));const y=Object(l.e)(r.a)`
  width: auto;
  align-self: center;
  max-width: initial;
`,v=Object(n.forwardRef)((({matchups:e},t)=>c.a.createElement(y,{ref:t},c.a.createElement("tbody",null,null==e?void 0:e.map(((e,t)=>c.a.createElement(w,{key:t,teams:e})))))));t.a=Object(n.memo)(v)}},0,[83]]);