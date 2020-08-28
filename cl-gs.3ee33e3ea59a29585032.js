/*! For license information please see cl-gs.3ee33e3ea59a29585032.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[1,6],{100:function(e,t,a){"use strict";a.r(t);var s=a(0),r=a.n(s),n=a(1),o=a(70),l=a(2),c=a(62),u=a(67),i=a(81),d=a(78),p=a(77),m=a(79),b=a(73),f=a(74),h=a(82),g=a(66),w=a(125);var k=Object(n.d)(w.a)`
  &:hover {
    ${e=>!e.noHover&&"background: radial-gradient(#ccf, #ccf)"};
  }
`;const j=n.d.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 999px) {
    justify-content: center;
  }
`;var y=Object(s.memo)(({display:e,displayGroups:t,possibleGroups:a,onPick:n})=>{const o=Object(s.useCallback)(e=>{const t=e.target,a=+t.dataset.group;if(Number.isNaN(a))throw new TypeError("Incorrect group ball: "+t.dataset.group);n(a)},[n]);return r.a.createElement(j,null,e&&(null==a?void 0:a.map(e=>r.a.createElement(k,{key:e,"data-group":e,forceVisible:t,onClick:o},Object(g.a)(e)))))}),O=a(76),v=a(75),E=a(93);const G=n.c`
  background-color: #ffc0c0;
`,T=n.c`
  background-color: #c0e0ff;
`;function P(e){return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:e[0],possibleGroups:null,possibleGroupsShuffled:null,groups:e[0].map(()=>[])}}t.default=Object(s.memo)(({season:e,pots:t})=>{const[a,n]=Object(c.a)(),g=Object(s.useMemo)(()=>t.map(e=>o(e)),[t,a]),[{currentPotNum:w,selectedTeam:k,pickedGroup:j,hungPot:x,possibleGroups:N,possibleGroupsShuffled:S,groups:C},M]=Object(s.useState)(()=>P(g));Object(s.useEffect)(()=>{M(P(g))},[g]);const[,A]=Object(l.a)(),[I]=Object(u.a)(),R=Object(d.a)(E.default),[W,$]=Object(i.a)(3e3),U=Object(s.useRef)(null),D=Object(s.useCallback)(e=>e<C.length>>1?G:T,[C.length]),H=Object(s.useCallback)(async t=>(await R({season:e,pots:g,groups:C,selectedTeam:t})).possibleGroups,[g,C,e,R]),L=Object(s.useCallback)(async e=>{if(k)return;const t=g[w];if(!t[e])return;const a=t.splice(e,1)[0];$.set(a);const s=await H(a);$.reset(),M({currentPotNum:w,hungPot:t.slice(),selectedTeam:a,possibleGroups:s,possibleGroupsShuffled:o(s),pickedGroup:null,groups:C})},[g,C,w,H]),_=Object(s.useCallback)(e=>{if(!k)return void A({error:"No selected team..."});const t=C.slice();t[e]=[...t[e],k];const a=g[w].length>0?w:w+1;M({selectedTeam:null,pickedGroup:e,hungPot:g[a],possibleGroups:null,possibleGroupsShuffled:null,currentPotNum:a,groups:t})},[g,C,k,w]),J=w>=g.length;return r.a.createElement(v.a,null,r.a.createElement(b.a,null,r.a.createElement(p.a,{selectedTeams:k&&[k],initialPots:t,pots:g,currentPotNum:w}),r.a.createElement(m.a,{ref:U,maxTeams:g.length,currentPotNum:w,groups:C,possibleGroups:N,getGroupHeaderStyles:D})),r.a.createElement(f.a,null,r.a.createElement(h.a,{display:!J,displayTeams:I,selectedTeam:k,pot:x,onPick:L}),r.a.createElement(O.a,{long:!1,calculating:W,completed:J,selectedTeam:k,pickedGroup:j,possibleGroups:N,numGroups:C.length,groupsElement:U.current,reset:n}),r.a.createElement(y,{display:!J,displayGroups:I,possibleGroups:S,onPick:_})))})},78:function(e,t,a){"use strict";var s=a(0);Object.create;Object.create;function r(e,t){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return t.get(e)}function n(e,t,a){if(!t.has(e))throw new TypeError("attempted to set private field on non-instance");return t.set(e,a),a}var o=class{constructor(){this.callbacks=new Map}add(e,t){this.callbacks.set(e,t)}addAndGetId(e){const t=Math.random().toString(36).slice(2);return this.add(t,e),t}resolve(e,t){this.getCallbackAndDelete(e)(null,t)}reject(e,t){this.getCallbackAndDelete(e)(t)}getCallbackAndDelete(e){const t=this.callbacks.get(e);if(!t)throw new Error("no resolver with id = "+e);return this.callbacks.delete(e),t}};const l=(e,t)=>(a,s)=>{a?t(a):e(s)};var c,u,i,d=class{constructor(){this.manager=new o}getPromise(e){return new Promise(async(t,a)=>{const s=l(t,a);this.manager.add(e,s)})}getPromiseWithId(e){return new Promise(async(t,a)=>{const s=l(t,a),r=this.manager.addAndGetId(s);e&&e(r)})}resolve(e,t){this.manager.resolve(e,t)}reject(e,t){this.manager.reject(e,t)}},p=a(86),m=a.n(p);c=new WeakMap,u=new WeakMap,i=new WeakMap;var b=class{constructor(e,t){c.set(this,void 0),u.set(this,new d),i.set(this,void 0),n(this,i,t),n(this,c,e),r(this,c).onmessage=e=>{const{messageId:t,data:a}=e.data;r(this,u).resolve(t,a)}}sendAndReceive(e){const t=r(this,u).getPromiseWithId(t=>{r(this,c).postMessage({messageId:t,data:e})});return void 0===r(this,i)?t:m()(t,r(this,i))}terminate(){r(this,c).terminate()}};t.a=e=>{const t=Object(s.useMemo)(()=>new b(new e,12e4),[]);return Object(s.useEffect)(()=>()=>{t.terminate()},[]),Object(s.useCallback)(t.sendAndReceive.bind(t),[t])}},79:function(e,t,a){"use strict";var s=a(0),r=a.n(s),n=a(1),o=a(66),l=a(61),c=a(64),u=a(91),i=a(60),d=a(59),p=a(71),m=a(65),b=a(72),f=a(80);const h=n.e`
  from {
    background-color: white;
    box-shadow: 0 0 20px #08f;
  }
  to {}
`,g=n.e`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,w=n.c`
  position: relative; /* enables glow */
  animation: ${h} 1s ease;
  box-shadow: 0 0 5px #6af;
