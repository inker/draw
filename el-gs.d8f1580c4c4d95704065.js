/*! For license information please see el-gs.d8f1580c4c4d95704065.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[3,7],{78:function(e,t,a){"use strict";var n=a(0);Object.create;Object.create;function r(e,t){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return t.get(e)}function s(e,t,a){if(!t.has(e))throw new TypeError("attempted to set private field on non-instance");return t.set(e,a),a}var o=class{constructor(){this.callbacks=new Map}add(e,t){this.callbacks.set(e,t)}addAndGetId(e){const t=Math.random().toString(36).slice(2);return this.add(t,e),t}resolve(e,t){this.getCallbackAndDelete(e)(null,t)}reject(e,t){this.getCallbackAndDelete(e)(t)}getCallbackAndDelete(e){const t=this.callbacks.get(e);if(!t)throw new Error("no resolver with id = "+e);return this.callbacks.delete(e),t}};const c=(e,t)=>(a,n)=>{a?t(a):e(n)};var l,u,i,m=class{constructor(){this.manager=new o}getPromise(e){return new Promise(async(t,a)=>{const n=c(t,a);this.manager.add(e,n)})}getPromiseWithId(e){return new Promise(async(t,a)=>{const n=c(t,a),r=this.manager.addAndGetId(n);e&&e(r)})}resolve(e,t){this.manager.resolve(e,t)}reject(e,t){this.manager.reject(e,t)}},d=a(86),p=a.n(d);l=new WeakMap,u=new WeakMap,i=new WeakMap;var b=class{constructor(e,t){l.set(this,void 0),u.set(this,new m),i.set(this,void 0),s(this,i,t),s(this,l,e),r(this,l).onmessage=e=>{const{messageId:t,data:a}=e.data;r(this,u).resolve(t,a)}}sendAndReceive(e){const t=r(this,u).getPromiseWithId(t=>{r(this,l).postMessage({messageId:t,data:e})});return void 0===r(this,i)?t:p()(t,r(this,i))}terminate(){r(this,l).terminate()}};t.a=e=>{const t=Object(n.useMemo)(()=>new b(new e,12e4),[]);return Object(n.useEffect)(()=>()=>{t.terminate()},[]),Object(n.useCallback)(t.sendAndReceive.bind(t),[t])}},79:function(e,t,a){"use strict";var n=a(0),r=a.n(n),s=a(1),o=a(67),c=a(60),l=a(65),u=a(91),i=a(62),m=a(59),d=a(71),p=a(66),b=a(72),h=a(80);const f=s.e`
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
`,O=a(61),j=e=>{var t;return null!==(t=e.country)&&void 0!==t?t:e.name in O?e.name:void 0};var v=Object(n.memo)(({team:e,possible:t})=>{var a;const s=Object(d.a)(e),[o,c]=Object(n.useState)(e),l=Object(n.useRef)(null),u=Object(n.useCallback)(()=>{c(e)},[e]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(k,{hasTeam:!!o,possible:t},o?r.a.createElement(p.a,{country:j(o)},null!==(a=o.shortName)&&void 0!==a?a:o.name):r.a.createElement(b.a,{ref:l})),e&&e!==s&&r.a.createElement(h.a,{from:`[data-cellid='${e.id}']`,to:l,duration:350,data:e,onAnimationEnd:u}))});var y=Object(n.memo)(({maxTeams:e,groupLetter:t,teams:a,potNum:n,possible:s,headerStyles:o})=>r.a.createElement(l.a,null,r.a.createElement("thead",null,r.a.createElement(i.a,null,r.a.createElement(m.a,null,r.a.createElement(u.a,{styles:o},"Group"," ",t)))),r.a.createElement("tbody",null,c(e).map(e=>r.a.createElement(i.a,{key:e},r.a.createElement(v,{team:a[e],possible:e===n&&s}))))));const T=s.d.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,P=Object(n.forwardRef)(({maxTeams:e,currentPotNum:t,groups:a,possibleGroups:n,getGroupHeaderStyles:s},c)=>r.a.createElement(T,{ref:c},null==a?void 0:a.map((a,c)=>{const l=Object(o.a)(c),u=null==s?void 0:s(c);return r.a.createElement(y,{key:l,maxTeams:e,groupLetter:l,teams:a,potNum:t,possible:!!(null==n?void 0:n.includes(c)),headerStyles:u})})));t.a=Object(n.memo)(P)},81:function(e,t,a){"use strict";var n=a(0),r=a(64),s=a.n(r);const o={key:null,isTimedOut:!1},c="TIMEOUT_VALUE_SET",l="TIMEOUT_RESET";function u(e,t){switch(t.type){case c:return{key:t.payload,isTimedOut:!!t.payload&&t.payload===e.key};case l:return o;default:throw new Error("Unknown action: "+t)}}t.a=e=>{const[t,a]=Object(n.useReducer)(u,o),r=async t=>{a({type:c,payload:t}),await s()(e),a({type:c,payload:t})},i=()=>{a({type:l})},m=Object(n.useMemo)(()=>({set:r,reset:i}),[]);return[t.isTimedOut,m]}},95:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(1),o=a(70),c=a(2),l=a(63),u=a(68),i=a(81),m=a(78),d=a(77),p=a(79),b=a(73),h=a(74),f=a(82),g=a(76),w=a(75),E=a(96);const k=s.c`
  background-color: #ffc0c0;
`,O=s.c`
  background-color: #c0e0ff;
`;function j(e){return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:e[0],groups:e[0].map(()=>[])}}t.default=Object(n.memo)(({season:e,pots:t})=>{const[a,s]=Object(l.a)(),v=Object(n.useMemo)(()=>t.map(e=>o(e)),[t,a]),[{currentPotNum:y,selectedTeam:T,pickedGroup:P,hungPot:G,groups:x},M]=Object(n.useState)(()=>j(v));Object(n.useEffect)(()=>{M(j(v))},[v]);const[,N]=Object(c.a)(),[S]=Object(u.a)(),A=Object(m.a)(E.default),[C,I]=Object(i.a)(3e3),R=Object(n.useRef)(null),W=Object(n.useCallback)(e=>e<x.length>>1?k:O,[x.length]),$=Object(n.useCallback)(async t=>(await A({season:e,pots:v,groups:x,selectedTeam:t})).pickedGroup,[v,x,e,A]),U=Object(n.useCallback)(e=>{if(T)return;const t=v[y];t[e]&&M({currentPotNum:y,hungPot:t.slice(),selectedTeam:t.splice(e,1)[0],pickedGroup:null,groups:x})},[v,x,y]);Object(n.useEffect)(()=>{T&&(async()=>{if(!T)throw new Error("no selected team");let e;I.set(T);try{e=await $(T)}catch(e){return console.error(e),void N({error:"Could not determine the group"})}const t=x.slice();t[e]=[...t[e],T];const a=v[y].length>0?y:y+1;I.reset(),M({selectedTeam:null,pickedGroup:e,hungPot:v[a],currentPotNum:a,groups:t})})()},[T]);const D=y>=v.length;return r.a.createElement(w.a,null,r.a.createElement(b.a,null,r.a.createElement(d.a,{selectedTeams:T&&[T],initialPots:t,pots:v,currentPotNum:y}),r.a.createElement(p.a,{ref:R,maxTeams:v.length,currentPotNum:y,groups:x,possibleGroups:null,getGroupHeaderStyles:W})),r.a.createElement(h.a,null,r.a.createElement(f.a,{forceNoSelect:!!T,display:!D,displayTeams:S,selectedTeam:T,pot:G,onPick:U}),r.a.createElement(g.a,{long:!0,calculating:C,completed:D,selectedTeam:T,pickedGroup:P,possibleGroups:null,numGroups:x.length,groupsElement:R.current,reset:s})))})},96:function(e,t,a){"use strict";a.r(t),t.default=function(){return new Worker(a.p+"worker.7183f99cec5bacceb968.worker.js")}}},0,[80]]);