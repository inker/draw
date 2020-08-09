(window.webpackJsonp=window.webpackJsonp||[]).push([["wc-gs","wc-gs-worker"],{394:function(e,t,a){"use strict";var n=a(0),o=a.n(n),r=a(4),s=a(381),c=a(400),l=a(111),u=a(383),i=a(401),m=a(388),d=a(385);const p=r.c`
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
`;var k=Object(r.b)(d.a)`
  ${e=>e.possible&&f}
  ${e=>e.picked&&g}
`,h=a(386),w=e=>{var t;return null!==(t=e.country)&&void 0!==t?t:e.name in h?e.name:void 0};var O=Object(n.memo)(({maxTeams:e,groupLetter:t,teams:a,potNum:n,possible:r,airborneTeams:s,background:d,color:p})=>{const b=c(a,s);return o.a.createElement(u.a,null,o.a.createElement(i.a,{background:d,color:p},"Group"," ",t),o.a.createElement(m.a,null,b.map(e=>{var t;return o.a.createElement(k,{country:w(e),picked:!0},null!==(t=e.shortName)&&void 0!==t?t:e.name)}),l(b.length,e).map(e=>o.a.createElement(k,{key:e,possible:e===n&&r,"data-cellid":`${t}${e}`}))))});const j=r.b.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`;t.a=Object(n.memo)(({maxTeams:e,currentPotNum:t,groups:a,possibleGroups:n,airborneTeams:r,groupColors:c})=>o.a.createElement(j,null,null==a?void 0:a.map((l,u)=>{const i=Object(s.a)(u),m=c&&c[~~(u/a.length*c.length)];return o.a.createElement(O,{key:i,maxTeams:e,groupLetter:i,teams:l,potNum:t,possible:!!(null==n?void 0:n.includes(u)),airborneTeams:r,background:m})})))},397:function(e,t,a){"use strict";var n=a(0),o=a(112),r=a.n(o);const s={key:null,isTimedOut:!1},c="TIMEOUT_VALUE_SET",l="TIMEOUT_RESET";function u(e,t){switch(t.type){case c:return{key:t.payload,isTimedOut:!!t.payload&&t.payload===e.key};case l:return s;default:throw new Error("Unknown action: "+t)}}t.a=e=>{const[t,a]=Object(n.useReducer)(u,s),o=async t=>{a({type:c,payload:t}),await r()(e),a({type:c,payload:t})},i=()=>{a({type:l})},m=Object(n.useMemo)(()=>({set:o,reset:i}),[]);return[t.isTimedOut,m]}},398:function(e,t,a){"use strict";var n=a(0),o=a(115),r=a(113),s=a.n(r);var c=class{constructor(e,t){this.asyncManager=new o.a,this.timeout=t,this.worker=e,this.worker.onmessage=e=>{const{messageId:t,data:a}=e.data;this.asyncManager.resolve(t,a)}}sendAndReceive(e){const t=this.asyncManager.getPromiseWithId(t=>{this.worker.postMessage({messageId:t,data:e})});return void 0===this.timeout?t:s()(t,this.timeout)}terminate(){this.worker.terminate()}};t.a=e=>{const t=Object(n.useMemo)(()=>new c(new e,12e4),[]);return Object(n.useEffect)(()=>()=>{t.terminate()},[]),Object(n.useCallback)(t.sendAndReceive.bind(t),[t])}},408:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(387),s=a(12),c=a(382),l=a(384),u=a(396),i=a(397),m=a(398),d=a(381),p=a(393),b=a(392),f=a(394),g=a(389),k=a(390),h=a(399),w=a(395),O=a(391),j=a(409),y=a.n(j);const E=["rgba(0, 128, 0, 0.25)"];function T(e){return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:e[0]}}t.default=Object(n.memo)(({pots:e})=>{const[t,a]=Object(c.a)(),j=Object(n.useMemo)(()=>e.map(e=>r(e)),[e,t]),v=Object(n.useMemo)(()=>e[0].map(()=>[]),[e,t]),x=Object(n.useMemo)(()=>T(j),[j]),[{currentPotNum:P,selectedTeam:G,pickedGroup:M,hungPot:N},$]=Object(n.useState)(x);Object(n.useEffect)(()=>{$(x)},[j,t]);const[,C]=Object(s.a)(),[I]=Object(l.a)(),A=Object(m.a)(y.a),[R,S]=Object(u.a)(),[U,L]=Object(i.a)(3e3),_=Object(n.useCallback)(async e=>(await A({pots:j,groups:v,selectedTeam:e})).pickedGroup,[j,v,A]),J=Object(n.useCallback)(async e=>{if(G)return;const t=j[P];t[e]&&$({currentPotNum:P,hungPot:t.slice(),selectedTeam:t.splice(e,1)[0],pickedGroup:null})},[j,P]);Object(n.useEffect)(()=>{G&&(async()=>{if(!G)throw new Error("no selected team");let e;L.set(G);try{e=await _(G)}catch(e){return console.error(e),void C({error:"Could not determine the group"})}v[e].push(G);const t=j[P].length>0?P:P+1;S.add(G),L.reset(),$({selectedTeam:null,pickedGroup:e,hungPot:j[t],currentPotNum:t})})()},[G]),Object(n.useEffect)(()=>{const e=j[P].findIndex(e=>e.host);J(e)},[t]);const W=Object(n.useCallback)(()=>{a(),$(T(e))},[e]),V=P>=j.length;return o.a.createElement(O.a,null,o.a.createElement(g.a,null,o.a.createElement(b.a,{selectedTeams:G&&[G],initialPots:e,pots:j,currentPotNum:P}),o.a.createElement(f.a,{maxTeams:j.length,currentPotNum:P,groups:v,possibleGroups:null,airborneTeams:R,groupColors:E})),o.a.createElement(k.a,null,o.a.createElement(h.a,{forceNoSelect:!!G,display:!V,displayTeams:I,selectedTeam:G,pot:N,onPick:J}),o.a.createElement(w.a,{long:!0,calculating:U,completed:V,selectedTeam:G,pickedGroup:M,possibleGroups:null,numGroups:v.length,reset:W})),R.map(e=>{const t=v.findIndex(t=>t.includes(e)),a=Object(d.a)(t),n=v[t].indexOf(e);return o.a.createElement(p.a,{key:e.id,from:`[data-cellid='${e.id}']`,to:`[data-cellid='${a}${n}']`,duration:350,data:e,onAnimationEnd:S.remove})}))})},409:function(e,t,a){e.exports=function(){return new Worker(a.p+"f8ae7cf296bbbe4ad6f0.worker.js")}}}]);