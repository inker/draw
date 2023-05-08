"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[3561],{3447:(e,t,n)=>{n.d(t,{Z:()=>T});var i=n(85893),o=n(67294),r=n(12788),s=n(18731);const d=s.Z.withComponent("button"),a=(0,r.ZP)(d)`
  padding: initial;
  border: initial;
  background-color: initial;
`;var l=n(32531);const c=(0,o.memo)((function({children:e,delay:t}){return(e=>{const[t,n]=(0,o.useState)(!1);return(0,o.useEffect)((()=>{const t=setTimeout((()=>{n(!0)}),e);return()=>{clearTimeout(t)}}),[]),t})(t)?e:null}));var m=n(788),u=n(96026),p=n.n(u);const x=r.ZP.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2px;
  width: 25px;
  height: 25px;
  border-width: 1px;
  border-style: solid;
  border-radius: 100%;
  font-size: 18px;
  ${e=>e.possible?r.iv`
      color: ${e.color};
    `:r.iv`
      border-color: rgb(0 0 0 / 0);
      filter: opacity(0.25);
    `}
`,h=r.ZP.div`
  display: flex;
  justify-content: center;
  margin-top: 2px;
`;const f=(0,o.memo)((function({numGroups:e,possibleGroups:t}){const n=e>>1;return(0,i.jsx)(h,{children:p()(e).map((e=>{const o=(0,m.Z)(e);return(0,i.jsx)(x,{color:e<n?"red":"blue",possible:t.includes(e),children:o},o)}))})})),g=r.ZP.div`
  padding: 10px;
  border-width: 2px;
  border-style: dashed;
  border-color: rgb(255 0 0 / 0.5);
`;const v=(0,o.memo)((function(){return(0,i.jsxs)(g,{children:[(0,i.jsx)("div",{children:"Calculation is taking too long."}),(0,i.jsxs)("div",{children:["And"," ",(0,i.jsx)(s.Z,{href:"https://github.com/inker/draw/issues/14",target:"_blank",rel:"noopener",children:"here's why"}),"."]})]})}));var w=n(26962),b=n.n(w);const Z=r.vJ`
  body * {
    transition-property: none !important;
    animation: none !important;
  }
`,y=Promise.all([n.e(1404),n.e(2154)]).then(n.bind(n,15135)),j=()=>({downloadClicked:null,transitionsEnabled:!0});const k=(0,o.memo)((function({completed:e,groupsElement:t}){const[{downloadClicked:n,transitionsEnabled:r},s]=(0,o.useState)(j),d=(0,o.useCallback)((e=>{s({downloadClicked:e,transitionsEnabled:!1})}),[s]);(0,o.useEffect)((()=>{(async()=>{if(n){try{const e=t.current;if(!e)throw new Error("groups element is null");await b()(0);const i=await y;await i.default(e,n)}catch(e){console.error(e)}d(null)}})()}),[n]),(0,o.useEffect)((()=>{e||s({downloadClicked:null,transitionsEnabled:!0})}),[e]);const l=(0,o.useCallback)((()=>d("png")),[d]),c=(0,o.useCallback)((()=>d("svg")),[d]);return e&&t?(0,i.jsxs)("div",{children:[!r&&(0,i.jsx)(Z,{}),"Download as ",(0,i.jsx)(a,{onClick:l,children:"PNG"}),", ",(0,i.jsx)(a,{onClick:c,children:"SVG"})]}):null})),P=r.ZP.div`
  vertical-align: middle;
  margin-top: 30px;
  margin-bottom: 30px;
  width: 100%;
  font-size: 1.25em;
  line-height: 150%;
  user-select: none;

  @media (max-width: 999px) {
    margin-top: 15px;
    margin-bottom: 15px;
  }
`,$=r.ZP.span`
  display: inline-block;
`,C=r.ZP.strong`
  font-weight: 600;
`,E=r.ZP.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > * + * {
    margin-top: 12px;
  }
