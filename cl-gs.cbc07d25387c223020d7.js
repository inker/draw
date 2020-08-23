(window.webpackJsonp=window.webpackJsonp||[]).push([[1,6],{76:function(e,t,a){"use strict";var r=a(0);var s=class{constructor(){this.callbacks=new Map}add(e,t){this.callbacks.set(e,t)}addAndGetId(e){const t=Math.random().toString(36).slice(2);return this.add(t,e),t}resolve(e,t){this.getCallbackAndDelete(e)(null,t)}reject(e,t){this.getCallbackAndDelete(e)(t)}getCallbackAndDelete(e){const t=this.callbacks.get(e);if(!t)throw new Error("no resolver with id = "+e);return this.callbacks.delete(e),t}};const n=(e,t)=>(a,r)=>{a?t(a):e(r)};var o=class{constructor(){this.manager=new s}getPromise(e){return new Promise(async(t,a)=>{const r=n(t,a);this.manager.add(e,r)})}getPromiseWithId(e){return new Promise(async(t,a)=>{const r=n(t,a),s=this.manager.addAndGetId(r);e&&e(s)})}resolve(e,t){this.manager.resolve(e,t)}reject(e,t){this.manager.reject(e,t)}},c=a(84),l=a.n(c);var i=class{constructor(e,t){this.asyncManager=new o,this.timeout=t,this.worker=e,this.worker.onmessage=e=>{const{messageId:t,data:a}=e.data;this.asyncManager.resolve(t,a)}}sendAndReceive(e){const t=this.asyncManager.getPromiseWithId(t=>{this.worker.postMessage({messageId:t,data:e})});return void 0===this.timeout?t:l()(t,this.timeout)}terminate(){this.worker.terminate()}};t.a=e=>{const t=Object(r.useMemo)(()=>new i(new e,12e4),[]);return Object(r.useEffect)(()=>()=>{t.terminate()},[]),Object(r.useCallback)(t.sendAndReceive.bind(t),[t])}},78:function(e,t,a){"use strict";var r=a(0),s=a.n(r),n=a(1),o=a(59),c=a(89),l=a(60),i=a(62),u=a(90),d=a(70),m=a(64);const p=n.d`
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
`,g=n.b`
  background-color: rgba(255, 255, 255, 0.9);
  animation: ${p} 1s ease;
  box-shadow: 0 0 5px #6af;
`,h=n.b`
  animation: ${b} 5s normal forwards;
`;var f=Object(n.c)(m.a)`
  ${e=>e.possible&&g}
  ${e=>e.picked&&h}
`,k=a(68),w=e=>{var t;return null!==(t=e.country)&&void 0!==t?t:e.name in k?e.name:void 0};var y=Object(r.memo)(({maxTeams:e,groupLetter:t,teams:a,potNum:r,possible:n,airborneTeams:o,background:m,color:p})=>{const b=c(a,o);return s.a.createElement(i.a,null,s.a.createElement(u.a,{background:m,color:p},"Group"," ",t),s.a.createElement(d.a,null,b.map(e=>{var t;return s.a.createElement(f,{country:w(e),picked:!0},null!==(t=e.shortName)&&void 0!==t?t:e.name)}),l(b.length,e).map(e=>s.a.createElement(f,{key:e,possible:e===r&&n,"data-cellid":`${t}${e}`}))))});const O=n.c.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`,j=Object(r.forwardRef)(({maxTeams:e,currentPotNum:t,groups:a,possibleGroups:r,airborneTeams:n,groupColors:c},l)=>s.a.createElement(O,{ref:l},null==a?void 0:a.map((l,i)=>{const u=Object(o.a)(i),d=c&&c[~~(i/a.length*c.length)];return s.a.createElement(y,{key:u,maxTeams:e,groupLetter:u,teams:l,potNum:t,possible:!!(null==r?void 0:r.includes(i)),airborneTeams:n,background:d})})));t.a=Object(r.memo)(j)},80:function(e,t,a){"use strict";var r=a(0),s=a(67),n=a.n(s);const o={key:null,isTimedOut:!1},c="TIMEOUT_VALUE_SET",l="TIMEOUT_RESET";function i(e,t){switch(t.type){case c:return{key:t.payload,isTimedOut:!!t.payload&&t.payload===e.key};case l:return o;default:throw new Error("Unknown action: "+t)}}t.a=e=>{const[t,a]=Object(r.useReducer)(i,o),s=async t=>{a({type:c,payload:t}),await n()(e),a({type:c,payload:t})},u=()=>{a({type:l})},d=Object(r.useMemo)(()=>({set:s,reset:u}),[]);return[t.isTimedOut,d]}},92:function(e,t,a){e.exports=function(){return new Worker(a.p+"22da6856317d9ec53001.worker.js")}},99:function(e,t,a){"use strict";a.r(t);var r=a(0),s=a.n(r),n=a(69),o=a(2),c=a(61),l=a(63),i=a(79),u=a(80),d=a(76),m=a(59),p=a(77),b=a(74),g=a(78),h=a(71),f=a(72),k=a(81),w=a(1),y=a(123);var O=Object(w.c)(y.a)`
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
`;var v=Object(r.memo)(({display:e,displayGroups:t,possibleGroups:a,onPick:n})=>{const o=Object(r.useCallback)(e=>{const t=e.target,a=+t.dataset.group;if(Number.isNaN(a))throw new TypeError("Incorrect group ball: "+t.dataset.group);n(a)},[n]);return s.a.createElement(j,null,e&&(null==a?void 0:a.map(e=>s.a.createElement(O,{key:e,"data-group":e,forceVisible:t,onClick:o},Object(m.a)(e)))))}),E=a(75),T=a(73),G=a(92),P=a.n(G);const x=["rgba(255, 0, 0, 0.25)","rgba(0, 128, 255, 0.25)"];function N(e){return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:e[0],possibleGroups:null,possibleGroupsShuffled:null}}t.default=Object(r.memo)(({season:e,pots:t})=>{const[a,w]=Object(c.a)(),y=Object(r.useMemo)(()=>t.map(e=>n(e)),[t,a]),O=Object(r.useMemo)(()=>t[0].map(()=>[]),[t,a]),[{currentPotNum:j,selectedTeam:G,pickedGroup:M,hungPot:A,possibleGroups:C,possibleGroupsShuffled:I},$]=Object(r.useState)(()=>N(y));Object(r.useEffect)(()=>{$(N(y))},[y]);const[,S]=Object(o.a)(),[R]=Object(l.a)(),U=Object(d.a)(P.a),[D,L]=Object(i.a)(),[W,_]=Object(u.a)(3e3),J=Object(r.useRef)(null),V=Object(r.useCallback)(async t=>(await U({season:e,pots:y,groups:O,selectedTeam:t})).possibleGroups,[y,O,e,U]),H=Object(r.useCallback)(async e=>{if(G)return;const t=y[j];if(!t[e])return;const a=t.splice(e,1)[0];_.set(a);const r=await V(a);_.reset(),$({currentPotNum:j,hungPot:t.slice(),selectedTeam:a,possibleGroups:r,possibleGroupsShuffled:n(r),pickedGroup:null})},[y,O,j,V]),q=Object(r.useCallback)(e=>{if(!G)return void S({error:"No selected team..."});O[e].push(G);const t=y[j].length>0?j:j+1;L.add(G),$({selectedTeam:null,pickedGroup:e,hungPot:y[t],possibleGroups:null,possibleGroupsShuffled:null,currentPotNum:t})},[y,O,G,j]),z=j>=y.length;return s.a.createElement(T.a,null,s.a.createElement(h.a,null,s.a.createElement(b.a,{selectedTeams:G&&[G],initialPots:t,pots:y,currentPotNum:j}),s.a.createElement(g.a,{ref:J,maxTeams:y.length,currentPotNum:j,groups:O,possibleGroups:C,airborneTeams:D,groupColors:x})),s.a.createElement(f.a,null,s.a.createElement(k.a,{display:!z,displayTeams:R,selectedTeam:G,pot:A,onPick:H}),s.a.createElement(E.a,{long:!1,calculating:W,completed:z,isAirborneAnimation:D.length>0,selectedTeam:G,pickedGroup:M,possibleGroups:C,numGroups:O.length,groupsElement:J.current,reset:w}),s.a.createElement(v,{display:!z,displayGroups:R,possibleGroups:I,onPick:q})),D.map(e=>{const t=O.findIndex(t=>t.includes(e)),a=Object(m.a)(t),r=O[t].indexOf(e);return s.a.createElement(p.a,{key:e.id,from:`[data-cellid='${e.id}']`,to:`[data-cellid='${a}${r}']`,duration:350,data:e,onAnimationEnd:L.remove})}))})}},0,[79]]);