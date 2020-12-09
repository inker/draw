(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[6593,6525],{76283:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>P});var l=n(67294),r=n(96026),a=n(83608),s=n(69983),c=n(47810),o=n(54198),u=n(53998),m=n(31173),i=n(43887),p=n(31080),d=n(1245),f=n(26127),Z=n(48415),E=n(92317),h=n(12414),k=n(11614),b=n(45033),g=n(70021);function w(e){return{currentMatchupNum:0,currentPotNum:1,possiblePairings:null,pots:e.map((e=>s(e))),matchups:r(8).map((()=>[]))}}const P=(0,l.memo)((({season:e,pots:t})=>{const[n,r]=(0,o.Z)(),[s,P]=(0,u.Z)(),[{currentMatchupNum:y,currentPotNum:N,possiblePairings:v,pots:C,matchups:T},x]=(0,l.useState)((()=>w(t)));(0,l.useEffect)((()=>{x(w(t))}),[t,n]);const[,M]=(0,c.Z)(),[S]=(0,m.Z)(),$=(0,i.Z)(g.default),F=(0,l.useRef)(null),G=(0,l.useCallback)((async(t,n)=>{try{return(await $({season:e,pots:t,matchups:n})).possiblePairings}catch(e){throw M({error:"Could not determine possible pairings"}),e}}),[e,$]),R=(0,l.useCallback)((async e=>{const t=C[N],n=v?v[e]:e,l=t[n],r=C.slice();r[N]=r[N].filter(((e,t)=>t!==n));const a=T.slice();a[y]=[...a[y],l];const s=1===N?await G(r,a):null;x({currentPotNum:1-N,currentMatchupNum:y-N+1,possiblePairings:s,pots:r,matchups:a})}),[C,T,N,y,v]),j=()=>{if(s)return;(1===(null==v?void 0:v.length)||1===N&&1===C[1].length)&&R(0)};(0,l.useEffect)((()=>{setTimeout(j,250)}),[N]);const A=(0,l.useMemo)((()=>v&&C[0].filter(((e,t)=>v.includes(t)))),[v]),D=y>=t[0].length;(0,l.useEffect)((()=>{if(s){const e=(null!=A?A:C[1]).length;if(e>0){const t=a(e-1);R(t)}}}),[s,N]),(0,l.useEffect)((()=>{D&&s&&P(!1)}),[D,s]);const W=v?v.map((e=>C[0][e])):[];return l.createElement(p.Z,null,l.createElement(Z.Z,null,l.createElement(d.Z,{selectedTeams:W,initialPots:t,pots:C,currentPotNum:N}),l.createElement(f.Z,{ref:F,matchups:T})),l.createElement(E.Z,null,!s&&l.createElement(l.Fragment,null,!D&&l.createElement(k.Z,null,"Runners-up"),l.createElement(h.Z,{forceNoSelect:0===N,display:!D,displayTeams:S,selectedTeam:null,pot:C[1],onPick:R}),!D&&l.createElement(k.Z,null,"Group Winners"),A&&l.createElement(h.Z,{forceNoSelect:1===N,display:!D,displayTeams:S,selectedTeam:null,pot:A,onPick:R})),D&&l.createElement(b.Z,{long:!1,completed:D,selectedTeam:null,pickedGroup:null,possibleGroups:null,numGroups:0,groupsElement:F,reset:r})))}))},26127:(e,t,n)=>{"use strict";n.d(t,{Z:()=>N});var l=n(67294),r=n(29163),a=n(42048),s=n(68398),c=n(24729),o=n(97256),u=n(72935),m=n(86893),i=n(64982),p=n(930),d=n(93749),f=n(19992);const Z=r.F4`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,E=r.F4`
  from {
    background-color: rgba(192, 224, 255, 0.5);
  }
  to {}
`,h=r.iv`
  animation: ${e=>e.theme.isDarkMode?E:Z} 3s ease-out normal forwards;
`,k=(0,r.ZP)(c.Z)`
  width: 150px;
  ${e=>e.picked&&h};
  ${e=>e.styles};
`,b=(0,l.memo)((({team:e})=>{var t;const n=(0,u.Z)(e),[a,s]=(0,l.useState)(e),[c,o]=(0,l.useState)(!1),Z=(0,l.useContext)(r.Ni),E=(0,l.useRef)(null),h=(0,l.useCallback)((()=>o(!1)),[]),b=(0,l.useCallback)((()=>{s(e),o(!0)}),[e]);return(0,m.Z)((()=>{h()}),[Z]),l.createElement(l.Fragment,null,l.createElement(k,{picked:c&&!!a,onAnimationEnd:h},a?l.createElement(p.Z,{country:(0,i.Z)(a)},null!==(t=a.shortName)&&void 0!==t?t:a.name):l.createElement(d.Z,{ref:E})),e&&e!==n&&l.createElement(f.Z,{from:`[data-cellid='${e.id}']`,to:E,duration:350,team:e,onAnimationEnd:b}))})),g=(0,r.ZP)(o.Z)`
  justify-content: center;
  width: 23px;
  color: ${e=>e.theme.isDarkMode?"#ccc":"#333"};

  &::before {
    content: 'v';
  }
`,w=(0,l.memo)((({teams:e})=>{const[t,n]=null!=e?e:[];return l.createElement(s.Z,null,l.createElement(b,{team:t}),l.createElement(c.Z,null,l.createElement(g,null)),l.createElement(b,{team:n}))})),P=(0,r.ZP)(a.Z)`
  width: auto;
  align-self: center;
  max-width: initial;
`,y=(0,l.forwardRef)((({matchups:e},t)=>l.createElement(P,{ref:t},l.createElement("tbody",null,null==e?void 0:e.map(((e,t)=>l.createElement(w,{key:t,teams:e}))))))),N=(0,l.memo)(y)},11614:(e,t,n)=>{"use strict";n.d(t,{Z:()=>l});const l=n(29163).ZP.div`
  margin-top: 10px;
  margin-bottom: 5px;
  user-select: none;
`},70021:(e,t,n)=>{"use strict";function l(){return new Worker(n.p+"worker.bfa963f04d429f354082.worker.js")}n.r(t),n.d(t,{default:()=>l})}}]);