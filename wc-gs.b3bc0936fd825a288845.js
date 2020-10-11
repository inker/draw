(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[5527,8654],{56898:(e,t,o)=>{"use strict";o.r(t),o.d(t,{default:()=>P});var r=o(67294),l=o(29163),s=o(75703),n=o(83608),a=o(69983),u=o(47810),c=o(54198),m=o(53998),i=o(31173),p=o(43887),d=o(31080),f=o(1245),g=o(55602),E=o(48415),b=o(92317),k=o(12414),Z=o(45033),h=o(69170);const w=s(l.iv`
  background-color: ${e=>e.theme.isDarkMode?"#363":"#c0e0c0"};
`);function v(e){const t=e.map((e=>a(e)));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:t[0],pots:t,groups:e[0].map((()=>[]))}}const P=(0,r.memo)((({season:e,pots:t})=>{const[o,l]=(0,c.Z)(),[s,a]=(0,m.Z)(),[{currentPotNum:P,selectedTeam:x,pickedGroup:y,hungPot:G,pots:T,groups:N},S]=(0,r.useState)((()=>v(t)));(0,r.useEffect)((()=>{S(v(t))}),[t,o]);const[,C]=(0,u.Z)(),[$]=(0,i.Z)(),D=(0,p.Z)(h.default),F=(0,r.useRef)(null),M=(0,r.useCallback)((e=>{if(x)return;const t=T[P][e];if(!t)return;const o=T.slice();o[P]=o[P].filter(((t,o)=>o!==e)),S({currentPotNum:P,hungPot:G,selectedTeam:t,pickedGroup:null,pots:o,groups:N})}),[T,N,P,G,x]);(0,r.useEffect)((()=>{x&&(async()=>{if(!x)throw new Error("no selected team");let t;try{t=(await D({season:e,pots:T,groups:N,selectedTeam:x})).pickedGroup}catch(e){return console.error(e),void C({error:"Could not determine the group"})}const o=N.slice();o[t]=[...o[t],x];const r=T[P].length>0?P:P+1;S({selectedTeam:null,pickedGroup:t,hungPot:T[r],currentPotNum:r,pots:T,groups:o})})()}),[x]),(0,r.useEffect)((()=>{const e=T[P].findIndex((e=>e.host));M(e)}),[o]);const R=P>=T.length;(0,r.useEffect)((()=>{const e=null==G?void 0:G.length;if(s&&e){const t=n(e-1);M(t)}}),[s,G]),(0,r.useEffect)((()=>{R&&s&&a(!1)}),[R,s]);const A=N.length;return r.createElement(d.Z,null,r.createElement(E.Z,null,r.createElement(f.Z,{selectedTeams:x&&[x],initialPots:t,pots:T,currentPotNum:P}),r.createElement(g.Z,{ref:F,maxTeams:T.length,currentPotNum:P,groups:N,possibleGroups:null,getGroupHeaderStyles:w})),r.createElement(b.Z,null,!s&&r.createElement(k.Z,{forceNoSelect:!!x,display:!R,displayTeams:$,selectedTeam:x,pot:G,onPick:M}),r.createElement(Z.Z,{long:!0,completed:R,selectedTeam:x,pickedGroup:y,possibleGroups:null,isDisplayPossibleGroupsText:!!x,numGroups:A,groupsElement:F,reset:l})))}))},55602:(e,t,o)=>{"use strict";o.d(t,{Z:()=>N});var r=o(67294),l=o(29163),s=o(80737),n=o(96026),a=o(42048),u=o(13963),c=o(68398),m=o(24729),i=o(72935),p=o(86893),d=o(64982),f=o(930),g=o(93749),E=o(19992);const b=l.F4`
  from {
    box-shadow: 0 0 20px #08f;
  }
  to {}
`,k=l.F4`
  from {
    background-color: rgba(255, 255, 255, 0.5);
  }
  to {}
`,Z=l.F4`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,h=l.F4`
  from {
    background-color: rgba(192, 224, 255, 0.5);
  }
  to {}
`,w=l.iv`
  position: relative; /* enables glow */
  animation: ${e=>e.theme.isDarkMode?k:b} 1s ease;
  ${e=>e.theme.isDarkMode?l.iv`
    background-color: rgba(255, 255, 255, 0.3);
  `:l.iv`
    box-shadow: 0 0 5px #6af;
  `}
`,v=l.iv`
  animation: ${e=>e.theme.isDarkMode?h:Z} 3s ease-out normal forwards;
`,P=(0,l.ZP)(m.Z)`
  ${e=>e.possible&&w}
  ${e=>e.picked&&v}
`,x=(0,r.memo)((({team:e,possible:t})=>{var o;const s=(0,i.Z)(e),[n,a]=(0,r.useState)(e),[u,c]=(0,r.useState)(!1),m=(0,r.useContext)(l.Ni),b=(0,r.useRef)(null),k=(0,r.useCallback)((()=>c(!1)),[]),Z=(0,r.useCallback)((()=>{a(e),c(!0)}),[e]);return(0,p.Z)((()=>{k()}),[m]),r.createElement(r.Fragment,null,r.createElement(P,{picked:u&&!!n,possible:t,onAnimationEnd:k},n?r.createElement(f.Z,{country:(0,d.Z)(n)},null!==(o=n.shortName)&&void 0!==o?o:n.name):r.createElement(g.Z,{ref:b})),e&&e!==s&&r.createElement(E.Z,{from:`[data-cellid='${e.id}']`,to:b,duration:350,team:e,onAnimationEnd:Z}))})),y=(0,r.memo)((({maxTeams:e,groupLetter:t,teams:o,potNum:l,possible:s,headerStyles:i})=>r.createElement(a.Z,null,r.createElement("thead",null,r.createElement(c.Z,null,r.createElement(m.Z,null,r.createElement(u.Z,{styles:i},"Group"," ",t)))),r.createElement("tbody",null,n(e).map((e=>r.createElement(c.Z,{key:e},r.createElement(x,{team:o[e],possible:e===l&&s})))))))),G=l.ZP.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,T=(0,r.forwardRef)((({maxTeams:e,currentPotNum:t,groups:o,possibleGroups:l,getGroupHeaderStyles:n},a)=>r.createElement(G,{ref:a},null==o?void 0:o.map(((o,a)=>{const u=(0,s.Z)(a),c=null==n?void 0:n(a);return r.createElement(y,{key:u,maxTeams:e,groupLetter:u,teams:o,potNum:t,possible:!!(null==l?void 0:l.includes(a)),headerStyles:c})}))))),N=(0,r.memo)(T)},69170:(e,t,o)=>{"use strict";function r(){return new Worker(o.p+"worker.c81323b4dcd6e44f51f4.worker.js")}o.r(t),o.d(t,{default:()=>r})}}]);