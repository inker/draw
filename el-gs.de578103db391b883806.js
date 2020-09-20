/*! For license information please see el-gs.de578103db391b883806.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[3,7],{100:function(e,t,a){"use strict";a.r(t);var r=a(0),s=a.n(r),n=a(2),o=a(78),c=a(79),l=a(4),u=a(68),i=a(69),m=a(75),d=a(88),p=a(87),b=a(89),f=a(83),h=a(84),g=a(91),w=a(86),j=a(85),k=a(101);const O=n.c`
  background-color: #ffc0c0;
`,E=n.c`
  background-color: #c0e0ff;
`;function v(e){const t=e.map(e=>c(e));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:t[0],pots:t,groups:e[0].map(()=>[])}}t.default=Object(r.memo)(({season:e,pots:t})=>{const[a,n]=Object(u.a)(),[c,P]=Object(i.a)(),[{currentPotNum:T,selectedTeam:y,pickedGroup:G,hungPot:x,pots:M,groups:N},A]=Object(r.useState)(()=>v(t));Object(r.useEffect)(()=>{A(v(t))},[t,a]);const[,C]=Object(l.a)(),[S]=Object(m.a)(),W=Object(d.a)(k.default,12e4),I=Object(r.useRef)(null),R=Object(r.useCallback)(e=>{if(y)return;const t=M[T][e];if(!t)return;const a=M.slice();a[T]=a[T].filter((t,a)=>a!==e),A({currentPotNum:T,hungPot:x,selectedTeam:t,pickedGroup:null,pots:a,groups:N})},[M,N,T,x,y]);Object(r.useEffect)(()=>{y&&(async()=>{if(!y)throw new Error("no selected team");let t;try{t=(await W({season:e,pots:M,groups:N,selectedTeam:y})).pickedGroup}catch(e){return console.error(e),void C({error:"Could not determine the group"})}const a=N.slice();a[t]=[...a[t],y];const r=M[T].length>0?T:T+1;A({selectedTeam:null,pickedGroup:t,hungPot:M[r],currentPotNum:r,pots:M,groups:a})})()},[y]);const $=T>=M.length;Object(r.useEffect)(()=>{const e=null==x?void 0:x.length;if(c&&e){const t=o(e-1);R(t)}},[c,x]),Object(r.useEffect)(()=>{$&&c&&P(!1)},[$,c]);const D=N.length,H=Object(r.useCallback)(e=>e<D>>1?O:E,[D]);return s.a.createElement(j.a,null,s.a.createElement(f.a,null,s.a.createElement(p.a,{selectedTeams:y&&[y],initialPots:t,pots:M,currentPotNum:T}),s.a.createElement(b.a,{ref:I,maxTeams:M.length,currentPotNum:T,groups:N,possibleGroups:null,getGroupHeaderStyles:H})),s.a.createElement(h.a,null,!c&&s.a.createElement(g.a,{forceNoSelect:!!y,display:!$,displayTeams:S,selectedTeam:y,pot:x,onPick:R}),s.a.createElement(w.a,{long:!0,completed:$,selectedTeam:y,pickedGroup:G,possibleGroups:null,isDisplayPossibleGroupsText:!!y,numGroups:D,groupsElement:I,reset:n})))})},101:function(e,t,a){"use strict";a.r(t),t.default=function(){return new Worker(a.p+"worker.8e7156e701bc09e0bbf2.worker.js")}},80:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r={rejectOnTimeout:!0,errorMessage:void 0};function s(e,t,a){const{rejectOnTimeout:s=r.rejectOnTimeout,errorMessage:n=r.errorMessage}=a||r;return new Promise((a,r)=>{e(a,r),setTimeout(()=>{s?r(n):a()},t)})}t.promiseWithTimeout=s,t.default=(e,t,a)=>s((t,a)=>e.then(t).catch(a),t,a)},88:function(e,t,a){"use strict";var r=a(0);Object.create;Object.create;function s(e,t){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return t.get(e)}function n(e,t,a){if(!t.has(e))throw new TypeError("attempted to set private field on non-instance");return t.set(e,a),a}var o=class{constructor(){this.callbacks=new Map}add(e,t){this.callbacks.set(e,t)}addAndGetId(e){const t=Math.random().toString(36).slice(2);return this.add(t,e),t}resolve(e,t){this.getCallbackAndDelete(e)(null,t)}reject(e,t){this.getCallbackAndDelete(e)(t)}getCallbackAndDelete(e){const t=this.callbacks.get(e);if(!t)throw new Error("no resolver with id = "+e);return this.callbacks.delete(e),t}};const c=(e,t)=>(a,r)=>{a?t(a):e(r)};var l,u,i,m=class{constructor(){this.manager=new o}getPromise(e){return new Promise(async(t,a)=>{const r=c(t,a);this.manager.add(e,r)})}getPromiseWithId(e){return new Promise(async(t,a)=>{const r=c(t,a),s=this.manager.addAndGetId(r);e&&e(s)})}resolve(e,t){this.manager.resolve(e,t)}reject(e,t){this.manager.reject(e,t)}},d=a(80),p=a.n(d);l=new WeakMap,u=new WeakMap,i=new WeakMap;var b=class{constructor(e,t){l.set(this,void 0),u.set(this,new m),i.set(this,void 0),n(this,i,t),n(this,l,e),s(this,l).onmessage=e=>{const{messageId:t,data:a}=e.data;s(this,u).resolve(t,a)}}sendAndReceive(e){const t=s(this,u).getPromiseWithId(t=>{s(this,l).postMessage({messageId:t,data:e})});return void 0===s(this,i)?t:p()(t,s(this,i))}terminate(){s(this,l).terminate()}};t.a=(e,t)=>{const a=Object(r.useMemo)(()=>new b(new e,t),[e,t]);return Object(r.useEffect)(()=>()=>{a.terminate()},[a]),Object(r.useCallback)(a.sendAndReceive.bind(a),[a])}},89:function(e,t,a){"use strict";var r=a(0),s=a.n(r),n=a(2),o=a(73),c=a(67),l=a(72),u=a(96),i=a(70),m=a(66),d=a(81),p=a(74),b=a(71),f=a(82),h=a(90);const g=n.e`
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
`,k=n.c`
  animation: ${w} 3s ease-out normal forwards;
`;var O=Object(n.d)(m.a)`
  ${e=>e.possible&&j}
  ${e=>e.picked&&k}
`;var E=Object(r.memo)(({team:e,possible:t})=>{var a;const n=Object(d.a)(e),[o,c]=Object(r.useState)(e),l=Object(r.useRef)(null),u=Object(r.useCallback)(()=>{c(e)},[e]);return s.a.createElement(s.a.Fragment,null,s.a.createElement(O,{picked:!!o,possible:t},o?s.a.createElement(b.a,{country:Object(p.a)(o)},null!==(a=o.shortName)&&void 0!==a?a:o.name):s.a.createElement(f.a,{ref:l})),e&&e!==n&&s.a.createElement(h.a,{from:`[data-cellid='${e.id}']`,to:l,duration:350,team:e,onAnimationEnd:u}))});var v=Object(r.memo)(({maxTeams:e,groupLetter:t,teams:a,potNum:r,possible:n,headerStyles:o})=>s.a.createElement(l.a,null,s.a.createElement("thead",null,s.a.createElement(i.a,null,s.a.createElement(m.a,null,s.a.createElement(u.a,{styles:o},"Group"," ",t)))),s.a.createElement("tbody",null,c(e).map(e=>s.a.createElement(i.a,{key:e},s.a.createElement(E,{team:a[e],possible:e===r&&n}))))));const P=n.d.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,T=Object(r.forwardRef)(({maxTeams:e,currentPotNum:t,groups:a,possibleGroups:r,getGroupHeaderStyles:n},c)=>s.a.createElement(P,{ref:c},null==a?void 0:a.map((a,c)=>{const l=Object(o.a)(c),u=null==n?void 0:n(c);return s.a.createElement(v,{key:l,maxTeams:e,groupLetter:l,teams:a,potNum:t,possible:!!(null==r?void 0:r.includes(c)),headerStyles:u})})));t.a=Object(r.memo)(T)}},0,[80]]);