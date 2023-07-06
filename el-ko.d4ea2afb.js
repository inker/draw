"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[6349],{27045:(e,t,s)=>{s.r(t),s.d(t,{default:()=>C});var l=s(85893),n=s(67294),r=s(21225),i=s(96446),a=s(80676),o=s(40339),u=s(27603),c=s(56285),d=s(43761),m=s(12185),p=s(43510),h=s(72723),Z=s(11726),f=s(31294),x=s(85704),j=s(18753),g=s(40410),b=s(98514),k=s(12365);let w=()=>new Worker(new URL(s.p+s.u(7074),s.b));function y(e,t){return{currentMatchupNum:0,currentPotNum:1,possiblePairings:null,pots:e.map(e=>(0,r.Z)(e)),matchups:(0,i.Z)(t<2021?16:8).map(()=>[])}}function P({season:e,pots:t}){let[s,r]=(0,u.Z)(),[i,P]=(0,c.Z)(),[{currentMatchupNum:C,currentPotNum:N,possiblePairings:E,pots:v,matchups:T},M]=(0,n.useState)(()=>y(t,e));(0,n.useEffect)(()=>{M(y(t,e))},[t,e,s]);let R=(0,m.Z)("(min-height: 750px)"),[,S]=(0,o.Z)(),[$]=(0,d.Z)(),F=(0,p.Z)(w),G=(0,n.useRef)(null),A=(0,n.useCallback)(async(t,s)=>{try{let l=await F({season:e,pots:t,matchups:s});return l.possiblePairings}catch(e){throw S({error:"Could not determine possible pairings"}),e}},[e,F]),D=(0,n.useCallback)(async e=>{let t=E?E[e]:e,s=v[N][t],l=v.slice();l[N]=l[N].filter((e,s)=>s!==t);let n=T.slice();n[C]=[...n[C],s];let r=1===N?await A(l,n):null,i=C-N+1;M({currentPotNum:1-N,currentMatchupNum:i,possiblePairings:r,pots:l,matchups:n})},[v,T,N,C,E]),W=()=>{if(i)return;let e=E?.length===1||1===N&&1===v[1].length;e&&D(0)};(0,n.useEffect)(()=>{setTimeout(W,250)},[N]);let L=(0,n.useMemo)(()=>E&&v[0].filter((e,t)=>E.includes(t)),[E]),U=C>=t[0].length;(0,n.useEffect)(()=>{if(i){let e=L??v[1],t=e.length;if(t>0){let e=(0,a.Z)(t-1);D(e)}}},[i,N]),(0,n.useEffect)(()=>{U&&i&&P(!1)},[U,i]);let q=E?E.map(e=>v[0][e]):[];return(0,l.jsxs)(h.Z,{children:[(0,l.jsxs)(x.Z,{children:[(0,l.jsx)(Z.Z,{selectedTeams:q,initialPots:t,pots:v,currentPotNum:N,split:!R&&e<2021}),(0,l.jsx)(f.Z,{ref:G,matchups:T})]}),(0,l.jsxs)(j.Z,{children:[!i&&(0,l.jsxs)(l.Fragment,{children:[!U&&(0,l.jsx)(b.Z,{children:"Runners-up"}),(0,l.jsx)(g.Z,{forceNoSelect:0===N,display:!U,displayTeams:$,selectedTeam:null,pot:v[1],onPick:D}),!U&&(0,l.jsx)(b.Z,{children:"Group Winners"}),L&&(0,l.jsx)(g.Z,{forceNoSelect:1===N,display:!U,displayTeams:$,selectedTeam:null,pot:L,onPick:D})]}),U&&(0,l.jsx)(k.Z,{long:!1,completed:U,selectedTeam:null,pickedGroup:null,possibleGroups:null,numGroups:0,groupsElement:G,reset:r})]})]})}let C=(0,n.memo)(P)},31294:(e,t,s)=>{s.d(t,{Z:()=>E});var l=s(85893),n=s(67294),r=s(12788),i=s(46202),a=s(1850),o=s(8360),u=s(73995),c=s(90595),d=s(63835),m=s(63494),p=s(79633),h=s(88834),Z=s(43955);let f=(0,r.F4)`
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
  ${e=>e.picked&&j}
  ${e=>e.styles}
`;function b({team:e}){let t=(0,c.Z)(e),[s,i]=(0,n.useState)(e),[a,o]=(0,n.useState)(!1),u=(0,n.useContext)(r.Ni),f=(0,n.useRef)(null),x=(0,n.useCallback)(()=>o(!1),[]),j=(0,n.useCallback)(()=>{i(e),o(!0)},[e]);return(0,d.Z)(()=>{x()},[u]),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(g,{picked:a&&!!s,onAnimationEnd:x,children:s?(0,l.jsx)(p.Z,{country:(0,m.Z)(s),children:s.shortName??s.name}):(0,l.jsx)(h.Z,{ref:f})}),e&&e!==t&&(0,l.jsx)(Z.Z,{from:`[data-cellid='${e.id}']`,to:f,duration:350,team:e,onAnimationEnd:j})]})}let k=(0,n.memo)(b),w=(0,r.ZP)(u.Z)`
  justify-content: center;
  width: 23px;
  color: ${e=>e.theme.isDarkMode?"#ccc":"#333"};

  &::before {
    content: 'v';
  }
`;function y({teams:e}){let[t,s]=e??[];return(0,l.jsxs)(a.Z,{children:[(0,l.jsx)(k,{team:t}),(0,l.jsx)(o.Z,{children:(0,l.jsx)(w,{})}),(0,l.jsx)(k,{team:s})]})}let P=(0,n.memo)(y),C=(0,r.ZP)(i.Z)`
  align-self: center;
  width: auto;
  max-width: initial;
`,N=(0,n.forwardRef)(({matchups:e},t)=>(0,l.jsx)(C,{ref:t,children:(0,l.jsx)("tbody",{children:e?.map((e,t)=>l.jsx(P,{teams:e},t))})})),E=(0,n.memo)(N)},98514:(e,t,s)=>{s.d(t,{Z:()=>r});var l=s(12788);let n=l.ZP.div`
  margin-top: 10px;
  margin-bottom: 5px;
  user-select: none;
`,r=n}}]);