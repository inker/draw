"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[3561],{12365:(e,t,i)=>{i.d(t,{Z:()=>C});var n=i(85893),r=i(67294),l=i(70394),d=i(32108);let a=l.ZP.button`
  ${d.T}
  padding: initial;
  border: initial;
  background-color: initial;
`;var o=i(4871);let s=(e,t)=>{let[i,n]=(0,r.useState)(!1);return(0,r.useEffect)(()=>{n(!1);let t=setTimeout(()=>{n(!0)},e);return()=>{clearTimeout(t)}},[t]),i},c=(0,r.memo)(function({children:e,delay:t}){let i=s(t);return i?e:null});var m=i(40726);let u=l.ZP.div`
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
`,h=(0,r.memo)(function({numGroups:e,possibleGroups:t}){let i=e>>1;return(0,n.jsx)(x,{children:Array.from({length:e},(e,r)=>{let l=(0,m.Z)(r);return(0,n.jsx)(u,{color:r<i?"red":"blue",$possible:t.includes(r),children:l},l)})})}),p=l.ZP.div`
  padding: 10px;
  border-width: 2px;
  border-style: dashed;
  border-color: rgb(255 0 0 / 0.5);
`,f=(0,r.memo)(function(){return(0,n.jsxs)(p,{children:[(0,n.jsx)("div",{children:"Calculation is taking too long."}),(0,n.jsxs)("div",{children:["And"," ",(0,n.jsx)(d.Z,{href:"https://github.com/inker/draw/issues/14",target:"_blank",rel:"noopener",children:"here's why"}),"."]})]})});var g=i(26962),v=i.n(g);let w=(0,l.vJ)`
  body * {
    transition-property: none !important;
    animation: none !important;
  }
`,b=Promise.all([i.e(1404),i.e(2154)]).then(i.bind(i,19397)),Z=()=>({downloadClicked:null,transitionsEnabled:!0}),y=(0,r.memo)(function({completed:e,groupsElement:t}){let[{downloadClicked:i,transitionsEnabled:l},d]=(0,r.useState)(Z),o=(0,r.useCallback)(e=>{d({downloadClicked:e,transitionsEnabled:!1})},[d]);(0,r.useEffect)(()=>{(async()=>{if(i){try{let e=t.current;if(!e)throw Error("groups element is null");await v()(0);let n=await b;await n.default(e,i)}catch(e){console.error(e)}o(null)}})()},[i]),(0,r.useEffect)(()=>{e||d({downloadClicked:null,transitionsEnabled:!0})},[e]);let s=(0,r.useCallback)(()=>o("png"),[o]),c=(0,r.useCallback)(()=>o("svg"),[o]);return e&&t?(0,n.jsxs)("div",{children:[!l&&(0,n.jsx)(w,{}),"Download as ",(0,n.jsx)(a,{onClick:s,children:"PNG"}),", ",(0,n.jsx)(a,{onClick:c,children:"SVG"})]}):null}),$=l.ZP.div`
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
`,C=(0,r.memo)(function({long:e,completed:t,selectedTeam:i,pickedGroup:l,possibleGroups:d,isDisplayPossibleGroupsText:s,numGroups:u,groupsElement:x,reset:p}){let g=(0,r.useRef)(null),v=(0,r.useRef)(null);(0,r.useEffect)(()=>{v.current=t?null:i},[t,i]);let w=v.current??i;return t?(0,n.jsx)($,{children:(0,n.jsxs)(P,{children:[(0,n.jsx)("div",{children:"Draw completed!"}),(0,n.jsx)(y,{completed:t,groupsElement:x}),(0,n.jsx)(a,{onClick:p,children:"Restart"})]})}):null!==l?(g.current=(0,n.jsx)($,{children:(0,n.jsxs)("div",{children:[e&&w?(0,n.jsxs)("span",{children:[(0,n.jsx)(k,{children:w.shortName??w.name})," goes to group"]}):(0,n.jsx)("span",{children:"Group"}),"\xa0",(0,n.jsx)(k,{children:(0,m.Z)(l)}),"!"]})}),g.current):w?(0,n.jsx)($,{children:s?(0,n.jsxs)("div",{children:["Possible groups for"," ",(0,n.jsxs)(j,{children:[(0,n.jsx)(k,{children:w.name}),":"]}),d?(0,n.jsx)(h,{numGroups:u,possibleGroups:d}):(0,n.jsxs)("div",{children:[(0,n.jsx)(o.Z,{initialNum:0,maxNum:10,interval:2e3}),(0,n.jsx)(c,{delay:1e4,children:(0,n.jsx)(f,{})})]})]}):g.current}):(0,n.jsx)($,{children:"Pick a ball"})})},18753:(e,t,i)=>{i.d(t,{Z:()=>l});var n=i(70394);let r=n.ZP.div`
  display: flex;
  flex-direction: column;
  margin: 0 5px 10px;
  min-width: 35%;
  text-align: center;

  @media (max-width: 999px) {
    align-items: center;
  }
