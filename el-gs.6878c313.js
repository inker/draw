"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[3602],{71158:(e,r,o)=>{o.r(r),o.d(r,{default:()=>v});var s=o(85893),t=o(67294),l=o(70394),n=o(21225),i=o(80676),a=o(40339),u=o(27603),c=o(56285),d=o(43761),p=o(43510),f=o(72723),m=o(11726),h=o(80528),x=o(85704),b=o(18753),Z=o(40410),k=o(12365);let g=()=>new Worker(new URL(o.p+o.u(3091),o.b)),j=(0,l.iv)`
  background-color: ${e=>e.theme.isDarkMode?"#933":"#ffc0c0"};
`,w=(0,l.iv)`
  background-color: ${e=>e.theme.isDarkMode?"#039":"#c0e0ff"};
`;function $(e){let r=e.map(e=>(0,n.Z)(e)),o=r[0];return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:o,pots:r,groups:e[0].map(()=>[])}}let v=(0,t.memo)(function({season:e,pots:r}){let[o,l]=(0,u.Z)(),[n,v]=(0,c.Z)(),[{currentPotNum:y,selectedTeam:C,pickedGroup:E,hungPot:G,pots:P,groups:D},T]=(0,t.useState)(()=>$(r));(0,t.useEffect)(()=>{T($(r))},[r,o]);let[,M]=(0,a.Z)(),[N]=(0,d.Z)(),F=(0,p.Z)(g),R=(0,t.useRef)(null),S=async()=>{let r;if(!C)throw Error("no selected team");try{let o=await F({season:e,pots:P,groups:D,selectedTeam:C});r=o.pickedGroup}catch(e){console.error(e),M({error:"Could not determine the group"});return}let o=D.slice();o[r]=[...o[r],C];let s=P[y].length>0?y:y+1;T({selectedTeam:null,pickedGroup:r,hungPot:P[s],currentPotNum:s,pots:P,groups:o})},A=(0,t.useCallback)(e=>{if(C)return;let r=P[y][e];if(!r)return;let o=P.slice();o[y]=o[y].filter((r,o)=>o!==e),T({currentPotNum:y,hungPot:G,selectedTeam:r,pickedGroup:null,pots:o,groups:D})},[P,D,y,G,C]);(0,t.useEffect)(()=>{C&&S()},[C]);let L=y>=P.length;(0,t.useEffect)(()=>{let e=G?.length;if(n&&e){let r=(0,i.Z)(e-1);A(r)}},[n,G]),(0,t.useEffect)(()=>{L&&n&&v(!1)},[L,n]);let U=D.length,W=(0,t.useCallback)(e=>e<U>>1?j:w,[U]);return(0,s.jsxs)(f.Z,{children:[(0,s.jsxs)(x.Z,{children:[(0,s.jsx)(m.Z,{selectedTeams:C&&[C],initialPots:r,pots:P,currentPotNum:y}),(0,s.jsx)(h.Z,{ref:R,maxTeams:P.length,currentPotNum:y,groups:D,possibleGroups:null,getGroupHeaderStyles:W})]}),(0,s.jsxs)(b.Z,{children:[!n&&(0,s.jsx)(Z.Z,{forceNoSelect:!!C,display:!L,displayTeams:N,selectedTeam:C,pot:G,onPick:A}),(0,s.jsx)(k.Z,{long:!0,completed:L,selectedTeam:C,pickedGroup:E,possibleGroups:null,isDisplayPossibleGroupsText:!!C,numGroups:U,groupsElement:R,reset:l})]})]})})},80528:(e,r,o)=>{o.d(r,{Z:()=>P});var s=o(85893),t=o(67294),l=o(70394),n=o(40726),i=o(96446),a=o(46202),u=o(48606),c=o(1850),d=o(8360),p=o(90595),f=o(63835),m=o(63494),h=o(79633),x=o(88834),b=o(43955);let Z=(0,l.F4)`
  from {
    box-shadow: 0 0 20px #08f;
  }
`,k=(0,l.F4)`
  from {
    background-color: rgb(255 255 255 / 0.5);
  }
`,g=(0,l.F4)`
  from {
    background-color: rgb(255 255 0 / 0.5);
  }
`,j=(0,l.F4)`
  from {
    background-color: rgb(192 224 255 / 0.5);
  }
`,w=(0,l.iv)`
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
    animation: ${e=>e.theme.isDarkMode?k:Z} 1s ease;
    ${e=>e.theme.isDarkMode?(0,l.iv)`
      background-color: rgb(255 255 255 / 0.3);
    `:(0,l.iv)`
      box-shadow: 0 0 5px #6af;
    `}
  }
`,$=(0,l.iv)`
  animation: ${e=>e.theme.isDarkMode?j:g} 3s ease-out normal forwards;
`,v=(0,l.ZP)(d.Z)`
  ${e=>e.$possible&&w}
  ${e=>e.$picked&&$}
`,y=(0,t.memo)(function({team:e,possible:r}){let o=(0,p.Z)(e),[n,i]=(0,t.useState)(e),[a,u]=(0,t.useState)(!1),c=(0,t.useContext)(l.Ni),d=(0,t.useRef)(null),Z=(0,t.useCallback)(()=>u(!1),[]),k=(0,t.useCallback)(()=>{i(e),u(!0)},[e]);return(0,f.Z)(()=>{Z()},[c]),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(v,{$picked:a&&!!n,$possible:r,onAnimationEnd:Z,children:n?(0,s.jsx)(h.Z,{$country:(0,m.Z)(n),children:n.shortName??n.name}):(0,s.jsx)(x.Z,{ref:d})}),e&&e!==o&&(0,s.jsx)(b.Z,{from:`[data-cellid='${e.id}']`,to:d,duration:350,team:e,onAnimationEnd:k})]})}),C=(0,t.memo)(function({maxTeams:e,groupLetter:r,teams:o,potNum:t,possible:l,headerStyles:n}){return(0,s.jsxs)(a.Z,{children:[(0,s.jsx)("thead",{children:(0,s.jsx)(c.Z,{children:(0,s.jsx)(d.Z,{children:(0,s.jsxs)(u.Z,{$styles:n,children:["Group"," ",r]})})})}),(0,s.jsx)("tbody",{children:(0,i.Z)(e).map(e=>(0,s.jsx)(c.Z,{children:(0,s.jsx)(y,{team:o[e],possible:e===t&&l})},e))})]})}),E=l.ZP.div`
  display: flex;
  flex-flow: row wrap;

  > * {
    flex: 1;
    flex-basis: 22%;
  }
`,G=(0,t.forwardRef)(({maxTeams:e,currentPotNum:r,groups:o,possibleGroups:t,getGroupHeaderStyles:l},i)=>(0,s.jsx)(E,{ref:i,children:o?.map((o,i)=>{let a=n.Z(i),u=l?.(i);return s.jsx(C,{maxTeams:e,groupLetter:a,teams:o,potNum:r,possible:!!t?.includes(i),headerStyles:u},a)})})),P=(0,t.memo)(G)}}]);