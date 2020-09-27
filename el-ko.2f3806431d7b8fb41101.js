(window.webpackJsonp=window.webpackJsonp||[]).push([[4,9],{109:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),l=a(73),r=a(84),s=a(85),o=a(5),u=a(74),m=a(75),i=a(78),p=a(15),b=a(94),d=a(86),f=a(93),j=a(121),O=a(90),E=a(91),h=a(97),g=a(120),k=a(92),w=a(110);function y(e){return{currentMatchupNum:0,currentPotNum:1,possiblePairings:null,pots:e.map(e=>s(e)),matchups:l(16).map(()=>[])}}t.default=Object(n.memo)(({season:e,pots:t})=>{const[a,l]=Object(u.a)(),[s,v]=Object(m.a)(),[{currentMatchupNum:P,currentPotNum:N,possiblePairings:x,pots:T,matchups:C},M]=Object(n.useState)(()=>y(t));Object(n.useEffect)(()=>{M(y(t))},[t,a]);const S=Object(p.a)("(min-height: 750px)"),[,$]=Object(o.a)(),[G]=Object(i.a)(),R=Object(b.a)(w.default),A=Object(n.useRef)(null),D=Object(n.useCallback)(async(t,a)=>{try{return(await R({season:e,pots:t,matchups:a})).possiblePairings}catch(e){throw $({error:"Could not determine possible pairings"}),e}},[e,R]),F=Object(n.useCallback)(async e=>{const t=T[N],a=x?x[e]:e,n=t[a],c=T.slice();c[N]=c[N].filter((e,t)=>t!==a);const l=C.slice();l[P]=[...l[P],n];const r=1===N?await D(c,l):null;M({currentPotNum:1-N,currentMatchupNum:P-N+1,possiblePairings:r,pots:c,matchups:l})},[T,C,N,P,x]),J=()=>{if(s)return;(1===(null==x?void 0:x.length)||1===N&&1===T[1].length)&&F(0)};Object(n.useEffect)(()=>{setTimeout(J,250)},[N]);const W=Object(n.useMemo)(()=>x&&T[0].filter((e,t)=>x.includes(t)),[x]),q=P>=t[0].length;Object(n.useEffect)(()=>{if(s){const e=(null!=W?W:T[1]).length;if(e>0){const t=r(e-1);F(t)}}},[s,N]),Object(n.useEffect)(()=>{q&&s&&v(!1)},[q,s]);const z=x?x.map(e=>T[0][e]):[];return c.a.createElement(d.a,null,c.a.createElement(O.a,null,c.a.createElement(f.a,{selectedTeams:z,initialPots:t,pots:T,currentPotNum:N,split:!S}),c.a.createElement(j.a,{ref:A,matchups:C})),c.a.createElement(E.a,null,!s&&c.a.createElement(c.a.Fragment,null,!q&&c.a.createElement(g.a,null,"Runners-up"),c.a.createElement(h.a,{forceNoSelect:0===N,display:!q,displayTeams:G,selectedTeam:null,pot:T[1],onPick:F}),!q&&c.a.createElement(g.a,null,"Group Winners"),W&&c.a.createElement(h.a,{forceNoSelect:1===N,display:!q,displayTeams:G,selectedTeam:null,pot:W,onPick:F})),q&&c.a.createElement(k.a,{long:!1,completed:q,selectedTeam:null,pickedGroup:null,possibleGroups:null,numGroups:0,groupsElement:A,reset:l})))})},110:function(e,t,a){"use strict";a.r(t),t.default=function(){return new Worker(a.p+"worker.db5afd8bd0e18a43f7b6.worker.js")}},120:function(e,t,a){"use strict";const n=a(2).e.div`
  margin-top: 10px;
  margin-bottom: 5px;
  user-select: none;
`;t.a=n},121:function(e,t,a){"use strict";var n=a(0),c=a.n(n),l=a(2),r=a(79),s=a(76),o=a(72),u=a(103),m=a(87),i=a(88),p=a(81),b=a(77),d=a(89),f=a(96);const j=l.f`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,O=l.f`
  from {
    background-color: rgba(192, 224, 255, 0.5);
  }
  to {}
`,E=l.d`
  animation: ${e=>e.theme.isDarkMode?O:j} 3s ease-out normal forwards;
`;var h=Object(l.e)(o.a)`
  width: 150px;
  ${e=>e.picked&&E};
  ${e=>e.styles};
`;var g=Object(n.memo)(({team:e})=>{var t;const a=Object(m.a)(e),[r,s]=Object(n.useState)(e),[o,u]=Object(n.useState)(!1),j=Object(n.useContext)(l.a),O=Object(n.useRef)(null),E=Object(n.useCallback)(()=>u(!1),[]),g=Object(n.useCallback)(()=>{s(e),u(!0)},[e]);return Object(i.a)(()=>{E()},[j]),c.a.createElement(c.a.Fragment,null,c.a.createElement(h,{picked:o&&!!r,onAnimationEnd:E},r?c.a.createElement(b.a,{country:Object(p.a)(r)},null!==(t=r.shortName)&&void 0!==t?t:r.name):c.a.createElement(d.a,{ref:O})),e&&e!==a&&c.a.createElement(f.a,{from:`[data-cellid='${e.id}']`,to:O,duration:350,team:e,onAnimationEnd:g}))});const k=Object(l.e)(u.a)`
  justify-content: center;
  width: 23px;
  color: ${e=>e.theme.isDarkMode?"#ccc":"#333"};

  &::before {
    content: 'v';
  }
`;var w=Object(n.memo)(({teams:e})=>{const[t,a]=null!=e?e:[];return c.a.createElement(s.a,null,c.a.createElement(g,{team:t}),c.a.createElement(o.a,null,c.a.createElement(k,null)),c.a.createElement(g,{team:a}))});const y=Object(l.e)(r.a)`
  width: auto;
  align-self: center;
  max-width: initial;
`,v=Object(n.forwardRef)(({matchups:e},t)=>c.a.createElement(y,{ref:t},c.a.createElement("tbody",null,null==e?void 0:e.map((e,t)=>c.a.createElement(w,{key:t,teams:e})))));t.a=Object(n.memo)(v)}},0,[82]]);