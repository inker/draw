(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[6349,425],{52278:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>P});var o=t(85893),n=t(67294),i=t(96026),r=t(83608),c=t(69983),a=t(47810),l=t(54198),u=t(53998),d=t(31173),m=t(19760),p=t(43887),h=t(31080),f=t(1245),Z=t(26127),v=t(48415),x=t(92317),j=t(12414),g=t(11614),b=t(45033),k=t(35416);function w(e){return{currentMatchupNum:0,currentPotNum:1,possiblePairings:null,pots:e.map((e=>c(e))),matchups:i(16).map((()=>[]))}}const P=(0,n.memo)((({season:e,pots:s})=>{const[t,i]=(0,l.Z)(),[c,P]=(0,u.Z)(),[{currentMatchupNum:y,currentPotNum:N,possiblePairings:C,pots:E,matchups:T},M]=(0,n.useState)((()=>w(s)));(0,n.useEffect)((()=>{M(w(s))}),[s,t]);const S=(0,m.Z)("(min-height: 750px)"),[,$]=(0,a.Z)(),[F]=(0,d.Z)(),G=(0,p.Z)(k.default),R=(0,n.useRef)(null),O=(0,n.useCallback)((async(s,t)=>{try{return(await G({season:e,pots:s,matchups:t})).possiblePairings}catch(e){throw $({error:"Could not determine possible pairings"}),e}}),[e,G]),A=(0,n.useCallback)((async e=>{const s=E[N],t=C?C[e]:e,o=s[t],n=E.slice();n[N]=n[N].filter(((e,s)=>s!==t));const i=T.slice();i[y]=[...i[y],o];const r=1===N?await O(n,i):null;M({currentPotNum:1-N,currentMatchupNum:y-N+1,possiblePairings:r,pots:n,matchups:i})}),[E,T,N,y,C]),D=()=>{if(c)return;(1===(null==C?void 0:C.length)||1===N&&1===E[1].length)&&A(0)};(0,n.useEffect)((()=>{setTimeout(D,250)}),[N]);const W=(0,n.useMemo)((()=>C&&E[0].filter(((e,s)=>C.includes(s)))),[C]),q=y>=s[0].length;(0,n.useEffect)((()=>{if(c){const e=(null!=W?W:E[1]).length;if(e>0){const s=r(e-1);A(s)}}}),[c,N]),(0,n.useEffect)((()=>{q&&c&&P(!1)}),[q,c]);const z=C?C.map((e=>E[0][e])):[];return(0,o.jsxs)(h.Z,{children:[(0,o.jsxs)(v.Z,{children:[(0,o.jsx)(f.Z,{selectedTeams:z,initialPots:s,pots:E,currentPotNum:N,split:!S},void 0),(0,o.jsx)(Z.Z,{ref:R,matchups:T},void 0)]},void 0),(0,o.jsxs)(x.Z,{children:[!c&&(0,o.jsxs)(o.Fragment,{children:[!q&&(0,o.jsx)(g.Z,{children:"Runners-up"},void 0),(0,o.jsx)(j.Z,{forceNoSelect:0===N,display:!q,displayTeams:F,selectedTeam:null,pot:E[1],onPick:A},void 0),!q&&(0,o.jsx)(g.Z,{children:"Group Winners"},void 0),W&&(0,o.jsx)(j.Z,{forceNoSelect:1===N,display:!q,displayTeams:F,selectedTeam:null,pot:W,onPick:A},void 0)]},void 0),q&&(0,o.jsx)(b.Z,{long:!1,completed:q,selectedTeam:null,pickedGroup:null,possibleGroups:null,numGroups:0,groupsElement:R,reset:i},void 0)]},void 0)]},void 0)}))},26127:(e,s,t)=>{"use strict";t.d(s,{Z:()=>y});var o=t(85893),n=t(67294),i=t(29163),r=t(42048),c=t(68398),a=t(24729),l=t(97256),u=t(72935),d=t(86893),m=t(64982),p=t(930),h=t(93749),f=t(19992);const Z=i.F4`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,v=i.F4`
  from {
    background-color: rgba(192, 224, 255, 0.5);
  }
  to {}
`,x=i.iv`
  animation: ${e=>e.theme.isDarkMode?v:Z} 3s ease-out normal forwards;
`,j=(0,i.ZP)(a.Z)`
  width: 150px;
  ${e=>e.picked&&x}
  ${e=>e.styles}
`,g=(0,n.memo)((({team:e})=>{var s;const t=(0,u.Z)(e),[r,c]=(0,n.useState)(e),[a,l]=(0,n.useState)(!1),Z=(0,n.useContext)(i.Ni),v=(0,n.useRef)(null),x=(0,n.useCallback)((()=>l(!1)),[]),g=(0,n.useCallback)((()=>{c(e),l(!0)}),[e]);return(0,d.Z)((()=>{x()}),[Z]),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(j,Object.assign({picked:a&&!!r,onAnimationEnd:x},{children:r?(0,o.jsx)(p.Z,Object.assign({country:(0,m.Z)(r)},{children:null!==(s=r.shortName)&&void 0!==s?s:r.name}),void 0):(0,o.jsx)(h.Z,{ref:v},void 0)}),void 0),e&&e!==t&&(0,o.jsx)(f.Z,{from:`[data-cellid='${e.id}']`,to:v,duration:350,team:e,onAnimationEnd:g},void 0)]},void 0)})),b=(0,i.ZP)(l.Z)`
  justify-content: center;
  width: 23px;
  color: ${e=>e.theme.isDarkMode?"#ccc":"#333"};

  &::before {
    content: 'v';
  }
`,k=(0,n.memo)((({teams:e})=>{const[s,t]=null!=e?e:[];return(0,o.jsxs)(c.Z,{children:[(0,o.jsx)(g,{team:s},void 0),(0,o.jsx)(a.Z,{children:(0,o.jsx)(b,{},void 0)},void 0),(0,o.jsx)(g,{team:t},void 0)]},void 0)})),w=(0,i.ZP)(r.Z)`
  width: auto;
  align-self: center;
  max-width: initial;
`,P=(0,n.forwardRef)((({matchups:e},s)=>(0,o.jsx)(w,Object.assign({ref:s},{children:(0,o.jsx)("tbody",{children:null==e?void 0:e.map(((e,s)=>(0,o.jsx)(k,{teams:e},s)))},void 0)}),void 0))),y=(0,n.memo)(P)},11614:(e,s,t)=>{"use strict";t.d(s,{Z:()=>o});const o=t(29163).ZP.div`
  margin-top: 10px;
  margin-bottom: 5px;
  user-select: none;
`},35416:(e,s,t)=>{"use strict";function o(){return new Worker(t.p+"workers/worker.73778dc1fca4e2093786.js")}t.r(s),t.d(s,{default:()=>o})}}]);