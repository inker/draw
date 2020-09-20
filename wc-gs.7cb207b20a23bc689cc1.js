(window.webpackJsonp=window.webpackJsonp||[]).push([[5,11],{104:function(e,t,a){"use strict";a.r(t);var o=a(0),r=a.n(o),n=a(2),l=a(29),s=a(78),c=a(79),u=a(4),m=a(68),p=a(69),i=a(75),d=a(87),b=a(86),f=a(88),E=a(82),g=a(83),j=a(90),O=a(85),h=a(84),k=a(105);const w=l(n.c`
  background-color: #c0e0c0;
`);function y(e){const t=e.map(e=>c(e));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:t[0],pots:t,groups:e[0].map(()=>[])}}t.default=Object(o.memo)(({season:e,pots:t})=>{const[a,n]=Object(m.a)(),[l,c]=Object(p.a)(),[{currentPotNum:v,selectedTeam:x,pickedGroup:G,hungPot:P,pots:T,groups:N},S]=Object(o.useState)(()=>y(t));Object(o.useEffect)(()=>{S(y(t))},[t,a]);const[,$]=Object(u.a)(),[C]=Object(i.a)(),R=Object(d.a)(k.default,12e4),H=Object(o.useRef)(null),J=Object(o.useCallback)(e=>{if(x)return;const t=T[v][e];if(!t)return;const a=T.slice();a[v]=a[v].filter((t,a)=>a!==e),S({currentPotNum:v,hungPot:P,selectedTeam:t,pickedGroup:null,pots:a,groups:N})},[T,N,v,P,x]);Object(o.useEffect)(()=>{x&&(async()=>{if(!x)throw new Error("no selected team");let t;try{t=(await R({season:e,pots:T,groups:N,selectedTeam:x})).pickedGroup}catch(e){return console.error(e),void $({error:"Could not determine the group"})}const a=N.slice();a[t]=[...a[t],x];const o=T[v].length>0?v:v+1;S({selectedTeam:null,pickedGroup:t,hungPot:T[o],currentPotNum:o,pots:T,groups:a})})()},[x]),Object(o.useEffect)(()=>{const e=T[v].findIndex(e=>e.host);J(e)},[a]);const L=v>=T.length;Object(o.useEffect)(()=>{const e=null==P?void 0:P.length;if(l&&e){const t=s(e-1);J(t)}},[l,P]),Object(o.useEffect)(()=>{L&&l&&c(!1)},[L,l]);const A=N.length;return r.a.createElement(h.a,null,r.a.createElement(E.a,null,r.a.createElement(b.a,{selectedTeams:x&&[x],initialPots:t,pots:T,currentPotNum:v}),r.a.createElement(f.a,{ref:H,maxTeams:T.length,currentPotNum:v,groups:N,possibleGroups:null,getGroupHeaderStyles:w})),r.a.createElement(g.a,null,!l&&r.a.createElement(j.a,{forceNoSelect:!!x,display:!L,displayTeams:C,selectedTeam:x,pot:P,onPick:J}),r.a.createElement(O.a,{long:!0,completed:L,selectedTeam:x,pickedGroup:G,possibleGroups:null,isDisplayPossibleGroupsText:!!x,numGroups:A,groupsElement:H,reset:n})))})},105:function(e,t,a){"use strict";a.r(t),t.default=function(){return new Worker(a.p+"worker.66b5d558a2457984aa89.worker.js")}},88:function(e,t,a){"use strict";var o=a(0),r=a.n(o),n=a(2),l=a(73),s=a(67),c=a(72),u=a(95),m=a(70),p=a(66),i=a(80),d=a(74),b=a(71),f=a(81),E=a(89);const g=n.e`
  from {
    background-color: white;
    box-shadow: 0 0 20px #08f;
  }
  to {}
`,j=n.e`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,O=n.c`
  position: relative; /* enables glow */
  animation: ${g} 1s ease;
  box-shadow: 0 0 5px #6af;
`,h=n.c`
  animation: ${j} 3s ease-out normal forwards;
`;var k=Object(n.d)(p.a)`
  ${e=>e.possible&&O}
  ${e=>e.picked&&h}
`;var w=Object(o.memo)(({team:e,possible:t})=>{var a;const n=Object(i.a)(e),[l,s]=Object(o.useState)(e),c=Object(o.useRef)(null),u=Object(o.useCallback)(()=>{s(e)},[e]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(k,{picked:!!l,possible:t},l?r.a.createElement(b.a,{country:Object(d.a)(l)},null!==(a=l.shortName)&&void 0!==a?a:l.name):r.a.createElement(f.a,{ref:c})),e&&e!==n&&r.a.createElement(E.a,{from:`[data-cellid='${e.id}']`,to:c,duration:350,team:e,onAnimationEnd:u}))});var y=Object(o.memo)(({maxTeams:e,groupLetter:t,teams:a,potNum:o,possible:n,headerStyles:l})=>r.a.createElement(c.a,null,r.a.createElement("thead",null,r.a.createElement(m.a,null,r.a.createElement(p.a,null,r.a.createElement(u.a,{styles:l},"Group"," ",t)))),r.a.createElement("tbody",null,s(e).map(e=>r.a.createElement(m.a,{key:e},r.a.createElement(w,{team:a[e],possible:e===o&&n}))))));const v=n.d.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,x=Object(o.forwardRef)(({maxTeams:e,currentPotNum:t,groups:a,possibleGroups:o,getGroupHeaderStyles:n},s)=>r.a.createElement(v,{ref:s},null==a?void 0:a.map((a,s)=>{const c=Object(l.a)(s),u=null==n?void 0:n(s);return r.a.createElement(y,{key:c,maxTeams:e,groupLetter:c,teams:a,potNum:t,possible:!!(null==o?void 0:o.includes(s)),headerStyles:u})})));t.a=Object(o.memo)(x)}},0,[82]]);