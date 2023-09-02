"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[6349],{27045:(e,t,s)=>{s.r(t),s.d(t,{default:()=>P});var n=s(85893),l=s(67294),r=s(21225),i=s(80676),o=s(21487),a=s(27603),u=s(56285),c=s(43761),d=s(34675),m=s(12185),p=s(43510),h=s(72723),f=s(11726),Z=s(31294),x=s(85704),j=s(18753),g=s(40410),b=s(98514),k=s(12365);let w=()=>new Worker(new URL(s.p+s.u(7074),s.b));function y(e,t){return{currentMatchupNum:0,currentPotNum:1,possiblePairings:null,pots:e.map(e=>(0,r.Z)(e)),matchups:Array.from({length:t<2021?16:8},()=>[])}}let P=(0,l.memo)(function({season:e,pots:t}){let[s,r]=(0,a.Z)(),[P,$]=(0,u.Z)(),[{currentMatchupNum:C,currentPotNum:N,possiblePairings:E,pots:v,matchups:T},M]=(0,l.useState)(()=>y(t,e)),R=(0,d.Z)(M);(0,l.useEffect)(()=>{R(y(t,e))},[t,e,s]);let S=(0,m.Z)("(min-height: 750px)"),[,F]=(0,o.Z)(),[G]=(0,c.Z)(),A=(0,p.Z)(w),D=(0,l.useRef)(null),W=(0,l.useCallback)(async(t,s)=>{try{let n=await A({season:e,pots:t,matchups:s});return n.possiblePairings}catch(e){throw F({error:"Could not determine possible pairings"}),e}},[e,A]),L=(0,l.useCallback)(async e=>{let t=v[N],s=E?E[e]:e,n=t[s],l=v.slice();l[N]=l[N].filter((e,t)=>t!==s);let r=T.slice();r[C]=[...r[C],n];let i=1===N?await W(l,r):null,o=C-N+1;R({currentPotNum:1-N,currentMatchupNum:o,possiblePairings:i,pots:l,matchups:r})},[v,T,N,C,E]),U=()=>{if(P)return;let e=E?.length===1||1===N&&1===v[1].length;e&&L(0)};(0,l.useEffect)(()=>{setTimeout(U,250)},[N]);let q=(0,l.useMemo)(()=>E&&v[0].filter((e,t)=>E.includes(t)),[E]),z=C>=t[0].length;(0,l.useEffect)(()=>{if(P){let e=q??v[1],t=e.length;if(t>0){let e=(0,i.Z)(t-1);L(e)}}},[P,N]),(0,l.useEffect)(()=>{z&&P&&$(!1)},[z,P]);let B=E?E.map(e=>v[0][e]):[];return(0,n.jsxs)(h.Z,{children:[(0,n.jsxs)(x.Z,{children:[(0,n.jsx)(f.Z,{selectedTeams:B,initialPots:t,pots:v,currentPotNum:N,split:!S&&e<2021}),(0,n.jsx)(Z.Z,{ref:D,matchups:T})]}),(0,n.jsxs)(j.Z,{children:[!P&&(0,n.jsxs)(n.Fragment,{children:[!z&&(0,n.jsx)(b.Z,{children:"Runners-up"}),(0,n.jsx)(g.Z,{forceNoSelect:0===N,display:!z,displayTeams:G,selectedTeam:null,pot:v[1],onPick:L}),!z&&(0,n.jsx)(b.Z,{children:"Group Winners"}),q&&(0,n.jsx)(g.Z,{forceNoSelect:1===N,display:!z,displayTeams:G,selectedTeam:null,pot:q,onPick:L})]}),z&&(0,n.jsx)(k.Z,{long:!1,completed:z,selectedTeam:null,pickedGroup:null,possibleGroups:null,numGroups:0,groupsElement:D,reset:r})]})]})})},31294:(e,t,s)=>{s.d(t,{Z:()=>$});var n=s(85893),l=s(67294),r=s(70394),i=s(46202),o=s(1850),a=s(8360),u=s(73995),c=s(90595),d=s(63835),m=s(63494),p=s(79633),h=s(88834),f=s(43955);let Z=(0,r.F4)`
  from {
    background-color: rgb(255 255 0 / 0.5);
  }
`,x=(0,r.F4)`
  from {
    background-color: rgb(192 224 255 / 0.5);
  }
`,j=(0,r.iv)`
  animation: ${e=>e.theme.isDarkMode?x:Z} 3s ease-out normal forwards;
`,g=(0,r.ZP)(a.Z)`
  width: 150px;
  ${e=>e.$picked&&j}
  ${e=>e.$styles}
`,b=(0,l.memo)(function({team:e}){let t=(0,c.Z)(e),[s,i]=(0,l.useState)(e),[o,a]=(0,l.useState)(!1),u=(0,l.useContext)(r.Ni),Z=(0,l.useRef)(null),x=(0,l.useCallback)(()=>a(!1),[]),j=(0,l.useCallback)(()=>{i(e),a(!0)},[e]);return(0,d.Z)(()=>{x()},[u]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(g,{$picked:o&&!!s,onAnimationEnd:x,children:s?(0,n.jsx)(p.Z,{$country:(0,m.Z)(s),children:s.shortName??s.name}):(0,n.jsx)(h.Z,{ref:Z})}),e&&e!==t&&(0,n.jsx)(f.Z,{from:`[data-cellid='${e.id}']`,to:Z,duration:350,team:e,onAnimationEnd:j})]})}),k=(0,r.ZP)(u.Z)`
  justify-content: center;
  width: 23px;
  color: ${e=>e.theme.isDarkMode?"#ccc":"#333"};

  &::before {
    content: 'v';
  }
`,w=(0,l.memo)(function({teams:e}){let[t,s]=e??[];return(0,n.jsxs)(o.Z,{children:[(0,n.jsx)(b,{team:t}),(0,n.jsx)(a.Z,{children:(0,n.jsx)(k,{})}),(0,n.jsx)(b,{team:s})]})}),y=(0,r.ZP)(i.Z)`
  align-self: center;
  width: auto;
  max-width: initial;
`,P=(0,l.forwardRef)(({matchups:e},t)=>(0,n.jsx)(y,{ref:t,children:(0,n.jsx)("tbody",{children:e?.map((e,t)=>n.jsx(w,{teams:e},t))})})),$=(0,l.memo)(P)},98514:(e,t,s)=>{s.d(t,{Z:()=>r});var n=s(70394);let l=n.ZP.div`
  margin-top: 10px;
  margin-bottom: 5px;
  user-select: none;
`,r=l}}]);