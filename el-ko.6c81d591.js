"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[6349],{27045:(e,t,s)=>{s.r(t),s.d(t,{default:()=>y});var n=s(85893),l=s(67294),r=s(21225),i=s(80676),o=s(21487),a=s(27603),c=s(56285),u=s(43761),d=s(12185),m=s(88853),p=s(72723),h=s(11726),Z=s(31294),f=s(85704),x=s(18753),j=s(40410),g=s(98514),b=s(12365);let k=()=>new Worker(new URL(s.p+s.u(7074),s.b));function w(e,t){return{currentMatchupNum:0,currentPotNum:1,possiblePairings:null,pots:e.map(e=>(0,r.Z)(e)),matchups:Array.from({length:t<2021?16:8},()=>[])}}let y=(0,l.memo)(function({season:e,pots:t}){let[s,r]=(0,a.Z)(),[y]=(0,c.Z)(),[{currentMatchupNum:P,currentPotNum:$,possiblePairings:C,pots:N,matchups:v},E]=(0,l.useState)(()=>w(t,e));(0,l.useEffect)(()=>{E(w(t,e))},[t,e,s]);let T=(0,d.Z)("(min-height: 750px)"),[,M]=(0,o.Z)(),[R]=(0,u.Z)(),S=(0,m.Z)(k),F=(0,l.useRef)(null),G=(0,l.useCallback)(async(t,s)=>{try{return await S({season:e,pots:t,matchups:s})}catch(e){throw M({error:"Could not determine possible pairings"}),e}},[e,S]),A=(0,l.useCallback)(async e=>{let t=N[$],s=C?C[e]:e,n=t[s],l=N.slice();l[$]=l[$].filter((e,t)=>t!==s);let r=v.slice();r[P]=[...r[P],n];let i=1===$?await G(l,r):null,o=P-$+1;E(e=>({...e,currentPotNum:1-$,currentMatchupNum:o,possiblePairings:i,pots:l,matchups:r}))},[N,v,$,P,C]),D=()=>{y||C?.length!==1&&(1!==$||1!==N[1].length)||A(0)};(0,l.useEffect)(()=>{setTimeout(D,250)},[$]);let W=(0,l.useMemo)(()=>C&&N[0].filter((e,t)=>C.includes(t)),[C]),L=P>=t[0].length;(0,l.useEffect)(()=>{if(y){let e=(W??N[1]).length;e>0&&A((0,i.Z)(e-1))}},[y,$]);let U=C?C.map(e=>N[0][e]):[];return(0,n.jsxs)(p.Z,{children:[(0,n.jsxs)(f.Z,{children:[(0,n.jsx)(h.Z,{selectedTeams:U,initialPots:t,pots:N,currentPotNum:$,split:!T&&e<2021}),(0,n.jsx)(Z.Z,{ref:F,matchups:v})]}),(0,n.jsxs)(x.Z,{children:[!y&&(0,n.jsxs)(n.Fragment,{children:[!L&&(0,n.jsx)(g.Z,{children:"Runners-up"}),(0,n.jsx)(j.Z,{forceNoSelect:0===$,display:!L,displayTeams:R,selectedTeam:null,pot:N[1],onPick:A}),!L&&(0,n.jsx)(g.Z,{children:"Group Winners"}),W&&(0,n.jsx)(j.Z,{forceNoSelect:1===$,display:!L,displayTeams:R,selectedTeam:null,pot:W,onPick:A})]}),L&&(0,n.jsx)(b.Z,{long:!1,completed:L,selectedTeam:null,pickedGroup:null,possibleGroups:null,numGroups:0,groupsElement:F,reset:r})]})]})})},31294:(e,t,s)=>{s.d(t,{Z:()=>$});var n=s(85893),l=s(67294),r=s(70394),i=s(46202),o=s(1850),a=s(8360),c=s(73995),u=s(90595),d=s(63835),m=s(63494),p=s(79633),h=s(88834),Z=s(43955);let f=(0,r.F4)`
  from {
    background-color: rgb(255 255 0 / 0.5);
  }
`,x=(0,r.F4)`
  from {
    background-color: rgb(192 224 255 / 0.5);
  }
`,j=(0,r.iv)`
  animation: ${e=>e.theme.isDarkMode?x:f} 3s ease-out normal forwards;
`,g=(0,r.ZP)(a.Z)`
  width: 150px;
  ${e=>e.$picked&&j}
  ${e=>e.$styles}
`,b=(0,l.memo)(function({team:e}){let t=(0,u.Z)(e),[s,i]=(0,l.useState)(e),[o,a]=(0,l.useState)(!1),c=(0,l.useContext)(r.Ni),f=(0,l.useRef)(null),x=(0,l.useCallback)(()=>a(!1),[]),j=(0,l.useCallback)(()=>{i(e),a(!0)},[e]);return(0,d.Z)(()=>{x()},[c]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(g,{$picked:o&&!!s,onAnimationEnd:x,children:s?(0,n.jsx)(p.Z,{$country:(0,m.Z)(s),children:s.shortName??s.name}):(0,n.jsx)(h.Z,{ref:f})}),e&&e!==t&&(0,n.jsx)(Z.Z,{from:`[data-cellid='${e.id}']`,to:f,duration:350,team:e,onAnimationEnd:j})]})}),k=(0,r.ZP)(c.Z)`
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
`,P=(0,l.forwardRef)(({matchups:e},t)=>(0,n.jsx)(y,{ref:t,children:(0,n.jsx)("tbody",{children:e?.map((e,t)=>n.jsx(w,{teams:e},t))})})),$=(0,l.memo)(P)},98514:(e,t,s)=>{s.d(t,{Z:()=>l});var n=s(70394);let l=n.ZP.div`
  margin-top: 10px;
  margin-bottom: 5px;
  user-select: none;
`}}]);