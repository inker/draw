/*! For license information please see cl-gs.86b2d3cdb4fa1650c8d8.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[1,6],{101:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),s=a(70),o=a(2),c=a(63),l=a(66),i=a(80),u=a(81),d=a(77),m=a(60),p=a(78),b=a(76),f=a(79),h=a(72),g=a(73),w=a(82),k=a(1),E=a(126);var v=Object(k.c)(E.a)`
  &:hover {
    ${e=>!e.noHover&&"background: radial-gradient(#ccf, #ccf)"};
  }
`;const O=k.c.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 999px) {
    justify-content: center;
  }
`;var j=Object(r.memo)(({display:e,displayGroups:t,possibleGroups:a,onPick:s})=>{const o=Object(r.useCallback)(e=>{const t=e.target,a=+t.dataset.group;if(Number.isNaN(a))throw new TypeError("Incorrect group ball: "+t.dataset.group);s(a)},[s]);return n.a.createElement(O,null,e&&(null==a?void 0:a.map(e=>n.a.createElement(v,{key:e,"data-group":e,forceVisible:t,onClick:o},Object(m.a)(e)))))}),y=a(75),T=a(74),G=a(94);const P=["#ffc0c0","#c0e0ff"];function x(e){return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:e[0],possibleGroups:null,possibleGroupsShuffled:null}}t.default=Object(r.memo)(({season:e,pots:t})=>{const[a,k]=Object(c.a)(),E=Object(r.useMemo)(()=>t.map(e=>s(e)),[t,a]),v=Object(r.useMemo)(()=>t[0].map(()=>[]),[t,a]),[{currentPotNum:O,selectedTeam:N,pickedGroup:M,hungPot:A,possibleGroups:C,possibleGroupsShuffled:I},$]=Object(r.useState)(()=>x(E));Object(r.useEffect)(()=>{$(x(E))},[E]);const[,S]=Object(o.a)(),[R]=Object(l.a)(),W=Object(d.a)(G.default),[U,D]=Object(i.a)(),[L,_]=Object(u.a)(3e3),J=Object(r.useRef)(null),V=Object(r.useCallback)(async t=>(await W({season:e,pots:E,groups:v,selectedTeam:t})).possibleGroups,[E,v,e,W]),H=Object(r.useCallback)(async e=>{if(N)return;const t=E[O];if(!t[e])return;const a=t.splice(e,1)[0];_.set(a);const r=await V(a);_.reset(),$({currentPotNum:O,hungPot:t.slice(),selectedTeam:a,possibleGroups:r,possibleGroupsShuffled:s(r),pickedGroup:null})},[E,v,O,V]),q=Object(r.useCallback)(e=>{if(!N)return void S({error:"No selected team..."});v[e].push(N);const t=E[O].length>0?O:O+1;D.add(N),$({selectedTeam:null,pickedGroup:e,hungPot:E[t],possibleGroups:null,possibleGroupsShuffled:null,currentPotNum:t})},[E,v,N,O]),z=O>=E.length;return n.a.createElement(T.a,null,n.a.createElement(h.a,null,n.a.createElement(b.a,{selectedTeams:N&&[N],initialPots:t,pots:E,currentPotNum:O}),n.a.createElement(f.a,{ref:J,maxTeams:E.length,currentPotNum:O,groups:v,possibleGroups:C,airborneTeams:U,groupColors:P})),n.a.createElement(g.a,null,n.a.createElement(w.a,{display:!z,displayTeams:R,selectedTeam:N,pot:A,onPick:H}),n.a.createElement(y.a,{long:!1,calculating:L,completed:z,isAirborneAnimation:U.length>0,selectedTeam:N,pickedGroup:M,possibleGroups:C,numGroups:v.length,groupsElement:J.current,reset:k}),n.a.createElement(j,{display:!z,displayGroups:R,possibleGroups:I,onPick:q})),U.map(e=>{const t=v.findIndex(t=>t.includes(e)),a=Object(m.a)(t),r=v[t].indexOf(e);return n.a.createElement(p.a,{key:e.id,from:`[data-cellid='${e.id}']`,to:`[data-cellid='${a}${r}']`,duration:350,data:e,onAnimationEnd:D.remove})}))})},77:function(e,t,a){"use strict";var r=a(0);Object.create;Object.create;function n(e,t){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return t.get(e)}function s(e,t,a){if(!t.has(e))throw new TypeError("attempted to set private field on non-instance");return t.set(e,a),a}var o=class{constructor(){this.callbacks=new Map}add(e,t){this.callbacks.set(e,t)}addAndGetId(e){const t=Math.random().toString(36).slice(2);return this.add(t,e),t}resolve(e,t){this.getCallbackAndDelete(e)(null,t)}reject(e,t){this.getCallbackAndDelete(e)(t)}getCallbackAndDelete(e){const t=this.callbacks.get(e);if(!t)throw new Error("no resolver with id = "+e);return this.callbacks.delete(e),t}};const c=(e,t)=>(a,r)=>{a?t(a):e(r)};var l,i,u,d=class{constructor(){this.manager=new o}getPromise(e){return new Promise(async(t,a)=>{const r=c(t,a);this.manager.add(e,r)})}getPromiseWithId(e){return new Promise(async(t,a)=>{const r=c(t,a),n=this.manager.addAndGetId(r);e&&e(n)})}resolve(e,t){this.manager.resolve(e,t)}reject(e,t){this.manager.reject(e,t)}},m=a(86),p=a.n(m);l=new WeakMap,i=new WeakMap,u=new WeakMap;var b=class{constructor(e,t){l.set(this,void 0),i.set(this,new d),u.set(this,void 0),s(this,u,t),s(this,l,e),n(this,l).onmessage=e=>{const{messageId:t,data:a}=e.data;n(this,i).resolve(t,a)}}sendAndReceive(e){const t=n(this,i).getPromiseWithId(t=>{n(this,l).postMessage({messageId:t,data:e})});return void 0===n(this,u)?t:p()(t,n(this,u))}terminate(){n(this,l).terminate()}};t.a=e=>{const t=Object(r.useMemo)(()=>new b(new e,12e4),[]);return Object(r.useEffect)(()=>()=>{t.terminate()},[]),Object(r.useCallback)(t.sendAndReceive.bind(t),[t])}},79:function(e,t,a){"use strict";var r=a(0),n=a.n(r),s=a(1),o=a(60),c=a(91),l=a(61),i=a(64),u=a(92),d=a(62),m=a(59),p=a(65),b=a(71);const f=s.d`
  from {
    background-color: white;
    box-shadow: 0 0 20px #08f;
  }
  to {}
`,h=s.d`
  from {
    background-color: #ff8;
  }
  to {}
`,g=s.b`
  position: relative; /* enables glow */
  background-color: rgba(255, 255, 255, 0.9);
  animation: ${f} 1s ease;
  box-shadow: 0 0 5px #6af;
