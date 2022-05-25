"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[6593],{49807:(e,s,t)=>{t.r(s),t.d(s,{default:()=>P});var n=t(85893),o=t(67294),r=t(96026),c=t(83608),l=t(69983),a=t(61790),i=t(57111),u=t(43432),m=t(58231),d=t(83266),p=t(85973),h=t(62367),f=t(17453),Z=t(36756),x=t(90604),j=t(55020),b=t(89432),g=t(3447);const k=()=>new Worker(new URL(t.p+t.u(595),t.b));function w(e){return{currentMatchupNum:0,currentPotNum:1,possiblePairings:null,pots:e.map((e=>l(e))),matchups:r(8).map((()=>[]))}}const P=(0,o.memo)((function({season:e,pots:s}){const[t,r]=(0,i.Z)(),[l,P]=(0,u.Z)(),[{currentMatchupNum:y,currentPotNum:N,possiblePairings:v,pots:C,matchups:E},T]=(0,o.useState)((()=>w(s)));(0,o.useEffect)((()=>{T(w(s))}),[s,t]);const[,M]=(0,a.Z)(),[R]=(0,m.Z)(),S=(0,d.Z)(k),$=(0,o.useRef)(null),F=(0,o.useCallback)((async(s,t)=>{try{return(await S({season:e,pots:s,matchups:t})).possiblePairings}catch(e){throw M({error:"Could not determine possible pairings"}),e}}),[e,S]),G=(0,o.useCallback)((async e=>{const s=C[N],t=v?v[e]:e,n=s[t],o=C.slice();o[N]=o[N].filter(((e,s)=>s!==t));const r=E.slice();r[y]=[...r[y],n];const c=1===N?await F(o,r):null;T({currentPotNum:1-N,currentMatchupNum:y-N+1,possiblePairings:c,pots:o,matchups:r})}),[C,E,N,y,v]),A=()=>{if(l)return;(1===(null==v?void 0:v.length)||1===N&&1===C[1].length)&&G(0)};(0,o.useEffect)((()=>{setTimeout(A,250)}),[N]);const D=(0,o.useMemo)((()=>v&&C[0].filter(((e,s)=>v.includes(s)))),[v]),W=y>=s[0].length;(0,o.useEffect)((()=>{if(l){const e=(null!=D?D:C[1]).length;if(e>0){const s=c(e-1);G(s)}}}),[l,N]),(0,o.useEffect)((()=>{W&&l&&P(!1)}),[W,l]);const L=v?v.map((e=>C[0][e])):[];return(0,n.jsxs)(p.Z,{children:[(0,n.jsxs)(Z.Z,{children:[(0,n.jsx)(h.Z,{selectedTeams:L,initialPots:s,pots:C,currentPotNum:N}),(0,n.jsx)(f.Z,{ref:$,matchups:E})]}),(0,n.jsxs)(x.Z,{children:[!l&&(0,n.jsxs)(n.Fragment,{children:[!W&&(0,n.jsx)(b.Z,{children:"Runners-up"}),(0,n.jsx)(j.Z,{forceNoSelect:0===N,display:!W,displayTeams:R,selectedTeam:null,pot:C[1],onPick:G}),!W&&(0,n.jsx)(b.Z,{children:"Group Winners"}),D&&(0,n.jsx)(j.Z,{forceNoSelect:1===N,display:!W,displayTeams:R,selectedTeam:null,pot:D,onPick:G})]}),W&&(0,n.jsx)(g.Z,{long:!1,completed:W,selectedTeam:null,pickedGroup:null,possibleGroups:null,numGroups:0,groupsElement:$,reset:r})]})]})}))},17453:(e,s,t)=>{t.d(s,{Z:()=>N});var n=t(85893),o=t(67294),r=t(58804),c=t(42486),l=t(23132),a=t(69585),i=t(93753),u=t(84048),m=t(41771),d=t(58020),p=t(39548),h=t(10606),f=t(10694);const Z=r.F4`
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
`,b=(0,r.ZP)(a.Z)`
  width: 150px;
  ${e=>e.picked&&j}
  ${e=>e.styles}
`;const g=(0,o.memo)((function({team:e}){var s;const t=(0,u.Z)(e),[c,l]=(0,o.useState)(e),[a,i]=(0,o.useState)(!1),Z=(0,o.useContext)(r.Ni),x=(0,o.useRef)(null),j=(0,o.useCallback)((()=>i(!1)),[]),g=(0,o.useCallback)((()=>{l(e),i(!0)}),[e]);return(0,m.Z)((()=>{j()}),[Z]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(b,{picked:a&&!!c,onAnimationEnd:j,children:c?(0,n.jsx)(p.Z,{country:(0,d.Z)(c),children:null!==(s=c.shortName)&&void 0!==s?s:c.name}):(0,n.jsx)(h.Z,{ref:x})}),e&&e!==t&&(0,n.jsx)(f.Z,{from:`[data-cellid='${e.id}']`,to:x,duration:350,team:e,onAnimationEnd:g})]})})),k=(0,r.ZP)(i.Z)`
  justify-content: center;
  width: 23px;
  color: ${e=>e.theme.isDarkMode?"#ccc":"#333"};

  &::before {
    content: 'v';
  }
`;const w=(0,o.memo)((function({teams:e}){const[s,t]=null!=e?e:[];return(0,n.jsxs)(l.Z,{children:[(0,n.jsx)(g,{team:s}),(0,n.jsx)(a.Z,{children:(0,n.jsx)(k,{})}),(0,n.jsx)(g,{team:t})]})})),P=(0,r.ZP)(c.Z)`
  width: auto;
  align-self: center;
  max-width: initial;
`,y=(0,o.forwardRef)((({matchups:e},s)=>(0,n.jsx)(P,{ref:s,children:(0,n.jsx)("tbody",{children:null==e?void 0:e.map(((e,s)=>(0,n.jsx)(w,{teams:e},s)))})}))),N=(0,o.memo)(y)},89432:(e,s,t)=>{t.d(s,{Z:()=>n});const n=t(58804).ZP.div`
  margin-top: 10px;
  margin-bottom: 5px;
  user-select: none;
`}}]);