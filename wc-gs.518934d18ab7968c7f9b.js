(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[5527,8654],{56898:(e,o,s)=>{"use strict";s.r(o),s.d(o,{default:()=>P});var t=s(85893),r=s(67294),n=s(29163),i=s(75703),l=s(83608),a=s(69983),d=s(47810),u=s(54198),c=s(53998),p=s(31173),m=s(43887),f=s(31080),h=s(1245),g=s(55602),x=s(48415),v=s(92317),b=s(12414),k=s(45033),Z=s(69170);const j=i(n.iv`
  background-color: ${e=>e.theme.isDarkMode?"#363":"#c0e0c0"};
`);function w(e){const o=e.map((e=>a(e)));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:o[0],pots:o,groups:e[0].map((()=>[]))}}const P=(0,r.memo)((({season:e,pots:o})=>{const[s,n]=(0,u.Z)(),[i,a]=(0,c.Z)(),[{currentPotNum:P,selectedTeam:G,pickedGroup:T,hungPot:y,pots:N,groups:E},S]=(0,r.useState)((()=>w(o)));(0,r.useEffect)((()=>{S(w(o))}),[o,s]);const[,C]=(0,d.Z)(),[$]=(0,p.Z)(),D=(0,m.Z)(Z.default),F=(0,r.useRef)(null),M=(0,r.useCallback)((e=>{if(G)return;const o=N[P][e];if(!o)return;const s=N.slice();s[P]=s[P].filter(((o,s)=>s!==e)),S({currentPotNum:P,hungPot:y,selectedTeam:o,pickedGroup:null,pots:s,groups:E})}),[N,E,P,y,G]);(0,r.useEffect)((()=>{G&&(async()=>{if(!G)throw new Error("no selected team");let o;try{o=(await D({season:e,pots:N,groups:E,selectedTeam:G})).pickedGroup}catch(e){return console.error(e),void C({error:"Could not determine the group"})}const s=E.slice();s[o]=[...s[o],G];const t=N[P].length>0?P:P+1;S({selectedTeam:null,pickedGroup:o,hungPot:N[t],currentPotNum:t,pots:N,groups:s})})()}),[G]),(0,r.useEffect)((()=>{const e=N[P].findIndex((e=>e.host));M(e)}),[s]);const O=P>=N.length;(0,r.useEffect)((()=>{const e=null==y?void 0:y.length;if(i&&e){const o=l(e-1);M(o)}}),[i,y]),(0,r.useEffect)((()=>{O&&i&&a(!1)}),[O,i]);const R=E.length;return(0,t.jsxs)(f.Z,{children:[(0,t.jsxs)(x.Z,{children:[(0,t.jsx)(h.Z,{selectedTeams:G&&[G],initialPots:o,pots:N,currentPotNum:P},void 0),(0,t.jsx)(g.Z,{ref:F,maxTeams:N.length,currentPotNum:P,groups:E,possibleGroups:null,getGroupHeaderStyles:j},void 0)]},void 0),(0,t.jsxs)(v.Z,{children:[!i&&(0,t.jsx)(b.Z,{forceNoSelect:!!G,display:!O,displayTeams:$,selectedTeam:G,pot:y,onPick:M},void 0),(0,t.jsx)(k.Z,{long:!0,completed:O,selectedTeam:G,pickedGroup:T,possibleGroups:null,isDisplayPossibleGroupsText:!!G,numGroups:R,groupsElement:F,reset:n},void 0)]},void 0)]},void 0)}))},55602:(e,o,s)=>{"use strict";s.d(o,{Z:()=>E});var t=s(85893),r=s(67294),n=s(29163),i=s(80737),l=s(96026),a=s(42048),d=s(13963),u=s(68398),c=s(24729),p=s(72935),m=s(86893),f=s(64982),h=s(930),g=s(93749),x=s(19992);const v=n.F4`
  from {
    box-shadow: 0 0 20px #08f;
  }
  to {}
`,b=n.F4`
  from {
    background-color: rgba(255, 255, 255, 0.5);
  }
  to {}
`,k=n.F4`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,Z=n.F4`
  from {
    background-color: rgba(192, 224, 255, 0.5);
  }
  to {}
`,j=n.iv`
  position: relative; /* enables glow */
  animation: ${e=>e.theme.isDarkMode?b:v} 1s ease;
  ${e=>e.theme.isDarkMode?n.iv`
    background-color: rgba(255, 255, 255, 0.3);
  `:n.iv`
    box-shadow: 0 0 5px #6af;
  `}
`,w=n.iv`
  animation: ${e=>e.theme.isDarkMode?Z:k} 3s ease-out normal forwards;
`,P=(0,n.ZP)(c.Z)`
  ${e=>e.possible&&j}
  ${e=>e.picked&&w}
`,G=(0,r.memo)((({team:e,possible:o})=>{var s;const i=(0,p.Z)(e),[l,a]=(0,r.useState)(e),[d,u]=(0,r.useState)(!1),c=(0,r.useContext)(n.Ni),v=(0,r.useRef)(null),b=(0,r.useCallback)((()=>u(!1)),[]),k=(0,r.useCallback)((()=>{a(e),u(!0)}),[e]);return(0,m.Z)((()=>{b()}),[c]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(P,Object.assign({picked:d&&!!l,possible:o,onAnimationEnd:b},{children:l?(0,t.jsx)(h.Z,Object.assign({country:(0,f.Z)(l)},{children:null!==(s=l.shortName)&&void 0!==s?s:l.name}),void 0):(0,t.jsx)(g.Z,{ref:v},void 0)}),void 0),e&&e!==i&&(0,t.jsx)(x.Z,{from:`[data-cellid='${e.id}']`,to:v,duration:350,team:e,onAnimationEnd:k},void 0)]},void 0)})),T=(0,r.memo)((({maxTeams:e,groupLetter:o,teams:s,potNum:r,possible:n,headerStyles:i})=>(0,t.jsxs)(a.Z,{children:[(0,t.jsx)("thead",{children:(0,t.jsx)(u.Z,{children:(0,t.jsx)(c.Z,{children:(0,t.jsxs)(d.Z,Object.assign({styles:i},{children:["Group"," ",o]}),void 0)},void 0)},void 0)},void 0),(0,t.jsx)("tbody",{children:l(e).map((e=>(0,t.jsx)(u.Z,{children:(0,t.jsx)(G,{team:s[e],possible:e===r&&n},void 0)},e)))},void 0)]},void 0))),y=n.ZP.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,N=(0,r.forwardRef)((({maxTeams:e,currentPotNum:o,groups:s,possibleGroups:r,getGroupHeaderStyles:n},l)=>(0,t.jsx)(y,Object.assign({ref:l},{children:null==s?void 0:s.map(((s,l)=>{const a=(0,i.Z)(l),d=null==n?void 0:n(l);return(0,t.jsx)(T,{maxTeams:e,groupLetter:a,teams:s,potNum:o,possible:!!(null==r?void 0:r.includes(l)),headerStyles:d},a)}))}),void 0))),E=(0,r.memo)(N)},69170:(e,o,s)=>{"use strict";function t(){return new Worker(s.p+"workers/worker.546494df87a002d77925.js")}s.r(o),s.d(o,{default:()=>t})}}]);