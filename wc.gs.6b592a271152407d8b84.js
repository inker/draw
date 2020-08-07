(window.webpackJsonp=window.webpackJsonp||[]).push([["wc.gs",4],{393:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(4),s=a(380),c=a(399),l=a(110),u=a(382),i=a(400),m=a(387),d=a(384);const p=o.c`
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
`,f=o.a`
  background-color: rgba(255, 255, 255, 0.9);
  animation: ${p} 1s ease;
  box-shadow: 0 0 5px #6af;
`,g=o.a`
  animation: ${b} 5s normal forwards;
`;var h=Object(o.b)(d.a)`
  ${e=>e.possible&&f}
  ${e=>e.picked&&g}
`,k=a(385),w=e=>{var t;return null!==(t=e.country)&&void 0!==t?t:e.name in k?e.name:void 0};var O=Object(n.memo)(({maxTeams:e,groupLetter:t,teams:a,potNum:n,possible:o,airborneTeams:s,background:d,color:p})=>{const b=c(a,s);return r.a.createElement(u.a,null,r.a.createElement(i.a,{background:d,color:p},"Group"," ",t),r.a.createElement(m.a,null,b.map(e=>{var t;return r.a.createElement(h,{country:w(e),picked:!0},null!==(t=e.shortName)&&void 0!==t?t:e.name)}),l(b.length,e).map(e=>r.a.createElement(h,{key:e,possible:e===n&&o,"data-cellid":`${t}${e}`}))))});const y=o.b.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`;t.a=Object(n.memo)(({maxTeams:e,currentPotNum:t,groups:a,possibleGroups:n,airborneTeams:o,groupColors:c})=>r.a.createElement(y,null,null==a?void 0:a.map((l,u)=>{const i=Object(s.a)(u),m=c&&c[~~(u/a.length*c.length)];return r.a.createElement(O,{key:i,maxTeams:e,groupLetter:i,teams:l,potNum:t,possible:!!(null==n?void 0:n.includes(u)),airborneTeams:o,background:m})})))},396:function(e,t,a){"use strict";var n=a(0),r=a(111),o=a.n(r);const s={key:null,isTimedOut:!1},c="TIMEOUT_VALUE_SET",l="TIMEOUT_RESET";function u(e,t){switch(t.type){case c:return{key:t.payload,isTimedOut:!!t.payload&&t.payload===e.key};case l:return s;default:throw new Error("Unknown action: "+t)}}t.a=e=>{const[t,a]=Object(n.useReducer)(u,s),r=async t=>{a({type:c,payload:t}),await o()(e),a({type:c,payload:t})},i=()=>{a({type:l})},m=Object(n.useMemo)(()=>({set:r,reset:i}),[]);return[t.isTimedOut,m]}},397:function(e,t,a){"use strict";var n=a(0),r=a(114),o=a(112),s=a.n(o);var c=class{constructor(e,t){this.asyncManager=new r.a,this.timeout=t,this.worker=e,this.worker.onmessage=e=>{const{messageId:t,data:a}=e.data;this.asyncManager.resolve(t,a)}}sendAndReceive(e){const t=this.asyncManager.getPromiseWithId(t=>{this.worker.postMessage({messageId:t,data:e})});return void 0===this.timeout?t:s()(t,this.timeout)}terminate(){this.worker.terminate()}};t.a=e=>{const t=Object(n.useMemo)(()=>new c(new e,12e4),[]);return Object(n.useEffect)(()=>()=>{t.terminate()},[]),Object(n.useCallback)(t.sendAndReceive.bind(t),[t])}},407:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(386),s=a(12),c=a(383),l=a(395),u=a(396),i=a(397),m=a(381),d=a(380),p=a(392),b=a(391),f=a(393),g=a(388),h=a(389),k=a(398),w=a(394),O=a(390),y=a(408),j=a.n(y);const E=["rgba(0, 128, 0, 0.25)"];function T(e){return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:e[0]}}t.default=Object(n.memo)(({pots:e})=>{const[t,a]=Object(m.a)("draw-"),y=Object(n.useMemo)(()=>e.map(e=>o(e)),[e,t]),v=Object(n.useMemo)(()=>e[0].map(()=>[]),[e,t]),x=Object(n.useMemo)(()=>T(y),[y]),[{currentPotNum:P,selectedTeam:G,pickedGroup:M,hungPot:N},$]=Object(n.useState)(x),[,C]=Object(s.a)(),[I]=Object(c.a)(),A=Object(i.a)(j.a),[R,S]=Object(l.a)(),[U,L]=Object(u.a)(3e3),_=Object(n.useCallback)(async e=>(await A({pots:y,groups:v,selectedTeam:e})).pickedGroup,[y,v,A]),J=Object(n.useCallback)(async e=>{if(G)return;const t=y[P];t[e]&&$({currentPotNum:P,hungPot:t.slice(),selectedTeam:t.splice(e,1)[0],pickedGroup:null})},[y,P]);Object(n.useEffect)(()=>{G&&(async()=>{if(!G)throw new Error("no selected team");let e;L.set(G);try{e=await _(G)}catch(e){return console.error(e),void C({error:"Could not determine the group"})}v[e].push(G);const t=y[P].length>0?P:P+1;S.add(G),L.reset(),$({selectedTeam:null,pickedGroup:e,hungPot:y[t],currentPotNum:t})})()},[G]),Object(n.useEffect)(()=>{const e=y[P].findIndex(e=>e.host);J(e)},[t]);const W=Object(n.useCallback)(()=>{a(),$(T(e))},[e]),V=P>=y.length;return r.a.createElement(O.a,null,r.a.createElement(g.a,null,r.a.createElement(b.a,{selectedTeams:G&&[G],initialPots:e,pots:y,currentPotNum:P}),r.a.createElement(f.a,{maxTeams:y.length,currentPotNum:P,groups:v,possibleGroups:null,airborneTeams:R,groupColors:E})),r.a.createElement(h.a,null,r.a.createElement(k.a,{forceNoSelect:!!G,display:!V,displayTeams:I,selectedTeam:G,pot:N,onPick:J}),r.a.createElement(w.a,{long:!0,calculating:U,completed:V,selectedTeam:G,pickedGroup:M,possibleGroups:null,numGroups:v.length,reset:W})),R.map(e=>{const t=v.findIndex(t=>t.includes(e)),a=Object(d.a)(t),n=v[t].indexOf(e);return r.a.createElement(p.a,{key:e.id,from:`[data-cellid='${e.id}']`,to:`[data-cellid='${a}${n}']`,duration:350,data:e,onAnimationEnd:S.remove})}))})},408:function(e,t,a){e.exports=function(){return new Worker(a.p+"f8ae7cf296bbbe4ad6f0.worker.js")}}}]);