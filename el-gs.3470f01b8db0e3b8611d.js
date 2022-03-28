"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[3602],{47710:(e,o,s)=>{s.r(o),s.d(o,{default:()=>P});var t=s(85893),r=s(67294),n=s(58804),i=s(83608),l=s(69983),a=s(61790),c=s(57111),d=s(43432),u=s(58231),p=s(83266),m=s(85973),h=s(62367),f=s(3962),g=s(36756),b=s(90604),v=s(55020),x=s(3447);const k=()=>new Worker(new URL(s.p+s.u(9084),s.b)),Z=n.iv`
  background-color: ${e=>e.theme.isDarkMode?"#933":"#ffc0c0"};
`,j=n.iv`
  background-color: ${e=>e.theme.isDarkMode?"#039":"#c0e0ff"};
`;function w(e){const o=e.map((e=>l(e)));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:o[0],pots:o,groups:e[0].map((()=>[]))}}const P=(0,r.memo)((({season:e,pots:o})=>{const[s,n]=(0,c.Z)(),[l,P]=(0,d.Z)(),[{currentPotNum:G,selectedTeam:T,pickedGroup:y,hungPot:N,pots:$,groups:C},E]=(0,r.useState)((()=>w(o)));(0,r.useEffect)((()=>{E(w(o))}),[o,s]);const[,S]=(0,a.Z)(),[D]=(0,u.Z)(),M=(0,p.Z)(k),F=(0,r.useRef)(null),O=(0,r.useCallback)((e=>{if(T)return;const o=$[G][e];if(!o)return;const s=$.slice();s[G]=s[G].filter(((o,s)=>s!==e)),E({currentPotNum:G,hungPot:N,selectedTeam:o,pickedGroup:null,pots:s,groups:C})}),[$,C,G,N,T]);(0,r.useEffect)((()=>{T&&(async()=>{if(!T)throw new Error("no selected team");let o;try{o=(await M({season:e,pots:$,groups:C,selectedTeam:T})).pickedGroup}catch(e){return console.error(e),void S({error:"Could not determine the group"})}const s=C.slice();s[o]=[...s[o],T];const t=$[G].length>0?G:G+1;E({selectedTeam:null,pickedGroup:o,hungPot:$[t],currentPotNum:t,pots:$,groups:s})})()}),[T]);const R=G>=$.length;(0,r.useEffect)((()=>{const e=null==N?void 0:N.length;if(l&&e){const o=i(e-1);O(o)}}),[l,N]),(0,r.useEffect)((()=>{R&&l&&P(!1)}),[R,l]);const L=C.length,A=(0,r.useCallback)((e=>e<L>>1?Z:j),[L]);return(0,t.jsxs)(m.Z,{children:[(0,t.jsxs)(g.Z,{children:[(0,t.jsx)(h.Z,{selectedTeams:T&&[T],initialPots:o,pots:$,currentPotNum:G},void 0),(0,t.jsx)(f.Z,{ref:F,maxTeams:$.length,currentPotNum:G,groups:C,possibleGroups:null,getGroupHeaderStyles:A},void 0)]},void 0),(0,t.jsxs)(b.Z,{children:[!l&&(0,t.jsx)(v.Z,{forceNoSelect:!!T,display:!R,displayTeams:D,selectedTeam:T,pot:N,onPick:O},void 0),(0,t.jsx)(x.Z,{long:!0,completed:R,selectedTeam:T,pickedGroup:y,possibleGroups:null,isDisplayPossibleGroupsText:!!T,numGroups:L,groupsElement:F,reset:n},void 0)]},void 0)]},void 0)}))},3962:(e,o,s)=>{s.d(o,{Z:()=>$});var t=s(85893),r=s(67294),n=s(58804),i=s(788),l=s(96026),a=s(42486),c=s(32415),d=s(23132),u=s(69585),p=s(84048),m=s(41771),h=s(58020),f=s(39548),g=s(10606),b=s(10694);const v=n.F4`
  from {
    box-shadow: 0 0 20px #08f;
  }
  to {}
`,x=n.F4`
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
  ${e=>e.theme.isDarkMode?n.iv`
    background-color: rgba(255, 255, 255, 0.3);
  `:n.iv`
    box-shadow: 0 0 5px #6af;
  `}

  &::before {
    content: '';
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    animation: ${e=>e.theme.isDarkMode?x:v} 1s ease;
    ${e=>e.theme.isDarkMode?n.iv`
      background-color: rgba(255, 255, 255, 0.3);
    `:n.iv`
      box-shadow: 0 0 5px #6af;
    `}
  }
`,w=n.iv`
  animation: ${e=>e.theme.isDarkMode?Z:k} 3s ease-out normal forwards;
`,P=(0,n.ZP)(u.Z)`
  ${e=>e.possible&&j}
  ${e=>e.picked&&w}
`,G=(0,r.memo)((({team:e,possible:o})=>{var s;const i=(0,p.Z)(e),[l,a]=(0,r.useState)(e),[c,d]=(0,r.useState)(!1),u=(0,r.useContext)(n.Ni),v=(0,r.useRef)(null),x=(0,r.useCallback)((()=>d(!1)),[]),k=(0,r.useCallback)((()=>{a(e),d(!0)}),[e]);return(0,m.Z)((()=>{x()}),[u]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(P,Object.assign({picked:c&&!!l,possible:o,onAnimationEnd:x},{children:l?(0,t.jsx)(f.Z,Object.assign({country:(0,h.Z)(l)},{children:null!==(s=l.shortName)&&void 0!==s?s:l.name}),void 0):(0,t.jsx)(g.Z,{ref:v},void 0)}),void 0),e&&e!==i&&(0,t.jsx)(b.Z,{from:`[data-cellid='${e.id}']`,to:v,duration:350,team:e,onAnimationEnd:k},void 0)]},void 0)})),T=(0,r.memo)((({maxTeams:e,groupLetter:o,teams:s,potNum:r,possible:n,headerStyles:i})=>(0,t.jsxs)(a.Z,{children:[(0,t.jsx)("thead",{children:(0,t.jsx)(d.Z,{children:(0,t.jsx)(u.Z,{children:(0,t.jsxs)(c.Z,Object.assign({styles:i},{children:["Group"," ",o]}),void 0)},void 0)},void 0)},void 0),(0,t.jsx)("tbody",{children:l(e).map((e=>(0,t.jsx)(d.Z,{children:(0,t.jsx)(G,{team:s[e],possible:e===r&&n},void 0)},e)))},void 0)]},void 0))),y=n.ZP.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,N=(0,r.forwardRef)((({maxTeams:e,currentPotNum:o,groups:s,possibleGroups:r,getGroupHeaderStyles:n},l)=>(0,t.jsx)(y,Object.assign({ref:l},{children:null==s?void 0:s.map(((s,l)=>{const a=(0,i.Z)(l),c=null==n?void 0:n(l);return(0,t.jsx)(T,{maxTeams:e,groupLetter:a,teams:s,potNum:o,possible:!!(null==r?void 0:r.includes(l)),headerStyles:c},a)}))}),void 0))),$=(0,r.memo)(N)}}]);