`;const T=(0,o.memo)((function({long:e,completed:t,selectedTeam:n,pickedGroup:r,possibleGroups:s,isDisplayPossibleGroupsText:d,numGroups:u,groupsElement:p,reset:x}){const h=(0,o.useRef)(null),g=(0,o.useRef)(null);(0,o.useEffect)((()=>{g.current=t?null:n}),[t,n]);const w=g.current??n;return t?(0,i.jsx)(P,{children:(0,i.jsxs)(E,{children:[(0,i.jsx)("div",{children:"Draw completed!"}),(0,i.jsx)(k,{completed:t,groupsElement:p}),(0,i.jsx)(a,{onClick:x,children:"Restart"})]})}):null!==r?(h.current=(0,i.jsx)(P,{children:(0,i.jsxs)("div",{children:[e&&w?(0,i.jsxs)("span",{children:[(0,i.jsx)(C,{children:w.shortName??w.name})," goes to group"]}):(0,i.jsx)("span",{children:"Group"})," ",(0,i.jsx)(C,{children:(0,m.Z)(r)}),"!"]})}),h.current):w?(0,i.jsx)(P,{children:d?(0,i.jsxs)("div",{children:["Possible groups for"," ",(0,i.jsxs)($,{children:[(0,i.jsx)(C,{children:w.name}),":"]}),s?(0,i.jsx)(f,{numGroups:u,possibleGroups:s}):(0,i.jsxs)("div",{children:[(0,i.jsx)(l.Z,{initialNum:0,maxNum:10,interval:2e3}),(0,i.jsx)(c,{delay:1e4,children:(0,i.jsx)(v,{})})]})]}):h.current}):(0,i.jsx)(P,{children:"Pick a ball"})}))},90604:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n(12788).ZP.div`
  display: flex;
  flex-direction: column;
  margin: 0 5px 10px;
  min-width: 35%;
  text-align: center;

  @media (max-width: 999px) {
    align-items: center;
  }
