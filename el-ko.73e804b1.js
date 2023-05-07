"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[6349],{17471:(e,s,t)=>{t.r(s),t.d(s,{default:()=>E});var n=t(85893),o=t(67294),r=t(96026),c=t.n(r),a=t(83608),i=t.n(a),l=t(69983),u=t.n(l),m=t(61790),p=t(57111),d=t(43432),h=t(58231),f=t(12211),Z=t(12470),x=t(85973),j=t(62367),g=t(17453),b=t(36756),k=t(90604),w=t(55020),P=t(89432),y=t(3447);const N=()=>new Worker(new URL(t.p+t.u(2061),t.b));function C(e,s){const t=s<2021?16:8;return{currentMatchupNum:0,currentPotNum:1,possiblePairings:null,pots:e.map((e=>u()(e))),matchups:c()(t).map((()=>[]))}}const E=(0,o.memo)((function({season:e,pots:s}){const[t,r]=(0,p.Z)(),[c,a]=(0,d.Z)(),[{currentMatchupNum:l,currentPotNum:u,possiblePairings:E,pots:T,matchups:M},v]=(0,o.useState)((()=>C(s,e)));(0,o.useEffect)((()=>{v(C(s,e))}),[s,e,t]);const R=(0,f.Z)("(min-height: 750px)"),[,S]=(0,m.Z)(),[$]=(0,h.Z)(),F=(0,Z.Z)(N),G=(0,o.useRef)(null),A=(0,o.useCallback)((async(s,t)=>{try{return(await F({season:e,pots:s,matchups:t})).possiblePairings}catch(e){throw S({error:"Could not determine possible pairings"}),e}}),[e,F]),D=(0,o.useCallback)((async e=>{const s=T[u],t=E?E[e]:e,n=s[t],o=T.slice();o[u]=o[u].filter(((e,s)=>s!==t));const r=M.slice();r[l]=[...r[l],n];const c=1===u?await A(o,r):null;v({currentPotNum:1-u,currentMatchupNum:l-u+1,possiblePairings:c,pots:o,matchups:r})}),[T,M,u,l,E]),W=()=>{if(c)return;(1===E?.length||1===u&&1===T[1].length)&&D(0)};(0,o.useEffect)((()=>{setTimeout(W,250)}),[u]);const L=(0,o.useMemo)((()=>E&&T[0].filter(((e,s)=>E.includes(s)))),[E]),U=l>=s[0].length;(0,o.useEffect)((()=>{if(c){const e=(L??T[1]).length;if(e>0){const s=i()(e-1);D(s)}}}),[c,u]),(0,o.useEffect)((()=>{U&&c&&a(!1)}),[U,c]);const q=E?E.map((e=>T[0][e])):[];return(0,n.jsxs)(x.Z,{children:[(0,n.jsxs)(b.Z,{children:[(0,n.jsx)(j.Z,{selectedTeams:q,initialPots:s,pots:T,currentPotNum:u,split:!R&&e<2021}),(0,n.jsx)(g.Z,{ref:G,matchups:M})]}),(0,n.jsxs)(k.Z,{children:[!c&&(0,n.jsxs)(n.Fragment,{children:[!U&&(0,n.jsx)(P.Z,{children:"Runners-up"}),(0,n.jsx)(w.Z,{forceNoSelect:0===u,display:!U,displayTeams:$,selectedTeam:null,pot:T[1],onPick:D}),!U&&(0,n.jsx)(P.Z,{children:"Group Winners"}),L&&(0,n.jsx)(w.Z,{forceNoSelect:1===u,display:!U,displayTeams:$,selectedTeam:null,pot:L,onPick:D})]}),U&&(0,n.jsx)(y.Z,{long:!1,completed:U,selectedTeam:null,pickedGroup:null,possibleGroups:null,numGroups:0,groupsElement:G,reset:r})]})]})}))},17453:(e,s,t)=>{t.d(s,{Z:()=>N});var n=t(85893),o=t(67294),r=t(12788),c=t(42486),a=t(23132),i=t(69585),l=t(93753),u=t(84048),m=t(41771),p=t(58020),d=t(39548),h=t(10606),f=t(78893);const Z=r.F4`
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
`,y=(0,o.forwardRef)((({matchups:e},s)=>(0,n.jsx)(P,{ref:s,children:(0,n.jsx)("tbody",{children:e?.map(((e,s)=>(0,n.jsx)(w,{teams:e},s)))})}))),N=(0,o.memo)(y)},89432:(e,s,t)=>{t.d(s,{Z:()=>n});const n=t(12788).ZP.div`
  margin-top: 10px;
  margin-bottom: 5px;
  user-select: none;
`}}]);