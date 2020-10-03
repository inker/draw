(window.webpackJsonp=window.webpackJsonp||[]).push([[5,11],{111:function(e,t,a){"use strict";a.r(t);var o=a(0),r=a.n(o),n=a(2),s=a(35),c=a(84),l=a(85),u=a(5),m=a(74),i=a(75),p=a(78),d=a(94),b=a(86),f=a(93),g=a(95),E=a(90),j=a(91),O=a(97),k=a(92),h=a(112);const w=s(n.d`
  background-color: ${e=>e.theme.isDarkMode?"#363":"#c0e0c0"};
`);function x(e){const t=e.map((e=>l(e)));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:t[0],pots:t,groups:e[0].map((()=>[]))}}t.default=Object(o.memo)((({season:e,pots:t})=>{const[a,n]=Object(m.a)(),[s,l]=Object(i.a)(),[{currentPotNum:y,selectedTeam:v,pickedGroup:G,hungPot:P,pots:T,groups:N},S]=Object(o.useState)((()=>x(t)));Object(o.useEffect)((()=>{S(x(t))}),[t,a]);const[,$]=Object(u.a)(),[C]=Object(p.a)(),D=Object(d.a)(h.default),M=Object(o.useRef)(null),R=Object(o.useCallback)((e=>{if(v)return;const t=T[y][e];if(!t)return;const a=T.slice();a[y]=a[y].filter(((t,a)=>a!==e)),S({currentPotNum:y,hungPot:P,selectedTeam:t,pickedGroup:null,pots:a,groups:N})}),[T,N,y,P,v]);Object(o.useEffect)((()=>{v&&(async()=>{if(!v)throw new Error("no selected team");let t;try{t=(await D({season:e,pots:T,groups:N,selectedTeam:v})).pickedGroup}catch(e){return console.error(e),void $({error:"Could not determine the group"})}const a=N.slice();a[t]=[...a[t],v];const o=T[y].length>0?y:y+1;S({selectedTeam:null,pickedGroup:t,hungPot:T[o],currentPotNum:o,pots:T,groups:a})})()}),[v]),Object(o.useEffect)((()=>{const e=T[y].findIndex((e=>e.host));R(e)}),[a]);const A=y>=T.length;Object(o.useEffect)((()=>{const e=null==P?void 0:P.length;if(s&&e){const t=c(e-1);R(t)}}),[s,P]),Object(o.useEffect)((()=>{A&&s&&l(!1)}),[A,s]);const H=N.length;return r.a.createElement(b.a,null,r.a.createElement(E.a,null,r.a.createElement(f.a,{selectedTeams:v&&[v],initialPots:t,pots:T,currentPotNum:y}),r.a.createElement(g.a,{ref:M,maxTeams:T.length,currentPotNum:y,groups:N,possibleGroups:null,getGroupHeaderStyles:w})),r.a.createElement(j.a,null,!s&&r.a.createElement(O.a,{forceNoSelect:!!v,display:!A,displayTeams:C,selectedTeam:v,pot:P,onPick:R}),r.a.createElement(k.a,{long:!0,completed:A,selectedTeam:v,pickedGroup:G,possibleGroups:null,isDisplayPossibleGroupsText:!!v,numGroups:H,groupsElement:M,reset:n})))}))},112:function(e,t,a){"use strict";a.r(t),t.default=function(){return new Worker(a.p+"worker.3a8438b20f575c7301ba.worker.js")}},95:function(e,t,a){"use strict";var o=a(0),r=a.n(o),n=a(2),s=a(80),c=a(73),l=a(79),u=a(102),m=a(76),i=a(72),p=a(87),d=a(88),b=a(81),f=a(77),g=a(89),E=a(96);const j=n.f`
  from {
    box-shadow: 0 0 20px #08f;
  }
  to {}
`,O=n.f`
  from {
    background-color: rgba(255, 255, 255, 0.5);
  }
  to {}
`,k=n.f`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,h=n.f`
  from {
    background-color: rgba(192, 224, 255, 0.5);
  }
  to {}
`,w=n.d`
  position: relative; /* enables glow */
  animation: ${e=>e.theme.isDarkMode?O:j} 1s ease;
  ${e=>e.theme.isDarkMode?n.d`
    background-color: rgba(255, 255, 255, 0.3);
  `:n.d`
    box-shadow: 0 0 5px #6af;
  `}
`,x=n.d`
  animation: ${e=>e.theme.isDarkMode?h:k} 3s ease-out normal forwards;
`;var y=Object(n.e)(i.a)`
  ${e=>e.possible&&w}
  ${e=>e.picked&&x}
`;var v=Object(o.memo)((({team:e,possible:t})=>{var a;const s=Object(p.a)(e),[c,l]=Object(o.useState)(e),[u,m]=Object(o.useState)(!1),i=Object(o.useContext)(n.a),j=Object(o.useRef)(null),O=Object(o.useCallback)((()=>m(!1)),[]),k=Object(o.useCallback)((()=>{l(e),m(!0)}),[e]);return Object(d.a)((()=>{O()}),[i]),r.a.createElement(r.a.Fragment,null,r.a.createElement(y,{picked:u&&!!c,possible:t,onAnimationEnd:O},c?r.a.createElement(f.a,{country:Object(b.a)(c)},null!==(a=c.shortName)&&void 0!==a?a:c.name):r.a.createElement(g.a,{ref:j})),e&&e!==s&&r.a.createElement(E.a,{from:`[data-cellid='${e.id}']`,to:j,duration:350,team:e,onAnimationEnd:k}))}));var G=Object(o.memo)((({maxTeams:e,groupLetter:t,teams:a,potNum:o,possible:n,headerStyles:s})=>r.a.createElement(l.a,null,r.a.createElement("thead",null,r.a.createElement(m.a,null,r.a.createElement(i.a,null,r.a.createElement(u.a,{styles:s},"Group"," ",t)))),r.a.createElement("tbody",null,c(e).map((e=>r.a.createElement(m.a,{key:e},r.a.createElement(v,{team:a[e],possible:e===o&&n}))))))));const P=n.e.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,T=Object(o.forwardRef)((({maxTeams:e,currentPotNum:t,groups:a,possibleGroups:o,getGroupHeaderStyles:n},c)=>r.a.createElement(P,{ref:c},null==a?void 0:a.map(((a,c)=>{const l=Object(s.a)(c),u=null==n?void 0:n(c);return r.a.createElement(G,{key:l,maxTeams:e,groupLetter:l,teams:a,potNum:t,possible:!!(null==o?void 0:o.includes(c)),headerStyles:u})})))));t.a=Object(o.memo)(T)}},0,[83]]);