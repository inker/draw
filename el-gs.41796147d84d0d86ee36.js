(window.webpackJsonp=window.webpackJsonp||[]).push([[4,8],{396:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(4),s=a(382),c=a(401),l=a(111),u=a(384),i=a(402),m=a(389),d=a(386);const p=o.c`
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
`;var h=Object(o.b)(d.a)`
  ${e=>e.possible&&g}
  ${e=>e.picked&&f}
`,k=a(387),w=e=>{var t;return null!==(t=e.country)&&void 0!==t?t:e.name in k?e.name:void 0};var O=Object(n.memo)(({maxTeams:e,groupLetter:t,teams:a,potNum:n,possible:o,airborneTeams:s,background:d,color:p})=>{const b=c(a,s);return r.a.createElement(u.a,null,r.a.createElement(i.a,{background:d,color:p},"Group"," ",t),r.a.createElement(m.a,null,b.map(e=>{var t;return r.a.createElement(h,{country:w(e),picked:!0},null!==(t=e.shortName)&&void 0!==t?t:e.name)}),l(b.length,e).map(e=>r.a.createElement(h,{key:e,possible:e===n&&o,"data-cellid":`${t}${e}`}))))});const y=o.b.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`;t.a=Object(n.memo)(({maxTeams:e,currentPotNum:t,groups:a,possibleGroups:n,airborneTeams:o,groupColors:c})=>r.a.createElement(y,null,null==a?void 0:a.map((l,u)=>{const i=Object(s.a)(u),m=c&&c[~~(u/a.length*c.length)];return r.a.createElement(O,{key:i,maxTeams:e,groupLetter:i,teams:l,potNum:t,possible:!!(null==n?void 0:n.includes(u)),airborneTeams:o,background:m})})))},398:function(e,t,a){"use strict";var n=a(0),r=a(112),o=a.n(r);const s={key:null,isTimedOut:!1},c="TIMEOUT_VALUE_SET",l="TIMEOUT_RESET";function u(e,t){switch(t.type){case c:return{key:t.payload,isTimedOut:!!t.payload&&t.payload===e.key};case l:return s;default:throw new Error("Unknown action: "+t)}}t.a=e=>{const[t,a]=Object(n.useReducer)(u,s),r=async t=>{a({type:c,payload:t}),await o()(e),a({type:c,payload:t})},i=()=>{a({type:l})},m=Object(n.useMemo)(()=>({set:r,reset:i}),[]);return[t.isTimedOut,m]}},399:function(e,t,a){"use strict";var n=a(0),r=a(115),o=a(113),s=a.n(o);var c=class{constructor(e,t){this.asyncManager=new r.a,this.timeout=t,this.worker=e,this.worker.onmessage=e=>{const{messageId:t,data:a}=e.data;this.asyncManager.resolve(t,a)}}sendAndReceive(e){const t=this.asyncManager.getPromiseWithId(t=>{this.worker.postMessage({messageId:t,data:e})});return void 0===this.timeout?t:s()(t,this.timeout)}terminate(){this.worker.terminate()}};t.a=e=>{const t=Object(n.useMemo)(()=>new c(new e,12e4),[]);return Object(n.useEffect)(()=>()=>{t.terminate()},[]),Object(n.useCallback)(t.sendAndReceive.bind(t),[t])}},406:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(388),s=a(12),c=a(383),l=a(385),u=a(397),i=a(398),m=a(399),d=a(382),p=a(394),b=a(393),g=a(396),f=a(390),h=a(391),k=a(400),w=a(395),O=a(392),y=a(407),E=a.n(y);const T=["rgba(255, 0, 0, 0.25)","rgba(0, 128, 255, 0.25)"];function j(e){return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:e[0]}}t.default=Object(n.memo)(({season:e,pots:t})=>{const[a,y]=Object(c.a)(),v=Object(n.useMemo)(()=>t.map(e=>o(e)),[t,a]),x=Object(n.useMemo)(()=>t[0].map(()=>[]),[t,a]),[{currentPotNum:P,selectedTeam:G,pickedGroup:N,hungPot:M},$]=Object(n.useState)(()=>j(v));Object(n.useEffect)(()=>{$(j(v))},[v]);const[,C]=Object(s.a)(),[I]=Object(l.a)(),A=Object(m.a)(E.a),[R,S]=Object(u.a)(),[U,L]=Object(i.a)(3e3),_=Object(n.useCallback)(async t=>(await A({season:e,pots:v,groups:x,selectedTeam:t})).pickedGroup,[v,x,e,A]),J=Object(n.useCallback)(e=>{if(G)return;const t=v[P];t[e]&&$({currentPotNum:P,hungPot:t.slice(),selectedTeam:t.splice(e,1)[0],pickedGroup:null})},[v,P]);Object(n.useEffect)(()=>{G&&(async()=>{if(!G)throw new Error("no selected team");let e;L.set(G);try{e=await _(G)}catch(e){return console.error(e),void C({error:"Could not determine the group"})}x[e].push(G);const t=v[P].length>0?P:P+1;S.add(G),L.reset(),$({selectedTeam:null,pickedGroup:e,hungPot:v[t],currentPotNum:t})})()},[G]);const W=P>=v.length;return r.a.createElement(O.a,null,r.a.createElement(f.a,null,r.a.createElement(b.a,{selectedTeams:G&&[G],initialPots:t,pots:v,currentPotNum:P}),r.a.createElement(g.a,{maxTeams:v.length,currentPotNum:P,groups:x,possibleGroups:null,airborneTeams:R,groupColors:T})),r.a.createElement(h.a,null,r.a.createElement(k.a,{forceNoSelect:!!G,display:!W,displayTeams:I,selectedTeam:G,pot:M,onPick:J}),r.a.createElement(w.a,{long:!0,calculating:U,completed:W,selectedTeam:G,pickedGroup:N,possibleGroups:null,numGroups:x.length,reset:y})),R.map(e=>{const t=x.findIndex(t=>t.includes(e)),a=Object(d.a)(t),n=x[t].indexOf(e);return r.a.createElement(p.a,{key:e.id,from:`[data-cellid='${e.id}']`,to:`[data-cellid='${a}${n}']`,duration:350,data:e,onAnimationEnd:S.remove})}))})},407:function(e,t,a){e.exports=function(){return new Worker(a.p+"f0d962be2a0e8e40c58c.worker.js")}}}]);