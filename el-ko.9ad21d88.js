"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[6349],{27045:(e,t,s)=>{s.r(t),s.d(t,{default:()=>P});var n=s(85893),l=s(67294),r=s(21225),i=s(96446),a=s(80676),o=s(40339),u=s(27603),c=s(56285),d=s(43761),m=s(12185),p=s(43510),h=s(72723),Z=s(11726),f=s(31294),x=s(85704),j=s(18753),g=s(40410),b=s(98514),k=s(12365);let w=()=>new Worker(new URL(s.p+s.u(7074),s.b));function y(e,t){return{currentMatchupNum:0,currentPotNum:1,possiblePairings:null,pots:e.map(e=>(0,r.Z)(e)),matchups:(0,i.Z)(t<2021?16:8).map(()=>[])}}let P=(0,l.memo)(function({season:e,pots:t}){let[s,r]=(0,u.Z)(),[i,P]=(0,c.Z)(),[{currentMatchupNum:$,currentPotNum:C,possiblePairings:N,pots:E,matchups:v},T]=(0,l.useState)(()=>y(t,e));(0,l.useEffect)(()=>{T(y(t,e))},[t,e,s]);let M=(0,m.Z)("(min-height: 750px)"),[,R]=(0,o.Z)(),[S]=(0,d.Z)(),F=(0,p.Z)(w),G=(0,l.useRef)(null),A=(0,l.useCallback)(async(t,s)=>{try{let n=await F({season:e,pots:t,matchups:s});return n.possiblePairings}catch(e){throw R({error:"Could not determine possible pairings"}),e}},[e,F]),D=(0,l.useCallback)(async e=>{let t=N?N[e]:e,s=E[C][t],n=E.slice();n[C]=n[C].filter((e,s)=>s!==t);let l=v.slice();l[$]=[...l[$],s];let r=1===C?await A(n,l):null,i=$-C+1;T({currentPotNum:1-C,currentMatchupNum:i,possiblePairings:r,pots:n,matchups:l})},[E,v,C,$,N]),W=()=>{if(i)return;let e=N?.length===1||1===C&&1===E[1].length;e&&D(0)};(0,l.useEffect)(()=>{setTimeout(W,250)},[C]);let L=(0,l.useMemo)(()=>N&&E[0].filter((e,t)=>N.includes(t)),[N]),U=$>=t[0].length;(0,l.useEffect)(()=>{if(i){let e=L??E[1],t=e.length;if(t>0){let e=(0,a.Z)(t-1);D(e)}}},[i,C]),(0,l.useEffect)(()=>{U&&i&&P(!1)},[U,i]);let q=N?N.map(e=>E[0][e]):[];return(0,n.jsxs)(h.Z,{children:[(0,n.jsxs)(x.Z,{children:[(0,n.jsx)(Z.Z,{selectedTeams:q,initialPots:t,pots:E,currentPotNum:C,split:!M&&e<2021}),(0,n.jsx)(f.Z,{ref:G,matchups:v})]}),(0,n.jsxs)(j.Z,{children:[!i&&(0,n.jsxs)(n.Fragment,{children:[!U&&(0,n.jsx)(b.Z,{children:"Runners-up"}),(0,n.jsx)(g.Z,{forceNoSelect:0===C,display:!U,displayTeams:S,selectedTeam:null,pot:E[1],onPick:D}),!U&&(0,n.jsx)(b.Z,{children:"Group Winners"}),L&&(0,n.jsx)(g.Z,{forceNoSelect:1===C,display:!U,displayTeams:S,selectedTeam:null,pot:L,onPick:D})]}),U&&(0,n.jsx)(k.Z,{long:!1,completed:U,selectedTeam:null,pickedGroup:null,possibleGroups:null,numGroups:0,groupsElement:G,reset:r})]})]})})},31294:(e,t,s)=>{s.d(t,{Z:()=>$});var n=s(85893),l=s(67294),r=s(70394),i=s(46202),a=s(1850),o=s(8360),u=s(73995),c=s(90595),d=s(63835),m=s(63494),p=s(79633),h=s(88834),Z=s(43955);let f=(0,r.F4)`
  from {
    background-color: rgb(255 255 0 / 0.5);
  }
`,x=(0,r.F4)`
  from {
    background-color: rgb(192 224 255 / 0.5);
  }
`,j=(0,r.iv)`
  animation: ${e=>e.theme.isDarkMode?x:f} 3s ease-out normal forwards;
`,g=(0,r.ZP)(o.Z)`
  width: 150px;
  ${e=>e.$picked&&j}
  ${e=>e.$styles}
`,b=(0,l.memo)(function({team:e}){let t=(0,c.Z)(e),[s,i]=(0,l.useState)(e),[a,o]=(0,l.useState)(!1),u=(0,l.useContext)(r.Ni),f=(0,l.useRef)(null),x=(0,l.useCallback)(()=>o(!1),[]),j=(0,l.useCallback)(()=>{i(e),o(!0)},[e]);return(0,d.Z)(()=>{x()},[u]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(g,{$picked:a&&!!s,onAnimationEnd:x,children:s?(0,n.jsx)(p.Z,{$country:(0,m.Z)(s),children:s.shortName??s.name}):(0,n.jsx)(h.Z,{ref:f})}),e&&e!==t&&(0,n.jsx)(Z.Z,{from:`[data-cellid='${e.id}']`,to:f,duration:350,team:e,onAnimationEnd:j})]})}),k=(0,r.ZP)(u.Z)`
  justify-content: center;
  width: 23px;
  color: ${e=>e.theme.isDarkMode?"#ccc":"#333"};

  &::before {
    content: 'v';
  }
`,w=(0,l.memo)(function({teams:e}){let[t,s]=e??[];return(0,n.jsxs)(a.Z,{children:[(0,n.jsx)(b,{team:t}),(0,n.jsx)(o.Z,{children:(0,n.jsx)(k,{})}),(0,n.jsx)(b,{team:s})]})}),y=(0,r.ZP)(i.Z)`
  align-self: center;
  width: auto;
  max-width: initial;
`,P=(0,l.forwardRef)(({matchups:e},t)=>(0,n.jsx)(y,{ref:t,children:(0,n.jsx)("tbody",{children:e?.map((e,t)=>n.jsx(w,{teams:e},t))})})),$=(0,l.memo)(P)},98514:(e,t,s)=>{s.d(t,{Z:()=>r});var n=s(70394);let l=n.ZP.div`
  margin-top: 10px;
  margin-bottom: 5px;
  user-select: none;
`,r=l}}]);