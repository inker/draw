"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[5527],{72331:(e,r,o)=>{o.r(r),o.d(r,{default:()=>v});var t=o(85893),s=o(67294),l=o(70394),n=o(62002),i=o(21225),a=o(80676),u=o(21487),c=o(27603),d=o(56285),p=o(43761),m=o(88853),f=o(72723),h=o(11726),x=o(80528),b=o(85704),Z=o(18753),g=o(40410),k=o(12365);let j=()=>new Worker(new URL(o.p+o.u(3930),o.b)),w=(0,n.Z)((0,l.iv)`
  background-color: ${e=>e.theme.isDarkMode?"#363":"#c0e0c0"};
`);function $(e){let r=e.map(e=>(0,i.Z)(e)),o=r[0];return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:o,pots:r,groups:e[0].map(()=>[])}}let v=(0,s.memo)(function({season:e,pots:r}){let[o,l]=(0,c.Z)(),[n]=(0,d.Z)(),[{currentPotNum:i,selectedTeam:v,pickedGroup:y,hungPot:E,pots:G,groups:P},C]=(0,s.useState)(()=>$(r));(0,s.useEffect)(()=>{C($(r))},[r,o]);let[,T]=(0,u.Z)(),[D]=(0,p.Z)(),N=(0,m.Z)(j),F=(0,s.useRef)(null),M=async()=>{let r;if(!v)throw Error("no selected team");try{let o=await N({season:e,pots:G,groups:P,selectedTeam:v});r=o.pickedGroup}catch(e){console.error(e),T({error:"Could not determine the group"});return}let o=P.slice();o[r]=[...o[r],v];let t=G[i].length>0?i:i+1;C(e=>({...e,selectedTeam:null,pickedGroup:r,hungPot:G[t],currentPotNum:t,groups:o}))},R=(0,s.useCallback)(e=>{if(v)return;let r=G[i],o=r[e];if(!o)return;let t=G.slice();t[i]=t[i].filter((r,o)=>o!==e),C(e=>({...e,selectedTeam:o,pickedGroup:null,pots:t}))},[G,i,v]);(0,s.useEffect)(()=>{v&&M()},[v]),(0,s.useEffect)(()=>{let e=G[i].findIndex(e=>e.host);R(e)},[G]);let S=i>=G.length;(0,s.useEffect)(()=>{let e=E?.length;if(n&&e){let r=(0,a.Z)(e-1);R(r)}},[n,E]);let A=P.length;return(0,t.jsxs)(f.Z,{children:[(0,t.jsxs)(b.Z,{children:[(0,t.jsx)(h.Z,{selectedTeams:v&&[v],initialPots:r,pots:G,currentPotNum:i}),(0,t.jsx)(x.Z,{ref:F,maxTeams:G.length,currentPotNum:i,groups:P,possibleGroups:null,getGroupHeaderStyles:w})]}),(0,t.jsxs)(Z.Z,{children:[!n&&(0,t.jsx)(g.Z,{forceNoSelect:!!v,display:!S,displayTeams:D,selectedTeam:v,pot:E,onPick:R}),(0,t.jsx)(k.Z,{long:!0,completed:S,selectedTeam:v,pickedGroup:y,possibleGroups:null,isDisplayPossibleGroupsText:!!v,numGroups:A,groupsElement:F,reset:l})]})]})})},80528:(e,r,o)=>{o.d(r,{Z:()=>P});var t=o(85893),s=o(67294),l=o(70394),n=o(40726),i=o(46202),a=o(48606),u=o(1850),c=o(8360),d=o(90595),p=o(63835),m=o(63494),f=o(79633),h=o(88834),x=o(43955);let b=(0,l.F4)`
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
`,v=(0,s.memo)(function({team:e,possible:r}){let o=(0,d.Z)(e),[n,i]=(0,s.useState)(e),[a,u]=(0,s.useState)(!1),c=(0,s.useContext)(l.Ni),b=(0,s.useRef)(null),Z=(0,s.useCallback)(()=>u(!1),[]),g=(0,s.useCallback)(()=>{i(e),u(!0)},[e]);return(0,p.Z)(()=>{Z()},[c]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)($,{$picked:a&&!!n,$possible:r,onAnimationEnd:Z,children:n?(0,t.jsx)(f.Z,{$country:(0,m.Z)(n),children:n.shortName??n.name}):(0,t.jsx)(h.Z,{ref:b})}),e&&e!==o&&(0,t.jsx)(x.Z,{from:`[data-cellid='${e.id}']`,to:b,duration:350,team:e,onAnimationEnd:g})]})}),y=(0,s.memo)(function({maxTeams:e,groupLetter:r,teams:o,potNum:s,possible:l,headerStyles:n}){return(0,t.jsxs)(i.Z,{children:[(0,t.jsx)("thead",{children:(0,t.jsx)(u.Z,{children:(0,t.jsx)(c.Z,{children:(0,t.jsxs)(a.Z,{$styles:n,children:["Group"," ",r]})})})}),(0,t.jsx)("tbody",{children:Array.from({length:e},(e,r)=>(0,t.jsx)(u.Z,{children:(0,t.jsx)(v,{team:o[r],possible:r===s&&l})},r))})]})}),E=l.ZP.div`
  display: flex;
  flex-flow: row wrap;

  > * {
    flex: 1;
    flex-basis: 22%;
  }
`,G=(0,s.forwardRef)(({maxTeams:e,currentPotNum:r,groups:o,possibleGroups:s,getGroupHeaderStyles:l},i)=>(0,t.jsx)(E,{ref:i,children:o?.map((o,i)=>{let a=n.Z(i),u=l?.(i);return t.jsx(y,{maxTeams:e,groupLetter:a,teams:o,potNum:r,possible:!!s?.includes(i),headerStyles:u},a)})})),P=(0,s.memo)(G)}}]);