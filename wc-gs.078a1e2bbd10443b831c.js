"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[5527],{73619:(e,s,o)=>{o.r(s),o.d(s,{default:()=>G});var t=o(85893),r=o(67294),n=o(58804),l=o(75703),c=o(83608),u=o(69983),a=o(61790),i=o(57111),d=o(43432),p=o(58231),m=o(83266),f=o(85973),h=o(62367),x=o(3962),g=o(36756),b=o(90604),k=o(55020),Z=o(3447);const j=()=>new Worker(new URL(o.p+o.u(4714),o.b)),w=l(n.iv`
  background-color: ${e=>e.theme.isDarkMode?"#363":"#c0e0c0"};
`);function P(e){const s=e.map((e=>u(e)));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:s[0],pots:s,groups:e[0].map((()=>[]))}}const G=(0,r.memo)((function({season:e,pots:s}){const[o,n]=(0,i.Z)(),[l,u]=(0,d.Z)(),[{currentPotNum:G,selectedTeam:T,pickedGroup:y,hungPot:v,pots:N,groups:E},S]=(0,r.useState)((()=>P(s)));(0,r.useEffect)((()=>{S(P(s))}),[s,o]);const[,$]=(0,a.Z)(),[C]=(0,p.Z)(),D=(0,m.Z)(j),F=(0,r.useRef)(null),M=(0,r.useCallback)((e=>{if(T)return;const s=N[G][e];if(!s)return;const o=N.slice();o[G]=o[G].filter(((s,o)=>o!==e)),S({currentPotNum:G,hungPot:v,selectedTeam:s,pickedGroup:null,pots:o,groups:E})}),[N,E,G,v,T]);(0,r.useEffect)((()=>{T&&(async()=>{if(!T)throw new Error("no selected team");let s;try{s=(await D({season:e,pots:N,groups:E,selectedTeam:T})).pickedGroup}catch(e){return console.error(e),void $({error:"Could not determine the group"})}const o=E.slice();o[s]=[...o[s],T];const t=N[G].length>0?G:G+1;S({selectedTeam:null,pickedGroup:s,hungPot:N[t],currentPotNum:t,pots:N,groups:o})})()}),[T]),(0,r.useEffect)((()=>{const e=N[G].findIndex((e=>e.host));M(e)}),[N]);const R=G>=N.length;(0,r.useEffect)((()=>{const e=v?.length;if(l&&e){const s=c(e-1);M(s)}}),[l,v]),(0,r.useEffect)((()=>{R&&l&&u(!1)}),[R,l]);const L=E.length;return(0,t.jsxs)(f.Z,{children:[(0,t.jsxs)(g.Z,{children:[(0,t.jsx)(h.Z,{selectedTeams:T&&[T],initialPots:s,pots:N,currentPotNum:G}),(0,t.jsx)(x.Z,{ref:F,maxTeams:N.length,currentPotNum:G,groups:E,possibleGroups:null,getGroupHeaderStyles:w})]}),(0,t.jsxs)(b.Z,{children:[!l&&(0,t.jsx)(k.Z,{forceNoSelect:!!T,display:!R,displayTeams:C,selectedTeam:T,pot:v,onPick:M}),(0,t.jsx)(Z.Z,{long:!0,completed:R,selectedTeam:T,pickedGroup:y,possibleGroups:null,isDisplayPossibleGroupsText:!!T,numGroups:L,groupsElement:F,reset:n})]})]})}))},3962:(e,s,o)=>{o.d(s,{Z:()=>E});var t=o(85893),r=o(67294),n=o(58804),l=o(788),c=o(96026),u=o(42486),a=o(32415),i=o(23132),d=o(69585),p=o(84048),m=o(41771),f=o(58020),h=o(39548),x=o(10606),g=o(10694);const b=n.F4`
  from {
    box-shadow: 0 0 20px #08f;
  }
`,k=n.F4`
  from {
    background-color: rgb(255 255 255 / 0.5);
  }
`,Z=n.F4`
  from {
    background-color: rgb(255 255 0 / 0.5);
  }
`,j=n.F4`
  from {
    background-color: rgb(192 224 255 / 0.5);
  }
`,w=n.iv`
  position: relative; /* enables glow */
  ${e=>e.theme.isDarkMode?n.iv`
      background-color: rgb(255 255 255 / 0.3);
    `:n.iv`
      box-shadow: 0 0 5px #6af;
    `}

  &::before {
    content: '';
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    animation: ${e=>e.theme.isDarkMode?k:b} 1s ease;
    ${e=>e.theme.isDarkMode?n.iv`
      background-color: rgb(255 255 255 / 0.3);
    `:n.iv`
      box-shadow: 0 0 5px #6af;
    `}
  }
`,P=n.iv`
  animation: ${e=>e.theme.isDarkMode?j:Z} 3s ease-out normal forwards;
`,G=(0,n.ZP)(d.Z)`
  ${e=>e.possible&&w}
  ${e=>e.picked&&P}
`;const T=(0,r.memo)((function({team:e,possible:s}){const o=(0,p.Z)(e),[l,c]=(0,r.useState)(e),[u,a]=(0,r.useState)(!1),i=(0,r.useContext)(n.Ni),d=(0,r.useRef)(null),b=(0,r.useCallback)((()=>a(!1)),[]),k=(0,r.useCallback)((()=>{c(e),a(!0)}),[e]);return(0,m.Z)((()=>{b()}),[i]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(G,{picked:u&&!!l,possible:s,onAnimationEnd:b,children:l?(0,t.jsx)(h.Z,{country:(0,f.Z)(l),children:l.shortName??l.name}):(0,t.jsx)(x.Z,{ref:d})}),e&&e!==o&&(0,t.jsx)(g.Z,{from:`[data-cellid='${e.id}']`,to:d,duration:350,team:e,onAnimationEnd:k})]})}));const y=(0,r.memo)((function({maxTeams:e,groupLetter:s,teams:o,potNum:r,possible:n,headerStyles:l}){return(0,t.jsxs)(u.Z,{children:[(0,t.jsx)("thead",{children:(0,t.jsx)(i.Z,{children:(0,t.jsx)(d.Z,{children:(0,t.jsxs)(a.Z,{styles:l,children:["Group"," ",s]})})})}),(0,t.jsx)("tbody",{children:c(e).map((e=>(0,t.jsx)(i.Z,{children:(0,t.jsx)(T,{team:o[e],possible:e===r&&n})},e)))})]})})),v=n.ZP.div`
  display: flex;
  flex-flow: row wrap;

  > * {
    flex: 1;
    flex-basis: 22%;
  }
`,N=(0,r.forwardRef)((({maxTeams:e,currentPotNum:s,groups:o,possibleGroups:r,getGroupHeaderStyles:n},c)=>(0,t.jsx)(v,{ref:c,children:o?.map(((o,c)=>{const u=(0,l.Z)(c),a=n?.(c);return(0,t.jsx)(y,{maxTeams:e,groupLetter:u,teams:o,potNum:s,possible:!!r?.includes(c),headerStyles:a},u)}))}))),E=(0,r.memo)(N)}}]);