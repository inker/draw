(window.webpackJsonp=window.webpackJsonp||[]).push([[3,8],{100:function(e,t,a){"use strict";a.r(t);var o=a(0),r=a.n(o),l=a(2),n=a(78),c=a(79),s=a(4),u=a(68),m=a(69),p=a(75),i=a(87),d=a(86),b=a(88),f=a(82),g=a(83),E=a(90),j=a(85),O=a(84),k=a(101);const w=l.c`
  background-color: #ffc0c0;
`,h=l.c`
  background-color: #c0e0ff;
`;function y(e){const t=e.map(e=>c(e));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:t[0],pots:t,groups:e[0].map(()=>[])}}t.default=Object(o.memo)(({season:e,pots:t})=>{const[a,l]=Object(u.a)(),[c,v]=Object(m.a)(),[{currentPotNum:G,selectedTeam:P,pickedGroup:T,hungPot:x,pots:N,groups:S},$]=Object(o.useState)(()=>y(t));Object(o.useEffect)(()=>{$(y(t))},[t,a]);const[,C]=Object(s.a)(),[R]=Object(p.a)(),H=Object(i.a)(k.default,12e4),J=Object(o.useRef)(null),L=Object(o.useCallback)(e=>{if(P)return;const t=N[G][e];if(!t)return;const a=N.slice();a[G]=a[G].filter((t,a)=>a!==e),$({currentPotNum:G,hungPot:x,selectedTeam:t,pickedGroup:null,pots:a,groups:S})},[N,S,G,x,P]);Object(o.useEffect)(()=>{P&&(async()=>{if(!P)throw new Error("no selected team");let t;try{t=(await H({season:e,pots:N,groups:S,selectedTeam:P})).pickedGroup}catch(e){return console.error(e),void C({error:"Could not determine the group"})}const a=S.slice();a[t]=[...a[t],P];const o=N[G].length>0?G:G+1;$({selectedTeam:null,pickedGroup:t,hungPot:N[o],currentPotNum:o,pots:N,groups:a})})()},[P]);const A=G>=N.length;Object(o.useEffect)(()=>{const e=null==x?void 0:x.length;if(c&&e){const t=n(e-1);L(t)}},[c,x]),Object(o.useEffect)(()=>{A&&c&&v(!1)},[A,c]);const D=S.length,F=Object(o.useCallback)(e=>e<D>>1?w:h,[D]);return r.a.createElement(O.a,null,r.a.createElement(f.a,null,r.a.createElement(d.a,{selectedTeams:P&&[P],initialPots:t,pots:N,currentPotNum:G}),r.a.createElement(b.a,{ref:J,maxTeams:N.length,currentPotNum:G,groups:S,possibleGroups:null,getGroupHeaderStyles:F})),r.a.createElement(g.a,null,!c&&r.a.createElement(E.a,{forceNoSelect:!!P,display:!A,displayTeams:R,selectedTeam:P,pot:x,onPick:L}),r.a.createElement(j.a,{long:!0,completed:A,selectedTeam:P,pickedGroup:T,possibleGroups:null,isDisplayPossibleGroupsText:!!P,numGroups:D,groupsElement:J,reset:l})))})},101:function(e,t,a){"use strict";a.r(t),t.default=function(){return new Worker(a.p+"worker.8e7156e701bc09e0bbf2.worker.js")}},88:function(e,t,a){"use strict";var o=a(0),r=a.n(o),l=a(2),n=a(73),c=a(67),s=a(72),u=a(95),m=a(70),p=a(66),i=a(80),d=a(74),b=a(71),f=a(81),g=a(89);const E=l.e`
  from {
    background-color: white;
    box-shadow: 0 0 20px #08f;
  }
  to {}
`,j=l.e`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,O=l.c`
  position: relative; /* enables glow */
  animation: ${E} 1s ease;
  box-shadow: 0 0 5px #6af;
`,k=l.c`
  animation: ${j} 3s ease-out normal forwards;
`;var w=Object(l.d)(p.a)`
  ${e=>e.possible&&O}
  ${e=>e.picked&&k}
`;var h=Object(o.memo)(({team:e,possible:t})=>{var a;const l=Object(i.a)(e),[n,c]=Object(o.useState)(e),s=Object(o.useRef)(null),u=Object(o.useCallback)(()=>{c(e)},[e]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(w,{picked:!!n,possible:t},n?r.a.createElement(b.a,{country:Object(d.a)(n)},null!==(a=n.shortName)&&void 0!==a?a:n.name):r.a.createElement(f.a,{ref:s})),e&&e!==l&&r.a.createElement(g.a,{from:`[data-cellid='${e.id}']`,to:s,duration:350,team:e,onAnimationEnd:u}))});var y=Object(o.memo)(({maxTeams:e,groupLetter:t,teams:a,potNum:o,possible:l,headerStyles:n})=>r.a.createElement(s.a,null,r.a.createElement("thead",null,r.a.createElement(m.a,null,r.a.createElement(p.a,null,r.a.createElement(u.a,{styles:n},"Group"," ",t)))),r.a.createElement("tbody",null,c(e).map(e=>r.a.createElement(m.a,{key:e},r.a.createElement(h,{team:a[e],possible:e===o&&l}))))));const v=l.d.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,G=Object(o.forwardRef)(({maxTeams:e,currentPotNum:t,groups:a,possibleGroups:o,getGroupHeaderStyles:l},c)=>r.a.createElement(v,{ref:c},null==a?void 0:a.map((a,c)=>{const s=Object(n.a)(c),u=null==l?void 0:l(c);return r.a.createElement(y,{key:s,maxTeams:e,groupLetter:s,teams:a,potNum:t,possible:!!(null==o?void 0:o.includes(c)),headerStyles:u})})));t.a=Object(o.memo)(G)}},0,[82]]);