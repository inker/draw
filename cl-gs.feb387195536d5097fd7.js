(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[1739],{94311:(e,o,s)=>{var r=s(69877);e.exports=function(e){var o=e.length;return o?e[r(0,o-1)]:void 0}},84992:(e,o,s)=>{var r=s(94311),t=s(52628);e.exports=function(e){return r(t(e))}},95534:(e,o,s)=>{var r=s(94311),t=s(84992),l=s(1469);e.exports=function(e){return(l(e)?r:t)(e)}},52409:(e,o,s)=>{"use strict";s.r(o),s.d(o,{default:()=>C});var r=s(85893),t=s(67294),l=s(29163),i=s(83608),n=s(95534),u=s(69983),a=s(61790),c=s(57111),d=s(43432),p=s(58231),m=s(83266),f=s(85973),b=s(62367),h=s(3962),g=s(36756),v=s(90604),x=s(55020),k=s(788),Z=s(10804);const j=(0,l.ZP)(Z.Z)`
  &:hover {
    ${e=>!e.noHover&&"background: radial-gradient(#ccf, #ccf)"}
  }
`,G=l.ZP.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 999px) {
    justify-content: center;
  }
`,w=(0,t.memo)((({display:e,displayGroups:o,possibleGroups:s,onPick:l})=>{const i=(0,t.useCallback)((e=>{const o=e.target,s=+o.dataset.group;if(Number.isNaN(s))throw new TypeError(`Incorrect group ball: ${o.dataset.group}`);l(s)}),[l]);return(0,r.jsx)(G,{children:e&&(null==s?void 0:s.map((e=>(0,r.jsx)(j,Object.assign({"data-group":e,forceVisible:o,onClick:i},{children:(0,k.Z)(e)}),e))))},void 0)}));var P=s(3447);const y=()=>new Worker(new URL(s.p+s.u(8502),s.b)),N=l.iv`
  background-color: ${e=>e.theme.isDarkMode?"#933":"#ffc0c0"};
`,T=l.iv`
  background-color: ${e=>e.theme.isDarkMode?"#039":"#c0e0ff"};
`;function S(e){const o=e.map((e=>u(e)));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:o[0],possibleGroups:null,possibleGroupsShuffled:null,pots:o,groups:e[0].map((()=>[]))}}const C=(0,t.memo)((({season:e,pots:o})=>{const[s,l]=(0,c.Z)(),[k,Z]=(0,d.Z)(),[{currentPotNum:j,selectedTeam:G,pickedGroup:C,hungPot:$,possibleGroups:E,possibleGroupsShuffled:D,pots:M,groups:F},O]=(0,t.useState)((()=>S(o)));(0,t.useEffect)((()=>{O(S(o))}),[o,s]);const[,R]=(0,a.Z)(),[H]=(0,p.Z)(),L=(0,m.Z)(y),A=(0,t.useRef)(null),I=(0,t.useCallback)((e=>{if(G)return;const o=M[j][e];if(!o)return;const s=M.slice();s[j]=s[j].filter(((o,s)=>s!==e)),O({currentPotNum:j,hungPot:$,selectedTeam:o,possibleGroups:E,possibleGroupsShuffled:D,pickedGroup:null,pots:s,groups:F})}),[M,F,j,$,G,E,D]),U=(0,t.useCallback)((e=>{if(!G)return void R({error:"No selected team..."});const o=F.slice();o[e]=[...o[e],G];const s=M[j].length>0?j:j+1;O({selectedTeam:null,pickedGroup:e,hungPot:M[s],possibleGroups:null,possibleGroupsShuffled:null,currentPotNum:s,pots:M,groups:o})}),[M,F,G,j,$]);(0,t.useEffect)((()=>{G&&(async()=>{if(!G)throw new Error("no selected team");let o;try{o=(await L({season:e,pots:M,groups:F,selectedTeam:G})).possibleGroups}catch(e){return console.error(e),void R({error:"Could not determine the group"})}O({selectedTeam:G,pickedGroup:null,hungPot:$,currentPotNum:j,possibleGroups:o,possibleGroupsShuffled:u(o),pots:M,groups:F})})()}),[G]);const V=j>=M.length;(0,t.useEffect)((()=>{const e=null==$?void 0:$.length;if(k&&e){const o=i(e-1);I(o)}}),[k,$]),(0,t.useEffect)((()=>{if(k&&(null==D?void 0:D.length)){const e=n(D);U(e)}}),[k,D]),(0,t.useEffect)((()=>{V&&k&&Z(!1)}),[V,k]);const W=F.length,q=(0,t.useCallback)((e=>e<W>>1?N:T),[W]);return(0,r.jsxs)(f.Z,{children:[(0,r.jsxs)(g.Z,{children:[(0,r.jsx)(b.Z,{selectedTeams:G&&[G],initialPots:o,pots:M,currentPotNum:j},void 0),(0,r.jsx)(h.Z,{ref:A,maxTeams:M.length,currentPotNum:j,groups:F,possibleGroups:k?null:E,getGroupHeaderStyles:q},void 0)]},void 0),(0,r.jsxs)(v.Z,{children:[!k&&(0,r.jsx)(x.Z,{display:!V,displayTeams:H,selectedTeam:G,pot:$,onPick:I},void 0),(0,r.jsx)(P.Z,{long:!1,completed:V,selectedTeam:G,pickedGroup:C,possibleGroups:E,isDisplayPossibleGroupsText:!!G,numGroups:W,groupsElement:A,reset:l},void 0),!k&&(0,r.jsx)(w,{display:!V,displayGroups:H,possibleGroups:D,onPick:U},void 0)]},void 0)]},void 0)}))},3962:(e,o,s)=>{"use strict";s.d(o,{Z:()=>S});var r=s(85893),t=s(67294),l=s(29163),i=s(788),n=s(96026),u=s(42486),a=s(32415),c=s(23132),d=s(69585),p=s(84048),m=s(41771),f=s(58020),b=s(39548),h=s(10606),g=s(10694);const v=l.F4`
  from {
    box-shadow: 0 0 20px #08f;
  }
  to {}
`,x=l.F4`
  from {
    background-color: rgba(255, 255, 255, 0.5);
  }
  to {}
`,k=l.F4`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,Z=l.F4`
  from {
    background-color: rgba(192, 224, 255, 0.5);
  }
  to {}
`,j=l.iv`
  position: relative; /* enables glow */
  ${e=>e.theme.isDarkMode?l.iv`
    background-color: rgba(255, 255, 255, 0.3);
  `:l.iv`
    box-shadow: 0 0 5px #6af;
  `}

  &::before {
    content: '';
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    animation: ${e=>e.theme.isDarkMode?x:v} 1s ease;
    ${e=>e.theme.isDarkMode?l.iv`
      background-color: rgba(255, 255, 255, 0.3);
    `:l.iv`
      box-shadow: 0 0 5px #6af;
    `}
  }
`,G=l.iv`
  animation: ${e=>e.theme.isDarkMode?Z:k} 3s ease-out normal forwards;
`,w=(0,l.ZP)(d.Z)`
  ${e=>e.possible&&j}
  ${e=>e.picked&&G}
`,P=(0,t.memo)((({team:e,possible:o})=>{var s;const i=(0,p.Z)(e),[n,u]=(0,t.useState)(e),[a,c]=(0,t.useState)(!1),d=(0,t.useContext)(l.Ni),v=(0,t.useRef)(null),x=(0,t.useCallback)((()=>c(!1)),[]),k=(0,t.useCallback)((()=>{u(e),c(!0)}),[e]);return(0,m.Z)((()=>{x()}),[d]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(w,Object.assign({picked:a&&!!n,possible:o,onAnimationEnd:x},{children:n?(0,r.jsx)(b.Z,Object.assign({country:(0,f.Z)(n)},{children:null!==(s=n.shortName)&&void 0!==s?s:n.name}),void 0):(0,r.jsx)(h.Z,{ref:v},void 0)}),void 0),e&&e!==i&&(0,r.jsx)(g.Z,{from:`[data-cellid='${e.id}']`,to:v,duration:350,team:e,onAnimationEnd:k},void 0)]},void 0)})),y=(0,t.memo)((({maxTeams:e,groupLetter:o,teams:s,potNum:t,possible:l,headerStyles:i})=>(0,r.jsxs)(u.Z,{children:[(0,r.jsx)("thead",{children:(0,r.jsx)(c.Z,{children:(0,r.jsx)(d.Z,{children:(0,r.jsxs)(a.Z,Object.assign({styles:i},{children:["Group"," ",o]}),void 0)},void 0)},void 0)},void 0),(0,r.jsx)("tbody",{children:n(e).map((e=>(0,r.jsx)(c.Z,{children:(0,r.jsx)(P,{team:s[e],possible:e===t&&l},void 0)},e)))},void 0)]},void 0))),N=l.ZP.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,T=(0,t.forwardRef)((({maxTeams:e,currentPotNum:o,groups:s,possibleGroups:t,getGroupHeaderStyles:l},n)=>(0,r.jsx)(N,Object.assign({ref:n},{children:null==s?void 0:s.map(((s,n)=>{const u=(0,i.Z)(n),a=null==l?void 0:l(n);return(0,r.jsx)(y,{maxTeams:e,groupLetter:u,teams:s,potNum:o,possible:!!(null==t?void 0:t.includes(n)),headerStyles:a},u)}))}),void 0))),S=(0,t.memo)(T)}}]);