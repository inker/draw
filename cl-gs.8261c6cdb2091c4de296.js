(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[1739],{94311:(e,s,o)=>{var r=o(69877);e.exports=function(e){var s=e.length;return s?e[r(0,s-1)]:void 0}},84992:(e,s,o)=>{var r=o(94311),t=o(52628);e.exports=function(e){return r(t(e))}},95534:(e,s,o)=>{var r=o(94311),t=o(84992),n=o(1469);e.exports=function(e){return(n(e)?r:t)(e)}},52409:(e,s,o)=>{"use strict";o.r(s),o.d(s,{default:()=>M});var r=o(85893),t=o(67294),n=o(12788),l=o(83608),u=o.n(l),a=o(95534),i=o.n(a),c=o(69983),p=o.n(c),d=o(61790),m=o(57111),f=o(43432),h=o(58231),b=o(83266),g=o(85973),x=o(62367),k=o(3962),Z=o(36756),G=o(90604),w=o(55020),j=o(788),v=o(10804);const P=(0,n.ZP)(v.Z)`
  &:hover {
    ${e=>!e.noHover&&"background: radial-gradient(#ccf, #ccf)"}
  }
`,y=n.ZP.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 999px) {
    justify-content: center;
  }
`;const T=(0,t.memo)((function({display:e,displayGroups:s,possibleGroups:o,onPick:n}){const l=(0,t.useCallback)((e=>{const s=e.target,o=+s.dataset.group;if(Number.isNaN(o))throw new TypeError(`Incorrect group ball: ${s.dataset.group}`);n(o)}),[n]);return(0,r.jsx)(y,{children:e&&o?.map((e=>(0,r.jsx)(P,{"data-group":e,forceVisible:s,onClick:l,children:(0,j.Z)(e)},e)))})}));var N=o(3447);const S=()=>new Worker(new URL(o.p+o.u(4932),o.b)),C=()=>new Worker(new URL(o.p+o.u(106),o.b)),$=n.iv`
  background-color: ${e=>e.theme.isDarkMode?"#933":"#ffc0c0"};
`,E=n.iv`
  background-color: ${e=>e.theme.isDarkMode?"#039":"#c0e0ff"};
`;function D(e){const s=e.map((e=>p()(e)));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:s[0],possibleGroups:null,possibleGroupsShuffled:null,pots:s,groups:e[0].map((()=>[]))}}const M=(0,t.memo)((function({season:e,pots:s,isFirstPotShortDraw:o}){const[n,l]=(0,m.Z)(),[a,c]=(0,f.Z)(),[{currentPotNum:j,selectedTeam:v,pickedGroup:P,hungPot:y,possibleGroups:M,possibleGroupsShuffled:F,pots:R,groups:L},H]=(0,t.useState)((()=>D(s)));(0,t.useEffect)((()=>{H(D(s))}),[s,n]);const[,A]=(0,d.Z)(),[U]=(0,h.Z)(),W=(0,b.Z)(C),I=(0,b.Z)(S),V=(0,t.useRef)(null),q=o&&0===j,z=a||q,B=(0,t.useCallback)((e=>{if(v)return;const s=R[j][e];if(!s)return;const o=R.slice();o[j]=o[j].filter(((s,o)=>o!==e)),H({currentPotNum:j,hungPot:y,selectedTeam:s,possibleGroups:M,possibleGroupsShuffled:F,pickedGroup:null,pots:o,groups:L})}),[R,L,j,y,v,M,F]),J=(0,t.useCallback)((e=>{if(!v)return void A({error:"No selected team..."});const s=L.slice();s[e]=[...s[e],v];const o=R[j].length>0?j:j+1;H({selectedTeam:null,pickedGroup:e,hungPot:R[o],possibleGroups:null,possibleGroupsShuffled:null,currentPotNum:o,pots:R,groups:s})}),[R,L,v,j,y]);(0,t.useEffect)((()=>{v&&(async()=>{if(!v)throw new Error("no selected team");let s;try{s=q?[(await W({season:e,pots:R,groups:L,selectedTeam:v})).pickedGroup]:(await I({season:e,pots:R,groups:L,selectedTeam:v})).possibleGroups}catch(e){return console.error(e),void A({error:"Could not determine the group"})}H({selectedTeam:v,pickedGroup:null,hungPot:y,currentPotNum:j,possibleGroups:s,possibleGroupsShuffled:p()(s),pots:R,groups:L})})()}),[v]);const K=j>=R.length;(0,t.useEffect)((()=>{const e=y?.length;if(a&&e){const s=u()(e-1);B(s)}}),[a,y]),(0,t.useEffect)((()=>{if(z&&F?.length){const e=q?Math.min(...F):i()(F);J(e)}}),[z,F]),(0,t.useEffect)((()=>{K&&a&&c(!1)}),[K,a]);const O=L.length,Q=(0,t.useCallback)((e=>e<O>>1?$:E),[O]);return(0,r.jsxs)(g.Z,{children:[(0,r.jsxs)(Z.Z,{children:[(0,r.jsx)(x.Z,{selectedTeams:v&&[v],initialPots:s,pots:R,currentPotNum:j}),(0,r.jsx)(k.Z,{ref:V,maxTeams:R.length,currentPotNum:j,groups:L,possibleGroups:z?null:M,getGroupHeaderStyles:Q})]}),(0,r.jsxs)(G.Z,{children:[!a&&(0,r.jsx)(w.Z,{display:!K,displayTeams:U,selectedTeam:v,pot:y,onPick:B}),(0,r.jsx)(N.Z,{long:!1,completed:K,selectedTeam:v,pickedGroup:P,possibleGroups:a?null:M,isDisplayPossibleGroupsText:!!v,numGroups:O,groupsElement:V,reset:l}),!z&&(0,r.jsx)(T,{display:!K,displayGroups:U,possibleGroups:F,onPick:J})]})]})}))},3962:(e,s,o)=>{"use strict";o.d(s,{Z:()=>C});var r=o(85893),t=o(67294),n=o(12788),l=o(788),u=o(96026),a=o.n(u),i=o(42486),c=o(32415),p=o(23132),d=o(69585),m=o(84048),f=o(41771),h=o(58020),b=o(39548),g=o(10606),x=o(78893);const k=n.F4`
  from {
    box-shadow: 0 0 20px #08f;
  }
`,Z=n.F4`
  from {
    background-color: rgb(255 255 255 / 0.5);
  }
`,G=n.F4`
  from {
    background-color: rgb(255 255 0 / 0.5);
  }
`,w=n.F4`
  from {
    background-color: rgb(192 224 255 / 0.5);
  }
`,j=n.iv`
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
`,v=n.iv`
  animation: ${e=>e.theme.isDarkMode?w:G} 3s ease-out normal forwards;
`,P=(0,n.ZP)(d.Z)`
  ${e=>e.possible&&j}
  ${e=>e.picked&&v}
`;const y=(0,t.memo)((function({team:e,possible:s}){const o=(0,m.Z)(e),[l,u]=(0,t.useState)(e),[a,i]=(0,t.useState)(!1),c=(0,t.useContext)(n.Ni),p=(0,t.useRef)(null),d=(0,t.useCallback)((()=>i(!1)),[]),k=(0,t.useCallback)((()=>{u(e),i(!0)}),[e]);return(0,f.Z)((()=>{d()}),[c]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(P,{picked:a&&!!l,possible:s,onAnimationEnd:d,children:l?(0,r.jsx)(b.Z,{country:(0,h.Z)(l),children:l.shortName??l.name}):(0,r.jsx)(g.Z,{ref:p})}),e&&e!==o&&(0,r.jsx)(x.Z,{from:`[data-cellid='${e.id}']`,to:p,duration:350,team:e,onAnimationEnd:k})]})}));const T=(0,t.memo)((function({maxTeams:e,groupLetter:s,teams:o,potNum:t,possible:n,headerStyles:l}){return(0,r.jsxs)(i.Z,{children:[(0,r.jsx)("thead",{children:(0,r.jsx)(p.Z,{children:(0,r.jsx)(d.Z,{children:(0,r.jsxs)(c.Z,{styles:l,children:["Group"," ",s]})})})}),(0,r.jsx)("tbody",{children:a()(e).map((e=>(0,r.jsx)(p.Z,{children:(0,r.jsx)(y,{team:o[e],possible:e===t&&n})},e)))})]})})),N=n.ZP.div`
  display: flex;
  flex-flow: row wrap;

  > * {
    flex: 1;
    flex-basis: 22%;
  }
`,S=(0,t.forwardRef)((({maxTeams:e,currentPotNum:s,groups:o,possibleGroups:t,getGroupHeaderStyles:n},u)=>(0,r.jsx)(N,{ref:u,children:o?.map(((o,u)=>{const a=(0,l.Z)(u),i=n?.(u);return(0,r.jsx)(T,{maxTeams:e,groupLetter:a,teams:o,potNum:s,possible:!!t?.includes(u),headerStyles:i},a)}))}))),C=(0,t.memo)(S)}}]);