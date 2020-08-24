/*! For license information please see cl-gs.f483578930e969cc3b91.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[1,6],{76:function(e,t,a){"use strict";var r=a(0);Object.create;Object.create;function s(e,t){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return t.get(e)}function n(e,t,a){if(!t.has(e))throw new TypeError("attempted to set private field on non-instance");return t.set(e,a),a}var o=class{constructor(){this.callbacks=new Map}add(e,t){this.callbacks.set(e,t)}addAndGetId(e){const t=Math.random().toString(36).slice(2);return this.add(t,e),t}resolve(e,t){this.getCallbackAndDelete(e)(null,t)}reject(e,t){this.getCallbackAndDelete(e)(t)}getCallbackAndDelete(e){const t=this.callbacks.get(e);if(!t)throw new Error("no resolver with id = "+e);return this.callbacks.delete(e),t}};const c=(e,t)=>(a,r)=>{a?t(a):e(r)};var l,i,u,d=class{constructor(){this.manager=new o}getPromise(e){return new Promise(async(t,a)=>{const r=c(t,a);this.manager.add(e,r)})}getPromiseWithId(e){return new Promise(async(t,a)=>{const r=c(t,a),s=this.manager.addAndGetId(r);e&&e(s)})}resolve(e,t){this.manager.resolve(e,t)}reject(e,t){this.manager.reject(e,t)}},p=a(84),m=a.n(p);l=new WeakMap,i=new WeakMap,u=new WeakMap;var b=class{constructor(e,t){l.set(this,void 0),i.set(this,new d),u.set(this,void 0),n(this,u,t),n(this,l,e),s(this,l).onmessage=e=>{const{messageId:t,data:a}=e.data;s(this,i).resolve(t,a)}}sendAndReceive(e){const t=s(this,i).getPromiseWithId(t=>{s(this,l).postMessage({messageId:t,data:e})});return void 0===s(this,u)?t:m()(t,s(this,u))}terminate(){s(this,l).terminate()}};t.a=e=>{const t=Object(r.useMemo)(()=>new b(new e,12e4),[]);return Object(r.useEffect)(()=>()=>{t.terminate()},[]),Object(r.useCallback)(t.sendAndReceive.bind(t),[t])}},78:function(e,t,a){"use strict";var r=a(0),s=a.n(r),n=a(1),o=a(59),c=a(89),l=a(60),i=a(62),u=a(90),d=a(70),p=a(64);const m=n.d`
  from {
    background-color: white;
    box-shadow: 0 0 20px #08f;
  }
  to {}
`,b=n.d`
  from {
    background-color: #ff8;
  }
  to {}
`,f=n.b`
  background-color: rgba(255, 255, 255, 0.9);
  animation: ${m} 1s ease;
  box-shadow: 0 0 5px #6af;
`,h=n.b`
  animation: ${b} 5s normal forwards;
`;var g=Object(n.c)(p.a)`
  ${e=>e.possible&&f}
  ${e=>e.picked&&h}
`,k=a(68),w=e=>{var t;return null!==(t=e.country)&&void 0!==t?t:e.name in k?e.name:void 0};var v=Object(r.memo)(({maxTeams:e,groupLetter:t,teams:a,potNum:r,possible:n,airborneTeams:o,background:p,color:m})=>{const b=c(a,o);return s.a.createElement(i.a,null,s.a.createElement(u.a,{background:p,color:m},"Group"," ",t),s.a.createElement(d.a,null,b.map(e=>{var t;return s.a.createElement(g,{country:w(e),picked:!0},null!==(t=e.shortName)&&void 0!==t?t:e.name)}),l(b.length,e).map(e=>s.a.createElement(g,{key:e,possible:e===r&&n,"data-cellid":`${t}${e}`}))))});const O=n.c.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,j=Object(r.forwardRef)(({maxTeams:e,currentPotNum:t,groups:a,possibleGroups:r,airborneTeams:n,groupColors:c},l)=>s.a.createElement(O,{ref:l},null==a?void 0:a.map((l,i)=>{const u=Object(o.a)(i),d=null==c?void 0:c[~~(i/a.length*c.length)];return s.a.createElement(v,{key:u,maxTeams:e,groupLetter:u,teams:l,potNum:t,possible:!!(null==r?void 0:r.includes(i)),airborneTeams:n,background:d})})));t.a=Object(r.memo)(j)},80:function(e,t,a){"use strict";var r=a(0),s=a(67),n=a.n(s);const o={key:null,isTimedOut:!1},c="TIMEOUT_VALUE_SET",l="TIMEOUT_RESET";function i(e,t){switch(t.type){case c:return{key:t.payload,isTimedOut:!!t.payload&&t.payload===e.key};case l:return o;default:throw new Error("Unknown action: "+t)}}t.a=e=>{const[t,a]=Object(r.useReducer)(i,o),s=async t=>{a({type:c,payload:t}),await n()(e),a({type:c,payload:t})},u=()=>{a({type:l})},d=Object(r.useMemo)(()=>({set:s,reset:u}),[]);return[t.isTimedOut,d]}},92:function(e,t,a){e.exports=function(){return new Worker(a.p+"39c14fef1a2da90bd9f7.worker.js")}},99:function(e,t,a){"use strict";a.r(t);var r=a(0),s=a.n(r),n=a(69),o=a(2),c=a(61),l=a(63),i=a(79),u=a(80),d=a(76),p=a(59),m=a(77),b=a(75),f=a(78),h=a(71),g=a(72),k=a(81),w=a(1),v=a(123);var O=Object(w.c)(v.a)`
  &:hover {
    ${e=>!e.noHover&&"background: radial-gradient(#ccf, #ccf)"};
  }
`;const j=w.c.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 999px) {
    justify-content: center;
  }
`;var y=Object(r.memo)(({display:e,displayGroups:t,possibleGroups:a,onPick:n})=>{const o=Object(r.useCallback)(e=>{const t=e.target,a=+t.dataset.group;if(Number.isNaN(a))throw new TypeError("Incorrect group ball: "+t.dataset.group);n(a)},[n]);return s.a.createElement(j,null,e&&(null==a?void 0:a.map(e=>s.a.createElement(O,{key:e,"data-group":e,forceVisible:t,onClick:o},Object(p.a)(e)))))}),E=a(74),T=a(73),G=a(92),P=a.n(G);const x=["rgba(255, 0, 0, 0.25)","rgba(0, 128, 255, 0.25)"];function N(e){return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:e[0],possibleGroups:null,possibleGroupsShuffled:null}}t.default=Object(r.memo)(({season:e,pots:t})=>{const[a,w]=Object(c.a)(),v=Object(r.useMemo)(()=>t.map(e=>n(e)),[t,a]),O=Object(r.useMemo)(()=>t[0].map(()=>[]),[t,a]),[{currentPotNum:j,selectedTeam:G,pickedGroup:M,hungPot:A,possibleGroups:C,possibleGroupsShuffled:I},$]=Object(r.useState)(()=>N(v));Object(r.useEffect)(()=>{$(N(v))},[v]);const[,S]=Object(o.a)(),[R]=Object(l.a)(),W=Object(d.a)(P.a),[U,D]=Object(i.a)(),[L,_]=Object(u.a)(3e3),J=Object(r.useRef)(null),V=Object(r.useCallback)(async t=>(await W({season:e,pots:v,groups:O,selectedTeam:t})).possibleGroups,[v,O,e,W]),H=Object(r.useCallback)(async e=>{if(G)return;const t=v[j];if(!t[e])return;const a=t.splice(e,1)[0];_.set(a);const r=await V(a);_.reset(),$({currentPotNum:j,hungPot:t.slice(),selectedTeam:a,possibleGroups:r,possibleGroupsShuffled:n(r),pickedGroup:null})},[v,O,j,V]),q=Object(r.useCallback)(e=>{if(!G)return void S({error:"No selected team..."});O[e].push(G);const t=v[j].length>0?j:j+1;D.add(G),$({selectedTeam:null,pickedGroup:e,hungPot:v[t],possibleGroups:null,possibleGroupsShuffled:null,currentPotNum:t})},[v,O,G,j]),z=j>=v.length;return s.a.createElement(T.a,null,s.a.createElement(h.a,null,s.a.createElement(b.a,{selectedTeams:G&&[G],initialPots:t,pots:v,currentPotNum:j}),s.a.createElement(f.a,{ref:J,maxTeams:v.length,currentPotNum:j,groups:O,possibleGroups:C,airborneTeams:U,groupColors:x})),s.a.createElement(g.a,null,s.a.createElement(k.a,{display:!z,displayTeams:R,selectedTeam:G,pot:A,onPick:H}),s.a.createElement(E.a,{long:!1,calculating:L,completed:z,isAirborneAnimation:U.length>0,selectedTeam:G,pickedGroup:M,possibleGroups:C,numGroups:O.length,groupsElement:J.current,reset:w}),s.a.createElement(y,{display:!z,displayGroups:R,possibleGroups:I,onPick:q})),U.map(e=>{const t=O.findIndex(t=>t.includes(e)),a=Object(p.a)(t),r=O[t].indexOf(e);return s.a.createElement(m.a,{key:e.id,from:`[data-cellid='${e.id}']`,to:`[data-cellid='${a}${r}']`,duration:350,data:e,onAnimationEnd:D.remove})}))})}},0,[79]]);