`,w=s.b`
  animation: ${h} 5s normal forwards;
`;var k=Object(s.c)(m.a)`
  ${e=>e.possible&&g}
  ${e=>e.picked&&w}
`,E=a(69),v=e=>{var t;return null!==(t=e.country)&&void 0!==t?t:e.name in E?e.name:void 0};var O=Object(r.memo)(({maxTeams:e,groupLetter:t,teams:a,potNum:r,possible:s,airborneTeams:o,background:f,color:h})=>{const g=c(a,o);return n.a.createElement(i.a,null,n.a.createElement("thead",null,n.a.createElement(d.a,null,n.a.createElement(m.a,null,n.a.createElement(u.a,{background:f,color:h},"Group"," ",t)))),n.a.createElement("tbody",null,g.map(e=>{var t;return n.a.createElement(d.a,null,n.a.createElement(k,{picked:!0},n.a.createElement(p.a,{country:v(e)},null!==(t=e.shortName)&&void 0!==t?t:e.name)))}),l(g.length,e).map(e=>n.a.createElement(d.a,null,n.a.createElement(k,{possible:e===r&&s},n.a.createElement(b.a,{"data-cellid":`${t}${e}`}))))))});const j=s.c.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,y=Object(r.forwardRef)(({maxTeams:e,currentPotNum:t,groups:a,possibleGroups:r,airborneTeams:s,groupColors:c},l)=>n.a.createElement(j,{ref:l},null==a?void 0:a.map((l,i)=>{const u=Object(o.a)(i),d=null==c?void 0:c[~~(i/a.length*c.length)];return n.a.createElement(O,{key:u,maxTeams:e,groupLetter:u,teams:l,potNum:t,possible:!!(null==r?void 0:r.includes(i)),airborneTeams:s,background:d})})));t.a=Object(r.memo)(y)},81:function(e,t,a){"use strict";var r=a(0),n=a(68),s=a.n(n);const o={key:null,isTimedOut:!1},c="TIMEOUT_VALUE_SET",l="TIMEOUT_RESET";function i(e,t){switch(t.type){case c:return{key:t.payload,isTimedOut:!!t.payload&&t.payload===e.key};case l:return o;default:throw new Error("Unknown action: "+t)}}t.a=e=>{const[t,a]=Object(r.useReducer)(i,o),n=async t=>{a({type:c,payload:t}),await s()(e),a({type:c,payload:t})},u=()=>{a({type:l})},d=Object(r.useMemo)(()=>({set:n,reset:u}),[]);return[t.isTimedOut,d]}},94:function(e,t,a){"use strict";a.r(t),t.default=function(){return new Worker(a.p+"worker.b28e9dece7ba7c38f3a9.worker.js")}}},0,[79]]);