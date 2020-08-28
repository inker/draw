/*! For license information please see el-gs.d1e5c6bba2cf6b2b649b.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[3,7],{77:function(e,t,a){"use strict";var n=a(0);Object.create;Object.create;function r(e,t){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return t.get(e)}function s(e,t,a){if(!t.has(e))throw new TypeError("attempted to set private field on non-instance");return t.set(e,a),a}var o=class{constructor(){this.callbacks=new Map}add(e,t){this.callbacks.set(e,t)}addAndGetId(e){const t=Math.random().toString(36).slice(2);return this.add(t,e),t}resolve(e,t){this.getCallbackAndDelete(e)(null,t)}reject(e,t){this.getCallbackAndDelete(e)(t)}getCallbackAndDelete(e){const t=this.callbacks.get(e);if(!t)throw new Error("no resolver with id = "+e);return this.callbacks.delete(e),t}};const c=(e,t)=>(a,n)=>{a?t(a):e(n)};var l,i,u,d=class{constructor(){this.manager=new o}getPromise(e){return new Promise(async(t,a)=>{const n=c(t,a);this.manager.add(e,n)})}getPromiseWithId(e){return new Promise(async(t,a)=>{const n=c(t,a),r=this.manager.addAndGetId(n);e&&e(r)})}resolve(e,t){this.manager.resolve(e,t)}reject(e,t){this.manager.reject(e,t)}},m=a(86),p=a.n(m);l=new WeakMap,i=new WeakMap,u=new WeakMap;var b=class{constructor(e,t){l.set(this,void 0),i.set(this,new d),u.set(this,void 0),s(this,u,t),s(this,l,e),r(this,l).onmessage=e=>{const{messageId:t,data:a}=e.data;r(this,i).resolve(t,a)}}sendAndReceive(e){const t=r(this,i).getPromiseWithId(t=>{r(this,l).postMessage({messageId:t,data:e})});return void 0===r(this,u)?t:p()(t,r(this,u))}terminate(){r(this,l).terminate()}};t.a=e=>{const t=Object(n.useMemo)(()=>new b(new e,12e4),[]);return Object(n.useEffect)(()=>()=>{t.terminate()},[]),Object(n.useCallback)(t.sendAndReceive.bind(t),[t])}},79:function(e,t,a){"use strict";var n=a(0),r=a.n(n),s=a(1),o=a(61),c=a(91),l=a(62),i=a(64),u=a(92),d=a(60),m=a(59),p=a(65),b=a(71);const h=s.e`
  from {
    background-color: white;
    box-shadow: 0 0 20px #08f;
  }
  to {}
`,f=s.e`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,g=s.c`
  position: relative; /* enables glow */
  animation: ${h} 1s ease;
  box-shadow: 0 0 5px #6af;
`,w=s.c`
  animation: ${f} 5s normal forwards;
`;var k=Object(s.d)(m.a)`
  ${e=>e.possible&&g}
  ${e=>e.hasTeam&&w}
`,E=a(69),O=e=>{var t;return null!==(t=e.country)&&void 0!==t?t:e.name in E?e.name:void 0};var j=Object(n.memo)(({team:e,possible:t,cellId:a})=>{var n;return r.a.createElement(d.a,null,r.a.createElement(k,{hasTeam:!!e,possible:t},e?r.a.createElement(p.a,{country:O(e)},null!==(n=e.shortName)&&void 0!==n?n:e.name):r.a.createElement(b.a,{"data-cellid":a})))});var v=Object(n.memo)(({maxTeams:e,groupLetter:t,teams:a,potNum:n,possible:s,airborneTeams:o,headerStyles:p})=>{const b=c(a,o);return r.a.createElement(i.a,null,r.a.createElement("thead",null,r.a.createElement(d.a,null,r.a.createElement(m.a,null,r.a.createElement(u.a,{styles:p},"Group"," ",t)))),r.a.createElement("tbody",null,l(e).map(e=>r.a.createElement(j,{key:e,team:b[e],possible:e===n&&s,cellId:`${t}${e}`}))))});const y=s.d.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,T=Object(n.forwardRef)(({maxTeams:e,currentPotNum:t,groups:a,possibleGroups:n,airborneTeams:s,getGroupHeaderStyles:c},l)=>r.a.createElement(y,{ref:l},null==a?void 0:a.map((a,l)=>{const i=Object(o.a)(l),u=null==c?void 0:c(l);return r.a.createElement(v,{key:i,maxTeams:e,groupLetter:i,teams:a,potNum:t,possible:!!(null==n?void 0:n.includes(l)),airborneTeams:s,headerStyles:u})})));t.a=Object(n.memo)(T)},81:function(e,t,a){"use strict";var n=a(0),r=a(68),s=a.n(r);const o={key:null,isTimedOut:!1},c="TIMEOUT_VALUE_SET",l="TIMEOUT_RESET";function i(e,t){switch(t.type){case c:return{key:t.payload,isTimedOut:!!t.payload&&t.payload===e.key};case l:return o;default:throw new Error("Unknown action: "+t)}}t.a=e=>{const[t,a]=Object(n.useReducer)(i,o),r=async t=>{a({type:c,payload:t}),await s()(e),a({type:c,payload:t})},u=()=>{a({type:l})},d=Object(n.useMemo)(()=>({set:r,reset:u}),[]);return[t.isTimedOut,d]}},96:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(1),o=a(70),c=a(2),l=a(63),i=a(66),u=a(80),d=a(81),m=a(77),p=a(61),b=a(78),h=a(76),f=a(79),g=a(72),w=a(73),k=a(82),E=a(75),O=a(74),j=a(97);const v=s.c`
  background-color: #ffc0c0;
