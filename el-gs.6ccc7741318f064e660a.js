/*! For license information please see el-gs.6ccc7741318f064e660a.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[3,7],{100:function(e,t,a){"use strict";a.r(t);var s=a(0),r=a.n(s),n=a(2),o=a(78),c=a(79),l=a(4),u=a(70),i=a(71),m=a(75),d=a(87),p=a(86),b=a(88),f=a(82),h=a(83),g=a(90),w=a(85),j=a(84),E=a(101);const k=n.c`
  background-color: #ffc0c0;
`,v=n.c`
  background-color: #c0e0ff;
`;function O(e){const t=e.map(e=>c(e));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:t[0],pots:t,groups:e[0].map(()=>[])}}t.default=Object(s.memo)(({season:e,pots:t})=>{const[a,n]=Object(u.a)(),[c,y]=Object(i.a)(),[{currentPotNum:P,selectedTeam:T,pickedGroup:G,hungPot:x,pots:N,groups:A},C]=Object(s.useState)(()=>O(t));Object(s.useEffect)(()=>{C(O(t))},[t,a]);const[,S]=Object(l.a)(),[M]=Object(m.a)(),I=Object(d.a)(E.default),W=Object(s.useRef)(null),R=Object(s.useCallback)(e=>{if(T)return;const t=N[P][e];if(!t)return;const a=N.slice();a[P]=a[P].filter((t,a)=>a!==e),C({currentPotNum:P,hungPot:x,selectedTeam:t,pickedGroup:null,pots:a,groups:A})},[N,A,P,x,T]);Object(s.useEffect)(()=>{T&&(async()=>{if(!T)throw new Error("no selected team");let t;try{t=(await I({season:e,pots:N,groups:A,selectedTeam:T})).pickedGroup}catch(e){return console.error(e),void S({error:"Could not determine the group"})}const a=A.slice();a[t]=[...a[t],T];const s=N[P].length>0?P:P+1;C({selectedTeam:null,pickedGroup:t,hungPot:N[s],currentPotNum:s,pots:N,groups:a})})()},[T]);const $=P>=N.length;Object(s.useEffect)(()=>{const e=null==x?void 0:x.length;if(c&&e){const t=o(e-1);R(t)}},[c,x]),Object(s.useEffect)(()=>{$&&c&&y(!1)},[$,c]);const D=A.length,H=Object(s.useCallback)(e=>e<D>>1?k:v,[D]);return r.a.createElement(j.a,null,r.a.createElement(f.a,null,r.a.createElement(p.a,{selectedTeams:T&&[T],initialPots:t,pots:N,currentPotNum:P}),r.a.createElement(b.a,{ref:W,maxTeams:N.length,currentPotNum:P,groups:A,possibleGroups:null,getGroupHeaderStyles:H})),r.a.createElement(h.a,null,!c&&r.a.createElement(g.a,{forceNoSelect:!!T,display:!$,displayTeams:M,selectedTeam:T,pot:x,onPick:R}),r.a.createElement(w.a,{long:!0,completed:$,selectedTeam:T,pickedGroup:G,possibleGroups:null,isDisplayPossibleGroupsText:!!T,numGroups:D,groupsElement:W,reset:n})))})},101:function(e,t,a){"use strict";a.r(t),t.default=function(){return new Worker(a.p+"worker.589486929bd4a320e6f8.worker.js")}},87:function(e,t,a){"use strict";var s=a(0);Object.create;Object.create;function r(e,t){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return t.get(e)}function n(e,t,a){if(!t.has(e))throw new TypeError("attempted to set private field on non-instance");return t.set(e,a),a}var o=class{constructor(){this.callbacks=new Map}add(e,t){this.callbacks.set(e,t)}addAndGetId(e){const t=Math.random().toString(36).slice(2);return this.add(t,e),t}resolve(e,t){this.getCallbackAndDelete(e)(null,t)}reject(e,t){this.getCallbackAndDelete(e)(t)}getCallbackAndDelete(e){const t=this.callbacks.get(e);if(!t)throw new Error("no resolver with id = "+e);return this.callbacks.delete(e),t}};const c=(e,t)=>(a,s)=>{a?t(a):e(s)};var l,u,i,m=class{constructor(){this.manager=new o}getPromise(e){return new Promise(async(t,a)=>{const s=c(t,a);this.manager.add(e,s)})}getPromiseWithId(e){return new Promise(async(t,a)=>{const s=c(t,a),r=this.manager.addAndGetId(s);e&&e(r)})}resolve(e,t){this.manager.resolve(e,t)}reject(e,t){this.manager.reject(e,t)}},d=a(91),p=a.n(d);l=new WeakMap,u=new WeakMap,i=new WeakMap;var b=class{constructor(e,t){l.set(this,void 0),u.set(this,new m),i.set(this,void 0),n(this,i,t),n(this,l,e),r(this,l).onmessage=e=>{const{messageId:t,data:a}=e.data;r(this,u).resolve(t,a)}}sendAndReceive(e){const t=r(this,u).getPromiseWithId(t=>{r(this,l).postMessage({messageId:t,data:e})});return void 0===r(this,i)?t:p()(t,r(this,i))}terminate(){r(this,l).terminate()}};t.a=e=>{const t=Object(s.useMemo)(()=>new b(new e,12e4),[]);return Object(s.useEffect)(()=>()=>{t.terminate()},[]),Object(s.useCallback)(t.sendAndReceive.bind(t),[t])}},88:function(e,t,a){"use strict";var s=a(0),r=a.n(s),n=a(2),o=a(73),c=a(67),l=a(72),u=a(96),i=a(68),m=a(66),d=a(80),p=a(74),b=a(69),f=a(81),h=a(89);const g=n.e`
  from {
    background-color: white;
    box-shadow: 0 0 20px #08f;
  }
  to {}
`,w=n.e`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,j=n.c`
  position: relative; /* enables glow */
  animation: ${g} 1s ease;
  box-shadow: 0 0 5px #6af;
