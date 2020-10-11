(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[6349,425],{52278:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>y});var l=n(67294),r=n(96026),a=n(83608),s=n(69983),c=n(47810),o=n(54198),u=n(53998),m=n(31173),i=n(19760),p=n(43887),d=n(31080),f=n(1245),Z=n(26127),E=n(48415),h=n(92317),g=n(12414),k=n(11614),b=n(45033),w=n(35416);function P(e){return{currentMatchupNum:0,currentPotNum:1,possiblePairings:null,pots:e.map((e=>s(e))),matchups:r(16).map((()=>[]))}}const y=(0,l.memo)((({season:e,pots:t})=>{const[n,r]=(0,o.Z)(),[s,y]=(0,u.Z)(),[{currentMatchupNum:N,currentPotNum:v,possiblePairings:C,pots:x,matchups:T},M]=(0,l.useState)((()=>P(t)));(0,l.useEffect)((()=>{M(P(t))}),[t,n]);const S=(0,i.Z)("(min-height: 750px)"),[,$]=(0,c.Z)(),[F]=(0,m.Z)(),G=(0,p.Z)(w.default),R=(0,l.useRef)(null),j=(0,l.useCallback)((async(t,n)=>{try{return(await G({season:e,pots:t,matchups:n})).possiblePairings}catch(e){throw $({error:"Could not determine possible pairings"}),e}}),[e,G]),A=(0,l.useCallback)((async e=>{const t=x[v],n=C?C[e]:e,l=t[n],r=x.slice();r[v]=r[v].filter(((e,t)=>t!==n));const a=T.slice();a[N]=[...a[N],l];const s=1===v?await j(r,a):null;M({currentPotNum:1-v,currentMatchupNum:N-v+1,possiblePairings:s,pots:r,matchups:a})}),[x,T,v,N,C]),D=()=>{if(s)return;(1===(null==C?void 0:C.length)||1===v&&1===x[1].length)&&A(0)};(0,l.useEffect)((()=>{setTimeout(D,250)}),[v]);const W=(0,l.useMemo)((()=>C&&x[0].filter(((e,t)=>C.includes(t)))),[C]),q=N>=t[0].length;(0,l.useEffect)((()=>{if(s){const e=(null!=W?W:x[1]).length;if(e>0){const t=a(e-1);A(t)}}}),[s,v]),(0,l.useEffect)((()=>{q&&s&&y(!1)}),[q,s]);const z=C?C.map((e=>x[0][e])):[];return l.createElement(d.Z,null,l.createElement(E.Z,null,l.createElement(f.Z,{selectedTeams:z,initialPots:t,pots:x,currentPotNum:v,split:!S}),l.createElement(Z.Z,{ref:R,matchups:T})),l.createElement(h.Z,null,!s&&l.createElement(l.Fragment,null,!q&&l.createElement(k.Z,null,"Runners-up"),l.createElement(g.Z,{forceNoSelect:0===v,display:!q,displayTeams:F,selectedTeam:null,pot:x[1],onPick:A}),!q&&l.createElement(k.Z,null,"Group Winners"),W&&l.createElement(g.Z,{forceNoSelect:1===v,display:!q,displayTeams:F,selectedTeam:null,pot:W,onPick:A})),q&&l.createElement(b.Z,{long:!1,completed:q,selectedTeam:null,pickedGroup:null,possibleGroups:null,numGroups:0,groupsElement:R,reset:r})))}))},26127:(e,t,n)=>{"use strict";n.d(t,{Z:()=>N});var l=n(67294),r=n(29163),a=n(42048),s=n(68398),c=n(24729),o=n(97256),u=n(72935),m=n(86893),i=n(64982),p=n(930),d=n(93749),f=n(19992);const Z=r.F4`
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
`,g=(0,r.ZP)(c.Z)`
  width: 150px;
  ${e=>e.picked&&h};
  ${e=>e.styles};
`,k=(0,l.memo)((({team:e})=>{var t;const n=(0,u.Z)(e),[a,s]=(0,l.useState)(e),[c,o]=(0,l.useState)(!1),Z=(0,l.useContext)(r.Ni),E=(0,l.useRef)(null),h=(0,l.useCallback)((()=>o(!1)),[]),k=(0,l.useCallback)((()=>{s(e),o(!0)}),[e]);return(0,m.Z)((()=>{h()}),[Z]),l.createElement(l.Fragment,null,l.createElement(g,{picked:c&&!!a,onAnimationEnd:h},a?l.createElement(p.Z,{country:(0,i.Z)(a)},null!==(t=a.shortName)&&void 0!==t?t:a.name):l.createElement(d.Z,{ref:E})),e&&e!==n&&l.createElement(f.Z,{from:`[data-cellid='${e.id}']`,to:E,duration:350,team:e,onAnimationEnd:k}))})),b=(0,r.ZP)(o.Z)`
  justify-content: center;
  width: 23px;
  color: ${e=>e.theme.isDarkMode?"#ccc":"#333"};

  &::before {
    content: 'v';
  }
`,w=(0,l.memo)((({teams:e})=>{const[t,n]=null!=e?e:[];return l.createElement(s.Z,null,l.createElement(k,{team:t}),l.createElement(c.Z,null,l.createElement(b,null)),l.createElement(k,{team:n}))})),P=(0,r.ZP)(a.Z)`
  width: auto;
  align-self: center;
  max-width: initial;
`,y=(0,l.forwardRef)((({matchups:e},t)=>l.createElement(P,{ref:t},l.createElement("tbody",null,null==e?void 0:e.map(((e,t)=>l.createElement(w,{key:t,teams:e}))))))),N=(0,l.memo)(y)},11614:(e,t,n)=>{"use strict";n.d(t,{Z:()=>l});const l=n(29163).ZP.div`
  margin-top: 10px;
  margin-bottom: 5px;
  user-select: none;
`},35416:(e,t,n)=>{"use strict";function l(){return new Worker(n.p+"worker.bfa963f04d429f354082.worker.js")}n.r(t),n.d(t,{default:()=>l})}}]);