`,k=n.c`
  animation: ${g} 5s normal forwards;
`;var j=Object(n.d)(d.a)`
  ${e=>e.possible&&w}
  ${e=>e.hasTeam&&k}
`,y=a(69),O=e=>{var t;return null!==(t=e.country)&&void 0!==t?t:e.name in y?e.name:void 0};var v=Object(s.memo)(({team:e,possible:t})=>{var a;const n=Object(p.a)(e),[o,l]=Object(s.useState)(e),c=Object(s.useRef)(null),u=Object(s.useCallback)(()=>{l(e)},[e]);return r.a.createElement(i.a,null,r.a.createElement(j,{hasTeam:!!o,possible:t},o?r.a.createElement(m.a,{country:O(o)},null!==(a=o.shortName)&&void 0!==a?a:o.name):r.a.createElement(b.a,{ref:c})),e&&e!==n&&r.a.createElement(f.a,{from:`[data-cellid='${e.id}']`,to:c,duration:350,data:e,onAnimationEnd:u}))});var E=Object(s.memo)(({maxTeams:e,groupLetter:t,teams:a,potNum:s,possible:n,headerStyles:o})=>r.a.createElement(c.a,null,r.a.createElement("thead",null,r.a.createElement(i.a,null,r.a.createElement(d.a,null,r.a.createElement(u.a,{styles:o},"Group"," ",t)))),r.a.createElement("tbody",null,l(e).map(e=>r.a.createElement(v,{key:e,team:a[e],possible:e===s&&n})))));const G=n.d.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,T=Object(s.forwardRef)(({maxTeams:e,currentPotNum:t,groups:a,possibleGroups:s,getGroupHeaderStyles:n},l)=>r.a.createElement(G,{ref:l},null==a?void 0:a.map((a,l)=>{const c=Object(o.a)(l),u=null==n?void 0:n(l);return r.a.createElement(E,{key:c,maxTeams:e,groupLetter:c,teams:a,potNum:t,possible:!!(null==s?void 0:s.includes(l)),headerStyles:u})})));t.a=Object(s.memo)(T)},81:function(e,t,a){"use strict";var s=a(0),r=a(63),n=a.n(r);const o={key:null,isTimedOut:!1},l="TIMEOUT_VALUE_SET",c="TIMEOUT_RESET";function u(e,t){switch(t.type){case l:return{key:t.payload,isTimedOut:!!t.payload&&t.payload===e.key};case c:return o;default:throw new Error("Unknown action: "+t)}}t.a=e=>{const[t,a]=Object(s.useReducer)(u,o),r=async t=>{a({type:l,payload:t}),await n()(e),a({type:l,payload:t})},i=()=>{a({type:c})},d=Object(s.useMemo)(()=>({set:r,reset:i}),[]);return[t.isTimedOut,d]}},93:function(e,t,a){"use strict";a.r(t),t.default=function(){return new Worker(a.p+"worker.b28e9dece7ba7c38f3a9.worker.js")}}},0,[80]]);