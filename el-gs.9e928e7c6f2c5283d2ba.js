/*! For license information please see el-gs.9e928e7c6f2c5283d2ba.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[3,7],{81:function(e,t,a){"use strict";var n=a(0);Object.create;Object.create;function s(e,t){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return t.get(e)}function r(e,t,a){if(!t.has(e))throw new TypeError("attempted to set private field on non-instance");return t.set(e,a),a}var o=class{constructor(){this.callbacks=new Map}add(e,t){this.callbacks.set(e,t)}addAndGetId(e){const t=Math.random().toString(36).slice(2);return this.add(t,e),t}resolve(e,t){this.getCallbackAndDelete(e)(null,t)}reject(e,t){this.getCallbackAndDelete(e)(t)}getCallbackAndDelete(e){const t=this.callbacks.get(e);if(!t)throw new Error("no resolver with id = "+e);return this.callbacks.delete(e),t}};const c=(e,t)=>(a,n)=>{a?t(a):e(n)};var l,u,i,m=class{constructor(){this.manager=new o}getPromise(e){return new Promise(async(t,a)=>{const n=c(t,a);this.manager.add(e,n)})}getPromiseWithId(e){return new Promise(async(t,a)=>{const n=c(t,a),s=this.manager.addAndGetId(n);e&&e(s)})}resolve(e,t){this.manager.resolve(e,t)}reject(e,t){this.manager.reject(e,t)}},d=a(87),p=a.n(d);l=new WeakMap,u=new WeakMap,i=new WeakMap;var b=class{constructor(e,t){l.set(this,void 0),u.set(this,new m),i.set(this,void 0),r(this,i,t),r(this,l,e),s(this,l).onmessage=e=>{const{messageId:t,data:a}=e.data;s(this,u).resolve(t,a)}}sendAndReceive(e){const t=s(this,u).getPromiseWithId(t=>{s(this,l).postMessage({messageId:t,data:e})});return void 0===s(this,i)?t:p()(t,s(this,i))}terminate(){s(this,l).terminate()}};t.a=e=>{const t=Object(n.useMemo)(()=>new b(new e,12e4),[]);return Object(n.useEffect)(()=>()=>{t.terminate()},[]),Object(n.useCallback)(t.sendAndReceive.bind(t),[t])}},82:function(e,t,a){"use strict";var n=a(0),s=a.n(n),r=a(1),o=a(68),c=a(61),l=a(66),u=a(92),i=a(63),m=a(60),d=a(74),p=a(67),b=a(75),f=a(83);const h=r.e`
  from {
    background-color: white;
    box-shadow: 0 0 20px #08f;
  }
  to {}
`,g=r.e`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,w=r.c`
  position: relative; /* enables glow */
  animation: ${h} 1s ease;
  box-shadow: 0 0 5px #6af;
`,j=r.c`
  animation: ${g} 5s ease-out normal forwards;
`;var v=Object(r.d)(m.a)`
  ${e=>e.possible&&w}
  ${e=>e.hasTeam&&j}
