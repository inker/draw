"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[6593],{37158:(e,t,s)=>{s.r(t),s.d(t,{default:()=>w});var n=s(85893),l=s(67294),r=s(21225),i=s(80676),o=s(40339),a=s(27603),u=s(56285),c=s(43761),d=s(43510),m=s(72723),p=s(11726),f=s(31294),h=s(85704),Z=s(18753),x=s(40410),j=s(98514),g=s(12365);let b=()=>new Worker(new URL(s.p+s.u(7600),s.b));function k(e){return{currentMatchupNum:0,currentPotNum:1,possiblePairings:null,pots:e.map(e=>(0,r.Z)(e)),matchups:Array.from({length:8},()=>[])}}let w=(0,l.memo)(function({season:e,pots:t}){let[s,r]=(0,a.Z)(),[w,y]=(0,u.Z)(),[{currentMatchupNum:P,currentPotNum:$,possiblePairings:C,pots:N,matchups:E},v]=(0,l.useState)(()=>k(t));(0,l.useEffect)(()=>{v(k(t))},[t,s]);let[,T]=(0,o.Z)(),[M]=(0,c.Z)(),R=(0,d.Z)(b),S=(0,l.useRef)(null),F=(0,l.useCallback)(async(t,s)=>{try{let n=await R({season:e,pots:t,matchups:s});return n.possiblePairings}catch(e){throw T({error:"Could not determine possible pairings"}),e}},[e,R]),G=(0,l.useCallback)(async e=>{let t=N[$],s=C?C[e]:e,n=t[s],l=N.slice();l[$]=l[$].filter((e,t)=>t!==s);let r=E.slice();r[P]=[...r[P],n];let i=1===$?await F(l,r):null,o=P-$+1;v({currentPotNum:1-$,currentMatchupNum:o,possiblePairings:i,pots:l,matchups:r})},[N,E,$,P,C]),A=()=>{if(w)return;let e=C?.length===1||1===$&&1===N[1].length;e&&G(0)};(0,l.useEffect)(()=>{setTimeout(A,250)},[$]);let D=(0,l.useMemo)(()=>C&&N[0].filter((e,t)=>C.includes(t)),[C]),W=P>=t[0].length;(0,l.useEffect)(()=>{if(w){let e=D??N[1],t=e.length;if(t>0){let e=(0,i.Z)(t-1);G(e)}}},[w,$]),(0,l.useEffect)(()=>{W&&w&&y(!1)},[W,w]);let L=C?C.map(e=>N[0][e]):[];return(0,n.jsxs)(m.Z,{children:[(0,n.jsxs)(h.Z,{children:[(0,n.jsx)(p.Z,{selectedTeams:L,initialPots:t,pots:N,currentPotNum:$}),(0,n.jsx)(f.Z,{ref:S,matchups:E})]}),(0,n.jsxs)(Z.Z,{children:[!w&&(0,n.jsxs)(n.Fragment,{children:[!W&&(0,n.jsx)(j.Z,{children:"Runners-up"}),(0,n.jsx)(x.Z,{forceNoSelect:0===$,display:!W,displayTeams:M,selectedTeam:null,pot:N[1],onPick:G}),!W&&(0,n.jsx)(j.Z,{children:"Group Winners"}),D&&(0,n.jsx)(x.Z,{forceNoSelect:1===$,display:!W,displayTeams:M,selectedTeam:null,pot:D,onPick:G})]}),W&&(0,n.jsx)(g.Z,{long:!1,completed:W,selectedTeam:null,pickedGroup:null,possibleGroups:null,numGroups:0,groupsElement:S,reset:r})]})]})})},31294:(e,t,s)=>{s.d(t,{Z:()=>$});var n=s(85893),l=s(67294),r=s(70394),i=s(46202),o=s(1850),a=s(8360),u=s(73995),c=s(90595),d=s(63835),m=s(63494),p=s(79633),f=s(88834),h=s(43955);let Z=(0,r.F4)`
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