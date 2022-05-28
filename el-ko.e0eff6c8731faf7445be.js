"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[6349],{17471:(e,s,t)=>{t.r(s),t.d(s,{default:()=>y});var n=t(85893),o=t(67294),r=t(96026),c=t(83608),a=t(69983),i=t(61790),l=t(57111),u=t(43432),m=t(58231),p=t(12211),d=t(83266),h=t(85973),f=t(62367),Z=t(17453),x=t(36756),j=t(90604),g=t(55020),b=t(89432),k=t(3447);const w=()=>new Worker(new URL(t.p+t.u(2061),t.b));function P(e,s){const t=s<2021?16:8;return{currentMatchupNum:0,currentPotNum:1,possiblePairings:null,pots:e.map((e=>a(e))),matchups:r(t).map((()=>[]))}}const y=(0,o.memo)((function({season:e,pots:s}){const[t,r]=(0,l.Z)(),[a,y]=(0,u.Z)(),[{currentMatchupNum:N,currentPotNum:C,possiblePairings:E,pots:T,matchups:M},v]=(0,o.useState)((()=>P(s,e)));(0,o.useEffect)((()=>{v(P(s,e))}),[s,e,t]);const R=(0,p.Z)("(min-height: 750px)"),[,S]=(0,i.Z)(),[$]=(0,m.Z)(),F=(0,d.Z)(w),G=(0,o.useRef)(null),A=(0,o.useCallback)((async(s,t)=>{try{return(await F({season:e,pots:s,matchups:t})).possiblePairings}catch(e){throw S({error:"Could not determine possible pairings"}),e}}),[e,F]),D=(0,o.useCallback)((async e=>{const s=T[C],t=E?E[e]:e,n=s[t],o=T.slice();o[C]=o[C].filter(((e,s)=>s!==t));const r=M.slice();r[N]=[...r[N],n];const c=1===C?await A(o,r):null;v({currentPotNum:1-C,currentMatchupNum:N-C+1,possiblePairings:c,pots:o,matchups:r})}),[T,M,C,N,E]),W=()=>{if(a)return;(1===E?.length||1===C&&1===T[1].length)&&D(0)};(0,o.useEffect)((()=>{setTimeout(W,250)}),[C]);const L=(0,o.useMemo)((()=>E&&T[0].filter(((e,s)=>E.includes(s)))),[E]),U=N>=s[0].length;(0,o.useEffect)((()=>{if(a){const e=(L??T[1]).length;if(e>0){const s=c(e-1);D(s)}}}),[a,C]),(0,o.useEffect)((()=>{U&&a&&y(!1)}),[U,a]);const q=E?E.map((e=>T[0][e])):[];return(0,n.jsxs)(h.Z,{children:[(0,n.jsxs)(x.Z,{children:[(0,n.jsx)(f.Z,{selectedTeams:q,initialPots:s,pots:T,currentPotNum:C,split:!R&&e<2021}),(0,n.jsx)(Z.Z,{ref:G,matchups:M})]}),(0,n.jsxs)(j.Z,{children:[!a&&(0,n.jsxs)(n.Fragment,{children:[!U&&(0,n.jsx)(b.Z,{children:"Runners-up"}),(0,n.jsx)(g.Z,{forceNoSelect:0===C,display:!U,displayTeams:$,selectedTeam:null,pot:T[1],onPick:D}),!U&&(0,n.jsx)(b.Z,{children:"Group Winners"}),L&&(0,n.jsx)(g.Z,{forceNoSelect:1===C,display:!U,displayTeams:$,selectedTeam:null,pot:L,onPick:D})]}),U&&(0,n.jsx)(k.Z,{long:!1,completed:U,selectedTeam:null,pickedGroup:null,possibleGroups:null,numGroups:0,groupsElement:G,reset:r})]})]})}))},17453:(e,s,t)=>{t.d(s,{Z:()=>N});var n=t(85893),o=t(67294),r=t(58804),c=t(42486),a=t(23132),i=t(69585),l=t(93753),u=t(84048),m=t(41771),p=t(58020),d=t(39548),h=t(10606),f=t(10694);const Z=r.F4`
  from {
    background-color: rgb(255 255 0 / 0.5);
  }
`,x=r.F4`
  from {
    background-color: rgb(192 224 255 / 0.5);
  }
`,j=r.iv`
  animation: ${e=>e.theme.isDarkMode?x:Z} 3s ease-out normal forwards;
`,g=(0,r.ZP)(i.Z)`
  width: 150px;
  ${e=>e.picked&&j}
  ${e=>e.styles}
`;const b=(0,o.memo)((function({team:e}){const s=(0,u.Z)(e),[t,c]=(0,o.useState)(e),[a,i]=(0,o.useState)(!1),l=(0,o.useContext)(r.Ni),Z=(0,o.useRef)(null),x=(0,o.useCallback)((()=>i(!1)),[]),j=(0,o.useCallback)((()=>{c(e),i(!0)}),[e]);return(0,m.Z)((()=>{x()}),[l]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(g,{picked:a&&!!t,onAnimationEnd:x,children:t?(0,n.jsx)(d.Z,{country:(0,p.Z)(t),children:t.shortName??t.name}):(0,n.jsx)(h.Z,{ref:Z})}),e&&e!==s&&(0,n.jsx)(f.Z,{from:`[data-cellid='${e.id}']`,to:Z,duration:350,team:e,onAnimationEnd:j})]})})),k=(0,r.ZP)(l.Z)`
  justify-content: center;
  width: 23px;
  color: ${e=>e.theme.isDarkMode?"#ccc":"#333"};

  &::before {
    content: 'v';
  }
`;const w=(0,o.memo)((function({teams:e}){const[s,t]=e??[];return(0,n.jsxs)(a.Z,{children:[(0,n.jsx)(b,{team:s}),(0,n.jsx)(i.Z,{children:(0,n.jsx)(k,{})}),(0,n.jsx)(b,{team:t})]})})),P=(0,r.ZP)(c.Z)`
  align-self: center;
  width: auto;
  max-width: initial;
`,y=(0,o.forwardRef)((({matchups:e},s)=>(0,n.jsx)(P,{ref:s,children:(0,n.jsx)("tbody",{children:e?.map(((e,s)=>(0,n.jsx)(w,{teams:e},s)))})}))),N=(0,o.memo)(y)},89432:(e,s,t)=>{t.d(s,{Z:()=>n});const n=t(58804).ZP.div`
  margin-top: 10px;
  margin-bottom: 5px;
  user-select: none;
`}}]);