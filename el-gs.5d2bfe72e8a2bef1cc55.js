/*! For license information please see el-gs.5d2bfe72e8a2bef1cc55.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[3,7],{79:function(e,t,a){"use strict";var n=a(0);Object.create;Object.create;function r(e,t){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return t.get(e)}function s(e,t,a){if(!t.has(e))throw new TypeError("attempted to set private field on non-instance");return t.set(e,a),a}var o=class{constructor(){this.callbacks=new Map}add(e,t){this.callbacks.set(e,t)}addAndGetId(e){const t=Math.random().toString(36).slice(2);return this.add(t,e),t}resolve(e,t){this.getCallbackAndDelete(e)(null,t)}reject(e,t){this.getCallbackAndDelete(e)(t)}getCallbackAndDelete(e){const t=this.callbacks.get(e);if(!t)throw new Error("no resolver with id = "+e);return this.callbacks.delete(e),t}};const c=(e,t)=>(a,n)=>{a?t(a):e(n)};var l,u,i,m=class{constructor(){this.manager=new o}getPromise(e){return new Promise(async(t,a)=>{const n=c(t,a);this.manager.add(e,n)})}getPromiseWithId(e){return new Promise(async(t,a)=>{const n=c(t,a),r=this.manager.addAndGetId(n);e&&e(r)})}resolve(e,t){this.manager.resolve(e,t)}reject(e,t){this.manager.reject(e,t)}},d=a(87),p=a.n(d);l=new WeakMap,u=new WeakMap,i=new WeakMap;var b=class{constructor(e,t){l.set(this,void 0),u.set(this,new m),i.set(this,void 0),s(this,i,t),s(this,l,e),r(this,l).onmessage=e=>{const{messageId:t,data:a}=e.data;r(this,u).resolve(t,a)}}sendAndReceive(e){const t=r(this,u).getPromiseWithId(t=>{r(this,l).postMessage({messageId:t,data:e})});return void 0===r(this,i)?t:p()(t,r(this,i))}terminate(){r(this,l).terminate()}};t.a=e=>{const t=Object(n.useMemo)(()=>new b(new e,12e4),[]);return Object(n.useEffect)(()=>()=>{t.terminate()},[]),Object(n.useCallback)(t.sendAndReceive.bind(t),[t])}},80:function(e,t,a){"use strict";var n=a(0),r=a.n(n),s=a(1),o=a(68),c=a(61),l=a(66),u=a(92),i=a(63),m=a(60),d=a(72),p=a(67),b=a(73),h=a(81);const f=s.e`
  from {
    background-color: white;
    box-shadow: 0 0 20px #08f;
  }
  to {}
`,g=s.e`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,w=s.c`
  position: relative; /* enables glow */
  animation: ${f} 1s ease;
  box-shadow: 0 0 5px #6af;
`,E=s.c`
  animation: ${g} 5s normal forwards;
`;var k=Object(s.d)(m.a)`
  ${e=>e.possible&&w}
  ${e=>e.hasTeam&&E}
