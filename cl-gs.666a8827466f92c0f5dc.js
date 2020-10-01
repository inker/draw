(window.webpackJsonp=window.webpackJsonp||[]).push([[1,6],{104:function(e,t,o){"use strict";o.r(t),t.default=function(){return new Worker(o.p+"worker.5ac3138ef87aca3322af.worker.js")}},113:function(e,t,o){"use strict";o.r(t);var a=o(0),r=o.n(a),s=o(2),l=o(84),n=o(436),c=o(85),u=o(5),i=o(74),p=o(75),m=o(78),d=o(94),b=o(86),f=o(93),g=o(95),k=o(90),j=o(91),h=o(97),E=o(80),O=o(138);var G=Object(s.e)(O.a)`
  &:hover {
    ${e=>!e.noHover&&"background: radial-gradient(#ccf, #ccf)"};
  }
`;const v=s.e.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 999px) {
    justify-content: center;
  }
`;var w=Object(a.memo)((({display:e,displayGroups:t,possibleGroups:o,onPick:s})=>{const l=Object(a.useCallback)((e=>{const t=e.target,o=+t.dataset.group;if(Number.isNaN(o))throw new TypeError("Incorrect group ball: "+t.dataset.group);s(o)}),[s]);return r.a.createElement(v,null,e&&(null==o?void 0:o.map((e=>r.a.createElement(G,{key:e,"data-group":e,forceVisible:t,onClick:l},Object(E.a)(e))))))})),y=o(92),x=o(104);const P=s.d`
  background-color: ${e=>e.theme.isDarkMode?"#933":"#ffc0c0"};
`,T=s.d`
  background-color: ${e=>e.theme.isDarkMode?"#039":"#c0e0ff"};
`;function N(e){const t=e.map((e=>c(e)));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:t[0],possibleGroups:null,possibleGroupsShuffled:null,pots:t,groups:e[0].map((()=>[]))}}t.default=Object(a.memo)((({season:e,pots:t})=>{const[o,s]=Object(i.a)(),[E,O]=Object(p.a)(),[{currentPotNum:G,selectedTeam:v,pickedGroup:S,hungPot:C,possibleGroups:$,possibleGroupsShuffled:D,pots:M,groups:H},R]=Object(a.useState)((()=>N(t)));Object(a.useEffect)((()=>{R(N(t))}),[t,o]);const[,A]=Object(u.a)(),[J]=Object(m.a)(),L=Object(d.a)(x.default),F=Object(a.useRef)(null),I=Object(a.useCallback)((e=>{if(v)return;const t=M[G][e];if(!t)return;const o=M.slice();o[G]=o[G].filter(((t,o)=>o!==e)),R({currentPotNum:G,hungPot:C,selectedTeam:t,possibleGroups:$,possibleGroupsShuffled:D,pickedGroup:null,pots:o,groups:H})}),[M,H,G,C,v,$,D]),V=Object(a.useCallback)((e=>{if(!v)return void A({error:"No selected team..."});const t=H.slice();t[e]=[...t[e],v];const o=M[G].length>0?G:G+1;R({selectedTeam:null,pickedGroup:e,hungPot:M[o],possibleGroups:null,possibleGroupsShuffled:null,currentPotNum:o,pots:M,groups:t})}),[M,H,v,G,C]);Object(a.useEffect)((()=>{v&&(async()=>{if(!v)throw new Error("no selected team");let t;try{t=(await L({season:e,pots:M,groups:H,selectedTeam:v})).possibleGroups}catch(e){return console.error(e),void A({error:"Could not determine the group"})}R({selectedTeam:v,pickedGroup:null,hungPot:C,currentPotNum:G,possibleGroups:t,possibleGroupsShuffled:c(t),pots:M,groups:H})})()}),[v]);const W=G>=M.length;Object(a.useEffect)((()=>{const e=null==C?void 0:C.length;if(E&&e){const t=l(e-1);I(t)}}),[E,C]),Object(a.useEffect)((()=>{if(E&&(null==D?void 0:D.length)){const e=n(D);V(e)}}),[E,D]),Object(a.useEffect)((()=>{W&&E&&O(!1)}),[W,E]);const q=H.length,z=Object(a.useCallback)((e=>e<q>>1?P:T),[q]);return r.a.createElement(b.a,null,r.a.createElement(k.a,null,r.a.createElement(f.a,{selectedTeams:v&&[v],initialPots:t,pots:M,currentPotNum:G}),r.a.createElement(g.a,{ref:F,maxTeams:M.length,currentPotNum:G,groups:H,possibleGroups:E?null:$,getGroupHeaderStyles:z})),r.a.createElement(j.a,null,!E&&r.a.createElement(h.a,{display:!W,displayTeams:J,selectedTeam:v,pot:C,onPick:I}),r.a.createElement(y.a,{long:!1,completed:W,selectedTeam:v,pickedGroup:S,possibleGroups:$,isDisplayPossibleGroupsText:!!v,numGroups:q,groupsElement:F,reset:s}),!E&&r.a.createElement(w,{display:!W,displayGroups:J,possibleGroups:D,onPick:V})))}))},132:function(e,t,o){var a=o(119);e.exports=function(e){var t=e.length;return t?e[a(0,t-1)]:void 0}},436:function(e,t,o){var a=o(132),r=o(437),s=o(82);e.exports=function(e){return(s(e)?a:r)(e)}},437:function(e,t,o){var a=o(132),r=o(133);e.exports=function(e){return a(r(e))}},95:function(e,t,o){"use strict";var a=o(0),r=o.n(a),s=o(2),l=o(80),n=o(73),c=o(79),u=o(102),i=o(76),p=o(72),m=o(87),d=o(88),b=o(81),f=o(77),g=o(89),k=o(96);const j=s.f`
  from {
    box-shadow: 0 0 20px #08f;
  }
  to {}
`,h=s.f`
  from {
    background-color: rgba(255, 255, 255, 0.5);
  }
  to {}
`,E=s.f`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,O=s.f`
  from {
    background-color: rgba(192, 224, 255, 0.5);
  }
  to {}
`,G=s.d`
  position: relative; /* enables glow */
  animation: ${e=>e.theme.isDarkMode?h:j} 1s ease;
  ${e=>e.theme.isDarkMode?s.d`
    background-color: rgba(255, 255, 255, 0.3);
  `:s.d`
    box-shadow: 0 0 5px #6af;
  `}
`,v=s.d`
  animation: ${e=>e.theme.isDarkMode?O:E} 3s ease-out normal forwards;
`;var w=Object(s.e)(p.a)`
  ${e=>e.possible&&G}
  ${e=>e.picked&&v}
`;var y=Object(a.memo)((({team:e,possible:t})=>{var o;const l=Object(m.a)(e),[n,c]=Object(a.useState)(e),[u,i]=Object(a.useState)(!1),p=Object(a.useContext)(s.a),j=Object(a.useRef)(null),h=Object(a.useCallback)((()=>i(!1)),[]),E=Object(a.useCallback)((()=>{c(e),i(!0)}),[e]);return Object(d.a)((()=>{h()}),[p]),r.a.createElement(r.a.Fragment,null,r.a.createElement(w,{picked:u&&!!n,possible:t,onAnimationEnd:h},n?r.a.createElement(f.a,{country:Object(b.a)(n)},null!==(o=n.shortName)&&void 0!==o?o:n.name):r.a.createElement(g.a,{ref:j})),e&&e!==l&&r.a.createElement(k.a,{from:`[data-cellid='${e.id}']`,to:j,duration:350,team:e,onAnimationEnd:E}))}));var x=Object(a.memo)((({maxTeams:e,groupLetter:t,teams:o,potNum:a,possible:s,headerStyles:l})=>r.a.createElement(c.a,null,r.a.createElement("thead",null,r.a.createElement(i.a,null,r.a.createElement(p.a,null,r.a.createElement(u.a,{styles:l},"Group"," ",t)))),r.a.createElement("tbody",null,n(e).map((e=>r.a.createElement(i.a,{key:e},r.a.createElement(y,{team:o[e],possible:e===a&&s}))))))));const P=s.e.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,T=Object(a.forwardRef)((({maxTeams:e,currentPotNum:t,groups:o,possibleGroups:a,getGroupHeaderStyles:s},n)=>r.a.createElement(P,{ref:n},null==o?void 0:o.map(((o,n)=>{const c=Object(l.a)(n),u=null==s?void 0:s(n);return r.a.createElement(x,{key:c,maxTeams:e,groupLetter:c,teams:o,potNum:t,possible:!!(null==a?void 0:a.includes(n)),headerStyles:u})})))));t.a=Object(a.memo)(T)}},0,[82]]);