`,y=s.c`
  background-color: #c0e0ff;
`;function T(e){return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:e[0]}}t.default=Object(n.memo)(({season:e,pots:t})=>{const[a,s]=Object(l.a)(),P=Object(n.useMemo)(()=>t.map(e=>o(e)),[t,a]),G=Object(n.useMemo)(()=>t[0].map(()=>[]),[t,a]),[{currentPotNum:x,selectedTeam:M,pickedGroup:A,hungPot:I},N]=Object(n.useState)(()=>T(P));Object(n.useEffect)(()=>{N(T(P))},[P]);const[,S]=Object(c.a)(),[$]=Object(i.a)(),C=Object(m.a)(j.default),[R,W]=Object(u.a)(),[U,D]=Object(d.a)(3e3),L=Object(n.useRef)(null),_=Object(n.useCallback)(e=>e<G.length>>1?v:y,[G.length]),H=Object(n.useCallback)(async t=>(await C({season:e,pots:P,groups:G,selectedTeam:t})).pickedGroup,[P,G,e,C]),J=Object(n.useCallback)(e=>{if(M)return;const t=P[x];t[e]&&N({currentPotNum:x,hungPot:t.slice(),selectedTeam:t.splice(e,1)[0],pickedGroup:null})},[P,x]);Object(n.useEffect)(()=>{M&&(async()=>{if(!M)throw new Error("no selected team");let e;D.set(M);try{e=await H(M)}catch(e){return console.error(e),void S({error:"Could not determine the group"})}G[e].push(M);const t=P[x].length>0?x:x+1;W.add(M),D.reset(),N({selectedTeam:null,pickedGroup:e,hungPot:P[t],currentPotNum:t})})()},[M]);const V=x>=P.length;return r.a.createElement(O.a,null,r.a.createElement(g.a,null,r.a.createElement(h.a,{selectedTeams:M&&[M],initialPots:t,pots:P,currentPotNum:x}),r.a.createElement(f.a,{ref:L,maxTeams:P.length,currentPotNum:x,groups:G,possibleGroups:null,airborneTeams:R,getGroupHeaderStyles:_})),r.a.createElement(w.a,null,r.a.createElement(k.a,{forceNoSelect:!!M,display:!V,displayTeams:$,selectedTeam:M,pot:I,onPick:J}),r.a.createElement(E.a,{long:!0,calculating:U,completed:V,isAirborneAnimation:R.length>0,selectedTeam:M,pickedGroup:A,possibleGroups:null,numGroups:G.length,groupsElement:L.current,reset:s})),R.map(e=>{const t=G.findIndex(t=>t.includes(e)),a=Object(p.a)(t),n=G[t].indexOf(e);return r.a.createElement(b.a,{key:e.id,from:`[data-cellid='${e.id}']`,to:`[data-cellid='${a}${n}']`,duration:350,data:e,onAnimationEnd:W.remove})}))})},97:function(e,t,a){"use strict";a.r(t),t.default=function(){return new Worker(a.p+"worker.7183f99cec5bacceb968.worker.js")}}},0,[80]]);