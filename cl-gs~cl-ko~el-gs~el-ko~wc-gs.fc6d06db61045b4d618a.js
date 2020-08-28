(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{105:function(e,t){e.exports=function(){return!1}},121:function(e,t,n){var r=n(430);e.exports=function(e,t){var n=-1,o=e.length,a=o-1;for(t=void 0===t?o:t;++n<t;){var i=r(n,a),c=e[i];e[i]=e[n],e[n]=c}return e.length=t,e}},122:function(e,t,n){var r=n(437),o=n(69),a=Object.prototype,i=a.hasOwnProperty,c=a.propertyIsEnumerable,l=r(function(){return arguments}())?r:function(e){return o(e)&&i.call(e,"callee")&&!c.call(e,"callee")};e.exports=l},123:function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},124:function(e,t,n){"use strict";const r=n(1).d.span`
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
`;t.a=r},125:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(1);var i=a.d.div`
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center; /* align vertical */

  width: 67px;
  height: 67px;

  margin: 2px;
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

    & > * {
      flex: 1;
      flex-basis: 22%;
    }

    width: 21px;
    height: 21px;
  }
`;const c=Object(a.d)(i)`
  ${e=>e.selected?a.c`
    font-size: 0.8em;
    font-weight: bold;
    color: white;
  `:a.c`
    font-size: 0;
    background: radial-gradient(#004, #002, #002);
  `}

  ${e=>e.forceVisible&&a.c`
    font-size: 0.8em;
  `}

  @media (max-width: 999px) {
    font-size: ${e=>e.selected?8:0}px;
  }
`;t.a=Object(r.memo)(({noHover:e,...t})=>{const n=Object(r.useRef)(null),a=Object(r.useCallback)(t=>{const r=n.current;!e&&r&&document.activeElement===r&&"Enter"===t.key&&r.click()},[n,e]);var i,l;return i="keydown",l=a,Object(r.useEffect)(()=>(window.addEventListener(i,l),()=>{window.removeEventListener(i,l)}),[i,l]),o.a.createElement(c,Object.assign({},t,{noHover:e,ref:n,tabIndex:e?void 0:0}))})},429:function(e,t,n){var r=n(28),o=n(121);e.exports=function(e){return o(r(e))}},430:function(e,t){var n=Math.floor,r=Math.random;e.exports=function(e,t){return e+n(r()*(t-e+1))}},431:function(e,t,n){var r=n(121),o=n(432);e.exports=function(e){return r(o(e))}},432:function(e,t,n){var r=n(433),o=n(434);e.exports=function(e){return null==e?[]:r(e,o(e))}},433:function(e,t,n){var r=n(20);e.exports=function(e,t){return r(t,(function(t){return e[t]}))}},434:function(e,t,n){var r=n(435),o=n(442),a=n(104);e.exports=function(e){return a(e)?r(e):o(e)}},435:function(e,t,n){var r=n(436),o=n(122),a=n(84),i=n(438),c=n(116),l=n(439),s=Object.prototype.hasOwnProperty;e.exports=function(e,t){var n=a(e),u=!n&&o(e),d=!n&&!u&&i(e),p=!n&&!u&&!d&&l(e),f=n||u||d||p,m=f?r(e.length,String):[],b=m.length;for(var h in e)!t&&!s.call(e,h)||f&&("length"==h||d&&("offset"==h||"parent"==h)||p&&("buffer"==h||"byteLength"==h||"byteOffset"==h)||c(h,b))||m.push(h);return m}},436:function(e,t){e.exports=function(e,t){for(var n=-1,r=Array(e);++n<e;)r[n]=t(n);return r}},437:function(e,t,n){var r=n(18),o=n(69);e.exports=function(e){return o(e)&&"[object Arguments]"==r(e)}},438:function(e,t,n){(function(e){var r=n(7),o=n(105),a=t&&!t.nodeType&&t,i=a&&"object"==typeof e&&e&&!e.nodeType&&e,c=i&&i.exports===a?r.Buffer:void 0,l=(c?c.isBuffer:void 0)||o;e.exports=l}).call(this,n(123)(e))},439:function(e,t,n){var r=n(440),o=n(22),a=n(441),i=a&&a.isTypedArray,c=i?o(i):r;e.exports=c},440:function(e,t,n){var r=n(18),o=n(115),a=n(69),i={};i["[object Float32Array]"]=i["[object Float64Array]"]=i["[object Int8Array]"]=i["[object Int16Array]"]=i["[object Int32Array]"]=i["[object Uint8Array]"]=i["[object Uint8ClampedArray]"]=i["[object Uint16Array]"]=i["[object Uint32Array]"]=!0,i["[object Arguments]"]=i["[object Array]"]=i["[object ArrayBuffer]"]=i["[object Boolean]"]=i["[object DataView]"]=i["[object Date]"]=i["[object Error]"]=i["[object Function]"]=i["[object Map]"]=i["[object Number]"]=i["[object Object]"]=i["[object RegExp]"]=i["[object Set]"]=i["[object String]"]=i["[object WeakMap]"]=!1,e.exports=function(e){return a(e)&&o(e.length)&&!!i[r(e)]}},441:function(e,t,n){(function(e){var r=n(26),o=t&&!t.nodeType&&t,a=o&&"object"==typeof e&&e&&!e.nodeType&&e,i=a&&a.exports===o&&r.process,c=function(){try{var e=a&&a.require&&a.require("util").types;return e||i&&i.binding&&i.binding("util")}catch(e){}}();e.exports=c}).call(this,n(123)(e))},442:function(e,t,n){var r=n(443),o=n(444),a=Object.prototype.hasOwnProperty;e.exports=function(e){if(!r(e))return o(e);var t=[];for(var n in Object(e))a.call(e,n)&&"constructor"!=n&&t.push(n);return t}},443:function(e,t){var n=Object.prototype;e.exports=function(e){var t=e&&e.constructor;return e===("function"==typeof t&&t.prototype||n)}},444:function(e,t,n){var r=n(445)(Object.keys,Object);e.exports=r},445:function(e,t){e.exports=function(e,t){return function(n){return e(t(n))}}},446:function(e,t,n){var r=n(447),o=n(454),a=n(23),i=n(457),c=a((function(e,t){return i(e)?r(e,o(t,1,i,!0)):[]}));e.exports=c},447:function(e,t,n){var r=n(448),o=n(451),a=n(452),i=n(20),c=n(22),l=n(453);e.exports=function(e,t,n,s){var u=-1,d=o,p=!0,f=e.length,m=[],b=t.length;if(!f)return m;n&&(t=i(t,c(n))),s?(d=a,p=!1):t.length>=200&&(d=l,p=!1,t=new r(t));e:for(;++u<f;){var h=e[u],x=null==n?h:n(h);if(h=s||0!==h?h:0,p&&x==x){for(var g=b;g--;)if(t[g]===x)continue e;m.push(h)}else d(t,x,s)||m.push(h)}return m}},448:function(e,t,n){var r=n(119),o=n(449),a=n(450);function i(e){var t=-1,n=null==e?0:e.length;for(this.__data__=new r;++t<n;)this.add(e[t])}i.prototype.add=i.prototype.push=o,i.prototype.has=a,e.exports=i},449:function(e,t){e.exports=function(e){return this.__data__.set(e,"__lodash_hash_undefined__"),this}},450:function(e,t){e.exports=function(e){return this.__data__.has(e)}},451:function(e,t,n){var r=n(27);e.exports=function(e,t){return!!(null==e?0:e.length)&&r(e,t,0)>-1}},452:function(e,t){e.exports=function(e,t,n){for(var r=-1,o=null==e?0:e.length;++r<o;)if(n(t,e[r]))return!0;return!1}},453:function(e,t){e.exports=function(e,t){return e.has(t)}},454:function(e,t,n){var r=n(455),o=n(456);e.exports=function e(t,n,a,i,c){var l=-1,s=t.length;for(a||(a=o),c||(c=[]);++l<s;){var u=t[l];n>0&&a(u)?n>1?e(u,n-1,a,i,c):r(c,u):i||(c[c.length]=u)}return c}},455:function(e,t){e.exports=function(e,t){for(var n=-1,r=t.length,o=e.length;++n<r;)e[o+n]=t[n];return e}},456:function(e,t,n){var r=n(6),o=n(122),a=n(84),i=r?r.isConcatSpreadable:void 0;e.exports=function(e){return a(e)||o(e)||!!(i&&e&&e[i])}},457:function(e,t,n){var r=n(104),o=n(69);e.exports=function(e){return o(e)&&r(e)}},458:function(e,t){e.exports=function(e){return null==e}},59:function(e,t,n){"use strict";const r=n(1).d.td`
  height: 20px;
  padding: 0;
  background-color: white;

  @media (max-width: 999px) {
    height: 14px;
  }
`;t.a=r},62:function(e,t,n){"use strict";const r=n(1).d.tr`
  border: ${e=>e.theme.border};
`;t.a=r},65:function(e,t,n){"use strict";const r=n(1).d.table`
  border-left: ${e=>e.theme.border};
  border-right: ${e=>e.theme.border};
  border-spacing: 0;
  border-collapse: collapse;
  margin: 0 5px 10px 5px;
  width: 150px;
  min-width: 0;

  @media (max-width: 999px) {
    margin: 0 3px 6px 3px;
  }
`;t.a=r},66:function(e,t,n){"use strict";var r=n(1),o=n(120),a=n(92);const i=Object(r.d)(a.a)`
  background-position-y: 1px;
  background-size: 16px;
  background-repeat: no-repeat;

  padding-left: 19px;

  @media (max-width: 999px) {
    background-size: 12px;
    padding-left: 13px;
  }
`,c=Object(r.d)(i)`
  ${({country:e})=>e&&r.c`
    background-image: url('${Object(o.a)(e)}');
  `}
`;t.a=c},67:function(e,t,n){"use strict";t.a=e=>String.fromCharCode(65+e)},70:function(e,t,n){var r=n(429),o=n(431),a=n(84);e.exports=function(e){return(a(e)?r:o)(e)}},71:function(e,t,n){"use strict";var r=n(0);t.a=e=>{const t=Object(r.useRef)();return Object(r.useEffect)(()=>{t.current=e}),t.current}},72:function(e,t,n){"use strict";var r=n(1),o=n(92);const a=Object(r.d)(o.a)`
  visibility: hidden;
  pointer-events: none;

  &::before {
    content: '.';
  }
`;t.a=a},73:function(e,t,n){"use strict";const r=n(1).d.div`
  display: flex;
  flex-direction: column;
  min-width: 65%;
  margin: 0 5px 10px 5px;
`;t.a=r},74:function(e,t,n){"use strict";const r=n(1).d.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  min-width: 35%;
  margin: 0 5px 10px 5px;

  @media (max-width: 999px) {
    align-items: center;
  }
`;t.a=r},75:function(e,t,n){"use strict";const r=n(1).d.div`
  display: flex;
  margin: auto;
  width: 1000px;

  @media (max-width: 999px) {
    width: 100%;
    flex-direction: column;
  }
`;t.a=r},76:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(1);var i=a.d.a`
  color: blue;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: orange;
  }
`;const c=i.withComponent("button");var l=Object(a.d)(c)`
  padding: initial;
  border: initial;
  background-color: initial;
`,s=n(67),u=n(60);var d=a.d.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 25px;
  height: 25px;
  margin: 2px;

  border-width: 1px;
  border-style: solid;
  border-radius: 100%;

  font-size: 18px;

  ${e=>e.possible?a.c`
    color: ${e.color};
  `:a.c`
    color: #000;
    border-color: rgba(0,0,0,0);
    filter: opacity(0.25);
  `}
`;const p=a.d.div`
  display: flex;
  justify-content: center;
  margin-top: 2px;
`;var f=Object(r.memo)(({numGroups:e,possibleGroups:t})=>{const n=e>>1;return o.a.createElement(p,null,u(e).map(e=>{const r=Object(s.a)(e);return o.a.createElement(d,{key:r,color:e<n?"red":"blue",possible:t.includes(e)},r)}))});const m=a.d.div`
  border-width: 2px;
  border-style: dashed;
  border-color: rgba(255, 0, 0, 0.5);
  padding: 10px;
`;var b=Object(r.memo)(()=>o.a.createElement(m,null,o.a.createElement("div",null,"Calculation is taking too long."),o.a.createElement("div",null,"And"," ",o.a.createElement(i,{href:"https://github.com/inker/draw/issues/14",target:"_blank",rel:"noopener"},"here's why"),"."))),h=n(64),x=n.n(h);var g=a.b`
  body * {
    transition-property: none !important;
    animation: none !important;
  }
`;const v=n.e(80).then(n.bind(null,531)),y=()=>({downloadClicked:null,transitionsEnabled:!0});var w=Object(r.memo)(({completed:e,groupsElement:t})=>{const[{downloadClicked:n,transitionsEnabled:a},i]=Object(r.useState)(y),c=Object(r.useCallback)(e=>{i({downloadClicked:e,transitionsEnabled:!1})},[i]);Object(r.useEffect)(()=>{(async()=>{if(n){try{if(!t)throw new Error("groups element is null");await x()(0);const e=await v;await e.default(t,n)}catch(e){console.error(e)}c(null)}})()},[n]),Object(r.useEffect)(()=>{e||i({downloadClicked:null,transitionsEnabled:!0})},[e]);const s=Object(r.useCallback)(()=>c("png"),[c]),u=Object(r.useCallback)(()=>c("svg"),[c]);return e&&t?o.a.createElement("div",null,!a&&o.a.createElement(g,null),"Download as ",o.a.createElement(l,{onClick:s},"PNG"),", ",o.a.createElement(l,{onClick:u},"SVG")):null});const j=a.d.div`
  width: 100%;
  font-size: 1.25em;
  line-height: 150%;
  vertical-align: middle;

  margin-top: 30px;
  margin-bottom: 30px;

  user-select: none;

  @media (max-width: 999px) {
    margin-top: 15px;
    margin-bottom: 15px;
  }
`,E=a.d.span`
  display: inline-block;
`,O=a.d.strong`
  font-weight: 600;
`,k=a.d.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * + * {
    margin-top: 12px;
  }
`;t.a=Object(r.memo)(({long:e,calculating:t,completed:n,selectedTeam:a,pickedGroup:i,possibleGroups:c,numGroups:u,groupsElement:d,reset:p})=>{var m,h;const x=Object(r.useRef)(null),g=Object(r.useRef)(null);Object(r.useEffect)(()=>{g.current=n?null:a},[n,a]);const v=null!==(m=g.current)&&void 0!==m?m:a;return t?o.a.createElement(j,null,o.a.createElement(b,null)):n?o.a.createElement(j,null,o.a.createElement(k,null,o.a.createElement("div",null,"Draw completed!"),o.a.createElement(w,{completed:n,groupsElement:d}),o.a.createElement(l,{onClick:p},"Restart"))):null!==i?(x.current=o.a.createElement(j,null,o.a.createElement("div",null,e&&v?o.a.createElement("span",null,o.a.createElement(O,null,null!==(h=v.shortName)&&void 0!==h?h:v.name)," goes to group"):o.a.createElement("span",null,"Group")," ",o.a.createElement(O,null,Object(s.a)(i)),"!")),x.current):v?o.a.createElement(j,null,c?o.a.createElement("div",null,"Possible groups for"," ",o.a.createElement(E,null,o.a.createElement(O,null,v.name),":"),o.a.createElement(f,{numGroups:u,possibleGroups:c})):x.current):o.a.createElement(j,null,"Pick a ball")})},77:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(1),i=n(446);var c=a.d.div`
  display: flex;
  flex-flow: row wrap;
  flex-wrap: nowrap;
  justify-content: center;

  & > * {
    flex: 1;
    flex-basis: 22%;
    ${e=>e.limitWidth&&a.c`
      max-width: 160px;
    `};

    @media (max-width: 999px) {
      max-width: initial;
    }
  }
`,l=n(62),s=n(59),u=n(65);var d=Object(a.d)(u.a)`
  transform: box-shadow 1s linear;
  ${e=>e.highlighted&&"\n  "}
`,p=n(91);const f=a.c`
  filter: grayscale(0.5);
  opacity: 0.4;
`,m=a.c`
  color: #f70;
`;var b=Object(a.d)(p.a)`
  ${e=>e.depleted&&f}
  ${e=>e.highlighted&&m}
`,h=n(66);const x=a.c`
  color: blue;
`,g=a.c`
  filter: grayscale(0.5);
  opacity: 0.4;
`;var v=Object(a.d)(h.a)`
  ${e=>e.selected&&x}
  ${e=>e.picked&&g}
`;var y=Object(r.memo)(({isCurrent:e,potNum:t,teams:n,pickedTeams:r,selectedTeams:a,headerStyles:i})=>o.a.createElement(d,{highlighted:e},o.a.createElement("thead",null,o.a.createElement(l.a,null,o.a.createElement(s.a,null,o.a.createElement(b,{highlighted:e,depleted:!n||r.length===n.length,styles:i},"Pot ",t+1)))),o.a.createElement("tbody",null,n.map(e=>{var t;const{name:n,country:i,shortName:c,pairing:u}=e;return o.a.createElement(l.a,null,o.a.createElement(s.a,null,o.a.createElement(v,{key:e.id,"data-cellid":e.id,title:u&&"paired with "+(null!==(t=u.shortName)&&void 0!==t?t:u.name),selected:!!(null==a?void 0:a.includes(e)),picked:r.includes(e),country:null!=i?i:n},null!=c?c:n)))})))),w=n(60);const j=Object(a.d)(s.a)`
  width: 50%;

  & + & {
    border-left: ${e=>e.theme.border};
  }
`,E=Object(a.d)(v)`
  margin-right: 0;
`;var O=Object(r.memo)(({isCurrent:e,potNum:t,teams:n,pickedTeams:r,selectedTeams:a,headerStyles:i})=>o.a.createElement(d,{highlighted:e},o.a.createElement("thead",null,o.a.createElement(l.a,null,o.a.createElement(s.a,{colSpan:2},o.a.createElement(b,{highlighted:e,depleted:!n||r.length===n.length,styles:i},"Pot ",t+1)))),o.a.createElement("tbody",null,w(n.length/2).map(e=>{const t=[n[2*e],n[2*e+1]];return o.a.createElement(l.a,{key:e},t.map(e=>{var t;const{name:n,country:i,shortName:c,pairing:l}=e;return o.a.createElement(j,null,o.a.createElement(E,{key:e.id,"data-cellid":e.id,title:l&&"paired with "+(null!==(t=l.shortName)&&void 0!==t?t:l.name),selected:!!a&&a.includes(e),picked:r.includes(e),country:null!=i?i:n},null!=c?c:n))}))}))));const k=a.c`
  background-color: rgba(0, 0, 0, 0.75);
  color: #fff;
`;t.a=Object(r.memo)(({initialPots:e,pots:t,selectedTeams:n,currentPotNum:r,split:a})=>o.a.createElement(c,{limitWidth:!a},e.map((c,l)=>{const s=a?O:y,u=l===r,d=i(e[l],t[l],null!=n?n:[]);return o.a.createElement(s,{key:c[0].id,potNum:l,isCurrent:u,teams:c,pickedTeams:d,selectedTeams:n,headerStyles:k})})))},80:function(e,t,n){"use strict";var r=n(0),o=n(64),a=n.n(o),i=n(103),c=n(458),l=n(118);let s;var u=(e,...t)=>{s||(s=document.createElement("style"),document.head.appendChild(s));const n=Object(l.a)("styled-element-"),r=((e,...t)=>e.reduce((e,n,r)=>`${e}${n}${c(t[r])?"":t[r]}`,""))(e,...t);return s.textContent+=`.${n}{${r}}`,n};const d=(e,t)=>new Promise(n=>{e.addEventListener(t,(function r(o){e.removeEventListener(t,r),n(o)}))}),p=e=>d(e,"transitionend"),f=u`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  pointer-events: none;
`,m=u`
  color: initial;
  position: fixed;
  margin: 0;
  user-select: none;
  pointer-events: none;
`,b=document.createElement("div");function h(e,t){const{left:n,top:r}=t.getBoundingClientRect();e.style.transform=`translate3d(${n}px, ${r}px, 0px)`}b.classList.add(f),document.body.insertBefore(b,document.getElementById("app"));var x=async(e,t,n)=>{const r=function(e){const{width:t,fontFamily:n}=getComputedStyle(e),r=e.cloneNode(!0);r.classList.add(m);const{style:o}=r;return o.width=t,o.fontFamily=n,r.textContent=e.textContent,h(r,e),r}(e);var o;b.appendChild(r),r.style.transition=`transform ${n}ms ease-in-out`,h(r,t),await Promise.race([(o=r,d(o,"transitioncancel")),p(r)]),i.a&&await a()(0),b.removeChild(r)};const g=e=>"string"==typeof e?document.querySelector(e):e.current;t.a=Object(r.memo)(({from:e,to:t,duration:n,data:o,onAnimationEnd:a})=>((e=>{const t=Object(r.useRef)(!1);t.current||(t.current=!0,e())})(()=>{const r=g(e),i=g(t);r instanceof HTMLElement&&i instanceof HTMLElement&&x(r,i,n).then(()=>{a&&a(o)})}),null))},82:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(1),i=n(125);var c=Object(a.d)(i.a)`
  background: ${e=>e.selected?"#004":e.notSelected?"#ddd":"radial-gradient(#fff, #004)"};

  cursor: ${e=>e.noHover?"not-allowed":"pointer"};

  &:hover {
    ${e=>!e.noHover&&a.c`
      background: radial-gradient(#ccf, #ccf);
    `};
  }
`;const l=a.d.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 999px) {
    justify-content: center;
  }
`;t.a=Object(r.memo)(({forceNoSelect:e,display:t,displayTeams:n,pot:a,selectedTeam:i,onPick:s})=>{const u=Object(r.useCallback)(e=>{const t=e.target,n=a.findIndex(e=>e.id===t.dataset.teamid);s(n,a)},[a,s]),d=e||i;return o.a.createElement(l,null,t&&a.map(t=>{var r;return o.a.createElement(c,{key:t.id,"data-teamid":t.id,selected:t===i,notSelected:e||!!i&&t!==i,forceVisible:n,noHover:!!d,onClick:d?void 0:u},null!==(r=t.shortName)&&void 0!==r?r:t.name)}))})},91:function(e,t,n){"use strict";var r=n(1),o=n(124);const a=Object(r.d)(o.a)`
  justify-content: center;
  height: 100%;
  width: 100%;
  font-weight: 600;
  ${e=>e.styles};
`;t.a=a},92:function(e,t,n){"use strict";var r=n(1),o=n(124);const a=Object(r.d)(o.a)`
  margin: 0 3px;
  text-align: left;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 999px) {
    font-family: 'Roboto Condensed', RobotoCondensed, RobotoCondensed-Regular, sans-serif;
  }
`;t.a=a}}]);