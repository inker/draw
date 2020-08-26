/*! For license information please see cl-gs.069033687fb0017ca88d.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[1,6],{101:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),s=a(70),o=a(2),c=a(63),l=a(66),i=a(80),u=a(81),d=a(77),m=a(61),p=a(78),b=a(76),f=a(79),h=a(72),g=a(73),w=a(82),k=a(1),v=a(126);var E=Object(k.c)(v.a)`
  &:hover {
    ${e=>!e.noHover&&"background: radial-gradient(#ccf, #ccf)"};
  }
`;const O=k.c.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 999px) {
    justify-content: center;
  }
`;var j=Object(r.memo)(({display:e,displayGroups:t,possibleGroups:a,onPick:s})=>{const o=Object(r.useCallback)(e=>{const t=e.target,a=+t.dataset.group;if(Number.isNaN(a))throw new TypeError("Incorrect group ball: "+t.dataset.group);s(a)},[s]);return n.a.createElement(O,null,e&&(null==a?void 0:a.map(e=>n.a.createElement(E,{key:e,"data-group":e,forceVisible:t,onClick:o},Object(m.a)(e)))))}),y=a(75),T=a(74),G=a(94);const x=["#ffc0c0","#c0e0ff"];function P(e){return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:e[0],possibleGroups:null,possibleGroupsShuffled:null}}t.default=Object(r.memo)(({season:e,pots:t})=>{const[a,k]=Object(c.a)(),v=Object(r.useMemo)(()=>t.map(e=>s(e)),[t,a]),E=Object(r.useMemo)(()=>t[0].map(()=>[]),[t,a]),[{currentPotNum:O,selectedTeam:N,pickedGroup:M,hungPot:A,possibleGroups:C,possibleGroupsShuffled:I},$]=Object(r.useState)(()=>P(v));Object(r.useEffect)(()=>{$(P(v))},[v]);const[,S]=Object(o.a)(),[R]=Object(l.a)(),W=Object(d.a)(G.default),[L,U]=Object(i.a)(),[D,_]=Object(u.a)(3e3),J=Object(r.useRef)(null),V=Object(r.useCallback)(async t=>(await W({season:e,pots:v,groups:E,selectedTeam:t})).possibleGroups,[v,E,e,W]),H=Object(r.useCallback)(async e=>{if(N)return;const t=v[O];if(!t[e])return;const a=t.splice(e,1)[0];_.set(a);const r=await V(a);_.reset(),$({currentPotNum:O,hungPot:t.slice(),selectedTeam:a,possibleGroups:r,possibleGroupsShuffled:s(r),pickedGroup:null})},[v,E,O,V]),q=Object(r.useCallback)(e=>{if(!N)return void S({error:"No selected team..."});E[e].push(N);const t=v[O].length>0?O:O+1;U.add(N),$({selectedTeam:null,pickedGroup:e,hungPot:v[t],possibleGroups:null,possibleGroupsShuffled:null,currentPotNum:t})},[v,E,N,O]),z=O>=v.length;return n.a.createElement(T.a,null,n.a.createElement(h.a,null,n.a.createElement(b.a,{selectedTeams:N&&[N],initialPots:t,pots:v,currentPotNum:O}),n.a.createElement(f.a,{ref:J,maxTeams:v.length,currentPotNum:O,groups:E,possibleGroups:C,airborneTeams:L,groupColors:x})),n.a.createElement(g.a,null,n.a.createElement(w.a,{display:!z,displayTeams:R,selectedTeam:N,pot:A,onPick:H}),n.a.createElement(y.a,{long:!1,calculating:D,completed:z,isAirborneAnimation:L.length>0,selectedTeam:N,pickedGroup:M,possibleGroups:C,numGroups:E.length,groupsElement:J.current,reset:k}),n.a.createElement(j,{display:!z,displayGroups:R,possibleGroups:I,onPick:q})),L.map(e=>{const t=E.findIndex(t=>t.includes(e)),a=Object(m.a)(t),r=E[t].indexOf(e);return n.a.createElement(p.a,{key:e.id,from:`[data-cellid='${e.id}']`,to:`[data-cellid='${a}${r}']`,duration:350,data:e,onAnimationEnd:U.remove})}))})},77:function(e,t,a){"use strict";var r=a(0);Object.create;Object.create;function n(e,t){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return t.get(e)}function s(e,t,a){if(!t.has(e))throw new TypeError("attempted to set private field on non-instance");return t.set(e,a),a}var o=class{constructor(){this.callbacks=new Map}add(e,t){this.callbacks.set(e,t)}addAndGetId(e){const t=Math.random().toString(36).slice(2);return this.add(t,e),t}resolve(e,t){this.getCallbackAndDelete(e)(null,t)}reject(e,t){this.getCallbackAndDelete(e)(t)}getCallbackAndDelete(e){const t=this.callbacks.get(e);if(!t)throw new Error("no resolver with id = "+e);return this.callbacks.delete(e),t}};const c=(e,t)=>(a,r)=>{a?t(a):e(r)};var l,i,u,d=class{constructor(){this.manager=new o}getPromise(e){return new Promise(async(t,a)=>{const r=c(t,a);this.manager.add(e,r)})}getPromiseWithId(e){return new Promise(async(t,a)=>{const r=c(t,a),n=this.manager.addAndGetId(r);e&&e(n)})}resolve(e,t){this.manager.resolve(e,t)}reject(e,t){this.manager.reject(e,t)}},m=a(86),p=a.n(m);l=new WeakMap,i=new WeakMap,u=new WeakMap;var b=class{constructor(e,t){l.set(this,void 0),i.set(this,new d),u.set(this,void 0),s(this,u,t),s(this,l,e),n(this,l).onmessage=e=>{const{messageId:t,data:a}=e.data;n(this,i).resolve(t,a)}}sendAndReceive(e){const t=n(this,i).getPromiseWithId(t=>{n(this,l).postMessage({messageId:t,data:e})});return void 0===n(this,u)?t:p()(t,n(this,u))}terminate(){n(this,l).terminate()}};t.a=e=>{const t=Object(r.useMemo)(()=>new b(new e,12e4),[]);return Object(r.useEffect)(()=>()=>{t.terminate()},[]),Object(r.useCallback)(t.sendAndReceive.bind(t),[t])}},79:function(e,t,a){"use strict";var r=a(0),n=a.n(r),s=a(1),o=a(61),c=a(91),l=a(62),i=a(64),u=a(92),d=a(60),m=a(59),p=a(65),b=a(71);const f=s.d`
  from {
    background-color: white;
    box-shadow: 0 0 20px #08f;
  }
  to {}
`,h=s.d`
  from {
    background-color: #ff8;
  }
  to {}
`,g=s.b`
  position: relative; /* enables glow */
  background-color: rgba(255, 255, 255, 0.9);
  animation: ${f} 1s ease;
  box-shadow: 0 0 5px #6af;
