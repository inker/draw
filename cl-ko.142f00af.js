"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[6593],{49807:(e,s,t)=>{t.r(s),t.d(s,{default:()=>C});var n=t(85893),o=t(67294),r=t(96026),c=t.n(r),a=t(83608),i=t.n(a),l=t(69983),u=t.n(l),m=t(61790),d=t(57111),p=t(43432),h=t(58231),f=t(12470),Z=t(85973),x=t(62367),j=t(17453),b=t(36756),g=t(90604),k=t(55020),w=t(89432),P=t(3447);const y=()=>new Worker(new URL(t.p+t.u(595),t.b));function N(e){return{currentMatchupNum:0,currentPotNum:1,possiblePairings:null,pots:e.map((e=>u()(e))),matchups:c()(8).map((()=>[]))}}const C=(0,o.memo)((function({season:e,pots:s}){const[t,r]=(0,d.Z)(),[c,a]=(0,p.Z)(),[{currentMatchupNum:l,currentPotNum:u,possiblePairings:C,pots:E,matchups:T},M]=(0,o.useState)((()=>N(s)));(0,o.useEffect)((()=>{M(N(s))}),[s,t]);const[,v]=(0,m.Z)(),[R]=(0,h.Z)(),S=(0,f.Z)(y),$=(0,o.useRef)(null),F=(0,o.useCallback)((async(s,t)=>{try{return(await S({season:e,pots:s,matchups:t})).possiblePairings}catch(e){throw v({error:"Could not determine possible pairings"}),e}}),[e,S]),G=(0,o.useCallback)((async e=>{const s=E[u],t=C?C[e]:e,n=s[t],o=E.slice();o[u]=o[u].filter(((e,s)=>s!==t));const r=T.slice();r[l]=[...r[l],n];const c=1===u?await F(o,r):null;M({currentPotNum:1-u,currentMatchupNum:l-u+1,possiblePairings:c,pots:o,matchups:r})}),[E,T,u,l,C]),A=()=>{if(c)return;(1===C?.length||1===u&&1===E[1].length)&&G(0)};(0,o.useEffect)((()=>{setTimeout(A,250)}),[u]);const D=(0,o.useMemo)((()=>C&&E[0].filter(((e,s)=>C.includes(s)))),[C]),W=l>=s[0].length;(0,o.useEffect)((()=>{if(c){const e=(D??E[1]).length;if(e>0){const s=i()(e-1);G(s)}}}),[c,u]),(0,o.useEffect)((()=>{W&&c&&a(!1)}),[W,c]);const L=C?C.map((e=>E[0][e])):[];return(0,n.jsxs)(Z.Z,{children:[(0,n.jsxs)(b.Z,{children:[(0,n.jsx)(x.Z,{selectedTeams:L,initialPots:s,pots:E,currentPotNum:u}),(0,n.jsx)(j.Z,{ref:$,matchups:T})]}),(0,n.jsxs)(g.Z,{children:[!c&&(0,n.jsxs)(n.Fragment,{children:[!W&&(0,n.jsx)(w.Z,{children:"Runners-up"}),(0,n.jsx)(k.Z,{forceNoSelect:0===u,display:!W,displayTeams:R,selectedTeam:null,pot:E[1],onPick:G}),!W&&(0,n.jsx)(w.Z,{children:"Group Winners"}),D&&(0,n.jsx)(k.Z,{forceNoSelect:1===u,display:!W,displayTeams:R,selectedTeam:null,pot:D,onPick:G})]}),W&&(0,n.jsx)(P.Z,{long:!1,completed:W,selectedTeam:null,pickedGroup:null,possibleGroups:null,numGroups:0,groupsElement:$,reset:r})]})]})}))},17453:(e,s,t)=>{t.d(s,{Z:()=>N});var n=t(85893),o=t(67294),r=t(12788),c=t(42486),a=t(23132),i=t(69585),l=t(93753),u=t(84048),m=t(41771),d=t(58020),p=t(39548),h=t(10606),f=t(78893);const Z=r.F4`
  from {
    background-color: rgb(255 255 0 / 0.5);
  }
`,x=r.F4`
  from {
    background-color: rgb(192 224 255 / 0.5);
  }
`,j=r.iv`
  animation: ${e=>e.theme.isDarkMode?x:Z} 3s ease-out normal forwards;
`,b=(0,r.ZP)(i.Z)`
  width: 150px;
  ${e=>e.picked&&j}
  ${e=>e.styles}
`;const g=(0,o.memo)((function({team:e}){const s=(0,u.Z)(e),[t,c]=(0,o.useState)(e),[a,i]=(0,o.useState)(!1),l=(0,o.useContext)(r.Ni),Z=(0,o.useRef)(null),x=(0,o.useCallback)((()=>i(!1)),[]),j=(0,o.useCallback)((()=>{c(e),i(!0)}),[e]);return(0,m.Z)((()=>{x()}),[l]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(b,{picked:a&&!!t,onAnimationEnd:x,children:t?(0,n.jsx)(p.Z,{country:(0,d.Z)(t),children:t.shortName??t.name}):(0,n.jsx)(h.Z,{ref:Z})}),e&&e!==s&&(0,n.jsx)(f.Z,{from:`[data-cellid='${e.id}']`,to:Z,duration:350,team:e,onAnimationEnd:j})]})})),k=(0,r.ZP)(l.Z)`
  justify-content: center;
  width: 23px;
  color: ${e=>e.theme.isDarkMode?"#ccc":"#333"};

  &::before {
    content: 'v';
  }
`;const w=(0,o.memo)((function({teams:e}){const[s,t]=e??[];return(0,n.jsxs)(a.Z,{children:[(0,n.jsx)(g,{team:s}),(0,n.jsx)(i.Z,{children:(0,n.jsx)(k,{})}),(0,n.jsx)(g,{team:t})]})})),P=(0,r.ZP)(c.Z)`
  align-self: center;
  width: auto;
  max-width: initial;
`,y=(0,o.forwardRef)((({matchups:e},s)=>(0,n.jsx)(P,{ref:s,children:(0,n.jsx)("tbody",{children:e?.map(((e,s)=>(0,n.jsx)(w,{teams:e},s)))})}))),N=(0,o.memo)(y)},89432:(e,s,t)=>{t.d(s,{Z:()=>n});const n=t(12788).ZP.div`
  margin-top: 10px;
  margin-bottom: 5px;
  user-select: none;
`}}]);