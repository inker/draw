/*! For license information please see cl-gs.667632bffcfb97623a3d.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[1,6],{101:function(e,t,a){"use strict";a.r(t);var s=a(0),r=a.n(s),o=a(1),n=a(71),l=a(2),c=a(64),u=a(69),i=a(82),p=a(79),d=a(78),m=a(80),b=a(74),f=a(75),h=a(83),g=a(68),w=a(126);var k=Object(o.d)(w.a)`
  &:hover {
    ${e=>!e.noHover&&"background: radial-gradient(#ccf, #ccf)"};
  }
`;const E=o.d.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 999px) {
    justify-content: center;
  }
`;var y=Object(s.memo)(({display:e,displayGroups:t,possibleGroups:a,onPick:o})=>{const n=Object(s.useCallback)(e=>{const t=e.target,a=+t.dataset.group;if(Number.isNaN(a))throw new TypeError("Incorrect group ball: "+t.dataset.group);o(a)},[o]);return r.a.createElement(E,null,e&&(null==a?void 0:a.map(e=>r.a.createElement(k,{key:e,"data-group":e,forceVisible:t,onClick:n},Object(g.a)(e)))))}),v=a(77),j=a(76),O=a(94);const G=o.c`
  background-color: #ffc0c0;
`,T=o.c`
  background-color: #c0e0ff;
`;function P(e){const t=e.map(e=>n(e));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:t[0],possibleGroups:null,possibleGroupsShuffled:null,pots:t,groups:e[0].map(()=>[])}}t.default=Object(s.memo)(({season:e,pots:t})=>{const[a,o]=Object(c.a)(),[{currentPotNum:g,selectedTeam:w,pickedGroup:k,hungPot:E,possibleGroups:x,possibleGroupsShuffled:N,pots:S,groups:C},M]=Object(s.useState)(()=>P(t));Object(s.useEffect)(()=>{M(P(t))},[t,a]);const[,A]=Object(l.a)(),[I]=Object(u.a)(),R=Object(p.a)(O.default),[W,$]=Object(i.a)(3e3),D=Object(s.useRef)(null),U=Object(s.useCallback)(e=>e<C.length>>1?G:T,[C.length]),H=Object(s.useCallback)(e=>{if(w)return;const t=S[g],a=t[e];if(!a)return;const s=S.slice();s[g]=s[g].filter((t,a)=>a!==e),M({currentPotNum:g,hungPot:t.slice(),selectedTeam:a,possibleGroups:x,possibleGroupsShuffled:N,pickedGroup:null,pots:s,groups:C})},[S,C,g,w,x,N]),L=Object(s.useCallback)(e=>{if(!w)return void A({error:"No selected team..."});const t=C.slice();t[e]=[...t[e],w];const a=S[g].length>0?g:g+1;M({selectedTeam:null,pickedGroup:e,hungPot:S[a],possibleGroups:null,possibleGroupsShuffled:null,currentPotNum:a,pots:S,groups:t})},[S,C,w,g,E]);Object(s.useEffect)(()=>{w&&(async()=>{if(!w)throw new Error("no selected team");let t;$.set(w);try{t=(await R({season:e,pots:S,groups:C,selectedTeam:w})).possibleGroups}catch(e){return console.error(e),void A({error:"Could not determine the group"})}$.reset(),M({selectedTeam:w,pickedGroup:null,hungPot:E,currentPotNum:g,possibleGroups:t,possibleGroupsShuffled:n(t),pots:S,groups:C})})()},[w]);const _=g>=S.length;return r.a.createElement(j.a,null,r.a.createElement(b.a,null,r.a.createElement(d.a,{selectedTeams:w&&[w],initialPots:t,pots:S,currentPotNum:g}),r.a.createElement(m.a,{ref:D,maxTeams:S.length,currentPotNum:g,groups:C,possibleGroups:x,getGroupHeaderStyles:U})),r.a.createElement(f.a,null,r.a.createElement(h.a,{display:!_,displayTeams:I,selectedTeam:w,pot:E,onPick:H}),r.a.createElement(v.a,{long:!1,calculating:W,completed:_,selectedTeam:w,pickedGroup:k,possibleGroups:x,isDisplayPossibleGroupsText:!!w,numGroups:C.length,groupsElement:D.current,reset:o}),r.a.createElement(y,{display:!_,displayGroups:I,possibleGroups:N,onPick:L})))})},79:function(e,t,a){"use strict";var s=a(0);Object.create;Object.create;function r(e,t){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return t.get(e)}function o(e,t,a){if(!t.has(e))throw new TypeError("attempted to set private field on non-instance");return t.set(e,a),a}var n=class{constructor(){this.callbacks=new Map}add(e,t){this.callbacks.set(e,t)}addAndGetId(e){const t=Math.random().toString(36).slice(2);return this.add(t,e),t}resolve(e,t){this.getCallbackAndDelete(e)(null,t)}reject(e,t){this.getCallbackAndDelete(e)(t)}getCallbackAndDelete(e){const t=this.callbacks.get(e);if(!t)throw new Error("no resolver with id = "+e);return this.callbacks.delete(e),t}};const l=(e,t)=>(a,s)=>{a?t(a):e(s)};var c,u,i,p=class{constructor(){this.manager=new n}getPromise(e){return new Promise(async(t,a)=>{const s=l(t,a);this.manager.add(e,s)})}getPromiseWithId(e){return new Promise(async(t,a)=>{const s=l(t,a),r=this.manager.addAndGetId(s);e&&e(r)})}resolve(e,t){this.manager.resolve(e,t)}reject(e,t){this.manager.reject(e,t)}},d=a(87),m=a.n(d);c=new WeakMap,u=new WeakMap,i=new WeakMap;var b=class{constructor(e,t){c.set(this,void 0),u.set(this,new p),i.set(this,void 0),o(this,i,t),o(this,c,e),r(this,c).onmessage=e=>{const{messageId:t,data:a}=e.data;r(this,u).resolve(t,a)}}sendAndReceive(e){const t=r(this,u).getPromiseWithId(t=>{r(this,c).postMessage({messageId:t,data:e})});return void 0===r(this,i)?t:m()(t,r(this,i))}terminate(){r(this,c).terminate()}};t.a=e=>{const t=Object(s.useMemo)(()=>new b(new e,12e4),[]);return Object(s.useEffect)(()=>()=>{t.terminate()},[]),Object(s.useCallback)(t.sendAndReceive.bind(t),[t])}},80:function(e,t,a){"use strict";var s=a(0),r=a.n(s),o=a(1),n=a(68),l=a(61),c=a(66),u=a(92),i=a(63),p=a(60),d=a(72),m=a(67),b=a(73),f=a(81);const h=o.e`
  from {
    background-color: white;
    box-shadow: 0 0 20px #08f;
  }
  to {}
`,g=o.e`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,w=o.c`
  position: relative; /* enables glow */
  animation: ${h} 1s ease;
  box-shadow: 0 0 5px #6af;
