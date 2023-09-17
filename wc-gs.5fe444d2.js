"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[5527],{72331:(e,r,t)=>{t.r(r),t.d(r,{default:()=>v});var o=t(85893),s=t(67294),l=t(70394),n=t(62002),i=t(21225),a=t(80676),u=t(21487),c=t(27603),d=t(56285),m=t(43761),p=t(88853),f=t(72723),h=t(11726),x=t(80528),b=t(85704),Z=t(18753),g=t(40410),k=t(12365);let j=()=>new Worker(new URL(t.p+t.u(3930),t.b)),w=(0,n.Z)((0,l.iv)`
  background-color: ${e=>e.theme.isDarkMode?"#363":"#c0e0c0"};
`);function $(e){let r=e.map(e=>(0,i.Z)(e)),t=r[0];return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:t,pots:r,groups:e[0].map(()=>[])}}let v=(0,s.memo)(function({season:e,pots:r}){let[t,l]=(0,c.Z)(),[n]=(0,d.Z)(),[{currentPotNum:i,selectedTeam:v,pickedGroup:y,hungPot:E,pots:P,groups:C},G]=(0,s.useState)(()=>$(r));(0,s.useEffect)(()=>{G($(r))},[r,t]);let[,T]=(0,u.Z)(),[D]=(0,m.Z)(),N=(0,p.Z)(j),F=(0,s.useRef)(null),M=async()=>{let r;if(!v)throw Error("no selected team");try{let t=await N({season:e,pots:P,groups:C,selectedTeam:v});r=t}catch(e){console.error(e),T({error:"Could not determine the group"});return}let t=C.slice();t[r]=[...t[r],v];let o=P[i].length>0?i:i+1;G(e=>({...e,selectedTeam:null,pickedGroup:r,hungPot:P[o],currentPotNum:o,groups:t}))},R=(0,s.useCallback)(e=>{if(v)return;let r=P[i],t=r[e];if(!t)return;let o=P.slice();o[i]=o[i].filter((r,t)=>t!==e),G(e=>({...e,selectedTeam:t,pickedGroup:null,pots:o}))},[P,i,v]);(0,s.useEffect)(()=>{v&&M()},[v]),(0,s.useEffect)(()=>{let e=P[i].findIndex(e=>e.host);R(e)},[P]);let S=i>=P.length;(0,s.useEffect)(()=>{let e=E?.length;if(n&&e){let r=(0,a.Z)(e-1);R(r)}},[n,E]);let A=C.length;return(0,o.jsxs)(f.Z,{children:[(0,o.jsxs)(b.Z,{children:[(0,o.jsx)(h.Z,{selectedTeams:v&&[v],initialPots:r,pots:P,currentPotNum:i}),(0,o.jsx)(x.Z,{ref:F,maxTeams:P.length,currentPotNum:i,groups:C,possibleGroups:null,getGroupHeaderStyles:w})]}),(0,o.jsxs)(Z.Z,{children:[!n&&(0,o.jsx)(g.Z,{forceNoSelect:!!v,display:!S,displayTeams:D,selectedTeam:v,pot:E,onPick:R}),(0,o.jsx)(k.Z,{long:!0,completed:S,selectedTeam:v,pickedGroup:y,possibleGroups:null,isDisplayPossibleGroupsText:!!v,numGroups:A,groupsElement:F,reset:l})]})]})})},80528:(e,r,t)=>{t.d(r,{Z:()=>C});var o=t(85893),s=t(67294),l=t(70394),n=t(40726),i=t(46202),a=t(48606),u=t(1850),c=t(8360),d=t(90595),m=t(63835),p=t(63494),f=t(79633),h=t(88834),x=t(43955);let b=(0,l.F4)`
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
`,v=(0,s.memo)(function({team:e,possible:r}){let t=(0,d.Z)(e),[n,i]=(0,s.useState)(e),[a,u]=(0,s.useState)(!1),c=(0,s.useContext)(l.Ni),b=(0,s.useRef)(null),Z=(0,s.useCallback)(()=>u(!1),[]),g=(0,s.useCallback)(()=>{i(e),u(!0)},[e]);return(0,m.Z)(()=>{Z()},[c]),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)($,{$picked:a&&!!n,$possible:r,onAnimationEnd:Z,children:n?(0,o.jsx)(f.Z,{$country:(0,p.Z)(n),children:n.shortName??n.name}):(0,o.jsx)(h.Z,{ref:b})}),e&&e!==t&&(0,o.jsx)(x.Z,{from:`[data-cellid='${e.id}']`,to:b,duration:350,team:e,onAnimationEnd:g})]})}),y=(0,s.memo)(function({maxTeams:e,groupLetter:r,teams:t,potNum:s,possible:l,headerStyles:n}){return(0,o.jsxs)(i.Z,{children:[(0,o.jsx)("thead",{children:(0,o.jsx)(u.Z,{children:(0,o.jsx)(c.Z,{children:(0,o.jsxs)(a.Z,{$styles:n,children:["Group"," ",r]})})})}),(0,o.jsx)("tbody",{children:Array.from({length:e},(e,r)=>(0,o.jsx)(u.Z,{children:(0,o.jsx)(v,{team:t[r],possible:r===s&&l})},r))})]})}),E=l.ZP.div`
  display: flex;
  flex-flow: row wrap;

  > * {
    flex: 1;
    flex-basis: 22%;
  }
`,P=(0,s.forwardRef)(({maxTeams:e,currentPotNum:r,groups:t,possibleGroups:s,getGroupHeaderStyles:l},i)=>(0,o.jsx)(E,{ref:i,children:t?.map((t,i)=>{let a=n.Z(i),u=l?.(i);return o.jsx(y,{maxTeams:e,groupLetter:a,teams:t,potNum:r,possible:!!s?.includes(i),headerStyles:u},a)})})),C=(0,s.memo)(P)}}]);