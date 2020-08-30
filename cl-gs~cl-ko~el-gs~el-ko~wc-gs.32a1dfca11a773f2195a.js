(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{109:function(e,t){var n=Math.floor,r=Math.random;e.exports=function(e,t){return e+n(r()*(t-e+1))}},110:function(e,t){e.exports=function(){return!1}},125:function(e,t,n){var r=n(436),o=n(437);e.exports=function(e){return null==e?[]:r(e,o(e))}},126:function(e,t,n){var r=n(440),o=n(71),a=Object.prototype,i=a.hasOwnProperty,c=a.propertyIsEnumerable,l=r(function(){return arguments}())?r:function(e){return o(e)&&i.call(e,"callee")&&!c.call(e,"callee")};e.exports=l},127:function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},128:function(e,t,n){var r=n(109);e.exports=function(e,t){var n=-1,o=e.length,a=o-1;for(t=void 0===t?o:t;++n<t;){var i=r(n,a),c=e[i];e[i]=e[n],e[n]=c}return e.length=t,e}},129:function(e,t,n){"use strict";const r=n(1).d.span`
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
`;t.a=r},130:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(1);var i=a.d.div`
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
`;t.a=Object(r.memo)(({noHover:e,...t})=>{const n=Object(r.useRef)(null),a=Object(r.useCallback)(t=>{const r=n.current;!e&&r&&document.activeElement===r&&"Enter"===t.key&&r.click()},[n,e]);var i,l;return i="keydown",l=a,Object(r.useEffect)(()=>(window.addEventListener(i,l),()=>{window.removeEventListener(i,l)}),[i,l]),o.a.createElement(c,Object.assign({},t,{noHover:e,ref:n,tabIndex:e?void 0:0}))})},436:function(e,t,n){var r=n(21);e.exports=function(e,t){return r(t,(function(t){return e[t]}))}},437:function(e,t,n){var r=n(438),o=n(445),a=n(106);e.exports=function(e){return a(e)?r(e):o(e)}},438:function(e,t,n){var r=n(439),o=n(126),a=n(70),i=n(441),c=n(120),l=n(442),s=Object.prototype.hasOwnProperty;e.exports=function(e,t){var n=a(e),u=!n&&o(e),d=!n&&!u&&i(e),p=!n&&!u&&!d&&l(e),f=n||u||d||p,m=f?r(e.length,String):[],b=m.length;for(var h in e)!t&&!s.call(e,h)||f&&("length"==h||d&&("offset"==h||"parent"==h)||p&&("buffer"==h||"byteLength"==h||"byteOffset"==h)||c(h,b))||m.push(h);return m}},439:function(e,t){e.exports=function(e,t){for(var n=-1,r=Array(e);++n<e;)r[n]=t(n);return r}},440:function(e,t,n){var r=n(19),o=n(71);e.exports=function(e){return o(e)&&"[object Arguments]"==r(e)}},441:function(e,t,n){(function(e){var r=n(8),o=n(110),a=t&&!t.nodeType&&t,i=a&&"object"==typeof e&&e&&!e.nodeType&&e,c=i&&i.exports===a?r.Buffer:void 0,l=(c?c.isBuffer:void 0)||o;e.exports=l}).call(this,n(127)(e))},442:function(e,t,n){var r=n(443),o=n(23),a=n(444),i=a&&a.isTypedArray,c=i?o(i):r;e.exports=c},443:function(e,t,n){var r=n(19),o=n(119),a=n(71),i={};i["[object Float32Array]"]=i["[object Float64Array]"]=i["[object Int8Array]"]=i["[object Int16Array]"]=i["[object Int32Array]"]=i["[object Uint8Array]"]=i["[object Uint8ClampedArray]"]=i["[object Uint16Array]"]=i["[object Uint32Array]"]=!0,i["[object Arguments]"]=i["[object Array]"]=i["[object ArrayBuffer]"]=i["[object Boolean]"]=i["[object DataView]"]=i["[object Date]"]=i["[object Error]"]=i["[object Function]"]=i["[object Map]"]=i["[object Number]"]=i["[object Object]"]=i["[object RegExp]"]=i["[object Set]"]=i["[object String]"]=i["[object WeakMap]"]=!1,e.exports=function(e){return a(e)&&o(e.length)&&!!i[r(e)]}},444:function(e,t,n){(function(e){var r=n(27),o=t&&!t.nodeType&&t,a=o&&"object"==typeof e&&e&&!e.nodeType&&e,i=a&&a.exports===o&&r.process,c=function(){try{var e=a&&a.require&&a.require("util").types;return e||i&&i.binding&&i.binding("util")}catch(e){}}();e.exports=c}).call(this,n(127)(e))},445:function(e,t,n){var r=n(446),o=n(447),a=Object.prototype.hasOwnProperty;e.exports=function(e){if(!r(e))return o(e);var t=[];for(var n in Object(e))a.call(e,n)&&"constructor"!=n&&t.push(n);return t}},446:function(e,t){var n=Object.prototype;e.exports=function(e){var t=e&&e.constructor;return e===("function"==typeof t&&t.prototype||n)}},447:function(e,t,n){var r=n(448)(Object.keys,Object);e.exports=r},448:function(e,t){e.exports=function(e,t){return function(n){return e(t(n))}}},449:function(e,t,n){var r=n(29),o=n(128);e.exports=function(e){return o(r(e))}},450:function(e,t,n){var r=n(128),o=n(125);e.exports=function(e){return r(o(e))}},451:function(e,t,n){var r=n(452),o=n(459),a=n(24),i=n(462),c=a((function(e,t){return i(e)?r(e,o(t,1,i,!0)):[]}));e.exports=c},452:function(e,t,n){var r=n(453),o=n(456),a=n(457),i=n(21),c=n(23),l=n(458);e.exports=function(e,t,n,s){var u=-1,d=o,p=!0,f=e.length,m=[],b=t.length;if(!f)return m;n&&(t=i(t,c(n))),s?(d=a,p=!1):t.length>=200&&(d=l,p=!1,t=new r(t));e:for(;++u<f;){var h=e[u],x=null==n?h:n(h);if(h=s||0!==h?h:0,p&&x==x){for(var g=b;g--;)if(t[g]===x)continue e;m.push(h)}else d(t,x,s)||m.push(h)}return m}},453:function(e,t,n){var r=n(122),o=n(454),a=n(455);function i(e){var t=-1,n=null==e?0:e.length;for(this.__data__=new r;++t<n;)this.add(e[t])}i.prototype.add=i.prototype.push=o,i.prototype.has=a,e.exports=i},454:function(e,t){e.exports=function(e){return this.__data__.set(e,"__lodash_hash_undefined__"),this}},455:function(e,t){e.exports=function(e){return this.__data__.has(e)}},456:function(e,t,n){var r=n(28);e.exports=function(e,t){return!!(null==e?0:e.length)&&r(e,t,0)>-1}},457:function(e,t){e.exports=function(e,t,n){for(var r=-1,o=null==e?0:e.length;++r<o;)if(n(t,e[r]))return!0;return!1}},458:function(e,t){e.exports=function(e,t){return e.has(t)}},459:function(e,t,n){var r=n(460),o=n(461);e.exports=function e(t,n,a,i,c){var l=-1,s=t.length;for(a||(a=o),c||(c=[]);++l<s;){var u=t[l];n>0&&a(u)?n>1?e(u,n-1,a,i,c):r(c,u):i||(c[c.length]=u)}return c}},460:function(e,t){e.exports=function(e,t){for(var n=-1,r=t.length,o=e.length;++n<r;)e[o+n]=t[n];return e}},461:function(e,t,n){var r=n(7),o=n(126),a=n(70),i=r?r.isConcatSpreadable:void 0;e.exports=function(e){return a(e)||o(e)||!!(i&&e&&e[i])}},462:function(e,t,n){var r=n(106),o=n(71);e.exports=function(e){return o(e)&&r(e)}},463:function(e,t){e.exports=function(e){return null==e}},60:function(e,t,n){"use strict";const r=n(1).d.td`
  height: 20px;
  padding: 0;
  background-color: white;

  @media (max-width: 999px) {
    height: 14px;
  }
`;t.a=r},63:function(e,t,n){"use strict";const r=n(1).d.tr`
  border: ${e=>e.theme.border};
`;t.a=r},66:function(e,t,n){"use strict";const r=n(1).d.table`
  table-layout: fixed;
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
`;t.a=r},67:function(e,t,n){"use strict";var r=n(1),o=n(123),a=n(93);const i=Object(r.d)(a.a)`
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
`;t.a=c},68:function(e,t,n){"use strict";t.a=e=>String.fromCharCode(65+e)},72:function(e,t,n){var r=n(109),o=n(105),a=n(107),i=parseFloat,c=Math.min,l=Math.random;e.exports=function(e,t,n){if(n&&"boolean"!=typeof n&&o(e,t,n)&&(t=n=void 0),void 0===n&&("boolean"==typeof t?(n=t,t=void 0):"boolean"==typeof e&&(n=e,e=void 0)),void 0===e&&void 0===t?(e=0,t=1):(e=a(e),void 0===t?(t=e,e=0):t=a(t)),e>t){var s=e;e=t,t=s}if(n||e%1||t%1){var u=l();return c(e+u*(t-e+i("1e-"+((u+"").length-1))),t)}return r(e,t)}},73:function(e,t,n){var r=n(449),o=n(450),a=n(70);e.exports=function(e){return(a(e)?r:o)(e)}},74:function(e,t,n){"use strict";var r=n(0);t.a=e=>{const t=Object(r.useRef)();return Object(r.useEffect)(()=>{t.current=e}),t.current}},75:function(e,t,n){"use strict";var r=n(1),o=n(93);const a=Object(r.d)(o.a)`
  visibility: hidden;
  pointer-events: none;

  &::before {
    content: '.';
  }
`;t.a=a},76:function(e,t,n){"use strict";const r=n(1).d.div`
  display: flex;
  flex-direction: column;
  min-width: 65%;
  margin: 0 5px 10px 5px;
`;t.a=r},77:function(e,t,n){"use strict";const r=n(1).d.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  min-width: 35%;
  margin: 0 5px 10px 5px;

  @media (max-width: 999px) {
    align-items: center;
  }
`;t.a=r},78:function(e,t,n){"use strict";const r=n(1).d.div`
  display: flex;
  margin: auto;
  width: 1000px;

  @media (max-width: 999px) {
    width: 100%;
    flex-direction: column;
  }
`;t.a=r},79:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(1);var i=a.d.a`
  color: blue;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;const c=i.withComponent("button");var l=Object(a.d)(c)`
  padding: initial;
  border: initial;
  background-color: initial;
`,s=n(12);var u=Object(r.memo)(({children:e,delay:t})=>(e=>{const[t,n]=Object(r.useState)(!1);return Object(r.useEffect)(()=>{const t=setTimeout(()=>{n(!0)},e);return()=>{clearTimeout(t)}},[]),t})(t)?o.a.createElement(o.a.Fragment,null,e):null),d=n(68),p=n(61);var f=a.d.div`
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
    border-color: rgba(0,0,0,0);
    filter: opacity(0.25);
  `}
