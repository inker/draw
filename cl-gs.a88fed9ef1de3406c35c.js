/*! For license information please see cl-gs.a88fed9ef1de3406c35c.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[1,6],{101:function(e,t,a){"use strict";a.r(t);var s=a(0),r=a.n(s),n=a(1),o=a(70),l=a(2),c=a(63),i=a(66),u=a(80),d=a(81),m=a(77),p=a(61),b=a(78),f=a(76),h=a(79),g=a(72),w=a(73),k=a(82),y=a(126);var v=Object(n.d)(y.a)`
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
`;var j=Object(s.memo)(({display:e,displayGroups:t,possibleGroups:a,onPick:n})=>{const o=Object(s.useCallback)(e=>{const t=e.target,a=+t.dataset.group;if(Number.isNaN(a))throw new TypeError("Incorrect group ball: "+t.dataset.group);n(a)},[n]);return r.a.createElement(O,null,e&&(null==a?void 0:a.map(e=>r.a.createElement(v,{key:e,"data-group":e,forceVisible:t,onClick:o},Object(p.a)(e)))))}),E=a(75),T=a(74),G=a(94);const P=n.c`
  background-color: #ffc0c0;
`,x=n.c`
  background-color: #c0e0ff;
`;function N(e){return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:e[0],possibleGroups:null,possibleGroupsShuffled:null}}t.default=Object(s.memo)(({season:e,pots:t})=>{const[a,n]=Object(c.a)(),y=Object(s.useMemo)(()=>t.map(e=>o(e)),[t,a]),v=Object(s.useMemo)(()=>t[0].map(()=>[]),[t,a]),[{currentPotNum:O,selectedTeam:I,pickedGroup:M,hungPot:S,possibleGroups:A,possibleGroupsShuffled:C},$]=Object(s.useState)(()=>N(y));Object(s.useEffect)(()=>{$(N(y))},[y]);const[,R]=Object(l.a)(),[W]=Object(i.a)(),U=Object(m.a)(G.default),[D,H]=Object(u.a)(),[L,_]=Object(d.a)(3e3),J=Object(s.useRef)(null),V=Object(s.useCallback)(e=>e<v.length>>1?P:x,[v.length]),q=Object(s.useCallback)(async t=>(await U({season:e,pots:y,groups:v,selectedTeam:t})).possibleGroups,[y,v,e,U]),z=Object(s.useCallback)(async e=>{if(I)return;const t=y[O];if(!t[e])return;const a=t.splice(e,1)[0];_.set(a);const s=await q(a);_.reset(),$({currentPotNum:O,hungPot:t.slice(),selectedTeam:a,possibleGroups:s,possibleGroupsShuffled:o(s),pickedGroup:null})},[y,v,O,q]),B=Object(s.useCallback)(e=>{if(!I)return void R({error:"No selected team..."});v[e].push(I);const t=y[O].length>0?O:O+1;H.add(I),$({selectedTeam:null,pickedGroup:e,hungPot:y[t],possibleGroups:null,possibleGroupsShuffled:null,currentPotNum:t})},[y,v,I,O]),F=O>=y.length;return r.a.createElement(T.a,null,r.a.createElement(g.a,null,r.a.createElement(f.a,{selectedTeams:I&&[I],initialPots:t,pots:y,currentPotNum:O}),r.a.createElement(h.a,{ref:J,maxTeams:y.length,currentPotNum:O,groups:v,possibleGroups:A,airborneTeams:D,getGroupHeaderStyles:V})),r.a.createElement(w.a,null,r.a.createElement(k.a,{display:!F,displayTeams:W,selectedTeam:I,pot:S,onPick:z}),r.a.createElement(E.a,{long:!1,calculating:L,completed:F,isAirborneAnimation:D.length>0,selectedTeam:I,pickedGroup:M,possibleGroups:A,numGroups:v.length,groupsElement:J.current,reset:n}),r.a.createElement(j,{display:!F,displayGroups:W,possibleGroups:C,onPick:B})),D.map(e=>{const t=v.findIndex(t=>t.includes(e)),a=Object(p.a)(t),s=v[t].indexOf(e);return r.a.createElement(b.a,{key:e.id,from:`[data-cellid='${e.id}']`,to:`[data-cellid='${a}${s}']`,duration:350,data:e,onAnimationEnd:H.remove})}))})},77:function(e,t,a){"use strict";var s=a(0);Object.create;Object.create;function r(e,t){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return t.get(e)}function n(e,t,a){if(!t.has(e))throw new TypeError("attempted to set private field on non-instance");return t.set(e,a),a}var o=class{constructor(){this.callbacks=new Map}add(e,t){this.callbacks.set(e,t)}addAndGetId(e){const t=Math.random().toString(36).slice(2);return this.add(t,e),t}resolve(e,t){this.getCallbackAndDelete(e)(null,t)}reject(e,t){this.getCallbackAndDelete(e)(t)}getCallbackAndDelete(e){const t=this.callbacks.get(e);if(!t)throw new Error("no resolver with id = "+e);return this.callbacks.delete(e),t}};const l=(e,t)=>(a,s)=>{a?t(a):e(s)};var c,i,u,d=class{constructor(){this.manager=new o}getPromise(e){return new Promise(async(t,a)=>{const s=l(t,a);this.manager.add(e,s)})}getPromiseWithId(e){return new Promise(async(t,a)=>{const s=l(t,a),r=this.manager.addAndGetId(s);e&&e(r)})}resolve(e,t){this.manager.resolve(e,t)}reject(e,t){this.manager.reject(e,t)}},m=a(86),p=a.n(m);c=new WeakMap,i=new WeakMap,u=new WeakMap;var b=class{constructor(e,t){c.set(this,void 0),i.set(this,new d),u.set(this,void 0),n(this,u,t),n(this,c,e),r(this,c).onmessage=e=>{const{messageId:t,data:a}=e.data;r(this,i).resolve(t,a)}}sendAndReceive(e){const t=r(this,i).getPromiseWithId(t=>{r(this,c).postMessage({messageId:t,data:e})});return void 0===r(this,u)?t:p()(t,r(this,u))}terminate(){r(this,c).terminate()}};t.a=e=>{const t=Object(s.useMemo)(()=>new b(new e,12e4),[]);return Object(s.useEffect)(()=>()=>{t.terminate()},[]),Object(s.useCallback)(t.sendAndReceive.bind(t),[t])}},79:function(e,t,a){"use strict";var s=a(0),r=a.n(s),n=a(1),o=a(61),l=a(91),c=a(62),i=a(64),u=a(92),d=a(60),m=a(59),p=a(65),b=a(71);const f=n.e`
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
  animation: ${f} 1s ease;
  box-shadow: 0 0 5px #6af;
`,w=n.c`
  animation: ${h} 5s normal forwards;
`;var k=Object(n.d)(m.a)`
  ${e=>e.possible&&g}
  ${e=>e.hasTeam&&w}
`,y=a(69),v=e=>{var t;return null!==(t=e.country)&&void 0!==t?t:e.name in y?e.name:void 0};var O=Object(s.memo)(({team:e,possible:t,cellId:a})=>{var s;return r.a.createElement(d.a,null,r.a.createElement(k,{hasTeam:!!e,possible:t},e?r.a.createElement(p.a,{country:v(e)},null!==(s=e.shortName)&&void 0!==s?s:e.name):r.a.createElement(b.a,{"data-cellid":a})))});var j=Object(s.memo)(({maxTeams:e,groupLetter:t,teams:a,potNum:s,possible:n,airborneTeams:o,headerStyles:p})=>{const b=l(a,o);return r.a.createElement(i.a,null,r.a.createElement("thead",null,r.a.createElement(d.a,null,r.a.createElement(m.a,null,r.a.createElement(u.a,{styles:p},"Group"," ",t)))),r.a.createElement("tbody",null,c(e).map(e=>r.a.createElement(O,{key:e,team:b[e],possible:e===s&&n,cellId:`${t}${e}`}))))});const E=n.d.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,T=Object(s.forwardRef)(({maxTeams:e,currentPotNum:t,groups:a,possibleGroups:s,airborneTeams:n,getGroupHeaderStyles:l},c)=>r.a.createElement(E,{ref:c},null==a?void 0:a.map((a,c)=>{const i=Object(o.a)(c),u=null==l?void 0:l(c);return r.a.createElement(j,{key:i,maxTeams:e,groupLetter:i,teams:a,potNum:t,possible:!!(null==s?void 0:s.includes(c)),airborneTeams:n,headerStyles:u})})));t.a=Object(s.memo)(T)},81:function(e,t,a){"use strict";var s=a(0),r=a(68),n=a.n(r);const o={key:null,isTimedOut:!1},l="TIMEOUT_VALUE_SET",c="TIMEOUT_RESET";function i(e,t){switch(t.type){case l:return{key:t.payload,isTimedOut:!!t.payload&&t.payload===e.key};case c:return o;default:throw new Error("Unknown action: "+t)}}t.a=e=>{const[t,a]=Object(s.useReducer)(i,o),r=async t=>{a({type:l,payload:t}),await n()(e),a({type:l,payload:t})},u=()=>{a({type:c})},d=Object(s.useMemo)(()=>({set:r,reset:u}),[]);return[t.isTimedOut,d]}},94:function(e,t,a){"use strict";a.r(t),t.default=function(){return new Worker(a.p+"worker.b28e9dece7ba7c38f3a9.worker.js")}}},0,[80]]);