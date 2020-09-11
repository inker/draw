/*! For license information please see wc-gs.7129fdacd6473a86609e.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[5,9],{103:function(e,t,a){"use strict";a.r(t);var s=a(0),n=a.n(s),r=a(2),o=a(29),c=a(78),l=a(79),i=a(4),u=a(69),m=a(70),d=a(75),p=a(87),b=a(86),f=a(88),h=a(82),g=a(83),w=a(90),j=a(85),E=a(84),k=a(104);const v=o(r.c`
  background-color: #c0e0c0;
`);function O(e){const t=e.map(e=>l(e));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:t[0],pots:t,groups:e[0].map(()=>[])}}t.default=Object(s.memo)(({season:e,pots:t})=>{const[a,r]=Object(u.a)(),[o,l]=Object(m.a)(),[{currentPotNum:y,selectedTeam:P,pickedGroup:G,hungPot:T,pots:x,groups:N},A]=Object(s.useState)(()=>O(t));Object(s.useEffect)(()=>{A(O(t))},[t,a]);const[,S]=Object(i.a)(),[C]=Object(d.a)(),I=Object(p.a)(k.default),M=Object(s.useRef)(null),W=Object(s.useCallback)(e=>{if(P)return;const t=x[y][e];if(!t)return;const a=x.slice();a[y]=a[y].filter((t,a)=>a!==e),A({currentPotNum:y,hungPot:T,selectedTeam:t,pickedGroup:null,pots:a,groups:N})},[x,N,y,T,P]);Object(s.useEffect)(()=>{P&&(async()=>{if(!P)throw new Error("no selected team");let t;try{t=(await I({season:e,pots:x,groups:N,selectedTeam:P})).pickedGroup}catch(e){return console.error(e),void S({error:"Could not determine the group"})}const a=N.slice();a[t]=[...a[t],P];const s=x[y].length>0?y:y+1;A({selectedTeam:null,pickedGroup:t,hungPot:x[s],currentPotNum:s,pots:x,groups:a})})()},[P]),Object(s.useEffect)(()=>{const e=x[y].findIndex(e=>e.host);W(e)},[a]);const R=y>=x.length;Object(s.useEffect)(()=>{const e=null==T?void 0:T.length;if(o&&e){const t=c(e-1);W(t)}},[o,T]),Object(s.useEffect)(()=>{R&&o&&l(!1)},[R,o]);const $=N.length;return n.a.createElement(E.a,null,n.a.createElement(h.a,null,n.a.createElement(b.a,{selectedTeams:P&&[P],initialPots:t,pots:x,currentPotNum:y}),n.a.createElement(f.a,{ref:M,maxTeams:x.length,currentPotNum:y,groups:N,possibleGroups:null,getGroupHeaderStyles:v})),n.a.createElement(g.a,null,!o&&n.a.createElement(w.a,{forceNoSelect:!!P,display:!R,displayTeams:C,selectedTeam:P,pot:T,onPick:W}),n.a.createElement(j.a,{long:!0,completed:R,selectedTeam:P,pickedGroup:G,possibleGroups:null,isDisplayPossibleGroupsText:!!P,numGroups:$,groupsElement:M,reset:r})))})},104:function(e,t,a){"use strict";a.r(t),t.default=function(){return new Worker(a.p+"worker.e70efc5f799b581ae986.worker.js")}},87:function(e,t,a){"use strict";var s=a(0);Object.create;Object.create;function n(e,t){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return t.get(e)}function r(e,t,a){if(!t.has(e))throw new TypeError("attempted to set private field on non-instance");return t.set(e,a),a}var o=class{constructor(){this.callbacks=new Map}add(e,t){this.callbacks.set(e,t)}addAndGetId(e){const t=Math.random().toString(36).slice(2);return this.add(t,e),t}resolve(e,t){this.getCallbackAndDelete(e)(null,t)}reject(e,t){this.getCallbackAndDelete(e)(t)}getCallbackAndDelete(e){const t=this.callbacks.get(e);if(!t)throw new Error("no resolver with id = "+e);return this.callbacks.delete(e),t}};const c=(e,t)=>(a,s)=>{a?t(a):e(s)};var l,i,u,m=class{constructor(){this.manager=new o}getPromise(e){return new Promise(async(t,a)=>{const s=c(t,a);this.manager.add(e,s)})}getPromiseWithId(e){return new Promise(async(t,a)=>{const s=c(t,a),n=this.manager.addAndGetId(s);e&&e(n)})}resolve(e,t){this.manager.resolve(e,t)}reject(e,t){this.manager.reject(e,t)}},d=a(91),p=a.n(d);l=new WeakMap,i=new WeakMap,u=new WeakMap;var b=class{constructor(e,t){l.set(this,void 0),i.set(this,new m),u.set(this,void 0),r(this,u,t),r(this,l,e),n(this,l).onmessage=e=>{const{messageId:t,data:a}=e.data;n(this,i).resolve(t,a)}}sendAndReceive(e){const t=n(this,i).getPromiseWithId(t=>{n(this,l).postMessage({messageId:t,data:e})});return void 0===n(this,u)?t:p()(t,n(this,u))}terminate(){n(this,l).terminate()}};t.a=e=>{const t=Object(s.useMemo)(()=>new b(new e,12e4),[]);return Object(s.useEffect)(()=>()=>{t.terminate()},[]),Object(s.useCallback)(t.sendAndReceive.bind(t),[t])}},88:function(e,t,a){"use strict";var s=a(0),n=a.n(s),r=a(2),o=a(73),c=a(67),l=a(72),i=a(96),u=a(71),m=a(66),d=a(80),p=a(74),b=a(68),f=a(81),h=a(89);const g=r.e`
  from {
    background-color: white;
    box-shadow: 0 0 20px #08f;
  }
  to {}
`,w=r.e`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,j=r.c`
  position: relative; /* enables glow */
  animation: ${g} 1s ease;
  box-shadow: 0 0 5px #6af;
