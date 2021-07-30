"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[6593],{49807:(e,s,t)=>{t.r(s),t.d(s,{default:()=>w});var o=t(85893),n=t(67294),i=t(96026),r=t(83608),c=t(69983),a=t(61790),l=t(57111),u=t(43432),d=t(58231),m=t(83266),p=t(85973),h=t(62367),f=t(17453),v=t(36756),Z=t(90604),x=t(55020),j=t(89432),b=t(3447);const g=()=>new Worker(new URL(t.p+t.u(595),t.b));function k(e){return{currentMatchupNum:0,currentPotNum:1,possiblePairings:null,pots:e.map((e=>c(e))),matchups:i(8).map((()=>[]))}}const w=(0,n.memo)((({season:e,pots:s})=>{const[t,i]=(0,l.Z)(),[c,w]=(0,u.Z)(),[{currentMatchupNum:P,currentPotNum:y,possiblePairings:N,pots:C,matchups:E},T]=(0,n.useState)((()=>k(s)));(0,n.useEffect)((()=>{T(k(s))}),[s,t]);const[,M]=(0,a.Z)(),[R]=(0,d.Z)(),S=(0,m.Z)(g),$=(0,n.useRef)(null),F=(0,n.useCallback)((async(s,t)=>{try{return(await S({season:e,pots:s,matchups:t})).possiblePairings}catch(e){throw M({error:"Could not determine possible pairings"}),e}}),[e,S]),G=(0,n.useCallback)((async e=>{const s=C[y],t=N?N[e]:e,o=s[t],n=C.slice();n[y]=n[y].filter(((e,s)=>s!==t));const i=E.slice();i[P]=[...i[P],o];const r=1===y?await F(n,i):null;T({currentPotNum:1-y,currentMatchupNum:P-y+1,possiblePairings:r,pots:n,matchups:i})}),[C,E,y,P,N]),O=()=>{if(c)return;(1===(null==N?void 0:N.length)||1===y&&1===C[1].length)&&G(0)};(0,n.useEffect)((()=>{setTimeout(O,250)}),[y]);const A=(0,n.useMemo)((()=>N&&C[0].filter(((e,s)=>N.includes(s)))),[N]),D=P>=s[0].length;(0,n.useEffect)((()=>{if(c){const e=(null!=A?A:C[1]).length;if(e>0){const s=r(e-1);G(s)}}}),[c,y]),(0,n.useEffect)((()=>{D&&c&&w(!1)}),[D,c]);const W=N?N.map((e=>C[0][e])):[];return(0,o.jsxs)(p.Z,{children:[(0,o.jsxs)(v.Z,{children:[(0,o.jsx)(h.Z,{selectedTeams:W,initialPots:s,pots:C,currentPotNum:y},void 0),(0,o.jsx)(f.Z,{ref:$,matchups:E},void 0)]},void 0),(0,o.jsxs)(Z.Z,{children:[!c&&(0,o.jsxs)(o.Fragment,{children:[!D&&(0,o.jsx)(j.Z,{children:"Runners-up"},void 0),(0,o.jsx)(x.Z,{forceNoSelect:0===y,display:!D,displayTeams:R,selectedTeam:null,pot:C[1],onPick:G},void 0),!D&&(0,o.jsx)(j.Z,{children:"Group Winners"},void 0),A&&(0,o.jsx)(x.Z,{forceNoSelect:1===y,display:!D,displayTeams:R,selectedTeam:null,pot:A,onPick:G},void 0)]},void 0),D&&(0,o.jsx)(b.Z,{long:!1,completed:D,selectedTeam:null,pickedGroup:null,possibleGroups:null,numGroups:0,groupsElement:$,reset:i},void 0)]},void 0)]},void 0)}))},17453:(e,s,t)=>{t.d(s,{Z:()=>y});var o=t(85893),n=t(67294),i=t(29163),r=t(42486),c=t(23132),a=t(69585),l=t(93753),u=t(84048),d=t(41771),m=t(58020),p=t(39548),h=t(10606),f=t(10694);const v=i.F4`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,Z=i.F4`
  from {
    background-color: rgba(192, 224, 255, 0.5);
  }
  to {}
`,x=i.iv`
  animation: ${e=>e.theme.isDarkMode?Z:v} 3s ease-out normal forwards;
`,j=(0,i.ZP)(a.Z)`
  width: 150px;
  ${e=>e.picked&&x}
  ${e=>e.styles}
`,b=(0,n.memo)((({team:e})=>{var s;const t=(0,u.Z)(e),[r,c]=(0,n.useState)(e),[a,l]=(0,n.useState)(!1),v=(0,n.useContext)(i.Ni),Z=(0,n.useRef)(null),x=(0,n.useCallback)((()=>l(!1)),[]),b=(0,n.useCallback)((()=>{c(e),l(!0)}),[e]);return(0,d.Z)((()=>{x()}),[v]),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(j,Object.assign({picked:a&&!!r,onAnimationEnd:x},{children:r?(0,o.jsx)(p.Z,Object.assign({country:(0,m.Z)(r)},{children:null!==(s=r.shortName)&&void 0!==s?s:r.name}),void 0):(0,o.jsx)(h.Z,{ref:Z},void 0)}),void 0),e&&e!==t&&(0,o.jsx)(f.Z,{from:`[data-cellid='${e.id}']`,to:Z,duration:350,team:e,onAnimationEnd:b},void 0)]},void 0)})),g=(0,i.ZP)(l.Z)`
  justify-content: center;
  width: 23px;
  color: ${e=>e.theme.isDarkMode?"#ccc":"#333"};

  &::before {
    content: 'v';
  }
`,k=(0,n.memo)((({teams:e})=>{const[s,t]=null!=e?e:[];return(0,o.jsxs)(c.Z,{children:[(0,o.jsx)(b,{team:s},void 0),(0,o.jsx)(a.Z,{children:(0,o.jsx)(g,{},void 0)},void 0),(0,o.jsx)(b,{team:t},void 0)]},void 0)})),w=(0,i.ZP)(r.Z)`
  width: auto;
  align-self: center;
  max-width: initial;
`,P=(0,n.forwardRef)((({matchups:e},s)=>(0,o.jsx)(w,Object.assign({ref:s},{children:(0,o.jsx)("tbody",{children:null==e?void 0:e.map(((e,s)=>(0,o.jsx)(k,{teams:e},s)))},void 0)}),void 0))),y=(0,n.memo)(P)},89432:(e,s,t)=>{t.d(s,{Z:()=>o});const o=t(29163).ZP.div`
  margin-top: 10px;
  margin-bottom: 5px;
  user-select: none;
`}}]);