`,l=r},43955:(e,t,i)=>{let n;i.d(t,{Z:()=>Z});var r=i(85893),l=i(67294),d=i(70394),a=i(63494),o=i(27601),s=i(11553);let c=(e,...t)=>e.reduce((e,i,n)=>`${e}${i}${(0,o.Z)(t[n])?"":t[n]}`,"");var m=i(73935),u=i(12988);let x=(0,l.memo)(({tagName:e,modalRoot:t,children:i})=>{let n=(0,l.useMemo)(()=>{let t=u.includes(e)&&"svg"!==e?"http://www.w3.org/1999/xhtml":"http://www.w3.org/2000/svg";return document.createElementNS(t,e)},[e,t]),r=(0,l.useRef)(n);return(0,l.useEffect)(()=>(t.appendChild(n),()=>{t.removeChild(n)}),[]),m.createPortal(i,r.current)}),h=((e,...t)=>{n||(n=document.createElement("style"),document.head.appendChild(n));let i=(0,s.Z)("styled-element-"),r=c(e,...t);return n.textContent+=`.${i}{${r}}`,i})`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  pointer-events: none;
`,p=document.createElement("div");p.classList.add(h),document.body.insertBefore(p,document.getElementById("app"));let f=(0,l.memo)(function({children:e}){return(0,r.jsx)(x,{tagName:"div",modalRoot:p,children:e})});var g=i(79633);let v=(0,d.ZP)(g.Z)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  margin: 0;
  user-select: none;
  pointer-events: none;
`,w=e=>"string"==typeof e?document.querySelector(e):e.current,b=e=>`transform ${e}ms ease-in-out`,Z=(0,l.memo)(function({from:e,to:t,duration:i,team:n,onAnimationEnd:d}){let o=(0,l.useMemo)(()=>w(e),[e]),s=(0,l.useMemo)(()=>w(t),[t]),[c,m]=(0,l.useState)(o);(0,l.useLayoutEffect)(()=>{c===o&&m(s)},[c]);let u=(0,l.useMemo)(()=>({transform:c instanceof HTMLElement?function(e){let{left:t,top:i}=e.getBoundingClientRect();return`translate3d(${t}px, ${i}px, 0px)`}(c):"",transition:c===s?b(i):""}),[c,s,i]),x=(0,l.useCallback)(e=>{"transform"===e.propertyName&&d?.()},[d]);return c&&(0,r.jsx)(f,{children:(0,r.jsx)(v,{$country:(0,a.Z)(n),style:u,onTransitionEnd:x,children:n.shortName??n.name})})})},72723:(e,t,i)=>{i.d(t,{Z:()=>l});var n=i(70394);let r=n.ZP.div`
  display: flex;
  margin: auto;
  width: 1000px;

  @media (max-width: 999px) {
    flex-direction: column;
    width: 100%;
  }
`,l=r},11726:(e,t,i)=>{i.d(t,{Z:()=>j});var n=i(85893),r=i(67294),l=i(70394),d=i(73244);let a=l.ZP.div`
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
`;var o=i(1850),s=i(8360),c=i(46202);let m=(0,l.ZP)(c.Z)`
  transform: box-shadow 1s linear;
  ${e=>e.$highlighted&&`

  `}
`;var u=i(48606);let x=(0,l.iv)`
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
`;var g=i(79633);let v=(0,l.iv)`
  color: ${e=>e.theme.isDarkMode?"yellow":"blue"};
`,w=(0,l.iv)`
  filter: grayscale(0.5);
  opacity: 0.4;
`,b=(0,l.ZP)(g.Z)`
  ${e=>e.$selected&&v}
  ${e=>e.$picked&&w}
`,Z=(0,r.memo)(function({teams:e,pickedTeams:t,selectedTeams:i}){return(0,n.jsx)(o.Z,{children:e.map(e=>{let{name:r,country:l,shortName:d,pairing:a}=e;return(0,n.jsx)(f,{children:(0,n.jsx)(b,{"data-cellid":e.id,title:a&&`paired with ${a.shortName??a.name}`,$selected:!!i?.includes(e),$picked:t.includes(e),$country:l??r,children:d??r})},e.id)})})}),y=(0,r.memo)(function({isCurrent:e,potNum:t,teams:i,pickedTeams:r,selectedTeams:l,numCols:d,headerStyles:a}){let c=i.length/d;return(0,n.jsxs)(m,{$highlighted:e,children:[(0,n.jsx)("thead",{children:(0,n.jsx)(o.Z,{children:(0,n.jsx)(s.Z,{colSpan:d,children:(0,n.jsxs)(p,{$highlighted:e,$depleted:!i||r.length===i.length,$styles:a,children:["Pot ",t+1]})})})}),(0,n.jsx)("tbody",{children:Array.from({length:c},(e,t)=>{let a=t*d,o=Array.from({length:d},(e,t)=>i[a+t]);return(0,n.jsx)(Z,{teams:o,selectedTeams:l,pickedTeams:r},o.map(e=>e.id).join(":"))})})]})}),$=(0,l.iv)`
  background-color: rgb(0 0 0 / 0.75);
  color: #fff;
`,j=(0,r.memo)(function({initialPots:e,pots:t,selectedTeams:i,currentPotNum:r,split:l}){return(0,n.jsx)(a,{$limitWidth:!l,children:e.map((a,o)=>{let s=(0,d.Z)(e[o],t[o],i??[]);return(0,n.jsx)(y,{potNum:o,isCurrent:o===r,teams:a,pickedTeams:s,selectedTeams:i,numCols:l?2:1,headerStyles:$},a[0].id)})})})},85704:(e,t,i)=>{i.d(t,{Z:()=>l});var n=i(70394);let r=n.ZP.div`
  display: flex;
  flex-direction: column;
  margin: 0 5px 10px;
  min-width: 65%;
`,l=r},613:(e,t,i)=>{i.d(t,{Z:()=>s});var n=i(85893),r=i(67294),l=i(70394);let d=(e,t)=>(0,r.useEffect)(()=>(window.addEventListener(e,t),()=>{window.removeEventListener(e,t)}),[e,t]),a=l.ZP.div`
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
  ${e=>e.selected?(0,l.iv)`
      font-size: 0.8em;
      font-weight: bold;
      color: white;
    `:(0,l.iv)`
      font-size: 0;
      background: radial-gradient(#004, #002, #002);
    `}

  ${e=>e.forceVisible&&(0,l.iv)`
    font-size: 0.8em;
  `}

  @media (max-width: 999px) {
    font-size: ${e=>e.selected?8:0}px;
  }
`,s=(0,r.memo)(function({noHover:e,...t}){let i=(0,r.useRef)(null),l=(0,r.useCallback)(t=>{let n=i.current;!e&&n&&document.activeElement===n&&"Enter"===t.key&&n.click()},[i,e]);return d("keydown",l),(0,n.jsx)(o,{...t,noHover:e,ref:i,tabIndex:e?void 0:0})})},40410:(e,t,i)=>{i.d(t,{Z:()=>s});var n=i(85893),r=i(67294),l=i(70394),d=i(613);let a=(0,l.ZP)(d.Z)`
  background:
    ${e=>e.selected?"#004":e.$notSelected?"#ddd":"radial-gradient(#fff, #004)"};
  cursor: ${e=>e.noHover?"not-allowed":"pointer"};

  &:hover {
    ${e=>!e.noHover&&(0,l.iv)`
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
`,s=(0,r.memo)(function({forceNoSelect:e,display:t,displayTeams:i,pot:l,selectedTeam:d,onPick:s}){let c=(0,r.useCallback)(e=>{let t=e.target,i=l.findIndex(e=>e.id===t.dataset.teamid);s(i,l)},[l,s]),m=e||d;return(0,n.jsx)(o,{children:t&&l.map(t=>(0,n.jsx)(a,{"data-teamid":t.id,selected:t===d,$notSelected:e||!!d&&t!==d,forceVisible:i,noHover:!!m,onClick:m?void 0:c,children:t.shortName??t.name},t.id))})})},92907:(e,t,i)=>{i.d(t,{Z:()=>l});var n=i(70394);let r=n.ZP.span`
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
`,l=r},8360:(e,t,i)=>{i.d(t,{Z:()=>l});var n=i(70394);let r=n.ZP.td`
  height: 20px;
  padding: 0;
  background-color: ${e=>e.theme.isDarkMode?"#58595e":"white"};

  @media (max-width: 999px) {
    height: 14px;
  }
`,l=r},73995:(e,t,i)=>{i.d(t,{Z:()=>d});var n=i(70394),r=i(92907);let l=(0,n.ZP)(r.Z)`
  overflow: hidden;
  margin: 0 3px;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${e=>e.theme.isDarkMode&&(0,n.iv)`
    text-shadow: 0.5px 0.5px 1px #222;
  `}

  @media (max-width: 999px) {
    font-family: 'Roboto Condensed', RobotoCondensed, RobotoCondensed-Regular, sans-serif;
  }
`,d=l},79633:(e,t,i)=>{i.d(t,{Z:()=>o});var n=i(70394),r=i(50755),l=i(73995);let d=(0,n.ZP)(l.Z)`
  padding-left: 19px;
  background-position-y: 1px;
  background-size: 16px;
  background-repeat: no-repeat;

  @media (max-width: 999px) {
    padding-left: 13px;
    background-size: 12px;
  }
`,a=(0,n.ZP)(d)`
  ${({$country:e})=>e&&(0,n.iv)`
    background-image: url('${(0,r.Z)(e)}');
  `}
`,o=a},88834:(e,t,i)=>{i.d(t,{Z:()=>d});var n=i(70394),r=i(73995);let l=(0,n.ZP)(r.Z)`
  visibility: hidden;
  pointer-events: none;

  &::before {
    content: '.';
  }
`,d=l},48606:(e,t,i)=>{i.d(t,{Z:()=>d});var n=i(70394),r=i(92907);let l=(0,n.ZP)(r.Z)`
  justify-content: center;
  width: 100%;
  height: 100%;
  font-weight: 600;
  ${e=>e.$styles}
`,d=l},1850:(e,t,i)=>{i.d(t,{Z:()=>l});var n=i(70394);let r=n.ZP.tr`
  border: ${e=>e.theme.border};
`,l=r},46202:(e,t,i)=>{i.d(t,{Z:()=>l});var n=i(70394);let r=n.ZP.table`
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