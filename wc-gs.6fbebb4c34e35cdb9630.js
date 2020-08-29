/*! For license information please see wc-gs.6fbebb4c34e35cdb9630.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[5,9],{78:function(e,t,a){"use strict";var r=a(0);Object.create;Object.create;function n(e,t){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return t.get(e)}function s(e,t,a){if(!t.has(e))throw new TypeError("attempted to set private field on non-instance");return t.set(e,a),a}var o=class{constructor(){this.callbacks=new Map}add(e,t){this.callbacks.set(e,t)}addAndGetId(e){const t=Math.random().toString(36).slice(2);return this.add(t,e),t}resolve(e,t){this.getCallbackAndDelete(e)(null,t)}reject(e,t){this.getCallbackAndDelete(e)(t)}getCallbackAndDelete(e){const t=this.callbacks.get(e);if(!t)throw new Error("no resolver with id = "+e);return this.callbacks.delete(e),t}};const c=(e,t)=>(a,r)=>{a?t(a):e(r)};var l,i,u,m=class{constructor(){this.manager=new o}getPromise(e){return new Promise(async(t,a)=>{const r=c(t,a);this.manager.add(e,r)})}getPromiseWithId(e){return new Promise(async(t,a)=>{const r=c(t,a),n=this.manager.addAndGetId(r);e&&e(n)})}resolve(e,t){this.manager.resolve(e,t)}reject(e,t){this.manager.reject(e,t)}},d=a(85),p=a.n(d);l=new WeakMap,i=new WeakMap,u=new WeakMap;var b=class{constructor(e,t){l.set(this,void 0),i.set(this,new m),u.set(this,void 0),s(this,u,t),s(this,l,e),n(this,l).onmessage=e=>{const{messageId:t,data:a}=e.data;n(this,i).resolve(t,a)}}sendAndReceive(e){const t=n(this,i).getPromiseWithId(t=>{n(this,l).postMessage({messageId:t,data:e})});return void 0===n(this,u)?t:p()(t,n(this,u))}terminate(){n(this,l).terminate()}};t.a=e=>{const t=Object(r.useMemo)(()=>new b(new e,12e4),[]);return Object(r.useEffect)(()=>()=>{t.terminate()},[]),Object(r.useCallback)(t.sendAndReceive.bind(t),[t])}},79:function(e,t,a){"use strict";var r=a(0),n=a.n(r),s=a(1),o=a(67),c=a(61),l=a(65),i=a(90),u=a(63),m=a(60),d=a(71),p=a(66),b=a(72),h=a(80);const f=s.e`
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
`,j=a(62),k=e=>{var t;return null!==(t=e.country)&&void 0!==t?t:e.name in j?e.name:void 0};var O=Object(r.memo)(({team:e,possible:t})=>{var a;const s=Object(d.a)(e),[o,c]=Object(r.useState)(e),l=Object(r.useRef)(null),i=Object(r.useCallback)(()=>{c(e)},[e]);return n.a.createElement(n.a.Fragment,null,n.a.createElement(E,{hasTeam:!!o,possible:t},o?n.a.createElement(p.a,{country:k(o)},null!==(a=o.shortName)&&void 0!==a?a:o.name):n.a.createElement(b.a,{ref:l})),e&&e!==s&&n.a.createElement(h.a,{from:`[data-cellid='${e.id}']`,to:l,duration:350,data:e,onAnimationEnd:i}))});var y=Object(r.memo)(({maxTeams:e,groupLetter:t,teams:a,potNum:r,possible:s,headerStyles:o})=>n.a.createElement(l.a,null,n.a.createElement("thead",null,n.a.createElement(u.a,null,n.a.createElement(m.a,null,n.a.createElement(i.a,{styles:o},"Group"," ",t)))),n.a.createElement("tbody",null,c(e).map(e=>n.a.createElement(u.a,{key:e},n.a.createElement(O,{team:a[e],possible:e===r&&s}))))));const P=s.d.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,T=Object(r.forwardRef)(({maxTeams:e,currentPotNum:t,groups:a,possibleGroups:r,getGroupHeaderStyles:s},c)=>n.a.createElement(P,{ref:c},null==a?void 0:a.map((a,c)=>{const l=Object(o.a)(c),i=null==s?void 0:s(c);return n.a.createElement(y,{key:l,maxTeams:e,groupLetter:l,teams:a,potNum:t,possible:!!(null==r?void 0:r.includes(c)),headerStyles:i})})));t.a=Object(r.memo)(T)},97:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),s=a(1),o=a(25),c=a(70),l=a(2),i=a(64),u=a(68),m=a(78),d=a(77),p=a(79),b=a(73),h=a(74),f=a(81),g=a(76),w=a(75),v=a(98);const E=o(s.c`
  background-color: #c0e0c0;
`);function j(e){const t=e.map(e=>c(e));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:t[0],pots:t,groups:e[0].map(()=>[])}}t.default=Object(r.memo)(({season:e,pots:t})=>{const[a,s]=Object(i.a)(),[{currentPotNum:o,selectedTeam:c,pickedGroup:k,hungPot:O,pots:y,groups:P},T]=Object(r.useState)(()=>j(t));Object(r.useEffect)(()=>{T(j(t))},[t,a]);const[,G]=Object(l.a)(),[x]=Object(u.a)(),N=Object(m.a)(v.default),A=Object(r.useRef)(null),S=Object(r.useCallback)(e=>{if(c)return;const t=y[o],a=t[e];if(!a)return;const r=y.slice();r[o]=r[o].filter((t,a)=>a!==e),T({currentPotNum:o,hungPot:t.slice(),selectedTeam:a,pickedGroup:null,pots:r,groups:P})},[y,P,o,c]);Object(r.useEffect)(()=>{c&&(async()=>{if(!c)throw new Error("no selected team");let t;try{t=(await N({season:e,pots:y,groups:P,selectedTeam:c})).pickedGroup}catch(e){return console.error(e),void G({error:"Could not determine the group"})}const a=P.slice();a[t]=[...a[t],c];const r=y[o].length>0?o:o+1;T({selectedTeam:null,pickedGroup:t,hungPot:y[r],currentPotNum:r,pots:y,groups:a})})()},[c]),Object(r.useEffect)(()=>{const e=y[o].findIndex(e=>e.host);S(e)},[a]);const C=o>=y.length;return n.a.createElement(w.a,null,n.a.createElement(b.a,null,n.a.createElement(d.a,{selectedTeams:c&&[c],initialPots:t,pots:y,currentPotNum:o}),n.a.createElement(p.a,{ref:A,maxTeams:y.length,currentPotNum:o,groups:P,possibleGroups:null,getGroupHeaderStyles:E})),n.a.createElement(h.a,null,n.a.createElement(f.a,{forceNoSelect:!!c,display:!C,displayTeams:x,selectedTeam:c,pot:O,onPick:S}),n.a.createElement(g.a,{long:!0,completed:C,selectedTeam:c,pickedGroup:k,possibleGroups:null,isDisplayPossibleGroupsText:!!c,numGroups:P.length,groupsElement:A.current,reset:s})))})},98:function(e,t,a){"use strict";a.r(t),t.default=function(){return new Worker(a.p+"worker.a585cdb0fc6eef68244c.worker.js")}}},0,[80]]);