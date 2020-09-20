(window.webpackJsonp=window.webpackJsonp||[]).push([[1,6],{106:function(e,t,o){"use strict";o.r(t);var r=o(0),a=o.n(r),s=o(2),l=o(78),n=o(433),c=o(79),u=o(4),p=o(68),i=o(69),m=o(75),d=o(87),b=o(86),f=o(88),g=o(82),E=o(83),j=o(90),h=o(73),O=o(133);var k=Object(s.d)(O.a)`
  &:hover {
    ${e=>!e.noHover&&"background: radial-gradient(#ccf, #ccf)"};
  }
`;const G=s.d.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 999px) {
    justify-content: center;
  }
`;var v=Object(r.memo)(({display:e,displayGroups:t,possibleGroups:o,onPick:s})=>{const l=Object(r.useCallback)(e=>{const t=e.target,o=+t.dataset.group;if(Number.isNaN(o))throw new TypeError("Incorrect group ball: "+t.dataset.group);s(o)},[s]);return a.a.createElement(G,null,e&&(null==o?void 0:o.map(e=>a.a.createElement(k,{key:e,"data-group":e,forceVisible:t,onClick:l},Object(h.a)(e)))))}),w=o(85),y=o(84),x=o(97);const P=s.c`
  background-color: #ffc0c0;
`,T=s.c`
  background-color: #c0e0ff;
`;function N(e){const t=e.map(e=>c(e));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:t[0],possibleGroups:null,possibleGroupsShuffled:null,pots:t,groups:e[0].map(()=>[])}}t.default=Object(r.memo)(({season:e,pots:t})=>{const[o,s]=Object(p.a)(),[h,O]=Object(i.a)(),[{currentPotNum:k,selectedTeam:G,pickedGroup:S,hungPot:C,possibleGroups:$,possibleGroupsShuffled:H,pots:R,groups:J},L]=Object(r.useState)(()=>N(t));Object(r.useEffect)(()=>{L(N(t))},[t,o]);const[,A]=Object(u.a)(),[D]=Object(m.a)(),F=Object(d.a)(x.default,12e4),I=Object(r.useRef)(null),V=Object(r.useCallback)(e=>{if(G)return;const t=R[k][e];if(!t)return;const o=R.slice();o[k]=o[k].filter((t,o)=>o!==e),L({currentPotNum:k,hungPot:C,selectedTeam:t,possibleGroups:$,possibleGroupsShuffled:H,pickedGroup:null,pots:o,groups:J})},[R,J,k,C,G,$,H]),W=Object(r.useCallback)(e=>{if(!G)return void A({error:"No selected team..."});const t=J.slice();t[e]=[...t[e],G];const o=R[k].length>0?k:k+1;L({selectedTeam:null,pickedGroup:e,hungPot:R[o],possibleGroups:null,possibleGroupsShuffled:null,currentPotNum:o,pots:R,groups:t})},[R,J,G,k,C]);Object(r.useEffect)(()=>{G&&(async()=>{if(!G)throw new Error("no selected team");let t;try{t=(await F({season:e,pots:R,groups:J,selectedTeam:G})).possibleGroups}catch(e){return console.error(e),void A({error:"Could not determine the group"})}L({selectedTeam:G,pickedGroup:null,hungPot:C,currentPotNum:k,possibleGroups:t,possibleGroupsShuffled:c(t),pots:R,groups:J})})()},[G]);const q=k>=R.length;Object(r.useEffect)(()=>{const e=null==C?void 0:C.length;if(h&&e){const t=l(e-1);V(t)}},[h,C]),Object(r.useEffect)(()=>{if(h&&(null==H?void 0:H.length)){const e=n(H);W(e)}},[h,H]),Object(r.useEffect)(()=>{q&&h&&O(!1)},[q,h]);const z=J.length,B=Object(r.useCallback)(e=>e<z>>1?P:T,[z]);return a.a.createElement(y.a,null,a.a.createElement(g.a,null,a.a.createElement(b.a,{selectedTeams:G&&[G],initialPots:t,pots:R,currentPotNum:k}),a.a.createElement(f.a,{ref:I,maxTeams:R.length,currentPotNum:k,groups:J,possibleGroups:h?null:$,getGroupHeaderStyles:B})),a.a.createElement(E.a,null,!h&&a.a.createElement(j.a,{display:!q,displayTeams:D,selectedTeam:G,pot:C,onPick:V}),a.a.createElement(w.a,{long:!1,completed:q,selectedTeam:G,pickedGroup:S,possibleGroups:$,isDisplayPossibleGroupsText:!!G,numGroups:z,groupsElement:I,reset:s}),!h&&a.a.createElement(v,{display:!q,displayGroups:D,possibleGroups:H,onPick:W})))})},127:function(e,t,o){var r=o(112);e.exports=function(e){var t=e.length;return t?e[r(0,t-1)]:void 0}},433:function(e,t,o){var r=o(127),a=o(434),s=o(76);e.exports=function(e){return(s(e)?r:a)(e)}},434:function(e,t,o){var r=o(127),a=o(128);e.exports=function(e){return r(a(e))}},88:function(e,t,o){"use strict";var r=o(0),a=o.n(r),s=o(2),l=o(73),n=o(67),c=o(72),u=o(95),p=o(70),i=o(66),m=o(80),d=o(74),b=o(71),f=o(81),g=o(89);const E=s.e`
  from {
    background-color: white;
    box-shadow: 0 0 20px #08f;
  }
  to {}
`,j=s.e`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,h=s.c`
  position: relative; /* enables glow */
  animation: ${E} 1s ease;
  box-shadow: 0 0 5px #6af;
`,O=s.c`
  animation: ${j} 3s ease-out normal forwards;
`;var k=Object(s.d)(i.a)`
  ${e=>e.possible&&h}
  ${e=>e.picked&&O}
`;var G=Object(r.memo)(({team:e,possible:t})=>{var o;const s=Object(m.a)(e),[l,n]=Object(r.useState)(e),c=Object(r.useRef)(null),u=Object(r.useCallback)(()=>{n(e)},[e]);return a.a.createElement(a.a.Fragment,null,a.a.createElement(k,{picked:!!l,possible:t},l?a.a.createElement(b.a,{country:Object(d.a)(l)},null!==(o=l.shortName)&&void 0!==o?o:l.name):a.a.createElement(f.a,{ref:c})),e&&e!==s&&a.a.createElement(g.a,{from:`[data-cellid='${e.id}']`,to:c,duration:350,team:e,onAnimationEnd:u}))});var v=Object(r.memo)(({maxTeams:e,groupLetter:t,teams:o,potNum:r,possible:s,headerStyles:l})=>a.a.createElement(c.a,null,a.a.createElement("thead",null,a.a.createElement(p.a,null,a.a.createElement(i.a,null,a.a.createElement(u.a,{styles:l},"Group"," ",t)))),a.a.createElement("tbody",null,n(e).map(e=>a.a.createElement(p.a,{key:e},a.a.createElement(G,{team:o[e],possible:e===r&&s}))))));const w=s.d.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,y=Object(r.forwardRef)(({maxTeams:e,currentPotNum:t,groups:o,possibleGroups:r,getGroupHeaderStyles:s},n)=>a.a.createElement(w,{ref:n},null==o?void 0:o.map((o,n)=>{const c=Object(l.a)(n),u=null==s?void 0:s(n);return a.a.createElement(v,{key:c,maxTeams:e,groupLetter:c,teams:o,potNum:t,possible:!!(null==r?void 0:r.includes(n)),headerStyles:u})})));t.a=Object(r.memo)(y)},97:function(e,t,o){"use strict";o.r(t),t.default=function(){return new Worker(o.p+"worker.72c664cedd1082fb79b5.worker.js")}}},0,[82]]);