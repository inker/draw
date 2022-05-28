"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[3602],{47710:(e,o,s)=>{s.r(o),s.d(o,{default:()=>G});var t=s(85893),r=s(67294),n=s(58804),l=s(83608),c=s(69983),a=s(61790),u=s(57111),i=s(43432),d=s(58231),p=s(83266),m=s(85973),f=s(62367),h=s(3962),g=s(36756),x=s(90604),b=s(55020),k=s(3447);const Z=()=>new Worker(new URL(s.p+s.u(9084),s.b)),j=n.iv`
  background-color: ${e=>e.theme.isDarkMode?"#933":"#ffc0c0"};
`,w=n.iv`
  background-color: ${e=>e.theme.isDarkMode?"#039":"#c0e0ff"};
`;function P(e){const o=e.map((e=>c(e)));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:o[0],pots:o,groups:e[0].map((()=>[]))}}const G=(0,r.memo)((function({season:e,pots:o}){const[s,n]=(0,u.Z)(),[c,G]=(0,i.Z)(),[{currentPotNum:T,selectedTeam:v,pickedGroup:y,hungPot:N,pots:$,groups:C},E]=(0,r.useState)((()=>P(o)));(0,r.useEffect)((()=>{E(P(o))}),[o,s]);const[,S]=(0,a.Z)(),[D]=(0,d.Z)(),M=(0,p.Z)(Z),F=(0,r.useRef)(null),R=(0,r.useCallback)((e=>{if(v)return;const o=$[T][e];if(!o)return;const s=$.slice();s[T]=s[T].filter(((o,s)=>s!==e)),E({currentPotNum:T,hungPot:N,selectedTeam:o,pickedGroup:null,pots:s,groups:C})}),[$,C,T,N,v]);(0,r.useEffect)((()=>{v&&(async()=>{if(!v)throw new Error("no selected team");let o;try{o=(await M({season:e,pots:$,groups:C,selectedTeam:v})).pickedGroup}catch(e){return console.error(e),void S({error:"Could not determine the group"})}const s=C.slice();s[o]=[...s[o],v];const t=$[T].length>0?T:T+1;E({selectedTeam:null,pickedGroup:o,hungPot:$[t],currentPotNum:t,pots:$,groups:s})})()}),[v]);const L=T>=$.length;(0,r.useEffect)((()=>{const e=N?.length;if(c&&e){const o=l(e-1);R(o)}}),[c,N]),(0,r.useEffect)((()=>{L&&c&&G(!1)}),[L,c]);const A=C.length,H=(0,r.useCallback)((e=>e<A>>1?j:w),[A]);return(0,t.jsxs)(m.Z,{children:[(0,t.jsxs)(g.Z,{children:[(0,t.jsx)(f.Z,{selectedTeams:v&&[v],initialPots:o,pots:$,currentPotNum:T}),(0,t.jsx)(h.Z,{ref:F,maxTeams:$.length,currentPotNum:T,groups:C,possibleGroups:null,getGroupHeaderStyles:H})]}),(0,t.jsxs)(x.Z,{children:[!c&&(0,t.jsx)(b.Z,{forceNoSelect:!!v,display:!L,displayTeams:D,selectedTeam:v,pot:N,onPick:R}),(0,t.jsx)(k.Z,{long:!0,completed:L,selectedTeam:v,pickedGroup:y,possibleGroups:null,isDisplayPossibleGroupsText:!!v,numGroups:A,groupsElement:F,reset:n})]})]})}))},3962:(e,o,s)=>{s.d(o,{Z:()=>$});var t=s(85893),r=s(67294),n=s(58804),l=s(788),c=s(96026),a=s(42486),u=s(32415),i=s(23132),d=s(69585),p=s(84048),m=s(41771),f=s(58020),h=s(39548),g=s(10606),x=s(10694);const b=n.F4`
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
`;const T=(0,r.memo)((function({team:e,possible:o}){const s=(0,p.Z)(e),[l,c]=(0,r.useState)(e),[a,u]=(0,r.useState)(!1),i=(0,r.useContext)(n.Ni),d=(0,r.useRef)(null),b=(0,r.useCallback)((()=>u(!1)),[]),k=(0,r.useCallback)((()=>{c(e),u(!0)}),[e]);return(0,m.Z)((()=>{b()}),[i]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(G,{picked:a&&!!l,possible:o,onAnimationEnd:b,children:l?(0,t.jsx)(h.Z,{country:(0,f.Z)(l),children:l.shortName??l.name}):(0,t.jsx)(g.Z,{ref:d})}),e&&e!==s&&(0,t.jsx)(x.Z,{from:`[data-cellid='${e.id}']`,to:d,duration:350,team:e,onAnimationEnd:k})]})}));const v=(0,r.memo)((function({maxTeams:e,groupLetter:o,teams:s,potNum:r,possible:n,headerStyles:l}){return(0,t.jsxs)(a.Z,{children:[(0,t.jsx)("thead",{children:(0,t.jsx)(i.Z,{children:(0,t.jsx)(d.Z,{children:(0,t.jsxs)(u.Z,{styles:l,children:["Group"," ",o]})})})}),(0,t.jsx)("tbody",{children:c(e).map((e=>(0,t.jsx)(i.Z,{children:(0,t.jsx)(T,{team:s[e],possible:e===r&&n})},e)))})]})})),y=n.ZP.div`
  display: flex;
  flex-flow: row wrap;

  > * {
    flex: 1;
    flex-basis: 22%;
  }
`,N=(0,r.forwardRef)((({maxTeams:e,currentPotNum:o,groups:s,possibleGroups:r,getGroupHeaderStyles:n},c)=>(0,t.jsx)(y,{ref:c,children:s?.map(((s,c)=>{const a=(0,l.Z)(c),u=n?.(c);return(0,t.jsx)(v,{maxTeams:e,groupLetter:a,teams:s,potNum:o,possible:!!r?.includes(c),headerStyles:u},a)}))}))),$=(0,r.memo)(N)}}]);