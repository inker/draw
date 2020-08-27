/*! For license information please see cl-gs.9a0bcbd1915c9a927369.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[1,6],{101:function(e,t,a){"use strict";a.r(t);var r=a(0),s=a.n(r),n=a(1),o=a(70),c=a(2),l=a(63),i=a(66),u=a(80),d=a(81),m=a(77),p=a(61),b=a(78),f=a(76),h=a(79),g=a(72),w=a(73),k=a(82),y=a(126);var v=Object(n.d)(y.a)`
  &:hover {
    ${e=>!e.noHover&&"background: radial-gradient(#ccf, #ccf)"};
  }
`;const O=n.d.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 999px) {
    justify-content: center;
  }
`;var j=Object(r.memo)(({display:e,displayGroups:t,possibleGroups:a,onPick:n})=>{const o=Object(r.useCallback)(e=>{const t=e.target,a=+t.dataset.group;if(Number.isNaN(a))throw new TypeError("Incorrect group ball: "+t.dataset.group);n(a)},[n]);return s.a.createElement(O,null,e&&(null==a?void 0:a.map(e=>s.a.createElement(v,{key:e,"data-group":e,forceVisible:t,onClick:o},Object(p.a)(e)))))}),E=a(75),T=a(74),G=a(94);const x=n.c`
  background-color: #ffc0c0;
`,P=n.c`
  background-color: #c0e0ff;
`;function N(e){return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:e[0],possibleGroups:null,possibleGroupsShuffled:null}}t.default=Object(r.memo)(({season:e,pots:t})=>{const[a,n]=Object(l.a)(),y=Object(r.useMemo)(()=>t.map(e=>o(e)),[t,a]),v=Object(r.useMemo)(()=>t[0].map(()=>[]),[t,a]),[{currentPotNum:O,selectedTeam:M,pickedGroup:S,hungPot:A,possibleGroups:C,possibleGroupsShuffled:I},$]=Object(r.useState)(()=>N(y));Object(r.useEffect)(()=>{$(N(y))},[y]);const[,R]=Object(c.a)(),[W]=Object(i.a)(),L=Object(m.a)(G.default),[U,D]=Object(u.a)(),[H,_]=Object(d.a)(3e3),J=Object(r.useRef)(null),V=Object(r.useCallback)(e=>e<v.length>>1?x:P,[v.length]),q=Object(r.useCallback)(async t=>(await L({season:e,pots:y,groups:v,selectedTeam:t})).possibleGroups,[y,v,e,L]),z=Object(r.useCallback)(async e=>{if(M)return;const t=y[O];if(!t[e])return;const a=t.splice(e,1)[0];_.set(a);const r=await q(a);_.reset(),$({currentPotNum:O,hungPot:t.slice(),selectedTeam:a,possibleGroups:r,possibleGroupsShuffled:o(r),pickedGroup:null})},[y,v,O,q]),B=Object(r.useCallback)(e=>{if(!M)return void R({error:"No selected team..."});v[e].push(M);const t=y[O].length>0?O:O+1;D.add(M),$({selectedTeam:null,pickedGroup:e,hungPot:y[t],possibleGroups:null,possibleGroupsShuffled:null,currentPotNum:t})},[y,v,M,O]),F=O>=y.length;return s.a.createElement(T.a,null,s.a.createElement(g.a,null,s.a.createElement(f.a,{selectedTeams:M&&[M],initialPots:t,pots:y,currentPotNum:O}),s.a.createElement(h.a,{ref:J,maxTeams:y.length,currentPotNum:O,groups:v,possibleGroups:C,airborneTeams:U,getGroupHeaderStyles:V})),s.a.createElement(w.a,null,s.a.createElement(k.a,{display:!F,displayTeams:W,selectedTeam:M,pot:A,onPick:z}),s.a.createElement(E.a,{long:!1,calculating:H,completed:F,isAirborneAnimation:U.length>0,selectedTeam:M,pickedGroup:S,possibleGroups:C,numGroups:v.length,groupsElement:J.current,reset:n}),s.a.createElement(j,{display:!F,displayGroups:W,possibleGroups:I,onPick:B})),U.map(e=>{const t=v.findIndex(t=>t.includes(e)),a=Object(p.a)(t),r=v[t].indexOf(e);return s.a.createElement(b.a,{key:e.id,from:`[data-cellid='${e.id}']`,to:`[data-cellid='${a}${r}']`,duration:350,data:e,onAnimationEnd:D.remove})}))})},77:function(e,t,a){"use strict";var r=a(0);Object.create;Object.create;function s(e,t){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return t.get(e)}function n(e,t,a){if(!t.has(e))throw new TypeError("attempted to set private field on non-instance");return t.set(e,a),a}var o=class{constructor(){this.callbacks=new Map}add(e,t){this.callbacks.set(e,t)}addAndGetId(e){const t=Math.random().toString(36).slice(2);return this.add(t,e),t}resolve(e,t){this.getCallbackAndDelete(e)(null,t)}reject(e,t){this.getCallbackAndDelete(e)(t)}getCallbackAndDelete(e){const t=this.callbacks.get(e);if(!t)throw new Error("no resolver with id = "+e);return this.callbacks.delete(e),t}};const c=(e,t)=>(a,r)=>{a?t(a):e(r)};var l,i,u,d=class{constructor(){this.manager=new o}getPromise(e){return new Promise(async(t,a)=>{const r=c(t,a);this.manager.add(e,r)})}getPromiseWithId(e){return new Promise(async(t,a)=>{const r=c(t,a),s=this.manager.addAndGetId(r);e&&e(s)})}resolve(e,t){this.manager.resolve(e,t)}reject(e,t){this.manager.reject(e,t)}},m=a(86),p=a.n(m);l=new WeakMap,i=new WeakMap,u=new WeakMap;var b=class{constructor(e,t){l.set(this,void 0),i.set(this,new d),u.set(this,void 0),n(this,u,t),n(this,l,e),s(this,l).onmessage=e=>{const{messageId:t,data:a}=e.data;s(this,i).resolve(t,a)}}sendAndReceive(e){const t=s(this,i).getPromiseWithId(t=>{s(this,l).postMessage({messageId:t,data:e})});return void 0===s(this,u)?t:p()(t,s(this,u))}terminate(){s(this,l).terminate()}};t.a=e=>{const t=Object(r.useMemo)(()=>new b(new e,12e4),[]);return Object(r.useEffect)(()=>()=>{t.terminate()},[]),Object(r.useCallback)(t.sendAndReceive.bind(t),[t])}},79:function(e,t,a){"use strict";var r=a(0),s=a.n(r),n=a(1),o=a(61),c=a(91),l=a(62),i=a(64),u=a(92),d=a(60),m=a(59),p=a(65),b=a(71);const f=n.e`
  from {
    background-color: white;
    box-shadow: 0 0 20px #08f;
  }
  to {}
`,h=n.e`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,g=n.c`
  position: relative; /* enables glow */
  background-color: rgba(255, 255, 255, 0.9);
  animation: ${f} 1s ease;
  box-shadow: 0 0 5px #6af;
