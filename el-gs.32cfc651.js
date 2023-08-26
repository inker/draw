"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[3602],{71158:(e,r,o)=>{o.r(r),o.d(r,{default:()=>v});var s=o(85893),t=o(67294),l=o(70394),n=o(21225),i=o(80676),a=o(40339),u=o(27603),c=o(56285),d=o(43761),f=o(43510),p=o(72723),m=o(11726),h=o(80528),x=o(85704),b=o(18753),Z=o(40410),g=o(12365);let k=()=>new Worker(new URL(o.p+o.u(3091),o.b)),j=(0,l.iv)`
  background-color: ${e=>e.theme.isDarkMode?"#933":"#ffc0c0"};
`,w=(0,l.iv)`
  background-color: ${e=>e.theme.isDarkMode?"#039":"#c0e0ff"};
`;function $(e){let r=e.map(e=>(0,n.Z)(e)),o=r[0];return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:o,pots:r,groups:e[0].map(()=>[])}}let v=(0,t.memo)(function({season:e,pots:r}){let[o,l]=(0,u.Z)(),[n,v]=(0,c.Z)(),[{currentPotNum:y,selectedTeam:C,pickedGroup:E,hungPot:G,pots:P,groups:D},T]=(0,t.useState)(()=>$(r));(0,t.useEffect)(()=>{T($(r))},[r,o]);let[,M]=(0,a.Z)(),[N]=(0,d.Z)(),F=(0,f.Z)(k),R=(0,t.useRef)(null),S=async()=>{let r;if(!C)throw Error("no selected team");try{let o=await F({season:e,pots:P,groups:D,selectedTeam:C});r=o.pickedGroup}catch(e){console.error(e),M({error:"Could not determine the group"});return}let o=D.slice();o[r]=[...o[r],C];let s=P[y].length>0?y:y+1;T({selectedTeam:null,pickedGroup:r,hungPot:P[s],currentPotNum:s,pots:P,groups:o})},A=(0,t.useCallback)(e=>{if(C)return;let r=P[y],o=r[e];if(!o)return;let s=P.slice();s[y]=s[y].filter((r,o)=>o!==e),T({currentPotNum:y,hungPot:G,selectedTeam:o,pickedGroup:null,pots:s,groups:D})},[P,D,y,G,C]);(0,t.useEffect)(()=>{C&&S()},[C]);let L=y>=P.length;(0,t.useEffect)(()=>{let e=G?.length;if(n&&e){let r=(0,i.Z)(e-1);A(r)}},[n,G]),(0,t.useEffect)(()=>{L&&n&&v(!1)},[L,n]);let U=D.length,W=(0,t.useCallback)(e=>e<U>>1?j:w,[U]);return(0,s.jsxs)(p.Z,{children:[(0,s.jsxs)(x.Z,{children:[(0,s.jsx)(m.Z,{selectedTeams:C&&[C],initialPots:r,pots:P,currentPotNum:y}),(0,s.jsx)(h.Z,{ref:R,maxTeams:P.length,currentPotNum:y,groups:D,possibleGroups:null,getGroupHeaderStyles:W})]}),(0,s.jsxs)(b.Z,{children:[!n&&(0,s.jsx)(Z.Z,{forceNoSelect:!!C,display:!L,displayTeams:N,selectedTeam:C,pot:G,onPick:A}),(0,s.jsx)(g.Z,{long:!0,completed:L,selectedTeam:C,pickedGroup:E,possibleGroups:null,isDisplayPossibleGroupsText:!!C,numGroups:U,groupsElement:R,reset:l})]})]})})},80528:(e,r,o)=>{o.d(r,{Z:()=>G});var s=o(85893),t=o(67294),l=o(70394),n=o(40726),i=o(46202),a=o(48606),u=o(1850),c=o(8360),d=o(90595),f=o(63835),p=o(63494),m=o(79633),h=o(88834),x=o(43955);let b=(0,l.F4)`
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
`,v=(0,t.memo)(function({team:e,possible:r}){let o=(0,d.Z)(e),[n,i]=(0,t.useState)(e),[a,u]=(0,t.useState)(!1),c=(0,t.useContext)(l.Ni),b=(0,t.useRef)(null),Z=(0,t.useCallback)(()=>u(!1),[]),g=(0,t.useCallback)(()=>{i(e),u(!0)},[e]);return(0,f.Z)(()=>{Z()},[c]),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)($,{$picked:a&&!!n,$possible:r,onAnimationEnd:Z,children:n?(0,s.jsx)(m.Z,{$country:(0,p.Z)(n),children:n.shortName??n.name}):(0,s.jsx)(h.Z,{ref:b})}),e&&e!==o&&(0,s.jsx)(x.Z,{from:`[data-cellid='${e.id}']`,to:b,duration:350,team:e,onAnimationEnd:g})]})}),y=(0,t.memo)(function({maxTeams:e,groupLetter:r,teams:o,potNum:t,possible:l,headerStyles:n}){return(0,s.jsxs)(i.Z,{children:[(0,s.jsx)("thead",{children:(0,s.jsx)(u.Z,{children:(0,s.jsx)(c.Z,{children:(0,s.jsxs)(a.Z,{$styles:n,children:["Group"," ",r]})})})}),(0,s.jsx)("tbody",{children:Array.from({length:e},(e,r)=>(0,s.jsx)(u.Z,{children:(0,s.jsx)(v,{team:o[r],possible:r===t&&l})},r))})]})}),C=l.ZP.div`
  display: flex;
  flex-flow: row wrap;

  > * {
    flex: 1;
    flex-basis: 22%;
  }
`,E=(0,t.forwardRef)(({maxTeams:e,currentPotNum:r,groups:o,possibleGroups:t,getGroupHeaderStyles:l},i)=>(0,s.jsx)(C,{ref:i,children:o?.map((o,i)=>{let a=n.Z(i),u=l?.(i);return s.jsx(y,{maxTeams:e,groupLetter:a,teams:o,potNum:r,possible:!!t?.includes(i),headerStyles:u},a)})})),G=(0,t.memo)(E)}}]);