"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[5527],{72331:(e,r,o)=>{o.r(r),o.d(r,{default:()=>v});var s=o(85893),t=o(67294),l=o(70394),n=o(62002),i=o(21225),a=o(80676),u=o(21487),c=o(27603),d=o(56285),m=o(43761),p=o(88853),f=o(72723),h=o(11726),x=o(80528),b=o(85704),Z=o(18753),g=o(40410),k=o(12365);let j=()=>new Worker(new URL(o.p+o.u(3930),o.b)),w=(0,n.Z)((0,l.iv)`
  background-color: ${e=>e.theme.isDarkMode?"#363":"#c0e0c0"};
`);function $(e){let r=e.map(e=>(0,i.Z)(e));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:r[0],pots:r,groups:e[0].map(()=>[])}}let v=(0,t.memo)(function({season:e,pots:r}){let[o,l]=(0,c.Z)(),[n]=(0,d.Z)(),[{currentPotNum:i,selectedTeam:v,pickedGroup:y,hungPot:E,pots:P,groups:C},G]=(0,t.useState)(()=>$(r));(0,t.useEffect)(()=>{G($(r))},[r,o]);let[,T]=(0,u.Z)(),[D]=(0,m.Z)(),N=(0,p.Z)(j),F=(0,t.useRef)(null),M=async()=>{let r;if(!v)throw Error("no selected team");try{r=await N({season:e,pots:P,groups:C,selectedTeam:v})}catch(e){console.error(e),T({error:"Could not determine the group"});return}let o=C.slice();o[r]=[...o[r],v];let s=P[i].length>0?i:i+1;G(e=>({...e,selectedTeam:null,pickedGroup:r,hungPot:P[s],currentPotNum:s,groups:o}))},R=(0,t.useCallback)(e=>{if(v)return;let r=P[i][e];if(!r)return;let o=P.slice();o[i]=o[i].filter((r,o)=>o!==e),G(e=>({...e,selectedTeam:r,pickedGroup:null,pots:o}))},[P,i,v]);(0,t.useEffect)(()=>{v&&M()},[v]),(0,t.useEffect)(()=>{R(P[i].findIndex(e=>e.host))},[P]);let S=i>=P.length;(0,t.useEffect)(()=>{let e=E?.length;n&&e&&R((0,a.Z)(e-1))},[n,E]);let A=C.length;return(0,s.jsxs)(f.Z,{children:[(0,s.jsxs)(b.Z,{children:[(0,s.jsx)(h.Z,{selectedTeams:v&&[v],initialPots:r,pots:P,currentPotNum:i}),(0,s.jsx)(x.Z,{ref:F,maxTeams:P.length,currentPotNum:i,groups:C,possibleGroups:null,getGroupHeaderStyles:w})]}),(0,s.jsxs)(Z.Z,{children:[!n&&(0,s.jsx)(g.Z,{forceNoSelect:!!v,display:!S,displayTeams:D,selectedTeam:v,pot:E,onPick:R}),(0,s.jsx)(k.Z,{long:!0,completed:S,selectedTeam:v,pickedGroup:y,possibleGroups:null,isDisplayPossibleGroupsText:!!v,numGroups:A,groupsElement:F,reset:l})]})]})})},80528:(e,r,o)=>{o.d(r,{Z:()=>C});var s=o(85893),t=o(67294),l=o(70394),n=o(40726),i=o(46202),a=o(48606),u=o(1850),c=o(8360),d=o(90595),m=o(63835),p=o(63494),f=o(79633),h=o(88834),x=o(43955);let b=(0,l.F4)`
  from {
    box-shadow: 0 0 20px #08f;
  }
`,Z=(0,l.F4)`
  from {
    background-color: rgb(255 255 255 / 0.5);
  }
`,g=(0,l.F4)`
  from {
    background-color: rgb(255 255 0 / 0.5);
  }
`,k=(0,l.F4)`
  from {
    background-color: rgb(192 224 255 / 0.5);
  }
`,j=(0,l.iv)`
  position: relative; /* enables glow */
  ${e=>e.theme.isDarkMode?(0,l.iv)`
      background-color: rgb(255 255 255 / 0.3);
    `:(0,l.iv)`
      box-shadow: 0 0 5px #6af;
    `}

  &::before {
    content: '';
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    animation: ${e=>e.theme.isDarkMode?Z:b} 1s ease;
    ${e=>e.theme.isDarkMode?(0,l.iv)`
      background-color: rgb(255 255 255 / 0.3);
    `:(0,l.iv)`
      box-shadow: 0 0 5px #6af;
    `}
  }
`,w=(0,l.iv)`
  animation: ${e=>e.theme.isDarkMode?k:g} 3s ease-out normal forwards;
`,$=(0,l.ZP)(c.Z)`
  ${e=>e.$possible&&j}
  ${e=>e.$picked&&w}
`,v=(0,t.memo)(function({team:e,possible:r}){let o=(0,d.Z)(e),[n,i]=(0,t.useState)(e),[a,u]=(0,t.useState)(!1),c=(0,t.useContext)(l.Ni),b=(0,t.useRef)(null),Z=(0,t.useCallback)(()=>u(!1),[]),g=(0,t.useCallback)(()=>{i(e),u(!0)},[e]);return(0,m.Z)(()=>{Z()},[c]),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)($,{$picked:a&&!!n,$possible:r,onAnimationEnd:Z,children:n?(0,s.jsx)(f.Z,{$country:(0,p.Z)(n),children:n.shortName??n.name}):(0,s.jsx)(h.Z,{ref:b})}),e&&e!==o&&(0,s.jsx)(x.Z,{from:`[data-cellid='${e.id}']`,to:b,duration:350,team:e,onAnimationEnd:g})]})}),y=(0,t.memo)(function({maxTeams:e,groupLetter:r,teams:o,potNum:t,possible:l,headerStyles:n}){return(0,s.jsxs)(i.Z,{children:[(0,s.jsx)("thead",{children:(0,s.jsx)(u.Z,{children:(0,s.jsx)(c.Z,{children:(0,s.jsxs)(a.Z,{$styles:n,children:["Group"," ",r]})})})}),(0,s.jsx)("tbody",{children:Array.from({length:e},(e,r)=>(0,s.jsx)(u.Z,{children:(0,s.jsx)(v,{team:o[r],possible:r===t&&l})},r))})]})}),E=l.ZP.div`
  display: flex;
  flex-flow: row wrap;

  > * {
    flex: 1;
    flex-basis: 22%;
  }
`,P=(0,t.forwardRef)(({maxTeams:e,currentPotNum:r,groups:o,possibleGroups:t,getGroupHeaderStyles:l},i)=>(0,s.jsx)(E,{ref:i,children:o?.map((o,i)=>{let a=n.Z(i),u=l?.(i);return s.jsx(y,{maxTeams:e,groupLetter:a,teams:o,potNum:r,possible:!!t?.includes(i),headerStyles:u},a)})})),C=(0,t.memo)(P)}}]);