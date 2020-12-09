(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[3602,4194],{40399:(e,t,o)=>{"use strict";o.r(t),o.d(t,{default:()=>P});var r=o(67294),l=o(29163),s=o(83608),n=o(69983),a=o(47810),u=o(54198),c=o(53998),m=o(31173),i=o(43887),p=o(31080),d=o(1245),f=o(55602),g=o(48415),k=o(92317),b=o(12414),E=o(45033),Z=o(23242);const h=l.iv`
  background-color: ${e=>e.theme.isDarkMode?"#933":"#ffc0c0"};
`,w=l.iv`
  background-color: ${e=>e.theme.isDarkMode?"#039":"#c0e0ff"};
`;function v(e){const t=e.map((e=>n(e)));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:t[0],pots:t,groups:e[0].map((()=>[]))}}const P=(0,r.memo)((({season:e,pots:t})=>{const[o,l]=(0,u.Z)(),[n,P]=(0,c.Z)(),[{currentPotNum:y,selectedTeam:x,pickedGroup:G,hungPot:T,pots:N,groups:C},S]=(0,r.useState)((()=>v(t)));(0,r.useEffect)((()=>{S(v(t))}),[t,o]);const[,$]=(0,a.Z)(),[D]=(0,m.Z)(),F=(0,i.Z)(Z.default),M=(0,r.useRef)(null),R=(0,r.useCallback)((e=>{if(x)return;const t=N[y][e];if(!t)return;const o=N.slice();o[y]=o[y].filter(((t,o)=>o!==e)),S({currentPotNum:y,hungPot:T,selectedTeam:t,pickedGroup:null,pots:o,groups:C})}),[N,C,y,T,x]);(0,r.useEffect)((()=>{x&&(async()=>{if(!x)throw new Error("no selected team");let t;try{t=(await F({season:e,pots:N,groups:C,selectedTeam:x})).pickedGroup}catch(e){return console.error(e),void $({error:"Could not determine the group"})}const o=C.slice();o[t]=[...o[t],x];const r=N[y].length>0?y:y+1;S({selectedTeam:null,pickedGroup:t,hungPot:N[r],currentPotNum:r,pots:N,groups:o})})()}),[x]);const A=y>=N.length;(0,r.useEffect)((()=>{const e=null==T?void 0:T.length;if(n&&e){const t=s(e-1);R(t)}}),[n,T]),(0,r.useEffect)((()=>{A&&n&&P(!1)}),[A,n]);const H=C.length,L=(0,r.useCallback)((e=>e<H>>1?h:w),[H]);return r.createElement(p.Z,null,r.createElement(g.Z,null,r.createElement(d.Z,{selectedTeams:x&&[x],initialPots:t,pots:N,currentPotNum:y}),r.createElement(f.Z,{ref:M,maxTeams:N.length,currentPotNum:y,groups:C,possibleGroups:null,getGroupHeaderStyles:L})),r.createElement(k.Z,null,!n&&r.createElement(b.Z,{forceNoSelect:!!x,display:!A,displayTeams:D,selectedTeam:x,pot:T,onPick:R}),r.createElement(E.Z,{long:!0,completed:A,selectedTeam:x,pickedGroup:G,possibleGroups:null,isDisplayPossibleGroupsText:!!x,numGroups:H,groupsElement:M,reset:l})))}))},55602:(e,t,o)=>{"use strict";o.d(t,{Z:()=>N});var r=o(67294),l=o(29163),s=o(80737),n=o(96026),a=o(42048),u=o(13963),c=o(68398),m=o(24729),i=o(72935),p=o(86893),d=o(64982),f=o(930),g=o(93749),k=o(19992);const b=l.F4`
  from {
    box-shadow: 0 0 20px #08f;
  }
  to {}
`,E=l.F4`
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
  animation: ${e=>e.theme.isDarkMode?E:b} 1s ease;
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
`,y=(0,r.memo)((({team:e,possible:t})=>{var o;const s=(0,i.Z)(e),[n,a]=(0,r.useState)(e),[u,c]=(0,r.useState)(!1),m=(0,r.useContext)(l.Ni),b=(0,r.useRef)(null),E=(0,r.useCallback)((()=>c(!1)),[]),Z=(0,r.useCallback)((()=>{a(e),c(!0)}),[e]);return(0,p.Z)((()=>{E()}),[m]),r.createElement(r.Fragment,null,r.createElement(P,{picked:u&&!!n,possible:t,onAnimationEnd:E},n?r.createElement(f.Z,{country:(0,d.Z)(n)},null!==(o=n.shortName)&&void 0!==o?o:n.name):r.createElement(g.Z,{ref:b})),e&&e!==s&&r.createElement(k.Z,{from:`[data-cellid='${e.id}']`,to:b,duration:350,team:e,onAnimationEnd:Z}))})),x=(0,r.memo)((({maxTeams:e,groupLetter:t,teams:o,potNum:l,possible:s,headerStyles:i})=>r.createElement(a.Z,null,r.createElement("thead",null,r.createElement(c.Z,null,r.createElement(m.Z,null,r.createElement(u.Z,{styles:i},"Group"," ",t)))),r.createElement("tbody",null,n(e).map((e=>r.createElement(c.Z,{key:e},r.createElement(y,{team:o[e],possible:e===l&&s})))))))),G=l.ZP.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,T=(0,r.forwardRef)((({maxTeams:e,currentPotNum:t,groups:o,possibleGroups:l,getGroupHeaderStyles:n},a)=>r.createElement(G,{ref:a},null==o?void 0:o.map(((o,a)=>{const u=(0,s.Z)(a),c=null==n?void 0:n(a);return r.createElement(x,{key:u,maxTeams:e,groupLetter:u,teams:o,potNum:t,possible:!!(null==l?void 0:l.includes(a)),headerStyles:c})}))))),N=(0,r.memo)(T)},23242:(e,t,o)=>{"use strict";function r(){return new Worker(o.p+"worker.a3ee0dc898f687651166.worker.js")}o.r(t),o.d(t,{default:()=>r})}}]);