`,E=r.c`
  animation: ${w} 3s ease-out normal forwards;
`;var k=Object(r.d)(m.a)`
  ${e=>e.possible&&j}
  ${e=>e.picked&&E}
`;var v=Object(s.memo)(({team:e,possible:t})=>{var a;const r=Object(d.a)(e),[o,c]=Object(s.useState)(e),l=Object(s.useRef)(null),i=Object(s.useCallback)(()=>{c(e)},[e]);return n.a.createElement(n.a.Fragment,null,n.a.createElement(k,{picked:!!o,possible:t},o?n.a.createElement(b.a,{country:Object(p.a)(o)},null!==(a=o.shortName)&&void 0!==a?a:o.name):n.a.createElement(f.a,{ref:l})),e&&e!==r&&n.a.createElement(h.a,{from:`[data-cellid='${e.id}']`,to:l,duration:350,team:e,onAnimationEnd:i}))});var O=Object(s.memo)(({maxTeams:e,groupLetter:t,teams:a,potNum:s,possible:r,headerStyles:o})=>n.a.createElement(l.a,null,n.a.createElement("thead",null,n.a.createElement(u.a,null,n.a.createElement(m.a,null,n.a.createElement(i.a,{styles:o},"Group"," ",t)))),n.a.createElement("tbody",null,c(e).map(e=>n.a.createElement(u.a,{key:e},n.a.createElement(v,{team:a[e],possible:e===s&&r}))))));const y=r.d.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,P=Object(s.forwardRef)(({maxTeams:e,currentPotNum:t,groups:a,possibleGroups:s,getGroupHeaderStyles:r},c)=>n.a.createElement(y,{ref:c},null==a?void 0:a.map((a,c)=>{const l=Object(o.a)(c),i=null==r?void 0:r(c);return n.a.createElement(O,{key:l,maxTeams:e,groupLetter:l,teams:a,potNum:t,possible:!!(null==s?void 0:s.includes(c)),headerStyles:i})})));t.a=Object(s.memo)(P)}},0,[80]]);