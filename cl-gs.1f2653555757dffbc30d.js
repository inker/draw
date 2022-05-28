(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[1739],{94311:(e,s,o)=>{var r=o(69877);e.exports=function(e){var s=e.length;return s?e[r(0,s-1)]:void 0}},84992:(e,s,o)=>{var r=o(94311),t=o(52628);e.exports=function(e){return r(t(e))}},95534:(e,s,o)=>{var r=o(94311),t=o(84992),n=o(1469);e.exports=function(e){return(n(e)?r:t)(e)}},52409:(e,s,o)=>{"use strict";o.r(s),o.d(s,{default:()=>$});var r=o(85893),t=o(67294),n=o(58804),l=o(83608),u=o(95534),a=o(69983),i=o(61790),c=o(57111),p=o(43432),d=o(58231),m=o(83266),f=o(85973),h=o(62367),b=o(3962),g=o(36756),x=o(90604),k=o(55020),Z=o(788),G=o(10804);const w=(0,n.ZP)(G.Z)`
  &:hover {
    ${e=>!e.noHover&&"background: radial-gradient(#ccf, #ccf)"}
  }
`,j=n.ZP.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 999px) {
    justify-content: center;
  }
`;const v=(0,t.memo)((function({display:e,displayGroups:s,possibleGroups:o,onPick:n}){const l=(0,t.useCallback)((e=>{const s=e.target,o=+s.dataset.group;if(Number.isNaN(o))throw new TypeError(`Incorrect group ball: ${s.dataset.group}`);n(o)}),[n]);return(0,r.jsx)(j,{children:e&&o?.map((e=>(0,r.jsx)(w,{"data-group":e,forceVisible:s,onClick:l,children:(0,Z.Z)(e)},e)))})}));var P=o(3447);const y=()=>new Worker(new URL(o.p+o.u(4932),o.b)),T=()=>new Worker(new URL(o.p+o.u(106),o.b)),N=n.iv`
  background-color: ${e=>e.theme.isDarkMode?"#933":"#ffc0c0"};
`,S=n.iv`
  background-color: ${e=>e.theme.isDarkMode?"#039":"#c0e0ff"};
`;function C(e){const s=e.map((e=>a(e)));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:s[0],possibleGroups:null,possibleGroupsShuffled:null,pots:s,groups:e[0].map((()=>[]))}}const $=(0,t.memo)((function({season:e,pots:s,isFirstPotShortDraw:o}){const[n,Z]=(0,c.Z)(),[G,w]=(0,p.Z)(),[{currentPotNum:j,selectedTeam:$,pickedGroup:E,hungPot:D,possibleGroups:M,possibleGroupsShuffled:F,pots:R,groups:L},H]=(0,t.useState)((()=>C(s)));(0,t.useEffect)((()=>{H(C(s))}),[s,n]);const[,A]=(0,i.Z)(),[U]=(0,d.Z)(),W=(0,m.Z)(T),I=(0,m.Z)(y),V=(0,t.useRef)(null),q=o&&0===j,z=G||q,B=(0,t.useCallback)((e=>{if($)return;const s=R[j][e];if(!s)return;const o=R.slice();o[j]=o[j].filter(((s,o)=>o!==e)),H({currentPotNum:j,hungPot:D,selectedTeam:s,possibleGroups:M,possibleGroupsShuffled:F,pickedGroup:null,pots:o,groups:L})}),[R,L,j,D,$,M,F]),J=(0,t.useCallback)((e=>{if(!$)return void A({error:"No selected team..."});const s=L.slice();s[e]=[...s[e],$];const o=R[j].length>0?j:j+1;H({selectedTeam:null,pickedGroup:e,hungPot:R[o],possibleGroups:null,possibleGroupsShuffled:null,currentPotNum:o,pots:R,groups:s})}),[R,L,$,j,D]);(0,t.useEffect)((()=>{$&&(async()=>{if(!$)throw new Error("no selected team");let s;try{s=q?[(await W({season:e,pots:R,groups:L,selectedTeam:$})).pickedGroup]:(await I({season:e,pots:R,groups:L,selectedTeam:$})).possibleGroups}catch(e){return console.error(e),void A({error:"Could not determine the group"})}H({selectedTeam:$,pickedGroup:null,hungPot:D,currentPotNum:j,possibleGroups:s,possibleGroupsShuffled:a(s),pots:R,groups:L})})()}),[$]);const K=j>=R.length;(0,t.useEffect)((()=>{const e=D?.length;if(G&&e){const s=l(e-1);B(s)}}),[G,D]),(0,t.useEffect)((()=>{if(z&&F?.length){const e=q?Math.min(...F):u(F);J(e)}}),[z,F]),(0,t.useEffect)((()=>{K&&G&&w(!1)}),[K,G]);const O=L.length,Q=(0,t.useCallback)((e=>e<O>>1?N:S),[O]);return(0,r.jsxs)(f.Z,{children:[(0,r.jsxs)(g.Z,{children:[(0,r.jsx)(h.Z,{selectedTeams:$&&[$],initialPots:s,pots:R,currentPotNum:j}),(0,r.jsx)(b.Z,{ref:V,maxTeams:R.length,currentPotNum:j,groups:L,possibleGroups:z?null:M,getGroupHeaderStyles:Q})]}),(0,r.jsxs)(x.Z,{children:[!G&&(0,r.jsx)(k.Z,{display:!K,displayTeams:U,selectedTeam:$,pot:D,onPick:B}),(0,r.jsx)(P.Z,{long:!1,completed:K,selectedTeam:$,pickedGroup:E,possibleGroups:G?null:M,isDisplayPossibleGroupsText:!!$,numGroups:O,groupsElement:V,reset:Z}),!z&&(0,r.jsx)(v,{display:!K,displayGroups:U,possibleGroups:F,onPick:J})]})]})}))},3962:(e,s,o)=>{"use strict";o.d(s,{Z:()=>S});var r=o(85893),t=o(67294),n=o(58804),l=o(788),u=o(96026),a=o(42486),i=o(32415),c=o(23132),p=o(69585),d=o(84048),m=o(41771),f=o(58020),h=o(39548),b=o(10606),g=o(10694);const x=n.F4`
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
`,G=n.F4`
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
    animation: ${e=>e.theme.isDarkMode?k:x} 1s ease;
    ${e=>e.theme.isDarkMode?n.iv`
      background-color: rgb(255 255 255 / 0.3);
    `:n.iv`
      box-shadow: 0 0 5px #6af;
    `}
  }
`,j=n.iv`
  animation: ${e=>e.theme.isDarkMode?G:Z} 3s ease-out normal forwards;
`,v=(0,n.ZP)(p.Z)`
  ${e=>e.possible&&w}
  ${e=>e.picked&&j}
`;const P=(0,t.memo)((function({team:e,possible:s}){const o=(0,d.Z)(e),[l,u]=(0,t.useState)(e),[a,i]=(0,t.useState)(!1),c=(0,t.useContext)(n.Ni),p=(0,t.useRef)(null),x=(0,t.useCallback)((()=>i(!1)),[]),k=(0,t.useCallback)((()=>{u(e),i(!0)}),[e]);return(0,m.Z)((()=>{x()}),[c]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(v,{picked:a&&!!l,possible:s,onAnimationEnd:x,children:l?(0,r.jsx)(h.Z,{country:(0,f.Z)(l),children:l.shortName??l.name}):(0,r.jsx)(b.Z,{ref:p})}),e&&e!==o&&(0,r.jsx)(g.Z,{from:`[data-cellid='${e.id}']`,to:p,duration:350,team:e,onAnimationEnd:k})]})}));const y=(0,t.memo)((function({maxTeams:e,groupLetter:s,teams:o,potNum:t,possible:n,headerStyles:l}){return(0,r.jsxs)(a.Z,{children:[(0,r.jsx)("thead",{children:(0,r.jsx)(c.Z,{children:(0,r.jsx)(p.Z,{children:(0,r.jsxs)(i.Z,{styles:l,children:["Group"," ",s]})})})}),(0,r.jsx)("tbody",{children:u(e).map((e=>(0,r.jsx)(c.Z,{children:(0,r.jsx)(P,{team:o[e],possible:e===t&&n})},e)))})]})})),T=n.ZP.div`
  display: flex;
  flex-flow: row wrap;

  > * {
    flex: 1;
    flex-basis: 22%;
  }
`,N=(0,t.forwardRef)((({maxTeams:e,currentPotNum:s,groups:o,possibleGroups:t,getGroupHeaderStyles:n},u)=>(0,r.jsx)(T,{ref:u,children:o?.map(((o,u)=>{const a=(0,l.Z)(u),i=n?.(u);return(0,r.jsx)(y,{maxTeams:e,groupLetter:a,teams:o,potNum:s,possible:!!t?.includes(u),headerStyles:i},a)}))}))),S=(0,t.memo)(N)}}]);