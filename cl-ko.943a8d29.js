"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[6593],{37158:(e,t,s)=>{s.r(t),s.d(t,{default:()=>y});var n=s(85893),l=s(67294),r=s(21225),i=s(80676),o=s(21487),a=s(27603),u=s(56285),c=s(43761),d=s(34675),m=s(43510),p=s(72723),f=s(11726),h=s(31294),Z=s(85704),x=s(18753),j=s(40410),g=s(98514),b=s(12365);let k=()=>new Worker(new URL(s.p+s.u(7600),s.b));function w(e){return{currentMatchupNum:0,currentPotNum:1,possiblePairings:null,pots:e.map(e=>(0,r.Z)(e)),matchups:Array.from({length:8},()=>[])}}let y=(0,l.memo)(function({season:e,pots:t}){let[s,r]=(0,a.Z)(),[y,P]=(0,u.Z)(),[{currentMatchupNum:$,currentPotNum:C,possiblePairings:N,pots:E,matchups:v},T]=(0,l.useState)(()=>w(t)),M=(0,d.Z)(T);(0,l.useEffect)(()=>{M(w(t))},[t,s]);let[,R]=(0,o.Z)(),[S]=(0,c.Z)(),F=(0,m.Z)(k),G=(0,l.useRef)(null),A=(0,l.useCallback)(async(t,s)=>{try{let n=await F({season:e,pots:t,matchups:s});return n.possiblePairings}catch(e){throw R({error:"Could not determine possible pairings"}),e}},[e,F]),D=(0,l.useCallback)(async e=>{let t=E[C],s=N?N[e]:e,n=t[s],l=E.slice();l[C]=l[C].filter((e,t)=>t!==s);let r=v.slice();r[$]=[...r[$],n];let i=1===C?await A(l,r):null,o=$-C+1;M({currentPotNum:1-C,currentMatchupNum:o,possiblePairings:i,pots:l,matchups:r})},[E,v,C,$,N]),W=()=>{if(y)return;let e=N?.length===1||1===C&&1===E[1].length;e&&D(0)};(0,l.useEffect)(()=>{setTimeout(W,250)},[C]);let L=(0,l.useMemo)(()=>N&&E[0].filter((e,t)=>N.includes(t)),[N]),U=$>=t[0].length;(0,l.useEffect)(()=>{if(y){let e=L??E[1],t=e.length;if(t>0){let e=(0,i.Z)(t-1);D(e)}}},[y,C]),(0,l.useEffect)(()=>{U&&y&&P(!1)},[U,y]);let q=N?N.map(e=>E[0][e]):[];return(0,n.jsxs)(p.Z,{children:[(0,n.jsxs)(Z.Z,{children:[(0,n.jsx)(f.Z,{selectedTeams:q,initialPots:t,pots:E,currentPotNum:C}),(0,n.jsx)(h.Z,{ref:G,matchups:v})]}),(0,n.jsxs)(x.Z,{children:[!y&&(0,n.jsxs)(n.Fragment,{children:[!U&&(0,n.jsx)(g.Z,{children:"Runners-up"}),(0,n.jsx)(j.Z,{forceNoSelect:0===C,display:!U,displayTeams:S,selectedTeam:null,pot:E[1],onPick:D}),!U&&(0,n.jsx)(g.Z,{children:"Group Winners"}),L&&(0,n.jsx)(j.Z,{forceNoSelect:1===C,display:!U,displayTeams:S,selectedTeam:null,pot:L,onPick:D})]}),U&&(0,n.jsx)(b.Z,{long:!1,completed:U,selectedTeam:null,pickedGroup:null,possibleGroups:null,numGroups:0,groupsElement:G,reset:r})]})]})})},31294:(e,t,s)=>{s.d(t,{Z:()=>$});var n=s(85893),l=s(67294),r=s(70394),i=s(46202),o=s(1850),a=s(8360),u=s(73995),c=s(90595),d=s(63835),m=s(63494),p=s(79633),f=s(88834),h=s(43955);let Z=(0,r.F4)`
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
`,b=(0,l.memo)(function({team:e}){let t=(0,c.Z)(e),[s,i]=(0,l.useState)(e),[o,a]=(0,l.useState)(!1),u=(0,l.useContext)(r.Ni),Z=(0,l.useRef)(null),x=(0,l.useCallback)(()=>a(!1),[]),j=(0,l.useCallback)(()=>{i(e),a(!0)},[e]);return(0,d.Z)(()=>{x()},[u]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(g,{$picked:o&&!!s,onAnimationEnd:x,children:s?(0,n.jsx)(p.Z,{$country:(0,m.Z)(s),children:s.shortName??s.name}):(0,n.jsx)(f.Z,{ref:Z})}),e&&e!==t&&(0,n.jsx)(h.Z,{from:`[data-cellid='${e.id}']`,to:Z,duration:350,team:e,onAnimationEnd:j})]})}),k=(0,r.ZP)(u.Z)`
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