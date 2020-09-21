/*! For license information please see cl-gs~cl-ko~el-gs~el-ko~wc-gs.39fe4d9232b149d1a06b.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{102:function(e,t,n){"use strict";var r=n(2),o=n(137);const a=Object(r.e)(o.a)`
  justify-content: center;
  height: 100%;
  width: 100%;
  font-weight: 600;
  ${e=>e.styles};
`;t.a=a},103:function(e,t,n){"use strict";var r=n(2),o=n(137);const a=Object(r.e)(o.a)`
  margin: 0 3px;
  text-align: left;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${e=>e.theme.isDarkMode&&r.d`
    text-shadow: 0.5px 0.5px 1px #222;
  `}

  @media (max-width: 999px) {
    font-family: 'Roboto Condensed', RobotoCondensed, RobotoCondensed-Regular, sans-serif;
  }
`;t.a=a},119:function(e,t){var n=Math.floor,r=Math.random;e.exports=function(e,t){return e+n(r()*(t-e+1))}},133:function(e,t,n){var r=n(438),o=n(439);e.exports=function(e){return null==e?[]:r(e,o(e))}},134:function(e,t,n){var r=n(442),o=n(83),a=Object.prototype,i=a.hasOwnProperty,c=a.propertyIsEnumerable,l=r(function(){return arguments}())?r:function(e){return o(e)&&i.call(e,"callee")&&!c.call(e,"callee")};e.exports=l},135:function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},136:function(e,t,n){var r=n(119);e.exports=function(e,t){var n=-1,o=e.length,a=o-1;for(t=void 0===t?o:t;++n<t;){var i=r(n,a),c=e[i];e[i]=e[n],e[n]=c}return e.length=t,e}},137:function(e,t,n){"use strict";const r=n(2).e.span`
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
`;t.a=r},138:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(2);var i=a.e.div`
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
`;const c=Object(a.e)(i)`
  ${e=>e.selected?a.d`
    font-size: 0.8em;
    font-weight: bold;
    color: white;
  `:a.d`
    font-size: 0;
    background: radial-gradient(#004, #002, #002);
  `}

  ${e=>e.forceVisible&&a.d`
    font-size: 0.8em;
  `}

  @media (max-width: 999px) {
    font-size: ${e=>e.selected?8:0}px;
  }
`;t.a=Object(r.memo)(({noHover:e,...t})=>{const n=Object(r.useRef)(null),a=Object(r.useCallback)(t=>{const r=n.current;!e&&r&&document.activeElement===r&&"Enter"===t.key&&r.click()},[n,e]);var i,l;return i="keydown",l=a,Object(r.useEffect)(()=>(window.addEventListener(i,l),()=>{window.removeEventListener(i,l)}),[i,l]),o.a.createElement(c,Object.assign({},t,{noHover:e,ref:n,tabIndex:e?void 0:0}))})},438:function(e,t,n){var r=n(30);e.exports=function(e,t){return r(t,(function(t){return e[t]}))}},439:function(e,t,n){var r=n(440),o=n(448),a=n(116);e.exports=function(e){return a(e)?r(e):o(e)}},440:function(e,t,n){var r=n(441),o=n(134),a=n(82),i=n(443),c=n(127),l=n(445),s=Object.prototype.hasOwnProperty;e.exports=function(e,t){var n=a(e),u=!n&&o(e),d=!n&&!u&&i(e),p=!n&&!u&&!d&&l(e),m=n||u||d||p,f=m?r(e.length,String):[],b=f.length;for(var h in e)!t&&!s.call(e,h)||m&&("length"==h||d&&("offset"==h||"parent"==h)||p&&("buffer"==h||"byteLength"==h||"byteOffset"==h)||c(h,b))||f.push(h);return f}},441:function(e,t){e.exports=function(e,t){for(var n=-1,r=Array(e);++n<e;)r[n]=t(n);return r}},442:function(e,t,n){var r=n(29),o=n(83);e.exports=function(e){return o(e)&&"[object Arguments]"==r(e)}},443:function(e,t,n){(function(e){var r=n(11),o=n(444),a=t&&!t.nodeType&&t,i=a&&"object"==typeof e&&e&&!e.nodeType&&e,c=i&&i.exports===a?r.Buffer:void 0,l=(c?c.isBuffer:void 0)||o;e.exports=l}).call(this,n(135)(e))},444:function(e,t){e.exports=function(){return!1}},445:function(e,t,n){var r=n(446),o=n(33),a=n(447),i=a&&a.isTypedArray,c=i?o(i):r;e.exports=c},446:function(e,t,n){var r=n(29),o=n(126),a=n(83),i={};i["[object Float32Array]"]=i["[object Float64Array]"]=i["[object Int8Array]"]=i["[object Int16Array]"]=i["[object Int32Array]"]=i["[object Uint8Array]"]=i["[object Uint8ClampedArray]"]=i["[object Uint16Array]"]=i["[object Uint32Array]"]=!0,i["[object Arguments]"]=i["[object Array]"]=i["[object ArrayBuffer]"]=i["[object Boolean]"]=i["[object DataView]"]=i["[object Date]"]=i["[object Error]"]=i["[object Function]"]=i["[object Map]"]=i["[object Number]"]=i["[object Object]"]=i["[object RegExp]"]=i["[object Set]"]=i["[object String]"]=i["[object WeakMap]"]=!1,e.exports=function(e){return a(e)&&o(e.length)&&!!i[r(e)]}},447:function(e,t,n){(function(e){var r=n(37),o=t&&!t.nodeType&&t,a=o&&"object"==typeof e&&e&&!e.nodeType&&e,i=a&&a.exports===o&&r.process,c=function(){try{var e=a&&a.require&&a.require("util").types;return e||i&&i.binding&&i.binding("util")}catch(e){}}();e.exports=c}).call(this,n(135)(e))},448:function(e,t,n){var r=n(449),o=n(450),a=Object.prototype.hasOwnProperty;e.exports=function(e){if(!r(e))return o(e);var t=[];for(var n in Object(e))a.call(e,n)&&"constructor"!=n&&t.push(n);return t}},449:function(e,t){var n=Object.prototype;e.exports=function(e){var t=e&&e.constructor;return e===("function"==typeof t&&t.prototype||n)}},450:function(e,t,n){var r=n(451)(Object.keys,Object);e.exports=r},451:function(e,t){e.exports=function(e,t){return function(n){return e(t(n))}}},452:function(e,t,n){var r=n(39),o=n(136);e.exports=function(e){return o(r(e))}},453:function(e,t,n){var r=n(136),o=n(133);e.exports=function(e){return r(o(e))}},454:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r={rejectOnTimeout:!0,errorMessage:void 0};function o(e,t,n){const{rejectOnTimeout:o=r.rejectOnTimeout,errorMessage:a=r.errorMessage}=n||r;return new Promise((n,r)=>{e(n,r),setTimeout(()=>{o?r(a):n()},t)})}t.promiseWithTimeout=o,t.default=(e,t,n)=>o((t,n)=>e.then(t).catch(n),t,n)},455:function(e,t,n){var r=n(456),o=n(463),a=n(34),i=n(466),c=a((function(e,t){return i(e)?r(e,o(t,1,i,!0)):[]}));e.exports=c},456:function(e,t,n){var r=n(457),o=n(460),a=n(461),i=n(30),c=n(33),l=n(462);e.exports=function(e,t,n,s){var u=-1,d=o,p=!0,m=e.length,f=[],b=t.length;if(!m)return f;n&&(t=i(t,c(n))),s?(d=a,p=!1):t.length>=200&&(d=l,p=!1,t=new r(t));e:for(;++u<m;){var h=e[u],g=null==n?h:n(h);if(h=s||0!==h?h:0,p&&g==g){for(var v=b;v--;)if(t[v]===g)continue e;f.push(h)}else d(t,g,s)||f.push(h)}return f}},457:function(e,t,n){var r=n(130),o=n(458),a=n(459);function i(e){var t=-1,n=null==e?0:e.length;for(this.__data__=new r;++t<n;)this.add(e[t])}i.prototype.add=i.prototype.push=o,i.prototype.has=a,e.exports=i},458:function(e,t){e.exports=function(e){return this.__data__.set(e,"__lodash_hash_undefined__"),this}},459:function(e,t){e.exports=function(e){return this.__data__.has(e)}},460:function(e,t,n){var r=n(38);e.exports=function(e,t){return!!(null==e?0:e.length)&&r(e,t,0)>-1}},461:function(e,t){e.exports=function(e,t,n){for(var r=-1,o=null==e?0:e.length;++r<o;)if(n(t,e[r]))return!0;return!1}},462:function(e,t){e.exports=function(e,t){return e.has(t)}},463:function(e,t,n){var r=n(464),o=n(465);e.exports=function e(t,n,a,i,c){var l=-1,s=t.length;for(a||(a=o),c||(c=[]);++l<s;){var u=t[l];n>0&&a(u)?n>1?e(u,n-1,a,i,c):r(c,u):i||(c[c.length]=u)}return c}},464:function(e,t){e.exports=function(e,t){for(var n=-1,r=t.length,o=e.length;++n<r;)e[o+n]=t[n];return e}},465:function(e,t,n){var r=n(10),o=n(134),a=n(82),i=r?r.isConcatSpreadable:void 0;e.exports=function(e){return a(e)||o(e)||!!(i&&e&&e[i])}},466:function(e,t,n){var r=n(116),o=n(83);e.exports=function(e){return o(e)&&r(e)}},467:function(e,t){e.exports=function(e){return null==e}},468:function(e,t,n){"use strict";e.exports=n(469)},469:function(e){e.exports=JSON.parse('["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","label","legend","li","link","main","map","mark","math","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rb","rp","rt","rtc","ruby","s","samp","script","section","select","slot","small","source","span","strong","style","sub","summary","sup","svg","table","tbody","td","template","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr"]')},72:function(e,t,n){"use strict";const r=n(2).e.td`
  height: 20px;
  padding: 0;
  background-color: ${e=>e.theme.isDarkMode?"#58595e":"white"};

  @media (max-width: 999px) {
    height: 14px;
  }
`;t.a=r},76:function(e,t,n){"use strict";const r=n(2).e.tr`
  border: ${e=>e.theme.border};
`;t.a=r},77:function(e,t,n){"use strict";var r=n(2),o=n(131),a=n(103);const i=Object(r.e)(a.a)`
  background-position-y: 1px;
  background-size: 16px;
  background-repeat: no-repeat;

  padding-left: 19px;

  @media (max-width: 999px) {
    background-size: 12px;
    padding-left: 13px;
  }
`,c=Object(r.e)(i)`
  ${({country:e})=>e&&r.d`
    background-image: url('${Object(o.a)(e)}');
  `}
`;t.a=c},79:function(e,t,n){"use strict";const r=n(2).e.table`
  table-layout: fixed;
  border-left: ${e=>e.theme.border};
  border-right: ${e=>e.theme.border};
  border-spacing: 0;
  border-collapse: collapse;
  margin: 0 5px 10px 5px;
  width: 150px;
  min-width: 0;

  @media (max-width: 999px) {
    width: max-content;
    margin: 0 3px 6px 3px;
  }
`;t.a=r},80:function(e,t,n){"use strict";t.a=e=>String.fromCharCode(65+e)},81:function(e,t,n){"use strict";var r=n(118);t.a=e=>{var t;return null!==(t=e.country)&&void 0!==t?t:e.name in r.a?e.name:void 0}},84:function(e,t,n){var r=n(119),o=n(115),a=n(117),i=parseFloat,c=Math.min,l=Math.random;e.exports=function(e,t,n){if(n&&"boolean"!=typeof n&&o(e,t,n)&&(t=n=void 0),void 0===n&&("boolean"==typeof t?(n=t,t=void 0):"boolean"==typeof e&&(n=e,e=void 0)),void 0===e&&void 0===t?(e=0,t=1):(e=a(e),void 0===t?(t=e,e=0):t=a(t)),e>t){var s=e;e=t,t=s}if(n||e%1||t%1){var u=l();return c(e+u*(t-e+i("1e-"+((u+"").length-1))),t)}return r(e,t)}},85:function(e,t,n){var r=n(452),o=n(453),a=n(82);e.exports=function(e){return(a(e)?r:o)(e)}},86:function(e,t,n){"use strict";const r=n(2).e.div`
  display: flex;
  margin: auto;
  width: 1000px;

  @media (max-width: 999px) {
    width: 100%;
    flex-direction: column;
  }
`;t.a=r},87:function(e,t,n){"use strict";var r=n(0);t.a=e=>{const t=Object(r.useRef)();return Object(r.useEffect)(()=>{t.current=e}),t.current}},88:function(e,t,n){"use strict";var r=n(0);t.a=(e,t)=>{const n=Object(r.useRef)(!1);Object(r.useEffect)(()=>{n.current?e():n.current=!0},t)}},89:function(e,t,n){"use strict";var r=n(2),o=n(103);const a=Object(r.e)(o.a)`
  visibility: hidden;
  pointer-events: none;

  &::before {
    content: '.';
  }
`;t.a=a},90:function(e,t,n){"use strict";const r=n(2).e.div`
  display: flex;
  flex-direction: column;
  min-width: 65%;
  margin: 0 5px 10px 5px;
`;t.a=r},91:function(e,t,n){"use strict";const r=n(2).e.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  min-width: 35%;
  margin: 0 5px 10px 5px;

  @media (max-width: 999px) {
    align-items: center;
  }
`;t.a=r},92:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(2),i=n(114);const c=i.a.withComponent("button");var l=Object(a.e)(c)`
  padding: initial;
  border: initial;
  background-color: initial;
`,s=n(21);var u=Object(r.memo)(({children:e,delay:t})=>(e=>{const[t,n]=Object(r.useState)(!1);return Object(r.useEffect)(()=>{const t=setTimeout(()=>{n(!0)},e);return()=>{clearTimeout(t)}},[]),t})(t)?o.a.createElement(o.a.Fragment,null,e):null),d=n(80),p=n(73);var m=a.e.div`
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

  ${e=>e.possible?a.d`
    color: ${e.color};
  `:a.d`
    border-color: rgba(0,0,0,0);
    filter: opacity(0.25);
  `}
`;const f=a.e.div`
  display: flex;
  justify-content: center;
  margin-top: 2px;
`;var b=Object(r.memo)(({numGroups:e,possibleGroups:t})=>{const n=e>>1;return o.a.createElement(f,null,p(e).map(e=>{const r=Object(d.a)(e);return o.a.createElement(m,{key:r,color:e<n?"red":"blue",possible:t.includes(e)},r)}))});const h=a.e.div`
  border-width: 2px;
  border-style: dashed;
  border-color: rgba(255, 0, 0, 0.5);
  padding: 10px;
`;var g=Object(r.memo)(()=>o.a.createElement(h,null,o.a.createElement("div",null,"Calculation is taking too long."),o.a.createElement("div",null,"And"," ",o.a.createElement(i.a,{href:"https://github.com/inker/draw/issues/14",target:"_blank",rel:"noopener"},"here's why"),"."))),v=n(129),x=n.n(v);var y=a.c`
  body * {
    transition-property: none !important;
    animation: none !important;
  }
`;const j=n.e(82).then(n.bind(null,542)),w=()=>({downloadClicked:null,transitionsEnabled:!0});var E=Object(r.memo)(({completed:e,groupsElement:t})=>{const[{downloadClicked:n,transitionsEnabled:a},i]=Object(r.useState)(w),c=Object(r.useCallback)(e=>{i({downloadClicked:e,transitionsEnabled:!1})},[i]);Object(r.useEffect)(()=>{(async()=>{if(n){try{const e=t.current;if(!e)throw new Error("groups element is null");await x()(0);const r=await j;await r.default(e,n)}catch(e){console.error(e)}c(null)}})()},[n]),Object(r.useEffect)(()=>{e||i({downloadClicked:null,transitionsEnabled:!0})},[e]);const s=Object(r.useCallback)(()=>c("png"),[c]),u=Object(r.useCallback)(()=>c("svg"),[c]);return e&&t?o.a.createElement("div",null,!a&&o.a.createElement(y,null),"Download as ",o.a.createElement(l,{onClick:s},"PNG"),", ",o.a.createElement(l,{onClick:u},"SVG")):null});const O=a.e.div`
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
`,k=a.e.span`
  display: inline-block;
`,C=a.e.strong`
  font-weight: 600;
`,$=a.e.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * + * {
    margin-top: 12px;
  }
`;t.a=Object(r.memo)(({long:e,completed:t,selectedTeam:n,pickedGroup:a,possibleGroups:i,isDisplayPossibleGroupsText:c,numGroups:p,groupsElement:m,reset:f})=>{var h,v;const x=Object(r.useRef)(null),y=Object(r.useRef)(null);Object(r.useEffect)(()=>{y.current=t?null:n},[t,n]);const j=null!==(h=y.current)&&void 0!==h?h:n;return t?o.a.createElement(O,null,o.a.createElement($,null,o.a.createElement("div",null,"Draw completed!"),o.a.createElement(E,{completed:t,groupsElement:m}),o.a.createElement(l,{onClick:f},"Restart"))):null!==a?(x.current=o.a.createElement(O,null,o.a.createElement("div",null,e&&j?o.a.createElement("span",null,o.a.createElement(C,null,null!==(v=j.shortName)&&void 0!==v?v:j.name)," goes to group"):o.a.createElement("span",null,"Group")," ",o.a.createElement(C,null,Object(d.a)(a)),"!")),x.current):j?o.a.createElement(O,null,c?o.a.createElement("div",null,"Possible groups for"," ",o.a.createElement(k,null,o.a.createElement(C,null,j.name),":"),i?o.a.createElement(b,{numGroups:p,possibleGroups:i}):o.a.createElement("div",null,o.a.createElement(s.a,{initialNum:0,maxNum:10,interval:2e3}),o.a.createElement(u,{delay:5e3},o.a.createElement(g,null)))):x.current):o.a.createElement(O,null,"Pick a ball")})},93:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(2),i=n(455);var c=a.e.div`
  display: flex;
  flex-flow: row wrap;
  flex-wrap: nowrap;
  justify-content: center;

  & > * {
    flex: 1;
    flex-basis: 22%;
    ${e=>e.limitWidth&&a.d`
      max-width: 160px;
    `};

    @media (max-width: 999px) {
      max-width: initial;
    }
  }
`,l=n(73),s=n(76),u=n(72),d=n(79);var p=Object(a.e)(d.a)`
  transform: box-shadow 1s linear;
  ${e=>e.highlighted&&"\n  "}
`,m=n(102);const f=a.d`
  filter: grayscale(0.5);
  opacity: 0.4;
`,b=a.d`
  color: #f70;
`;var h=Object(a.e)(m.a)`
  ${e=>e.depleted&&f}
  ${e=>e.highlighted&&b}
`;var g=Object(a.e)(u.a)`
  & + & {
    border-left: ${e=>e.theme.border};
  }
`,v=n(77);const x=a.d`
  color: ${e=>e.theme.isDarkMode?"yellow":"blue"};
`,y=a.d`
  filter: grayscale(0.5);
  opacity: 0.4;
`;var j=Object(a.e)(v.a)`
  ${e=>e.selected&&x}
  ${e=>e.picked&&y}
`;var w=Object(r.memo)(({teams:e,pickedTeams:t,selectedTeams:n})=>o.a.createElement(s.a,null,e.map(e=>{var r;const{name:a,country:i,shortName:c,pairing:l}=e;return o.a.createElement(g,{key:e.id},o.a.createElement(j,{"data-cellid":e.id,title:l&&"paired with "+(null!==(r=l.shortName)&&void 0!==r?r:l.name),selected:!!(null==n?void 0:n.includes(e)),picked:t.includes(e),country:null!=i?i:a},null!=c?c:a))})));var E=Object(r.memo)(({isCurrent:e,potNum:t,teams:n,pickedTeams:r,selectedTeams:a,numCols:i,headerStyles:c})=>{const d=n.length/i;return o.a.createElement(p,{highlighted:e},o.a.createElement("thead",null,o.a.createElement(s.a,null,o.a.createElement(u.a,{colSpan:i},o.a.createElement(h,{highlighted:e,depleted:!n||r.length===n.length,styles:c},"Pot ",t+1)))),o.a.createElement("tbody",null,l(d).map(e=>{const t=e*i,c=l(i).map(e=>n[t+e]);return o.a.createElement(w,{key:c.map(e=>e.id).join(":"),teams:c,selectedTeams:a,pickedTeams:r})})))});const O=a.d`
  background-color: rgba(0, 0, 0, 0.75);
  color: #fff;
`;t.a=Object(r.memo)(({initialPots:e,pots:t,selectedTeams:n,currentPotNum:r,split:a})=>o.a.createElement(c,{limitWidth:!a},e.map((c,l)=>{const s=l===r,u=i(e[l],t[l],null!=n?n:[]);return o.a.createElement(E,{key:c[0].id,potNum:l,isCurrent:s,teams:c,pickedTeams:u,selectedTeams:n,numCols:a?2:1,headerStyles:O})})))},94:function(e,t,n){"use strict";var r=n(0);Object.create;Object.create;function o(e,t){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return t.get(e)}function a(e,t,n){if(!t.has(e))throw new TypeError("attempted to set private field on non-instance");return t.set(e,n),n}var i=class{constructor(){this.callbacks=new Map}add(e,t){this.callbacks.set(e,t)}addAndGetId(e){const t=Math.random().toString(36).slice(2);return this.add(t,e),t}resolve(e,t){this.getCallbackAndDelete(e)(null,t)}reject(e,t){this.getCallbackAndDelete(e)(t)}getCallbackAndDelete(e){const t=this.callbacks.get(e);if(!t)throw new Error("no resolver with id = "+e);return this.callbacks.delete(e),t}};const c=(e,t)=>(n,r)=>{n?t(n):e(r)};var l,s,u,d=class{constructor(){this.manager=new i}getPromise(e){return new Promise(async(t,n)=>{const r=c(t,n);this.manager.add(e,r)})}getPromiseWithId(e){return new Promise(async(t,n)=>{const r=c(t,n),o=this.manager.addAndGetId(r);e&&e(o)})}resolve(e,t){this.manager.resolve(e,t)}reject(e,t){this.manager.reject(e,t)}},p=n(454),m=n.n(p);l=new WeakMap,s=new WeakMap,u=new WeakMap;var f=class{constructor(e,t){l.set(this,void 0),s.set(this,new d),u.set(this,void 0),a(this,u,t),a(this,l,e),o(this,l).onmessage=e=>{const{messageId:t,data:n}=e.data;o(this,s).resolve(t,n)}}sendAndReceive(e){const t=o(this,s).getPromiseWithId(t=>{o(this,l).postMessage({messageId:t,data:e})});return void 0===o(this,u)?t:m()(t,o(this,u))}terminate(){o(this,l).terminate()}};t.a=(e,t)=>{const n=Object(r.useMemo)(()=>new f(new e,t),[e,t]);return Object(r.useEffect)(()=>()=>{n.terminate()},[n]),Object(r.useCallback)(n.sendAndReceive.bind(n),[n])}},96:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(2),i=n(81),c=n(467),l=n(128);let s;var u=n(17),d=n.n(u),p=n(468),m=n.n(p);var f=Object(r.memo)(({tagName:e,modalRoot:t,children:n})=>{const o=Object(r.useMemo)(()=>{const t=m.a.includes(e)&&"svg"!==e?"http://www.w3.org/1999/xhtml":"http://www.w3.org/2000/svg";return document.createElementNS(t,e)},[e,t]),a=Object(r.useRef)(o);return Object(r.useEffect)(()=>(t.appendChild(o),()=>{t.removeChild(o)}),[]),d.a.createPortal(n,a.current)});const b=((e,...t)=>{s||(s=document.createElement("style"),document.head.appendChild(s));const n=Object(l.a)("styled-element-"),r=((e,...t)=>e.reduce((e,n,r)=>`${e}${n}${c(t[r])?"":t[r]}`,""))(e,...t);return s.textContent+=`.${n}{${r}}`,n})`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  pointer-events: none;
`,h=document.createElement("div");h.classList.add(b),document.body.insertBefore(h,document.getElementById("app"));var g=Object(r.memo)(({children:e})=>o.a.createElement(f,{tagName:"div",modalRoot:h},e)),v=n(77);const x=Object(a.e)(v.a)`
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  z-index: 1000;
  user-select: none;
  pointer-events: none;
`,y=e=>"string"==typeof e?document.querySelector(e):e.current,j=e=>`transform ${e}ms ease-in-out`;function w(e){const{left:t,top:n}=e.getBoundingClientRect();return`translate3d(${t}px, ${n}px, 0px)`}t.a=Object(r.memo)(({from:e,to:t,duration:n,team:a,onAnimationEnd:c})=>{var l;const s=Object(r.useMemo)(()=>y(e),[e]),u=Object(r.useMemo)(()=>y(t),[t]),[d,p]=Object(r.useState)(s);Object(r.useLayoutEffect)(()=>{d===s&&p(u)},[d]);const m=Object(r.useMemo)(()=>({transform:d instanceof HTMLElement?w(d):"",transition:d===u?j(n):""}),[d,u,n]),f=Object(r.useCallback)(e=>{"transform"===e.propertyName&&(null==c||c())},[c]);return d&&o.a.createElement(g,null,o.a.createElement(x,{country:Object(i.a)(a),style:m,onTransitionEnd:f},null!==(l=a.shortName)&&void 0!==l?l:a.name))})},97:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(2),i=n(138);var c=Object(a.e)(i.a)`
  background: ${e=>e.selected?"#004":e.notSelected?"#ddd":"radial-gradient(#fff, #004)"};

  cursor: ${e=>e.noHover?"not-allowed":"pointer"};

  &:hover {
    ${e=>!e.noHover&&a.d`
      background: radial-gradient(#ccf, #ccf);
    `};
  }
`;const l=a.e.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 999px) {
    justify-content: center;
  }
`;t.a=Object(r.memo)(({forceNoSelect:e,display:t,displayTeams:n,pot:a,selectedTeam:i,onPick:s})=>{const u=Object(r.useCallback)(e=>{const t=e.target,n=a.findIndex(e=>e.id===t.dataset.teamid);s(n,a)},[a,s]),d=e||i;return o.a.createElement(l,null,t&&a.map(t=>{var r;return o.a.createElement(c,{key:t.id,"data-teamid":t.id,selected:t===i,notSelected:e||!!i&&t!==i,forceVisible:n,noHover:!!d,onClick:d?void 0:u},null!==(r=t.shortName)&&void 0!==r?r:t.name)}))})}}]);