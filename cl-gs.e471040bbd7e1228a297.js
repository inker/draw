(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[1739],{94311:(e,o,s)=>{var r=s(69877);e.exports=function(e){var o=e.length;return o?e[r(0,o-1)]:void 0}},84992:(e,o,s)=>{var r=s(94311),t=s(52628);e.exports=function(e){return r(t(e))}},95534:(e,o,s)=>{var r=s(94311),t=s(84992),n=s(1469);e.exports=function(e){return(n(e)?r:t)(e)}},52409:(e,o,s)=>{"use strict";s.r(o),s.d(o,{default:()=>$});var r=s(85893),t=s(67294),n=s(58804),l=s(83608),u=s(95534),a=s(69983),i=s(61790),c=s(57111),p=s(43432),d=s(58231),m=s(83266),f=s(85973),h=s(62367),b=s(3962),g=s(36756),x=s(90604),k=s(55020),Z=s(788),v=s(10804);const G=(0,n.ZP)(v.Z)`
  &:hover {
    ${e=>!e.noHover&&"background: radial-gradient(#ccf, #ccf)"}
  }
`,w=n.ZP.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 999px) {
    justify-content: center;
  }
`;const j=(0,t.memo)((function({display:e,displayGroups:o,possibleGroups:s,onPick:n}){const l=(0,t.useCallback)((e=>{const o=e.target,s=+o.dataset.group;if(Number.isNaN(s))throw new TypeError(`Incorrect group ball: ${o.dataset.group}`);n(s)}),[n]);return(0,r.jsx)(w,{children:e&&(null==s?void 0:s.map((e=>(0,r.jsx)(G,{"data-group":e,forceVisible:o,onClick:l,children:(0,Z.Z)(e)},e))))})}));var P=s(3447);const y=()=>new Worker(new URL(s.p+s.u(4932),s.b)),T=()=>new Worker(new URL(s.p+s.u(106),s.b)),N=n.iv`
  background-color: ${e=>e.theme.isDarkMode?"#933":"#ffc0c0"};
`,S=n.iv`
  background-color: ${e=>e.theme.isDarkMode?"#039":"#c0e0ff"};
`;function C(e){const o=e.map((e=>a(e)));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:o[0],possibleGroups:null,possibleGroupsShuffled:null,pots:o,groups:e[0].map((()=>[]))}}const $=(0,t.memo)((function({season:e,pots:o,isFirstPotShortDraw:s}){const[n,Z]=(0,c.Z)(),[v,G]=(0,p.Z)(),[{currentPotNum:w,selectedTeam:$,pickedGroup:E,hungPot:D,possibleGroups:M,possibleGroupsShuffled:F,pots:R,groups:L},H]=(0,t.useState)((()=>C(o)));(0,t.useEffect)((()=>{H(C(o))}),[o,n]);const[,A]=(0,i.Z)(),[U]=(0,d.Z)(),W=(0,m.Z)(T),I=(0,m.Z)(y),V=(0,t.useRef)(null),q=s&&0===w,z=v||q,B=(0,t.useCallback)((e=>{if($)return;const o=R[w][e];if(!o)return;const s=R.slice();s[w]=s[w].filter(((o,s)=>s!==e)),H({currentPotNum:w,hungPot:D,selectedTeam:o,possibleGroups:M,possibleGroupsShuffled:F,pickedGroup:null,pots:s,groups:L})}),[R,L,w,D,$,M,F]),J=(0,t.useCallback)((e=>{if(!$)return void A({error:"No selected team..."});const o=L.slice();o[e]=[...o[e],$];const s=R[w].length>0?w:w+1;H({selectedTeam:null,pickedGroup:e,hungPot:R[s],possibleGroups:null,possibleGroupsShuffled:null,currentPotNum:s,pots:R,groups:o})}),[R,L,$,w,D]);(0,t.useEffect)((()=>{$&&(async()=>{if(!$)throw new Error("no selected team");let o;try{o=q?[(await W({season:e,pots:R,groups:L,selectedTeam:$})).pickedGroup]:(await I({season:e,pots:R,groups:L,selectedTeam:$})).possibleGroups}catch(e){return console.error(e),void A({error:"Could not determine the group"})}H({selectedTeam:$,pickedGroup:null,hungPot:D,currentPotNum:w,possibleGroups:o,possibleGroupsShuffled:a(o),pots:R,groups:L})})()}),[$]);const K=w>=R.length;(0,t.useEffect)((()=>{const e=null==D?void 0:D.length;if(v&&e){const o=l(e-1);B(o)}}),[v,D]),(0,t.useEffect)((()=>{if(z&&(null==F?void 0:F.length)){const e=q?Math.min(...F):u(F);J(e)}}),[z,F]),(0,t.useEffect)((()=>{K&&v&&G(!1)}),[K,v]);const O=L.length,Q=(0,t.useCallback)((e=>e<O>>1?N:S),[O]);return(0,r.jsxs)(f.Z,{children:[(0,r.jsxs)(g.Z,{children:[(0,r.jsx)(h.Z,{selectedTeams:$&&[$],initialPots:o,pots:R,currentPotNum:w}),(0,r.jsx)(b.Z,{ref:V,maxTeams:R.length,currentPotNum:w,groups:L,possibleGroups:z?null:M,getGroupHeaderStyles:Q})]}),(0,r.jsxs)(x.Z,{children:[!v&&(0,r.jsx)(k.Z,{display:!K,displayTeams:U,selectedTeam:$,pot:D,onPick:B}),(0,r.jsx)(P.Z,{long:!1,completed:K,selectedTeam:$,pickedGroup:E,possibleGroups:v?null:M,isDisplayPossibleGroupsText:!!$,numGroups:O,groupsElement:V,reset:Z}),!z&&(0,r.jsx)(j,{display:!K,displayGroups:U,possibleGroups:F,onPick:J})]})]})}))},3962:(e,o,s)=>{"use strict";s.d(o,{Z:()=>S});var r=s(85893),t=s(67294),n=s(58804),l=s(788),u=s(96026),a=s(42486),i=s(32415),c=s(23132),p=s(69585),d=s(84048),m=s(41771),f=s(58020),h=s(39548),b=s(10606),g=s(10694);const x=n.F4`
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
`,v=n.F4`
  from {
    background-color: rgba(192, 224, 255, 0.5);
  }
  to {}
`,G=n.iv`
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
    animation: ${e=>e.theme.isDarkMode?k:x} 1s ease;
    ${e=>e.theme.isDarkMode?n.iv`
      background-color: rgba(255, 255, 255, 0.3);
    `:n.iv`
      box-shadow: 0 0 5px #6af;
    `}
  }
`,w=n.iv`
  animation: ${e=>e.theme.isDarkMode?v:Z} 3s ease-out normal forwards;
`,j=(0,n.ZP)(p.Z)`
  ${e=>e.possible&&G}
  ${e=>e.picked&&w}
`;const P=(0,t.memo)((function({team:e,possible:o}){var s;const l=(0,d.Z)(e),[u,a]=(0,t.useState)(e),[i,c]=(0,t.useState)(!1),p=(0,t.useContext)(n.Ni),x=(0,t.useRef)(null),k=(0,t.useCallback)((()=>c(!1)),[]),Z=(0,t.useCallback)((()=>{a(e),c(!0)}),[e]);return(0,m.Z)((()=>{k()}),[p]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(j,{picked:i&&!!u,possible:o,onAnimationEnd:k,children:u?(0,r.jsx)(h.Z,{country:(0,f.Z)(u),children:null!==(s=u.shortName)&&void 0!==s?s:u.name}):(0,r.jsx)(b.Z,{ref:x})}),e&&e!==l&&(0,r.jsx)(g.Z,{from:`[data-cellid='${e.id}']`,to:x,duration:350,team:e,onAnimationEnd:Z})]})}));const y=(0,t.memo)((function({maxTeams:e,groupLetter:o,teams:s,potNum:t,possible:n,headerStyles:l}){return(0,r.jsxs)(a.Z,{children:[(0,r.jsx)("thead",{children:(0,r.jsx)(c.Z,{children:(0,r.jsx)(p.Z,{children:(0,r.jsxs)(i.Z,{styles:l,children:["Group"," ",o]})})})}),(0,r.jsx)("tbody",{children:u(e).map((e=>(0,r.jsx)(c.Z,{children:(0,r.jsx)(P,{team:s[e],possible:e===t&&n})},e)))})]})})),T=n.ZP.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,N=(0,t.forwardRef)((({maxTeams:e,currentPotNum:o,groups:s,possibleGroups:t,getGroupHeaderStyles:n},u)=>(0,r.jsx)(T,{ref:u,children:null==s?void 0:s.map(((s,u)=>{const a=(0,l.Z)(u),i=null==n?void 0:n(u);return(0,r.jsx)(y,{maxTeams:e,groupLetter:a,teams:s,potNum:o,possible:!!(null==t?void 0:t.includes(u)),headerStyles:i},a)}))}))),S=(0,t.memo)(N)}}]);