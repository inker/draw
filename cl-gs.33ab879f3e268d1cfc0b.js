/*! For license information please see cl-gs.33ab879f3e268d1cfc0b.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[1,6],{78:function(e,t,a){"use strict";var s=a(0);Object.create;Object.create;function r(e,t){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return t.get(e)}function o(e,t,a){if(!t.has(e))throw new TypeError("attempted to set private field on non-instance");return t.set(e,a),a}var n=class{constructor(){this.callbacks=new Map}add(e,t){this.callbacks.set(e,t)}addAndGetId(e){const t=Math.random().toString(36).slice(2);return this.add(t,e),t}resolve(e,t){this.getCallbackAndDelete(e)(null,t)}reject(e,t){this.getCallbackAndDelete(e)(t)}getCallbackAndDelete(e){const t=this.callbacks.get(e);if(!t)throw new Error("no resolver with id = "+e);return this.callbacks.delete(e),t}};const l=(e,t)=>(a,s)=>{a?t(a):e(s)};var c,u,i,p=class{constructor(){this.manager=new n}getPromise(e){return new Promise(async(t,a)=>{const s=l(t,a);this.manager.add(e,s)})}getPromiseWithId(e){return new Promise(async(t,a)=>{const s=l(t,a),r=this.manager.addAndGetId(s);e&&e(r)})}resolve(e,t){this.manager.resolve(e,t)}reject(e,t){this.manager.reject(e,t)}},d=a(85),m=a.n(d);c=new WeakMap,u=new WeakMap,i=new WeakMap;var b=class{constructor(e,t){c.set(this,void 0),u.set(this,new p),i.set(this,void 0),o(this,i,t),o(this,c,e),r(this,c).onmessage=e=>{const{messageId:t,data:a}=e.data;r(this,u).resolve(t,a)}}sendAndReceive(e){const t=r(this,u).getPromiseWithId(t=>{r(this,c).postMessage({messageId:t,data:e})});return void 0===r(this,i)?t:m()(t,r(this,i))}terminate(){r(this,c).terminate()}};t.a=e=>{const t=Object(s.useMemo)(()=>new b(new e,12e4),[]);return Object(s.useEffect)(()=>()=>{t.terminate()},[]),Object(s.useCallback)(t.sendAndReceive.bind(t),[t])}},79:function(e,t,a){"use strict";var s=a(0),r=a.n(s),o=a(1),n=a(67),l=a(61),c=a(65),u=a(90),i=a(63),p=a(60),d=a(71),m=a(66),b=a(72),f=a(80);const h=o.e`
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
`;var v=Object(o.d)(p.a)`
  ${e=>e.possible&&w}
  ${e=>e.hasTeam&&k}
`,j=a(62),E=e=>{var t;return null!==(t=e.country)&&void 0!==t?t:e.name in j?e.name:void 0};var G=Object(s.memo)(({team:e,possible:t})=>{var a;const o=Object(d.a)(e),[n,l]=Object(s.useState)(e),c=Object(s.useRef)(null),u=Object(s.useCallback)(()=>{l(e)},[e]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(v,{hasTeam:!!n,possible:t},n?r.a.createElement(m.a,{country:E(n)},null!==(a=n.shortName)&&void 0!==a?a:n.name):r.a.createElement(b.a,{ref:c})),e&&e!==o&&r.a.createElement(f.a,{from:`[data-cellid='${e.id}']`,to:c,duration:350,data:e,onAnimationEnd:u}))});var O=Object(s.memo)(({maxTeams:e,groupLetter:t,teams:a,potNum:s,possible:o,headerStyles:n})=>r.a.createElement(c.a,null,r.a.createElement("thead",null,r.a.createElement(i.a,null,r.a.createElement(p.a,null,r.a.createElement(u.a,{styles:n},"Group"," ",t)))),r.a.createElement("tbody",null,l(e).map(e=>r.a.createElement(i.a,{key:e},r.a.createElement(G,{team:a[e],possible:e===s&&o}))))));const y=o.d.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,P=Object(s.forwardRef)(({maxTeams:e,currentPotNum:t,groups:a,possibleGroups:s,getGroupHeaderStyles:o},l)=>r.a.createElement(y,{ref:l},null==a?void 0:a.map((a,l)=>{const c=Object(n.a)(l),u=null==o?void 0:o(l);return r.a.createElement(O,{key:c,maxTeams:e,groupLetter:c,teams:a,potNum:t,possible:!!(null==s?void 0:s.includes(l)),headerStyles:u})})));t.a=Object(s.memo)(P)},92:function(e,t,a){"use strict";a.r(t),t.default=function(){return new Worker(a.p+"worker.b28e9dece7ba7c38f3a9.worker.js")}},99:function(e,t,a){"use strict";a.r(t);var s=a(0),r=a.n(s),o=a(1),n=a(70),l=a(2),c=a(64),u=a(68),i=a(78),p=a(77),d=a(79),m=a(73),b=a(74),f=a(81),h=a(67),g=a(126);var w=Object(o.d)(g.a)`
  &:hover {
    ${e=>!e.noHover&&"background: radial-gradient(#ccf, #ccf)"};
  }
`;const k=o.d.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 999px) {
    justify-content: center;
  }
`;var v=Object(s.memo)(({display:e,displayGroups:t,possibleGroups:a,onPick:o})=>{const n=Object(s.useCallback)(e=>{const t=e.target,a=+t.dataset.group;if(Number.isNaN(a))throw new TypeError("Incorrect group ball: "+t.dataset.group);o(a)},[o]);return r.a.createElement(k,null,e&&(null==a?void 0:a.map(e=>r.a.createElement(w,{key:e,"data-group":e,forceVisible:t,onClick:n},Object(h.a)(e)))))}),j=a(76),E=a(75),G=a(92);const O=o.c`
  background-color: #ffc0c0;
`,y=o.c`
  background-color: #c0e0ff;
`;function P(e){const t=e.map(e=>n(e));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:t[0],possibleGroups:null,possibleGroupsShuffled:null,pots:t,groups:e[0].map(()=>[])}}t.default=Object(s.memo)(({season:e,pots:t})=>{const[a,o]=Object(c.a)(),[{currentPotNum:h,selectedTeam:g,pickedGroup:w,hungPot:k,possibleGroups:T,possibleGroupsShuffled:x,pots:N,groups:S},C]=Object(s.useState)(()=>P(t));Object(s.useEffect)(()=>{C(P(t))},[t,a]);const[,A]=Object(l.a)(),[I]=Object(u.a)(),M=Object(i.a)(G.default),W=Object(s.useRef)(null),$=Object(s.useCallback)(e=>e<S.length>>1?O:y,[S.length]),R=Object(s.useCallback)(e=>{if(g)return;const t=N[h],a=t[e];if(!a)return;const s=N.slice();s[h]=s[h].filter((t,a)=>a!==e),C({currentPotNum:h,hungPot:t.slice(),selectedTeam:a,possibleGroups:T,possibleGroupsShuffled:x,pickedGroup:null,pots:s,groups:S})},[N,S,h,g,T,x]),D=Object(s.useCallback)(e=>{if(!g)return void A({error:"No selected team..."});const t=S.slice();t[e]=[...t[e],g];const a=N[h].length>0?h:h+1;C({selectedTeam:null,pickedGroup:e,hungPot:N[a],possibleGroups:null,possibleGroupsShuffled:null,currentPotNum:a,pots:N,groups:t})},[N,S,g,h,k]);Object(s.useEffect)(()=>{g&&(async()=>{if(!g)throw new Error("no selected team");let t;try{t=(await M({season:e,pots:N,groups:S,selectedTeam:g})).possibleGroups}catch(e){return console.error(e),void A({error:"Could not determine the group"})}C({selectedTeam:g,pickedGroup:null,hungPot:k,currentPotNum:h,possibleGroups:t,possibleGroupsShuffled:n(t),pots:N,groups:S})})()},[g]);const H=h>=N.length;return r.a.createElement(E.a,null,r.a.createElement(m.a,null,r.a.createElement(p.a,{selectedTeams:g&&[g],initialPots:t,pots:N,currentPotNum:h}),r.a.createElement(d.a,{ref:W,maxTeams:N.length,currentPotNum:h,groups:S,possibleGroups:T,getGroupHeaderStyles:$})),r.a.createElement(b.a,null,r.a.createElement(f.a,{display:!H,displayTeams:I,selectedTeam:g,pot:k,onPick:R}),r.a.createElement(j.a,{long:!1,completed:H,selectedTeam:g,pickedGroup:w,possibleGroups:T,isDisplayPossibleGroupsText:!!g,numGroups:S.length,groupsElement:W.current,reset:o}),r.a.createElement(v,{display:!H,displayGroups:I,possibleGroups:x,onPick:D})))})}},0,[80]]);