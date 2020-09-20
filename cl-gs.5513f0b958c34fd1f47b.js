/*! For license information please see cl-gs.5513f0b958c34fd1f47b.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[1,6],{105:function(e,t,r){"use strict";r.r(t);var s=r(0),a=r.n(s),o=r(2),n=r(78),c=r(435),l=r(79),u=r(4),i=r(68),p=r(69),d=r(75),m=r(88),b=r(87),f=r(89),h=r(83),g=r(84),j=r(91),v=r(73),w=r(136);var k=Object(o.d)(w.a)`
  &:hover {
    ${e=>!e.noHover&&"background: radial-gradient(#ccf, #ccf)"};
  }
`;const O=o.d.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 999px) {
    justify-content: center;
  }
`;var E=Object(s.memo)(({display:e,displayGroups:t,possibleGroups:r,onPick:o})=>{const n=Object(s.useCallback)(e=>{const t=e.target,r=+t.dataset.group;if(Number.isNaN(r))throw new TypeError("Incorrect group ball: "+t.dataset.group);o(r)},[o]);return a.a.createElement(O,null,e&&(null==r?void 0:r.map(e=>a.a.createElement(k,{key:e,"data-group":e,forceVisible:t,onClick:n},Object(v.a)(e)))))}),G=r(86),y=r(85),P=r(98);const T=o.c`
  background-color: #ffc0c0;
`,x=o.c`
  background-color: #c0e0ff;
`;function N(e){const t=e.map(e=>l(e));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:t[0],possibleGroups:null,possibleGroupsShuffled:null,pots:t,groups:e[0].map(()=>[])}}t.default=Object(s.memo)(({season:e,pots:t})=>{const[r,o]=Object(i.a)(),[v,w]=Object(p.a)(),[{currentPotNum:k,selectedTeam:O,pickedGroup:S,hungPot:C,possibleGroups:M,possibleGroupsShuffled:A,pots:I,groups:W},$]=Object(s.useState)(()=>N(t));Object(s.useEffect)(()=>{$(N(t))},[t,r]);const[,R]=Object(u.a)(),[D]=Object(d.a)(),H=Object(m.a)(P.default,12e4),J=Object(s.useRef)(null),L=Object(s.useCallback)(e=>{if(O)return;const t=I[k][e];if(!t)return;const r=I.slice();r[k]=r[k].filter((t,r)=>r!==e),$({currentPotNum:k,hungPot:C,selectedTeam:t,possibleGroups:M,possibleGroupsShuffled:A,pickedGroup:null,pots:r,groups:W})},[I,W,k,C,O,M,A]),_=Object(s.useCallback)(e=>{if(!O)return void R({error:"No selected team..."});const t=W.slice();t[e]=[...t[e],O];const r=I[k].length>0?k:k+1;$({selectedTeam:null,pickedGroup:e,hungPot:I[r],possibleGroups:null,possibleGroupsShuffled:null,currentPotNum:r,pots:I,groups:t})},[I,W,O,k,C]);Object(s.useEffect)(()=>{O&&(async()=>{if(!O)throw new Error("no selected team");let t;try{t=(await H({season:e,pots:I,groups:W,selectedTeam:O})).possibleGroups}catch(e){return console.error(e),void R({error:"Could not determine the group"})}$({selectedTeam:O,pickedGroup:null,hungPot:C,currentPotNum:k,possibleGroups:t,possibleGroupsShuffled:l(t),pots:I,groups:W})})()},[O]);const F=k>=I.length;Object(s.useEffect)(()=>{const e=null==C?void 0:C.length;if(v&&e){const t=n(e-1);L(t)}},[v,C]),Object(s.useEffect)(()=>{if(v&&(null==A?void 0:A.length)){const e=c(A);_(e)}},[v,A]),Object(s.useEffect)(()=>{F&&v&&w(!1)},[F,v]);const V=W.length,q=Object(s.useCallback)(e=>e<V>>1?T:x,[V]);return a.a.createElement(y.a,null,a.a.createElement(h.a,null,a.a.createElement(b.a,{selectedTeams:O&&[O],initialPots:t,pots:I,currentPotNum:k}),a.a.createElement(f.a,{ref:J,maxTeams:I.length,currentPotNum:k,groups:W,possibleGroups:v?null:M,getGroupHeaderStyles:q})),a.a.createElement(g.a,null,!v&&a.a.createElement(j.a,{display:!F,displayTeams:D,selectedTeam:O,pot:C,onPick:L}),a.a.createElement(G.a,{long:!1,completed:F,selectedTeam:O,pickedGroup:S,possibleGroups:M,isDisplayPossibleGroupsText:!!O,numGroups:V,groupsElement:J,reset:o}),!v&&a.a.createElement(E,{display:!F,displayGroups:D,possibleGroups:A,onPick:_})))})},130:function(e,t,r){var s=r(112);e.exports=function(e){var t=e.length;return t?e[s(0,t-1)]:void 0}},435:function(e,t,r){var s=r(130),a=r(436),o=r(76);e.exports=function(e){return(o(e)?s:a)(e)}},436:function(e,t,r){var s=r(130),a=r(131);e.exports=function(e){return s(a(e))}},80:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s={rejectOnTimeout:!0,errorMessage:void 0};function a(e,t,r){const{rejectOnTimeout:a=s.rejectOnTimeout,errorMessage:o=s.errorMessage}=r||s;return new Promise((r,s)=>{e(r,s),setTimeout(()=>{a?s(o):r()},t)})}t.promiseWithTimeout=a,t.default=(e,t,r)=>a((t,r)=>e.then(t).catch(r),t,r)},88:function(e,t,r){"use strict";var s=r(0);Object.create;Object.create;function a(e,t){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return t.get(e)}function o(e,t,r){if(!t.has(e))throw new TypeError("attempted to set private field on non-instance");return t.set(e,r),r}var n=class{constructor(){this.callbacks=new Map}add(e,t){this.callbacks.set(e,t)}addAndGetId(e){const t=Math.random().toString(36).slice(2);return this.add(t,e),t}resolve(e,t){this.getCallbackAndDelete(e)(null,t)}reject(e,t){this.getCallbackAndDelete(e)(t)}getCallbackAndDelete(e){const t=this.callbacks.get(e);if(!t)throw new Error("no resolver with id = "+e);return this.callbacks.delete(e),t}};const c=(e,t)=>(r,s)=>{r?t(r):e(s)};var l,u,i,p=class{constructor(){this.manager=new n}getPromise(e){return new Promise(async(t,r)=>{const s=c(t,r);this.manager.add(e,s)})}getPromiseWithId(e){return new Promise(async(t,r)=>{const s=c(t,r),a=this.manager.addAndGetId(s);e&&e(a)})}resolve(e,t){this.manager.resolve(e,t)}reject(e,t){this.manager.reject(e,t)}},d=r(80),m=r.n(d);l=new WeakMap,u=new WeakMap,i=new WeakMap;var b=class{constructor(e,t){l.set(this,void 0),u.set(this,new p),i.set(this,void 0),o(this,i,t),o(this,l,e),a(this,l).onmessage=e=>{const{messageId:t,data:r}=e.data;a(this,u).resolve(t,r)}}sendAndReceive(e){const t=a(this,u).getPromiseWithId(t=>{a(this,l).postMessage({messageId:t,data:e})});return void 0===a(this,i)?t:m()(t,a(this,i))}terminate(){a(this,l).terminate()}};t.a=(e,t)=>{const r=Object(s.useMemo)(()=>new b(new e,t),[e,t]);return Object(s.useEffect)(()=>()=>{r.terminate()},[r]),Object(s.useCallback)(r.sendAndReceive.bind(r),[r])}},89:function(e,t,r){"use strict";var s=r(0),a=r.n(s),o=r(2),n=r(73),c=r(67),l=r(72),u=r(96),i=r(70),p=r(66),d=r(81),m=r(74),b=r(71),f=r(82),h=r(90);const g=o.e`
  from {
    background-color: white;
    box-shadow: 0 0 20px #08f;
  }
  to {}
`,j=o.e`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,v=o.c`
  position: relative; /* enables glow */
  animation: ${g} 1s ease;
  box-shadow: 0 0 5px #6af;
