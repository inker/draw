"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[3561],{86590:(e,t,i)=>{i.d(t,{Z:()=>I});var n=i(85893),r=i(67294),l=i(12788),d=i(32108);let a=d.Z.withComponent("button"),o=(0,l.ZP)(a)`
  padding: initial;
  border: initial;
  background-color: initial;
`;var s=i(4871);let c=e=>{let[t,i]=(0,r.useState)(!1);return(0,r.useEffect)(()=>{let t=setTimeout(()=>{i(!0)},e);return()=>{clearTimeout(t)}},[]),t};function m({children:e,delay:t}){let i=c(t);return i?e:null}let u=(0,r.memo)(m);var x=i(40726),p=i(96446);let h=l.ZP.div`
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
  ${e=>e.possible?l.iv`
      color: ${e.color};
    `:l.iv`
      border-color: rgb(0 0 0 / 0);
      filter: opacity(0.25);
    `}
`,f=l.ZP.div`
  display: flex;
  justify-content: center;
  margin-top: 2px;
`;function g({numGroups:e,possibleGroups:t}){let i=e>>1;return(0,n.jsx)(f,{children:(0,p.Z)(e).map(e=>{let r=(0,x.Z)(e);return(0,n.jsx)(h,{color:e<i?"red":"blue",possible:t.includes(e),children:r},r)})})}let v=(0,r.memo)(g),w=l.ZP.div`
  padding: 10px;
  border-width: 2px;
  border-style: dashed;
  border-color: rgb(255 0 0 / 0.5);
`;function Z(){return(0,n.jsxs)(w,{children:[(0,n.jsx)("div",{children:"Calculation is taking too long."}),(0,n.jsxs)("div",{children:["And"," ",(0,n.jsx)(d.Z,{href:"https://github.com/inker/draw/issues/14",target:"_blank",rel:"noopener",children:"here's why"}),"."]})]})}let b=(0,r.memo)(Z);var j=i(26962),y=i.n(j);let k=l.vJ`
  body * {
    transition-property: none !important;
    animation: none !important;
  }
`,P=Promise.all([i.e(1404),i.e(2154)]).then(i.bind(i,19397)),$=()=>({downloadClicked:null,transitionsEnabled:!0});function C({completed:e,groupsElement:t}){let[{downloadClicked:i,transitionsEnabled:l},d]=(0,r.useState)($),a=(0,r.useCallback)(e=>{d({downloadClicked:e,transitionsEnabled:!1})},[d]);(0,r.useEffect)(()=>{(async()=>{if(i){try{let e=t.current;if(!e)throw Error("groups element is null");await y()(0);let n=await P;await n.default(e,i)}catch(e){console.error(e)}a(null)}})()},[i]),(0,r.useEffect)(()=>{e||d({downloadClicked:null,transitionsEnabled:!0})},[e]);let s=(0,r.useCallback)(()=>a("png"),[a]),c=(0,r.useCallback)(()=>a("svg"),[a]);return e&&t?(0,n.jsxs)("div",{children:[!l&&(0,n.jsx)(k,{}),"Download as ",(0,n.jsx)(o,{onClick:s,children:"PNG"}),", ",(0,n.jsx)(o,{onClick:c,children:"SVG"})]}):null}let E=(0,r.memo)(C),R=l.ZP.div`
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
`,z=l.ZP.span`
  display: inline-block;
`,M=l.ZP.strong`
  font-weight: 600;