`,k=o.c`
  animation: ${g} 5s normal forwards;
`;var E=Object(o.d)(p.a)`
  ${e=>e.possible&&w}
  ${e=>e.hasTeam&&k}
`,y=a(62),v=e=>{var t;return null!==(t=e.country)&&void 0!==t?t:e.name in y?e.name:void 0};var j=Object(s.memo)(({team:e,possible:t})=>{var a;const o=Object(d.a)(e),[n,l]=Object(s.useState)(e),c=Object(s.useRef)(null),u=Object(s.useCallback)(()=>{l(e)},[e]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(E,{hasTeam:!!n,possible:t},n?r.a.createElement(m.a,{country:v(n)},null!==(a=n.shortName)&&void 0!==a?a:n.name):r.a.createElement(b.a,{ref:c})),e&&e!==o&&r.a.createElement(f.a,{from:`[data-cellid='${e.id}']`,to:c,duration:350,data:e,onAnimationEnd:u}))});var O=Object(s.memo)(({maxTeams:e,groupLetter:t,teams:a,potNum:s,possible:o,headerStyles:n})=>r.a.createElement(c.a,null,r.a.createElement("thead",null,r.a.createElement(i.a,null,r.a.createElement(p.a,null,r.a.createElement(u.a,{styles:n},"Group"," ",t)))),r.a.createElement("tbody",null,l(e).map(e=>r.a.createElement(i.a,{key:e},r.a.createElement(j,{team:a[e],possible:e===s&&o}))))));const G=o.d.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,T=Object(s.forwardRef)(({maxTeams:e,currentPotNum:t,groups:a,possibleGroups:s,getGroupHeaderStyles:o},l)=>r.a.createElement(G,{ref:l},null==a?void 0:a.map((a,l)=>{const c=Object(n.a)(l),u=null==o?void 0:o(l);return r.a.createElement(O,{key:c,maxTeams:e,groupLetter:c,teams:a,potNum:t,possible:!!(null==s?void 0:s.includes(l)),headerStyles:u})})));t.a=Object(s.memo)(T)},82:function(e,t,a){"use strict";var s=a(0),r=a(65),o=a.n(r);const n={key:null,isTimedOut:!1},l="TIMEOUT_VALUE_SET",c="TIMEOUT_RESET";function u(e,t){switch(t.type){case l:return{key:t.payload,isTimedOut:!!t.payload&&t.payload===e.key};case c:return n;default:throw new Error("Unknown action: "+t)}}t.a=e=>{const[t,a]=Object(s.useReducer)(u,n),r=async t=>{a({type:l,payload:t}),await o()(e),a({type:l,payload:t})},i=()=>{a({type:c})},p=Object(s.useMemo)(()=>({set:r,reset:i}),[]);return[t.isTimedOut,p]}},94:function(e,t,a){"use strict";a.r(t),t.default=function(){return new Worker(a.p+"worker.b28e9dece7ba7c38f3a9.worker.js")}}},0,[80]]);