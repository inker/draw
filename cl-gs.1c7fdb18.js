"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[1739],{45290:(e,r,l)=>{l.r(r),l.d(r,{default:()=>T});var o=l(85893),s=l(67294),t=l(70394),n=l(21225),a=l(80676),i=l(68800),u=l(21487),c=l(27603),d=l(56285),p=l(43761),f=l(88853),m=l(72723),h=l(11726),b=l(80528),x=l(85704),g=l(18753),Z=l(40410),k=l(40726),j=l(613);let w=(0,t.ZP)(j.Z)`
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
`,v=(0,s.memo)(function({display:e,displayGroups:r,possibleGroups:l,onPick:t}){let n=(0,s.useCallback)(e=>{let r=e.target,l=+r.dataset.group;if(Number.isNaN(l))throw TypeError(`Incorrect group ball: ${r.dataset.group}`);t(l)},[t]);return(0,o.jsx)($,{children:e&&l?.map(e=>o.jsx(w,{"data-group":e,forceVisible:r,onClick:n,children:k.Z(e)},e))})});var G=l(12365);let y=()=>new Worker(new URL(l.p+l.u(7685),l.b)),C=()=>new Worker(new URL(l.p+l.u(3407),l.b)),P=(0,t.iv)`
  background-color: ${e=>e.theme.isDarkMode?"#933":"#ffc0c0"};
`,E=(0,t.iv)`
  background-color: ${e=>e.theme.isDarkMode?"#039":"#c0e0ff"};
`;function N(e){let r=e.map(e=>(0,n.Z)(e));return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:r[0],possibleGroups:null,possibleGroupsShuffled:null,pots:r,groups:e[0].map(()=>[])}}let T=(0,s.memo)(function({season:e,pots:r,isFirstPotShortDraw:l}){let[t,k]=(0,c.Z)(),[j]=(0,d.Z)(),[{currentPotNum:w,selectedTeam:$,pickedGroup:T,hungPot:D,possibleGroups:M,possibleGroupsShuffled:S,pots:F,groups:R},A]=(0,s.useState)(()=>N(r));(0,s.useEffect)(()=>{A(N(r))},[r,t]);let[,L]=(0,u.Z)(),[U]=(0,p.Z)(),W=(0,f.Z)(C),H=(0,f.Z)(y),I=(0,s.useRef)(null),V=l&&0===w,q=j||V,z=async()=>{let r;if(!$)throw Error("no selected team");try{r=V?[await W({season:e,pots:F,groups:R,selectedTeam:$})]:await H({season:e,pots:F,groups:R,selectedTeam:$})}catch(e){console.error(e),L({error:"Could not determine the group"});return}A(e=>({...e,pickedGroup:null,possibleGroups:r,possibleGroupsShuffled:(0,n.Z)(r)}))},B=(0,s.useCallback)(e=>{if($)return;let r=F[w][e];if(!r)return;let l=F.slice();l[w]=l[w].filter((r,l)=>l!==e),A(e=>({...e,selectedTeam:r,pickedGroup:null,pots:l}))},[F,w,$]),J=(0,s.useCallback)(e=>{if(!$){L({error:"No selected team..."});return}let r=R.slice();r[e]=[...r[e],$];let l=F[w].length>0?w:w+1;A(o=>({...o,selectedTeam:null,pickedGroup:e,hungPot:F[l],possibleGroups:null,possibleGroupsShuffled:null,currentPotNum:l,groups:r}))},[F,R,$,w,D]);(0,s.useEffect)(()=>{$&&z()},[$]);let K=w>=F.length;(0,s.useEffect)(()=>{let e=D?.length;j&&e&&B((0,a.Z)(e-1))},[j,D]),(0,s.useEffect)(()=>{q&&S?.length&&J(V?Math.min(...S):(0,i.Z)(S))},[q,S]);let O=R.length,Q=(0,s.useCallback)(e=>e<O>>1?P:E,[O]);return(0,o.jsxs)(m.Z,{children:[(0,o.jsxs)(x.Z,{children:[(0,o.jsx)(h.Z,{selectedTeams:$&&[$],initialPots:r,pots:F,currentPotNum:w}),(0,o.jsx)(b.Z,{ref:I,maxTeams:F.length,currentPotNum:w,groups:R,possibleGroups:q?null:M,getGroupHeaderStyles:Q})]}),(0,o.jsxs)(g.Z,{children:[!j&&(0,o.jsx)(Z.Z,{display:!K,displayTeams:U,selectedTeam:$,pot:D,onPick:B}),(0,o.jsx)(G.Z,{long:!1,completed:K,selectedTeam:$,pickedGroup:T,possibleGroups:j?null:M,isDisplayPossibleGroupsText:!!$,numGroups:O,groupsElement:I,reset:k}),!q&&(0,o.jsx)(v,{display:!K,displayGroups:U,possibleGroups:S,onPick:J})]})]})})},80528:(e,r,l)=>{l.d(r,{Z:()=>P});var o=l(85893),s=l(67294),t=l(70394),n=l(40726),a=l(46202),i=l(48606),u=l(1850),c=l(8360),d=l(90595),p=l(63835),f=l(63494),m=l(79633),h=l(88834),b=l(43955);let x=(0,t.F4)`
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
`,$=(0,t.ZP)(c.Z)`
  ${e=>e.$possible&&j}
  ${e=>e.$picked&&w}
`,v=(0,s.memo)(function({team:e,possible:r}){let l=(0,d.Z)(e),[n,a]=(0,s.useState)(e),[i,u]=(0,s.useState)(!1),c=(0,s.useContext)(t.Ni),x=(0,s.useRef)(null),g=(0,s.useCallback)(()=>u(!1),[]),Z=(0,s.useCallback)(()=>{a(e),u(!0)},[e]);return(0,p.Z)(()=>{g()},[c]),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)($,{$picked:i&&!!n,$possible:r,onAnimationEnd:g,children:n?(0,o.jsx)(m.Z,{$country:(0,f.Z)(n),children:n.shortName??n.name}):(0,o.jsx)(h.Z,{ref:x})}),e&&e!==l&&(0,o.jsx)(b.Z,{from:`[data-cellid='${e.id}']`,to:x,duration:350,team:e,onAnimationEnd:Z})]})}),G=(0,s.memo)(function({maxTeams:e,groupLetter:r,teams:l,potNum:s,possible:t,headerStyles:n}){return(0,o.jsxs)(a.Z,{children:[(0,o.jsx)("thead",{children:(0,o.jsx)(u.Z,{children:(0,o.jsx)(c.Z,{children:(0,o.jsxs)(i.Z,{$styles:n,children:["Group"," ",r]})})})}),(0,o.jsx)("tbody",{children:Array.from({length:e},(e,r)=>(0,o.jsx)(u.Z,{children:(0,o.jsx)(v,{team:l[r],possible:r===s&&t})},r))})]})}),y=t.ZP.div`
  display: flex;
  flex-flow: row wrap;

  > * {
    flex: 1;
    flex-basis: 22%;
  }
`,C=(0,s.forwardRef)(({maxTeams:e,currentPotNum:r,groups:l,possibleGroups:s,getGroupHeaderStyles:t},a)=>(0,o.jsx)(y,{ref:a,children:l?.map((l,a)=>{let i=n.Z(a),u=t?.(a);return o.jsx(G,{maxTeams:e,groupLetter:i,teams:l,potNum:r,possible:!!s?.includes(a),headerStyles:u},i)})})),P=(0,s.memo)(C)}}]);