`,w=o.c`
  animation: ${j} 3s ease-out normal forwards;
`;var k=Object(o.d)(p.a)`
  ${e=>e.possible&&v}
  ${e=>e.picked&&w}
`;var O=Object(s.memo)(({team:e,possible:t})=>{var r;const o=Object(d.a)(e),[n,c]=Object(s.useState)(e),l=Object(s.useRef)(null),u=Object(s.useCallback)(()=>{c(e)},[e]);return a.a.createElement(a.a.Fragment,null,a.a.createElement(k,{picked:!!n,possible:t},n?a.a.createElement(b.a,{country:Object(m.a)(n)},null!==(r=n.shortName)&&void 0!==r?r:n.name):a.a.createElement(f.a,{ref:l})),e&&e!==o&&a.a.createElement(h.a,{from:`[data-cellid='${e.id}']`,to:l,duration:350,team:e,onAnimationEnd:u}))});var E=Object(s.memo)(({maxTeams:e,groupLetter:t,teams:r,potNum:s,possible:o,headerStyles:n})=>a.a.createElement(l.a,null,a.a.createElement("thead",null,a.a.createElement(i.a,null,a.a.createElement(p.a,null,a.a.createElement(u.a,{styles:n},"Group"," ",t)))),a.a.createElement("tbody",null,c(e).map(e=>a.a.createElement(i.a,{key:e},a.a.createElement(O,{team:r[e],possible:e===s&&o}))))));const G=o.d.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,y=Object(s.forwardRef)(({maxTeams:e,currentPotNum:t,groups:r,possibleGroups:s,getGroupHeaderStyles:o},c)=>a.a.createElement(G,{ref:c},null==r?void 0:r.map((r,c)=>{const l=Object(n.a)(c),u=null==o?void 0:o(c);return a.a.createElement(E,{key:l,maxTeams:e,groupLetter:l,teams:r,potNum:t,possible:!!(null==s?void 0:s.includes(c)),headerStyles:u})})));t.a=Object(s.memo)(y)},98:function(e,t,r){"use strict";r.r(t),t.default=function(){return new Worker(r.p+"worker.0827247af48c8c399b28.worker.js")}}},0,[80]]);