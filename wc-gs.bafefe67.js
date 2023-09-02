"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[5527],{72331:(e,r,t)=>{t.r(r),t.d(r,{default:()=>y});var o=t(85893),s=t(67294),l=t(70394),n=t(62002),i=t(21225),a=t(80676),u=t(21487),c=t(27603),d=t(56285),p=t(43761),f=t(34675),m=t(43510),h=t(72723),x=t(11726),b=t(80528),Z=t(85704),g=t(18753),k=t(40410),j=t(12365);let w=()=>new Worker(new URL(t.p+t.u(3930),t.b)),$=(0,n.Z)((0,l.iv)`
  background-color: ${e=>e.theme.isDarkMode?"#363":"#c0e0c0"};
`);function v(e){let r=e.map(e=>(0,i.Z)(e)),t=r[0];return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:t,pots:r,groups:e[0].map(()=>[])}}let y=(0,s.memo)(function({season:e,pots:r}){let[t,l]=(0,c.Z)(),[n,i]=(0,d.Z)(),[{currentPotNum:y,selectedTeam:E,pickedGroup:G,hungPot:P,pots:C,groups:T},D]=(0,s.useState)(()=>v(r)),N=(0,f.Z)(D);(0,s.useEffect)(()=>{N(v(r))},[r,t]);let[,F]=(0,u.Z)(),[M]=(0,p.Z)(),R=(0,m.Z)(w),S=(0,s.useRef)(null),A=async()=>{let r;if(!E)throw Error("no selected team");try{let t=await R({season:e,pots:C,groups:T,selectedTeam:E});r=t.pickedGroup}catch(e){console.error(e),F({error:"Could not determine the group"});return}let t=T.slice();t[r]=[...t[r],E];let o=C[y].length>0?y:y+1;N({selectedTeam:null,pickedGroup:r,hungPot:C[o],currentPotNum:o,groups:t})},L=(0,s.useCallback)(e=>{if(E)return;let r=C[y],t=r[e];if(!t)return;let o=C.slice();o[y]=o[y].filter((r,t)=>t!==e),N({selectedTeam:t,pickedGroup:null,pots:o})},[C,y,E]);(0,s.useEffect)(()=>{E&&A()},[E]),(0,s.useEffect)(()=>{let e=C[y].findIndex(e=>e.host);L(e)},[C]);let I=y>=C.length;(0,s.useEffect)(()=>{let e=P?.length;if(n&&e){let r=(0,a.Z)(e-1);L(r)}},[n,P]),(0,s.useEffect)(()=>{I&&n&&i(!1)},[I,n]);let U=T.length;return(0,o.jsxs)(h.Z,{children:[(0,o.jsxs)(Z.Z,{children:[(0,o.jsx)(x.Z,{selectedTeams:E&&[E],initialPots:r,pots:C,currentPotNum:y}),(0,o.jsx)(b.Z,{ref:S,maxTeams:C.length,currentPotNum:y,groups:T,possibleGroups:null,getGroupHeaderStyles:$})]}),(0,o.jsxs)(g.Z,{children:[!n&&(0,o.jsx)(k.Z,{forceNoSelect:!!E,display:!I,displayTeams:M,selectedTeam:E,pot:P,onPick:L}),(0,o.jsx)(j.Z,{long:!0,completed:I,selectedTeam:E,pickedGroup:G,possibleGroups:null,isDisplayPossibleGroupsText:!!E,numGroups:U,groupsElement:S,reset:l})]})]})})},80528:(e,r,t)=>{t.d(r,{Z:()=>P});var o=t(85893),s=t(67294),l=t(70394),n=t(40726),i=t(46202),a=t(48606),u=t(1850),c=t(8360),d=t(90595),p=t(63835),f=t(63494),m=t(79633),h=t(88834),x=t(43955);let b=(0,l.F4)`
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
`,v=(0,s.memo)(function({team:e,possible:r}){let t=(0,d.Z)(e),[n,i]=(0,s.useState)(e),[a,u]=(0,s.useState)(!1),c=(0,s.useContext)(l.Ni),b=(0,s.useRef)(null),Z=(0,s.useCallback)(()=>u(!1),[]),g=(0,s.useCallback)(()=>{i(e),u(!0)},[e]);return(0,p.Z)(()=>{Z()},[c]),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)($,{$picked:a&&!!n,$possible:r,onAnimationEnd:Z,children:n?(0,o.jsx)(m.Z,{$country:(0,f.Z)(n),children:n.shortName??n.name}):(0,o.jsx)(h.Z,{ref:b})}),e&&e!==t&&(0,o.jsx)(x.Z,{from:`[data-cellid='${e.id}']`,to:b,duration:350,team:e,onAnimationEnd:g})]})}),y=(0,s.memo)(function({maxTeams:e,groupLetter:r,teams:t,potNum:s,possible:l,headerStyles:n}){return(0,o.jsxs)(i.Z,{children:[(0,o.jsx)("thead",{children:(0,o.jsx)(u.Z,{children:(0,o.jsx)(c.Z,{children:(0,o.jsxs)(a.Z,{$styles:n,children:["Group"," ",r]})})})}),(0,o.jsx)("tbody",{children:Array.from({length:e},(e,r)=>(0,o.jsx)(u.Z,{children:(0,o.jsx)(v,{team:t[r],possible:r===s&&l})},r))})]})}),E=l.ZP.div`
  display: flex;
  flex-flow: row wrap;

  > * {
    flex: 1;
    flex-basis: 22%;
  }
`,G=(0,s.forwardRef)(({maxTeams:e,currentPotNum:r,groups:t,possibleGroups:s,getGroupHeaderStyles:l},i)=>(0,o.jsx)(E,{ref:i,children:t?.map((t,i)=>{let a=n.Z(i),u=l?.(i);return o.jsx(y,{maxTeams:e,groupLetter:a,teams:t,potNum:r,possible:!!s?.includes(i),headerStyles:u},a)})})),P=(0,s.memo)(G)}}]);