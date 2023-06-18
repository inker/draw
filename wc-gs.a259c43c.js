"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[5527],{72331:(e,t,r)=>{r.r(t),r.d(t,{default:()=>E});var o=r(85893),s=r(67294),l=r(12788),n=r(62002),i=r(21225),a=r(80676),u=r(40339),c=r(27603),d=r(56285),p=r(43761),f=r(43510),m=r(72723),h=r(11726),x=r(80528),Z=r(85704),b=r(18753),g=r(40410),k=r(86590);let j=()=>new Worker(new URL(r.p+r.u(3930),r.b)),w=(0,n.Z)(l.iv`
  background-color: ${e=>e.theme.isDarkMode?"#363":"#c0e0c0"};
`);function v(e){let t=e.map(e=>(0,i.Z)(e)),r=t[0];return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:r,pots:t,groups:e[0].map(()=>[])}}function y({season:e,pots:t}){let[r,l]=(0,c.Z)(),[n,i]=(0,d.Z)(),[{currentPotNum:y,selectedTeam:E,pickedGroup:G,hungPot:P,pots:$,groups:C},T]=(0,s.useState)(()=>v(t));(0,s.useEffect)(()=>{T(v(t))},[t,r]);let[,D]=(0,u.Z)(),[N]=(0,p.Z)(),F=(0,f.Z)(j),M=(0,s.useRef)(null),R=async()=>{let t;if(!E)throw Error("no selected team");try{let r=await F({season:e,pots:$,groups:C,selectedTeam:E});t=r.pickedGroup}catch(e){console.error(e),D({error:"Could not determine the group"});return}let r=C.slice();r[t]=[...r[t],E];let o=$[y].length>0?y:y+1;T({selectedTeam:null,pickedGroup:t,hungPot:$[o],currentPotNum:o,pots:$,groups:r})},S=(0,s.useCallback)(e=>{if(E)return;let t=$[y],r=t[e];if(!r)return;let o=$.slice();o[y]=o[y].filter((t,r)=>r!==e),T({currentPotNum:y,hungPot:P,selectedTeam:r,pickedGroup:null,pots:o,groups:C})},[$,C,y,P,E]);(0,s.useEffect)(()=>{E&&R()},[E]),(0,s.useEffect)(()=>{let e=$[y].findIndex(e=>e.host);S(e)},[$]);let A=y>=$.length;(0,s.useEffect)(()=>{let e=P?.length;if(n&&e){let t=(0,a.Z)(e-1);S(t)}},[n,P]),(0,s.useEffect)(()=>{A&&n&&i(!1)},[A,n]);let L=C.length;return(0,o.jsxs)(m.Z,{children:[(0,o.jsxs)(Z.Z,{children:[(0,o.jsx)(h.Z,{selectedTeams:E&&[E],initialPots:t,pots:$,currentPotNum:y}),(0,o.jsx)(x.Z,{ref:M,maxTeams:$.length,currentPotNum:y,groups:C,possibleGroups:null,getGroupHeaderStyles:w})]}),(0,o.jsxs)(b.Z,{children:[!n&&(0,o.jsx)(g.Z,{forceNoSelect:!!E,display:!A,displayTeams:N,selectedTeam:E,pot:P,onPick:S}),(0,o.jsx)(k.Z,{long:!0,completed:A,selectedTeam:E,pickedGroup:G,possibleGroups:null,isDisplayPossibleGroupsText:!!E,numGroups:L,groupsElement:M,reset:l})]})]})}let E=(0,s.memo)(y)},80528:(e,t,r)=>{r.d(t,{Z:()=>D});var o=r(85893),s=r(67294),l=r(12788),n=r(40726),i=r(96446),a=r(46202),u=r(48606),c=r(1850),d=r(8360),p=r(90595),f=r(63835),m=r(63494),h=r(79633),x=r(88834),Z=r(43955);let b=l.F4`
  from {
    box-shadow: 0 0 20px #08f;
  }
`,g=l.F4`
  from {
    background-color: rgb(255 255 255 / 0.5);
  }
`,k=l.F4`
  from {
    background-color: rgb(255 255 0 / 0.5);
  }
`,j=l.F4`
  from {
    background-color: rgb(192 224 255 / 0.5);
  }
`,w=l.iv`
  position: relative; /* enables glow */
  ${e=>e.theme.isDarkMode?l.iv`
      background-color: rgb(255 255 255 / 0.3);
    `:l.iv`
      box-shadow: 0 0 5px #6af;
    `}

  &::before {
    content: '';
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    animation: ${e=>e.theme.isDarkMode?g:b} 1s ease;
    ${e=>e.theme.isDarkMode?l.iv`
      background-color: rgb(255 255 255 / 0.3);
    `:l.iv`
      box-shadow: 0 0 5px #6af;
    `}
  }
`,v=l.iv`
  animation: ${e=>e.theme.isDarkMode?j:k} 3s ease-out normal forwards;
`,y=(0,l.ZP)(d.Z)`
  ${e=>e.possible&&w}
  ${e=>e.picked&&v}
`;function E({team:e,possible:t}){let r=(0,p.Z)(e),[n,i]=(0,s.useState)(e),[a,u]=(0,s.useState)(!1),c=(0,s.useContext)(l.Ni),d=(0,s.useRef)(null),b=(0,s.useCallback)(()=>u(!1),[]),g=(0,s.useCallback)(()=>{i(e),u(!0)},[e]);return(0,f.Z)(()=>{b()},[c]),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(y,{picked:a&&!!n,possible:t,onAnimationEnd:b,children:n?(0,o.jsx)(h.Z,{country:(0,m.Z)(n),children:n.shortName??n.name}):(0,o.jsx)(x.Z,{ref:d})}),e&&e!==r&&(0,o.jsx)(Z.Z,{from:`[data-cellid='${e.id}']`,to:d,duration:350,team:e,onAnimationEnd:g})]})}let G=(0,s.memo)(E);function P({maxTeams:e,groupLetter:t,teams:r,potNum:s,possible:l,headerStyles:n}){return(0,o.jsxs)(a.Z,{children:[(0,o.jsx)("thead",{children:(0,o.jsx)(c.Z,{children:(0,o.jsx)(d.Z,{children:(0,o.jsxs)(u.Z,{styles:n,children:["Group"," ",t]})})})}),(0,o.jsx)("tbody",{children:(0,i.Z)(e).map(e=>(0,o.jsx)(c.Z,{children:(0,o.jsx)(G,{team:r[e],possible:e===s&&l})},e))})]})}let $=(0,s.memo)(P),C=l.ZP.div`
  display: flex;
  flex-flow: row wrap;

  > * {
    flex: 1;
    flex-basis: 22%;
  }
`,T=(0,s.forwardRef)(({maxTeams:e,currentPotNum:t,groups:r,possibleGroups:s,getGroupHeaderStyles:l},i)=>(0,o.jsx)(C,{ref:i,children:r?.map((r,i)=>{let a=n.Z(i),u=l?.(i);return o.jsx($,{maxTeams:e,groupLetter:a,teams:r,potNum:t,possible:!!s?.includes(i),headerStyles:u},a)})})),D=(0,s.memo)(T)}}]);