`,N=l.ZP.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > * + * {
    margin-top: 12px;
  }
`;function S({long:e,completed:t,selectedTeam:i,pickedGroup:l,possibleGroups:d,isDisplayPossibleGroupsText:a,numGroups:c,groupsElement:m,reset:p}){let h=(0,r.useRef)(null),f=(0,r.useRef)(null);(0,r.useEffect)(()=>{f.current=t?null:i},[t,i]);let g=f.current??i;return t?(0,n.jsx)(R,{children:(0,n.jsxs)(N,{children:[(0,n.jsx)("div",{children:"Draw completed!"}),(0,n.jsx)(E,{completed:t,groupsElement:m}),(0,n.jsx)(o,{onClick:p,children:"Restart"})]})}):null!==l?(h.current=(0,n.jsx)(R,{children:(0,n.jsxs)("div",{children:[e&&g?(0,n.jsxs)("span",{children:[(0,n.jsx)(M,{children:g.shortName??g.name})," goes to group"]}):(0,n.jsx)("span",{children:"Group"}),"\xa0",(0,n.jsx)(M,{children:(0,x.Z)(l)}),"!"]})}),h.current):g?(0,n.jsx)(R,{children:a?(0,n.jsxs)("div",{children:["Possible groups for"," ",(0,n.jsxs)(z,{children:[(0,n.jsx)(M,{children:g.name}),":"]}),d?(0,n.jsx)(v,{numGroups:c,possibleGroups:d}):(0,n.jsxs)("div",{children:[(0,n.jsx)(s.Z,{initialNum:0,maxNum:10,interval:2e3}),(0,n.jsx)(u,{delay:1e4,children:(0,n.jsx)(b,{})})]})]}):h.current}):(0,n.jsx)(R,{children:"Pick a ball"})}let I=(0,r.memo)(S)},18753:(e,t,i)=>{i.d(t,{Z:()=>l});var n=i(12788);let r=n.ZP.div`
  display: flex;
  flex-direction: column;
  margin: 0 5px 10px;
  min-width: 35%;
  text-align: center;

  @media (max-width: 999px) {
    align-items: center;
  }
`,l=r},43955:(e,t,i)=>{let n;i.d(t,{Z:()=>$});var r=i(85893),l=i(67294),d=i(12788),a=i(63494),o=i(27601),s=i(11553);let c=(e,...t)=>e.reduce((e,i,n)=>`${e}${i}${(0,o.Z)(t[n])?"":t[n]}`,""),m=(e,...t)=>{n||(n=document.createElement("style"),document.head.appendChild(n));let i=(0,s.Z)("styled-element-"),r=c(e,...t);return n.textContent+=`.${i}{${r}}`,i};var u=i(73935),x=i(12988);let p=({tagName:e,modalRoot:t,children:i})=>{let n=(0,l.useMemo)(()=>{let t=x.includes(e)&&"svg"!==e?"http://www.w3.org/1999/xhtml":"http://www.w3.org/2000/svg";return document.createElementNS(t,e)},[e,t]),r=(0,l.useRef)(n);return(0,l.useEffect)(()=>(t.appendChild(n),()=>{t.removeChild(n)}),[]),u.createPortal(i,r.current)},h=(0,l.memo)(p),f=m`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  pointer-events: none;
`,g=document.createElement("div");function v({children:e}){return(0,r.jsx)(h,{tagName:"div",modalRoot:g,children:e})}g.classList.add(f),document.body.insertBefore(g,document.getElementById("app"));let w=(0,l.memo)(v);var Z=i(79633);let b=(0,d.ZP)(Z.Z)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  margin: 0;
  user-select: none;
  pointer-events: none;
`,j=e=>"string"==typeof e?document.querySelector(e):e.current,y=e=>`transform ${e}ms ease-in-out`;function k(e){let{left:t,top:i}=e.getBoundingClientRect();return`translate3d(${t}px, ${i}px, 0px)`}function P({from:e,to:t,duration:i,team:n,onAnimationEnd:d}){let o=(0,l.useMemo)(()=>j(e),[e]),s=(0,l.useMemo)(()=>j(t),[t]),[c,m]=(0,l.useState)(o);(0,l.useLayoutEffect)(()=>{c===o&&m(s)},[c]);let u=(0,l.useMemo)(()=>({transform:c instanceof HTMLElement?k(c):"",transition:c===s?y(i):""}),[c,s,i]),x=(0,l.useCallback)(e=>{"transform"===e.propertyName&&d?.()},[d]);return c&&(0,r.jsx)(w,{children:(0,r.jsx)(b,{country:(0,a.Z)(n),style:u,onTransitionEnd:x,children:n.shortName??n.name})})}let $=(0,l.memo)(P)},72723:(e,t,i)=>{i.d(t,{Z:()=>l});var n=i(12788);let r=n.ZP.div`
  display: flex;
  margin: auto;
  width: 1000px;

  @media (max-width: 999px) {
    flex-direction: column;
    width: 100%;
  }
`,l=r},11726:(e,t,i)=>{i.d(t,{Z:()=>E});var n=i(85893),r=i(67294),l=i(12788),d=i(73244);let a=l.ZP.div`
  display: flex;
  flex-flow: row wrap;
  flex-wrap: nowrap;
  justify-content: center;

  > * {
    flex: 1;
    flex-basis: 22%;
    ${e=>e.limitWidth&&l.iv`
      max-width: 160px;
    `}

    @media (max-width: 999px) {
      max-width: initial;
    }
  }
`;var o=i(96446),s=i(1850),c=i(8360),m=i(46202);let u=(0,l.ZP)(m.Z)`
  transform: box-shadow 1s linear;
  ${e=>e.highlighted&&`

  `}
`;var x=i(48606);let p=l.iv`
  filter: grayscale(0.5);
  opacity: 0.4;
`,h=l.iv`
  color: #f70;
`,f=(0,l.ZP)(x.Z)`
  ${e=>e.depleted&&p}
  ${e=>e.highlighted&&h}
`,g=(0,l.ZP)(c.Z)`
  & + & {
    border-left: ${e=>e.theme.border};
  }
`;var v=i(79633);let w=l.iv`
  color: ${e=>e.theme.isDarkMode?"yellow":"blue"};
`,Z=l.iv`
  filter: grayscale(0.5);
  opacity: 0.4;
`,b=(0,l.ZP)(v.Z)`
  ${e=>e.selected&&w}
  ${e=>e.picked&&Z}
`;function j({teams:e,pickedTeams:t,selectedTeams:i}){return(0,n.jsx)(s.Z,{children:e.map(e=>{let{name:r,country:l,shortName:d,pairing:a}=e;return(0,n.jsx)(g,{children:(0,n.jsx)(b,{"data-cellid":e.id,title:a&&`paired with ${a.shortName??a.name}`,selected:!!i?.includes(e),picked:t.includes(e),country:l??r,children:d??r})},e.id)})})}let y=(0,r.memo)(j);function k({isCurrent:e,potNum:t,teams:i,pickedTeams:r,selectedTeams:l,numCols:d,headerStyles:a}){let m=i.length/d;return(0,n.jsxs)(u,{highlighted:e,children:[(0,n.jsx)("thead",{children:(0,n.jsx)(s.Z,{children:(0,n.jsx)(c.Z,{colSpan:d,children:(0,n.jsxs)(f,{highlighted:e,depleted:!i||r.length===i.length,styles:a,children:["Pot ",t+1]})})})}),(0,n.jsx)("tbody",{children:(0,o.Z)(m).map(e=>{let t=e*d,a=(0,o.Z)(d).map(e=>i[t+e]);return(0,n.jsx)(y,{teams:a,selectedTeams:l,pickedTeams:r},a.map(e=>e.id).join(":"))})})]})}let P=(0,r.memo)(k),$=l.iv`
  background-color: rgb(0 0 0 / 0.75);
  color: #fff;
`;function C({initialPots:e,pots:t,selectedTeams:i,currentPotNum:r,split:l}){return(0,n.jsx)(a,{limitWidth:!l,children:e.map((a,o)=>{let s=(0,d.Z)(e[o],t[o],i??[]);return(0,n.jsx)(P,{potNum:o,isCurrent:o===r,teams:a,pickedTeams:s,selectedTeams:i,numCols:l?2:1,headerStyles:$},a[0].id)})})}let E=(0,r.memo)(C)},85704:(e,t,i)=>{i.d(t,{Z:()=>l});var n=i(12788);let r=n.ZP.div`
  display: flex;
  flex-direction: column;
  margin: 0 5px 10px;
  min-width: 65%;
`,l=r},613:(e,t,i)=>{i.d(t,{Z:()=>c});var n=i(85893),r=i(67294),l=i(12788);let d=(e,t)=>(0,r.useEffect)(()=>(window.addEventListener(e,t),()=>{window.removeEventListener(e,t)}),[e,t]),a=l.ZP.div`
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
`,o=(0,l.ZP)(a)`
  ${e=>e.selected?l.iv`
      font-size: 0.8em;
      font-weight: bold;
      color: white;
    `:l.iv`
      font-size: 0;
      background: radial-gradient(#004, #002, #002);
    `}

  ${e=>e.forceVisible&&l.iv`
    font-size: 0.8em;
  `}

  @media (max-width: 999px) {
    font-size: ${e=>e.selected?8:0}px;
  }
`;function s({noHover:e,...t}){let i=(0,r.useRef)(null),l=(0,r.useCallback)(t=>{let n=i.current;!e&&n&&document.activeElement===n&&"Enter"===t.key&&n.click()},[i,e]);return d("keydown",l),(0,n.jsx)(o,{...t,noHover:e,ref:i,tabIndex:e?void 0:0})}let c=(0,r.memo)(s)},40410:(e,t,i)=>{i.d(t,{Z:()=>c});var n=i(85893),r=i(67294),l=i(12788),d=i(613);let a=(0,l.ZP)(d.Z)`
  background:
    ${e=>e.selected?"#004":e.notSelected?"#ddd":"radial-gradient(#fff, #004)"};
  cursor: ${e=>e.noHover?"not-allowed":"pointer"};

  &:hover {
    ${e=>!e.noHover&&l.iv`
      background: radial-gradient(#ccf, #ccf);
    `}
  }
`,o=l.ZP.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 999px) {
    justify-content: center;
  }
`;function s({forceNoSelect:e,display:t,displayTeams:i,pot:l,selectedTeam:d,onPick:s}){let c=(0,r.useCallback)(e=>{let t=e.target,i=l.findIndex(e=>e.id===t.dataset.teamid);s(i,l)},[l,s]),m=e||d;return(0,n.jsx)(o,{children:t&&l.map(t=>(0,n.jsx)(a,{"data-teamid":t.id,selected:t===d,notSelected:e||!!d&&t!==d,forceVisible:i,noHover:!!m,onClick:m?void 0:c,children:t.shortName??t.name},t.id))})}let c=(0,r.memo)(s)},92907:(e,t,i)=>{i.d(t,{Z:()=>l});var n=i(12788);let r=n.ZP.span`
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
`,l=r},8360:(e,t,i)=>{i.d(t,{Z:()=>l});var n=i(12788);let r=n.ZP.td`
  height: 20px;
  padding: 0;
  background-color: ${e=>e.theme.isDarkMode?"#58595e":"white"};

  @media (max-width: 999px) {
    height: 14px;
  }
`,l=r},73995:(e,t,i)=>{i.d(t,{Z:()=>d});var n=i(12788),r=i(92907);let l=(0,n.ZP)(r.Z)`
  overflow: hidden;
  margin: 0 3px;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${e=>e.theme.isDarkMode&&n.iv`
    text-shadow: 0.5px 0.5px 1px #222;
  `}

  @media (max-width: 999px) {
    font-family: 'Roboto Condensed', RobotoCondensed, RobotoCondensed-Regular, sans-serif;
  }
`,d=l},79633:(e,t,i)=>{i.d(t,{Z:()=>o});var n=i(12788),r=i(50755),l=i(73995);let d=(0,n.ZP)(l.Z)`
  padding-left: 19px;
  background-position-y: 1px;
  background-size: 16px;
  background-repeat: no-repeat;

  @media (max-width: 999px) {
    padding-left: 13px;
    background-size: 12px;
  }
`,a=(0,n.ZP)(d)`
  ${({country:e})=>e&&n.iv`
    background-image: url('${(0,r.Z)(e)}');
  `}
`,o=a},88834:(e,t,i)=>{i.d(t,{Z:()=>d});var n=i(12788),r=i(73995);let l=(0,n.ZP)(r.Z)`
  visibility: hidden;
  pointer-events: none;

  &::before {
    content: '.';
  }
`,d=l},48606:(e,t,i)=>{i.d(t,{Z:()=>d});var n=i(12788),r=i(92907);let l=(0,n.ZP)(r.Z)`
  justify-content: center;
  width: 100%;
  height: 100%;
  font-weight: 600;
  ${e=>e.styles}
`,d=l},1850:(e,t,i)=>{i.d(t,{Z:()=>l});var n=i(12788);let r=n.ZP.tr`
  border: ${e=>e.theme.border};
`,l=r},46202:(e,t,i)=>{i.d(t,{Z:()=>l});var n=i(12788);let r=n.ZP.table`
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
`,l=r},40726:(e,t,i)=>{i.d(t,{Z:()=>n});let n=e=>String.fromCodePoint(65+e)},11553:(e,t,i)=>{i.d(t,{Z:()=>n});let n=(e="")=>`${e}${Math.random().toString(36).slice(2)}`},63494:(e,t,i)=>{i.d(t,{Z:()=>r});var n=i(14855);let r=e=>e.country??(e.name in n.Z?e.name:void 0)},63835:(e,t,i)=>{i.d(t,{Z:()=>r});var n=i(67294);let r=(e,t)=>{let i=(0,n.useRef)(!1);(0,n.useEffect)(()=>{i.current?e():i.current=!0},t)}},90595:(e,t,i)=>{i.d(t,{Z:()=>r});var n=i(67294);let r=e=>{let t=(0,n.useRef)();return(0,n.useEffect)(()=>{t.current=e}),t.current}},43510:(e,t,i)=>{i.d(t,{Z:()=>a});var n=i(67294);let r=e=>{let t=(0,n.useMemo)(()=>e(),[e]);return(0,n.useEffect)(()=>()=>{t.terminate()},[t]),t};var l=i(11553);let d=e=>{let t=new Map;return e.addEventListener("message",e=>{let i=e.data.messageId,n=t.get(e.data.messageId);n&&(t.delete(i),n(e.data.data))}),i=>new Promise(n=>{let r=(0,l.Z)();t.set(r,n),e.postMessage({messageId:r,data:i})})},a=e=>{let t=r(e);return(0,n.useCallback)(d(t),[t])}}}]);