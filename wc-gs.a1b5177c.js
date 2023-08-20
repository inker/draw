"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[5527],{72331:(e,r,t)=>{t.r(r),t.d(r,{default:()=>y});var o=t(85893),s=t(67294),l=t(70394),n=t(62002),i=t(21225),a=t(80676),u=t(40339),c=t(27603),d=t(56285),p=t(43761),f=t(43510),m=t(72723),h=t(11726),x=t(80528),Z=t(85704),b=t(18753),g=t(40410),k=t(12365);let j=()=>new Worker(new URL(t.p+t.u(3930),t.b)),w=(0,n.Z)((0,l.iv)`
  background-color: ${e=>e.theme.isDarkMode?"#363":"#c0e0c0"};
`);function v(e){let r=e.map(e=>(0,i.Z)(e)),t=r[0];return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:t,pots:r,groups:e[0].map(()=>[])}}let y=(0,s.memo)(function({season:e,pots:r}){let[t,l]=(0,c.Z)(),[n,i]=(0,d.Z)(),[{currentPotNum:y,selectedTeam:E,pickedGroup:G,hungPot:P,pots:$,groups:C},T]=(0,s.useState)(()=>v(r));(0,s.useEffect)(()=>{T(v(r))},[r,t]);let[,D]=(0,u.Z)(),[N]=(0,p.Z)(),F=(0,f.Z)(j),M=(0,s.useRef)(null),R=async()=>{let r;if(!E)throw Error("no selected team");try{let t=await F({season:e,pots:$,groups:C,selectedTeam:E});r=t.pickedGroup}catch(e){console.error(e),D({error:"Could not determine the group"});return}let t=C.slice();t[r]=[...t[r],E];let o=$[y].length>0?y:y+1;T({selectedTeam:null,pickedGroup:r,hungPot:$[o],currentPotNum:o,pots:$,groups:t})},S=(0,s.useCallback)(e=>{if(E)return;let r=$[y][e];if(!r)return;let t=$.slice();t[y]=t[y].filter((r,t)=>t!==e),T({currentPotNum:y,hungPot:P,selectedTeam:r,pickedGroup:null,pots:t,groups:C})},[$,C,y,P,E]);(0,s.useEffect)(()=>{E&&R()},[E]),(0,s.useEffect)(()=>{let e=$[y].findIndex(e=>e.host);S(e)},[$]);let A=y>=$.length;(0,s.useEffect)(()=>{let e=P?.length;if(n&&e){let r=(0,a.Z)(e-1);S(r)}},[n,P]),(0,s.useEffect)(()=>{A&&n&&i(!1)},[A,n]);let L=C.length;return(0,o.jsxs)(m.Z,{children:[(0,o.jsxs)(Z.Z,{children:[(0,o.jsx)(h.Z,{selectedTeams:E&&[E],initialPots:r,pots:$,currentPotNum:y}),(0,o.jsx)(x.Z,{ref:M,maxTeams:$.length,currentPotNum:y,groups:C,possibleGroups:null,getGroupHeaderStyles:w})]}),(0,o.jsxs)(b.Z,{children:[!n&&(0,o.jsx)(g.Z,{forceNoSelect:!!E,display:!A,displayTeams:N,selectedTeam:E,pot:P,onPick:S}),(0,o.jsx)(k.Z,{long:!0,completed:A,selectedTeam:E,pickedGroup:G,possibleGroups:null,isDisplayPossibleGroupsText:!!E,numGroups:L,groupsElement:M,reset:l})]})]})})},80528:(e,r,t)=>{t.d(r,{Z:()=>C});var o=t(85893),s=t(67294),l=t(70394),n=t(40726),i=t(96446),a=t(46202),u=t(48606),c=t(1850),d=t(8360),p=t(90595),f=t(63835),m=t(63494),h=t(79633),x=t(88834),Z=t(43955);let b=(0,l.F4)`
  from {
    box-shadow: 0 0 20px #08f;
  }
`,g=(0,l.F4)`
  from {
    background-color: rgb(255 255 255 / 0.5);
  }
`,k=(0,l.F4)`
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
    animation: ${e=>e.theme.isDarkMode?g:b} 1s ease;
    ${e=>e.theme.isDarkMode?(0,l.iv)`
      background-color: rgb(255 255 255 / 0.3);
    `:(0,l.iv)`
      box-shadow: 0 0 5px #6af;
    `}
  }
`,v=(0,l.iv)`
  animation: ${e=>e.theme.isDarkMode?j:k} 3s ease-out normal forwards;
`,y=(0,l.ZP)(d.Z)`
  ${e=>e.possible&&w}
  ${e=>e.picked&&v}
`,E=(0,s.memo)(function({team:e,possible:r}){let t=(0,p.Z)(e),[n,i]=(0,s.useState)(e),[a,u]=(0,s.useState)(!1),c=(0,s.useContext)(l.Ni),d=(0,s.useRef)(null),b=(0,s.useCallback)(()=>u(!1),[]),g=(0,s.useCallback)(()=>{i(e),u(!0)},[e]);return(0,f.Z)(()=>{b()},[c]),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(y,{picked:a&&!!n,possible:r,onAnimationEnd:b,children:n?(0,o.jsx)(h.Z,{country:(0,m.Z)(n),children:n.shortName??n.name}):(0,o.jsx)(x.Z,{ref:d})}),e&&e!==t&&(0,o.jsx)(Z.Z,{from:`[data-cellid='${e.id}']`,to:d,duration:350,team:e,onAnimationEnd:g})]})}),G=(0,s.memo)(function({maxTeams:e,groupLetter:r,teams:t,potNum:s,possible:l,headerStyles:n}){return(0,o.jsxs)(a.Z,{children:[(0,o.jsx)("thead",{children:(0,o.jsx)(c.Z,{children:(0,o.jsx)(d.Z,{children:(0,o.jsxs)(u.Z,{styles:n,children:["Group"," ",r]})})})}),(0,o.jsx)("tbody",{children:(0,i.Z)(e).map(e=>(0,o.jsx)(c.Z,{children:(0,o.jsx)(E,{team:t[e],possible:e===s&&l})},e))})]})}),P=l.ZP.div`
  display: flex;
  flex-flow: row wrap;

  > * {
    flex: 1;
    flex-basis: 22%;
  }
`,$=(0,s.forwardRef)(({maxTeams:e,currentPotNum:r,groups:t,possibleGroups:s,getGroupHeaderStyles:l},i)=>(0,o.jsx)(P,{ref:i,children:t?.map((t,i)=>{let a=n.Z(i),u=l?.(i);return o.jsx(G,{maxTeams:e,groupLetter:a,teams:t,potNum:r,possible:!!s?.includes(i),headerStyles:u},a)})})),C=(0,s.memo)($)}}]);