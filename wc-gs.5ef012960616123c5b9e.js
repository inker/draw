"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[5527],{73619:(e,s,o)=>{o.r(s),o.d(s,{default:()=>v});var t=o(85893),r=o(67294),n=o(12788),l=o(75703),c=o.n(l),u=o(83608),a=o.n(u),i=o(69983),d=o.n(i),p=o(61790),m=o(57111),f=o(43432),h=o(58231),x=o(83266),g=o(85973),b=o(62367),k=o(3962),Z=o(36756),j=o(90604),w=o(55020),P=o(3447);const G=()=>new Worker(new URL(o.p+o.u(4714),o.b)),T=c()(n.iv`
  background-color: ${e=>e.theme.isDarkMode?"#363":"#c0e0c0"};
`);function y(e){const s=e.map((e=>d()(e)));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:s[0],pots:s,groups:e[0].map((()=>[]))}}const v=(0,r.memo)((function({season:e,pots:s}){const[o,n]=(0,m.Z)(),[l,c]=(0,f.Z)(),[{currentPotNum:u,selectedTeam:i,pickedGroup:d,hungPot:v,pots:N,groups:E},S]=(0,r.useState)((()=>y(s)));(0,r.useEffect)((()=>{S(y(s))}),[s,o]);const[,$]=(0,p.Z)(),[C]=(0,h.Z)(),D=(0,x.Z)(G),F=(0,r.useRef)(null),M=(0,r.useCallback)((e=>{if(i)return;const s=N[u][e];if(!s)return;const o=N.slice();o[u]=o[u].filter(((s,o)=>o!==e)),S({currentPotNum:u,hungPot:v,selectedTeam:s,pickedGroup:null,pots:o,groups:E})}),[N,E,u,v,i]);(0,r.useEffect)((()=>{i&&(async()=>{if(!i)throw new Error("no selected team");let s;try{s=(await D({season:e,pots:N,groups:E,selectedTeam:i})).pickedGroup}catch(e){return console.error(e),void $({error:"Could not determine the group"})}const o=E.slice();o[s]=[...o[s],i];const t=N[u].length>0?u:u+1;S({selectedTeam:null,pickedGroup:s,hungPot:N[t],currentPotNum:t,pots:N,groups:o})})()}),[i]),(0,r.useEffect)((()=>{const e=N[u].findIndex((e=>e.host));M(e)}),[N]);const R=u>=N.length;(0,r.useEffect)((()=>{const e=v?.length;if(l&&e){const s=a()(e-1);M(s)}}),[l,v]),(0,r.useEffect)((()=>{R&&l&&c(!1)}),[R,l]);const L=E.length;return(0,t.jsxs)(g.Z,{children:[(0,t.jsxs)(Z.Z,{children:[(0,t.jsx)(b.Z,{selectedTeams:i&&[i],initialPots:s,pots:N,currentPotNum:u}),(0,t.jsx)(k.Z,{ref:F,maxTeams:N.length,currentPotNum:u,groups:E,possibleGroups:null,getGroupHeaderStyles:T})]}),(0,t.jsxs)(j.Z,{children:[!l&&(0,t.jsx)(w.Z,{forceNoSelect:!!i,display:!R,displayTeams:C,selectedTeam:i,pot:v,onPick:M}),(0,t.jsx)(P.Z,{long:!0,completed:R,selectedTeam:i,pickedGroup:d,possibleGroups:null,isDisplayPossibleGroupsText:!!i,numGroups:L,groupsElement:F,reset:n})]})]})}))},3962:(e,s,o)=>{o.d(s,{Z:()=>S});var t=o(85893),r=o(67294),n=o(12788),l=o(788),c=o(96026),u=o.n(c),a=o(42486),i=o(32415),d=o(23132),p=o(69585),m=o(84048),f=o(41771),h=o(58020),x=o(39548),g=o(10606),b=o(78893);const k=n.F4`
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
`;const y=(0,r.memo)((function({team:e,possible:s}){const o=(0,m.Z)(e),[l,c]=(0,r.useState)(e),[u,a]=(0,r.useState)(!1),i=(0,r.useContext)(n.Ni),d=(0,r.useRef)(null),p=(0,r.useCallback)((()=>a(!1)),[]),k=(0,r.useCallback)((()=>{c(e),a(!0)}),[e]);return(0,f.Z)((()=>{p()}),[i]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(T,{picked:u&&!!l,possible:s,onAnimationEnd:p,children:l?(0,t.jsx)(x.Z,{country:(0,h.Z)(l),children:l.shortName??l.name}):(0,t.jsx)(g.Z,{ref:d})}),e&&e!==o&&(0,t.jsx)(b.Z,{from:`[data-cellid='${e.id}']`,to:d,duration:350,team:e,onAnimationEnd:k})]})}));const v=(0,r.memo)((function({maxTeams:e,groupLetter:s,teams:o,potNum:r,possible:n,headerStyles:l}){return(0,t.jsxs)(a.Z,{children:[(0,t.jsx)("thead",{children:(0,t.jsx)(d.Z,{children:(0,t.jsx)(p.Z,{children:(0,t.jsxs)(i.Z,{styles:l,children:["Group"," ",s]})})})}),(0,t.jsx)("tbody",{children:u()(e).map((e=>(0,t.jsx)(d.Z,{children:(0,t.jsx)(y,{team:o[e],possible:e===r&&n})},e)))})]})})),N=n.ZP.div`
  display: flex;
  flex-flow: row wrap;

  > * {
    flex: 1;
    flex-basis: 22%;
  }
`,E=(0,r.forwardRef)((({maxTeams:e,currentPotNum:s,groups:o,possibleGroups:r,getGroupHeaderStyles:n},c)=>(0,t.jsx)(N,{ref:c,children:o?.map(((o,c)=>{const u=(0,l.Z)(c),a=n?.(c);return(0,t.jsx)(v,{maxTeams:e,groupLetter:u,teams:o,potNum:s,possible:!!r?.includes(c),headerStyles:a},u)}))}))),S=(0,r.memo)(E)}}]);