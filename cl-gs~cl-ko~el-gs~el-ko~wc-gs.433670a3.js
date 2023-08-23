"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[3561],{12365:(e,t,n)=>{n.d(t,{Z:()=>C});var i=n(85893),r=n(67294),l=n(70394),d=n(32108);let o=l.ZP.button`
  ${d.T}
  padding: initial;
  border: initial;
  background-color: initial;
`;var a=n(4871);let s=(e,t)=>{let[n,i]=(0,r.useState)(!1);return(0,r.useEffect)(()=>{i(!1);let t=setTimeout(()=>{i(!0)},e);return()=>{clearTimeout(t)}},[t]),n},c=(0,r.memo)(function({children:e,delay:t}){let n=s(t);return n?e:null});var m=n(40726);let u=l.ZP.div`
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
  ${e=>e.$possible?(0,l.iv)`
      color: ${e.color};
    `:(0,l.iv)`
      border-color: rgb(0 0 0 / 0);
      filter: opacity(0.25);
    `}
`,x=l.ZP.div`
  display: flex;
  justify-content: center;
  margin-top: 2px;
`,h=(0,r.memo)(function({numGroups:e,possibleGroups:t}){let n=e>>1;return(0,i.jsx)(x,{children:Array.from({length:e},(e,r)=>{let l=(0,m.Z)(r);return(0,i.jsx)(u,{color:r<n?"red":"blue",$possible:t.includes(r),children:l},l)})})}),p=l.ZP.div`
  padding: 10px;
  border-width: 2px;
  border-style: dashed;
  border-color: rgb(255 0 0 / 0.5);
`,f=(0,r.memo)(function(){return(0,i.jsxs)(p,{children:[(0,i.jsx)("div",{children:"Calculation is taking too long."}),(0,i.jsxs)("div",{children:["And"," ",(0,i.jsx)(d.Z,{href:"https://github.com/inker/draw/issues/14",target:"_blank",rel:"noopener",children:"here's why"}),"."]})]})});var g=n(26962),v=n.n(g);let w=(0,l.vJ)`
  body * {
    transition-property: none !important;
    animation: none !important;
  }
`,b=Promise.all([n.e(1404),n.e(2154)]).then(n.bind(n,19397)),Z=()=>({downloadClicked:null,transitionsEnabled:!0}),$=(0,r.memo)(function({completed:e,groupsElement:t}){let[{downloadClicked:n,transitionsEnabled:l},d]=(0,r.useState)(Z),a=(0,r.useCallback)(e=>{d({downloadClicked:e,transitionsEnabled:!1})},[d]);(0,r.useEffect)(()=>{(async()=>{if(n){try{let e=t.current;if(!e)throw Error("groups element is null");await v()(0);let i=await b;await i.default(e,n)}catch(e){console.error(e)}a(null)}})()},[n]),(0,r.useEffect)(()=>{e||d({downloadClicked:null,transitionsEnabled:!0})},[e]);let s=(0,r.useCallback)(()=>a("png"),[a]),c=(0,r.useCallback)(()=>a("svg"),[a]);return e&&t?(0,i.jsxs)("div",{children:[!l&&(0,i.jsx)(w,{}),"Download as ",(0,i.jsx)(o,{onClick:s,children:"PNG"}),", ",(0,i.jsx)(o,{onClick:c,children:"SVG"})]}):null}),y=l.ZP.div`
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
`,j=l.ZP.span`
  display: inline-block;
`,k=l.ZP.strong`
  font-weight: 600;
