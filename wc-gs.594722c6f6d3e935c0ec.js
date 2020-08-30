/*! For license information please see wc-gs.594722c6f6d3e935c0ec.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[5,9],{78:function(e,t,a){"use strict";var n=a(0);Object.create;Object.create;function r(e,t){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return t.get(e)}function s(e,t,a){if(!t.has(e))throw new TypeError("attempted to set private field on non-instance");return t.set(e,a),a}var o=class{constructor(){this.callbacks=new Map}add(e,t){this.callbacks.set(e,t)}addAndGetId(e){const t=Math.random().toString(36).slice(2);return this.add(t,e),t}resolve(e,t){this.getCallbackAndDelete(e)(null,t)}reject(e,t){this.getCallbackAndDelete(e)(t)}getCallbackAndDelete(e){const t=this.callbacks.get(e);if(!t)throw new Error("no resolver with id = "+e);return this.callbacks.delete(e),t}};const c=(e,t)=>(a,n)=>{a?t(a):e(n)};var l,i,u,m=class{constructor(){this.manager=new o}getPromise(e){return new Promise(async(t,a)=>{const n=c(t,a);this.manager.add(e,n)})}getPromiseWithId(e){return new Promise(async(t,a)=>{const n=c(t,a),r=this.manager.addAndGetId(n);e&&e(r)})}resolve(e,t){this.manager.resolve(e,t)}reject(e,t){this.manager.reject(e,t)}},d=a(85),p=a.n(d);l=new WeakMap,i=new WeakMap,u=new WeakMap;var b=class{constructor(e,t){l.set(this,void 0),i.set(this,new m),u.set(this,void 0),s(this,u,t),s(this,l,e),r(this,l).onmessage=e=>{const{messageId:t,data:a}=e.data;r(this,i).resolve(t,a)}}sendAndReceive(e){const t=r(this,i).getPromiseWithId(t=>{r(this,l).postMessage({messageId:t,data:e})});return void 0===r(this,u)?t:p()(t,r(this,u))}terminate(){r(this,l).terminate()}};t.a=e=>{const t=Object(n.useMemo)(()=>new b(new e,12e4),[]);return Object(n.useEffect)(()=>()=>{t.terminate()},[]),Object(n.useCallback)(t.sendAndReceive.bind(t),[t])}},79:function(e,t,a){"use strict";var n=a(0),r=a.n(n),s=a(1),o=a(67),c=a(61),l=a(65),i=a(90),u=a(63),m=a(60),d=a(71),p=a(66),b=a(72),h=a(80);const f=s.e`
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
`,v=s.c`
  animation: ${g} 5s normal forwards;
`;var E=Object(s.d)(m.a)`
  ${e=>e.possible&&w}
  ${e=>e.hasTeam&&v}
`,j=a(62),k=e=>{var t;return null!==(t=e.country)&&void 0!==t?t:e.name in j?e.name:void 0};var O=Object(n.memo)(({team:e,possible:t})=>{var a;const s=Object(d.a)(e),[o,c]=Object(n.useState)(e),l=Object(n.useRef)(null),i=Object(n.useCallback)(()=>{c(e)},[e]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(E,{hasTeam:!!o,possible:t},o?r.a.createElement(p.a,{country:k(o)},null!==(a=o.shortName)&&void 0!==a?a:o.name):r.a.createElement(b.a,{ref:l})),e&&e!==s&&r.a.createElement(h.a,{from:`[data-cellid='${e.id}']`,to:l,duration:350,data:e,onAnimationEnd:i}))});var y=Object(n.memo)(({maxTeams:e,groupLetter:t,teams:a,potNum:n,possible:s,headerStyles:o})=>r.a.createElement(l.a,null,r.a.createElement("thead",null,r.a.createElement(u.a,null,r.a.createElement(m.a,null,r.a.createElement(i.a,{styles:o},"Group"," ",t)))),r.a.createElement("tbody",null,c(e).map(e=>r.a.createElement(u.a,{key:e},r.a.createElement(O,{team:a[e],possible:e===n&&s}))))));const P=s.d.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,T=Object(n.forwardRef)(({maxTeams:e,currentPotNum:t,groups:a,possibleGroups:n,getGroupHeaderStyles:s},c)=>r.a.createElement(P,{ref:c},null==a?void 0:a.map((a,c)=>{const l=Object(o.a)(c),i=null==s?void 0:s(c);return r.a.createElement(y,{key:l,maxTeams:e,groupLetter:l,teams:a,potNum:t,possible:!!(null==n?void 0:n.includes(c)),headerStyles:i})})));t.a=Object(n.memo)(T)},96:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(1),o=a(25),c=a(70),l=a(2),i=a(64),u=a(68),m=a(78),d=a(77),p=a(79),b=a(73),h=a(74),f=a(81),g=a(76),w=a(75),v=a(97);const E=o(s.c`
  background-color: #c0e0c0;
`);function j(e){const t=e.map(e=>c(e));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:t[0],pots:t,groups:e[0].map(()=>[])}}t.default=Object(n.memo)(({season:e,pots:t})=>{const[a,s]=Object(i.a)(),[{currentPotNum:o,selectedTeam:c,pickedGroup:k,hungPot:O,pots:y,groups:P},T]=Object(n.useState)(()=>j(t));Object(n.useEffect)(()=>{T(j(t))},[t,a]);const[,G]=Object(l.a)(),[x]=Object(u.a)(),N=Object(m.a)(v.default),A=Object(n.useRef)(null),S=Object(n.useCallback)(e=>{if(c)return;const t=y[o],a=t[e];if(!a)return;const n=y.slice();n[o]=n[o].filter((t,a)=>a!==e),T({currentPotNum:o,hungPot:t.slice(),selectedTeam:a,pickedGroup:null,pots:n,groups:P})},[y,P,o,c]);Object(n.useEffect)(()=>{c&&(async()=>{if(!c)throw new Error("no selected team");let t;try{t=(await N({season:e,pots:y,groups:P,selectedTeam:c})).pickedGroup}catch(e){return console.error(e),void G({error:"Could not determine the group"})}const a=P.slice();a[t]=[...a[t],c];const n=y[o].length>0?o:o+1;T({selectedTeam:null,pickedGroup:t,hungPot:y[n],currentPotNum:n,pots:y,groups:a})})()},[c]),Object(n.useEffect)(()=>{const e=y[o].findIndex(e=>e.host);S(e)},[a]);const C=o>=y.length;return r.a.createElement(w.a,null,r.a.createElement(b.a,null,r.a.createElement(d.a,{selectedTeams:c&&[c],initialPots:t,pots:y,currentPotNum:o}),r.a.createElement(p.a,{ref:A,maxTeams:y.length,currentPotNum:o,groups:P,possibleGroups:null,getGroupHeaderStyles:E})),r.a.createElement(h.a,null,r.a.createElement(f.a,{forceNoSelect:!!c,display:!C,displayTeams:x,selectedTeam:c,pot:O,onPick:S}),r.a.createElement(g.a,{long:!0,completed:C,selectedTeam:c,pickedGroup:k,possibleGroups:null,isDisplayPossibleGroupsText:!!c,numGroups:P.length,groupsElement:A,reset:s})))})},97:function(e,t,a){"use strict";a.r(t),t.default=function(){return new Worker(a.p+"worker.a585cdb0fc6eef68244c.worker.js")}}},0,[80]]);