`,O=a(62),j=e=>{var t;return null!==(t=e.country)&&void 0!==t?t:e.name in O?e.name:void 0};var v=Object(n.memo)(({team:e,possible:t})=>{var a;const s=Object(d.a)(e),[o,c]=Object(n.useState)(e),l=Object(n.useRef)(null),u=Object(n.useCallback)(()=>{c(e)},[e]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(k,{hasTeam:!!o,possible:t},o?r.a.createElement(p.a,{country:j(o)},null!==(a=o.shortName)&&void 0!==a?a:o.name):r.a.createElement(b.a,{ref:l})),e&&e!==s&&r.a.createElement(h.a,{from:`[data-cellid='${e.id}']`,to:l,duration:350,data:e,onAnimationEnd:u}))});var y=Object(n.memo)(({maxTeams:e,groupLetter:t,teams:a,potNum:n,possible:s,headerStyles:o})=>r.a.createElement(l.a,null,r.a.createElement("thead",null,r.a.createElement(i.a,null,r.a.createElement(m.a,null,r.a.createElement(u.a,{styles:o},"Group"," ",t)))),r.a.createElement("tbody",null,c(e).map(e=>r.a.createElement(i.a,{key:e},r.a.createElement(v,{team:a[e],possible:e===n&&s}))))));const T=s.d.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,P=Object(n.forwardRef)(({maxTeams:e,currentPotNum:t,groups:a,possibleGroups:n,getGroupHeaderStyles:s},c)=>r.a.createElement(T,{ref:c},null==a?void 0:a.map((a,c)=>{const l=Object(o.a)(c),u=null==s?void 0:s(c);return r.a.createElement(y,{key:l,maxTeams:e,groupLetter:l,teams:a,potNum:t,possible:!!(null==n?void 0:n.includes(c)),headerStyles:u})})));t.a=Object(n.memo)(P)},82:function(e,t,a){"use strict";var n=a(0),r=a(65),s=a.n(r);const o={key:null,isTimedOut:!1},c="TIMEOUT_VALUE_SET",l="TIMEOUT_RESET";function u(e,t){switch(t.type){case c:return{key:t.payload,isTimedOut:!!t.payload&&t.payload===e.key};case l:return o;default:throw new Error("Unknown action: "+t)}}t.a=e=>{const[t,a]=Object(n.useReducer)(u,o),r=async t=>{a({type:c,payload:t}),await s()(e),a({type:c,payload:t})},i=()=>{a({type:l})},m=Object(n.useMemo)(()=>({set:r,reset:i}),[]);return[t.isTimedOut,m]}},96:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(1),o=a(71),c=a(2),l=a(64),u=a(69),i=a(82),m=a(79),d=a(78),p=a(80),b=a(74),h=a(75),f=a(83),g=a(77),w=a(76),E=a(97);const k=s.c`
  background-color: #ffc0c0;
`,O=s.c`
  background-color: #c0e0ff;
`;function j(e){const t=e.map(e=>o(e));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:t[0],pots:t,groups:e[0].map(()=>[])}}t.default=Object(n.memo)(({season:e,pots:t})=>{const[a,s]=Object(l.a)(),[{currentPotNum:o,selectedTeam:v,pickedGroup:y,hungPot:T,pots:P,groups:G},x]=Object(n.useState)(()=>j(t));Object(n.useEffect)(()=>{x(j(t))},[t,a]);const[,N]=Object(c.a)(),[M]=Object(u.a)(),S=Object(m.a)(E.default),[A,C]=Object(i.a)(3e3),I=Object(n.useRef)(null),R=Object(n.useCallback)(e=>e<G.length>>1?k:O,[G.length]),W=Object(n.useCallback)(e=>{if(v)return;const t=P[o],a=t[e];if(!a)return;const n=P.slice();n[o]=n[o].filter((t,a)=>a!==e),x({currentPotNum:o,hungPot:t.slice(),selectedTeam:a,pickedGroup:null,pots:n,groups:G})},[P,G,o,v]);Object(n.useEffect)(()=>{v&&(async()=>{if(!v)throw new Error("no selected team");let t;C.set(v);try{t=(await S({season:e,pots:P,groups:G,selectedTeam:v})).pickedGroup}catch(e){return console.error(e),void N({error:"Could not determine the group"})}C.reset();const a=G.slice();a[t]=[...a[t],v];const n=P[o].length>0?o:o+1;x({selectedTeam:null,pickedGroup:t,hungPot:P[n],currentPotNum:n,pots:P,groups:a})})()},[v]);const $=o>=P.length;return r.a.createElement(w.a,null,r.a.createElement(b.a,null,r.a.createElement(d.a,{selectedTeams:v&&[v],initialPots:t,pots:P,currentPotNum:o}),r.a.createElement(p.a,{ref:I,maxTeams:P.length,currentPotNum:o,groups:G,possibleGroups:null,getGroupHeaderStyles:R})),r.a.createElement(h.a,null,r.a.createElement(f.a,{forceNoSelect:!!v,display:!$,displayTeams:M,selectedTeam:v,pot:T,onPick:W}),r.a.createElement(g.a,{long:!0,calculating:A,completed:$,selectedTeam:v,pickedGroup:y,possibleGroups:null,isDisplayPossibleGroupsText:!!v,numGroups:G.length,groupsElement:I.current,reset:s})))})},97:function(e,t,a){"use strict";a.r(t),t.default=function(){return new Worker(a.p+"worker.7183f99cec5bacceb968.worker.js")}}},0,[80]]);