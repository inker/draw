(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{112:function(e,t){var n=Math.floor,r=Math.random;e.exports=function(e,t){return e+n(r()*(t-e+1))}},113:function(e,t){e.exports=function(){return!1}},131:function(e,t,n){var r=n(437),o=n(438);e.exports=function(e){return null==e?[]:r(e,o(e))}},132:function(e,t,n){var r=n(441),o=n(77),a=Object.prototype,i=a.hasOwnProperty,c=a.propertyIsEnumerable,l=r(function(){return arguments}())?r:function(e){return o(e)&&i.call(e,"callee")&&!c.call(e,"callee")};e.exports=l},133:function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},134:function(e,t,n){var r=n(112);e.exports=function(e,t){var n=-1,o=e.length,a=o-1;for(t=void 0===t?o:t;++n<t;){var i=r(n,a),c=e[i];e[i]=e[n],e[n]=c}return e.length=t,e}},135:function(e,t,n){"use strict";const r=n(2).d.span`
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
`;t.a=r},136:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(2);var i=a.d.div`
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
`;t.a=Object(r.memo)(({noHover:e,...t})=>{const n=Object(r.useRef)(null),a=Object(r.useCallback)(t=>{const r=n.current;!e&&r&&document.activeElement===r&&"Enter"===t.key&&r.click()},[n,e]);var i,l;return i="keydown",l=a,Object(r.useEffect)(()=>(window.addEventListener(i,l),()=>{window.removeEventListener(i,l)}),[i,l]),o.a.createElement(c,Object.assign({},t,{noHover:e,ref:n,tabIndex:e?void 0:0}))})},437:function(e,t,n){var r=n(24);e.exports=function(e,t){return r(t,(function(t){return e[t]}))}},438:function(e,t,n){var r=n(439),o=n(446),a=n(109);e.exports=function(e){return a(e)?r(e):o(e)}},439:function(e,t,n){var r=n(440),o=n(132),a=n(76),i=n(442),c=n(125),l=n(443),s=Object.prototype.hasOwnProperty;e.exports=function(e,t){var n=a(e),u=!n&&o(e),d=!n&&!u&&i(e),p=!n&&!u&&!d&&l(e),m=n||u||d||p,f=m?r(e.length,String):[],b=f.length;for(var h in e)!t&&!s.call(e,h)||m&&("length"==h||d&&("offset"==h||"parent"==h)||p&&("buffer"==h||"byteLength"==h||"byteOffset"==h)||c(h,b))||f.push(h);return f}},440:function(e,t){e.exports=function(e,t){for(var n=-1,r=Array(e);++n<e;)r[n]=t(n);return r}},441:function(e,t,n){var r=n(23),o=n(77);e.exports=function(e){return o(e)&&"[object Arguments]"==r(e)}},442:function(e,t,n){(function(e){var r=n(10),o=n(113),a=t&&!t.nodeType&&t,i=a&&"object"==typeof e&&e&&!e.nodeType&&e,c=i&&i.exports===a?r.Buffer:void 0,l=(c?c.isBuffer:void 0)||o;e.exports=l}).call(this,n(133)(e))},443:function(e,t,n){var r=n(444),o=n(27),a=n(445),i=a&&a.isTypedArray,c=i?o(i):r;e.exports=c},444:function(e,t,n){var r=n(23),o=n(124),a=n(77),i={};i["[object Float32Array]"]=i["[object Float64Array]"]=i["[object Int8Array]"]=i["[object Int16Array]"]=i["[object Int32Array]"]=i["[object Uint8Array]"]=i["[object Uint8ClampedArray]"]=i["[object Uint16Array]"]=i["[object Uint32Array]"]=!0,i["[object Arguments]"]=i["[object Array]"]=i["[object ArrayBuffer]"]=i["[object Boolean]"]=i["[object DataView]"]=i["[object Date]"]=i["[object Error]"]=i["[object Function]"]=i["[object Map]"]=i["[object Number]"]=i["[object Object]"]=i["[object RegExp]"]=i["[object Set]"]=i["[object String]"]=i["[object WeakMap]"]=!1,e.exports=function(e){return a(e)&&o(e.length)&&!!i[r(e)]}},445:function(e,t,n){(function(e){var r=n(31),o=t&&!t.nodeType&&t,a=o&&"object"==typeof e&&e&&!e.nodeType&&e,i=a&&a.exports===o&&r.process,c=function(){try{var e=a&&a.require&&a.require("util").types;return e||i&&i.binding&&i.binding("util")}catch(e){}}();e.exports=c}).call(this,n(133)(e))},446:function(e,t,n){var r=n(447),o=n(448),a=Object.prototype.hasOwnProperty;e.exports=function(e){if(!r(e))return o(e);var t=[];for(var n in Object(e))a.call(e,n)&&"constructor"!=n&&t.push(n);return t}},447:function(e,t){var n=Object.prototype;e.exports=function(e){var t=e&&e.constructor;return e===("function"==typeof t&&t.prototype||n)}},448:function(e,t,n){var r=n(449)(Object.keys,Object);e.exports=r},449:function(e,t){e.exports=function(e,t){return function(n){return e(t(n))}}},450:function(e,t,n){var r=n(33),o=n(134);e.exports=function(e){return o(r(e))}},451:function(e,t,n){var r=n(134),o=n(131);e.exports=function(e){return r(o(e))}},452:function(e,t,n){var r=n(453),o=n(460),a=n(28),i=n(463),c=a((function(e,t){return i(e)?r(e,o(t,1,i,!0)):[]}));e.exports=c},453:function(e,t,n){var r=n(454),o=n(457),a=n(458),i=n(24),c=n(27),l=n(459);e.exports=function(e,t,n,s){var u=-1,d=o,p=!0,m=e.length,f=[],b=t.length;if(!m)return f;n&&(t=i(t,c(n))),s?(d=a,p=!1):t.length>=200&&(d=l,p=!1,t=new r(t));e:for(;++u<m;){var h=e[u],x=null==n?h:n(h);if(h=s||0!==h?h:0,p&&x==x){for(var v=b;v--;)if(t[v]===x)continue e;f.push(h)}else d(t,x,s)||f.push(h)}return f}},454:function(e,t,n){var r=n(128),o=n(455),a=n(456);function i(e){var t=-1,n=null==e?0:e.length;for(this.__data__=new r;++t<n;)this.add(e[t])}i.prototype.add=i.prototype.push=o,i.prototype.has=a,e.exports=i},455:function(e,t){e.exports=function(e){return this.__data__.set(e,"__lodash_hash_undefined__"),this}},456:function(e,t){e.exports=function(e){return this.__data__.has(e)}},457:function(e,t,n){var r=n(32);e.exports=function(e,t){return!!(null==e?0:e.length)&&r(e,t,0)>-1}},458:function(e,t){e.exports=function(e,t,n){for(var r=-1,o=null==e?0:e.length;++r<o;)if(n(t,e[r]))return!0;return!1}},459:function(e,t){e.exports=function(e,t){return e.has(t)}},460:function(e,t,n){var r=n(461),o=n(462);e.exports=function e(t,n,a,i,c){var l=-1,s=t.length;for(a||(a=o),c||(c=[]);++l<s;){var u=t[l];n>0&&a(u)?n>1?e(u,n-1,a,i,c):r(c,u):i||(c[c.length]=u)}return c}},461:function(e,t){e.exports=function(e,t){for(var n=-1,r=t.length,o=e.length;++n<r;)e[o+n]=t[n];return e}},462:function(e,t,n){var r=n(9),o=n(132),a=n(76),i=r?r.isConcatSpreadable:void 0;e.exports=function(e){return a(e)||o(e)||!!(i&&e&&e[i])}},463:function(e,t,n){var r=n(109),o=n(77);e.exports=function(e){return o(e)&&r(e)}},464:function(e,t){e.exports=function(e){return null==e}},465:function(e,t,n){"use strict";e.exports=n(466)},466:function(e){e.exports=JSON.parse('["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","label","legend","li","link","main","map","mark","math","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rb","rp","rt","rtc","ruby","s","samp","script","section","select","slot","small","source","span","strong","style","sub","summary","sup","svg","table","tbody","td","template","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr"]')},66:function(e,t,n){"use strict";const r=n(2).d.td`
  height: 20px;
  padding: 0;
  background-color: white;

  @media (max-width: 999px) {
    height: 14px;
  }
`;t.a=r},68:function(e,t,n){"use strict";const r=n(2).d.tr`
  border: ${e=>e.theme.border};
`;t.a=r},69:function(e,t,n){"use strict";var r=n(2),o=n(129),a=n(97);const i=Object(r.d)(a.a)`
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
`;t.a=c},72:function(e,t,n){"use strict";const r=n(2).d.table`
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
`;t.a=r},73:function(e,t,n){"use strict";t.a=e=>String.fromCharCode(65+e)},74:function(e,t,n){"use strict";var r=n(111);t.a=e=>{var t;return null!==(t=e.country)&&void 0!==t?t:e.name in r.a?e.name:void 0}},78:function(e,t,n){var r=n(112),o=n(108),a=n(110),i=parseFloat,c=Math.min,l=Math.random;e.exports=function(e,t,n){if(n&&"boolean"!=typeof n&&o(e,t,n)&&(t=n=void 0),void 0===n&&("boolean"==typeof t?(n=t,t=void 0):"boolean"==typeof e&&(n=e,e=void 0)),void 0===e&&void 0===t?(e=0,t=1):(e=a(e),void 0===t?(t=e,e=0):t=a(t)),e>t){var s=e;e=t,t=s}if(n||e%1||t%1){var u=l();return c(e+u*(t-e+i("1e-"+((u+"").length-1))),t)}return r(e,t)}},79:function(e,t,n){var r=n(450),o=n(451),a=n(76);e.exports=function(e){return(a(e)?r:o)(e)}},80:function(e,t,n){"use strict";var r=n(0);t.a=e=>{const t=Object(r.useRef)();return Object(r.useEffect)(()=>{t.current=e}),t.current}},81:function(e,t,n){"use strict";var r=n(2),o=n(97);const a=Object(r.d)(o.a)`
  visibility: hidden;
  pointer-events: none;

  &::before {
    content: '.';
  }
`;t.a=a},82:function(e,t,n){"use strict";const r=n(2).d.div`
  display: flex;
  flex-direction: column;
  min-width: 65%;
  margin: 0 5px 10px 5px;
`;t.a=r},83:function(e,t,n){"use strict";const r=n(2).d.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  min-width: 35%;
  margin: 0 5px 10px 5px;

  @media (max-width: 999px) {
    align-items: center;
  }
`;t.a=r},84:function(e,t,n){"use strict";const r=n(2).d.div`
  display: flex;
  margin: auto;
  width: 1000px;

  @media (max-width: 999px) {
    width: 100%;
    flex-direction: column;
  }
`;t.a=r},85:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(2),i=n(107);const c=i.a.withComponent("button");var l=Object(a.d)(c)`
  padding: initial;
  border: initial;
  background-color: initial;
`,s=n(17);var u=Object(r.memo)(({children:e,delay:t})=>(e=>{const[t,n]=Object(r.useState)(!1);return Object(r.useEffect)(()=>{const t=setTimeout(()=>{n(!0)},e);return()=>{clearTimeout(t)}},[]),t})(t)?o.a.createElement(o.a.Fragment,null,e):null),d=n(73),p=n(67);var m=a.d.div`
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
`;const f=a.d.div`
  display: flex;
  justify-content: center;
  margin-top: 2px;
`;var b=Object(r.memo)(({numGroups:e,possibleGroups:t})=>{const n=e>>1;return o.a.createElement(f,null,p(e).map(e=>{const r=Object(d.a)(e);return o.a.createElement(m,{key:r,color:e<n?"red":"blue",possible:t.includes(e)},r)}))});const h=a.d.div`
  border-width: 2px;
  border-style: dashed;
  border-color: rgba(255, 0, 0, 0.5);
  padding: 10px;
`;var x=Object(r.memo)(()=>o.a.createElement(h,null,o.a.createElement("div",null,"Calculation is taking too long."),o.a.createElement("div",null,"And"," ",o.a.createElement(i.a,{href:"https://github.com/inker/draw/issues/14",target:"_blank",rel:"noopener"},"here's why"),"."))),v=n(127),g=n.n(v);var y=a.b`
  body * {
    transition-property: none !important;
    animation: none !important;
  }
`;const j=n.e(80).then(n.bind(null,539)),w=()=>({downloadClicked:null,transitionsEnabled:!0});var E=Object(r.memo)(({completed:e,groupsElement:t})=>{const[{downloadClicked:n,transitionsEnabled:a},i]=Object(r.useState)(w),c=Object(r.useCallback)(e=>{i({downloadClicked:e,transitionsEnabled:!1})},[i]);Object(r.useEffect)(()=>{(async()=>{if(n){try{const e=t.current;if(!e)throw new Error("groups element is null");await g()(0);const r=await j;await r.default(e,n)}catch(e){console.error(e)}c(null)}})()},[n]),Object(r.useEffect)(()=>{e||i({downloadClicked:null,transitionsEnabled:!0})},[e]);const s=Object(r.useCallback)(()=>c("png"),[c]),u=Object(r.useCallback)(()=>c("svg"),[c]);return e&&t?o.a.createElement("div",null,!a&&o.a.createElement(y,null),"Download as ",o.a.createElement(l,{onClick:s},"PNG"),", ",o.a.createElement(l,{onClick:u},"SVG")):null});const O=a.d.div`
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
`;t.a=Object(r.memo)(({long:e,completed:t,selectedTeam:n,pickedGroup:a,possibleGroups:i,isDisplayPossibleGroupsText:c,numGroups:p,groupsElement:m,reset:f})=>{var h,v;const g=Object(r.useRef)(null),y=Object(r.useRef)(null);Object(r.useEffect)(()=>{y.current=t?null:n},[t,n]);const j=null!==(h=y.current)&&void 0!==h?h:n;return t?o.a.createElement(O,null,o.a.createElement($,null,o.a.createElement("div",null,"Draw completed!"),o.a.createElement(E,{completed:t,groupsElement:m}),o.a.createElement(l,{onClick:f},"Restart"))):null!==a?(g.current=o.a.createElement(O,null,o.a.createElement("div",null,e&&j?o.a.createElement("span",null,o.a.createElement(C,null,null!==(v=j.shortName)&&void 0!==v?v:j.name)," goes to group"):o.a.createElement("span",null,"Group")," ",o.a.createElement(C,null,Object(d.a)(a)),"!")),g.current):j?o.a.createElement(O,null,c?o.a.createElement("div",null,"Possible groups for"," ",o.a.createElement(k,null,o.a.createElement(C,null,j.name),":"),i?o.a.createElement(b,{numGroups:p,possibleGroups:i}):o.a.createElement("div",null,o.a.createElement(s.a,{initialNum:0,maxNum:10,interval:2e3}),o.a.createElement(u,{delay:5e3},o.a.createElement(x,null)))):g.current):o.a.createElement(O,null,"Pick a ball")})},86:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(2),i=n(452);var c=a.d.div`
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
`,l=n(67),s=n(68),u=n(66),d=n(72);var p=Object(a.d)(d.a)`
  transform: box-shadow 1s linear;
  ${e=>e.highlighted&&"\n  "}
`,m=n(96);const f=a.c`
  filter: grayscale(0.5);
  opacity: 0.4;
`,b=a.c`
  color: #f70;
`;var h=Object(a.d)(m.a)`
  ${e=>e.depleted&&f}
  ${e=>e.highlighted&&b}
`;var x=Object(a.d)(u.a)`
  & + & {
    border-left: ${e=>e.theme.border};
  }
`,v=n(69);const g=a.c`
  color: blue;
`,y=a.c`
  filter: grayscale(0.5);
  opacity: 0.4;
`;var j=Object(a.d)(v.a)`
  ${e=>e.selected&&g}
  ${e=>e.picked&&y}
`;var w=Object(r.memo)(({teams:e,pickedTeams:t,selectedTeams:n})=>o.a.createElement(s.a,null,e.map(e=>{var r;const{name:a,country:i,shortName:c,pairing:l}=e;return o.a.createElement(x,{key:e.id},o.a.createElement(j,{"data-cellid":e.id,title:l&&"paired with "+(null!==(r=l.shortName)&&void 0!==r?r:l.name),selected:!!(null==n?void 0:n.includes(e)),picked:t.includes(e),country:null!=i?i:a},null!=c?c:a))})));var E=Object(r.memo)(({isCurrent:e,potNum:t,teams:n,pickedTeams:r,selectedTeams:a,isSplit:i,headerStyles:c})=>{const d=i?2:1,m=n.length/d;return o.a.createElement(p,{highlighted:e},o.a.createElement("thead",null,o.a.createElement(s.a,null,o.a.createElement(u.a,{colSpan:d},o.a.createElement(h,{highlighted:e,depleted:!n||r.length===n.length,styles:c},"Pot ",t+1)))),o.a.createElement("tbody",null,l(m).map(e=>{const t=i?[n[2*e],n[2*e+1]]:[n[e]];return o.a.createElement(w,{key:t.map(e=>e.id).join(":"),teams:t,selectedTeams:a,pickedTeams:r})})))});const O=a.c`
  background-color: rgba(0, 0, 0, 0.75);
  color: #fff;
`;t.a=Object(r.memo)(({initialPots:e,pots:t,selectedTeams:n,currentPotNum:r,split:a})=>o.a.createElement(c,{limitWidth:!a},e.map((c,l)=>{const s=l===r,u=i(e[l],t[l],null!=n?n:[]);return o.a.createElement(E,{key:c[0].id,potNum:l,isCurrent:s,teams:c,pickedTeams:u,selectedTeams:n,isSplit:a,headerStyles:O})})))},89:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(2),i=n(74),c=n(464),l=n(126);let s;var u=n(15),d=n.n(u),p=n(465),m=n.n(p);var f=Object(r.memo)(({tagName:e,modalRoot:t,children:n})=>{const o=Object(r.useMemo)(()=>{const t=m.a.includes(e)&&"svg"!==e?"http://www.w3.org/1999/xhtml":"http://www.w3.org/2000/svg";return document.createElementNS(t,e)},[e,t]),a=Object(r.useRef)(o);return Object(r.useEffect)(()=>(t.appendChild(o),()=>{t.removeChild(o)}),[]),d.a.createPortal(n,a.current)});const b=((e,...t)=>{s||(s=document.createElement("style"),document.head.appendChild(s));const n=Object(l.a)("styled-element-"),r=((e,...t)=>e.reduce((e,n,r)=>`${e}${n}${c(t[r])?"":t[r]}`,""))(e,...t);return s.textContent+=`.${n}{${r}}`,n})`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  pointer-events: none;
`,h=document.createElement("div");h.classList.add(b),document.body.insertBefore(h,document.getElementById("app"));var x=Object(r.memo)(({children:e})=>o.a.createElement(f,{tagName:"div",modalRoot:h},e)),v=n(69);const g=Object(a.d)(v.a)`
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  z-index: 1000;
  user-select: none;
  pointer-events: none;
`,y=e=>"string"==typeof e?document.querySelector(e):e.current,j=e=>`transform ${e}ms ease-in-out`;function w(e){const{left:t,top:n}=e.getBoundingClientRect();return`translate3d(${t}px, ${n}px, 0px)`}t.a=Object(r.memo)(({from:e,to:t,duration:n,team:a,onAnimationEnd:c})=>{var l;const s=Object(r.useMemo)(()=>y(e),[e]),u=Object(r.useMemo)(()=>y(t),[t]),[d,p]=Object(r.useState)(s);Object(r.useLayoutEffect)(()=>{d===s&&p(u)},[d]);const m=Object(r.useMemo)(()=>({transform:d instanceof HTMLElement?w(d):"",transition:d===u?j(n):""}),[d,u,n]),f=Object(r.useCallback)(e=>{"transform"===e.propertyName&&(null==c||c())},[c]);return d&&o.a.createElement(x,null,o.a.createElement(g,{country:Object(i.a)(a),style:m,onTransitionEnd:f},null!==(l=a.shortName)&&void 0!==l?l:a.name))})},90:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(2),i=n(136);var c=Object(a.d)(i.a)`
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
`;t.a=Object(r.memo)(({forceNoSelect:e,display:t,displayTeams:n,pot:a,selectedTeam:i,onPick:s})=>{const u=Object(r.useCallback)(e=>{const t=e.target,n=a.findIndex(e=>e.id===t.dataset.teamid);s(n,a)},[a,s]),d=e||i;return o.a.createElement(l,null,t&&a.map(t=>{var r;return o.a.createElement(c,{key:t.id,"data-teamid":t.id,selected:t===i,notSelected:e||!!i&&t!==i,forceVisible:n,noHover:!!d,onClick:d?void 0:u},null!==(r=t.shortName)&&void 0!==r?r:t.name)}))})},96:function(e,t,n){"use strict";var r=n(2),o=n(135);const a=Object(r.d)(o.a)`
  justify-content: center;
  height: 100%;
  width: 100%;
  font-weight: 600;
  ${e=>e.styles};
`;t.a=a},97:function(e,t,n){"use strict";var r=n(2),o=n(135);const a=Object(r.d)(o.a)`
  margin: 0 3px;
  text-align: left;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 999px) {
    font-family: 'Roboto Condensed', RobotoCondensed, RobotoCondensed-Regular, sans-serif;
  }
`;t.a=a}}]);