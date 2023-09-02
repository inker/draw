"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[1739],{45290:(e,r,l)=>{l.r(r),l.d(r,{default:()=>D});var s=l(85893),o=l(67294),t=l(70394),i=l(21225),n=l(80676),a=l(68800),u=l(21487),c=l(27603),d=l(56285),p=l(43761),f=l(34675),m=l(43510),h=l(72723),b=l(11726),x=l(80528),g=l(85704),Z=l(18753),k=l(40410),j=l(40726),w=l(613);let G=(0,t.ZP)(w.Z)`
  &:hover {
    ${e=>!e.noHover&&"background: radial-gradient(#ccf, #ccf)"}
  }
`,$=t.ZP.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 999px) {
    justify-content: center;
  }
`,v=(0,o.memo)(function({display:e,displayGroups:r,possibleGroups:l,onPick:t}){let i=(0,o.useCallback)(e=>{let r=e.target,l=+r.dataset.group;if(Number.isNaN(l))throw TypeError(`Incorrect group ball: ${r.dataset.group}`);t(l)},[t]);return(0,s.jsx)($,{children:e&&l?.map(e=>s.jsx(G,{"data-group":e,forceVisible:r,onClick:i,children:j.Z(e)},e))})});var y=l(12365);let C=()=>new Worker(new URL(l.p+l.u(7685),l.b)),P=()=>new Worker(new URL(l.p+l.u(3407),l.b)),E=(0,t.iv)`
  background-color: ${e=>e.theme.isDarkMode?"#933":"#ffc0c0"};
`,N=(0,t.iv)`
  background-color: ${e=>e.theme.isDarkMode?"#039":"#c0e0ff"};
`;function T(e){let r=e.map(e=>(0,i.Z)(e)),l=r[0];return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:l,possibleGroups:null,possibleGroupsShuffled:null,pots:r,groups:e[0].map(()=>[])}}let D=(0,o.memo)(function({season:e,pots:r,isFirstPotShortDraw:l}){let[t,j]=(0,c.Z)(),[w,G]=(0,d.Z)(),[{currentPotNum:$,selectedTeam:D,pickedGroup:M,hungPot:S,possibleGroups:F,possibleGroupsShuffled:R,pots:A,groups:L},U]=(0,o.useState)(()=>T(r)),W=(0,f.Z)(U);(0,o.useEffect)(()=>{W(T(r))},[r,t]);let[,H]=(0,u.Z)(),[I]=(0,p.Z)(),V=(0,m.Z)(P),q=(0,m.Z)(C),z=(0,o.useRef)(null),B=l&&0===$,J=w||B,K=async()=>{let r;if(!D)throw Error("no selected team");try{if(B){let l=await V({season:e,pots:A,groups:L,selectedTeam:D});r=[l.pickedGroup]}else{let l=await q({season:e,pots:A,groups:L,selectedTeam:D});r=l.possibleGroups}}catch(e){console.error(e),H({error:"Could not determine the group"});return}W({pickedGroup:null,possibleGroups:r,possibleGroupsShuffled:(0,i.Z)(r)})},O=(0,o.useCallback)(e=>{if(D)return;let r=A[$],l=r[e];if(!l)return;let s=A.slice();s[$]=s[$].filter((r,l)=>l!==e),W({selectedTeam:l,pickedGroup:null,pots:s})},[A,$,D]),Q=(0,o.useCallback)(e=>{if(!D){H({error:"No selected team..."});return}let r=L.slice();r[e]=[...r[e],D];let l=A[$].length>0?$:$+1;W({selectedTeam:null,pickedGroup:e,hungPot:A[l],possibleGroups:null,possibleGroupsShuffled:null,currentPotNum:l,groups:r})},[A,L,D,$,S]);(0,o.useEffect)(()=>{D&&K()},[D]);let X=$>=A.length;(0,o.useEffect)(()=>{let e=S?.length;if(w&&e){let r=(0,n.Z)(e-1);O(r)}},[w,S]),(0,o.useEffect)(()=>{if(J&&R?.length){let e=B?Math.min(...R):(0,a.Z)(R);Q(e)}},[J,R]),(0,o.useEffect)(()=>{X&&w&&G(!1)},[X,w]);let Y=L.length,_=(0,o.useCallback)(e=>e<Y>>1?E:N,[Y]);return(0,s.jsxs)(h.Z,{children:[(0,s.jsxs)(g.Z,{children:[(0,s.jsx)(b.Z,{selectedTeams:D&&[D],initialPots:r,pots:A,currentPotNum:$}),(0,s.jsx)(x.Z,{ref:z,maxTeams:A.length,currentPotNum:$,groups:L,possibleGroups:J?null:F,getGroupHeaderStyles:_})]}),(0,s.jsxs)(Z.Z,{children:[!w&&(0,s.jsx)(k.Z,{display:!X,displayTeams:I,selectedTeam:D,pot:S,onPick:O}),(0,s.jsx)(y.Z,{long:!1,completed:X,selectedTeam:D,pickedGroup:M,possibleGroups:w?null:F,isDisplayPossibleGroupsText:!!D,numGroups:Y,groupsElement:z,reset:j}),!J&&(0,s.jsx)(v,{display:!X,displayGroups:I,possibleGroups:R,onPick:Q})]})]})})},80528:(e,r,l)=>{l.d(r,{Z:()=>P});var s=l(85893),o=l(67294),t=l(70394),i=l(40726),n=l(46202),a=l(48606),u=l(1850),c=l(8360),d=l(90595),p=l(63835),f=l(63494),m=l(79633),h=l(88834),b=l(43955);let x=(0,t.F4)`
  from {
    box-shadow: 0 0 20px #08f;
  }
`,g=(0,t.F4)`
  from {
    background-color: rgb(255 255 255 / 0.5);
  }
`,Z=(0,t.F4)`
  from {
    background-color: rgb(255 255 0 / 0.5);
  }
`,k=(0,t.F4)`
  from {
    background-color: rgb(192 224 255 / 0.5);
  }
`,j=(0,t.iv)`
  position: relative; /* enables glow */
  ${e=>e.theme.isDarkMode?(0,t.iv)`
      background-color: rgb(255 255 255 / 0.3);
    `:(0,t.iv)`
      box-shadow: 0 0 5px #6af;
    `}

  &::before {
    content: '';
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    animation: ${e=>e.theme.isDarkMode?g:x} 1s ease;
    ${e=>e.theme.isDarkMode?(0,t.iv)`
      background-color: rgb(255 255 255 / 0.3);
    `:(0,t.iv)`
      box-shadow: 0 0 5px #6af;
    `}
  }
`,w=(0,t.iv)`
  animation: ${e=>e.theme.isDarkMode?k:Z} 3s ease-out normal forwards;
`,G=(0,t.ZP)(c.Z)`
  ${e=>e.$possible&&j}
  ${e=>e.$picked&&w}
`,$=(0,o.memo)(function({team:e,possible:r}){let l=(0,d.Z)(e),[i,n]=(0,o.useState)(e),[a,u]=(0,o.useState)(!1),c=(0,o.useContext)(t.Ni),x=(0,o.useRef)(null),g=(0,o.useCallback)(()=>u(!1),[]),Z=(0,o.useCallback)(()=>{n(e),u(!0)},[e]);return(0,p.Z)(()=>{g()},[c]),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(G,{$picked:a&&!!i,$possible:r,onAnimationEnd:g,children:i?(0,s.jsx)(m.Z,{$country:(0,f.Z)(i),children:i.shortName??i.name}):(0,s.jsx)(h.Z,{ref:x})}),e&&e!==l&&(0,s.jsx)(b.Z,{from:`[data-cellid='${e.id}']`,to:x,duration:350,team:e,onAnimationEnd:Z})]})}),v=(0,o.memo)(function({maxTeams:e,groupLetter:r,teams:l,potNum:o,possible:t,headerStyles:i}){return(0,s.jsxs)(n.Z,{children:[(0,s.jsx)("thead",{children:(0,s.jsx)(u.Z,{children:(0,s.jsx)(c.Z,{children:(0,s.jsxs)(a.Z,{$styles:i,children:["Group"," ",r]})})})}),(0,s.jsx)("tbody",{children:Array.from({length:e},(e,r)=>(0,s.jsx)(u.Z,{children:(0,s.jsx)($,{team:l[r],possible:r===o&&t})},r))})]})}),y=t.ZP.div`
  display: flex;
  flex-flow: row wrap;

  > * {
    flex: 1;
    flex-basis: 22%;
  }
`,C=(0,o.forwardRef)(({maxTeams:e,currentPotNum:r,groups:l,possibleGroups:o,getGroupHeaderStyles:t},n)=>(0,s.jsx)(y,{ref:n,children:l?.map((l,n)=>{let a=i.Z(n),u=t?.(n);return s.jsx(v,{maxTeams:e,groupLetter:a,teams:l,potNum:r,possible:!!o?.includes(n),headerStyles:u},a)})})),P=(0,o.memo)(C)}}]);