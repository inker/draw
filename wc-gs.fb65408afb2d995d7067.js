"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[5527],{73619:(e,o,s)=>{s.r(o),s.d(o,{default:()=>G});var t=s(85893),r=s(67294),n=s(58804),a=s(75703),l=s(83608),c=s(69983),u=s(61790),i=s(57111),d=s(43432),p=s(58231),m=s(83266),f=s(85973),h=s(62367),x=s(3962),g=s(36756),b=s(90604),k=s(55020),Z=s(3447);const j=()=>new Worker(new URL(s.p+s.u(4714),s.b)),w=a(n.iv`
  background-color: ${e=>e.theme.isDarkMode?"#363":"#c0e0c0"};
`);function P(e){const o=e.map((e=>c(e)));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:o[0],pots:o,groups:e[0].map((()=>[]))}}const G=(0,r.memo)((function({season:e,pots:o}){const[s,n]=(0,i.Z)(),[a,c]=(0,d.Z)(),[{currentPotNum:G,selectedTeam:T,pickedGroup:y,hungPot:v,pots:N,groups:E},S]=(0,r.useState)((()=>P(o)));(0,r.useEffect)((()=>{S(P(o))}),[o,s]);const[,$]=(0,u.Z)(),[C]=(0,p.Z)(),D=(0,m.Z)(j),F=(0,r.useRef)(null),M=(0,r.useCallback)((e=>{if(T)return;const o=N[G][e];if(!o)return;const s=N.slice();s[G]=s[G].filter(((o,s)=>s!==e)),S({currentPotNum:G,hungPot:v,selectedTeam:o,pickedGroup:null,pots:s,groups:E})}),[N,E,G,v,T]);(0,r.useEffect)((()=>{T&&(async()=>{if(!T)throw new Error("no selected team");let o;try{o=(await D({season:e,pots:N,groups:E,selectedTeam:T})).pickedGroup}catch(e){return console.error(e),void $({error:"Could not determine the group"})}const s=E.slice();s[o]=[...s[o],T];const t=N[G].length>0?G:G+1;S({selectedTeam:null,pickedGroup:o,hungPot:N[t],currentPotNum:t,pots:N,groups:s})})()}),[T]),(0,r.useEffect)((()=>{const e=N[G].findIndex((e=>e.host));M(e)}),[N]);const R=G>=N.length;(0,r.useEffect)((()=>{const e=v?.length;if(a&&e){const o=l(e-1);M(o)}}),[a,v]),(0,r.useEffect)((()=>{R&&a&&c(!1)}),[R,a]);const L=E.length;return(0,t.jsxs)(f.Z,{children:[(0,t.jsxs)(g.Z,{children:[(0,t.jsx)(h.Z,{selectedTeams:T&&[T],initialPots:o,pots:N,currentPotNum:G}),(0,t.jsx)(x.Z,{ref:F,maxTeams:N.length,currentPotNum:G,groups:E,possibleGroups:null,getGroupHeaderStyles:w})]}),(0,t.jsxs)(b.Z,{children:[!a&&(0,t.jsx)(k.Z,{forceNoSelect:!!T,display:!R,displayTeams:C,selectedTeam:T,pot:v,onPick:M}),(0,t.jsx)(Z.Z,{long:!0,completed:R,selectedTeam:T,pickedGroup:y,possibleGroups:null,isDisplayPossibleGroupsText:!!T,numGroups:L,groupsElement:F,reset:n})]})]})}))},3962:(e,o,s)=>{s.d(o,{Z:()=>E});var t=s(85893),r=s(67294),n=s(58804),a=s(788),l=s(96026),c=s(42486),u=s(32415),i=s(23132),d=s(69585),p=s(84048),m=s(41771),f=s(58020),h=s(39548),x=s(10606),g=s(10694);const b=n.F4`
  from {
    box-shadow: 0 0 20px #08f;
  }
  to {}
`,k=n.F4`
  from {
    background-color: rgba(255, 255, 255, 0.5);
  }
  to {}
`,Z=n.F4`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,j=n.F4`
  from {
    background-color: rgba(192, 224, 255, 0.5);
  }
  to {}
`,w=n.iv`
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
    animation: ${e=>e.theme.isDarkMode?k:b} 1s ease;
    ${e=>e.theme.isDarkMode?n.iv`
      background-color: rgba(255, 255, 255, 0.3);
    `:n.iv`
      box-shadow: 0 0 5px #6af;
    `}
  }
`,P=n.iv`
  animation: ${e=>e.theme.isDarkMode?j:Z} 3s ease-out normal forwards;
`,G=(0,n.ZP)(d.Z)`
  ${e=>e.possible&&w}
  ${e=>e.picked&&P}
`;const T=(0,r.memo)((function({team:e,possible:o}){const s=(0,p.Z)(e),[a,l]=(0,r.useState)(e),[c,u]=(0,r.useState)(!1),i=(0,r.useContext)(n.Ni),d=(0,r.useRef)(null),b=(0,r.useCallback)((()=>u(!1)),[]),k=(0,r.useCallback)((()=>{l(e),u(!0)}),[e]);return(0,m.Z)((()=>{b()}),[i]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(G,{picked:c&&!!a,possible:o,onAnimationEnd:b,children:a?(0,t.jsx)(h.Z,{country:(0,f.Z)(a),children:a.shortName??a.name}):(0,t.jsx)(x.Z,{ref:d})}),e&&e!==s&&(0,t.jsx)(g.Z,{from:`[data-cellid='${e.id}']`,to:d,duration:350,team:e,onAnimationEnd:k})]})}));const y=(0,r.memo)((function({maxTeams:e,groupLetter:o,teams:s,potNum:r,possible:n,headerStyles:a}){return(0,t.jsxs)(c.Z,{children:[(0,t.jsx)("thead",{children:(0,t.jsx)(i.Z,{children:(0,t.jsx)(d.Z,{children:(0,t.jsxs)(u.Z,{styles:a,children:["Group"," ",o]})})})}),(0,t.jsx)("tbody",{children:l(e).map((e=>(0,t.jsx)(i.Z,{children:(0,t.jsx)(T,{team:s[e],possible:e===r&&n})},e)))})]})})),v=n.ZP.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,N=(0,r.forwardRef)((({maxTeams:e,currentPotNum:o,groups:s,possibleGroups:r,getGroupHeaderStyles:n},l)=>(0,t.jsx)(v,{ref:l,children:s?.map(((s,l)=>{const c=(0,a.Z)(l),u=n?.(l);return(0,t.jsx)(y,{maxTeams:e,groupLetter:c,teams:s,potNum:o,possible:!!r?.includes(l),headerStyles:u},c)}))}))),E=(0,r.memo)(N)}}]);