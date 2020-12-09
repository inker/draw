(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[1739,2794],{94311:(e,t,o)=>{var r=o(69877);e.exports=function(e){var t=e.length;return t?e[r(0,t-1)]:void 0}},84992:(e,t,o)=>{var r=o(94311),s=o(52628);e.exports=function(e){return r(s(e))}},95534:(e,t,o)=>{var r=o(94311),s=o(84992),l=o(1469);e.exports=function(e){return(l(e)?r:s)(e)}},82658:(e,t,o)=>{"use strict";o.r(t),o.d(t,{default:()=>S});var r=o(67294),s=o(29163),l=o(83608),n=o(95534),a=o(69983),u=o(47810),c=o(54198),i=o(53998),p=o(31173),m=o(43887),d=o(31080),f=o(1245),b=o(55602),g=o(48415),k=o(92317),h=o(12414),E=o(80737),Z=o(53565);const v=(0,s.ZP)(Z.Z)`
  &:hover {
    ${e=>!e.noHover&&"background: radial-gradient(#ccf, #ccf)"};
  }
`,G=s.ZP.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 999px) {
    justify-content: center;
  }
`,w=(0,r.memo)((({display:e,displayGroups:t,possibleGroups:o,onPick:s})=>{const l=(0,r.useCallback)((e=>{const t=e.target,o=+t.dataset.group;if(Number.isNaN(o))throw new TypeError("Incorrect group ball: "+t.dataset.group);s(o)}),[s]);return r.createElement(G,null,e&&(null==o?void 0:o.map((e=>r.createElement(v,{key:e,"data-group":e,forceVisible:t,onClick:l},(0,E.Z)(e))))))}));var y=o(45033),P=o(91945);const x=s.iv`
  background-color: ${e=>e.theme.isDarkMode?"#933":"#ffc0c0"};
`,N=s.iv`
  background-color: ${e=>e.theme.isDarkMode?"#039":"#c0e0ff"};
`;function T(e){const t=e.map((e=>a(e)));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:t[0],possibleGroups:null,possibleGroupsShuffled:null,pots:t,groups:e[0].map((()=>[]))}}const S=(0,r.memo)((({season:e,pots:t})=>{const[o,s]=(0,c.Z)(),[E,Z]=(0,i.Z)(),[{currentPotNum:v,selectedTeam:G,pickedGroup:S,hungPot:C,possibleGroups:$,possibleGroupsShuffled:D,pots:F,groups:M},H]=(0,r.useState)((()=>T(t)));(0,r.useEffect)((()=>{H(T(t))}),[t,o]);const[,R]=(0,u.Z)(),[j]=(0,p.Z)(),A=(0,m.Z)(P.default),L=(0,r.useRef)(null),I=(0,r.useCallback)((e=>{if(G)return;const t=F[v][e];if(!t)return;const o=F.slice();o[v]=o[v].filter(((t,o)=>o!==e)),H({currentPotNum:v,hungPot:C,selectedTeam:t,possibleGroups:$,possibleGroupsShuffled:D,pickedGroup:null,pots:o,groups:M})}),[F,M,v,C,G,$,D]),V=(0,r.useCallback)((e=>{if(!G)return void R({error:"No selected team..."});const t=M.slice();t[e]=[...t[e],G];const o=F[v].length>0?v:v+1;H({selectedTeam:null,pickedGroup:e,hungPot:F[o],possibleGroups:null,possibleGroupsShuffled:null,currentPotNum:o,pots:F,groups:t})}),[F,M,G,v,C]);(0,r.useEffect)((()=>{G&&(async()=>{if(!G)throw new Error("no selected team");let t;try{t=(await A({season:e,pots:F,groups:M,selectedTeam:G})).possibleGroups}catch(e){return console.error(e),void R({error:"Could not determine the group"})}H({selectedTeam:G,pickedGroup:null,hungPot:C,currentPotNum:v,possibleGroups:t,possibleGroupsShuffled:a(t),pots:F,groups:M})})()}),[G]);const W=v>=F.length;(0,r.useEffect)((()=>{const e=null==C?void 0:C.length;if(E&&e){const t=l(e-1);I(t)}}),[E,C]),(0,r.useEffect)((()=>{if(E&&(null==D?void 0:D.length)){const e=n(D);V(e)}}),[E,D]),(0,r.useEffect)((()=>{W&&E&&Z(!1)}),[W,E]);const q=M.length,z=(0,r.useCallback)((e=>e<q>>1?x:N),[q]);return r.createElement(d.Z,null,r.createElement(g.Z,null,r.createElement(f.Z,{selectedTeams:G&&[G],initialPots:t,pots:F,currentPotNum:v}),r.createElement(b.Z,{ref:L,maxTeams:F.length,currentPotNum:v,groups:M,possibleGroups:E?null:$,getGroupHeaderStyles:z})),r.createElement(k.Z,null,!E&&r.createElement(h.Z,{display:!W,displayTeams:j,selectedTeam:G,pot:C,onPick:I}),r.createElement(y.Z,{long:!1,completed:W,selectedTeam:G,pickedGroup:S,possibleGroups:$,isDisplayPossibleGroupsText:!!G,numGroups:q,groupsElement:L,reset:s}),!E&&r.createElement(w,{display:!W,displayGroups:j,possibleGroups:D,onPick:V})))}))},55602:(e,t,o)=>{"use strict";o.d(t,{Z:()=>T});var r=o(67294),s=o(29163),l=o(80737),n=o(96026),a=o(42048),u=o(13963),c=o(68398),i=o(24729),p=o(72935),m=o(86893),d=o(64982),f=o(930),b=o(93749),g=o(19992);const k=s.F4`
  from {
    box-shadow: 0 0 20px #08f;
  }
  to {}
`,h=s.F4`
  from {
    background-color: rgba(255, 255, 255, 0.5);
  }
  to {}
`,E=s.F4`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,Z=s.F4`
  from {
    background-color: rgba(192, 224, 255, 0.5);
  }
  to {}
`,v=s.iv`
  position: relative; /* enables glow */
  animation: ${e=>e.theme.isDarkMode?h:k} 1s ease;
  ${e=>e.theme.isDarkMode?s.iv`
    background-color: rgba(255, 255, 255, 0.3);
  `:s.iv`
    box-shadow: 0 0 5px #6af;
  `}
`,G=s.iv`
  animation: ${e=>e.theme.isDarkMode?Z:E} 3s ease-out normal forwards;
`,w=(0,s.ZP)(i.Z)`
  ${e=>e.possible&&v}
  ${e=>e.picked&&G}
`,y=(0,r.memo)((({team:e,possible:t})=>{var o;const l=(0,p.Z)(e),[n,a]=(0,r.useState)(e),[u,c]=(0,r.useState)(!1),i=(0,r.useContext)(s.Ni),k=(0,r.useRef)(null),h=(0,r.useCallback)((()=>c(!1)),[]),E=(0,r.useCallback)((()=>{a(e),c(!0)}),[e]);return(0,m.Z)((()=>{h()}),[i]),r.createElement(r.Fragment,null,r.createElement(w,{picked:u&&!!n,possible:t,onAnimationEnd:h},n?r.createElement(f.Z,{country:(0,d.Z)(n)},null!==(o=n.shortName)&&void 0!==o?o:n.name):r.createElement(b.Z,{ref:k})),e&&e!==l&&r.createElement(g.Z,{from:`[data-cellid='${e.id}']`,to:k,duration:350,team:e,onAnimationEnd:E}))})),P=(0,r.memo)((({maxTeams:e,groupLetter:t,teams:o,potNum:s,possible:l,headerStyles:p})=>r.createElement(a.Z,null,r.createElement("thead",null,r.createElement(c.Z,null,r.createElement(i.Z,null,r.createElement(u.Z,{styles:p},"Group"," ",t)))),r.createElement("tbody",null,n(e).map((e=>r.createElement(c.Z,{key:e},r.createElement(y,{team:o[e],possible:e===s&&l})))))))),x=s.ZP.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,N=(0,r.forwardRef)((({maxTeams:e,currentPotNum:t,groups:o,possibleGroups:s,getGroupHeaderStyles:n},a)=>r.createElement(x,{ref:a},null==o?void 0:o.map(((o,a)=>{const u=(0,l.Z)(a),c=null==n?void 0:n(a);return r.createElement(P,{key:u,maxTeams:e,groupLetter:u,teams:o,potNum:t,possible:!!(null==s?void 0:s.includes(a)),headerStyles:c})}))))),T=(0,r.memo)(N)},91945:(e,t,o)=>{"use strict";function r(){return new Worker(o.p+"worker.8aad3d57d611c405c967.worker.js")}o.r(t),o.d(t,{default:()=>r})}}]);