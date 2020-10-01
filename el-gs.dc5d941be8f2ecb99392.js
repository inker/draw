(window.webpackJsonp=window.webpackJsonp||[]).push([[3,8],{107:function(e,t,a){"use strict";a.r(t);var o=a(0),r=a.n(o),n=a(2),c=a(84),l=a(85),s=a(5),u=a(74),m=a(75),i=a(78),p=a(94),d=a(86),b=a(93),f=a(95),g=a(90),k=a(91),j=a(97),E=a(92),O=a(108);const h=n.d`
  background-color: ${e=>e.theme.isDarkMode?"#933":"#ffc0c0"};
`,w=n.d`
  background-color: ${e=>e.theme.isDarkMode?"#039":"#c0e0ff"};
`;function y(e){const t=e.map((e=>l(e)));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:t[0],pots:t,groups:e[0].map((()=>[]))}}t.default=Object(o.memo)((({season:e,pots:t})=>{const[a,n]=Object(u.a)(),[l,v]=Object(m.a)(),[{currentPotNum:x,selectedTeam:G,pickedGroup:P,hungPot:T,pots:N,groups:S},$]=Object(o.useState)((()=>y(t)));Object(o.useEffect)((()=>{$(y(t))}),[t,a]);const[,C]=Object(s.a)(),[D]=Object(i.a)(),M=Object(p.a)(O.default),R=Object(o.useRef)(null),A=Object(o.useCallback)((e=>{if(G)return;const t=N[x][e];if(!t)return;const a=N.slice();a[x]=a[x].filter(((t,a)=>a!==e)),$({currentPotNum:x,hungPot:T,selectedTeam:t,pickedGroup:null,pots:a,groups:S})}),[N,S,x,T,G]);Object(o.useEffect)((()=>{G&&(async()=>{if(!G)throw new Error("no selected team");let t;try{t=(await M({season:e,pots:N,groups:S,selectedTeam:G})).pickedGroup}catch(e){return console.error(e),void C({error:"Could not determine the group"})}const a=S.slice();a[t]=[...a[t],G];const o=N[x].length>0?x:x+1;$({selectedTeam:null,pickedGroup:t,hungPot:N[o],currentPotNum:o,pots:N,groups:a})})()}),[G]);const H=x>=N.length;Object(o.useEffect)((()=>{const e=null==T?void 0:T.length;if(l&&e){const t=c(e-1);A(t)}}),[l,T]),Object(o.useEffect)((()=>{H&&l&&v(!1)}),[H,l]);const J=S.length,L=Object(o.useCallback)((e=>e<J>>1?h:w),[J]);return r.a.createElement(d.a,null,r.a.createElement(g.a,null,r.a.createElement(b.a,{selectedTeams:G&&[G],initialPots:t,pots:N,currentPotNum:x}),r.a.createElement(f.a,{ref:R,maxTeams:N.length,currentPotNum:x,groups:S,possibleGroups:null,getGroupHeaderStyles:L})),r.a.createElement(k.a,null,!l&&r.a.createElement(j.a,{forceNoSelect:!!G,display:!H,displayTeams:D,selectedTeam:G,pot:T,onPick:A}),r.a.createElement(E.a,{long:!0,completed:H,selectedTeam:G,pickedGroup:P,possibleGroups:null,isDisplayPossibleGroupsText:!!G,numGroups:J,groupsElement:R,reset:n})))}))},108:function(e,t,a){"use strict";a.r(t),t.default=function(){return new Worker(a.p+"worker.7f9cab3e727c06f13cb2.worker.js")}},95:function(e,t,a){"use strict";var o=a(0),r=a.n(o),n=a(2),c=a(80),l=a(73),s=a(79),u=a(102),m=a(76),i=a(72),p=a(87),d=a(88),b=a(81),f=a(77),g=a(89),k=a(96);const j=n.f`
  from {
    box-shadow: 0 0 20px #08f;
  }
  to {}
`,E=n.f`
  from {
    background-color: rgba(255, 255, 255, 0.5);
  }
  to {}
`,O=n.f`
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
  animation: ${e=>e.theme.isDarkMode?E:j} 1s ease;
  ${e=>e.theme.isDarkMode?n.d`
    background-color: rgba(255, 255, 255, 0.3);
  `:n.d`
    box-shadow: 0 0 5px #6af;
  `}
`,y=n.d`
  animation: ${e=>e.theme.isDarkMode?h:O} 3s ease-out normal forwards;
`;var v=Object(n.e)(i.a)`
  ${e=>e.possible&&w}
  ${e=>e.picked&&y}
`;var x=Object(o.memo)((({team:e,possible:t})=>{var a;const c=Object(p.a)(e),[l,s]=Object(o.useState)(e),[u,m]=Object(o.useState)(!1),i=Object(o.useContext)(n.a),j=Object(o.useRef)(null),E=Object(o.useCallback)((()=>m(!1)),[]),O=Object(o.useCallback)((()=>{s(e),m(!0)}),[e]);return Object(d.a)((()=>{E()}),[i]),r.a.createElement(r.a.Fragment,null,r.a.createElement(v,{picked:u&&!!l,possible:t,onAnimationEnd:E},l?r.a.createElement(f.a,{country:Object(b.a)(l)},null!==(a=l.shortName)&&void 0!==a?a:l.name):r.a.createElement(g.a,{ref:j})),e&&e!==c&&r.a.createElement(k.a,{from:`[data-cellid='${e.id}']`,to:j,duration:350,team:e,onAnimationEnd:O}))}));var G=Object(o.memo)((({maxTeams:e,groupLetter:t,teams:a,potNum:o,possible:n,headerStyles:c})=>r.a.createElement(s.a,null,r.a.createElement("thead",null,r.a.createElement(m.a,null,r.a.createElement(i.a,null,r.a.createElement(u.a,{styles:c},"Group"," ",t)))),r.a.createElement("tbody",null,l(e).map((e=>r.a.createElement(m.a,{key:e},r.a.createElement(x,{team:a[e],possible:e===o&&n}))))))));const P=n.e.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,T=Object(o.forwardRef)((({maxTeams:e,currentPotNum:t,groups:a,possibleGroups:o,getGroupHeaderStyles:n},l)=>r.a.createElement(P,{ref:l},null==a?void 0:a.map(((a,l)=>{const s=Object(c.a)(l),u=null==n?void 0:n(l);return r.a.createElement(G,{key:s,maxTeams:e,groupLetter:s,teams:a,potNum:t,possible:!!(null==o?void 0:o.includes(l)),headerStyles:u})})))));t.a=Object(o.memo)(T)}},0,[82]]);