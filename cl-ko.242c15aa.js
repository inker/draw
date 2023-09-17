"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[6593],{37158:(e,t,s)=>{s.r(t),s.d(t,{default:()=>w});var n=s(85893),l=s(67294),r=s(21225),i=s(80676),o=s(21487),a=s(27603),u=s(56285),c=s(43761),d=s(88853),m=s(72723),p=s(11726),h=s(31294),f=s(85704),Z=s(18753),x=s(40410),j=s(98514),g=s(12365);let b=()=>new Worker(new URL(s.p+s.u(7600),s.b));function k(e){return{currentMatchupNum:0,currentPotNum:1,possiblePairings:null,pots:e.map(e=>(0,r.Z)(e)),matchups:Array.from({length:8},()=>[])}}let w=(0,l.memo)(function({season:e,pots:t}){let[s,r]=(0,a.Z)(),[w]=(0,u.Z)(),[{currentMatchupNum:y,currentPotNum:P,possiblePairings:$,pots:C,matchups:N},v]=(0,l.useState)(()=>k(t));(0,l.useEffect)(()=>{v(k(t))},[t,s]);let[,E]=(0,o.Z)(),[T]=(0,c.Z)(),M=(0,d.Z)(b),R=(0,l.useRef)(null),S=(0,l.useCallback)(async(t,s)=>{try{let n=await M({season:e,pots:t,matchups:s});return n.possiblePairings}catch(e){throw E({error:"Could not determine possible pairings"}),e}},[e,M]),F=(0,l.useCallback)(async e=>{let t=C[P],s=$?$[e]:e,n=t[s],l=C.slice();l[P]=l[P].filter((e,t)=>t!==s);let r=N.slice();r[y]=[...r[y],n];let i=1===P?await S(l,r):null,o=y-P+1;v(e=>({...e,currentPotNum:1-P,currentMatchupNum:o,possiblePairings:i,pots:l,matchups:r}))},[C,N,P,y,$]),G=()=>{if(w)return;let e=$?.length===1||1===P&&1===C[1].length;e&&F(0)};(0,l.useEffect)(()=>{setTimeout(G,250)},[P]);let A=(0,l.useMemo)(()=>$&&C[0].filter((e,t)=>$.includes(t)),[$]),D=y>=t[0].length;(0,l.useEffect)(()=>{if(w){let e=A??C[1],t=e.length;if(t>0){let e=(0,i.Z)(t-1);F(e)}}},[w,P]);let W=$?$.map(e=>C[0][e]):[];return(0,n.jsxs)(m.Z,{children:[(0,n.jsxs)(f.Z,{children:[(0,n.jsx)(p.Z,{selectedTeams:W,initialPots:t,pots:C,currentPotNum:P}),(0,n.jsx)(h.Z,{ref:R,matchups:N})]}),(0,n.jsxs)(Z.Z,{children:[!w&&(0,n.jsxs)(n.Fragment,{children:[!D&&(0,n.jsx)(j.Z,{children:"Runners-up"}),(0,n.jsx)(x.Z,{forceNoSelect:0===P,display:!D,displayTeams:T,selectedTeam:null,pot:C[1],onPick:F}),!D&&(0,n.jsx)(j.Z,{children:"Group Winners"}),A&&(0,n.jsx)(x.Z,{forceNoSelect:1===P,display:!D,displayTeams:T,selectedTeam:null,pot:A,onPick:F})]}),D&&(0,n.jsx)(g.Z,{long:!1,completed:D,selectedTeam:null,pickedGroup:null,possibleGroups:null,numGroups:0,groupsElement:R,reset:r})]})]})})},31294:(e,t,s)=>{s.d(t,{Z:()=>$});var n=s(85893),l=s(67294),r=s(70394),i=s(46202),o=s(1850),a=s(8360),u=s(73995),c=s(90595),d=s(63835),m=s(63494),p=s(79633),h=s(88834),f=s(43955);let Z=(0,r.F4)`
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