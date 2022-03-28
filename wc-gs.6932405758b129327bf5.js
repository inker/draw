"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[5527],{73619:(e,o,s)=>{s.r(o),s.d(o,{default:()=>P});var t=s(85893),r=s(67294),n=s(58804),i=s(75703),l=s(83608),a=s(69983),d=s(61790),c=s(57111),u=s(43432),p=s(58231),m=s(83266),h=s(85973),f=s(62367),g=s(3962),b=s(36756),x=s(90604),v=s(55020),k=s(3447);const Z=()=>new Worker(new URL(s.p+s.u(4714),s.b)),j=i(n.iv`
  background-color: ${e=>e.theme.isDarkMode?"#363":"#c0e0c0"};
`);function w(e){const o=e.map((e=>a(e)));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:o[0],pots:o,groups:e[0].map((()=>[]))}}const P=(0,r.memo)((({season:e,pots:o})=>{const[s,n]=(0,c.Z)(),[i,a]=(0,u.Z)(),[{currentPotNum:P,selectedTeam:G,pickedGroup:T,hungPot:y,pots:N,groups:E},S]=(0,r.useState)((()=>w(o)));(0,r.useEffect)((()=>{S(w(o))}),[o,s]);const[,$]=(0,d.Z)(),[C]=(0,p.Z)(),D=(0,m.Z)(Z),F=(0,r.useRef)(null),M=(0,r.useCallback)((e=>{if(G)return;const o=N[P][e];if(!o)return;const s=N.slice();s[P]=s[P].filter(((o,s)=>s!==e)),S({currentPotNum:P,hungPot:y,selectedTeam:o,pickedGroup:null,pots:s,groups:E})}),[N,E,P,y,G]);(0,r.useEffect)((()=>{G&&(async()=>{if(!G)throw new Error("no selected team");let o;try{o=(await D({season:e,pots:N,groups:E,selectedTeam:G})).pickedGroup}catch(e){return console.error(e),void $({error:"Could not determine the group"})}const s=E.slice();s[o]=[...s[o],G];const t=N[P].length>0?P:P+1;S({selectedTeam:null,pickedGroup:o,hungPot:N[t],currentPotNum:t,pots:N,groups:s})})()}),[G]),(0,r.useEffect)((()=>{const e=N[P].findIndex((e=>e.host));M(e)}),[s]);const O=P>=N.length;(0,r.useEffect)((()=>{const e=null==y?void 0:y.length;if(i&&e){const o=l(e-1);M(o)}}),[i,y]),(0,r.useEffect)((()=>{O&&i&&a(!1)}),[O,i]);const R=E.length;return(0,t.jsxs)(h.Z,{children:[(0,t.jsxs)(b.Z,{children:[(0,t.jsx)(f.Z,{selectedTeams:G&&[G],initialPots:o,pots:N,currentPotNum:P},void 0),(0,t.jsx)(g.Z,{ref:F,maxTeams:N.length,currentPotNum:P,groups:E,possibleGroups:null,getGroupHeaderStyles:j},void 0)]},void 0),(0,t.jsxs)(x.Z,{children:[!i&&(0,t.jsx)(v.Z,{forceNoSelect:!!G,display:!O,displayTeams:C,selectedTeam:G,pot:y,onPick:M},void 0),(0,t.jsx)(k.Z,{long:!0,completed:O,selectedTeam:G,pickedGroup:T,possibleGroups:null,isDisplayPossibleGroupsText:!!G,numGroups:R,groupsElement:F,reset:n},void 0)]},void 0)]},void 0)}))},3962:(e,o,s)=>{s.d(o,{Z:()=>E});var t=s(85893),r=s(67294),n=s(58804),i=s(788),l=s(96026),a=s(42486),d=s(32415),c=s(23132),u=s(69585),p=s(84048),m=s(41771),h=s(58020),f=s(39548),g=s(10606),b=s(10694);const x=n.F4`
  from {
    box-shadow: 0 0 20px #08f;
  }
  to {}
`,v=n.F4`
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
    animation: ${e=>e.theme.isDarkMode?v:x} 1s ease;
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
`,G=(0,r.memo)((({team:e,possible:o})=>{var s;const i=(0,p.Z)(e),[l,a]=(0,r.useState)(e),[d,c]=(0,r.useState)(!1),u=(0,r.useContext)(n.Ni),x=(0,r.useRef)(null),v=(0,r.useCallback)((()=>c(!1)),[]),k=(0,r.useCallback)((()=>{a(e),c(!0)}),[e]);return(0,m.Z)((()=>{v()}),[u]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(P,Object.assign({picked:d&&!!l,possible:o,onAnimationEnd:v},{children:l?(0,t.jsx)(f.Z,Object.assign({country:(0,h.Z)(l)},{children:null!==(s=l.shortName)&&void 0!==s?s:l.name}),void 0):(0,t.jsx)(g.Z,{ref:x},void 0)}),void 0),e&&e!==i&&(0,t.jsx)(b.Z,{from:`[data-cellid='${e.id}']`,to:x,duration:350,team:e,onAnimationEnd:k},void 0)]},void 0)})),T=(0,r.memo)((({maxTeams:e,groupLetter:o,teams:s,potNum:r,possible:n,headerStyles:i})=>(0,t.jsxs)(a.Z,{children:[(0,t.jsx)("thead",{children:(0,t.jsx)(c.Z,{children:(0,t.jsx)(u.Z,{children:(0,t.jsxs)(d.Z,Object.assign({styles:i},{children:["Group"," ",o]}),void 0)},void 0)},void 0)},void 0),(0,t.jsx)("tbody",{children:l(e).map((e=>(0,t.jsx)(c.Z,{children:(0,t.jsx)(G,{team:s[e],possible:e===r&&n},void 0)},e)))},void 0)]},void 0))),y=n.ZP.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,N=(0,r.forwardRef)((({maxTeams:e,currentPotNum:o,groups:s,possibleGroups:r,getGroupHeaderStyles:n},l)=>(0,t.jsx)(y,Object.assign({ref:l},{children:null==s?void 0:s.map(((s,l)=>{const a=(0,i.Z)(l),d=null==n?void 0:n(l);return(0,t.jsx)(T,{maxTeams:e,groupLetter:a,teams:s,potNum:o,possible:!!(null==r?void 0:r.includes(l)),headerStyles:d},a)}))}),void 0))),E=(0,r.memo)(N)}}]);