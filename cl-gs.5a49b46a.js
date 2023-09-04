"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[1739],{45290:(e,r,l)=>{l.r(r),l.d(r,{default:()=>T});var s=l(85893),o=l(67294),t=l(70394),i=l(21225),n=l(80676),a=l(68800),u=l(21487),c=l(27603),d=l(56285),p=l(43761),f=l(43510),m=l(72723),h=l(11726),b=l(80528),x=l(85704),g=l(18753),Z=l(40410),k=l(40726),j=l(613);let w=(0,t.ZP)(j.Z)`
  &:hover {
    ${e=>!e.noHover&&"background: radial-gradient(#ccf, #ccf)"}
  }
`,G=t.ZP.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 999px) {
    justify-content: center;
  }
`,$=(0,o.memo)(function({display:e,displayGroups:r,possibleGroups:l,onPick:t}){let i=(0,o.useCallback)(e=>{let r=e.target,l=+r.dataset.group;if(Number.isNaN(l))throw TypeError(`Incorrect group ball: ${r.dataset.group}`);t(l)},[t]);return(0,s.jsx)(G,{children:e&&l?.map(e=>s.jsx(w,{"data-group":e,forceVisible:r,onClick:i,children:k.Z(e)},e))})});var v=l(12365);let y=()=>new Worker(new URL(l.p+l.u(7685),l.b)),C=()=>new Worker(new URL(l.p+l.u(3407),l.b)),P=(0,t.iv)`
  background-color: ${e=>e.theme.isDarkMode?"#933":"#ffc0c0"};
`,E=(0,t.iv)`
  background-color: ${e=>e.theme.isDarkMode?"#039":"#c0e0ff"};
`;function N(e){let r=e.map(e=>(0,i.Z)(e)),l=r[0];return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:l,possibleGroups:null,possibleGroupsShuffled:null,pots:r,groups:e[0].map(()=>[])}}let T=(0,o.memo)(function({season:e,pots:r,isFirstPotShortDraw:l}){let[t,k]=(0,c.Z)(),[j]=(0,d.Z)(),[{currentPotNum:w,selectedTeam:G,pickedGroup:T,hungPot:D,possibleGroups:M,possibleGroupsShuffled:S,pots:F,groups:R},A]=(0,o.useState)(()=>N(r));(0,o.useEffect)(()=>{A(N(r))},[r,t]);let[,L]=(0,u.Z)(),[U]=(0,p.Z)(),W=(0,f.Z)(C),H=(0,f.Z)(y),I=(0,o.useRef)(null),V=l&&0===w,q=j||V,z=async()=>{let r;if(!G)throw Error("no selected team");try{if(V){let l=await W({season:e,pots:F,groups:R,selectedTeam:G});r=[l.pickedGroup]}else{let l=await H({season:e,pots:F,groups:R,selectedTeam:G});r=l.possibleGroups}}catch(e){console.error(e),L({error:"Could not determine the group"});return}A(e=>({...e,pickedGroup:null,possibleGroups:r,possibleGroupsShuffled:(0,i.Z)(r)}))},B=(0,o.useCallback)(e=>{if(G)return;let r=F[w],l=r[e];if(!l)return;let s=F.slice();s[w]=s[w].filter((r,l)=>l!==e),A(e=>({...e,selectedTeam:l,pickedGroup:null,pots:s}))},[F,w,G]),J=(0,o.useCallback)(e=>{if(!G){L({error:"No selected team..."});return}let r=R.slice();r[e]=[...r[e],G];let l=F[w].length>0?w:w+1;A(s=>({...s,selectedTeam:null,pickedGroup:e,hungPot:F[l],possibleGroups:null,possibleGroupsShuffled:null,currentPotNum:l,groups:r}))},[F,R,G,w,D]);(0,o.useEffect)(()=>{G&&z()},[G]);let K=w>=F.length;(0,o.useEffect)(()=>{let e=D?.length;if(j&&e){let r=(0,n.Z)(e-1);B(r)}},[j,D]),(0,o.useEffect)(()=>{if(q&&S?.length){let e=V?Math.min(...S):(0,a.Z)(S);J(e)}},[q,S]);let O=R.length,Q=(0,o.useCallback)(e=>e<O>>1?P:E,[O]);return(0,s.jsxs)(m.Z,{children:[(0,s.jsxs)(x.Z,{children:[(0,s.jsx)(h.Z,{selectedTeams:G&&[G],initialPots:r,pots:F,currentPotNum:w}),(0,s.jsx)(b.Z,{ref:I,maxTeams:F.length,currentPotNum:w,groups:R,possibleGroups:q?null:M,getGroupHeaderStyles:Q})]}),(0,s.jsxs)(g.Z,{children:[!j&&(0,s.jsx)(Z.Z,{display:!K,displayTeams:U,selectedTeam:G,pot:D,onPick:B}),(0,s.jsx)(v.Z,{long:!1,completed:K,selectedTeam:G,pickedGroup:T,possibleGroups:j?null:M,isDisplayPossibleGroupsText:!!G,numGroups:O,groupsElement:I,reset:k}),!q&&(0,s.jsx)($,{display:!K,displayGroups:U,possibleGroups:S,onPick:J})]})]})})},80528:(e,r,l)=>{l.d(r,{Z:()=>P});var s=l(85893),o=l(67294),t=l(70394),i=l(40726),n=l(46202),a=l(48606),u=l(1850),c=l(8360),d=l(90595),p=l(63835),f=l(63494),m=l(79633),h=l(88834),b=l(43955);let x=(0,t.F4)`
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