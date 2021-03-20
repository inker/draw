(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[6593,6525],{76283:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>w});var o=t(85893),n=t(67294),i=t(96026),r=t(83608),c=t(69983),a=t(47810),l=t(54198),u=t(53998),d=t(31173),m=t(43887),p=t(31080),h=t(1245),f=t(26127),v=t(48415),Z=t(92317),x=t(12414),j=t(11614),g=t(45033),b=t(70021);function k(e){return{currentMatchupNum:0,currentPotNum:1,possiblePairings:null,pots:e.map((e=>c(e))),matchups:i(8).map((()=>[]))}}const w=(0,n.memo)((({season:e,pots:s})=>{const[t,i]=(0,l.Z)(),[c,w]=(0,u.Z)(),[{currentMatchupNum:P,currentPotNum:y,possiblePairings:N,pots:C,matchups:E},T]=(0,n.useState)((()=>k(s)));(0,n.useEffect)((()=>{T(k(s))}),[s,t]);const[,M]=(0,a.Z)(),[S]=(0,d.Z)(),$=(0,m.Z)(b.default),F=(0,n.useRef)(null),G=(0,n.useCallback)((async(s,t)=>{try{return(await $({season:e,pots:s,matchups:t})).possiblePairings}catch(e){throw M({error:"Could not determine possible pairings"}),e}}),[e,$]),R=(0,n.useCallback)((async e=>{const s=C[y],t=N?N[e]:e,o=s[t],n=C.slice();n[y]=n[y].filter(((e,s)=>s!==t));const i=E.slice();i[P]=[...i[P],o];const r=1===y?await G(n,i):null;T({currentPotNum:1-y,currentMatchupNum:P-y+1,possiblePairings:r,pots:n,matchups:i})}),[C,E,y,P,N]),O=()=>{if(c)return;(1===(null==N?void 0:N.length)||1===y&&1===C[1].length)&&R(0)};(0,n.useEffect)((()=>{setTimeout(O,250)}),[y]);const A=(0,n.useMemo)((()=>N&&C[0].filter(((e,s)=>N.includes(s)))),[N]),D=P>=s[0].length;(0,n.useEffect)((()=>{if(c){const e=(null!=A?A:C[1]).length;if(e>0){const s=r(e-1);R(s)}}}),[c,y]),(0,n.useEffect)((()=>{D&&c&&w(!1)}),[D,c]);const W=N?N.map((e=>C[0][e])):[];return(0,o.jsxs)(p.Z,{children:[(0,o.jsxs)(v.Z,{children:[(0,o.jsx)(h.Z,{selectedTeams:W,initialPots:s,pots:C,currentPotNum:y},void 0),(0,o.jsx)(f.Z,{ref:F,matchups:E},void 0)]},void 0),(0,o.jsxs)(Z.Z,{children:[!c&&(0,o.jsxs)(o.Fragment,{children:[!D&&(0,o.jsx)(j.Z,{children:"Runners-up"},void 0),(0,o.jsx)(x.Z,{forceNoSelect:0===y,display:!D,displayTeams:S,selectedTeam:null,pot:C[1],onPick:R},void 0),!D&&(0,o.jsx)(j.Z,{children:"Group Winners"},void 0),A&&(0,o.jsx)(x.Z,{forceNoSelect:1===y,display:!D,displayTeams:S,selectedTeam:null,pot:A,onPick:R},void 0)]},void 0),D&&(0,o.jsx)(g.Z,{long:!1,completed:D,selectedTeam:null,pickedGroup:null,possibleGroups:null,numGroups:0,groupsElement:F,reset:i},void 0)]},void 0)]},void 0)}))},26127:(e,s,t)=>{"use strict";t.d(s,{Z:()=>y});var o=t(85893),n=t(67294),i=t(29163),r=t(42048),c=t(68398),a=t(24729),l=t(97256),u=t(72935),d=t(86893),m=t(64982),p=t(930),h=t(93749),f=t(19992);const v=i.F4`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,Z=i.F4`
  from {
    background-color: rgba(192, 224, 255, 0.5);
  }
  to {}
`,x=i.iv`
  animation: ${e=>e.theme.isDarkMode?Z:v} 3s ease-out normal forwards;
`,j=(0,i.ZP)(a.Z)`
  width: 150px;
  ${e=>e.picked&&x}
  ${e=>e.styles}
`,g=(0,n.memo)((({team:e})=>{var s;const t=(0,u.Z)(e),[r,c]=(0,n.useState)(e),[a,l]=(0,n.useState)(!1),v=(0,n.useContext)(i.Ni),Z=(0,n.useRef)(null),x=(0,n.useCallback)((()=>l(!1)),[]),g=(0,n.useCallback)((()=>{c(e),l(!0)}),[e]);return(0,d.Z)((()=>{x()}),[v]),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(j,Object.assign({picked:a&&!!r,onAnimationEnd:x},{children:r?(0,o.jsx)(p.Z,Object.assign({country:(0,m.Z)(r)},{children:null!==(s=r.shortName)&&void 0!==s?s:r.name}),void 0):(0,o.jsx)(h.Z,{ref:Z},void 0)}),void 0),e&&e!==t&&(0,o.jsx)(f.Z,{from:`[data-cellid='${e.id}']`,to:Z,duration:350,team:e,onAnimationEnd:g},void 0)]},void 0)})),b=(0,i.ZP)(l.Z)`
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
`},70021:(e,s,t)=>{"use strict";function o(){return new Worker(t.p+"worker.73778dc1fca4e2093786.worker.js")}t.r(s),t.d(s,{default:()=>o})}}]);