(window.webpackJsonp=window.webpackJsonp||[]).push([["el-gs","el-gs-worker"],{394:function(e,t,a){"use strict";var r=a(0),n=a.n(r),o=a(4),s=a(381),c=a(400),l=a(111),u=a(383),i=a(401),m=a(388),d=a(385);const p=o.c`
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
`,f=o.a`
  animation: ${b} 5s normal forwards;
`;var k=Object(o.b)(d.a)`
  ${e=>e.possible&&g}
  ${e=>e.picked&&f}
`,h=a(386),w=e=>{var t;return null!==(t=e.country)&&void 0!==t?t:e.name in h?e.name:void 0};var O=Object(r.memo)(({maxTeams:e,groupLetter:t,teams:a,potNum:r,possible:o,airborneTeams:s,background:d,color:p})=>{const b=c(a,s);return n.a.createElement(u.a,null,n.a.createElement(i.a,{background:d,color:p},"Group"," ",t),n.a.createElement(m.a,null,b.map(e=>{var t;return n.a.createElement(k,{country:w(e),picked:!0},null!==(t=e.shortName)&&void 0!==t?t:e.name)}),l(b.length,e).map(e=>n.a.createElement(k,{key:e,possible:e===r&&o,"data-cellid":`${t}${e}`}))))});const j=o.b.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`;t.a=Object(r.memo)(({maxTeams:e,currentPotNum:t,groups:a,possibleGroups:r,airborneTeams:o,groupColors:c})=>n.a.createElement(j,null,null==a?void 0:a.map((l,u)=>{const i=Object(s.a)(u),m=c&&c[~~(u/a.length*c.length)];return n.a.createElement(O,{key:i,maxTeams:e,groupLetter:i,teams:l,potNum:t,possible:!!(null==r?void 0:r.includes(u)),airborneTeams:o,background:m})})))},397:function(e,t,a){"use strict";var r=a(0),n=a(112),o=a.n(n);const s={key:null,isTimedOut:!1},c="TIMEOUT_VALUE_SET",l="TIMEOUT_RESET";function u(e,t){switch(t.type){case c:return{key:t.payload,isTimedOut:!!t.payload&&t.payload===e.key};case l:return s;default:throw new Error("Unknown action: "+t)}}t.a=e=>{const[t,a]=Object(r.useReducer)(u,s),n=async t=>{a({type:c,payload:t}),await o()(e),a({type:c,payload:t})},i=()=>{a({type:l})},m=Object(r.useMemo)(()=>({set:n,reset:i}),[]);return[t.isTimedOut,m]}},398:function(e,t,a){"use strict";var r=a(0),n=a(115),o=a(113),s=a.n(o);var c=class{constructor(e,t){this.asyncManager=new n.a,this.timeout=t,this.worker=e,this.worker.onmessage=e=>{const{messageId:t,data:a}=e.data;this.asyncManager.resolve(t,a)}}sendAndReceive(e){const t=this.asyncManager.getPromiseWithId(t=>{this.worker.postMessage({messageId:t,data:e})});return void 0===this.timeout?t:s()(t,this.timeout)}terminate(){this.worker.terminate()}};t.a=e=>{const t=Object(r.useMemo)(()=>new c(new e,12e4),[]);return Object(r.useEffect)(()=>()=>{t.terminate()},[]),Object(r.useCallback)(t.sendAndReceive.bind(t),[t])}},405:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),o=a(387),s=a(12),c=a(384),l=a(396),u=a(397),i=a(398),m=a(382),d=a(381),p=a(393),b=a(392),g=a(394),f=a(389),k=a(390),h=a(399),w=a(395),O=a(391),j=a(406),y=a.n(j);const E=["rgba(255, 0, 0, 0.25)","rgba(0, 128, 255, 0.25)"];function T(e){return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:e[0]}}t.default=Object(r.memo)(({season:e,pots:t})=>{const[a,j]=Object(m.a)("draw-"),v=Object(r.useMemo)(()=>t.map(e=>o(e)),[t,a]),x=Object(r.useMemo)(()=>t[0].map(()=>[]),[t,a]),P=Object(r.useMemo)(()=>T(v),[v]),[{currentPotNum:G,selectedTeam:M,pickedGroup:N,hungPot:$},C]=Object(r.useState)(P);Object(r.useEffect)(()=>{C(P)},[v,a]);const[,I]=Object(s.a)(),[A]=Object(c.a)(),R=Object(i.a)(y.a),[S,U]=Object(l.a)(),[L,_]=Object(u.a)(3e3),J=Object(r.useCallback)(async t=>(await R({season:e,pots:v,groups:x,selectedTeam:t})).pickedGroup,[v,x,e,R]),W=Object(r.useCallback)(e=>{if(M)return;const t=v[G];t[e]&&C({currentPotNum:G,hungPot:t.slice(),selectedTeam:t.splice(e,1)[0],pickedGroup:null})},[v,G]);Object(r.useEffect)(()=>{M&&(async()=>{if(!M)throw new Error("no selected team");let e;_.set(M);try{e=await J(M)}catch(e){return console.error(e),void I({error:"Could not determine the group"})}x[e].push(M);const t=v[G].length>0?G:G+1;U.add(M),_.reset(),C({selectedTeam:null,pickedGroup:e,hungPot:v[t],currentPotNum:t})})()},[M]);const V=Object(r.useCallback)(()=>{j(),C(T(t))},[t]),q=G>=v.length;return n.a.createElement(O.a,null,n.a.createElement(f.a,null,n.a.createElement(b.a,{selectedTeams:M&&[M],initialPots:t,pots:v,currentPotNum:G}),n.a.createElement(g.a,{maxTeams:v.length,currentPotNum:G,groups:x,possibleGroups:null,airborneTeams:S,groupColors:E})),n.a.createElement(k.a,null,n.a.createElement(h.a,{forceNoSelect:!!M,display:!q,displayTeams:A,selectedTeam:M,pot:$,onPick:W}),n.a.createElement(w.a,{long:!0,calculating:L,completed:q,selectedTeam:M,pickedGroup:N,possibleGroups:null,numGroups:x.length,reset:V})),S.map(e=>{const t=x.findIndex(t=>t.includes(e)),a=Object(d.a)(t),r=x[t].indexOf(e);return n.a.createElement(p.a,{key:e.id,from:`[data-cellid='${e.id}']`,to:`[data-cellid='${a}${r}']`,duration:350,data:e,onAnimationEnd:U.remove})}))})},406:function(e,t,a){e.exports=function(){return new Worker(a.p+"ad3dcbc4b3d3f0f2a10a.worker.js")}}}]);