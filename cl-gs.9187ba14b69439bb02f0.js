(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[1739],{94311:(e,o,s)=>{var r=s(69877);e.exports=function(e){var o=e.length;return o?e[r(0,o-1)]:void 0}},84992:(e,o,s)=>{var r=s(94311),t=s(52628);e.exports=function(e){return r(t(e))}},95534:(e,o,s)=>{var r=s(94311),t=s(84992),i=s(1469);e.exports=function(e){return(i(e)?r:t)(e)}},52409:(e,o,s)=>{"use strict";s.r(o),s.d(o,{default:()=>C});var r=s(85893),t=s(67294),i=s(29163),l=s(83608),n=s(95534),u=s(69983),a=s(61790),c=s(57111),d=s(43432),p=s(58231),m=s(83266),f=s(85973),b=s(62367),h=s(3962),g=s(36756),v=s(90604),x=s(55020),k=s(788),Z=s(10804);const j=(0,i.ZP)(Z.Z)`
  &:hover {
    ${e=>!e.noHover&&"background: radial-gradient(#ccf, #ccf)"}
  }
`,G=i.ZP.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 999px) {
    justify-content: center;
  }
`,w=(0,t.memo)((({display:e,displayGroups:o,possibleGroups:s,onPick:i})=>{const l=(0,t.useCallback)((e=>{const o=e.target,s=+o.dataset.group;if(Number.isNaN(s))throw new TypeError(`Incorrect group ball: ${o.dataset.group}`);i(s)}),[i]);return(0,r.jsx)(G,{children:e&&(null==s?void 0:s.map((e=>(0,r.jsx)(j,Object.assign({"data-group":e,forceVisible:o,onClick:l},{children:(0,k.Z)(e)}),e))))},void 0)}));var P=s(3447);const y=()=>new Worker(new URL(s.p+s.u(8502),s.b)),N=i.iv`
  background-color: ${e=>e.theme.isDarkMode?"#933":"#ffc0c0"};
`,T=i.iv`
  background-color: ${e=>e.theme.isDarkMode?"#039":"#c0e0ff"};
`;function S(e){const o=e.map((e=>u(e)));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:o[0],possibleGroups:null,possibleGroupsShuffled:null,pots:o,groups:e[0].map((()=>[]))}}const C=(0,t.memo)((({season:e,pots:o,isFirstPotShortDraw:s})=>{const[i,k]=(0,c.Z)(),[Z,j]=(0,d.Z)(),[{currentPotNum:G,selectedTeam:C,pickedGroup:$,hungPot:E,possibleGroups:D,possibleGroupsShuffled:M,pots:F,groups:O},R]=(0,t.useState)((()=>S(o)));(0,t.useEffect)((()=>{R(S(o))}),[o,i]);const[,H]=(0,a.Z)(),[L]=(0,p.Z)(),A=(0,m.Z)(y),I=(0,t.useRef)(null),U=s&&0===G,V=Z||U,W=(0,t.useCallback)((e=>{if(C)return;const o=F[G][e];if(!o)return;const s=F.slice();s[G]=s[G].filter(((o,s)=>s!==e)),R({currentPotNum:G,hungPot:E,selectedTeam:o,possibleGroups:D,possibleGroupsShuffled:M,pickedGroup:null,pots:s,groups:O})}),[F,O,G,E,C,D,M]),q=(0,t.useCallback)((e=>{if(!C)return void H({error:"No selected team..."});const o=O.slice();o[e]=[...o[e],C];const s=F[G].length>0?G:G+1;R({selectedTeam:null,pickedGroup:e,hungPot:F[s],possibleGroups:null,possibleGroupsShuffled:null,currentPotNum:s,pots:F,groups:o})}),[F,O,C,G,E]);(0,t.useEffect)((()=>{C&&(async()=>{if(!C)throw new Error("no selected team");let o;try{o=(await A({season:e,pots:F,groups:O,selectedTeam:C})).possibleGroups}catch(e){return console.error(e),void H({error:"Could not determine the group"})}R({selectedTeam:C,pickedGroup:null,hungPot:E,currentPotNum:G,possibleGroups:o,possibleGroupsShuffled:u(o),pots:F,groups:O})})()}),[C]);const z=G>=F.length;(0,t.useEffect)((()=>{const e=null==E?void 0:E.length;if(Z&&e){const o=l(e-1);W(o)}}),[Z,E]),(0,t.useEffect)((()=>{if(V&&(null==M?void 0:M.length)){const e=U?Math.min(...M):n(M);q(e)}}),[V,M]),(0,t.useEffect)((()=>{z&&Z&&j(!1)}),[z,Z]);const B=O.length,J=(0,t.useCallback)((e=>e<B>>1?N:T),[B]);return(0,r.jsxs)(f.Z,{children:[(0,r.jsxs)(g.Z,{children:[(0,r.jsx)(b.Z,{selectedTeams:C&&[C],initialPots:o,pots:F,currentPotNum:G},void 0),(0,r.jsx)(h.Z,{ref:I,maxTeams:F.length,currentPotNum:G,groups:O,possibleGroups:V?null:D,getGroupHeaderStyles:J},void 0)]},void 0),(0,r.jsxs)(v.Z,{children:[!Z&&(0,r.jsx)(x.Z,{display:!z,displayTeams:L,selectedTeam:C,pot:E,onPick:W},void 0),(0,r.jsx)(P.Z,{long:!1,completed:z,selectedTeam:C,pickedGroup:$,possibleGroups:Z?null:D,isDisplayPossibleGroupsText:!!C,numGroups:B,groupsElement:I,reset:k},void 0),!V&&(0,r.jsx)(w,{display:!z,displayGroups:L,possibleGroups:M,onPick:q},void 0)]},void 0)]},void 0)}))},3962:(e,o,s)=>{"use strict";s.d(o,{Z:()=>S});var r=s(85893),t=s(67294),i=s(29163),l=s(788),n=s(96026),u=s(42486),a=s(32415),c=s(23132),d=s(69585),p=s(84048),m=s(41771),f=s(58020),b=s(39548),h=s(10606),g=s(10694);const v=i.F4`
  from {
    box-shadow: 0 0 20px #08f;
  }
  to {}
`,x=i.F4`
  from {
    background-color: rgba(255, 255, 255, 0.5);
  }
  to {}
`,k=i.F4`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,Z=i.F4`
  from {
    background-color: rgba(192, 224, 255, 0.5);
  }
  to {}
`,j=i.iv`
  position: relative; /* enables glow */
  ${e=>e.theme.isDarkMode?i.iv`
    background-color: rgba(255, 255, 255, 0.3);
  `:i.iv`
    box-shadow: 0 0 5px #6af;
  `}

  &::before {
    content: '';
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    animation: ${e=>e.theme.isDarkMode?x:v} 1s ease;
    ${e=>e.theme.isDarkMode?i.iv`
      background-color: rgba(255, 255, 255, 0.3);
    `:i.iv`
      box-shadow: 0 0 5px #6af;
    `}
  }
`,G=i.iv`
  animation: ${e=>e.theme.isDarkMode?Z:k} 3s ease-out normal forwards;
`,w=(0,i.ZP)(d.Z)`
  ${e=>e.possible&&j}
  ${e=>e.picked&&G}
`,P=(0,t.memo)((({team:e,possible:o})=>{var s;const l=(0,p.Z)(e),[n,u]=(0,t.useState)(e),[a,c]=(0,t.useState)(!1),d=(0,t.useContext)(i.Ni),v=(0,t.useRef)(null),x=(0,t.useCallback)((()=>c(!1)),[]),k=(0,t.useCallback)((()=>{u(e),c(!0)}),[e]);return(0,m.Z)((()=>{x()}),[d]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(w,Object.assign({picked:a&&!!n,possible:o,onAnimationEnd:x},{children:n?(0,r.jsx)(b.Z,Object.assign({country:(0,f.Z)(n)},{children:null!==(s=n.shortName)&&void 0!==s?s:n.name}),void 0):(0,r.jsx)(h.Z,{ref:v},void 0)}),void 0),e&&e!==l&&(0,r.jsx)(g.Z,{from:`[data-cellid='${e.id}']`,to:v,duration:350,team:e,onAnimationEnd:k},void 0)]},void 0)})),y=(0,t.memo)((({maxTeams:e,groupLetter:o,teams:s,potNum:t,possible:i,headerStyles:l})=>(0,r.jsxs)(u.Z,{children:[(0,r.jsx)("thead",{children:(0,r.jsx)(c.Z,{children:(0,r.jsx)(d.Z,{children:(0,r.jsxs)(a.Z,Object.assign({styles:l},{children:["Group"," ",o]}),void 0)},void 0)},void 0)},void 0),(0,r.jsx)("tbody",{children:n(e).map((e=>(0,r.jsx)(c.Z,{children:(0,r.jsx)(P,{team:s[e],possible:e===t&&i},void 0)},e)))},void 0)]},void 0))),N=i.ZP.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,T=(0,t.forwardRef)((({maxTeams:e,currentPotNum:o,groups:s,possibleGroups:t,getGroupHeaderStyles:i},n)=>(0,r.jsx)(N,Object.assign({ref:n},{children:null==s?void 0:s.map(((s,n)=>{const u=(0,l.Z)(n),a=null==i?void 0:i(n);return(0,r.jsx)(y,{maxTeams:e,groupLetter:u,teams:s,potNum:o,possible:!!(null==t?void 0:t.includes(n)),headerStyles:a},u)}))}),void 0))),S=(0,t.memo)(T)}}]);