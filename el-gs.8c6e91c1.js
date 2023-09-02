"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[3602],{71158:(e,r,o)=>{o.r(r),o.d(r,{default:()=>y});var s=o(85893),t=o(67294),l=o(70394),n=o(21225),i=o(80676),a=o(21487),u=o(27603),c=o(56285),d=o(43761),f=o(34675),p=o(43510),m=o(72723),h=o(11726),x=o(80528),b=o(85704),Z=o(18753),g=o(40410),k=o(12365);let j=()=>new Worker(new URL(o.p+o.u(3091),o.b)),w=(0,l.iv)`
  background-color: ${e=>e.theme.isDarkMode?"#933":"#ffc0c0"};
`,$=(0,l.iv)`
  background-color: ${e=>e.theme.isDarkMode?"#039":"#c0e0ff"};
`;function v(e){let r=e.map(e=>(0,n.Z)(e)),o=r[0];return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:o,pots:r,groups:e[0].map(()=>[])}}let y=(0,t.memo)(function({season:e,pots:r}){let[o,l]=(0,u.Z)(),[n,y]=(0,c.Z)(),[{currentPotNum:C,selectedTeam:E,pickedGroup:G,hungPot:P,pots:D,groups:T},M]=(0,t.useState)(()=>v(r)),N=(0,f.Z)(M);(0,t.useEffect)(()=>{N(v(r))},[r,o]);let[,F]=(0,a.Z)(),[R]=(0,d.Z)(),S=(0,p.Z)(j),A=(0,t.useRef)(null),L=async()=>{let r;if(!E)throw Error("no selected team");try{let o=await S({season:e,pots:D,groups:T,selectedTeam:E});r=o.pickedGroup}catch(e){console.error(e),F({error:"Could not determine the group"});return}let o=T.slice();o[r]=[...o[r],E];let s=D[C].length>0?C:C+1;N({selectedTeam:null,pickedGroup:r,hungPot:D[s],currentPotNum:s,groups:o})},U=(0,t.useCallback)(e=>{if(E)return;let r=D[C],o=r[e];if(!o)return;let s=D.slice();s[C]=s[C].filter((r,o)=>o!==e),N({selectedTeam:o,pickedGroup:null,pots:s})},[D,C,E]);(0,t.useEffect)(()=>{E&&L()},[E]);let W=C>=D.length;(0,t.useEffect)(()=>{let e=P?.length;if(n&&e){let r=(0,i.Z)(e-1);U(r)}},[n,P]),(0,t.useEffect)(()=>{W&&n&&y(!1)},[W,n]);let q=T.length,z=(0,t.useCallback)(e=>e<q>>1?w:$,[q]);return(0,s.jsxs)(m.Z,{children:[(0,s.jsxs)(b.Z,{children:[(0,s.jsx)(h.Z,{selectedTeams:E&&[E],initialPots:r,pots:D,currentPotNum:C}),(0,s.jsx)(x.Z,{ref:A,maxTeams:D.length,currentPotNum:C,groups:T,possibleGroups:null,getGroupHeaderStyles:z})]}),(0,s.jsxs)(Z.Z,{children:[!n&&(0,s.jsx)(g.Z,{forceNoSelect:!!E,display:!W,displayTeams:R,selectedTeam:E,pot:P,onPick:U}),(0,s.jsx)(k.Z,{long:!0,completed:W,selectedTeam:E,pickedGroup:G,possibleGroups:null,isDisplayPossibleGroupsText:!!E,numGroups:q,groupsElement:A,reset:l})]})]})})},80528:(e,r,o)=>{o.d(r,{Z:()=>G});var s=o(85893),t=o(67294),l=o(70394),n=o(40726),i=o(46202),a=o(48606),u=o(1850),c=o(8360),d=o(90595),f=o(63835),p=o(63494),m=o(79633),h=o(88834),x=o(43955);let b=(0,l.F4)`
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