`,w=n.c`
  animation: ${h} 5s normal forwards;
`;var k=Object(n.d)(m.a)`
  ${e=>e.possible&&g}
  ${e=>e.picked&&w}
`,y=a(69),v=e=>{var t;return null!==(t=e.country)&&void 0!==t?t:e.name in y?e.name:void 0};var O=Object(r.memo)(({index:e,teams:t,possible:a,groupLetter:r})=>{var n;const o=t[e];return s.a.createElement(d.a,null,s.a.createElement(k,{picked:!!o,possible:a},o?s.a.createElement(p.a,{country:v(o)},null!==(n=o.shortName)&&void 0!==n?n:o.name):s.a.createElement(b.a,{"data-cellid":`${r}${e}`})))});var j=Object(r.memo)(({maxTeams:e,groupLetter:t,teams:a,potNum:r,possible:n,airborneTeams:o,headerStyles:p})=>{const b=c(a,o);return s.a.createElement(i.a,null,s.a.createElement("thead",null,s.a.createElement(d.a,null,s.a.createElement(m.a,null,s.a.createElement(u.a,{styles:p},"Group"," ",t)))),s.a.createElement("tbody",null,l(e).map(e=>s.a.createElement(O,{key:e,index:e,teams:b,possible:e===r&&n,groupLetter:t}))))});const E=n.d.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,T=Object(r.forwardRef)(({maxTeams:e,currentPotNum:t,groups:a,possibleGroups:r,airborneTeams:n,getGroupHeaderStyles:c},l)=>s.a.createElement(E,{ref:l},null==a?void 0:a.map((a,l)=>{const i=Object(o.a)(l),u=null==c?void 0:c(l);return s.a.createElement(j,{key:i,maxTeams:e,groupLetter:i,teams:a,potNum:t,possible:!!(null==r?void 0:r.includes(l)),airborneTeams:n,headerStyles:u})})));t.a=Object(r.memo)(T)},81:function(e,t,a){"use strict";var r=a(0),s=a(68),n=a.n(s);const o={key:null,isTimedOut:!1},c="TIMEOUT_VALUE_SET",l="TIMEOUT_RESET";function i(e,t){switch(t.type){case c:return{key:t.payload,isTimedOut:!!t.payload&&t.payload===e.key};case l:return o;default:throw new Error("Unknown action: "+t)}}t.a=e=>{const[t,a]=Object(r.useReducer)(i,o),s=async t=>{a({type:c,payload:t}),await n()(e),a({type:c,payload:t})},u=()=>{a({type:l})},d=Object(r.useMemo)(()=>({set:s,reset:u}),[]);return[t.isTimedOut,d]}},94:function(e,t,a){"use strict";a.r(t),t.default=function(){return new Worker(a.p+"worker.b28e9dece7ba7c38f3a9.worker.js")}}},0,[80]]);