`;const m=a.d.div`
  display: flex;
  justify-content: center;
  margin-top: 2px;
`;var b=Object(r.memo)(({numGroups:e,possibleGroups:t})=>{const n=e>>1;return o.a.createElement(m,null,p(e).map(e=>{const r=Object(d.a)(e);return o.a.createElement(f,{key:r,color:e<n?"red":"blue",possible:t.includes(e)},r)}))});const h=a.d.div`
  border-width: 2px;
  border-style: dashed;
  border-color: rgba(255, 0, 0, 0.5);
  padding: 10px;
`;var x=Object(r.memo)(()=>o.a.createElement(h,null,o.a.createElement("div",null,"Calculation is taking too long."),o.a.createElement("div",null,"And"," ",o.a.createElement(i,{href:"https://github.com/inker/draw/issues/14",target:"_blank",rel:"noopener"},"here's why"),"."))),g=n(108),v=n.n(g);var y=a.b`
  body * {
    transition-property: none !important;
    animation: none !important;
  }
`;const w=n.e(80).then(n.bind(null,536)),j=()=>({downloadClicked:null,transitionsEnabled:!0});var E=Object(r.memo)(({completed:e,groupsElement:t})=>{const[{downloadClicked:n,transitionsEnabled:a},i]=Object(r.useState)(j),c=Object(r.useCallback)(e=>{i({downloadClicked:e,transitionsEnabled:!1})},[i]);Object(r.useEffect)(()=>{(async()=>{if(n){try{const e=t.current;if(!e)throw new Error("groups element is null");await v()(0);const r=await w;await r.default(e,n)}catch(e){console.error(e)}c(null)}})()},[n]),Object(r.useEffect)(()=>{e||i({downloadClicked:null,transitionsEnabled:!0})},[e]);const s=Object(r.useCallback)(()=>c("png"),[c]),u=Object(r.useCallback)(()=>c("svg"),[c]);return e&&t?o.a.createElement("div",null,!a&&o.a.createElement(y,null),"Download as ",o.a.createElement(l,{onClick:s},"PNG"),", ",o.a.createElement(l,{onClick:u},"SVG")):null});const O=a.d.div`
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
`,k=a.d.span`
  display: inline-block;
