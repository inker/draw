(window.webpackJsonp=window.webpackJsonp||[]).push([[1,6],{75:function(e,t,a){"use strict";var r=a(0);var s=class{constructor(){this.callbacks=new Map}add(e,t){this.callbacks.set(e,t)}addAndGetId(e){const t=Math.random().toString(36).slice(2);return this.add(t,e),t}resolve(e,t){this.getCallbackAndDelete(e)(null,t)}reject(e,t){this.getCallbackAndDelete(e)(t)}getCallbackAndDelete(e){const t=this.callbacks.get(e);if(!t)throw new Error("no resolver with id = "+e);return this.callbacks.delete(e),t}};const o=(e,t)=>(a,r)=>{a?t(a):e(r)};var n=class{constructor(){this.manager=new s}getPromise(e){return new Promise(async(t,a)=>{const r=o(t,a);this.manager.add(e,r)})}getPromiseWithId(e){return new Promise(async(t,a)=>{const r=o(t,a),s=this.manager.addAndGetId(r);e&&e(s)})}resolve(e,t){this.manager.resolve(e,t)}reject(e,t){this.manager.reject(e,t)}},c=a(84),l=a.n(c);var i=class{constructor(e,t){this.asyncManager=new n,this.timeout=t,this.worker=e,this.worker.onmessage=e=>{const{messageId:t,data:a}=e.data;this.asyncManager.resolve(t,a)}}sendAndReceive(e){const t=this.asyncManager.getPromiseWithId(t=>{this.worker.postMessage({messageId:t,data:e})});return void 0===this.timeout?t:l()(t,this.timeout)}terminate(){this.worker.terminate()}};t.a=e=>{const t=Object(r.useMemo)(()=>new i(new e,12e4),[]);return Object(r.useEffect)(()=>()=>{t.terminate()},[]),Object(r.useCallback)(t.sendAndReceive.bind(t),[t])}},78:function(e,t,a){"use strict";var r=a(0),s=a.n(r),o=a(1),n=a(59),c=a(89),l=a(60),i=a(62),u=a(90),d=a(70),m=a(64);const p=o.c`
  from {
    background-color: white;
    box-shadow: 0 0 20px #08f;
  }
  to {}
`,b=o.c`
  from {
    background-color: #ff8;
  }
  to {}
`,g=o.a`
  background-color: rgba(255, 255, 255, 0.9);
  animation: ${p} 1s ease;
  box-shadow: 0 0 5px #6af;
`,h=o.a`
  animation: ${b} 5s normal forwards;
`;var f=Object(o.b)(m.a)`
  ${e=>e.possible&&g}
  ${e=>e.picked&&h}
`,k=a(68),w=e=>{var t;return null!==(t=e.country)&&void 0!==t?t:e.name in k?e.name:void 0};var y=Object(r.memo)(({maxTeams:e,groupLetter:t,teams:a,potNum:r,possible:o,airborneTeams:n,background:m,color:p})=>{const b=c(a,n);return s.a.createElement(i.a,null,s.a.createElement(u.a,{background:m,color:p},"Group"," ",t),s.a.createElement(d.a,null,b.map(e=>{var t;return s.a.createElement(f,{country:w(e),picked:!0},null!==(t=e.shortName)&&void 0!==t?t:e.name)}),l(b.length,e).map(e=>s.a.createElement(f,{key:e,possible:e===r&&o,"data-cellid":`${t}${e}`}))))});const O=o.b.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`;t.a=Object(r.memo)(({maxTeams:e,currentPotNum:t,groups:a,possibleGroups:r,airborneTeams:o,groupColors:c})=>s.a.createElement(O,null,null==a?void 0:a.map((l,i)=>{const u=Object(n.a)(i),d=c&&c[~~(i/a.length*c.length)];return s.a.createElement(y,{key:u,maxTeams:e,groupLetter:u,teams:l,potNum:t,possible:!!(null==r?void 0:r.includes(i)),airborneTeams:o,background:d})})))},80:function(e,t,a){"use strict";var r=a(0),s=a(67),o=a.n(s);const n={key:null,isTimedOut:!1},c="TIMEOUT_VALUE_SET",l="TIMEOUT_RESET";function i(e,t){switch(t.type){case c:return{key:t.payload,isTimedOut:!!t.payload&&t.payload===e.key};case l:return n;default:throw new Error("Unknown action: "+t)}}t.a=e=>{const[t,a]=Object(r.useReducer)(i,n),s=async t=>{a({type:c,payload:t}),await o()(e),a({type:c,payload:t})},u=()=>{a({type:l})},d=Object(r.useMemo)(()=>({set:s,reset:u}),[]);return[t.isTimedOut,d]}},92:function(e,t,a){e.exports=function(){return new Worker(a.p+"daac3ecc42b066b02744.worker.js")}},99:function(e,t,a){"use strict";a.r(t);var r=a(0),s=a.n(r),o=a(69),n=a(2),c=a(61),l=a(63),i=a(79),u=a(80),d=a(75),m=a(59),p=a(76),b=a(74),g=a(78),h=a(71),f=a(72),k=a(81),w=a(1),y=a(123);var O=Object(w.b)(y.a)`
  &:hover {
    ${e=>!e.noHover&&"background: radial-gradient(#ccf, #ccf)"};
  }
`;const j=w.b.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 999px) {
    justify-content: center;
  }
`;var v=Object(r.memo)(({display:e,displayGroups:t,possibleGroups:a,onPick:o})=>{const n=Object(r.useCallback)(e=>{const t=e.target,a=+t.dataset.group;if(Number.isNaN(a))throw new TypeError("Incorrect group ball: "+t.dataset.group);o(a)},[o]);return s.a.createElement(j,null,e&&(null==a?void 0:a.map(e=>s.a.createElement(O,{key:e,"data-group":e,forceVisible:t,onClick:n},Object(m.a)(e)))))}),E=a(77),T=a(73),G=a(92),P=a.n(G);const x=["rgba(255, 0, 0, 0.25)","rgba(0, 128, 255, 0.25)"];function N(e){return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:e[0],possibleGroups:null,possibleGroupsShuffled:null}}t.default=Object(r.memo)(({season:e,pots:t})=>{const[a,w]=Object(c.a)(),y=Object(r.useMemo)(()=>t.map(e=>o(e)),[t,a]),O=Object(r.useMemo)(()=>t[0].map(()=>[]),[t,a]),[{currentPotNum:j,selectedTeam:G,pickedGroup:M,hungPot:C,possibleGroups:I,possibleGroupsShuffled:$},A]=Object(r.useState)(()=>N(y));Object(r.useEffect)(()=>{A(N(y))},[y]);const[,S]=Object(n.a)(),[R]=Object(l.a)(),U=Object(d.a)(P.a),[D,L]=Object(i.a)(),[W,_]=Object(u.a)(3e3),J=Object(r.useCallback)(async t=>(await U({season:e,pots:y,groups:O,selectedTeam:t})).possibleGroups,[y,O,e,U]),V=Object(r.useCallback)(async e=>{if(G)return;const t=y[j];if(!t[e])return;const a=t.splice(e,1)[0];_.set(a);const r=await J(a);_.reset(),A({currentPotNum:j,hungPot:t.slice(),selectedTeam:a,possibleGroups:r,possibleGroupsShuffled:o(r),pickedGroup:null})},[y,O,j,J]),H=Object(r.useCallback)(e=>{if(!G)return void S({error:"No selected team..."});O[e].push(G);const t=y[j].length>0?j:j+1;L.add(G),A({selectedTeam:null,pickedGroup:e,hungPot:y[t],possibleGroups:null,possibleGroupsShuffled:null,currentPotNum:t})},[y,O,G,j]),q=j>=y.length;return s.a.createElement(T.a,null,s.a.createElement(h.a,null,s.a.createElement(b.a,{selectedTeams:G&&[G],initialPots:t,pots:y,currentPotNum:j}),s.a.createElement(g.a,{maxTeams:y.length,currentPotNum:j,groups:O,possibleGroups:I,airborneTeams:D,groupColors:x})),s.a.createElement(f.a,null,s.a.createElement(k.a,{display:!q,displayTeams:R,selectedTeam:G,pot:C,onPick:V}),s.a.createElement(E.a,{long:!1,calculating:W,completed:q,selectedTeam:G,pickedGroup:M,possibleGroups:I,numGroups:O.length,reset:w}),s.a.createElement(v,{display:!q,displayGroups:R,possibleGroups:$,onPick:H})),D.map(e=>{const t=O.findIndex(t=>t.includes(e)),a=Object(m.a)(t),r=O[t].indexOf(e);return s.a.createElement(p.a,{key:e.id,from:`[data-cellid='${e.id}']`,to:`[data-cellid='${a}${r}']`,duration:350,data:e,onAnimationEnd:L.remove})}))})}}]);