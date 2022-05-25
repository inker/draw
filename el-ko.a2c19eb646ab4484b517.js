"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[6349],{17471:(e,s,t)=>{t.r(s),t.d(s,{default:()=>y});var n=t(85893),o=t(67294),r=t(96026),c=t(83608),l=t(69983),a=t(61790),i=t(57111),u=t(43432),m=t(58231),d=t(12211),p=t(83266),h=t(85973),f=t(62367),Z=t(17453),x=t(36756),j=t(90604),g=t(55020),b=t(89432),k=t(3447);const w=()=>new Worker(new URL(t.p+t.u(2061),t.b));function P(e,s){const t=s<2021?16:8;return{currentMatchupNum:0,currentPotNum:1,possiblePairings:null,pots:e.map((e=>l(e))),matchups:r(t).map((()=>[]))}}const y=(0,o.memo)((function({season:e,pots:s}){const[t,r]=(0,i.Z)(),[l,y]=(0,u.Z)(),[{currentMatchupNum:N,currentPotNum:v,possiblePairings:C,pots:E,matchups:T},M]=(0,o.useState)((()=>P(s,e)));(0,o.useEffect)((()=>{M(P(s,e))}),[s,e,t]);const R=(0,d.Z)("(min-height: 750px)"),[,S]=(0,a.Z)(),[$]=(0,m.Z)(),F=(0,p.Z)(w),G=(0,o.useRef)(null),A=(0,o.useCallback)((async(s,t)=>{try{return(await F({season:e,pots:s,matchups:t})).possiblePairings}catch(e){throw S({error:"Could not determine possible pairings"}),e}}),[e,F]),D=(0,o.useCallback)((async e=>{const s=E[v],t=C?C[e]:e,n=s[t],o=E.slice();o[v]=o[v].filter(((e,s)=>s!==t));const r=T.slice();r[N]=[...r[N],n];const c=1===v?await A(o,r):null;M({currentPotNum:1-v,currentMatchupNum:N-v+1,possiblePairings:c,pots:o,matchups:r})}),[E,T,v,N,C]),W=()=>{if(l)return;(1===(null==C?void 0:C.length)||1===v&&1===E[1].length)&&D(0)};(0,o.useEffect)((()=>{setTimeout(W,250)}),[v]);const L=(0,o.useMemo)((()=>C&&E[0].filter(((e,s)=>C.includes(s)))),[C]),U=N>=s[0].length;(0,o.useEffect)((()=>{if(l){const e=(null!=L?L:E[1]).length;if(e>0){const s=c(e-1);D(s)}}}),[l,v]),(0,o.useEffect)((()=>{U&&l&&y(!1)}),[U,l]);const q=C?C.map((e=>E[0][e])):[];return(0,n.jsxs)(h.Z,{children:[(0,n.jsxs)(x.Z,{children:[(0,n.jsx)(f.Z,{selectedTeams:q,initialPots:s,pots:E,currentPotNum:v,split:!R&&e<2021}),(0,n.jsx)(Z.Z,{ref:G,matchups:T})]}),(0,n.jsxs)(j.Z,{children:[!l&&(0,n.jsxs)(n.Fragment,{children:[!U&&(0,n.jsx)(b.Z,{children:"Runners-up"}),(0,n.jsx)(g.Z,{forceNoSelect:0===v,display:!U,displayTeams:$,selectedTeam:null,pot:E[1],onPick:D}),!U&&(0,n.jsx)(b.Z,{children:"Group Winners"}),L&&(0,n.jsx)(g.Z,{forceNoSelect:1===v,display:!U,displayTeams:$,selectedTeam:null,pot:L,onPick:D})]}),U&&(0,n.jsx)(k.Z,{long:!1,completed:U,selectedTeam:null,pickedGroup:null,possibleGroups:null,numGroups:0,groupsElement:G,reset:r})]})]})}))},17453:(e,s,t)=>{t.d(s,{Z:()=>N});var n=t(85893),o=t(67294),r=t(58804),c=t(42486),l=t(23132),a=t(69585),i=t(93753),u=t(84048),m=t(41771),d=t(58020),p=t(39548),h=t(10606),f=t(10694);const Z=r.F4`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,x=r.F4`
  from {
    background-color: rgba(192, 224, 255, 0.5);
  }
  to {}
`,j=r.iv`
  animation: ${e=>e.theme.isDarkMode?x:Z} 3s ease-out normal forwards;
`,g=(0,r.ZP)(a.Z)`
  width: 150px;
  ${e=>e.picked&&j}
  ${e=>e.styles}
`;const b=(0,o.memo)((function({team:e}){var s;const t=(0,u.Z)(e),[c,l]=(0,o.useState)(e),[a,i]=(0,o.useState)(!1),Z=(0,o.useContext)(r.Ni),x=(0,o.useRef)(null),j=(0,o.useCallback)((()=>i(!1)),[]),b=(0,o.useCallback)((()=>{l(e),i(!0)}),[e]);return(0,m.Z)((()=>{j()}),[Z]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(g,{picked:a&&!!c,onAnimationEnd:j,children:c?(0,n.jsx)(p.Z,{country:(0,d.Z)(c),children:null!==(s=c.shortName)&&void 0!==s?s:c.name}):(0,n.jsx)(h.Z,{ref:x})}),e&&e!==t&&(0,n.jsx)(f.Z,{from:`[data-cellid='${e.id}']`,to:x,duration:350,team:e,onAnimationEnd:b})]})})),k=(0,r.ZP)(i.Z)`
  justify-content: center;
  width: 23px;
  color: ${e=>e.theme.isDarkMode?"#ccc":"#333"};

  &::before {
    content: 'v';
  }
`;const w=(0,o.memo)((function({teams:e}){const[s,t]=null!=e?e:[];return(0,n.jsxs)(l.Z,{children:[(0,n.jsx)(b,{team:s}),(0,n.jsx)(a.Z,{children:(0,n.jsx)(k,{})}),(0,n.jsx)(b,{team:t})]})})),P=(0,r.ZP)(c.Z)`
  width: auto;
  align-self: center;
  max-width: initial;
`,y=(0,o.forwardRef)((({matchups:e},s)=>(0,n.jsx)(P,{ref:s,children:(0,n.jsx)("tbody",{children:null==e?void 0:e.map(((e,s)=>(0,n.jsx)(w,{teams:e},s)))})}))),N=(0,o.memo)(y)},89432:(e,s,t)=>{t.d(s,{Z:()=>n});const n=t(58804).ZP.div`
  margin-top: 10px;
  margin-bottom: 5px;
  user-select: none;
`}}]);