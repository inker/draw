(window.webpackJsonp=window.webpackJsonp||[]).push([["wc-gs","wc-gs-worker"],{396:function(e,t,a){"use strict";var n=a(0),o=a.n(n),r=a(4),s=a(382),c=a(401),l=a(111),u=a(384),i=a(402),m=a(389),d=a(386);const p=r.c`
  from {
    background-color: white;
    box-shadow: 0 0 20px #08f;
  }
  to {}
`,b=r.c`
  from {
    background-color: #ff8;
  }
  to {}
`,g=r.a`
  background-color: rgba(255, 255, 255, 0.9);
  animation: ${p} 1s ease;
  box-shadow: 0 0 5px #6af;
`,f=r.a`
  animation: ${b} 5s normal forwards;
`;var k=Object(r.b)(d.a)`
  ${e=>e.possible&&g}
  ${e=>e.picked&&f}
`,h=a(387),w=e=>{var t;return null!==(t=e.country)&&void 0!==t?t:e.name in h?e.name:void 0};var O=Object(n.memo)(({maxTeams:e,groupLetter:t,teams:a,potNum:n,possible:r,airborneTeams:s,background:d,color:p})=>{const b=c(a,s);return o.a.createElement(u.a,null,o.a.createElement(i.a,{background:d,color:p},"Group"," ",t),o.a.createElement(m.a,null,b.map(e=>{var t;return o.a.createElement(k,{country:w(e),picked:!0},null!==(t=e.shortName)&&void 0!==t?t:e.name)}),l(b.length,e).map(e=>o.a.createElement(k,{key:e,possible:e===n&&r,"data-cellid":`${t}${e}`}))))});const j=r.b.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`;t.a=Object(n.memo)(({maxTeams:e,currentPotNum:t,groups:a,possibleGroups:n,airborneTeams:r,groupColors:c})=>o.a.createElement(j,null,null==a?void 0:a.map((l,u)=>{const i=Object(s.a)(u),m=c&&c[~~(u/a.length*c.length)];return o.a.createElement(O,{key:i,maxTeams:e,groupLetter:i,teams:l,potNum:t,possible:!!(null==n?void 0:n.includes(u)),airborneTeams:r,background:m})})))},398:function(e,t,a){"use strict";var n=a(0),o=a(112),r=a.n(o);const s={key:null,isTimedOut:!1},c="TIMEOUT_VALUE_SET",l="TIMEOUT_RESET";function u(e,t){switch(t.type){case c:return{key:t.payload,isTimedOut:!!t.payload&&t.payload===e.key};case l:return s;default:throw new Error("Unknown action: "+t)}}t.a=e=>{const[t,a]=Object(n.useReducer)(u,s),o=async t=>{a({type:c,payload:t}),await r()(e),a({type:c,payload:t})},i=()=>{a({type:l})},m=Object(n.useMemo)(()=>({set:o,reset:i}),[]);return[t.isTimedOut,m]}},399:function(e,t,a){"use strict";var n=a(0),o=a(115),r=a(113),s=a.n(r);var c=class{constructor(e,t){this.asyncManager=new o.a,this.timeout=t,this.worker=e,this.worker.onmessage=e=>{const{messageId:t,data:a}=e.data;this.asyncManager.resolve(t,a)}}sendAndReceive(e){const t=this.asyncManager.getPromiseWithId(t=>{this.worker.postMessage({messageId:t,data:e})});return void 0===this.timeout?t:s()(t,this.timeout)}terminate(){this.worker.terminate()}};t.a=e=>{const t=Object(n.useMemo)(()=>new c(new e,12e4),[]);return Object(n.useEffect)(()=>()=>{t.terminate()},[]),Object(n.useCallback)(t.sendAndReceive.bind(t),[t])}},409:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(388),s=a(12),c=a(383),l=a(385),u=a(397),i=a(398),m=a(399),d=a(382),p=a(394),b=a(393),g=a(396),f=a(390),k=a(391),h=a(400),w=a(395),O=a(392),j=a(410),E=a.n(j);const y=["rgba(0, 128, 0, 0.25)"];function T(e){return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:e[0]}}t.default=Object(n.memo)(({season:e,pots:t})=>{const[a,j]=Object(c.a)(),v=Object(n.useMemo)(()=>t.map(e=>r(e)),[t,a]),x=Object(n.useMemo)(()=>t[0].map(()=>[]),[t,a]),P=Object(n.useMemo)(()=>T(v),[v]),[{currentPotNum:G,selectedTeam:M,pickedGroup:N,hungPot:$},C]=Object(n.useState)(P);Object(n.useEffect)(()=>{C(P)},[P]);const[,I]=Object(s.a)(),[A]=Object(l.a)(),R=Object(m.a)(E.a),[S,U]=Object(u.a)(),[L,_]=Object(i.a)(3e3),J=Object(n.useCallback)(async t=>(await R({season:e,pots:v,groups:x,selectedTeam:t})).pickedGroup,[v,x,e,R]),W=Object(n.useCallback)(e=>{if(M)return;const t=v[G];t[e]&&C({currentPotNum:G,hungPot:t.slice(),selectedTeam:t.splice(e,1)[0],pickedGroup:null})},[v,G]);Object(n.useEffect)(()=>{M&&(async()=>{if(!M)throw new Error("no selected team");let e;_.set(M);try{e=await J(M)}catch(e){return console.error(e),void I({error:"Could not determine the group"})}x[e].push(M);const t=v[G].length>0?G:G+1;U.add(M),_.reset(),C({selectedTeam:null,pickedGroup:e,hungPot:v[t],currentPotNum:t})})()},[M]),Object(n.useEffect)(()=>{const e=v[G].findIndex(e=>e.host);W(e)},[a]);const V=Object(n.useCallback)(()=>{j(),C(T(t))},[t]),q=G>=v.length;return o.a.createElement(O.a,null,o.a.createElement(f.a,null,o.a.createElement(b.a,{selectedTeams:M&&[M],initialPots:t,pots:v,currentPotNum:G}),o.a.createElement(g.a,{maxTeams:v.length,currentPotNum:G,groups:x,possibleGroups:null,airborneTeams:S,groupColors:y})),o.a.createElement(k.a,null,o.a.createElement(h.a,{forceNoSelect:!!M,display:!q,displayTeams:A,selectedTeam:M,pot:$,onPick:W}),o.a.createElement(w.a,{long:!0,calculating:L,completed:q,selectedTeam:M,pickedGroup:N,possibleGroups:null,numGroups:x.length,reset:V})),S.map(e=>{const t=x.findIndex(t=>t.includes(e)),a=Object(d.a)(t),n=x[t].indexOf(e);return o.a.createElement(p.a,{key:e.id,from:`[data-cellid='${e.id}']`,to:`[data-cellid='${a}${n}']`,duration:350,data:e,onAnimationEnd:U.remove})}))})},410:function(e,t,a){e.exports=function(){return new Worker(a.p+"c8837a75e81d8ad7fd26.worker.js")}}}]);