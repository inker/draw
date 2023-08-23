"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[5527],{72331:(e,r,s)=>{s.r(r),s.d(r,{default:()=>v});var t=s(85893),o=s(67294),l=s(70394),n=s(62002),i=s(21225),a=s(80676),u=s(40339),c=s(27603),d=s(56285),p=s(43761),f=s(43510),m=s(72723),h=s(11726),x=s(80528),b=s(85704),Z=s(18753),g=s(40410),k=s(12365);let j=()=>new Worker(new URL(s.p+s.u(3930),s.b)),w=(0,n.Z)((0,l.iv)`
  background-color: ${e=>e.theme.isDarkMode?"#363":"#c0e0c0"};
`);function $(e){let r=e.map(e=>(0,i.Z)(e)),s=r[0];return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:s,pots:r,groups:e[0].map(()=>[])}}let v=(0,o.memo)(function({season:e,pots:r}){let[s,l]=(0,c.Z)(),[n,i]=(0,d.Z)(),[{currentPotNum:v,selectedTeam:y,pickedGroup:E,hungPot:G,pots:P,groups:C},T]=(0,o.useState)(()=>$(r));(0,o.useEffect)(()=>{T($(r))},[r,s]);let[,D]=(0,u.Z)(),[N]=(0,p.Z)(),F=(0,f.Z)(j),M=(0,o.useRef)(null),R=async()=>{let r;if(!y)throw Error("no selected team");try{let s=await F({season:e,pots:P,groups:C,selectedTeam:y});r=s.pickedGroup}catch(e){console.error(e),D({error:"Could not determine the group"});return}let s=C.slice();s[r]=[...s[r],y];let t=P[v].length>0?v:v+1;T({selectedTeam:null,pickedGroup:r,hungPot:P[t],currentPotNum:t,pots:P,groups:s})},S=(0,o.useCallback)(e=>{if(y)return;let r=P[v][e];if(!r)return;let s=P.slice();s[v]=s[v].filter((r,s)=>s!==e),T({currentPotNum:v,hungPot:G,selectedTeam:r,pickedGroup:null,pots:s,groups:C})},[P,C,v,G,y]);(0,o.useEffect)(()=>{y&&R()},[y]),(0,o.useEffect)(()=>{let e=P[v].findIndex(e=>e.host);S(e)},[P]);let A=v>=P.length;(0,o.useEffect)(()=>{let e=G?.length;if(n&&e){let r=(0,a.Z)(e-1);S(r)}},[n,G]),(0,o.useEffect)(()=>{A&&n&&i(!1)},[A,n]);let L=C.length;return(0,t.jsxs)(m.Z,{children:[(0,t.jsxs)(b.Z,{children:[(0,t.jsx)(h.Z,{selectedTeams:y&&[y],initialPots:r,pots:P,currentPotNum:v}),(0,t.jsx)(x.Z,{ref:M,maxTeams:P.length,currentPotNum:v,groups:C,possibleGroups:null,getGroupHeaderStyles:w})]}),(0,t.jsxs)(Z.Z,{children:[!n&&(0,t.jsx)(g.Z,{forceNoSelect:!!y,display:!A,displayTeams:N,selectedTeam:y,pot:G,onPick:S}),(0,t.jsx)(k.Z,{long:!0,completed:A,selectedTeam:y,pickedGroup:E,possibleGroups:null,isDisplayPossibleGroupsText:!!y,numGroups:L,groupsElement:M,reset:l})]})]})})},80528:(e,r,s)=>{s.d(r,{Z:()=>C});var t=s(85893),o=s(67294),l=s(70394),n=s(40726),i=s(96446),a=s(46202),u=s(48606),c=s(1850),d=s(8360),p=s(90595),f=s(63835),m=s(63494),h=s(79633),x=s(88834),b=s(43955);let Z=(0,l.F4)`
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
    animation: ${e=>e.theme.isDarkMode?g:Z} 1s ease;
    ${e=>e.theme.isDarkMode?(0,l.iv)`
      background-color: rgb(255 255 255 / 0.3);
    `:(0,l.iv)`
      box-shadow: 0 0 5px #6af;
    `}
  }
`,$=(0,l.iv)`
  animation: ${e=>e.theme.isDarkMode?j:k} 3s ease-out normal forwards;
`,v=(0,l.ZP)(d.Z)`
  ${e=>e.$possible&&w}
  ${e=>e.$picked&&$}
`,y=(0,o.memo)(function({team:e,possible:r}){let s=(0,p.Z)(e),[n,i]=(0,o.useState)(e),[a,u]=(0,o.useState)(!1),c=(0,o.useContext)(l.Ni),d=(0,o.useRef)(null),Z=(0,o.useCallback)(()=>u(!1),[]),g=(0,o.useCallback)(()=>{i(e),u(!0)},[e]);return(0,f.Z)(()=>{Z()},[c]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(v,{$picked:a&&!!n,$possible:r,onAnimationEnd:Z,children:n?(0,t.jsx)(h.Z,{$country:(0,m.Z)(n),children:n.shortName??n.name}):(0,t.jsx)(x.Z,{ref:d})}),e&&e!==s&&(0,t.jsx)(b.Z,{from:`[data-cellid='${e.id}']`,to:d,duration:350,team:e,onAnimationEnd:g})]})}),E=(0,o.memo)(function({maxTeams:e,groupLetter:r,teams:s,potNum:o,possible:l,headerStyles:n}){return(0,t.jsxs)(a.Z,{children:[(0,t.jsx)("thead",{children:(0,t.jsx)(c.Z,{children:(0,t.jsx)(d.Z,{children:(0,t.jsxs)(u.Z,{$styles:n,children:["Group"," ",r]})})})}),(0,t.jsx)("tbody",{children:(0,i.Z)(e).map(e=>(0,t.jsx)(c.Z,{children:(0,t.jsx)(y,{team:s[e],possible:e===o&&l})},e))})]})}),G=l.ZP.div`
  display: flex;
  flex-flow: row wrap;

  > * {
    flex: 1;
    flex-basis: 22%;
  }
`,P=(0,o.forwardRef)(({maxTeams:e,currentPotNum:r,groups:s,possibleGroups:o,getGroupHeaderStyles:l},i)=>(0,t.jsx)(G,{ref:i,children:s?.map((s,i)=>{let a=n.Z(i),u=l?.(i);return t.jsx(E,{maxTeams:e,groupLetter:a,teams:s,potNum:r,possible:!!o?.includes(i),headerStyles:u},a)})})),C=(0,o.memo)(P)}}]);