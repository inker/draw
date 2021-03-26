(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[1739,2794],{94311:(e,o,s)=>{var r=s(69877);e.exports=function(e){var o=e.length;return o?e[r(0,o-1)]:void 0}},84992:(e,o,s)=>{var r=s(94311),t=s(52628);e.exports=function(e){return r(t(e))}},95534:(e,o,s)=>{var r=s(94311),t=s(84992),l=s(1469);e.exports=function(e){return(l(e)?r:t)(e)}},82658:(e,o,s)=>{"use strict";s.r(o),s.d(o,{default:()=>C});var r=s(85893),t=s(67294),l=s(29163),i=s(83608),n=s(95534),u=s(69983),a=s(47810),c=s(54198),d=s(53998),p=s(31173),m=s(43887),f=s(31080),b=s(1245),h=s(55602),g=s(48415),v=s(92317),x=s(12414),k=s(80737),j=s(53565);const Z=(0,l.ZP)(j.Z)`
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
`,w=(0,t.memo)((({display:e,displayGroups:o,possibleGroups:s,onPick:l})=>{const i=(0,t.useCallback)((e=>{const o=e.target,s=+o.dataset.group;if(Number.isNaN(s))throw new TypeError(`Incorrect group ball: ${o.dataset.group}`);l(s)}),[l]);return(0,r.jsx)(G,{children:e&&(null==s?void 0:s.map((e=>(0,r.jsx)(Z,Object.assign({"data-group":e,forceVisible:o,onClick:i},{children:(0,k.Z)(e)}),e))))},void 0)}));var P=s(45033),y=s(91945);const N=l.iv`
  background-color: ${e=>e.theme.isDarkMode?"#933":"#ffc0c0"};
`,T=l.iv`
  background-color: ${e=>e.theme.isDarkMode?"#039":"#c0e0ff"};
`;function S(e){const o=e.map((e=>u(e)));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:o[0],possibleGroups:null,possibleGroupsShuffled:null,pots:o,groups:e[0].map((()=>[]))}}const C=(0,t.memo)((({season:e,pots:o})=>{const[s,l]=(0,c.Z)(),[k,j]=(0,d.Z)(),[{currentPotNum:Z,selectedTeam:G,pickedGroup:C,hungPot:E,possibleGroups:$,possibleGroupsShuffled:D,pots:F,groups:M},O]=(0,t.useState)((()=>S(o)));(0,t.useEffect)((()=>{O(S(o))}),[o,s]);const[,H]=(0,a.Z)(),[R]=(0,p.Z)(),A=(0,m.Z)(y.default),L=(0,t.useRef)(null),I=(0,t.useCallback)((e=>{if(G)return;const o=F[Z][e];if(!o)return;const s=F.slice();s[Z]=s[Z].filter(((o,s)=>s!==e)),O({currentPotNum:Z,hungPot:E,selectedTeam:o,possibleGroups:$,possibleGroupsShuffled:D,pickedGroup:null,pots:s,groups:M})}),[F,M,Z,E,G,$,D]),V=(0,t.useCallback)((e=>{if(!G)return void H({error:"No selected team..."});const o=M.slice();o[e]=[...o[e],G];const s=F[Z].length>0?Z:Z+1;O({selectedTeam:null,pickedGroup:e,hungPot:F[s],possibleGroups:null,possibleGroupsShuffled:null,currentPotNum:s,pots:F,groups:o})}),[F,M,G,Z,E]);(0,t.useEffect)((()=>{G&&(async()=>{if(!G)throw new Error("no selected team");let o;try{o=(await A({season:e,pots:F,groups:M,selectedTeam:G})).possibleGroups}catch(e){return console.error(e),void H({error:"Could not determine the group"})}O({selectedTeam:G,pickedGroup:null,hungPot:E,currentPotNum:Z,possibleGroups:o,possibleGroupsShuffled:u(o),pots:F,groups:M})})()}),[G]);const W=Z>=F.length;(0,t.useEffect)((()=>{const e=null==E?void 0:E.length;if(k&&e){const o=i(e-1);I(o)}}),[k,E]),(0,t.useEffect)((()=>{if(k&&(null==D?void 0:D.length)){const e=n(D);V(e)}}),[k,D]),(0,t.useEffect)((()=>{W&&k&&j(!1)}),[W,k]);const q=M.length,z=(0,t.useCallback)((e=>e<q>>1?N:T),[q]);return(0,r.jsxs)(f.Z,{children:[(0,r.jsxs)(g.Z,{children:[(0,r.jsx)(b.Z,{selectedTeams:G&&[G],initialPots:o,pots:F,currentPotNum:Z},void 0),(0,r.jsx)(h.Z,{ref:L,maxTeams:F.length,currentPotNum:Z,groups:M,possibleGroups:k?null:$,getGroupHeaderStyles:z},void 0)]},void 0),(0,r.jsxs)(v.Z,{children:[!k&&(0,r.jsx)(x.Z,{display:!W,displayTeams:R,selectedTeam:G,pot:E,onPick:I},void 0),(0,r.jsx)(P.Z,{long:!1,completed:W,selectedTeam:G,pickedGroup:C,possibleGroups:$,isDisplayPossibleGroupsText:!!G,numGroups:q,groupsElement:L,reset:l},void 0),!k&&(0,r.jsx)(w,{display:!W,displayGroups:R,possibleGroups:D,onPick:V},void 0)]},void 0)]},void 0)}))},55602:(e,o,s)=>{"use strict";s.d(o,{Z:()=>S});var r=s(85893),t=s(67294),l=s(29163),i=s(80737),n=s(96026),u=s(42048),a=s(13963),c=s(68398),d=s(24729),p=s(72935),m=s(86893),f=s(64982),b=s(930),h=s(93749),g=s(19992);const v=l.F4`
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
`,j=l.F4`
  from {
    background-color: rgba(192, 224, 255, 0.5);
  }
  to {}
`,Z=l.iv`
  position: relative; /* enables glow */
  animation: ${e=>e.theme.isDarkMode?x:v} 1s ease;
  ${e=>e.theme.isDarkMode?l.iv`
    background-color: rgba(255, 255, 255, 0.3);
  `:l.iv`
    box-shadow: 0 0 5px #6af;
  `}
`,G=l.iv`
  animation: ${e=>e.theme.isDarkMode?j:k} 3s ease-out normal forwards;
`,w=(0,l.ZP)(d.Z)`
  ${e=>e.possible&&Z}
  ${e=>e.picked&&G}
`,P=(0,t.memo)((({team:e,possible:o})=>{var s;const i=(0,p.Z)(e),[n,u]=(0,t.useState)(e),[a,c]=(0,t.useState)(!1),d=(0,t.useContext)(l.Ni),v=(0,t.useRef)(null),x=(0,t.useCallback)((()=>c(!1)),[]),k=(0,t.useCallback)((()=>{u(e),c(!0)}),[e]);return(0,m.Z)((()=>{x()}),[d]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(w,Object.assign({picked:a&&!!n,possible:o,onAnimationEnd:x},{children:n?(0,r.jsx)(b.Z,Object.assign({country:(0,f.Z)(n)},{children:null!==(s=n.shortName)&&void 0!==s?s:n.name}),void 0):(0,r.jsx)(h.Z,{ref:v},void 0)}),void 0),e&&e!==i&&(0,r.jsx)(g.Z,{from:`[data-cellid='${e.id}']`,to:v,duration:350,team:e,onAnimationEnd:k},void 0)]},void 0)})),y=(0,t.memo)((({maxTeams:e,groupLetter:o,teams:s,potNum:t,possible:l,headerStyles:i})=>(0,r.jsxs)(u.Z,{children:[(0,r.jsx)("thead",{children:(0,r.jsx)(c.Z,{children:(0,r.jsx)(d.Z,{children:(0,r.jsxs)(a.Z,Object.assign({styles:i},{children:["Group"," ",o]}),void 0)},void 0)},void 0)},void 0),(0,r.jsx)("tbody",{children:n(e).map((e=>(0,r.jsx)(c.Z,{children:(0,r.jsx)(P,{team:s[e],possible:e===t&&l},void 0)},e)))},void 0)]},void 0))),N=l.ZP.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,T=(0,t.forwardRef)((({maxTeams:e,currentPotNum:o,groups:s,possibleGroups:t,getGroupHeaderStyles:l},n)=>(0,r.jsx)(N,Object.assign({ref:n},{children:null==s?void 0:s.map(((s,n)=>{const u=(0,i.Z)(n),a=null==l?void 0:l(n);return(0,r.jsx)(y,{maxTeams:e,groupLetter:u,teams:s,potNum:o,possible:!!(null==t?void 0:t.includes(n)),headerStyles:a},u)}))}),void 0))),S=(0,t.memo)(T)},91945:(e,o,s)=>{"use strict";function r(){return new Worker(s.p+"workers/worker.e8f6e82af97b29436b4f.js")}s.r(o),s.d(o,{default:()=>r})}}]);