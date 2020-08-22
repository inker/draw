(window.webpackJsonp=window.webpackJsonp||[]).push([["cl-gs","cl-gs-worker"],{396:function(e,t,a){"use strict";var o=a(0),r=a.n(o),s=a(4),n=a(382),c=a(401),l=a(111),u=a(384),i=a(402),p=a(389),m=a(386);const d=s.c`
  from {
    background-color: white;
    box-shadow: 0 0 20px #08f;
  }
  to {}
`,b=s.c`
  from {
    background-color: #ff8;
  }
  to {}
`,f=s.a`
  background-color: rgba(255, 255, 255, 0.9);
  animation: ${d} 1s ease;
  box-shadow: 0 0 5px #6af;
`,g=s.a`
  animation: ${b} 5s normal forwards;
`;var k=Object(s.b)(m.a)`
  ${e=>e.possible&&f}
  ${e=>e.picked&&g}
`,h=a(387),w=e=>{var t;return null!==(t=e.country)&&void 0!==t?t:e.name in h?e.name:void 0};var y=Object(o.memo)(({maxTeams:e,groupLetter:t,teams:a,potNum:o,possible:s,airborneTeams:n,background:m,color:d})=>{const b=c(a,n);return r.a.createElement(u.a,null,r.a.createElement(i.a,{background:m,color:d},"Group"," ",t),r.a.createElement(p.a,null,b.map(e=>{var t;return r.a.createElement(k,{country:w(e),picked:!0},null!==(t=e.shortName)&&void 0!==t?t:e.name)}),l(b.length,e).map(e=>r.a.createElement(k,{key:e,possible:e===o&&s,"data-cellid":`${t}${e}`}))))});const O=s.b.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`;t.a=Object(o.memo)(({maxTeams:e,currentPotNum:t,groups:a,possibleGroups:o,airborneTeams:s,groupColors:c})=>r.a.createElement(O,null,null==a?void 0:a.map((l,u)=>{const i=Object(n.a)(u),p=c&&c[~~(u/a.length*c.length)];return r.a.createElement(y,{key:i,maxTeams:e,groupLetter:i,teams:l,potNum:t,possible:!!(null==o?void 0:o.includes(u)),airborneTeams:s,background:p})})))},398:function(e,t,a){"use strict";var o=a(0),r=a(112),s=a.n(r);const n={key:null,isTimedOut:!1},c="TIMEOUT_VALUE_SET",l="TIMEOUT_RESET";function u(e,t){switch(t.type){case c:return{key:t.payload,isTimedOut:!!t.payload&&t.payload===e.key};case l:return n;default:throw new Error("Unknown action: "+t)}}t.a=e=>{const[t,a]=Object(o.useReducer)(u,n),r=async t=>{a({type:c,payload:t}),await s()(e),a({type:c,payload:t})},i=()=>{a({type:l})},p=Object(o.useMemo)(()=>({set:r,reset:i}),[]);return[t.isTimedOut,p]}},399:function(e,t,a){"use strict";var o=a(0),r=a(115),s=a(113),n=a.n(s);var c=class{constructor(e,t){this.asyncManager=new r.a,this.timeout=t,this.worker=e,this.worker.onmessage=e=>{const{messageId:t,data:a}=e.data;this.asyncManager.resolve(t,a)}}sendAndReceive(e){const t=this.asyncManager.getPromiseWithId(t=>{this.worker.postMessage({messageId:t,data:e})});return void 0===this.timeout?t:n()(t,this.timeout)}terminate(){this.worker.terminate()}};t.a=e=>{const t=Object(o.useMemo)(()=>new c(new e,12e4),[]);return Object(o.useEffect)(()=>()=>{t.terminate()},[]),Object(o.useCallback)(t.sendAndReceive.bind(t),[t])}},404:function(e,t,a){e.exports=function(){return new Worker(a.p+"c4345b185c289257f647.worker.js")}},411:function(e,t,a){"use strict";a.r(t);var o=a(0),r=a.n(o),s=a(388),n=a(12),c=a(383),l=a(385),u=a(397),i=a(398),p=a(399),m=a(382),d=a(394),b=a(393),f=a(396),g=a(390),k=a(391),h=a(400),w=a(4),y=a(424);var O=Object(w.b)(y.a)`
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
`;var E=Object(o.memo)(({display:e,displayGroups:t,possibleGroups:a,onPick:s})=>{const n=Object(o.useCallback)(e=>{const t=e.target,a=+t.dataset.group;if(Number.isNaN(a))throw new TypeError("Incorrect group ball: "+t.dataset.group);s(a)},[s]);return r.a.createElement(j,null,e&&(null==a?void 0:a.map(e=>r.a.createElement(O,{key:e,"data-group":e,forceVisible:t,onClick:n},Object(m.a)(e)))))}),v=a(395),T=a(392),G=a(404),x=a.n(G);const P=["rgba(255, 0, 0, 0.25)","rgba(0, 128, 255, 0.25)"];function N(e){return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:e[0],possibleGroups:null,possibleGroupsShuffled:null}}t.default=Object(o.memo)(({season:e,pots:t})=>{const[a,w]=Object(c.a)(),y=Object(o.useMemo)(()=>t.map(e=>s(e)),[t,a]),O=Object(o.useMemo)(()=>t[0].map(()=>[]),[t,a]),[{currentPotNum:j,selectedTeam:G,pickedGroup:M,hungPot:$,possibleGroups:C,possibleGroupsShuffled:I},S]=Object(o.useState)(()=>N(y));Object(o.useEffect)(()=>{S(N(y))},[y]);const[,A]=Object(n.a)(),[R]=Object(l.a)(),U=Object(p.a)(x.a),[L,_]=Object(u.a)(),[J,V]=Object(i.a)(3e3),W=Object(o.useCallback)(async t=>(await U({season:e,pots:y,groups:O,selectedTeam:t})).possibleGroups,[y,O,e,U]),H=Object(o.useCallback)(async e=>{if(G)return;const t=y[j];if(!t[e])return;const a=t.splice(e,1)[0];V.set(a);const o=await W(a);V.reset(),S({currentPotNum:j,hungPot:t.slice(),selectedTeam:a,possibleGroups:o,possibleGroupsShuffled:s(o),pickedGroup:null})},[y,O,j,W]),q=Object(o.useCallback)(e=>{if(!G)return void A({error:"No selected team..."});O[e].push(G);const t=y[j].length>0?j:j+1;_.add(G),S({selectedTeam:null,pickedGroup:e,hungPot:y[t],possibleGroups:null,possibleGroupsShuffled:null,currentPotNum:t})},[y,O,G,j]),z=j>=y.length;return r.a.createElement(T.a,null,r.a.createElement(g.a,null,r.a.createElement(b.a,{selectedTeams:G&&[G],initialPots:t,pots:y,currentPotNum:j}),r.a.createElement(f.a,{maxTeams:y.length,currentPotNum:j,groups:O,possibleGroups:C,airborneTeams:L,groupColors:P})),r.a.createElement(k.a,null,r.a.createElement(h.a,{display:!z,displayTeams:R,selectedTeam:G,pot:$,onPick:H}),r.a.createElement(v.a,{long:!1,calculating:J,completed:z,selectedTeam:G,pickedGroup:M,possibleGroups:C,numGroups:O.length,reset:w}),r.a.createElement(E,{display:!z,displayGroups:R,possibleGroups:I,onPick:q})),L.map(e=>{const t=O.findIndex(t=>t.includes(e)),a=Object(m.a)(t),o=O[t].indexOf(e);return r.a.createElement(d.a,{key:e.id,from:`[data-cellid='${e.id}']`,to:`[data-cellid='${a}${o}']`,duration:350,data:e,onAnimationEnd:_.remove})}))})}}]);