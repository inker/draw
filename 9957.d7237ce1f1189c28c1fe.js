(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[9957],{12988:(e,t,r)=>{"use strict";e.exports=r(60200)},88668:(e,t,r)=>{var n=r(83369),o=r(90619),i=r(72385);function s(e){var t=-1,r=null==e?0:e.length;for(this.__data__=new n;++t<r;)this.add(e[t])}s.prototype.add=s.prototype.push=o,s.prototype.has=i,e.exports=s},47443:(e,t,r)=>{var n=r(42118);e.exports=function(e,t){return!!(null==e?0:e.length)&&n(e,t,0)>-1}},1196:e=>{e.exports=function(e,t,r){for(var n=-1,o=null==e?0:e.length;++n<o;)if(r(t,e[n]))return!0;return!1}},14636:(e,t,r)=>{var n=r(22545),o=r(35694),i=r(1469),s=r(44144),a=r(65776),c=r(36719),d=Object.prototype.hasOwnProperty;e.exports=function(e,t){var r=i(e),l=!r&&o(e),u=!r&&!l&&s(e),p=!r&&!l&&!u&&c(e),m=r||l||u||p,h=m?n(e.length,String):[],f=h.length;for(var x in e)!t&&!d.call(e,x)||m&&("length"==x||u&&("offset"==x||"parent"==x)||p&&("buffer"==x||"byteLength"==x||"byteOffset"==x)||a(x,f))||h.push(x);return h}},62488:e=>{e.exports=function(e,t){for(var r=-1,n=t.length,o=e.length;++r<n;)e[o+r]=t[r];return e}},70151:(e,t,r)=>{var n=r(278),o=r(73480);e.exports=function(e){return o(n(e))}},20731:(e,t,r)=>{var n=r(88668),o=r(47443),i=r(1196),s=r(29932),a=r(7518),c=r(74757);e.exports=function(e,t,r,d){var l=-1,u=o,p=!0,m=e.length,h=[],f=t.length;if(!m)return h;r&&(t=s(t,a(r))),d?(u=i,p=!1):t.length>=200&&(u=c,p=!1,t=new n(t));e:for(;++l<m;){var x=e[l],g=null==r?x:r(x);if(x=d||0!==x?x:0,p&&g==g){for(var b=f;b--;)if(t[b]===g)continue e;h.push(x)}else u(t,g,d)||h.push(x)}return h}},21078:(e,t,r)=>{var n=r(62488),o=r(37285);e.exports=function e(t,r,i,s,a){var c=-1,d=t.length;for(i||(i=o),a||(a=[]);++c<d;){var l=t[c];r>0&&i(l)?r>1?e(l,r-1,i,s,a):n(a,l):s||(a[a.length]=l)}return a}},9454:(e,t,r)=>{var n=r(44239),o=r(37005);e.exports=function(e){return o(e)&&"[object Arguments]"==n(e)}},38749:(e,t,r)=>{var n=r(44239),o=r(41780),i=r(37005),s={};s["[object Float32Array]"]=s["[object Float64Array]"]=s["[object Int8Array]"]=s["[object Int16Array]"]=s["[object Int32Array]"]=s["[object Uint8Array]"]=s["[object Uint8ClampedArray]"]=s["[object Uint16Array]"]=s["[object Uint32Array]"]=!0,s["[object Arguments]"]=s["[object Array]"]=s["[object ArrayBuffer]"]=s["[object Boolean]"]=s["[object DataView]"]=s["[object Date]"]=s["[object Error]"]=s["[object Function]"]=s["[object Map]"]=s["[object Number]"]=s["[object Object]"]=s["[object RegExp]"]=s["[object Set]"]=s["[object String]"]=s["[object WeakMap]"]=!1,e.exports=function(e){return i(e)&&o(e.length)&&!!s[n(e)]}},280:(e,t,r)=>{var n=r(25726),o=r(86916),i=Object.prototype.hasOwnProperty;e.exports=function(e){if(!n(e))return o(e);var t=[];for(var r in Object(e))i.call(e,r)&&"constructor"!=r&&t.push(r);return t}},69877:e=>{var t=Math.floor,r=Math.random;e.exports=function(e,n){return e+t(r()*(n-e+1))}},25127:(e,t,r)=>{var n=r(73480),o=r(52628);e.exports=function(e){return n(o(e))}},22545:e=>{e.exports=function(e,t){for(var r=-1,n=Array(e);++r<e;)n[r]=t(r);return n}},47415:(e,t,r)=>{var n=r(29932);e.exports=function(e,t){return n(t,(function(t){return e[t]}))}},74757:e=>{e.exports=function(e,t){return e.has(t)}},37285:(e,t,r)=>{var n=r(62705),o=r(35694),i=r(1469),s=n?n.isConcatSpreadable:void 0;e.exports=function(e){return i(e)||o(e)||!!(s&&e&&e[s])}},25726:e=>{var t=Object.prototype;e.exports=function(e){var r=e&&e.constructor;return e===("function"==typeof r&&r.prototype||t)}},86916:(e,t,r)=>{var n=r(5569)(Object.keys,Object);e.exports=n},31167:(e,t,r)=>{e=r.nmd(e);var n=r(31957),o=t&&!t.nodeType&&t,i=o&&e&&!e.nodeType&&e,s=i&&i.exports===o&&n.process,a=function(){try{var e=i&&i.require&&i.require("util").types;return e||s&&s.binding&&s.binding("util")}catch(e){}}();e.exports=a},5569:e=>{e.exports=function(e,t){return function(r){return e(t(r))}}},90619:e=>{e.exports=function(e){return this.__data__.set(e,"__lodash_hash_undefined__"),this}},72385:e=>{e.exports=function(e){return this.__data__.has(e)}},73480:(e,t,r)=>{var n=r(69877);e.exports=function(e,t){var r=-1,o=e.length,i=o-1;for(t=void 0===t?o:t;++r<t;){var s=n(r,i),a=e[s];e[s]=e[r],e[r]=a}return e.length=t,e}},91966:(e,t,r)=>{var n=r(20731),o=r(21078),i=r(5976),s=r(29246),a=i((function(e,t){return s(e)?n(e,o(t,1,s,!0)):[]}));e.exports=a},35694:(e,t,r)=>{var n=r(9454),o=r(37005),i=Object.prototype,s=i.hasOwnProperty,a=i.propertyIsEnumerable,c=n(function(){return arguments}())?n:function(e){return o(e)&&s.call(e,"callee")&&!a.call(e,"callee")};e.exports=c},29246:(e,t,r)=>{var n=r(98612),o=r(37005);e.exports=function(e){return o(e)&&n(e)}},44144:(e,t,r)=>{e=r.nmd(e);var n=r(55639),o=r(95062),i=t&&!t.nodeType&&t,s=i&&e&&!e.nodeType&&e,a=s&&s.exports===i?n.Buffer:void 0,c=(a?a.isBuffer:void 0)||o;e.exports=c},14293:e=>{e.exports=function(e){return null==e}},36719:(e,t,r)=>{var n=r(38749),o=r(7518),i=r(31167),s=i&&i.isTypedArray,a=s?o(s):n;e.exports=a},3674:(e,t,r)=>{var n=r(14636),o=r(280),i=r(98612);e.exports=function(e){return i(e)?n(e):o(e)}},83608:(e,t,r)=>{var n=r(69877),o=r(16612),i=r(18601),s=parseFloat,a=Math.min,c=Math.random;e.exports=function(e,t,r){if(r&&"boolean"!=typeof r&&o(e,t,r)&&(t=r=void 0),void 0===r&&("boolean"==typeof t?(r=t,t=void 0):"boolean"==typeof e&&(r=e,e=void 0)),void 0===e&&void 0===t?(e=0,t=1):(e=i(e),void 0===t?(t=e,e=0):t=i(t)),e>t){var d=e;e=t,t=d}if(r||e%1||t%1){var l=c();return a(e+l*(t-e+s("1e-"+((l+"").length-1))),t)}return n(e,t)}},69983:(e,t,r)=>{var n=r(70151),o=r(25127),i=r(1469);e.exports=function(e){return(i(e)?n:o)(e)}},95062:e=>{e.exports=function(){return!1}},52628:(e,t,r)=>{var n=r(47415),o=r(3674);e.exports=function(e){return null==e?[]:n(e,o(e))}},3447:(e,t,r)=>{"use strict";r.d(t,{Z:()=>$});var n=r(85893),o=r(67294),i=r(58804),s=r(18731);const a=s.Z.withComponent("button"),c=(0,i.ZP)(a)`
  padding: initial;
  border: initial;
  background-color: initial;
`;var d=r(32531);const l=(0,o.memo)((function({children:e,delay:t}){const r=(e=>{const[t,r]=(0,o.useState)(!1);return(0,o.useEffect)((()=>{const t=setTimeout((()=>{r(!0)}),e);return()=>{clearTimeout(t)}}),[]),t})(t);return r?e:null}));var u=r(788),p=r(96026);const m=i.ZP.div`
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
  ${e=>e.possible?i.iv`
      color: ${e.color};
    `:i.iv`
      border-color: rgb(0 0 0 / 0);
      filter: opacity(0.25);
    `}
`,h=i.ZP.div`
  display: flex;
  justify-content: center;
  margin-top: 2px;
`;const f=(0,o.memo)((function({numGroups:e,possibleGroups:t}){const r=e>>1;return(0,n.jsx)(h,{children:p(e).map((e=>{const o=(0,u.Z)(e);return(0,n.jsx)(m,{color:e<r?"red":"blue",possible:t.includes(e),children:o},o)}))})})),x=i.ZP.div`
  padding: 10px;
  border-width: 2px;
  border-style: dashed;
  border-color: rgb(255 0 0 / 0.5);
`;const g=(0,o.memo)((function(){return(0,n.jsxs)(x,{children:[(0,n.jsx)("div",{children:"Calculation is taking too long."}),(0,n.jsxs)("div",{children:["And"," ",(0,n.jsx)(s.Z,{href:"https://github.com/inker/draw/issues/14",target:"_blank",rel:"noopener",children:"here's why"}),"."]})]})}));var b=r(26962),v=r.n(b);const w=i.vJ`
  body * {
    transition-property: none !important;
    animation: none !important;
  }
`,y=r.e(2154).then(r.bind(r,66925)),j=()=>({downloadClicked:null,transitionsEnabled:!0});const Z=(0,o.memo)((function({completed:e,groupsElement:t}){const[{downloadClicked:r,transitionsEnabled:i},s]=(0,o.useState)(j),a=(0,o.useCallback)((e=>{s({downloadClicked:e,transitionsEnabled:!1})}),[s]);(0,o.useEffect)((()=>{(async()=>{if(r){try{const e=t.current;if(!e)throw new Error("groups element is null");await v()(0);const n=await y;await n.default(e,r)}catch(e){console.error(e)}a(null)}})()}),[r]),(0,o.useEffect)((()=>{e||s({downloadClicked:null,transitionsEnabled:!0})}),[e]);const d=(0,o.useCallback)((()=>a("png")),[a]),l=(0,o.useCallback)((()=>a("svg")),[a]);return e&&t?(0,n.jsxs)("div",{children:[!i&&(0,n.jsx)(w,{}),"Download as ",(0,n.jsx)(c,{onClick:d,children:"PNG"}),", ",(0,n.jsx)(c,{onClick:l,children:"SVG"})]}):null})),k=i.ZP.div`
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
`,P=i.ZP.span`
  display: inline-block;
`,C=i.ZP.strong`
  font-weight: 600;
`,E=i.ZP.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > * + * {
    margin-top: 12px;
  }
`;const $=(0,o.memo)((function({long:e,completed:t,selectedTeam:r,pickedGroup:i,possibleGroups:s,isDisplayPossibleGroupsText:a,numGroups:p,groupsElement:m,reset:h}){const x=(0,o.useRef)(null),b=(0,o.useRef)(null);(0,o.useEffect)((()=>{b.current=t?null:r}),[t,r]);const v=b.current??r;return t?(0,n.jsx)(k,{children:(0,n.jsxs)(E,{children:[(0,n.jsx)("div",{children:"Draw completed!"}),(0,n.jsx)(Z,{completed:t,groupsElement:m}),(0,n.jsx)(c,{onClick:h,children:"Restart"})]})}):null!==i?(x.current=(0,n.jsx)(k,{children:(0,n.jsxs)("div",{children:[e&&v?(0,n.jsxs)("span",{children:[(0,n.jsx)(C,{children:v.shortName??v.name})," goes to group"]}):(0,n.jsx)("span",{children:"Group"})," ",(0,n.jsx)(C,{children:(0,u.Z)(i)}),"!"]})}),x.current):v?(0,n.jsx)(k,{children:a?(0,n.jsxs)("div",{children:["Possible groups for"," ",(0,n.jsxs)(P,{children:[(0,n.jsx)(C,{children:v.name}),":"]}),s?(0,n.jsx)(f,{numGroups:p,possibleGroups:s}):(0,n.jsxs)("div",{children:[(0,n.jsx)(d.Z,{initialNum:0,maxNum:10,interval:2e3}),(0,n.jsx)(l,{delay:1e4,children:(0,n.jsx)(g,{})})]})]}):x.current}):(0,n.jsx)(k,{children:"Pick a ball"})}))},90604:(e,t,r)=>{"use strict";r.d(t,{Z:()=>n});const n=r(58804).ZP.div`
  display: flex;
  flex-direction: column;
  margin: 0 5px 10px;
  min-width: 35%;
  text-align: center;

  @media (max-width: 999px) {
    align-items: center;
  }
`},10694:(e,t,r)=>{"use strict";r.d(t,{Z:()=>y});var n=r(85893),o=r(67294),i=r(58804),s=r(58020),a=r(14293),c=r(68020);let d;var l=r(73935),u=r(12988);const p=(0,o.memo)((({tagName:e,modalRoot:t,children:r})=>{const n=(0,o.useMemo)((()=>{const t=u.includes(e)&&"svg"!==e?"http://www.w3.org/1999/xhtml":"http://www.w3.org/2000/svg";return document.createElementNS(t,e)}),[e,t]),i=(0,o.useRef)(n);return(0,o.useEffect)((()=>(t.appendChild(n),()=>{t.removeChild(n)})),[]),l.createPortal(r,i.current)})),m=((e,...t)=>{d||(d=document.createElement("style"),document.head.appendChild(d));const r=(0,c.Z)("styled-element-"),n=((e,...t)=>e.reduce(((e,r,n)=>`${e}${r}${a(t[n])?"":t[n]}`),""))(e,...t);return d.textContent+=`.${r}{${n}}`,r})`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  pointer-events: none;
`,h=document.createElement("div");h.classList.add(m),document.body.insertBefore(h,document.getElementById("app"));const f=(0,o.memo)((function({children:e}){return(0,n.jsx)(p,{tagName:"div",modalRoot:h,children:e})}));var x=r(39548);const g=(0,i.ZP)(x.Z)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  margin: 0;
  user-select: none;
  pointer-events: none;
`,b=e=>"string"==typeof e?document.querySelector(e):e.current,v=e=>`transform ${e}ms ease-in-out`;function w(e){const{left:t,top:r}=e.getBoundingClientRect();return`translate3d(${t}px, ${r}px, 0px)`}const y=(0,o.memo)((function({from:e,to:t,duration:r,team:i,onAnimationEnd:a}){const c=(0,o.useMemo)((()=>b(e)),[e]),d=(0,o.useMemo)((()=>b(t)),[t]),[l,u]=(0,o.useState)(c);(0,o.useLayoutEffect)((()=>{l===c&&u(d)}),[l]);const p=(0,o.useMemo)((()=>({transform:l instanceof HTMLElement?w(l):"",transition:l===d?v(r):""})),[l,d,r]),m=(0,o.useCallback)((e=>{"transform"===e.propertyName&&a?.()}),[a]);return l&&(0,n.jsx)(f,{children:(0,n.jsx)(g,{country:(0,s.Z)(i),style:p,onTransitionEnd:m,children:i.shortName??i.name})})}))},85973:(e,t,r)=>{"use strict";r.d(t,{Z:()=>n});const n=r(58804).ZP.div`
  display: flex;
  margin: auto;
  width: 1000px;

  @media (max-width: 999px) {
    flex-direction: column;
    width: 100%;
  }
`},62367:(e,t,r)=>{"use strict";r.d(t,{Z:()=>P});var n=r(85893),o=r(67294),i=r(58804),s=r(91966);const a=i.ZP.div`
  display: flex;
  flex-flow: row wrap;
  flex-wrap: nowrap;
  justify-content: center;

  > * {
    flex: 1;
    flex-basis: 22%;
    ${e=>e.limitWidth&&i.iv`
      max-width: 160px;
    `}

    @media (max-width: 999px) {
      max-width: initial;
    }
  }
`;var c=r(96026),d=r(23132),l=r(69585),u=r(42486);const p=(0,i.ZP)(u.Z)`
  transform: box-shadow 1s linear;
  ${e=>e.highlighted&&"\n\n  "}
`;var m=r(32415);const h=i.iv`
  filter: grayscale(0.5);
  opacity: 0.4;
`,f=i.iv`
  color: #f70;
`,x=(0,i.ZP)(m.Z)`
  ${e=>e.depleted&&h}
  ${e=>e.highlighted&&f}
`,g=(0,i.ZP)(l.Z)`
  & + & {
    border-left: ${e=>e.theme.border};
  }
`;var b=r(39548);const v=i.iv`
  color: ${e=>e.theme.isDarkMode?"yellow":"blue"};
`,w=i.iv`
  filter: grayscale(0.5);
  opacity: 0.4;
`,y=(0,i.ZP)(b.Z)`
  ${e=>e.selected&&v}
  ${e=>e.picked&&w}
`;const j=(0,o.memo)((function({teams:e,pickedTeams:t,selectedTeams:r}){return(0,n.jsx)(d.Z,{children:e.map((e=>{const{name:o,country:i,shortName:s,pairing:a}=e;return(0,n.jsx)(g,{children:(0,n.jsx)(y,{"data-cellid":e.id,title:a&&`paired with ${a.shortName??a.name}`,selected:!!r?.includes(e),picked:t.includes(e),country:i??o,children:s??o})},e.id)}))})}));const Z=(0,o.memo)((function({isCurrent:e,potNum:t,teams:r,pickedTeams:o,selectedTeams:i,numCols:s,headerStyles:a}){const u=r.length/s;return(0,n.jsxs)(p,{highlighted:e,children:[(0,n.jsx)("thead",{children:(0,n.jsx)(d.Z,{children:(0,n.jsx)(l.Z,{colSpan:s,children:(0,n.jsxs)(x,{highlighted:e,depleted:!r||o.length===r.length,styles:a,children:["Pot ",t+1]})})})}),(0,n.jsx)("tbody",{children:c(u).map((e=>{const t=e*s,a=c(s).map((e=>r[t+e]));return(0,n.jsx)(j,{teams:a,selectedTeams:i,pickedTeams:o},a.map((e=>e.id)).join(":"))}))})]})})),k=i.iv`
  background-color: rgb(0 0 0 / 0.75);
  color: #fff;
`;const P=(0,o.memo)((function({initialPots:e,pots:t,selectedTeams:r,currentPotNum:o,split:i}){return(0,n.jsx)(a,{limitWidth:!i,children:e.map(((a,c)=>{const d=c===o,l=s(e[c],t[c],r??[]);return(0,n.jsx)(Z,{potNum:c,isCurrent:d,teams:a,pickedTeams:l,selectedTeams:r,numCols:i?2:1,headerStyles:k},a[0].id)}))})}))},36756:(e,t,r)=>{"use strict";r.d(t,{Z:()=>n});const n=r(58804).ZP.div`
  display: flex;
  flex-direction: column;
  margin: 0 5px 10px;
  min-width: 65%;
`},10804:(e,t,r)=>{"use strict";r.d(t,{Z:()=>c});var n=r(85893),o=r(67294),i=r(58804);const s=i.ZP.div`
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
`,a=(0,i.ZP)(s)`
  ${e=>e.selected?i.iv`
      font-size: 0.8em;
      font-weight: bold;
      color: white;
    `:i.iv`
      font-size: 0;
      background: radial-gradient(#004, #002, #002);
    `}

  ${e=>e.forceVisible&&i.iv`
    font-size: 0.8em;
  `}

  @media (max-width: 999px) {
    font-size: ${e=>e.selected?8:0}px;
  }
`;const c=(0,o.memo)((function({noHover:e,...t}){const r=(0,o.useRef)(null),i=(0,o.useCallback)((t=>{const n=r.current;!e&&n&&document.activeElement===n&&"Enter"===t.key&&n.click()}),[r,e]);var s,c;return s="keydown",c=i,(0,o.useEffect)((()=>(window.addEventListener(s,c),()=>{window.removeEventListener(s,c)})),[s,c]),(0,n.jsx)(a,{...t,noHover:e,ref:r,tabIndex:e?void 0:0})}))},55020:(e,t,r)=>{"use strict";r.d(t,{Z:()=>d});var n=r(85893),o=r(67294),i=r(58804),s=r(10804);const a=(0,i.ZP)(s.Z)`
  background:
    ${e=>e.selected?"#004":e.notSelected?"#ddd":"radial-gradient(#fff, #004)"};
  cursor: ${e=>e.noHover?"not-allowed":"pointer"};

  &:hover {
    ${e=>!e.noHover&&i.iv`
      background: radial-gradient(#ccf, #ccf);
    `}
  }
`,c=i.ZP.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 999px) {
    justify-content: center;
  }
`;const d=(0,o.memo)((function({forceNoSelect:e,display:t,displayTeams:r,pot:i,selectedTeam:s,onPick:d}){const l=(0,o.useCallback)((e=>{const t=e.target,r=i.findIndex((e=>e.id===t.dataset.teamid));d(r,i)}),[i,d]),u=e||s;return(0,n.jsx)(c,{children:t&&i.map((t=>(0,n.jsx)(a,{"data-teamid":t.id,selected:t===s,notSelected:e||!!s&&t!==s,forceVisible:r,noHover:!!u,onClick:u?void 0:l,children:t.shortName??t.name},t.id)))})}))},82376:(e,t,r)=>{"use strict";r.d(t,{Z:()=>n});const n=r(58804).ZP.span`
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
`},69585:(e,t,r)=>{"use strict";r.d(t,{Z:()=>n});const n=r(58804).ZP.td`
  height: 20px;
  padding: 0;
  background-color: ${e=>e.theme.isDarkMode?"#58595e":"white"};

  @media (max-width: 999px) {
    height: 14px;
  }
`},93753:(e,t,r)=>{"use strict";r.d(t,{Z:()=>i});var n=r(58804),o=r(82376);const i=(0,n.ZP)(o.Z)`
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
`},39548:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});var n=r(58804),o=r(41915),i=r(93753);const s=(0,n.ZP)(i.Z)`
  padding-left: 19px;
  background-position-y: 1px;
  background-size: 16px;
  background-repeat: no-repeat;

  @media (max-width: 999px) {
    padding-left: 13px;
    background-size: 12px;
  }
`,a=(0,n.ZP)(s)`
  ${({country:e})=>e&&n.iv`
    background-image: url('${(0,o.Z)(e)}');
  `}
`},10606:(e,t,r)=>{"use strict";r.d(t,{Z:()=>i});var n=r(58804),o=r(93753);const i=(0,n.ZP)(o.Z)`
  visibility: hidden;
  pointer-events: none;

  &::before {
    content: '.';
  }
`},32415:(e,t,r)=>{"use strict";r.d(t,{Z:()=>i});var n=r(58804),o=r(82376);const i=(0,n.ZP)(o.Z)`
  justify-content: center;
  width: 100%;
  height: 100%;
  font-weight: 600;
  ${e=>e.styles}
`},23132:(e,t,r)=>{"use strict";r.d(t,{Z:()=>n});const n=r(58804).ZP.tr`
  border: ${e=>e.theme.border};
`},42486:(e,t,r)=>{"use strict";r.d(t,{Z:()=>n});const n=r(58804).ZP.table`
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
`},788:(e,t,r)=>{"use strict";r.d(t,{Z:()=>n});const n=e=>String.fromCodePoint(65+e)},58020:(e,t,r)=>{"use strict";r.d(t,{Z:()=>o});var n=r(72574);const o=e=>e.country??(e.name in n.Z?e.name:void 0)},41771:(e,t,r)=>{"use strict";r.d(t,{Z:()=>o});var n=r(67294);const o=(e,t)=>{const r=(0,n.useRef)(!1);(0,n.useEffect)((()=>{r.current?e():r.current=!0}),t)}},84048:(e,t,r)=>{"use strict";r.d(t,{Z:()=>o});var n=r(67294);const o=e=>{const t=(0,n.useRef)();return(0,n.useEffect)((()=>{t.current=e})),t.current}},83266:(e,t,r)=>{"use strict";r.d(t,{Z:()=>u});var n=r(67294);Object.create;Object.create;function o(e,t,r,n){if("a"===r&&!n)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!n:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===r?n:"a"===r?n.call(e):n?n.value:t.get(e)}const i=class{constructor(){this.callbacks=new Map}add(e,t){this.callbacks.set(e,t)}addAndGetId(e){const t=Math.random().toString(36).slice(2);return this.add(t,e),t}resolve(e,t){this.getCallbackAndDelete(e)(null,t)}reject(e,t){this.getCallbackAndDelete(e)(t)}getCallbackAndDelete(e){const t=this.callbacks.get(e);if(!t)throw new Error(`no resolver with id = ${e}`);return this.callbacks.delete(e),t}},s=(e,t)=>(r,n)=>{r?t(r):e(n)};const a=class{constructor(){this.manager=new i}getPromise(e){return new Promise((async(t,r)=>{const n=s(t,r);this.manager.add(e,n)}))}getPromiseWithId(e){return new Promise((async(t,r)=>{const n=s(t,r),o=this.manager.addAndGetId(n);e&&e(o)}))}resolve(e,t){this.manager.resolve(e,t)}reject(e,t){this.manager.reject(e,t)}};var c,d;c=new WeakMap,d=new WeakMap;const l=class{constructor(e){c.set(this,void 0),d.set(this,new a),function(e,t,r,n,o){if("m"===n)throw new TypeError("Private method is not writable");if("a"===n&&!o)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!o:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");"a"===n?o.call(e,r):o?o.value=r:t.set(e,r)}(this,c,e,"f"),o(this,c,"f").onmessage=e=>{const{messageId:t,data:r}=e.data;o(this,d,"f").resolve(t,r)}}sendAndReceive(e){return o(this,d,"f").getPromiseWithId((t=>{o(this,c,"f").postMessage({messageId:t,data:e})}))}terminate(){o(this,c,"f").terminate()}},u=e=>{const t=(0,n.useMemo)((()=>new l(e())),[e]);return(0,n.useEffect)((()=>()=>{t.terminate()}),[t]),(0,n.useCallback)(t.sendAndReceive.bind(t),[t])}},60200:e=>{"use strict";e.exports=JSON.parse('["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","label","legend","li","link","main","map","mark","math","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rb","rp","rt","rtc","ruby","s","samp","script","section","select","slot","small","source","span","strong","style","sub","summary","sup","svg","table","tbody","td","template","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr"]')}}]);