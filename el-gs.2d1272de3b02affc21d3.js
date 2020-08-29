/*! For license information please see el-gs.2d1272de3b02affc21d3.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[3,7],{78:function(e,t,a){"use strict";var r=a(0);Object.create;Object.create;function n(e,t){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return t.get(e)}function s(e,t,a){if(!t.has(e))throw new TypeError("attempted to set private field on non-instance");return t.set(e,a),a}var o=class{constructor(){this.callbacks=new Map}add(e,t){this.callbacks.set(e,t)}addAndGetId(e){const t=Math.random().toString(36).slice(2);return this.add(t,e),t}resolve(e,t){this.getCallbackAndDelete(e)(null,t)}reject(e,t){this.getCallbackAndDelete(e)(t)}getCallbackAndDelete(e){const t=this.callbacks.get(e);if(!t)throw new Error("no resolver with id = "+e);return this.callbacks.delete(e),t}};const c=(e,t)=>(a,r)=>{a?t(a):e(r)};var l,u,i,m=class{constructor(){this.manager=new o}getPromise(e){return new Promise(async(t,a)=>{const r=c(t,a);this.manager.add(e,r)})}getPromiseWithId(e){return new Promise(async(t,a)=>{const r=c(t,a),n=this.manager.addAndGetId(r);e&&e(n)})}resolve(e,t){this.manager.resolve(e,t)}reject(e,t){this.manager.reject(e,t)}},d=a(85),p=a.n(d);l=new WeakMap,u=new WeakMap,i=new WeakMap;var b=class{constructor(e,t){l.set(this,void 0),u.set(this,new m),i.set(this,void 0),s(this,i,t),s(this,l,e),n(this,l).onmessage=e=>{const{messageId:t,data:a}=e.data;n(this,u).resolve(t,a)}}sendAndReceive(e){const t=n(this,u).getPromiseWithId(t=>{n(this,l).postMessage({messageId:t,data:e})});return void 0===n(this,i)?t:p()(t,n(this,i))}terminate(){n(this,l).terminate()}};t.a=e=>{const t=Object(r.useMemo)(()=>new b(new e,12e4),[]);return Object(r.useEffect)(()=>()=>{t.terminate()},[]),Object(r.useCallback)(t.sendAndReceive.bind(t),[t])}},79:function(e,t,a){"use strict";var r=a(0),n=a.n(r),s=a(1),o=a(67),c=a(61),l=a(65),u=a(90),i=a(63),m=a(60),d=a(71),p=a(66),b=a(72),h=a(80);const f=s.e`
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
`,k=s.c`
  animation: ${g} 5s normal forwards;
`;var v=Object(s.d)(m.a)`
  ${e=>e.possible&&w}
  ${e=>e.hasTeam&&k}
`,E=a(62),j=e=>{var t;return null!==(t=e.country)&&void 0!==t?t:e.name in E?e.name:void 0};var O=Object(r.memo)(({team:e,possible:t})=>{var a;const s=Object(d.a)(e),[o,c]=Object(r.useState)(e),l=Object(r.useRef)(null),u=Object(r.useCallback)(()=>{c(e)},[e]);return n.a.createElement(n.a.Fragment,null,n.a.createElement(v,{hasTeam:!!o,possible:t},o?n.a.createElement(p.a,{country:j(o)},null!==(a=o.shortName)&&void 0!==a?a:o.name):n.a.createElement(b.a,{ref:l})),e&&e!==s&&n.a.createElement(h.a,{from:`[data-cellid='${e.id}']`,to:l,duration:350,data:e,onAnimationEnd:u}))});var y=Object(r.memo)(({maxTeams:e,groupLetter:t,teams:a,potNum:r,possible:s,headerStyles:o})=>n.a.createElement(l.a,null,n.a.createElement("thead",null,n.a.createElement(i.a,null,n.a.createElement(m.a,null,n.a.createElement(u.a,{styles:o},"Group"," ",t)))),n.a.createElement("tbody",null,c(e).map(e=>n.a.createElement(i.a,{key:e},n.a.createElement(O,{team:a[e],possible:e===r&&s}))))));const P=s.d.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,T=Object(r.forwardRef)(({maxTeams:e,currentPotNum:t,groups:a,possibleGroups:r,getGroupHeaderStyles:s},c)=>n.a.createElement(P,{ref:c},null==a?void 0:a.map((a,c)=>{const l=Object(o.a)(c),u=null==s?void 0:s(c);return n.a.createElement(y,{key:l,maxTeams:e,groupLetter:l,teams:a,potNum:t,possible:!!(null==r?void 0:r.includes(c)),headerStyles:u})})));t.a=Object(r.memo)(T)},94:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),s=a(1),o=a(70),c=a(2),l=a(64),u=a(68),i=a(78),m=a(77),d=a(79),p=a(73),b=a(74),h=a(81),f=a(76),g=a(75),w=a(95);const k=s.c`
  background-color: #ffc0c0;
`,v=s.c`
  background-color: #c0e0ff;
`;function E(e){const t=e.map(e=>o(e));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:t[0],pots:t,groups:e[0].map(()=>[])}}t.default=Object(r.memo)(({season:e,pots:t})=>{const[a,s]=Object(l.a)(),[{currentPotNum:o,selectedTeam:j,pickedGroup:O,hungPot:y,pots:P,groups:T},G]=Object(r.useState)(()=>E(t));Object(r.useEffect)(()=>{G(E(t))},[t,a]);const[,x]=Object(c.a)(),[N]=Object(u.a)(),A=Object(i.a)(w.default),C=Object(r.useRef)(null),S=Object(r.useCallback)(e=>e<T.length>>1?k:v,[T.length]),M=Object(r.useCallback)(e=>{if(j)return;const t=P[o],a=t[e];if(!a)return;const r=P.slice();r[o]=r[o].filter((t,a)=>a!==e),G({currentPotNum:o,hungPot:t.slice(),selectedTeam:a,pickedGroup:null,pots:r,groups:T})},[P,T,o,j]);Object(r.useEffect)(()=>{j&&(async()=>{if(!j)throw new Error("no selected team");let t;try{t=(await A({season:e,pots:P,groups:T,selectedTeam:j})).pickedGroup}catch(e){return console.error(e),void x({error:"Could not determine the group"})}const a=T.slice();a[t]=[...a[t],j];const r=P[o].length>0?o:o+1;G({selectedTeam:null,pickedGroup:t,hungPot:P[r],currentPotNum:r,pots:P,groups:a})})()},[j]);const I=o>=P.length;return n.a.createElement(g.a,null,n.a.createElement(p.a,null,n.a.createElement(m.a,{selectedTeams:j&&[j],initialPots:t,pots:P,currentPotNum:o}),n.a.createElement(d.a,{ref:C,maxTeams:P.length,currentPotNum:o,groups:T,possibleGroups:null,getGroupHeaderStyles:S})),n.a.createElement(b.a,null,n.a.createElement(h.a,{forceNoSelect:!!j,display:!I,displayTeams:N,selectedTeam:j,pot:y,onPick:M}),n.a.createElement(f.a,{long:!0,completed:I,selectedTeam:j,pickedGroup:O,possibleGroups:null,isDisplayPossibleGroupsText:!!j,numGroups:T.length,groupsElement:C,reset:s})))})},95:function(e,t,a){"use strict";a.r(t),t.default=function(){return new Worker(a.p+"worker.7183f99cec5bacceb968.worker.js")}}},0,[80]]);