"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[6593],{37158:(e,t,s)=>{s.r(t),s.d(t,{default:()=>w});var n=s(85893),r=s(67294),l=s(21225),o=s(80676),a=s(21487),i=s(27603),c=s(56285),u=s(43761),d=s(88853),m=s(72723),p=s(11726),h=s(31294),Z=s(85704),f=s(18753),x=s(40410),j=s(98514),g=s(12365);let b=()=>new Worker(new URL(s.p+s.u(7600),s.b));function k(e){return{currentMatchupNum:0,currentPotNum:1,possiblePairings:null,pots:e.map(e=>(0,l.Z)(e)),matchups:Array.from({length:8},()=>[])}}let w=(0,r.memo)(function({season:e,pots:t}){let[s,l]=(0,i.Z)(),[w]=(0,c.Z)(),[{currentMatchupNum:y,currentPotNum:P,possiblePairings:$,pots:C,matchups:N},v]=(0,r.useState)(()=>k(t));(0,r.useEffect)(()=>{v(k(t))},[t,s]);let[,E]=(0,a.Z)(),[T]=(0,u.Z)(),M=(0,d.Z)(b),R=(0,r.useRef)(null),S=(0,r.useCallback)(async(t,s)=>{try{return await M({season:e,pots:t,matchups:s})}catch(e){throw E({error:"Could not determine possible pairings"}),e}},[e,M]),F=(0,r.useCallback)(async e=>{let t=C[P],s=$?$[e]:e,n=t[s],r=C.slice();r[P]=r[P].filter((e,t)=>t!==s);let l=N.slice();l[y]=[...l[y],n];let o=1===P?await S(r,l):null,a=y-P+1;v(e=>({...e,currentPotNum:1-P,currentMatchupNum:a,possiblePairings:o,pots:r,matchups:l}))},[C,N,P,y,$]),G=()=>{w||$?.length!==1&&(1!==P||1!==C[1].length)||F(0)};(0,r.useEffect)(()=>{setTimeout(G,250)},[P]);let A=(0,r.useMemo)(()=>$&&C[0].filter((e,t)=>$.includes(t)),[$]),D=y>=t[0].length;(0,r.useEffect)(()=>{if(w){let e=(A??C[1]).length;e>0&&F((0,o.Z)(e-1))}},[w,P]);let W=$?$.map(e=>C[0][e]):[];return(0,n.jsxs)(m.Z,{children:[(0,n.jsxs)(Z.Z,{children:[(0,n.jsx)(p.Z,{selectedTeams:W,initialPots:t,pots:C,currentPotNum:P}),(0,n.jsx)(h.Z,{ref:R,matchups:N})]}),(0,n.jsxs)(f.Z,{children:[!w&&(0,n.jsxs)(n.Fragment,{children:[!D&&(0,n.jsx)(j.Z,{children:"Runners-up"}),(0,n.jsx)(x.Z,{forceNoSelect:0===P,display:!D,displayTeams:T,selectedTeam:null,pot:C[1],onPick:F}),!D&&(0,n.jsx)(j.Z,{children:"Group Winners"}),A&&(0,n.jsx)(x.Z,{forceNoSelect:1===P,display:!D,displayTeams:T,selectedTeam:null,pot:A,onPick:F})]}),D&&(0,n.jsx)(g.Z,{long:!1,completed:D,selectedTeam:null,pickedGroup:null,possibleGroups:null,numGroups:0,groupsElement:R,reset:l})]})]})})},31294:(e,t,s)=>{s.d(t,{Z:()=>$});var n=s(85893),r=s(67294),l=s(70394),o=s(46202),a=s(1850),i=s(8360),c=s(73995),u=s(90595),d=s(63835),m=s(63494),p=s(79633),h=s(88834),Z=s(43955);let f=(0,l.F4)`
  from {
    background-color: rgb(255 255 0 / 0.5);
  }
`,x=(0,l.F4)`
  from {
    background-color: rgb(192 224 255 / 0.5);
  }
`,j=(0,l.iv)`
  animation: ${e=>e.theme.isDarkMode?x:f} 3s ease-out normal forwards;
`,g=(0,l.ZP)(i.Z)`
  width: 150px;
  ${e=>e.$picked&&j}
  ${e=>e.$styles}
`,b=(0,r.memo)(function({team:e}){let t=(0,u.Z)(e),[s,o]=(0,r.useState)(e),[a,i]=(0,r.useState)(!1),c=(0,r.useContext)(l.Ni),f=(0,r.useRef)(null),x=(0,r.useCallback)(()=>i(!1),[]),j=(0,r.useCallback)(()=>{o(e),i(!0)},[e]);return(0,d.Z)(()=>{x()},[c]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(g,{$picked:a&&!!s,onAnimationEnd:x,children:s?(0,n.jsx)(p.Z,{$country:(0,m.Z)(s),children:s.shortName??s.name}):(0,n.jsx)(h.Z,{ref:f})}),e&&e!==t&&(0,n.jsx)(Z.Z,{from:`[data-cellid='${e.id}']`,to:f,duration:350,team:e,onAnimationEnd:j})]})}),k=(0,l.ZP)(c.Z)`
  justify-content: center;
  width: 23px;
  color: ${e=>e.theme.isDarkMode?"#ccc":"#333"};

  &::before {
    content: 'v';
  }
`,w=(0,r.memo)(function({teams:e}){let[t,s]=e??[];return(0,n.jsxs)(a.Z,{children:[(0,n.jsx)(b,{team:t}),(0,n.jsx)(i.Z,{children:(0,n.jsx)(k,{})}),(0,n.jsx)(b,{team:s})]})}),y=(0,l.ZP)(o.Z)`
  align-self: center;
  width: auto;
  max-width: initial;
`,P=(0,r.forwardRef)(({matchups:e},t)=>(0,n.jsx)(y,{ref:t,children:(0,n.jsx)("tbody",{children:e?.map((e,t)=>n.jsx(w,{teams:e},t))})})),$=(0,r.memo)(P)},98514:(e,t,s)=>{s.d(t,{Z:()=>r});var n=s(70394);let r=n.ZP.div`
  margin-top: 10px;
  margin-bottom: 5px;
  user-select: none;
`}}]);