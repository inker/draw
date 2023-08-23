"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[1739],{45290:(e,r,l)=>{l.r(r),l.d(r,{default:()=>T});var s=l(85893),o=l(67294),t=l(70394),i=l(21225),n=l(80676),a=l(68800),u=l(40339),c=l(27603),d=l(56285),p=l(43761),f=l(43510),m=l(72723),h=l(11726),b=l(80528),x=l(85704),Z=l(18753),g=l(40410),k=l(40726),j=l(613);let w=(0,t.ZP)(j.Z)`
  &:hover {
    ${e=>!e.$noHover&&"background: radial-gradient(#ccf, #ccf)"}
  }
`,$=t.ZP.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 999px) {
    justify-content: center;
  }
`,G=(0,o.memo)(function({display:e,displayGroups:r,possibleGroups:l,onPick:t}){let i=(0,o.useCallback)(e=>{let r=e.target,l=+r.dataset.group;if(Number.isNaN(l))throw TypeError(`Incorrect group ball: ${r.dataset.group}`);t(l)},[t]);return(0,s.jsx)($,{children:e&&l?.map(e=>s.jsx(w,{"data-group":e,$forceVisible:r,onClick:i,children:k.Z(e)},e))})});var v=l(12365);let y=()=>new Worker(new URL(l.p+l.u(7685),l.b)),C=()=>new Worker(new URL(l.p+l.u(3407),l.b)),P=(0,t.iv)`
  background-color: ${e=>e.theme.isDarkMode?"#933":"#ffc0c0"};
`,E=(0,t.iv)`
  background-color: ${e=>e.theme.isDarkMode?"#039":"#c0e0ff"};
`;function N(e){let r=e.map(e=>(0,i.Z)(e)),l=r[0];return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:l,possibleGroups:null,possibleGroupsShuffled:null,pots:r,groups:e[0].map(()=>[])}}let T=(0,o.memo)(function({season:e,pots:r,isFirstPotShortDraw:l}){let[t,k]=(0,c.Z)(),[j,w]=(0,d.Z)(),[{currentPotNum:$,selectedTeam:T,pickedGroup:D,hungPot:M,possibleGroups:S,possibleGroupsShuffled:F,pots:R,groups:L},A]=(0,o.useState)(()=>N(r));(0,o.useEffect)(()=>{A(N(r))},[r,t]);let[,U]=(0,u.Z)(),[W]=(0,p.Z)(),H=(0,f.Z)(C),I=(0,f.Z)(y),V=(0,o.useRef)(null),q=l&&0===$,z=j||q,B=async()=>{let r;if(!T)throw Error("no selected team");try{if(q){let l=await H({season:e,pots:R,groups:L,selectedTeam:T});r=[l.pickedGroup]}else{let l=await I({season:e,pots:R,groups:L,selectedTeam:T});r=l.possibleGroups}}catch(e){console.error(e),U({error:"Could not determine the group"});return}A({selectedTeam:T,pickedGroup:null,hungPot:M,currentPotNum:$,possibleGroups:r,possibleGroupsShuffled:(0,i.Z)(r),pots:R,groups:L})},J=(0,o.useCallback)(e=>{if(T)return;let r=R[$][e];if(!r)return;let l=R.slice();l[$]=l[$].filter((r,l)=>l!==e),A({currentPotNum:$,hungPot:M,selectedTeam:r,possibleGroups:S,possibleGroupsShuffled:F,pickedGroup:null,pots:l,groups:L})},[R,L,$,M,T,S,F]),K=(0,o.useCallback)(e=>{if(!T){U({error:"No selected team..."});return}let r=L.slice();r[e]=[...r[e],T];let l=R[$].length>0?$:$+1;A({selectedTeam:null,pickedGroup:e,hungPot:R[l],possibleGroups:null,possibleGroupsShuffled:null,currentPotNum:l,pots:R,groups:r})},[R,L,T,$,M]);(0,o.useEffect)(()=>{T&&B()},[T]);let O=$>=R.length;(0,o.useEffect)(()=>{let e=M?.length;if(j&&e){let r=(0,n.Z)(e-1);J(r)}},[j,M]),(0,o.useEffect)(()=>{if(z&&F?.length){let e=q?Math.min(...F):(0,a.Z)(F);K(e)}},[z,F]),(0,o.useEffect)(()=>{O&&j&&w(!1)},[O,j]);let Q=L.length,X=(0,o.useCallback)(e=>e<Q>>1?P:E,[Q]);return(0,s.jsxs)(m.Z,{children:[(0,s.jsxs)(x.Z,{children:[(0,s.jsx)(h.Z,{selectedTeams:T&&[T],initialPots:r,pots:R,currentPotNum:$}),(0,s.jsx)(b.Z,{ref:V,maxTeams:R.length,currentPotNum:$,groups:L,possibleGroups:z?null:S,getGroupHeaderStyles:X})]}),(0,s.jsxs)(Z.Z,{children:[!j&&(0,s.jsx)(g.Z,{display:!O,displayTeams:W,selectedTeam:T,pot:M,onPick:J}),(0,s.jsx)(v.Z,{long:!1,completed:O,selectedTeam:T,pickedGroup:D,possibleGroups:j?null:S,isDisplayPossibleGroupsText:!!T,numGroups:Q,groupsElement:V,reset:k}),!z&&(0,s.jsx)(G,{display:!O,displayGroups:W,possibleGroups:F,onPick:K})]})]})})},80528:(e,r,l)=>{l.d(r,{Z:()=>E});var s=l(85893),o=l(67294),t=l(70394),i=l(40726),n=l(96446),a=l(46202),u=l(48606),c=l(1850),d=l(8360),p=l(90595),f=l(63835),m=l(63494),h=l(79633),b=l(88834),x=l(43955);let Z=(0,t.F4)`
  from {
    box-shadow: 0 0 20px #08f;
  }
`,g=(0,t.F4)`
  from {
    background-color: rgb(255 255 255 / 0.5);
  }
`,k=(0,t.F4)`
  from {
    background-color: rgb(255 255 0 / 0.5);
  }
`,j=(0,t.F4)`
  from {
    background-color: rgb(192 224 255 / 0.5);
  }
`,w=(0,t.iv)`
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
    animation: ${e=>e.theme.isDarkMode?g:Z} 1s ease;
    ${e=>e.theme.isDarkMode?(0,t.iv)`
      background-color: rgb(255 255 255 / 0.3);
    `:(0,t.iv)`
      box-shadow: 0 0 5px #6af;
    `}
  }
`,$=(0,t.iv)`
  animation: ${e=>e.theme.isDarkMode?j:k} 3s ease-out normal forwards;
`,G=(0,t.ZP)(d.Z)`
  ${e=>e.$possible&&w}
  ${e=>e.$picked&&$}
`,v=(0,o.memo)(function({team:e,possible:r}){let l=(0,p.Z)(e),[i,n]=(0,o.useState)(e),[a,u]=(0,o.useState)(!1),c=(0,o.useContext)(t.Ni),d=(0,o.useRef)(null),Z=(0,o.useCallback)(()=>u(!1),[]),g=(0,o.useCallback)(()=>{n(e),u(!0)},[e]);return(0,f.Z)(()=>{Z()},[c]),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(G,{$picked:a&&!!i,$possible:r,onAnimationEnd:Z,children:i?(0,s.jsx)(h.Z,{$country:(0,m.Z)(i),children:i.shortName??i.name}):(0,s.jsx)(b.Z,{ref:d})}),e&&e!==l&&(0,s.jsx)(x.Z,{from:`[data-cellid='${e.id}']`,to:d,duration:350,team:e,onAnimationEnd:g})]})}),y=(0,o.memo)(function({maxTeams:e,groupLetter:r,teams:l,potNum:o,possible:t,headerStyles:i}){return(0,s.jsxs)(a.Z,{children:[(0,s.jsx)("thead",{children:(0,s.jsx)(c.Z,{children:(0,s.jsx)(d.Z,{children:(0,s.jsxs)(u.Z,{$styles:i,children:["Group"," ",r]})})})}),(0,s.jsx)("tbody",{children:(0,n.Z)(e).map(e=>(0,s.jsx)(c.Z,{children:(0,s.jsx)(v,{team:l[e],possible:e===o&&t})},e))})]})}),C=t.ZP.div`
  display: flex;
  flex-flow: row wrap;

  > * {
    flex: 1;
    flex-basis: 22%;
  }
`,P=(0,o.forwardRef)(({maxTeams:e,currentPotNum:r,groups:l,possibleGroups:o,getGroupHeaderStyles:t},n)=>(0,s.jsx)(C,{ref:n,children:l?.map((l,n)=>{let a=i.Z(n),u=t?.(n);return s.jsx(y,{maxTeams:e,groupLetter:a,teams:l,potNum:r,possible:!!o?.includes(n),headerStyles:u},a)})})),E=(0,o.memo)(P)}}]);