`,E=a(62),k=e=>{var t;return null!==(t=e.country)&&void 0!==t?t:e.name in E?e.name:void 0};var O=Object(n.memo)(({team:e,possible:t})=>{var a;const r=Object(d.a)(e),[o,c]=Object(n.useState)(e),l=Object(n.useRef)(null),u=Object(n.useCallback)(()=>{c(e)},[e]);return s.a.createElement(s.a.Fragment,null,s.a.createElement(v,{hasTeam:!!o,possible:t},o?s.a.createElement(p.a,{country:k(o)},null!==(a=o.shortName)&&void 0!==a?a:o.name):s.a.createElement(b.a,{ref:l})),e&&e!==r&&s.a.createElement(f.a,{from:`[data-cellid='${e.id}']`,to:l,duration:350,data:e,onAnimationEnd:u}))});var y=Object(n.memo)(({maxTeams:e,groupLetter:t,teams:a,potNum:n,possible:r,headerStyles:o})=>s.a.createElement(l.a,null,s.a.createElement("thead",null,s.a.createElement(i.a,null,s.a.createElement(m.a,null,s.a.createElement(u.a,{styles:o},"Group"," ",t)))),s.a.createElement("tbody",null,c(e).map(e=>s.a.createElement(i.a,{key:e},s.a.createElement(O,{team:a[e],possible:e===n&&r}))))));const P=r.d.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,T=Object(n.forwardRef)(({maxTeams:e,currentPotNum:t,groups:a,possibleGroups:n,getGroupHeaderStyles:r},c)=>s.a.createElement(P,{ref:c},null==a?void 0:a.map((a,c)=>{const l=Object(o.a)(c),u=null==r?void 0:r(c);return s.a.createElement(y,{key:l,maxTeams:e,groupLetter:l,teams:a,potNum:t,possible:!!(null==n?void 0:n.includes(c)),headerStyles:u})})));t.a=Object(n.memo)(T)},96:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(1),o=a(72),c=a(73),l=a(2),u=a(64),i=a(65),m=a(69),d=a(81),p=a(80),b=a(82),f=a(76),h=a(77),g=a(84),w=a(79),j=a(78),v=a(97);const E=r.c`
  background-color: #ffc0c0;
`,k=r.c`
  background-color: #c0e0ff;
`;function O(e){const t=e.map(e=>c(e));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:t[0],pots:t,groups:e[0].map(()=>[])}}t.default=Object(n.memo)(({season:e,pots:t})=>{const[a,r]=Object(u.a)(),[c,y]=Object(i.a)(),[{currentPotNum:P,selectedTeam:T,pickedGroup:G,hungPot:x,pots:N,groups:A},C]=Object(n.useState)(()=>O(t));Object(n.useEffect)(()=>{C(O(t))},[t,a]);const[,S]=Object(l.a)(),[M]=Object(m.a)(),I=Object(d.a)(v.default),W=Object(n.useRef)(null),R=Object(n.useCallback)(e=>{if(T)return;const t=N[P][e];if(!t)return;const a=N.slice();a[P]=a[P].filter((t,a)=>a!==e),C({currentPotNum:P,hungPot:x,selectedTeam:t,pickedGroup:null,pots:a,groups:A})},[N,A,P,x,T]);Object(n.useEffect)(()=>{T&&(async()=>{if(!T)throw new Error("no selected team");let t;try{t=(await I({season:e,pots:N,groups:A,selectedTeam:T})).pickedGroup}catch(e){return console.error(e),void S({error:"Could not determine the group"})}const a=A.slice();a[t]=[...a[t],T];const n=N[P].length>0?P:P+1;C({selectedTeam:null,pickedGroup:t,hungPot:N[n],currentPotNum:n,pots:N,groups:a})})()},[T]);const $=P>=N.length;Object(n.useEffect)(()=>{const e=null==x?void 0:x.length;if(c&&e){const t=o(e-1);R(t)}},[c,x]),Object(n.useEffect)(()=>{$&&c&&y(!1)},[$,c]);const D=A.length,H=Object(n.useCallback)(e=>e<D>>1?E:k,[D]);return s.a.createElement(j.a,null,s.a.createElement(f.a,null,s.a.createElement(p.a,{selectedTeams:T&&[T],initialPots:t,pots:N,currentPotNum:P}),s.a.createElement(b.a,{ref:W,maxTeams:N.length,currentPotNum:P,groups:A,possibleGroups:null,getGroupHeaderStyles:H})),s.a.createElement(h.a,null,!c&&s.a.createElement(g.a,{forceNoSelect:!!T,display:!$,displayTeams:M,selectedTeam:T,pot:x,onPick:R}),s.a.createElement(w.a,{long:!0,completed:$,selectedTeam:T,pickedGroup:G,possibleGroups:null,isDisplayPossibleGroupsText:!!T,numGroups:D,groupsElement:W,reset:r})))})},97:function(e,t,a){"use strict";a.r(t),t.default=function(){return new Worker(a.p+"worker.7183f99cec5bacceb968.worker.js")}}},0,[80]]);