`,E=n.c`
  animation: ${w} 3s ease-out normal forwards;
`;var k=Object(n.d)(m.a)`
  ${e=>e.possible&&j}
  ${e=>e.hasTeam&&E}
`;var v=Object(s.memo)(({team:e,possible:t})=>{var a;const n=Object(d.a)(e),[o,c]=Object(s.useState)(e),l=Object(s.useRef)(null),u=Object(s.useCallback)(()=>{c(e)},[e]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(k,{hasTeam:!!o,possible:t},o?r.a.createElement(b.a,{country:Object(p.a)(o)},null!==(a=o.shortName)&&void 0!==a?a:o.name):r.a.createElement(f.a,{ref:l})),e&&e!==n&&r.a.createElement(h.a,{from:`[data-cellid='${e.id}']`,to:l,duration:350,team:e,onAnimationEnd:u}))});var O=Object(s.memo)(({maxTeams:e,groupLetter:t,teams:a,potNum:s,possible:n,headerStyles:o})=>r.a.createElement(l.a,null,r.a.createElement("thead",null,r.a.createElement(i.a,null,r.a.createElement(m.a,null,r.a.createElement(u.a,{styles:o},"Group"," ",t)))),r.a.createElement("tbody",null,c(e).map(e=>r.a.createElement(i.a,{key:e},r.a.createElement(v,{team:a[e],possible:e===s&&n}))))));const y=n.d.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,P=Object(s.forwardRef)(({maxTeams:e,currentPotNum:t,groups:a,possibleGroups:s,getGroupHeaderStyles:n},c)=>r.a.createElement(y,{ref:c},null==a?void 0:a.map((a,c)=>{const l=Object(o.a)(c),u=null==n?void 0:n(c);return r.a.createElement(O,{key:l,maxTeams:e,groupLetter:l,teams:a,potNum:t,possible:!!(null==s?void 0:s.includes(c)),headerStyles:u})})));t.a=Object(s.memo)(P)}},0,[80]]);