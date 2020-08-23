(window.webpackJsonp=window.webpackJsonp||[]).push([[6,10],{396:function(e,t,a){"use strict";var n=a(0),o=a.n(n),r=a(4),s=a(382),c=a(401),l=a(111),u=a(384),i=a(402),m=a(389),d=a(386);const p=r.c`
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
`,f=r.a`
  background-color: rgba(255, 255, 255, 0.9);
  animation: ${p} 1s ease;
  box-shadow: 0 0 5px #6af;
`,g=r.a`
  animation: ${b} 5s normal forwards;
`;var h=Object(r.b)(d.a)`
  ${e=>e.possible&&f}
  ${e=>e.picked&&g}
`,k=a(387),w=e=>{var t;return null!==(t=e.country)&&void 0!==t?t:e.name in k?e.name:void 0};var O=Object(n.memo)(({maxTeams:e,groupLetter:t,teams:a,potNum:n,possible:r,airborneTeams:s,background:d,color:p})=>{const b=c(a,s);return o.a.createElement(u.a,null,o.a.createElement(i.a,{background:d,color:p},"Group"," ",t),o.a.createElement(m.a,null,b.map(e=>{var t;return o.a.createElement(h,{country:w(e),picked:!0},null!==(t=e.shortName)&&void 0!==t?t:e.name)}),l(b.length,e).map(e=>o.a.createElement(h,{key:e,possible:e===n&&r,"data-cellid":`${t}${e}`}))))});const E=r.b.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`;t.a=Object(n.memo)(({maxTeams:e,currentPotNum:t,groups:a,possibleGroups:n,airborneTeams:r,groupColors:c})=>o.a.createElement(E,null,null==a?void 0:a.map((l,u)=>{const i=Object(s.a)(u),m=c&&c[~~(u/a.length*c.length)];return o.a.createElement(O,{key:i,maxTeams:e,groupLetter:i,teams:l,potNum:t,possible:!!(null==n?void 0:n.includes(u)),airborneTeams:r,background:m})})))},398:function(e,t,a){"use strict";var n=a(0),o=a(112),r=a.n(o);const s={key:null,isTimedOut:!1},c="TIMEOUT_VALUE_SET",l="TIMEOUT_RESET";function u(e,t){switch(t.type){case c:return{key:t.payload,isTimedOut:!!t.payload&&t.payload===e.key};case l:return s;default:throw new Error("Unknown action: "+t)}}t.a=e=>{const[t,a]=Object(n.useReducer)(u,s),o=async t=>{a({type:c,payload:t}),await r()(e),a({type:c,payload:t})},i=()=>{a({type:l})},m=Object(n.useMemo)(()=>({set:o,reset:i}),[]);return[t.isTimedOut,m]}},399:function(e,t,a){"use strict";var n=a(0),o=a(115),r=a(113),s=a.n(r);var c=class{constructor(e,t){this.asyncManager=new o.a,this.timeout=t,this.worker=e,this.worker.onmessage=e=>{const{messageId:t,data:a}=e.data;this.asyncManager.resolve(t,a)}}sendAndReceive(e){const t=this.asyncManager.getPromiseWithId(t=>{this.worker.postMessage({messageId:t,data:e})});return void 0===this.timeout?t:s()(t,this.timeout)}terminate(){this.worker.terminate()}};t.a=e=>{const t=Object(n.useMemo)(()=>new c(new e,12e4),[]);return Object(n.useEffect)(()=>()=>{t.terminate()},[]),Object(n.useCallback)(t.sendAndReceive.bind(t),[t])}},409:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(388),s=a(12),c=a(383),l=a(385),u=a(397),i=a(398),m=a(399),d=a(382),p=a(394),b=a(393),f=a(396),g=a(390),h=a(391),k=a(400),w=a(395),O=a(392),E=a(410),y=a.n(E);const j=["rgba(0, 128, 0, 0.25)"];function T(e){return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:e[0]}}t.default=Object(n.memo)(({season:e,pots:t})=>{const[a,E]=Object(c.a)(),v=Object(n.useMemo)(()=>t.map(e=>r(e)),[t,a]),x=Object(n.useMemo)(()=>t[0].map(()=>[]),[t,a]),[{currentPotNum:P,selectedTeam:G,pickedGroup:N,hungPot:M},$]=Object(n.useState)(()=>T(v));Object(n.useEffect)(()=>{$(T(v))},[v]);const[,I]=Object(s.a)(),[C]=Object(l.a)(),A=Object(m.a)(y.a),[R,S]=Object(u.a)(),[U,L]=Object(i.a)(3e3),_=Object(n.useCallback)(async t=>(await A({season:e,pots:v,groups:x,selectedTeam:t})).pickedGroup,[v,x,e,A]),J=Object(n.useCallback)(e=>{if(G)return;const t=v[P];t[e]&&$({currentPotNum:P,hungPot:t.slice(),selectedTeam:t.splice(e,1)[0],pickedGroup:null})},[v,P]);Object(n.useEffect)(()=>{G&&(async()=>{if(!G)throw new Error("no selected team");let e;L.set(G);try{e=await _(G)}catch(e){return console.error(e),void I({error:"Could not determine the group"})}x[e].push(G);const t=v[P].length>0?P:P+1;S.add(G),L.reset(),$({selectedTeam:null,pickedGroup:e,hungPot:v[t],currentPotNum:t})})()},[G]),Object(n.useEffect)(()=>{const e=v[P].findIndex(e=>e.host);J(e)},[a]);const W=P>=v.length;return o.a.createElement(O.a,null,o.a.createElement(g.a,null,o.a.createElement(b.a,{selectedTeams:G&&[G],initialPots:t,pots:v,currentPotNum:P}),o.a.createElement(f.a,{maxTeams:v.length,currentPotNum:P,groups:x,possibleGroups:null,airborneTeams:R,groupColors:j})),o.a.createElement(h.a,null,o.a.createElement(k.a,{forceNoSelect:!!G,display:!W,displayTeams:C,selectedTeam:G,pot:M,onPick:J}),o.a.createElement(w.a,{long:!0,calculating:U,completed:W,selectedTeam:G,pickedGroup:N,possibleGroups:null,numGroups:x.length,reset:E})),R.map(e=>{const t=x.findIndex(t=>t.includes(e)),a=Object(d.a)(t),n=x[t].indexOf(e);return o.a.createElement(p.a,{key:e.id,from:`[data-cellid='${e.id}']`,to:`[data-cellid='${a}${n}']`,duration:350,data:e,onAnimationEnd:S.remove})}))})},410:function(e,t,a){e.exports=function(){return new Worker(a.p+"3c9adf1e96965f6d0d1b.worker.js")}}}]);