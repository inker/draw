"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[3602],{71158:(e,r,o)=>{o.r(r),o.d(r,{default:()=>v});var s=o(85893),t=o(67294),l=o(70394),n=o(21225),i=o(80676),a=o(21487),u=o(27603),c=o(56285),d=o(43761),p=o(43510),m=o(72723),f=o(11726),h=o(80528),x=o(85704),b=o(18753),Z=o(40410),g=o(12365);let k=()=>new Worker(new URL(o.p+o.u(3091),o.b)),j=(0,l.iv)`
  background-color: ${e=>e.theme.isDarkMode?"#933":"#ffc0c0"};
`,w=(0,l.iv)`
  background-color: ${e=>e.theme.isDarkMode?"#039":"#c0e0ff"};
`;function $(e){let r=e.map(e=>(0,n.Z)(e)),o=r[0];return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:o,pots:r,groups:e[0].map(()=>[])}}let v=(0,t.memo)(function({season:e,pots:r}){let[o,l]=(0,u.Z)(),[n]=(0,c.Z)(),[{currentPotNum:v,selectedTeam:y,pickedGroup:C,hungPot:G,pots:P,groups:D},E]=(0,t.useState)(()=>$(r));(0,t.useEffect)(()=>{E($(r))},[r,o]);let[,T]=(0,a.Z)(),[M]=(0,d.Z)(),N=(0,p.Z)(k),F=(0,t.useRef)(null),R=async()=>{let r;if(!y)throw Error("no selected team");try{let o=await N({season:e,pots:P,groups:D,selectedTeam:y});r=o.pickedGroup}catch(e){console.error(e),T({error:"Could not determine the group"});return}let o=D.slice();o[r]=[...o[r],y];let s=P[v].length>0?v:v+1;E(e=>({...e,selectedTeam:null,pickedGroup:r,hungPot:P[s],currentPotNum:s,groups:o}))},S=(0,t.useCallback)(e=>{if(y)return;let r=P[v],o=r[e];if(!o)return;let s=P.slice();s[v]=s[v].filter((r,o)=>o!==e),E(e=>({...e,selectedTeam:o,pickedGroup:null,pots:s}))},[P,v,y]);(0,t.useEffect)(()=>{y&&R()},[y]);let A=v>=P.length;(0,t.useEffect)(()=>{let e=G?.length;if(n&&e){let r=(0,i.Z)(e-1);S(r)}},[n,G]);let L=D.length,U=(0,t.useCallback)(e=>e<L>>1?j:w,[L]);return(0,s.jsxs)(m.Z,{children:[(0,s.jsxs)(x.Z,{children:[(0,s.jsx)(f.Z,{selectedTeams:y&&[y],initialPots:r,pots:P,currentPotNum:v}),(0,s.jsx)(h.Z,{ref:F,maxTeams:P.length,currentPotNum:v,groups:D,possibleGroups:null,getGroupHeaderStyles:U})]}),(0,s.jsxs)(b.Z,{children:[!n&&(0,s.jsx)(Z.Z,{forceNoSelect:!!y,display:!A,displayTeams:M,selectedTeam:y,pot:G,onPick:S}),(0,s.jsx)(g.Z,{long:!0,completed:A,selectedTeam:y,pickedGroup:C,possibleGroups:null,isDisplayPossibleGroupsText:!!y,numGroups:L,groupsElement:F,reset:l})]})]})})},80528:(e,r,o)=>{o.d(r,{Z:()=>P});var s=o(85893),t=o(67294),l=o(70394),n=o(40726),i=o(46202),a=o(48606),u=o(1850),c=o(8360),d=o(90595),p=o(63835),m=o(63494),f=o(79633),h=o(88834),x=o(43955);let b=(0,l.F4)`
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
`,v=(0,t.memo)(function({team:e,possible:r}){let o=(0,d.Z)(e),[n,i]=(0,t.useState)(e),[a,u]=(0,t.useState)(!1),c=(0,t.useContext)(l.Ni),b=(0,t.useRef)(null),Z=(0,t.useCallback)(()=>u(!1),[]),g=(0,t.useCallback)(()=>{i(e),u(!0)},[e]);return(0,p.Z)(()=>{Z()},[c]),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)($,{$picked:a&&!!n,$possible:r,onAnimationEnd:Z,children:n?(0,s.jsx)(f.Z,{$country:(0,m.Z)(n),children:n.shortName??n.name}):(0,s.jsx)(h.Z,{ref:b})}),e&&e!==o&&(0,s.jsx)(x.Z,{from:`[data-cellid='${e.id}']`,to:b,duration:350,team:e,onAnimationEnd:g})]})}),y=(0,t.memo)(function({maxTeams:e,groupLetter:r,teams:o,potNum:t,possible:l,headerStyles:n}){return(0,s.jsxs)(i.Z,{children:[(0,s.jsx)("thead",{children:(0,s.jsx)(u.Z,{children:(0,s.jsx)(c.Z,{children:(0,s.jsxs)(a.Z,{$styles:n,children:["Group"," ",r]})})})}),(0,s.jsx)("tbody",{children:Array.from({length:e},(e,r)=>(0,s.jsx)(u.Z,{children:(0,s.jsx)(v,{team:o[r],possible:r===t&&l})},r))})]})}),C=l.ZP.div`
  display: flex;
  flex-flow: row wrap;

  > * {
    flex: 1;
    flex-basis: 22%;
  }
`,G=(0,t.forwardRef)(({maxTeams:e,currentPotNum:r,groups:o,possibleGroups:t,getGroupHeaderStyles:l},i)=>(0,s.jsx)(C,{ref:i,children:o?.map((o,i)=>{let a=n.Z(i),u=l?.(i);return s.jsx(y,{maxTeams:e,groupLetter:a,teams:o,potNum:r,possible:!!t?.includes(i),headerStyles:u},a)})})),P=(0,t.memo)(G)}}]);