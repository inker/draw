(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[3602,4194],{40399:(e,o,s)=>{"use strict";s.r(o),s.d(o,{default:()=>P});var t=s(85893),r=s(67294),n=s(29163),l=s(83608),i=s(69983),a=s(47810),u=s(54198),c=s(53998),d=s(31173),p=s(43887),m=s(31080),f=s(1245),h=s(55602),g=s(48415),v=s(92317),x=s(12414),b=s(45033),k=s(23242);const Z=n.iv`
  background-color: ${e=>e.theme.isDarkMode?"#933":"#ffc0c0"};
`,j=n.iv`
  background-color: ${e=>e.theme.isDarkMode?"#039":"#c0e0ff"};
`;function w(e){const o=e.map((e=>i(e)));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:o[0],pots:o,groups:e[0].map((()=>[]))}}const P=(0,r.memo)((({season:e,pots:o})=>{const[s,n]=(0,u.Z)(),[i,P]=(0,c.Z)(),[{currentPotNum:G,selectedTeam:T,pickedGroup:y,hungPot:N,pots:C,groups:E},S]=(0,r.useState)((()=>w(o)));(0,r.useEffect)((()=>{S(w(o))}),[o,s]);const[,$]=(0,a.Z)(),[D]=(0,d.Z)(),F=(0,p.Z)(k.default),M=(0,r.useRef)(null),O=(0,r.useCallback)((e=>{if(T)return;const o=C[G][e];if(!o)return;const s=C.slice();s[G]=s[G].filter(((o,s)=>s!==e)),S({currentPotNum:G,hungPot:N,selectedTeam:o,pickedGroup:null,pots:s,groups:E})}),[C,E,G,N,T]);(0,r.useEffect)((()=>{T&&(async()=>{if(!T)throw new Error("no selected team");let o;try{o=(await F({season:e,pots:C,groups:E,selectedTeam:T})).pickedGroup}catch(e){return console.error(e),void $({error:"Could not determine the group"})}const s=E.slice();s[o]=[...s[o],T];const t=C[G].length>0?G:G+1;S({selectedTeam:null,pickedGroup:o,hungPot:C[t],currentPotNum:t,pots:C,groups:s})})()}),[T]);const R=G>=C.length;(0,r.useEffect)((()=>{const e=null==N?void 0:N.length;if(i&&e){const o=l(e-1);O(o)}}),[i,N]),(0,r.useEffect)((()=>{R&&i&&P(!1)}),[R,i]);const A=E.length,H=(0,r.useCallback)((e=>e<A>>1?Z:j),[A]);return(0,t.jsxs)(m.Z,{children:[(0,t.jsxs)(g.Z,{children:[(0,t.jsx)(f.Z,{selectedTeams:T&&[T],initialPots:o,pots:C,currentPotNum:G},void 0),(0,t.jsx)(h.Z,{ref:M,maxTeams:C.length,currentPotNum:G,groups:E,possibleGroups:null,getGroupHeaderStyles:H},void 0)]},void 0),(0,t.jsxs)(v.Z,{children:[!i&&(0,t.jsx)(x.Z,{forceNoSelect:!!T,display:!R,displayTeams:D,selectedTeam:T,pot:N,onPick:O},void 0),(0,t.jsx)(b.Z,{long:!0,completed:R,selectedTeam:T,pickedGroup:y,possibleGroups:null,isDisplayPossibleGroupsText:!!T,numGroups:A,groupsElement:M,reset:n},void 0)]},void 0)]},void 0)}))},55602:(e,o,s)=>{"use strict";s.d(o,{Z:()=>C});var t=s(85893),r=s(67294),n=s(29163),l=s(80737),i=s(96026),a=s(42048),u=s(13963),c=s(68398),d=s(24729),p=s(72935),m=s(86893),f=s(64982),h=s(930),g=s(93749),v=s(19992);const x=n.F4`
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
  animation: ${e=>e.theme.isDarkMode?b:x} 1s ease;
  ${e=>e.theme.isDarkMode?n.iv`
    background-color: rgba(255, 255, 255, 0.3);
  `:n.iv`
    box-shadow: 0 0 5px #6af;
  `}
`,w=n.iv`
  animation: ${e=>e.theme.isDarkMode?Z:k} 3s ease-out normal forwards;
`,P=(0,n.ZP)(d.Z)`
  ${e=>e.possible&&j}
  ${e=>e.picked&&w}
`,G=(0,r.memo)((({team:e,possible:o})=>{var s;const l=(0,p.Z)(e),[i,a]=(0,r.useState)(e),[u,c]=(0,r.useState)(!1),d=(0,r.useContext)(n.Ni),x=(0,r.useRef)(null),b=(0,r.useCallback)((()=>c(!1)),[]),k=(0,r.useCallback)((()=>{a(e),c(!0)}),[e]);return(0,m.Z)((()=>{b()}),[d]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(P,Object.assign({picked:u&&!!i,possible:o,onAnimationEnd:b},{children:i?(0,t.jsx)(h.Z,Object.assign({country:(0,f.Z)(i)},{children:null!==(s=i.shortName)&&void 0!==s?s:i.name}),void 0):(0,t.jsx)(g.Z,{ref:x},void 0)}),void 0),e&&e!==l&&(0,t.jsx)(v.Z,{from:`[data-cellid='${e.id}']`,to:x,duration:350,team:e,onAnimationEnd:k},void 0)]},void 0)})),T=(0,r.memo)((({maxTeams:e,groupLetter:o,teams:s,potNum:r,possible:n,headerStyles:l})=>(0,t.jsxs)(a.Z,{children:[(0,t.jsx)("thead",{children:(0,t.jsx)(c.Z,{children:(0,t.jsx)(d.Z,{children:(0,t.jsxs)(u.Z,Object.assign({styles:l},{children:["Group"," ",o]}),void 0)},void 0)},void 0)},void 0),(0,t.jsx)("tbody",{children:i(e).map((e=>(0,t.jsx)(c.Z,{children:(0,t.jsx)(G,{team:s[e],possible:e===r&&n},void 0)},e)))},void 0)]},void 0))),y=n.ZP.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,N=(0,r.forwardRef)((({maxTeams:e,currentPotNum:o,groups:s,possibleGroups:r,getGroupHeaderStyles:n},i)=>(0,t.jsx)(y,Object.assign({ref:i},{children:null==s?void 0:s.map(((s,i)=>{const a=(0,l.Z)(i),u=null==n?void 0:n(i);return(0,t.jsx)(T,{maxTeams:e,groupLetter:a,teams:s,potNum:o,possible:!!(null==r?void 0:r.includes(i)),headerStyles:u},a)}))}),void 0))),C=(0,r.memo)(N)},23242:(e,o,s)=>{"use strict";function t(){return new Worker(s.p+"worker.a3ee0dc898f687651166.worker.js")}s.r(o),s.d(o,{default:()=>t})}}]);