`},10694:(e,t,n)=>{n.d(t,{Z:()=>y});var i=n(85893),o=n(67294),r=n(12788),s=n(58020),d=n(14293),a=n.n(d),l=n(68020);let c;var m=n(73935),u=n(12988);const p=(0,o.memo)((({tagName:e,modalRoot:t,children:n})=>{const i=(0,o.useMemo)((()=>{const t=u.includes(e)&&"svg"!==e?"http://www.w3.org/1999/xhtml":"http://www.w3.org/2000/svg";return document.createElementNS(t,e)}),[e,t]),r=(0,o.useRef)(i);return(0,o.useEffect)((()=>(t.appendChild(i),()=>{t.removeChild(i)})),[]),m.createPortal(n,r.current)})),x=((e,...t)=>{c||(c=document.createElement("style"),document.head.appendChild(c));const n=(0,l.Z)("styled-element-"),i=((e,...t)=>e.reduce(((e,n,i)=>`${e}${n}${a()(t[i])?"":t[i]}`),""))(e,...t);return c.textContent+=`.${n}{${i}}`,n})`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  pointer-events: none;
`,h=document.createElement("div");h.classList.add(x),document.body.insertBefore(h,document.getElementById("app"));const f=(0,o.memo)((function({children:e}){return(0,i.jsx)(p,{tagName:"div",modalRoot:h,children:e})}));var g=n(39548);const v=(0,r.ZP)(g.Z)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  margin: 0;
  user-select: none;
  pointer-events: none;
`,w=e=>"string"==typeof e?document.querySelector(e):e.current,b=e=>`transform ${e}ms ease-in-out`;function Z(e){const{left:t,top:n}=e.getBoundingClientRect();return`translate3d(${t}px, ${n}px, 0px)`}const y=(0,o.memo)((function({from:e,to:t,duration:n,team:r,onAnimationEnd:d}){const a=(0,o.useMemo)((()=>w(e)),[e]),l=(0,o.useMemo)((()=>w(t)),[t]),[c,m]=(0,o.useState)(a);(0,o.useLayoutEffect)((()=>{c===a&&m(l)}),[c]);const u=(0,o.useMemo)((()=>({transform:c instanceof HTMLElement?Z(c):"",transition:c===l?b(n):""})),[c,l,n]),p=(0,o.useCallback)((e=>{"transform"===e.propertyName&&d?.()}),[d]);return c&&(0,i.jsx)(f,{children:(0,i.jsx)(v,{country:(0,s.Z)(r),style:u,onTransitionEnd:p,children:r.shortName??r.name})})}))},85973:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n(12788).ZP.div`
  display: flex;
  margin: auto;
  width: 1000px;

  @media (max-width: 999px) {
    flex-direction: column;
    width: 100%;
  }
`},62367:(e,t,n)=>{n.d(t,{Z:()=>C});var i=n(85893),o=n(67294),r=n(12788),s=n(91966),d=n.n(s);const a=r.ZP.div`
  display: flex;
  flex-flow: row wrap;
  flex-wrap: nowrap;
  justify-content: center;

  > * {
    flex: 1;
    flex-basis: 22%;
    ${e=>e.limitWidth&&r.iv`
      max-width: 160px;
    `}

    @media (max-width: 999px) {
      max-width: initial;
    }
  }
`;var l=n(96026),c=n.n(l),m=n(23132),u=n(69585),p=n(42486);const x=(0,r.ZP)(p.Z)`
  transform: box-shadow 1s linear;
  ${e=>e.highlighted&&"\n\n  "}
`;var h=n(32415);const f=r.iv`
  filter: grayscale(0.5);
  opacity: 0.4;
`,g=r.iv`
  color: #f70;
`,v=(0,r.ZP)(h.Z)`
  ${e=>e.depleted&&f}
  ${e=>e.highlighted&&g}
`,w=(0,r.ZP)(u.Z)`
  & + & {
    border-left: ${e=>e.theme.border};
  }
`;var b=n(39548);const Z=r.iv`
  color: ${e=>e.theme.isDarkMode?"yellow":"blue"};
`,y=r.iv`
  filter: grayscale(0.5);
  opacity: 0.4;
`,j=(0,r.ZP)(b.Z)`
  ${e=>e.selected&&Z}
  ${e=>e.picked&&y}
`;const k=(0,o.memo)((function({teams:e,pickedTeams:t,selectedTeams:n}){return(0,i.jsx)(m.Z,{children:e.map((e=>{const{name:o,country:r,shortName:s,pairing:d}=e;return(0,i.jsx)(w,{children:(0,i.jsx)(j,{"data-cellid":e.id,title:d&&`paired with ${d.shortName??d.name}`,selected:!!n?.includes(e),picked:t.includes(e),country:r??o,children:s??o})},e.id)}))})}));const P=(0,o.memo)((function({isCurrent:e,potNum:t,teams:n,pickedTeams:o,selectedTeams:r,numCols:s,headerStyles:d}){const a=n.length/s;return(0,i.jsxs)(x,{highlighted:e,children:[(0,i.jsx)("thead",{children:(0,i.jsx)(m.Z,{children:(0,i.jsx)(u.Z,{colSpan:s,children:(0,i.jsxs)(v,{highlighted:e,depleted:!n||o.length===n.length,styles:d,children:["Pot ",t+1]})})})}),(0,i.jsx)("tbody",{children:c()(a).map((e=>{const t=e*s,d=c()(s).map((e=>n[t+e]));return(0,i.jsx)(k,{teams:d,selectedTeams:r,pickedTeams:o},d.map((e=>e.id)).join(":"))}))})]})})),$=r.iv`
  background-color: rgb(0 0 0 / 0.75);
  color: #fff;
`;const C=(0,o.memo)((function({initialPots:e,pots:t,selectedTeams:n,currentPotNum:o,split:r}){return(0,i.jsx)(a,{limitWidth:!r,children:e.map(((s,a)=>{const l=a===o,c=d()(e[a],t[a],n??[]);return(0,i.jsx)(P,{potNum:a,isCurrent:l,teams:s,pickedTeams:c,selectedTeams:n,numCols:r?2:1,headerStyles:$},s[0].id)}))})}))},36756:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n(12788).ZP.div`
  display: flex;
  flex-direction: column;
  margin: 0 5px 10px;
  min-width: 65%;
`},10804:(e,t,n)=>{n.d(t,{Z:()=>a});var i=n(85893),o=n(67294),r=n(12788);const s=r.ZP.div`
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center; /* align vertical */
  margin: 2px;
  width: 67px;
  height: 67px;
  padding: 10px;
  font-family: 'Arial Narrow', 'Ubuntu Condensed', sans-serif;
  text-align: center;
  text-overflow: ellipsis;
  color: white;
  background: radial-gradient(#004, #002, #002);
  border-radius: 100%;
  cursor: pointer;
  user-select: none;

  @media (max-width: 999px) {
    flex-flow: row wrap;

    > * {
      flex: 1;
      flex-basis: 22%;
    }

    width: 21px;
    height: 21px;
  }
`,d=(0,r.ZP)(s)`
  ${e=>e.selected?r.iv`
      font-size: 0.8em;
      font-weight: bold;
      color: white;
    `:r.iv`
      font-size: 0;
      background: radial-gradient(#004, #002, #002);
    `}

  ${e=>e.forceVisible&&r.iv`
    font-size: 0.8em;
  `}

  @media (max-width: 999px) {
    font-size: ${e=>e.selected?8:0}px;
  }
`;const a=(0,o.memo)((function({noHover:e,...t}){const n=(0,o.useRef)(null),r=(0,o.useCallback)((t=>{const i=n.current;!e&&i&&document.activeElement===i&&"Enter"===t.key&&i.click()}),[n,e]);var s,a;return s="keydown",a=r,(0,o.useEffect)((()=>(window.addEventListener(s,a),()=>{window.removeEventListener(s,a)})),[s,a]),(0,i.jsx)(d,{...t,noHover:e,ref:n,tabIndex:e?void 0:0})}))},55020:(e,t,n)=>{n.d(t,{Z:()=>l});var i=n(85893),o=n(67294),r=n(12788),s=n(10804);const d=(0,r.ZP)(s.Z)`
  background:
    ${e=>e.selected?"#004":e.notSelected?"#ddd":"radial-gradient(#fff, #004)"};
  cursor: ${e=>e.noHover?"not-allowed":"pointer"};

  &:hover {
    ${e=>!e.noHover&&r.iv`
      background: radial-gradient(#ccf, #ccf);
    `}
  }
`,a=r.ZP.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 999px) {
    justify-content: center;
  }
`;const l=(0,o.memo)((function({forceNoSelect:e,display:t,displayTeams:n,pot:r,selectedTeam:s,onPick:l}){const c=(0,o.useCallback)((e=>{const t=e.target,n=r.findIndex((e=>e.id===t.dataset.teamid));l(n,r)}),[r,l]),m=e||s;return(0,i.jsx)(a,{children:t&&r.map((t=>(0,i.jsx)(d,{"data-teamid":t.id,selected:t===s,notSelected:e||!!s&&t!==s,forceVisible:n,noHover:!!m,onClick:m?void 0:c,children:t.shortName??t.name},t.id)))})}))},82376:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n(12788).ZP.span`
  display: flex;
  align-items: center;
  text-align: center;
  text-decoration: none;
  font-family: Tahoma, Arial, sans-serif;
  font-size: 12px;

  @media (max-width: 999px) {
    font-family: Roboto, sans-serif;
    font-size: 10px;
  }
`},69585:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n(12788).ZP.td`
  height: 20px;
  padding: 0;
  background-color: ${e=>e.theme.isDarkMode?"#58595e":"white"};

  @media (max-width: 999px) {
    height: 14px;
  }
`},93753:(e,t,n)=>{n.d(t,{Z:()=>r});var i=n(12788),o=n(82376);const r=(0,i.ZP)(o.Z)`
  overflow: hidden;
  margin: 0 3px;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${e=>e.theme.isDarkMode&&i.iv`
    text-shadow: 0.5px 0.5px 1px #222;
  `}

  @media (max-width: 999px) {
    font-family: 'Roboto Condensed', RobotoCondensed, RobotoCondensed-Regular, sans-serif;
  }
`},39548:(e,t,n)=>{n.d(t,{Z:()=>d});var i=n(12788),o=n(41915),r=n(93753);const s=(0,i.ZP)(r.Z)`
  padding-left: 19px;
  background-position-y: 1px;
  background-size: 16px;
  background-repeat: no-repeat;

  @media (max-width: 999px) {
    padding-left: 13px;
    background-size: 12px;
  }
`,d=(0,i.ZP)(s)`
  ${({country:e})=>e&&i.iv`
    background-image: url('${(0,o.Z)(e)}');
  `}
`},10606:(e,t,n)=>{n.d(t,{Z:()=>r});var i=n(12788),o=n(93753);const r=(0,i.ZP)(o.Z)`
  visibility: hidden;
  pointer-events: none;

  &::before {
    content: '.';
  }
`},32415:(e,t,n)=>{n.d(t,{Z:()=>r});var i=n(12788),o=n(82376);const r=(0,i.ZP)(o.Z)`
  justify-content: center;
  width: 100%;
  height: 100%;
  font-weight: 600;
  ${e=>e.styles}
`},23132:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n(12788).ZP.tr`
  border: ${e=>e.theme.border};
`},42486:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n(12788).ZP.table`
  margin: 0 5px 10px;
  width: 150px;
  min-width: 0;
  table-layout: fixed;
  border-left: ${e=>e.theme.border};
  border-right: ${e=>e.theme.border};
  border-spacing: 0;
  border-collapse: collapse;

  @media (max-width: 999px) {
    margin: 0 3px 6px;
    width: max-content;
  }
`},788:(e,t,n)=>{n.d(t,{Z:()=>i});const i=e=>String.fromCodePoint(65+e)},68020:(e,t,n)=>{n.d(t,{Z:()=>i});const i=(e="")=>`${e}${Math.random().toString(36).slice(2)}`},58020:(e,t,n)=>{n.d(t,{Z:()=>o});var i=n(72574);const o=e=>e.country??(e.name in i.Z?e.name:void 0)},41771:(e,t,n)=>{n.d(t,{Z:()=>o});var i=n(67294);const o=(e,t)=>{const n=(0,i.useRef)(!1);(0,i.useEffect)((()=>{n.current?e():n.current=!0}),t)}},84048:(e,t,n)=>{n.d(t,{Z:()=>o});var i=n(67294);const o=e=>{const t=(0,i.useRef)();return(0,i.useEffect)((()=>{t.current=e})),t.current}},17187:(e,t,n)=>{n.d(t,{Z:()=>r});var i=n(67294);var o=n(68020);const r=e=>{const t=(e=>{const t=(0,i.useMemo)((()=>e()),[e]);return(0,i.useEffect)((()=>()=>{t.terminate()}),[t]),t})(e);return(0,i.useCallback)((e=>((e,t)=>new Promise(((n,i)=>{const r=(0,o.Z)(),s=t=>{t.data.messageId===r&&(e.removeEventListener("message",s),n(t.data.data))};e.addEventListener("message",s),e.addEventListener("messageerror",i),e.addEventListener("error",i),e.postMessage({messageId:r,data:t})})))(t,e)),[t])}}}]);