"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[3602],{47710:(e,o,s)=>{s.r(o),s.d(o,{default:()=>v});var t=s(85893),r=s(67294),n=s(12788),l=s(83608),c=s.n(l),a=s(69983),u=s.n(a),i=s(61790),d=s(57111),p=s(43432),m=s(58231),f=s(17187),h=s(85973),g=s(62367),x=s(3962),b=s(36756),k=s(90604),Z=s(55020),j=s(3447);const w=()=>new Worker(new URL(s.p+s.u(70),s.b)),P=n.iv`
  background-color: ${e=>e.theme.isDarkMode?"#933":"#ffc0c0"};
`,G=n.iv`
  background-color: ${e=>e.theme.isDarkMode?"#039":"#c0e0ff"};
`;function T(e){const o=e.map((e=>u()(e)));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:o[0],pots:o,groups:e[0].map((()=>[]))}}const v=(0,r.memo)((function({season:e,pots:o}){const[s,n]=(0,d.Z)(),[l,a]=(0,p.Z)(),[{currentPotNum:u,selectedTeam:v,pickedGroup:y,hungPot:N,pots:$,groups:C},E]=(0,r.useState)((()=>T(o)));(0,r.useEffect)((()=>{E(T(o))}),[o,s]);const[,S]=(0,i.Z)(),[D]=(0,m.Z)(),M=(0,f.Z)(w),F=(0,r.useRef)(null),R=(0,r.useCallback)((e=>{if(v)return;const o=$[u][e];if(!o)return;const s=$.slice();s[u]=s[u].filter(((o,s)=>s!==e)),E({currentPotNum:u,hungPot:N,selectedTeam:o,pickedGroup:null,pots:s,groups:C})}),[$,C,u,N,v]);(0,r.useEffect)((()=>{v&&(async()=>{if(!v)throw new Error("no selected team");let o;try{o=(await M({season:e,pots:$,groups:C,selectedTeam:v})).pickedGroup}catch(e){return console.error(e),void S({error:"Could not determine the group"})}const s=C.slice();s[o]=[...s[o],v];const t=$[u].length>0?u:u+1;E({selectedTeam:null,pickedGroup:o,hungPot:$[t],currentPotNum:t,pots:$,groups:s})})()}),[v]);const L=u>=$.length;(0,r.useEffect)((()=>{const e=N?.length;if(l&&e){const o=c()(e-1);R(o)}}),[l,N]),(0,r.useEffect)((()=>{L&&l&&a(!1)}),[L,l]);const A=C.length,H=(0,r.useCallback)((e=>e<A>>1?P:G),[A]);return(0,t.jsxs)(h.Z,{children:[(0,t.jsxs)(b.Z,{children:[(0,t.jsx)(g.Z,{selectedTeams:v&&[v],initialPots:o,pots:$,currentPotNum:u}),(0,t.jsx)(x.Z,{ref:F,maxTeams:$.length,currentPotNum:u,groups:C,possibleGroups:null,getGroupHeaderStyles:H})]}),(0,t.jsxs)(k.Z,{children:[!l&&(0,t.jsx)(Z.Z,{forceNoSelect:!!v,display:!L,displayTeams:D,selectedTeam:v,pot:N,onPick:R}),(0,t.jsx)(j.Z,{long:!0,completed:L,selectedTeam:v,pickedGroup:y,possibleGroups:null,isDisplayPossibleGroupsText:!!v,numGroups:A,groupsElement:F,reset:n})]})]})}))},3962:(e,o,s)=>{s.d(o,{Z:()=>C});var t=s(85893),r=s(67294),n=s(12788),l=s(788),c=s(96026),a=s.n(c),u=s(42486),i=s(32415),d=s(23132),p=s(69585),m=s(84048),f=s(41771),h=s(58020),g=s(39548),x=s(10606),b=s(10694);const k=n.F4`
  from {
    box-shadow: 0 0 20px #08f;
  }
`,Z=n.F4`
  from {
    background-color: rgb(255 255 255 / 0.5);
  }
`,j=n.F4`
  from {
    background-color: rgb(255 255 0 / 0.5);
  }
`,w=n.F4`
  from {
    background-color: rgb(192 224 255 / 0.5);
  }
`,P=n.iv`
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
    animation: ${e=>e.theme.isDarkMode?Z:k} 1s ease;
    ${e=>e.theme.isDarkMode?n.iv`
      background-color: rgb(255 255 255 / 0.3);
    `:n.iv`
      box-shadow: 0 0 5px #6af;
    `}
  }
`,G=n.iv`
  animation: ${e=>e.theme.isDarkMode?w:j} 3s ease-out normal forwards;
`,T=(0,n.ZP)(p.Z)`
  ${e=>e.possible&&P}
  ${e=>e.picked&&G}
`;const v=(0,r.memo)((function({team:e,possible:o}){const s=(0,m.Z)(e),[l,c]=(0,r.useState)(e),[a,u]=(0,r.useState)(!1),i=(0,r.useContext)(n.Ni),d=(0,r.useRef)(null),p=(0,r.useCallback)((()=>u(!1)),[]),k=(0,r.useCallback)((()=>{c(e),u(!0)}),[e]);return(0,f.Z)((()=>{p()}),[i]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(T,{picked:a&&!!l,possible:o,onAnimationEnd:p,children:l?(0,t.jsx)(g.Z,{country:(0,h.Z)(l),children:l.shortName??l.name}):(0,t.jsx)(x.Z,{ref:d})}),e&&e!==s&&(0,t.jsx)(b.Z,{from:`[data-cellid='${e.id}']`,to:d,duration:350,team:e,onAnimationEnd:k})]})}));const y=(0,r.memo)((function({maxTeams:e,groupLetter:o,teams:s,potNum:r,possible:n,headerStyles:l}){return(0,t.jsxs)(u.Z,{children:[(0,t.jsx)("thead",{children:(0,t.jsx)(d.Z,{children:(0,t.jsx)(p.Z,{children:(0,t.jsxs)(i.Z,{styles:l,children:["Group"," ",o]})})})}),(0,t.jsx)("tbody",{children:a()(e).map((e=>(0,t.jsx)(d.Z,{children:(0,t.jsx)(v,{team:s[e],possible:e===r&&n})},e)))})]})})),N=n.ZP.div`
  display: flex;
  flex-flow: row wrap;

  > * {
    flex: 1;
    flex-basis: 22%;
  }
`,$=(0,r.forwardRef)((({maxTeams:e,currentPotNum:o,groups:s,possibleGroups:r,getGroupHeaderStyles:n},c)=>(0,t.jsx)(N,{ref:c,children:s?.map(((s,c)=>{const a=(0,l.Z)(c),u=n?.(c);return(0,t.jsx)(y,{maxTeams:e,groupLetter:a,teams:s,potNum:o,possible:!!r?.includes(c),headerStyles:u},a)}))}))),C=(0,r.memo)($)}}]);