"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[5527],{72331:(e,r,t)=>{t.r(r),t.d(r,{default:()=>v});var o=t(85893),s=t(67294),l=t(70394),n=t(62002),i=t(21225),a=t(80676),u=t(40339),c=t(27603),d=t(56285),p=t(43761),f=t(43510),m=t(72723),h=t(11726),x=t(80528),b=t(85704),Z=t(18753),g=t(40410),k=t(12365);let j=()=>new Worker(new URL(t.p+t.u(3930),t.b)),w=(0,n.Z)((0,l.iv)`
  background-color: ${e=>e.theme.isDarkMode?"#363":"#c0e0c0"};
`);function $(e){let r=e.map(e=>(0,i.Z)(e)),t=r[0];return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:t,pots:r,groups:e[0].map(()=>[])}}let v=(0,s.memo)(function({season:e,pots:r}){let[t,l]=(0,c.Z)(),[n,i]=(0,d.Z)(),[{currentPotNum:v,selectedTeam:y,pickedGroup:E,hungPot:G,pots:P,groups:C},T]=(0,s.useState)(()=>$(r));(0,s.useEffect)(()=>{T($(r))},[r,t]);let[,D]=(0,u.Z)(),[N]=(0,p.Z)(),F=(0,f.Z)(j),M=(0,s.useRef)(null),R=async()=>{let r;if(!y)throw Error("no selected team");try{let t=await F({season:e,pots:P,groups:C,selectedTeam:y});r=t.pickedGroup}catch(e){console.error(e),D({error:"Could not determine the group"});return}let t=C.slice();t[r]=[...t[r],y];let o=P[v].length>0?v:v+1;T({selectedTeam:null,pickedGroup:r,hungPot:P[o],currentPotNum:o,pots:P,groups:t})},S=(0,s.useCallback)(e=>{if(y)return;let r=P[v],t=r[e];if(!t)return;let o=P.slice();o[v]=o[v].filter((r,t)=>t!==e),T({currentPotNum:v,hungPot:G,selectedTeam:t,pickedGroup:null,pots:o,groups:C})},[P,C,v,G,y]);(0,s.useEffect)(()=>{y&&R()},[y]),(0,s.useEffect)(()=>{let e=P[v].findIndex(e=>e.host);S(e)},[P]);let A=v>=P.length;(0,s.useEffect)(()=>{let e=G?.length;if(n&&e){let r=(0,a.Z)(e-1);S(r)}},[n,G]),(0,s.useEffect)(()=>{A&&n&&i(!1)},[A,n]);let L=C.length;return(0,o.jsxs)(m.Z,{children:[(0,o.jsxs)(b.Z,{children:[(0,o.jsx)(h.Z,{selectedTeams:y&&[y],initialPots:r,pots:P,currentPotNum:v}),(0,o.jsx)(x.Z,{ref:M,maxTeams:P.length,currentPotNum:v,groups:C,possibleGroups:null,getGroupHeaderStyles:w})]}),(0,o.jsxs)(Z.Z,{children:[!n&&(0,o.jsx)(g.Z,{forceNoSelect:!!y,display:!A,displayTeams:N,selectedTeam:y,pot:G,onPick:S}),(0,o.jsx)(k.Z,{long:!0,completed:A,selectedTeam:y,pickedGroup:E,possibleGroups:null,isDisplayPossibleGroupsText:!!y,numGroups:L,groupsElement:M,reset:l})]})]})})},80528:(e,r,t)=>{t.d(r,{Z:()=>P});var o=t(85893),s=t(67294),l=t(70394),n=t(40726),i=t(46202),a=t(48606),u=t(1850),c=t(8360),d=t(90595),p=t(63835),f=t(63494),m=t(79633),h=t(88834),x=t(43955);let b=(0,l.F4)`
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