"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[5527],{73619:(e,o,s)=>{s.r(o),s.d(o,{default:()=>P});var t=s(85893),r=s(67294),n=s(58804),l=s(75703),a=s(83608),u=s(69983),c=s(61790),i=s(57111),d=s(43432),p=s(58231),m=s(83266),f=s(85973),h=s(62367),x=s(3962),g=s(36756),b=s(90604),k=s(55020),Z=s(3447);const j=()=>new Worker(new URL(s.p+s.u(4714),s.b)),w=l(n.iv`
  background-color: ${e=>e.theme.isDarkMode?"#363":"#c0e0c0"};
`);function v(e){const o=e.map((e=>u(e)));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:o[0],pots:o,groups:e[0].map((()=>[]))}}const P=(0,r.memo)((function({season:e,pots:o}){const[s,n]=(0,i.Z)(),[l,u]=(0,d.Z)(),[{currentPotNum:P,selectedTeam:G,pickedGroup:T,hungPot:y,pots:N,groups:E},S]=(0,r.useState)((()=>v(o)));(0,r.useEffect)((()=>{S(v(o))}),[o,s]);const[,$]=(0,c.Z)(),[C]=(0,p.Z)(),D=(0,m.Z)(j),F=(0,r.useRef)(null),M=(0,r.useCallback)((e=>{if(G)return;const o=N[P][e];if(!o)return;const s=N.slice();s[P]=s[P].filter(((o,s)=>s!==e)),S({currentPotNum:P,hungPot:y,selectedTeam:o,pickedGroup:null,pots:s,groups:E})}),[N,E,P,y,G]);(0,r.useEffect)((()=>{G&&(async()=>{if(!G)throw new Error("no selected team");let o;try{o=(await D({season:e,pots:N,groups:E,selectedTeam:G})).pickedGroup}catch(e){return console.error(e),void $({error:"Could not determine the group"})}const s=E.slice();s[o]=[...s[o],G];const t=N[P].length>0?P:P+1;S({selectedTeam:null,pickedGroup:o,hungPot:N[t],currentPotNum:t,pots:N,groups:s})})()}),[G]),(0,r.useEffect)((()=>{const e=N[P].findIndex((e=>e.host));M(e)}),[N]);const R=P>=N.length;(0,r.useEffect)((()=>{const e=null==y?void 0:y.length;if(l&&e){const o=a(e-1);M(o)}}),[l,y]),(0,r.useEffect)((()=>{R&&l&&u(!1)}),[R,l]);const L=E.length;return(0,t.jsxs)(f.Z,{children:[(0,t.jsxs)(g.Z,{children:[(0,t.jsx)(h.Z,{selectedTeams:G&&[G],initialPots:o,pots:N,currentPotNum:P}),(0,t.jsx)(x.Z,{ref:F,maxTeams:N.length,currentPotNum:P,groups:E,possibleGroups:null,getGroupHeaderStyles:w})]}),(0,t.jsxs)(b.Z,{children:[!l&&(0,t.jsx)(k.Z,{forceNoSelect:!!G,display:!R,displayTeams:C,selectedTeam:G,pot:y,onPick:M}),(0,t.jsx)(Z.Z,{long:!0,completed:R,selectedTeam:G,pickedGroup:T,possibleGroups:null,isDisplayPossibleGroupsText:!!G,numGroups:L,groupsElement:F,reset:n})]})]})}))},3962:(e,o,s)=>{s.d(o,{Z:()=>E});var t=s(85893),r=s(67294),n=s(58804),l=s(788),a=s(96026),u=s(42486),c=s(32415),i=s(23132),d=s(69585),p=s(84048),m=s(41771),f=s(58020),h=s(39548),x=s(10606),g=s(10694);const b=n.F4`
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
`,v=n.iv`
  animation: ${e=>e.theme.isDarkMode?j:Z} 3s ease-out normal forwards;
`,P=(0,n.ZP)(d.Z)`
  ${e=>e.possible&&w}
  ${e=>e.picked&&v}
`;const G=(0,r.memo)((function({team:e,possible:o}){var s;const l=(0,p.Z)(e),[a,u]=(0,r.useState)(e),[c,i]=(0,r.useState)(!1),d=(0,r.useContext)(n.Ni),b=(0,r.useRef)(null),k=(0,r.useCallback)((()=>i(!1)),[]),Z=(0,r.useCallback)((()=>{u(e),i(!0)}),[e]);return(0,m.Z)((()=>{k()}),[d]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(P,{picked:c&&!!a,possible:o,onAnimationEnd:k,children:a?(0,t.jsx)(h.Z,{country:(0,f.Z)(a),children:null!==(s=a.shortName)&&void 0!==s?s:a.name}):(0,t.jsx)(x.Z,{ref:b})}),e&&e!==l&&(0,t.jsx)(g.Z,{from:`[data-cellid='${e.id}']`,to:b,duration:350,team:e,onAnimationEnd:Z})]})}));const T=(0,r.memo)((function({maxTeams:e,groupLetter:o,teams:s,potNum:r,possible:n,headerStyles:l}){return(0,t.jsxs)(u.Z,{children:[(0,t.jsx)("thead",{children:(0,t.jsx)(i.Z,{children:(0,t.jsx)(d.Z,{children:(0,t.jsxs)(c.Z,{styles:l,children:["Group"," ",o]})})})}),(0,t.jsx)("tbody",{children:a(e).map((e=>(0,t.jsx)(i.Z,{children:(0,t.jsx)(G,{team:s[e],possible:e===r&&n})},e)))})]})})),y=n.ZP.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,N=(0,r.forwardRef)((({maxTeams:e,currentPotNum:o,groups:s,possibleGroups:r,getGroupHeaderStyles:n},a)=>(0,t.jsx)(y,{ref:a,children:null==s?void 0:s.map(((s,a)=>{const u=(0,l.Z)(a),c=null==n?void 0:n(a);return(0,t.jsx)(T,{maxTeams:e,groupLetter:u,teams:s,potNum:o,possible:!!(null==r?void 0:r.includes(a)),headerStyles:c},u)}))}))),E=(0,r.memo)(N)}}]);