`,w=s.b`
  animation: ${h} 5s normal forwards;
`;var k=Object(s.c)(m.a)`
  ${e=>e.possible&&g}
  ${e=>e.picked&&w}
`,v=a(69),E=e=>{var t;return null!==(t=e.country)&&void 0!==t?t:e.name in v?e.name:void 0};var O=Object(r.memo)(({index:e,teams:t,possible:a,groupLetter:r})=>{var s;const o=t[e];return n.a.createElement(d.a,null,n.a.createElement(k,{picked:!!o,possible:a},o?n.a.createElement(p.a,{country:E(o)},null!==(s=o.shortName)&&void 0!==s?s:o.name):n.a.createElement(b.a,{"data-cellid":`${r}${e}`})))});var j=Object(r.memo)(({maxTeams:e,groupLetter:t,teams:a,potNum:r,possible:s,airborneTeams:o,background:p,color:b})=>{const f=c(a,o);return n.a.createElement(i.a,null,n.a.createElement("thead",null,n.a.createElement(d.a,null,n.a.createElement(m.a,null,n.a.createElement(u.a,{background:p,color:b},"Group"," ",t)))),n.a.createElement("tbody",null,l(e).map(e=>n.a.createElement(O,{key:e,index:e,teams:f,possible:e===r&&s,groupLetter:t}))))});const y=s.c.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,T=Object(r.forwardRef)(({maxTeams:e,currentPotNum:t,groups:a,possibleGroups:r,airborneTeams:s,groupColors:c},l)=>n.a.createElement(y,{ref:l},null==a?void 0:a.map((l,i)=>{const u=Object(o.a)(i),d=null==c?void 0:c[~~(i/a.length*c.length)];return n.a.createElement(j,{key:u,maxTeams:e,groupLetter:u,teams:l,potNum:t,possible:!!(null==r?void 0:r.includes(i)),airborneTeams:s,background:d})})));t.a=Object(r.memo)(T)},81:function(e,t,a){"use strict";var r=a(0),n=a(68),s=a.n(n);const o={key:null,isTimedOut:!1},c="TIMEOUT_VALUE_SET",l="TIMEOUT_RESET";function i(e,t){switch(t.type){case c:return{key:t.payload,isTimedOut:!!t.payload&&t.payload===e.key};case l:return o;default:throw new Error("Unknown action: "+t)}}t.a=e=>{const[t,a]=Object(r.useReducer)(i,o),n=async t=>{a({type:c,payload:t}),await s()(e),a({type:c,payload:t})},u=()=>{a({type:l})},d=Object(r.useMemo)(()=>({set:n,reset:u}),[]);return[t.isTimedOut,d]}},94:function(e,t,a){"use strict";a.r(t),t.default=function(){return new Worker(a.p+"worker.b28e9dece7ba7c38f3a9.worker.js")}}},0,[80]]);