"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[3602],{47710:(e,o,s)=>{s.r(o),s.d(o,{default:()=>P});var t=s(85893),r=s(67294),n=s(58804),l=s(83608),a=s(69983),u=s(61790),c=s(57111),i=s(43432),d=s(58231),p=s(83266),m=s(85973),f=s(62367),h=s(3962),g=s(36756),x=s(90604),b=s(55020),k=s(3447);const Z=()=>new Worker(new URL(s.p+s.u(9084),s.b)),j=n.iv`
  background-color: ${e=>e.theme.isDarkMode?"#933":"#ffc0c0"};
`,v=n.iv`
  background-color: ${e=>e.theme.isDarkMode?"#039":"#c0e0ff"};
`;function w(e){const o=e.map((e=>a(e)));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:o[0],pots:o,groups:e[0].map((()=>[]))}}const P=(0,r.memo)((function({season:e,pots:o}){const[s,n]=(0,c.Z)(),[a,P]=(0,i.Z)(),[{currentPotNum:G,selectedTeam:T,pickedGroup:y,hungPot:N,pots:$,groups:C},E]=(0,r.useState)((()=>w(o)));(0,r.useEffect)((()=>{E(w(o))}),[o,s]);const[,S]=(0,u.Z)(),[D]=(0,d.Z)(),M=(0,p.Z)(Z),F=(0,r.useRef)(null),R=(0,r.useCallback)((e=>{if(T)return;const o=$[G][e];if(!o)return;const s=$.slice();s[G]=s[G].filter(((o,s)=>s!==e)),E({currentPotNum:G,hungPot:N,selectedTeam:o,pickedGroup:null,pots:s,groups:C})}),[$,C,G,N,T]);(0,r.useEffect)((()=>{T&&(async()=>{if(!T)throw new Error("no selected team");let o;try{o=(await M({season:e,pots:$,groups:C,selectedTeam:T})).pickedGroup}catch(e){return console.error(e),void S({error:"Could not determine the group"})}const s=C.slice();s[o]=[...s[o],T];const t=$[G].length>0?G:G+1;E({selectedTeam:null,pickedGroup:o,hungPot:$[t],currentPotNum:t,pots:$,groups:s})})()}),[T]);const L=G>=$.length;(0,r.useEffect)((()=>{const e=null==N?void 0:N.length;if(a&&e){const o=l(e-1);R(o)}}),[a,N]),(0,r.useEffect)((()=>{L&&a&&P(!1)}),[L,a]);const A=C.length,H=(0,r.useCallback)((e=>e<A>>1?j:v),[A]);return(0,t.jsxs)(m.Z,{children:[(0,t.jsxs)(g.Z,{children:[(0,t.jsx)(f.Z,{selectedTeams:T&&[T],initialPots:o,pots:$,currentPotNum:G}),(0,t.jsx)(h.Z,{ref:F,maxTeams:$.length,currentPotNum:G,groups:C,possibleGroups:null,getGroupHeaderStyles:H})]}),(0,t.jsxs)(x.Z,{children:[!a&&(0,t.jsx)(b.Z,{forceNoSelect:!!T,display:!L,displayTeams:D,selectedTeam:T,pot:N,onPick:R}),(0,t.jsx)(k.Z,{long:!0,completed:L,selectedTeam:T,pickedGroup:y,possibleGroups:null,isDisplayPossibleGroupsText:!!T,numGroups:A,groupsElement:F,reset:n})]})]})}))},3962:(e,o,s)=>{s.d(o,{Z:()=>$});var t=s(85893),r=s(67294),n=s(58804),l=s(788),a=s(96026),u=s(42486),c=s(32415),i=s(23132),d=s(69585),p=s(84048),m=s(41771),f=s(58020),h=s(39548),g=s(10606),x=s(10694);const b=n.F4`
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
`,v=n.iv`
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
`,w=n.iv`
  animation: ${e=>e.theme.isDarkMode?j:Z} 3s ease-out normal forwards;
`,P=(0,n.ZP)(d.Z)`
  ${e=>e.possible&&v}
  ${e=>e.picked&&w}
`;const G=(0,r.memo)((function({team:e,possible:o}){var s;const l=(0,p.Z)(e),[a,u]=(0,r.useState)(e),[c,i]=(0,r.useState)(!1),d=(0,r.useContext)(n.Ni),b=(0,r.useRef)(null),k=(0,r.useCallback)((()=>i(!1)),[]),Z=(0,r.useCallback)((()=>{u(e),i(!0)}),[e]);return(0,m.Z)((()=>{k()}),[d]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(P,{picked:c&&!!a,possible:o,onAnimationEnd:k,children:a?(0,t.jsx)(h.Z,{country:(0,f.Z)(a),children:null!==(s=a.shortName)&&void 0!==s?s:a.name}):(0,t.jsx)(g.Z,{ref:b})}),e&&e!==l&&(0,t.jsx)(x.Z,{from:`[data-cellid='${e.id}']`,to:b,duration:350,team:e,onAnimationEnd:Z})]})}));const T=(0,r.memo)((function({maxTeams:e,groupLetter:o,teams:s,potNum:r,possible:n,headerStyles:l}){return(0,t.jsxs)(u.Z,{children:[(0,t.jsx)("thead",{children:(0,t.jsx)(i.Z,{children:(0,t.jsx)(d.Z,{children:(0,t.jsxs)(c.Z,{styles:l,children:["Group"," ",o]})})})}),(0,t.jsx)("tbody",{children:a(e).map((e=>(0,t.jsx)(i.Z,{children:(0,t.jsx)(G,{team:s[e],possible:e===r&&n})},e)))})]})})),y=n.ZP.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,N=(0,r.forwardRef)((({maxTeams:e,currentPotNum:o,groups:s,possibleGroups:r,getGroupHeaderStyles:n},a)=>(0,t.jsx)(y,{ref:a,children:null==s?void 0:s.map(((s,a)=>{const u=(0,l.Z)(a),c=null==n?void 0:n(a);return(0,t.jsx)(T,{maxTeams:e,groupLetter:u,teams:s,potNum:o,possible:!!(null==r?void 0:r.includes(a)),headerStyles:c},u)}))}))),$=(0,r.memo)(N)}}]);