`,C=a.d.strong`
  font-weight: 600;
`,$=a.d.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * + * {
    margin-top: 12px;
  }
`;t.a=Object(r.memo)(({long:e,completed:t,selectedTeam:n,pickedGroup:a,possibleGroups:i,isDisplayPossibleGroupsText:c,numGroups:p,groupsElement:f,reset:m})=>{var h,g;const v=Object(r.useRef)(null),y=Object(r.useRef)(null);Object(r.useEffect)(()=>{y.current=t?null:n},[t,n]);const w=null!==(h=y.current)&&void 0!==h?h:n;return t?o.a.createElement(O,null,o.a.createElement($,null,o.a.createElement("div",null,"Draw completed!"),o.a.createElement(E,{completed:t,groupsElement:f}),o.a.createElement(l,{onClick:m},"Restart"))):null!==a?(v.current=o.a.createElement(O,null,o.a.createElement("div",null,e&&w?o.a.createElement("span",null,o.a.createElement(C,null,null!==(g=w.shortName)&&void 0!==g?g:w.name)," goes to group"):o.a.createElement("span",null,"Group")," ",o.a.createElement(C,null,Object(d.a)(a)),"!")),v.current):w?o.a.createElement(O,null,c?o.a.createElement("div",null,"Possible groups for"," ",o.a.createElement(k,null,o.a.createElement(C,null,w.name),":"),i?o.a.createElement(b,{numGroups:p,possibleGroups:i}):o.a.createElement("div",null,o.a.createElement(s.a,{initialNum:0,maxNum:10,interval:2e3}),o.a.createElement(u,{delay:3e3},o.a.createElement(x,null)))):v.current):o.a.createElement(O,null,"Pick a ball")})},80:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(1),i=n(451);var c=a.d.div`
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
`,l=n(63),s=n(60),u=n(66);var d=Object(a.d)(u.a)`
  transform: box-shadow 1s linear;
  ${e=>e.highlighted&&"\n  "}
`,p=n(92);const f=a.c`
  filter: grayscale(0.5);
  opacity: 0.4;
`,m=a.c`
  color: #f70;
`;var b=Object(a.d)(p.a)`
  ${e=>e.depleted&&f}
  ${e=>e.highlighted&&m}
`,h=n(67);const x=a.c`
  color: blue;
`,g=a.c`
  filter: grayscale(0.5);
  opacity: 0.4;
`;var v=Object(a.d)(h.a)`
  ${e=>e.selected&&x}
  ${e=>e.picked&&g}
`;var y=Object(r.memo)(({isCurrent:e,potNum:t,teams:n,pickedTeams:r,selectedTeams:a,headerStyles:i})=>o.a.createElement(d,{highlighted:e},o.a.createElement("thead",null,o.a.createElement(l.a,null,o.a.createElement(s.a,null,o.a.createElement(b,{highlighted:e,depleted:!n||r.length===n.length,styles:i},"Pot ",t+1)))),o.a.createElement("tbody",null,n.map(e=>{var t;const{name:n,country:i,shortName:c,pairing:u}=e;return o.a.createElement(l.a,{key:e.id},o.a.createElement(s.a,null,o.a.createElement(v,{"data-cellid":e.id,title:u&&"paired with "+(null!==(t=u.shortName)&&void 0!==t?t:u.name),selected:!!(null==a?void 0:a.includes(e)),picked:r.includes(e),country:null!=i?i:n},null!=c?c:n)))})))),w=n(61);const j=Object(a.d)(s.a)`
  width: 50%;

  & + & {
    border-left: ${e=>e.theme.border};
  }
`,E=Object(a.d)(v)`
  margin-right: 0;
`;var O=Object(r.memo)(({isCurrent:e,potNum:t,teams:n,pickedTeams:r,selectedTeams:a,headerStyles:i})=>o.a.createElement(d,{highlighted:e},o.a.createElement("thead",null,o.a.createElement(l.a,null,o.a.createElement(s.a,{colSpan:2},o.a.createElement(b,{highlighted:e,depleted:!n||r.length===n.length,styles:i},"Pot ",t+1)))),o.a.createElement("tbody",null,w(n.length/2).map(e=>{const t=[n[2*e],n[2*e+1]];return o.a.createElement(l.a,{key:e},t.map(e=>{var t;const{name:n,country:i,shortName:c,pairing:l}=e;return o.a.createElement(j,{key:e.id},o.a.createElement(E,{"data-cellid":e.id,title:l&&"paired with "+(null!==(t=l.shortName)&&void 0!==t?t:l.name),selected:!!a&&a.includes(e),picked:r.includes(e),country:null!=i?i:n},null!=c?c:n))}))}))));const k=a.c`
  background-color: rgba(0, 0, 0, 0.75);
  color: #fff;
`;t.a=Object(r.memo)(({initialPots:e,pots:t,selectedTeams:n,currentPotNum:r,split:a})=>o.a.createElement(c,{limitWidth:!a},e.map((c,l)=>{const s=a?O:y,u=l===r,d=i(e[l],t[l],null!=n?n:[]);return o.a.createElement(s,{key:c[0].id,potNum:l,isCurrent:u,teams:c,pickedTeams:d,selectedTeams:n,headerStyles:k})})))},83:function(e,t,n){"use strict";var r=n(0),o=n(108),a=n.n(o),i=n(104),c=n(463),l=n(121);let s;var u=(e,...t)=>{s||(s=document.createElement("style"),document.head.appendChild(s));const n=Object(l.a)("styled-element-"),r=((e,...t)=>e.reduce((e,n,r)=>`${e}${n}${c(t[r])?"":t[r]}`,""))(e,...t);return s.textContent+=`.${n}{${r}}`,n};const d=(e,t)=>new Promise(n=>{e.addEventListener(t,(function r(o){e.removeEventListener(t,r),n(o)}))}),p=e=>d(e,"transitionend"),f=u`
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
`,b=document.createElement("div");function h(e,t){const{left:n,top:r}=t.getBoundingClientRect();return`translate3d(${n}px, ${r}px, 0px)`}b.classList.add(f),document.body.insertBefore(b,document.getElementById("app"));var x=async(e,t,n)=>{const r=function(e){const{width:t,fontFamily:n}=getComputedStyle(e),r=e.cloneNode(!0);r.classList.add(m);const{style:o}=r;return o.width=t,o.fontFamily=n,r.textContent=e.textContent,r.style.transform=h(0,e),r}(e);var o;b.appendChild(r),r.style.transition=`transform ${n}ms ease-in-out`,r.style.transform=h(0,t),await Promise.race([(o=r,d(o,"transitioncancel")),p(r)]),i.a&&await a()(0),b.removeChild(r)};const g=e=>"string"==typeof e?document.querySelector(e):e.current;t.a=Object(r.memo)(({from:e,to:t,duration:n,data:o,onAnimationEnd:a})=>((e=>{const t=Object(r.useRef)(!1);t.current||(t.current=!0,e())})(()=>{const r=g(e),i=g(t);r instanceof HTMLElement&&i instanceof HTMLElement&&x(r,i,n).then(()=>{a&&a(o)})}),null))},84:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(1),i=n(130);var c=Object(a.d)(i.a)`
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
`;t.a=Object(r.memo)(({forceNoSelect:e,display:t,displayTeams:n,pot:a,selectedTeam:i,onPick:s})=>{const u=Object(r.useCallback)(e=>{const t=e.target,n=a.findIndex(e=>e.id===t.dataset.teamid);s(n,a)},[a,s]),d=e||i;return o.a.createElement(l,null,t&&a.map(t=>{var r;return o.a.createElement(c,{key:t.id,"data-teamid":t.id,selected:t===i,notSelected:e||!!i&&t!==i,forceVisible:n,noHover:!!d,onClick:d?void 0:u},null!==(r=t.shortName)&&void 0!==r?r:t.name)}))})},92:function(e,t,n){"use strict";var r=n(1),o=n(129);const a=Object(r.d)(o.a)`
  justify-content: center;
  height: 100%;
  width: 100%;
  font-weight: 600;
  ${e=>e.styles};
`;t.a=a},93:function(e,t,n){"use strict";var r=n(1),o=n(129);const a=Object(r.d)(o.a)`
  margin: 0 3px;
  text-align: left;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 999px) {
    font-family: 'Roboto Condensed', RobotoCondensed, RobotoCondensed-Regular, sans-serif;
  }
`;t.a=a}}]);