`,P=l.ZP.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > * + * {
    margin-top: 12px;
  }
`,C=(0,r.memo)(function({long:e,completed:t,selectedTeam:n,pickedGroup:l,possibleGroups:d,isDisplayPossibleGroupsText:s,numGroups:u,groupsElement:x,reset:p}){let g=(0,r.useRef)(null),v=(0,r.useRef)(null);(0,r.useEffect)(()=>{v.current=t?null:n},[t,n]);let w=v.current??n;return t?(0,i.jsx)(y,{children:(0,i.jsxs)(P,{children:[(0,i.jsx)("div",{children:"Draw completed!"}),(0,i.jsx)($,{completed:t,groupsElement:x}),(0,i.jsx)(o,{onClick:p,children:"Restart"})]})}):null!==l?(g.current=(0,i.jsx)(y,{children:(0,i.jsxs)("div",{children:[e&&w?(0,i.jsxs)("span",{children:[(0,i.jsx)(k,{children:w.shortName??w.name})," goes to group"]}):(0,i.jsx)("span",{children:"Group"}),"\xa0",(0,i.jsx)(k,{children:(0,m.Z)(l)}),"!"]})}),g.current):w?(0,i.jsx)(y,{children:s?(0,i.jsxs)("div",{children:["Possible groups for"," ",(0,i.jsxs)(j,{children:[(0,i.jsx)(k,{children:w.name}),":"]}),d?(0,i.jsx)(h,{numGroups:u,possibleGroups:d}):(0,i.jsxs)("div",{children:[(0,i.jsx)(a.Z,{initialNum:0,maxNum:10,interval:2e3}),(0,i.jsx)(c,{delay:1e4,children:(0,i.jsx)(f,{})})]})]}):g.current}):(0,i.jsx)(y,{children:"Pick a ball"})})},18753:(e,t,n)=>{n.d(t,{Z:()=>l});var i=n(70394);let r=i.ZP.div`
  display: flex;
  flex-direction: column;
  margin: 0 5px 10px;
  min-width: 35%;
  text-align: center;

  @media (max-width: 999px) {
    align-items: center;
  }
`,l=r},43955:(e,t,n)=>{let i;n.d(t,{Z:()=>Z});var r=n(85893),l=n(67294),d=n(70394),o=n(63494),a=n(27601),s=n(11553);let c=(e,...t)=>e.reduce((e,n,i)=>`${e}${n}${(0,a.Z)(t[i])?"":t[i]}`,"");var m=n(73935),u=n(12988);let x=(0,l.memo)(({tagName:e,modalRoot:t,children:n})=>{let i=(0,l.useMemo)(()=>{let t=u.includes(e)&&"svg"!==e?"http://www.w3.org/1999/xhtml":"http://www.w3.org/2000/svg";return document.createElementNS(t,e)},[e,t]),r=(0,l.useRef)(i);return(0,l.useEffect)(()=>(t.appendChild(i),()=>{t.removeChild(i)}),[]),m.createPortal(n,r.current)}),h=((e,...t)=>{i||(i=document.createElement("style"),document.head.appendChild(i));let n=(0,s.Z)("styled-element-"),r=c(e,...t);return i.textContent+=`.${n}{${r}}`,n})`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  pointer-events: none;
`,p=document.createElement("div");p.classList.add(h),document.body.insertBefore(p,document.getElementById("app"));let f=(0,l.memo)(function({children:e}){return(0,r.jsx)(x,{tagName:"div",modalRoot:p,children:e})});var g=n(79633);let v=(0,d.ZP)(g.Z)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  margin: 0;
  user-select: none;
  pointer-events: none;
`,w=e=>"string"==typeof e?document.querySelector(e):e.current,b=e=>`transform ${e}ms ease-in-out`,Z=(0,l.memo)(function({from:e,to:t,duration:n,team:i,onAnimationEnd:d}){let a=(0,l.useMemo)(()=>w(e),[e]),s=(0,l.useMemo)(()=>w(t),[t]),[c,m]=(0,l.useState)(a);(0,l.useLayoutEffect)(()=>{c===a&&m(s)},[c]);let u=(0,l.useMemo)(()=>({transform:c instanceof HTMLElement?function(e){let{left:t,top:n}=e.getBoundingClientRect();return`translate3d(${t}px, ${n}px, 0px)`}(c):"",transition:c===s?b(n):""}),[c,s,n]),x=(0,l.useCallback)(e=>{"transform"===e.propertyName&&d?.()},[d]);return c&&(0,r.jsx)(f,{children:(0,r.jsx)(v,{$country:(0,o.Z)(i),style:u,onTransitionEnd:x,children:i.shortName??i.name})})})},72723:(e,t,n)=>{n.d(t,{Z:()=>l});var i=n(70394);let r=i.ZP.div`
  display: flex;
  margin: auto;
  width: 1000px;

  @media (max-width: 999px) {
    flex-direction: column;
    width: 100%;
  }
`,l=r},11726:(e,t,n)=>{n.d(t,{Z:()=>j});var i=n(85893),r=n(67294),l=n(70394),d=n(73244);let o=l.ZP.div`
  display: flex;
  flex-flow: row wrap;
  flex-wrap: nowrap;
  justify-content: center;

  > * {
    flex: 1;
    flex-basis: 22%;
    ${e=>e.$limitWidth&&(0,l.iv)`
      max-width: 160px;
    `}

    @media (max-width: 999px) {
      max-width: initial;
    }
  }
`;var a=n(1850),s=n(8360),c=n(46202);let m=(0,l.ZP)(c.Z)`
  transform: box-shadow 1s linear;
  ${e=>e.$highlighted&&`

  `}
`;var u=n(48606);let x=(0,l.iv)`
  filter: grayscale(0.5);
  opacity: 0.4;
`,h=(0,l.iv)`
  color: #f70;
`,p=(0,l.ZP)(u.Z)`
  ${e=>e.$depleted&&x}
  ${e=>e.$highlighted&&h}
`,f=(0,l.ZP)(s.Z)`
  & + & {
    border-left: ${e=>e.theme.border};
  }
`;var g=n(79633);let v=(0,l.iv)`
  color: ${e=>e.theme.isDarkMode?"yellow":"blue"};
`,w=(0,l.iv)`
  filter: grayscale(0.5);
  opacity: 0.4;
`,b=(0,l.ZP)(g.Z)`
  ${e=>e.$selected&&v}
  ${e=>e.$picked&&w}
`,Z=(0,r.memo)(function({teams:e,pickedTeams:t,selectedTeams:n}){return(0,i.jsx)(a.Z,{children:e.map(e=>{let{name:r,country:l,shortName:d,pairing:o}=e;return(0,i.jsx)(f,{children:(0,i.jsx)(b,{"data-cellid":e.id,title:o&&`paired with ${o.shortName??o.name}`,$selected:!!n?.includes(e),$picked:t.includes(e),$country:l??r,children:d??r})},e.id)})})}),$=(0,r.memo)(function({isCurrent:e,potNum:t,teams:n,pickedTeams:r,selectedTeams:l,numCols:d,headerStyles:o}){let c=n.length/d;return(0,i.jsxs)(m,{$highlighted:e,children:[(0,i.jsx)("thead",{children:(0,i.jsx)(a.Z,{children:(0,i.jsx)(s.Z,{colSpan:d,children:(0,i.jsxs)(p,{$highlighted:e,$depleted:!n||r.length===n.length,$styles:o,children:["Pot ",t+1]})})})}),(0,i.jsx)("tbody",{children:Array.from({length:c},(e,t)=>{let o=t*d,a=Array.from({length:d},(e,t)=>n[o+t]);return(0,i.jsx)(Z,{teams:a,selectedTeams:l,pickedTeams:r},a.map(e=>e.id).join(":"))})})]})}),y=(0,l.iv)`
  background-color: rgb(0 0 0 / 0.75);
  color: #fff;
`,j=(0,r.memo)(function({initialPots:e,pots:t,selectedTeams:n,currentPotNum:r,split:l}){return(0,i.jsx)(o,{$limitWidth:!l,children:e.map((o,a)=>{let s=(0,d.Z)(e[a],t[a],n??[]);return(0,i.jsx)($,{potNum:a,isCurrent:a===r,teams:o,pickedTeams:s,selectedTeams:n,numCols:l?2:1,headerStyles:y},o[0].id)})})})},85704:(e,t,n)=>{n.d(t,{Z:()=>l});var i=n(70394);let r=i.ZP.div`
  display: flex;
  flex-direction: column;
  margin: 0 5px 10px;
  min-width: 65%;
`,l=r},613:(e,t,n)=>{n.d(t,{Z:()=>s});var i=n(85893),r=n(67294),l=n(70394);let d=(e,t)=>(0,r.useEffect)(()=>(window.addEventListener(e,t),()=>{window.removeEventListener(e,t)}),[e,t]),o=l.ZP.div`
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
`,a=(0,l.ZP)(o)`
  ${e=>e.$selected?(0,l.iv)`
      font-size: 0.8em;
      font-weight: bold;
      color: white;
    `:(0,l.iv)`
      font-size: 0;
      background: radial-gradient(#004, #002, #002);
    `}

  ${e=>e.$forceVisible&&(0,l.iv)`
    font-size: 0.8em;
  `}

  @media (max-width: 999px) {
    font-size: ${e=>e.$selected?8:0}px;
  }
`,s=(0,r.memo)(function({$noHover:e,...t}){let n=(0,r.useRef)(null),l=(0,r.useCallback)(t=>{let i=n.current;!e&&i&&document.activeElement===i&&"Enter"===t.key&&i.click()},[n,e]);return d("keydown",l),(0,i.jsx)(a,{...t,$noHover:e,ref:n,tabIndex:e?void 0:0})})},40410:(e,t,n)=>{n.d(t,{Z:()=>s});var i=n(85893),r=n(67294),l=n(70394),d=n(613);let o=(0,l.ZP)(d.Z)`
  background:
    ${e=>e.$selected?"#004":e.$notSelected?"#ddd":"radial-gradient(#fff, #004)"};
  cursor: ${e=>e.$noHover?"not-allowed":"pointer"};

  &:hover {
    ${e=>!e.$noHover&&(0,l.iv)`
      background: radial-gradient(#ccf, #ccf);
    `}
  }
`,a=l.ZP.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 999px) {
    justify-content: center;
  }
`,s=(0,r.memo)(function({forceNoSelect:e,display:t,displayTeams:n,pot:l,selectedTeam:d,onPick:s}){let c=(0,r.useCallback)(e=>{let t=e.target,n=l.findIndex(e=>e.id===t.dataset.teamid);s(n,l)},[l,s]),m=e||d;return(0,i.jsx)(a,{children:t&&l.map(t=>(0,i.jsx)(o,{"data-teamid":t.id,$selected:t===d,$notSelected:e||!!d&&t!==d,$forceVisible:n,$noHover:!!m,onClick:m?void 0:c,children:t.shortName??t.name},t.id))})})},92907:(e,t,n)=>{n.d(t,{Z:()=>l});var i=n(70394);let r=i.ZP.span`
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
`,l=r},8360:(e,t,n)=>{n.d(t,{Z:()=>l});var i=n(70394);let r=i.ZP.td`
  height: 20px;
  padding: 0;
  background-color: ${e=>e.theme.isDarkMode?"#58595e":"white"};

  @media (max-width: 999px) {
    height: 14px;
  }
`,l=r},73995:(e,t,n)=>{n.d(t,{Z:()=>d});var i=n(70394),r=n(92907);let l=(0,i.ZP)(r.Z)`
  overflow: hidden;
  margin: 0 3px;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${e=>e.theme.isDarkMode&&(0,i.iv)`
    text-shadow: 0.5px 0.5px 1px #222;
  `}

  @media (max-width: 999px) {
    font-family: 'Roboto Condensed', RobotoCondensed, RobotoCondensed-Regular, sans-serif;
  }
`,d=l},79633:(e,t,n)=>{n.d(t,{Z:()=>a});var i=n(70394),r=n(50755),l=n(73995);let d=(0,i.ZP)(l.Z)`
  padding-left: 19px;
  background-position-y: 1px;
  background-size: 16px;
  background-repeat: no-repeat;

  @media (max-width: 999px) {
    padding-left: 13px;
    background-size: 12px;
  }
`,o=(0,i.ZP)(d)`
  ${({$country:e})=>e&&(0,i.iv)`
    background-image: url('${(0,r.Z)(e)}');
  `}
`,a=o},88834:(e,t,n)=>{n.d(t,{Z:()=>d});var i=n(70394),r=n(73995);let l=(0,i.ZP)(r.Z)`
  visibility: hidden;
  pointer-events: none;

  &::before {
    content: '.';
  }
`,d=l},48606:(e,t,n)=>{n.d(t,{Z:()=>d});var i=n(70394),r=n(92907);let l=(0,i.ZP)(r.Z)`
  justify-content: center;
  width: 100%;
  height: 100%;
  font-weight: 600;
  ${e=>e.$styles}
`,d=l},1850:(e,t,n)=>{n.d(t,{Z:()=>l});var i=n(70394);let r=i.ZP.tr`
  border: ${e=>e.theme.border};
`,l=r},46202:(e,t,n)=>{n.d(t,{Z:()=>l});var i=n(70394);let r=i.ZP.table`
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
`,l=r},40726:(e,t,n)=>{n.d(t,{Z:()=>i});let i=e=>String.fromCodePoint(65+e)},11553:(e,t,n)=>{n.d(t,{Z:()=>i});let i=(e="")=>`${e}${Math.random().toString(36).slice(2)}`},63494:(e,t,n)=>{n.d(t,{Z:()=>r});var i=n(14855);let r=e=>e.country??(e.name in i.Z?e.name:void 0)},63835:(e,t,n)=>{n.d(t,{Z:()=>r});var i=n(67294);let r=(e,t)=>{let n=(0,i.useRef)(!1);(0,i.useEffect)(()=>{n.current?e():n.current=!0},t)}},90595:(e,t,n)=>{n.d(t,{Z:()=>r});var i=n(67294);let r=e=>{let t=(0,i.useRef)();return(0,i.useEffect)(()=>{t.current=e}),t.current}},43510:(e,t,n)=>{n.d(t,{Z:()=>o});var i=n(67294);let r=e=>{let t=(0,i.useMemo)(()=>e(),[e]);return(0,i.useEffect)(()=>()=>{t.terminate()},[t]),t};var l=n(11553);let d=e=>{let t=new Map;return e.addEventListener("message",e=>{let n=e.data.messageId,i=t.get(e.data.messageId);i&&(t.delete(n),i(e.data.data))}),n=>new Promise(i=>{let r=(0,l.Z)();t.set(r,i),e.postMessage({messageId:r,data:n})})},o=e=>{let t=r(e);return(0,i.useCallback)(d(t),[t])}}}]);